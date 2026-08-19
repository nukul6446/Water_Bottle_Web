const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const Contact = require("../models/Contact.js");

// ─────────────────────────────────────────────────────────────
// NODEMAILER TRANSPORTER
// Using service: "gmail" is correct for Gmail
// Do NOT use host/port/secure/tls for Gmail — it causes
// authentication errors on deployed servers
// ─────────────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─────────────────────────────────────────────────────────────
// VERIFY SMTP ON STARTUP
// Check Render logs after deploy to confirm email works
// ─────────────────────────────────────────────────────────────

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error.message);
    console.error(
      "   SMTP_USER:",
      process.env.SMTP_USER || "NOT SET"
    );
    console.error(
      "   SMTP_PASS:",
      process.env.SMTP_PASS ? "SET" : "NOT SET"
    );
  } else {
    console.log(
      "✅ SMTP ready — emails will send correctly"
    );
  }
});

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// ─────────────────────────────────────────────────────────────
// VALIDATION RULES
// ─────────────────────────────────────────────────────────────

const contactValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage(
      "Full name must be between 2 and 100 characters"
    ),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9]{10}$/)
    .withMessage(
      "Please enter a valid 10-digit phone number with no spaces or dashes"
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("message")
    .optional({ values: "falsy" })
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Message cannot exceed 2000 characters"),
];

// ─────────────────────────────────────────────────────────────
// POST /api/contact
// ─────────────────────────────────────────────────────────────

