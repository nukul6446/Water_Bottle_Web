require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const contactRoutes = require("./routes/contact");

const app = express();

// ─────────────────────────────────────────────────────────────
// ENV CHECK
// ─────────────────────────────────────────────────────────────

console.log("");
console.log("🔧 ENV CHECK:");
console.log(
  "   MONGO_URI  :",
  process.env.MONGO_URI ? "✅ Loaded" : "❌ MISSING"
);
console.log(
  "   SMTP_HOST  :",
  process.env.SMTP_HOST || "❌ MISSING"
);
console.log(
  "   SMTP_PORT  :",
  process.env.SMTP_PORT || "❌ MISSING"
);
console.log(
  "   SMTP_USER  :",
  process.env.SMTP_USER || "❌ MISSING"
);
console.log(
  "   SMTP_PASS  :",
  process.env.SMTP_PASS ? "✅ Loaded" : "❌ MISSING"
);
console.log(
  "   ADMIN_EMAIL:",
  process.env.ADMIN_EMAIL || "❌ MISSING"
);
console.log(
  "   CLIENT_URL :",
  process.env.CLIENT_URL || "❌ MISSING"
);
console.log("");

// ─────────────────────────────────────────────────────────────
// CORS
// ─────────────────────────────────────────────────────────────

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  process.env.CLIENT_URL?.trim(),   // important!
].filter(Boolean);

console.log("🌐 Allowed origins:", allowedOrigins);
console.log("");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin
      // such as curl, Postman, or server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`⚠️  Blocked by CORS: ${origin}`);

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

// ─────────────────────────────────────────────────────────────
// BODY PARSER
// ─────────────────────────────────────────────────────────────

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ─────────────────────────────────────────────────────────────
// REQUEST LOGGER
// ─────────────────────────────────────────────────────────────

app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    console.log(
      `${new Date().toISOString()} | ${req.method} ${req.path} | ${
        res.statusCode
      } | ${Date.now() - start}ms`
    );
  });

  next();
});

// ─────────────────────────────────────────────────────────────
// MONGODB CONNECTION
// ─────────────────────────────────────────────────────────────

let cachedConnection = null;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is missing. Add it to your .env file."
    );
  }

  // Already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Connection already in progress
  if (cachedConnection) {
    return cachedConnection;
  }

  console.log("🔄 Connecting to MongoDB...");

  cachedConnection = mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 0,
    })
    .then(() => {
      console.log("✅ MongoDB connected successfully");
      return mongoose.connection;
    })
    .catch((error) => {
      cachedConnection = null;
      console.error(
        "❌ MongoDB connection failed:",
        error.message
      );
      throw error;
    });

  return cachedConnection;
};

// ─────────────────────────────────────────────────────────────
// DATABASE MIDDLEWARE
// Ensures MongoDB is ready before every request
// ─────────────────────────────────────────────────────────────

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(503).json({
      success: false,
      message:
        "Database is unavailable. Please try again shortly.",
    });
  }
});

// ─────────────────────────────────────────────────────────────
// ROUTES
// ─────────────────────────────────────────────────────────────

app.use("/api/contact", contactRoutes);

// ─────────────────────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  const dbStates = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };

  return res.status(200).json({
    success: true,
    status: "ok",
    db: dbStates[mongoose.connection.readyState] || "unknown",
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Jambooneer backend is running",
  });
});

// ─────────────────────────────────────────────────────────────
// 404
// ─────────────────────────────────────────────────────────────

app.use((req, res) => {
  return res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

// ─────────────────────────────────────────────────────────────
// GLOBAL ERROR HANDLER
// ─────────────────────────────────────────────────────────────

app.use((err, req, res, next) => {
  console.error("[SERVER ERROR]", err.message);

  return res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// ─────────────────────────────────────────────────────────────
// EXPORT
// Do NOT call app.listen() here
// ─────────────────────────────────────────────────────────────

module.exports = app;