router.post("/", contactValidation, async (req, res) => {
  try {
    // ─────────────────────────────────────────────────────
    // DEBUG LOG
    // ─────────────────────────────────────────────────────

    console.log("=== CONTACT POST DEBUG ===");
    console.log(
      "Content-Type:",
      req.headers["content-type"]
    );
    console.log(
      "Raw body:",
      JSON.stringify(req.body, null, 2)
    );
    console.log("==========================");

    // ─────────────────────────────────────────────────────
    // VALIDATION CHECK
    // ─────────────────────────────────────────────────────

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("❌ Validation failed:");
      console.log(JSON.stringify(errors.array(), null, 2));

      return res.status(400).json({
        success: false,
        message:
          "Please fill in all required fields correctly.",
        errors: errors.array().map((error) => ({
          field: error.path,
          message: error.msg,
        })),
      });
    }

    // ─────────────────────────────────────────────────────
    // EXTRACT FIELDS
    // ─────────────────────────────────────────────────────

    const fullName = req.body.fullName.trim();
    const phone = req.body.phone.trim();
    const email = req.body.email.trim().toLowerCase();
    const message = req.body.message
      ? req.body.message.trim()
      : "";

    console.log("📩 New contact enquiry received:");
    console.log({ fullName, phone, email, message });

    // ─────────────────────────────────────────────────────
    // DATABASE CONNECTION CHECK
    // ─────────────────────────────────────────────────────

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message:
          "Database is temporarily unavailable. Please try again shortly.",
      });
    }

    // ─────────────────────────────────────────────────────
    // RATE LIMIT
    // One submission per email every 5 minutes
    // ─────────────────────────────────────────────────────

    const fiveMinutesAgo = new Date(
      Date.now() - 5 * 60 * 1000
    );

    const recentSubmission = await Contact.findOne({
      email,
      createdAt: { $gte: fiveMinutesAgo },
    });

    if (recentSubmission) {
      return res.status(429).json({
        success: false,
        message:
          "You recently submitted an enquiry. Please wait a few minutes before trying again.",
      });
    }

    // ─────────────────────────────────────────────────────
    // SAVE TO MONGODB
    // ─────────────────────────────────────────────────────

    const contact = new Contact({
      fullName,
      phone,
      email,
      message,
    });

    await contact.save();

    console.log(
      `✅ Contact saved to DB: ${contact._id}`
    );

    // ─────────────────────────────────────────────────────
    // SEND EMAIL TO ADMIN
    // ─────────────────────────────────────────────────────

    console.log("📧 Attempting to send admin email...");
    console.log("   ADMIN_EMAIL:", ADMIN_EMAIL || "NOT SET");
    console.log(
      "   SMTP_USER:",
      process.env.SMTP_USER || "NOT SET"
    );
    console.log(
      "   SMTP_PASS:",
      process.env.SMTP_PASS ? "SET ✅" : "NOT SET ❌"
    );

    if (
      ADMIN_EMAIL &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      try {
        const mailResult = await transporter.sendMail({
          from: `"Jambooneer Website" <${process.env.SMTP_USER}>`,
          to: ADMIN_EMAIL,
          subject: `New Enquiry from ${fullName}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8" />
              <title>New Contact Enquiry</title>
            </head>
            <body
              style="
                margin: 0;
                padding: 20px;
                background: #f5f5f5;
                font-family: Arial, sans-serif;
              "
            >
              <div
                style="
                  max-width: 600px;
                  margin: 0 auto;
                  background: white;
                  padding: 25px;
                  border-radius: 12px;
                  border: 1px solid #eee;
                "
              >
                <h2 style="margin-top: 0; color: #6a1b9a;">
                  New Contact Enquiry
                </h2>

                <table
                  style="
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                  "
                >
                  <tr>
                    <td
                      style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-weight: bold;
                        width: 120px;
                      "
                    >
                      Name
                    </td>
                    <td
                      style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                      "
                    >
                      ${fullName}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-weight: bold;
                      "
                    >
                      Email
                    </td>
                    <td
                      style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                      "
                    >
                      ${email}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-weight: bold;
                      "
                    >
                      Phone
                    </td>
                    <td
                      style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                      "
                    >
                      ${phone}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                        font-weight: bold;
                      "
                    >
                      Message
                    </td>
                    <td
                      style="
                        padding: 10px;
                        border-bottom: 1px solid #eee;
                      "
                    >
                      ${message || "No message provided"}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding: 10px;
                        font-weight: bold;
                      "
                    >
                      Time
                    </td>
                    <td style="padding: 10px;">
                      ${new Date().toLocaleString("en-IN")}
                    </td>
                  </tr>
                </table>

                <p
                  style="
                    margin-top: 20px;
                    font-size: 12px;
                    color: #888;
                  "
                >
                  Enquiry ID: ${contact._id}
                </p>
              </div>
            </body>
            </html>
          `,
          text: `
New Enquiry from ${fullName}

Name    : ${fullName}
Email   : ${email}
Phone   : ${phone}
Message : ${message || "No message provided"}

Enquiry ID : ${contact._id}
Time       : ${new Date().toLocaleString("en-IN")}
          `,
        });

        console.log(
          "📧 Admin email sent successfully to:",
          ADMIN_EMAIL
        );
        console.log(
          "   Message ID:",
          mailResult.messageId
        );
      } catch (emailError) {
        // Email failure does NOT undo the saved enquiry
        console.error(
          "❌ [Admin Email Error]:",
          emailError.message
        );
        console.error(
          "   Full error:",
          emailError
        );
      }
    } else {
      console.log(
        "⚠️  Admin email skipped - missing credentials:"
      );
      console.log(
        "   ADMIN_EMAIL:",
        ADMIN_EMAIL ? "✅" : "❌ NOT SET"
      );
      console.log(
        "   SMTP_USER:",
        process.env.SMTP_USER ? "✅" : "❌ NOT SET"
      );
      console.log(
        "   SMTP_PASS:",
        process.env.SMTP_PASS ? "✅" : "❌ NOT SET"
      );
    }

    // ─────────────────────────────────────────────────────
    // SUCCESS RESPONSE
    // ─────────────────────────────────────────────────────

    return res.status(201).json({
      success: true,
      message: "Thank you! We have received your enquiry.",
      data: {
        id: contact._id,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error("[Contact POST Error]", error);

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// GET /api/contact
// ─────────────────────────────────────────────────────────────

router.get("/", async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;

    const currentPage = Math.max(
      parseInt(page) || 1,
      1
    );

    const currentLimit = Math.min(
      Math.max(parseInt(limit) || 50, 1),
      100
    );

    const filter = status ? { status } : {};

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * currentLimit)
      .limit(currentLimit);

    const total =
      await Contact.countDocuments(filter);

    return res.json({
      success: true,
      count: contacts.length,
      total,
      page: currentPage,
      limit: currentLimit,
      data: contacts,
    });
  } catch (error) {
    console.error("[Contact GET Error]", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// PATCH /api/contact/:id/status
// ─────────────────────────────────────────────────────────────

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = [
      "new",
      "contacted",
      "resolved",
      "spam",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    return res.json({
      success: true,
      message: "Status updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("[Contact PATCH Error]", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
