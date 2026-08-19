import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import {
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiDroplet,
  FiMail,
  FiClock,
  FiMapPin,
  FiMenu,
  FiPhone,
  FiSend,
  FiX,
} from "react-icons/fi";
import logo from "./assets/logo.png";
import bottle from "./assets/product2.png";
import arrbottle1 from "./assets/arrbottle1.jpg";
import arrdelivery2 from "./assets/arrdelivery2.jpg";
import arrwater3 from "./assets/arrwater3.jpg";
import arrsource4 from "./assets/arrsource4.jpg";
import arroffice5 from "./assets/arroffice5.jpg";
import arrevent6 from "./assets/arrevent6.jpg";
import purpose from "./assets/purpose.jpg";
import engineer from "./assets/engineer.jpg";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* =========================================================
   CONFIG
========================================================= */

const SITE_TITLE = "Jambooneer | Pure Water. Honest Delivery.";

const META_DESCRIPTION =
  "Jambooneer brings rigorously purified, mineral-balanced water straight to your home, office, or event — clean water, honest delivery, every single time.";

const CONTACT_ADDRESS = "Full Address Here";
const CONTACT_PHONE = "+91 9770674420";
const CONTACT_EMAIL = "hello@jambooneer.com";
const OFFICE_HOURS = "[Timing] · 7 Days a Week";

// ─────────────────────────────────────────────────────────
// FIX: Removed the broken "http://https://" prefix
// ─────────────────────────────────────────────────────────
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://water-bottle-web.onrender.com";

/* =========================================================
   IMAGES
========================================================= */

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=1600&q=85",
  purpose,
  bottle,
  arrbottle1,
  arrdelivery2,
  arrwater3,
  arrsource4,
  arroffice5,
  arrevent6,
  engineer,
};

/* =========================================================
   DATA
========================================================= */

const products = [
  {
    number: "01",
    title: "Packaged Drinking Water",
    text: "Crisp, refreshing water for daily life, on the move or at home.",
    image: IMAGES.arrbottle1,
    items: [
      "BPA-free, food-grade plastic",
      "Tamper-evident sealed caps",
      "Bulk packs available",
      "Chilled delivery option",
    ],
  },
  {
    number: "02",
    title: "Dealer Partnership",
    text: "Build a business on a brand people already trust.",
    image: IMAGES.arrdelivery2,
    items: [
      "Exclusive, area-based dealership",
      "Attractive profit margins",
      "Marketing & promotional support",
      "Reliable supply, fast assistance",
    ],
  },
  {
    number: "03",
    title: "Bulk Water Supply",
    text: "Dependable tanker delivery for sites and businesses that cannot afford downtime.",
    image: IMAGES.arrwater3,
    items: [
      "Flexible volumes per delivery",
      "Custom contracts available",
      "Temperature-controlled transport",
      "24/7 priority support",
    ],
  },
  {
    number: "04",
    title: "Mineral-Enriched Water",
    text: "Thoughtfully balanced for everyday wellness.",
    image: IMAGES.arrsource4,
    items: [
      "pH balanced",
      "Enhanced electrolytes",
      "Doctor recommended",
      "Ideal for infants & seniors",
    ],
  },
  {
    number: "05",
    title: "Office Water Solutions",
    text: "Hydration, handled — so your team does not have to think about it.",
    image: IMAGES.arroffice5,
    items: [
      "Dedicated account manager",
      "GST-compliant invoicing",
      "Dispenser maintenance",
      "Flexible monthly plans",
    ],
  },
  {
    number: "06",
    title: "Event Water Packages",
    text: "Because every celebration deserves water as polished as the occasion.",
    image: IMAGES.arrevent6,
    items: [
      "Branded bottle labelling",
      "On-site delivery & setup",
      "Bulk quantity discounts",
      "Last-minute availability",
    ],
  },
];

const processSteps = [
  {
    number: "01",
    title: "Place Your Order",
    text: "Order via WhatsApp, our website, or a quick call — pick your product and delivery slot.",
  },
  {
    number: "02",
    title: "Order Confirmed",
    text: "Instant confirmation with your order ID and delivery window.",
  },
  {
    number: "03",
    title: "We Deliver",
    text: "Fresh, sealed, and quality-tagged — brought to you by our trained team.",
  },
  {
    number: "04",
    title: "Enjoy Pure Water",
    text: "Hydrate with confidence. Tell us how we did — we're always improving.",
  },
];

const testimonials = [
  {
    quote:
      "Jambooneer has made our office water supply completely effortless. The quality stays consistent and deliveries are reliable.",
    name: "Rahul Sharma",
    role: "Operations Manager",
  },
  {
    quote:
      "The mineral water tastes genuinely fresh. We now use Jambooneer for our home and family gatherings.",
    name: "Priya Verma",
    role: "Customer",
  },
  {
    quote:
      "For our wedding, the bulk delivery and branded bottles arrived exactly when promised. Excellent coordination.",
    name: "Amit Jain",
    role: "Event Organizer",
  },
  {
    quote:
      "Switching to Jambooneer for our restaurant was the best decision. The bulk supply is always on time and the water quality is exceptional.",
    name: "Sneha Reddy",
    role: "Restaurant Owner",
  },
  {
    quote:
      "Their reusable jar program has cut our plastic waste dramatically. Great water, even better ethos.",
    name: "Vikram Mehta",
    role: "Sustainability Consultant",
  },
  {
    quote:
      "We ordered for a corporate event of 500+ people. The branded bottles looked premium and the delivery was flawless.",
    name: "Ananya Desai",
    role: "Corporate Event Planner",
  },
];

/* =========================================================
   APP
========================================================= */

export default function Jamboo() {
  const main = useRef(null);
  const hero = useRef(null);
  const bottle = useRef(null);
  const bottleWrap = useRef(null);
  const cursor = useRef(null);
  const cursorDot = useRef(null);
  const nav = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(0);

  // ─────────────────────────────────────────────────────
  // FORM STATE
  // ─────────────────────────────────────────────────────

  const [formStatus, setFormStatus] = useState("idle");
  // idle | submitting | success | error

  const [formErrors, setFormErrors] = useState([]);
  // Array of { field, message } from the server

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: "",
  });

  // ─────────────────────────────────────────────────────
  // SCROLL HELPER
  // ─────────────────────────────────────────────────────

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: "power3.inOut",
      });
    }
  };

  // ─────────────────────────────────────────────────────
  // SEO
  // ─────────────────────────────────────────────────────

  useEffect(() => {
    document.title = SITE_TITLE;

    const setMeta = (name, content) => {
      let tag = document.querySelector(
        `meta[name="${name}"]`
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setProperty = (property, content) => {
      let tag = document.querySelector(
        `meta[property="${property}"]`
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", META_DESCRIPTION);
    setProperty("og:title", SITE_TITLE);
    setProperty("og:description", META_DESCRIPTION);
    setProperty("og:type", "website");
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", SITE_TITLE);
    setMeta("twitter:description", META_DESCRIPTION);
  }, []);

  // ─────────────────────────────────────────────────────
  // FORM HANDLERS
  // ─────────────────────────────────────────────────────

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for this field as the user types
    setFormErrors((prev) =>
      prev.filter((err) => err.field !== name)
    );
  };

  // Helper: get error message for a specific field
  const getFieldError = (fieldName) => {
    const found = formErrors.find(
      (err) => err.field === fieldName
    );
    return found ? found.message : null;
  };

  // ─────────────────────────────────────────────────────
  // SUBMIT HANDLER
  // ─────────────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ── Client-side check ──────────────────────────────
    // Catch obviously empty fields before hitting the
    // network. The server validates properly too.
    // ──────────────────────────────────────────────────

    const clientErrors = [];

    if (!formData.fullName.trim()) {
      clientErrors.push({
        field: "fullName",
        message: "Full name is required",
      });
    }

    if (!formData.phone.trim()) {
      clientErrors.push({
        field: "phone",
        message: "Phone number is required",
      });
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      clientErrors.push({
        field: "phone",
        message:
          "Please enter a valid 10-digit phone number",
      });
    }

    if (!formData.email.trim()) {
      clientErrors.push({
        field: "email",
        message: "Email address is required",
      });
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email.trim()
      )
    ) {
      clientErrors.push({
        field: "email",
        message: "Please enter a valid email address",
      });
    }

    if (clientErrors.length > 0) {
      setFormErrors(clientErrors);
      setFormStatus("error");
      return;
    }

    // ── Send to backend ────────────────────────────────

    setFormStatus("submitting");
    setFormErrors([]);

    // Build the exact payload the server expects
    const payload = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    };

    console.log("📤 Submitting to:", `${API_URL}/api/contact`);
    console.log("📦 Payload:", payload);

    try {
      const response = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      console.log("📥 Server response:", data);

      // ── Validation errors (400) ──────────────────────

      if (response.status === 400) {
        setFormErrors(data.errors || []);
        setFormStatus("error");
        return;
      }

      // ── Rate limit (429) ─────────────────────────────

      if (response.status === 429) {
        setFormErrors([
          {
            field: "email",
            message: data.message,
          },
        ]);
        setFormStatus("error");
        return;
      }

      // ── Other server errors ──────────────────────────

      if (!response.ok) {
        setFormErrors([]);
        setFormStatus("error");
        return;
      }

      // ── Success ──────────────────────────────────────

      setFormStatus("success");
      setFormErrors([]);
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        message: "",
      });

      // Auto-reset after 6 seconds
      setTimeout(() => setFormStatus("idle"), 6000);
    } catch (networkError) {
      // Network failure — server unreachable
      console.error("❌ Network error:", networkError);
      setFormErrors([]);
      setFormStatus("error");
    }
  };

  // ─────────────────────────────────────────────────────
  // GSAP ANIMATIONS
  // ─────────────────────────────────────────────────────

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          ".hero-eyebrow",
          ".hero-line",
          ".hero-copy",
          ".hero-stats",
          ".hero-proof",
          ".hero-cta",
        ],
        { opacity: 0, y: 50 }
      );

      gsap.set(".hero-bottle", {
        opacity: 0,
        scale: 0.7,
        y: 100,
        rotate: -8,
      });

      const heroIntro = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      heroIntro
        .to(".hero-eyebrow", {
          opacity: 1,
          y: 0,
          duration: 0.9,
        })
        .to(
          ".hero-line",
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            stagger: 0.12,
          },
          "-=0.55"
        )
        .to(
          ".hero-copy",
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.65"
        )
        .to(
          ".hero-stats",
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.55"
        )
        .to(
          ".hero-proof",
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .to(
          ".hero-cta",
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .to(
          ".hero-bottle",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotate: 0,
            duration: 1.4,
            ease: "expo.out",
          },
          "-=1.2"
        );

      gsap.to(bottle.current, {
        y: -14,
        rotation: 2,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      const heroElement = hero.current;

      const moveBottle = (e) => {
        if (!heroElement || !bottle.current) return;
        const rect = heroElement.getBoundingClientRect();
        const x =
          (e.clientX - rect.left) / rect.width - 0.5;
        const y =
          (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(bottle.current, {
          x: x * 24,
          rotationY: x * 8,
          rotationX: -y * 6,
          duration: 0.8,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      if (heroElement) {
        heroElement.addEventListener(
          "mousemove",
          moveBottle
        );
      }

      const heroScroll = gsap.timeline({
        scrollTrigger: {
          trigger: hero.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      heroScroll
        .to(
          ".hero-copy-area",
          { y: -180, opacity: 0.15, ease: "none" },
          0
        )
        .to(
          ".hero-glow-one",
          { x: -150, y: 100, scale: 1.5, ease: "none" },
          0
        )
        .to(
          ".hero-glow-two",
          { x: 180, y: -120, scale: 1.6, ease: "none" },
          0
        )
        .to(
          bottleWrap.current,
          {
            x: 360,
            y: 500,
            scale: 0.42,
            rotation: 32,
            ease: "none",
          },
          0
        )
        .to(
          ".hero-wave",
          { y: -180, scale: 1.15, ease: "none" },
          0
        );

      ScrollTrigger.create({
        start: 100,
        end: 99999,
        onEnter: () => {
          gsap.to(nav.current, {
            y: 8,
            scale: 0.97,
            duration: 0.4,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(nav.current, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        },
      });

      gsap.utils.toArray(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils
        .toArray(".section-title-line")
        .forEach((line) => {
          gsap.fromTo(
            line,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1.2,
              ease: "power4.out",
              scrollTrigger: {
                trigger: line,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

      gsap.utils
        .toArray(".story-image")
        .forEach((image) => {
          gsap.to(image, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        });

      gsap.fromTo(
        ".product-card",
        { opacity: 0, y: 100, rotateX: 8 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 78%",
          },
        }
      );

      gsap.fromTo(
        ".quality-line-progress",
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: ".quality-process",
            start: "top 70%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      gsap.utils
        .toArray(".quality-item")
        .forEach((item) => {
          gsap.fromTo(
            item,
            { opacity: 0.55, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 72%",
                end: "top 42%",
                scrub: true,
              },
            }
          );
        });

      gsap.utils.toArray(".counter").forEach((counter) => {
        const target = Number(counter.dataset.value);
        if (isNaN(target)) return;
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
            once: true,
          },
          onUpdate: () => {
            counter.innerText =
              Math.floor(obj.value).toLocaleString(
                "en-IN"
              ) + "+";
          },
        });
      });

      gsap.fromTo(
        ".process-progress",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left",
          ease: "none",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 70%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );

      gsap.utils
        .toArray(".process-card")
        .forEach((card, index) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 80 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              delay: index * 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
              },
            }
          );
        });

      gsap.to(".testimonial-track", {
        xPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: ".testimonials-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      const contactTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".contact-section",
          start: "top 75%",
        },
      });

      contactTimeline
        .fromTo(
          ".contact-kicker",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
        .fromTo(
          ".contact-heading",
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.35"
        )
        .fromTo(
          ".contact-info",
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.9 },
          "-=0.4"
        )
        .fromTo(
          ".contact-form",
          { opacity: 0, y: 100, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.65"
        );

      gsap.fromTo(
        ".footer-reveal",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          scrollTrigger: {
            trigger: ".footer",
            start: "top 85%",
          },
        }
      );

      gsap.set(
        [cursor.current, cursorDot.current],
        { opacity: 0 }
      );

      const onMouseMove = (e) => {
        if (cursor.current && cursorDot.current) {
          gsap.to(cursor.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.35,
            ease: "power3.out",
            opacity: 1,
          });
          gsap.to(cursorDot.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.08,
            opacity: 1,
          });
        }
      };

      const onMouseLeave = () => {
        gsap.to(
          [cursor.current, cursorDot.current],
          { opacity: 0, duration: 0.3 }
        );
      };

      window.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener(
        "mouseleave",
        onMouseLeave
      );

      gsap.utils.toArray(".magnetic").forEach((button) => {
        const move = (e) => {
          const rect = button.getBoundingClientRect();
          const x =
            e.clientX - (rect.left + rect.width / 2);
          const y =
            e.clientY - (rect.top + rect.height / 2);
          gsap.to(button, {
            x: x * 0.22,
            y: y * 0.22,
            duration: 0.35,
            ease: "power3.out",
          });
        };
        const leave = () => {
          gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
          });
        };
        button.addEventListener("mousemove", move);
        button.addEventListener("mouseleave", leave);
      });

      return () => {
        if (heroElement) {
          heroElement.removeEventListener(
            "mousemove",
            moveBottle
          );
        }
        window.removeEventListener(
          "mousemove",
          onMouseMove
        );
        document.body.removeEventListener(
          "mouseleave",
          onMouseLeave
        );
      };
    }, main);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".mobile-menu",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 0.7,
          ease: "power4.inOut",
        }
      );
      gsap.fromTo(
        ".mobile-link",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.15,
          ease: "power4.out",
        }
      );
    });
    return () => ctx.revert();
  }, [menuOpen]);

  // ─────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────

  return (
    <main
      ref={main}
      className="relative overflow-hidden bg-[#FAF5FB] text-[#2d0a4e]"
    >
      <noscript>
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            background: "#2d0a4e",
            color: "white",
          }}
        >
          <h1>Jambooneer</h1>
          <p>Please enable JavaScript to view this site.</p>
        </div>
      </noscript>

      {/* CUSTOM CURSOR */}
      <div
        ref={cursor}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9C27B0]/60 mix-blend-difference md:block"
      />
      <div
        ref={cursorDot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9C27B0] md:block"
      />

      {/* NAVBAR */}
      <nav
        ref={nav}
        className="fixed left-0 right-0 top-0 z-[100] px-4 pt-4 md:px-8"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/15 bg-[#6A1B9A]/85 px-4 py-3 shadow-[0_15px_60px_rgba(45,10,78,0.25)] backdrop-blur-xl md:px-6">
          <a
            href="#home"
            className="group flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("home");
            }}
          >
            <div className="relative flex h-11 w-[180px] items-center justify-center">
              <img
                src={logo}
                alt="Jambooneer logo"
                className="h-[145px] w-[290px] object-contain"
              />
            </div>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {[
              ["About", "about"],
              ["Products", "products"],
              ["Why Us", "why-us"],
              ["Process", "process"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="nav-link relative text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-[#CE93D8]"
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("contact")}
            className="magnetic hidden rounded-full bg-white px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#6A1B9A] shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition-all hover:bg-[#F3E5F5] lg:block"
          >
            Enquire Now
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/25 lg:hidden"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu fixed inset-0 z-[90] flex flex-col justify-end bg-[#2d0a4e] px-7 pb-10 pt-32 text-white">
          <div className="flex flex-col">
            {[
              ["About", "about"],
              ["Products", "products"],
              ["Why Us", "why-us"],
              ["Process", "process"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="mobile-link border-b border-white/10 py-5 text-left text-4xl font-light"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="mt-8 text-xs uppercase tracking-[0.3em] text-white/40">
            Pure water. Honest delivery.
          </div>
        </div>
      )}

      {/* HERO */}
      <section
        ref={hero}
        id="home"
        className="hero relative flex min-h-[900px] items-center overflow-hidden bg-[#F3E5F5] pt-28"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(156,39,176,0.22),transparent_30%),radial-gradient(circle_at_85%_75%,rgba(106,27,154,0.13),transparent_30%)]" />
        <div className="hero-glow-one absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#CE93D8]/40 blur-[120px]" />
        <div className="hero-glow-two absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-[#9C27B0]/20 blur-[140px]" />
        <div className="absolute bottom-0 left-0 right-0 h-64 overflow-hidden opacity-40">
          <div className="hero-wave absolute -bottom-24 left-1/2 h-80 w-[130%] -translate-x-1/2 rounded-[50%] bg-white/60 blur-sm" />
        </div>

        <div className="hero-copy-area relative z-20 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-28 md:px-10 lg:grid-cols-[1fr_0.65fr]">
          <div>
            <div className="hero-eyebrow mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#8E24AA]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#6A1B9A]">
                Pure Water • Honest Delivery
              </span>
            </div>

            <h1 className="max-w-5xl overflow-hidden text-[clamp(2rem,10vw,7rem)] font-black leading-[0.9] tracking-[-0.05em] text-[#2d0a4e]">
              <span className="hero-line block">
                Purity Poured
              </span>
              <span className="hero-line block">
                <span className="bg-gradient-to-r from-[#6A1B9A] via-[#AB47BC] to-[#CE93D8] bg-clip-text text-transparent">
                  With Purpose.
                </span>
              </span>
            </h1>

            <p className="hero-copy mt-9 max-w-xl text-sm leading-7 text-[#5e2a7e] md:text-base">
              Jambooneer brings rigorously purified,
              mineral-balanced water straight to your home,
              office, or event — clean water, honest
              delivery, every single time.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo("products")}
                className="magnetic group flex items-center gap-3 rounded-full bg-[#2d0a4e] px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white"
              >
                Explore Water
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform group-hover:rotate-45">
                  <FiArrowUpRight />
                </span>
              </button>
              <button
                onClick={() => scrollTo("about")}
                className="flex items-center gap-2 px-3 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#6A1B9A]"
              >
                Our Story <FiChevronDown />
              </button>
            </div>

            <div className="hero-stats mt-14 grid max-w-2xl grid-cols-2 border-y border-[#2d0a4e]/10 py-5 sm:grid-cols-4">
              {[
                ["10000", "Happy Customers"],
                ["99", "Purity Tested"],
                ["24", "Delivery Support"],
                ["7", "Stage Purification"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="border-r border-[#2d0a4e]/10 px-4 first:pl-0 last:border-0"
                >
                  <div className="flex items-end gap-0.5 text-2xl font-black tracking-tight text-[#2d0a4e]">
                    <span
                      className="counter"
                      data-value={value}
                    >
                      0+
                    </span>
                  </div>
                  <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.15em] text-[#7e57a2]">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-proof mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-bold uppercase tracking-[0.18em] text-[#7e57a2]">
              <span>FSSAI Certified</span>
              <span>•</span>
              <span>ISI Certified</span>
              <span>•</span>
              <span>Same-Day Delivery</span>
              <span>•</span>
              <span>Lab Verified</span>
            </div>
          </div>

          <div
            ref={bottleWrap}
            className="pointer-events-none relative flex min-h-[500px] items-center justify-center"
          >
            <div className="absolute h-[360px] w-[360px] rounded-full border border-white/80 bg-white/30 shadow-[0_0_100px_rgba(156,39,176,0.25)] backdrop-blur-sm md:h-[480px] md:w-[480px]" />
            <div className="absolute h-[280px] w-[280px] rounded-full border border-white/70 md:h-[380px] md:w-[380px]" />
            <div className="absolute bottom-20 h-16 w-64 rounded-full bg-[#6A1B9A]/20 blur-[35px]" />
            <div
              ref={bottle}
              className="hero-bottle relative z-10 w-[170px] transform-gpu sm:w-[200px] md:w-[235px] lg:w-[260px]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <img
                src={IMAGES.bottle}
                alt="Jambooneer premium water bottle"
                className="h-auto w-full rounded-[30px] object-cover shadow-[0_45px_80px_rgba(45,10,78,0.25)]"
              />
              <div className="absolute -right-10 top-20 hidden rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#6A1B9A] shadow-xl backdrop-blur-md sm:block">
                Lab Verified
              </div>
              <div className="absolute -left-10 bottom-24 hidden rounded-full border border-white/70 bg-white/70 px-4 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-[#6A1B9A] shadow-xl backdrop-blur-md sm:block">
                Pure Source
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3">
          <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#7e57a2]">
            Explore the journey
          </span>
          <span className="h-12 w-px bg-gradient-to-b from-[#8E24AA] to-transparent" />
        </div>
      </section>

      {/* STORY */}
      <section
        id="about"
        className="relative overflow-hidden bg-white px-6 py-32 md:px-10 md:py-44"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-20 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="reveal relative">
              <div className="absolute -inset-5 rounded-[40px] bg-[#F3E5F5]" />
              <div className="relative h-[520px] overflow-hidden rounded-[32px]">
                <img
                  src={IMAGES.purpose}
                  alt="Natural water source"
                  className="story-image h-[120%] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2d0a4e]/50 via-transparent to-transparent" />
                <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between text-white">
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60">
                      Our Beginning
                    </div>
                    <div className="mt-2 text-2xl font-light">
                      Where every drop
                      <br />
                      has a purpose.
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
                    <FiDroplet />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#9C27B0]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#6A1B9A]">
                  Our Story
                </span>
              </div>
              <div className="overflow-hidden">
                <h2 className="section-title-line text-5xl font-light leading-[0.95] tracking-[-0.05em] text-[#2d0a4e] md:text-7xl">
                  Where Every Drop
                  <br />
                  <span className="font-black">
                    Has a Purpose.
                  </span>
                </h2>
              </div>
              <p className="reveal mt-8 max-w-2xl text-xl font-light leading-relaxed text-[#5e2a7e]">
                We didn't set out to sell water. We set out
                to earn your trust, one delivery at a time.
              </p>
              <p className="reveal mt-6 max-w-2xl text-sm leading-7 text-[#7e5a8e]">
                Jambooneer began with one simple conviction
                — that clean, safe, great-tasting water
                shouldn't be a privilege, it should be a
                promise kept to every home, office, and
                celebration we serve.
              </p>
              <p className="reveal mt-5 max-w-2xl text-sm leading-7 text-[#7e5a8e]">
                That promise shapes everything: how we
                purify, how we pack, and how we show up at
                your door.
              </p>
              <div className="mt-12 grid gap-4 sm:grid-cols-3">
                {[
                  [
                    "01",
                    "Pure at the Source",
                    "Multi-stage RO + UV + mineral balancing.",
                  ],
                  [
                    "02",
                    "Sustainable by Design",
                    "Reusable jars and eco-conscious packaging.",
                  ],
                  [
                    "03",
                    "Lab-Verified, Always",
                    "200+ safety and quality parameters.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="reveal rounded-2xl border border-[#2d0a4e]/10 bg-[#FAF5FB] p-5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(45,10,78,0.08)]"
                  >
                    <div className="text-[9px] font-black tracking-[0.2em] text-[#9C27B0]">
                      {number}
                    </div>
                    <h3 className="mt-5 text-sm font-black text-[#2d0a4e]">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs leading-5 text-[#7e5a8e]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="relative overflow-hidden bg-[#EDE7F6] px-6 py-32 md:px-10 md:py-44"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#9C27B0]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#6A1B9A]">
                  What We Offer
                </span>
              </div>
              <div className="overflow-hidden">
                <h2 className="section-title-line text-5xl font-light leading-none tracking-[-0.05em] text-[#2d0a4e] md:text-7xl">
                  One Brand.
                  <br />
                  <span className="font-black">
                    Every Kind of Thirst.
                  </span>
                </h2>
              </div>
            </div>
            <p className="max-w-md text-sm leading-6 text-[#7e5a8e]">
              From a single bottle to a fleet of tankers —
              Jambooneer scales to meet you where you are.
            </p>
          </div>

          <div className="mb-8 flex gap-2 overflow-x-auto pb-3">
            {products.map((product, index) => (
              <button
                key={product.number}
                onClick={() => setActiveProduct(index)}
                className={`whitespace-nowrap rounded-full px-5 py-3 text-[9px] font-black uppercase tracking-[0.15em] transition-all ${
                  activeProduct === index
                    ? "bg-[#2d0a4e] text-white"
                    : "bg-white text-[#7e57a2] hover:bg-[#F3E5F5]"
                }`}
              >
                {product.title}
              </button>
            ))}
          </div>

          <div className="products-grid grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, index) => (
              <article
                key={product.number}
                onMouseEnter={() => setActiveProduct(index)}
                onClick={() => {
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`product-card group relative min-h-[500px] cursor-pointer overflow-hidden rounded-[28px] bg-white transition-all duration-700 ${
                  activeProduct === index
                    ? "shadow-[0_35px_80px_rgba(45,10,78,0.15)]"
                    : "shadow-[0_15px_40px_rgba(45,10,78,0.04)]"
                }`}
              >
                <div className="absolute inset-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d0a4e] via-[#2d0a4e]/30 to-transparent" />
                </div>

                <div className="relative flex h-full min-h-[500px] flex-col justify-between p-7 text-white">
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-black tracking-[0.2em] text-white/60">
                      {product.number}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
                      <FiArrowUpRight />
                    </span>
                  </div>

                  <div>
                    <h3 className="max-w-sm text-2xl font-black tracking-tight">
                      {product.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-5 text-white/70 sm:text-base md:text-lg">
                      {product.text}
                    </p>
                    <div className="mt-6 grid gap-2">
                      {product.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[12px] font-medium text-white/80"
                        >
                          <FiCheck className="text-[#CE93D8]" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section
        id="why-us"
        className="relative bg-[#2d0a4e] px-6 py-32 text-white md:px-10 md:py-44"
      >
        <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#9C27B0]/10 blur-[130px]" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#CE93D8]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#CE93D8]">
                  Why Jambooneer
                </span>
              </div>
              <div className="overflow-hidden">
                <h2 className="section-title-line text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl">
                  Trust,
                  <br />
                  <span className="font-black">
                    Engineered.
                  </span>
                </h2>
              </div>
              <p className="reveal mt-8 max-w-md text-sm leading-7 text-white/55">
                We don't just purify water. We engineer
                confidence, drop by drop.
              </p>
              <div className="mt-12 flex flex-wrap gap-2">
                {[
                  "FSSAI Certified",
                  "ISI Mark",
                  "ISO 9001:2015",
                  "NABL Tested",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[8px] font-bold uppercase tracking-[0.15em] text-white/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="reveal mt-14 hidden overflow-hidden rounded-[30px] lg:block">
                <img
                  src={IMAGES.engineer}
                  alt="Pure water"
                  className="h-[300px] w-full object-cover opacity-60"
                />
              </div>
            </div>

            <div className="quality-process relative">
              <div className="absolute bottom-0 left-[22px] top-0 w-px bg-white/10">
                <div className="quality-line-progress h-full w-full bg-gradient-to-b from-[#CE93D8] to-[#8E24AA]" />
              </div>
              <div className="grid gap-14">
                {[
                  [
                    "01",
                    "Multi-Stage Purification",
                    "Sediment → RO → UV → UF → Minerals → Ozonation → Final QC Check.",
                  ],
                  [
                    "02",
                    "Same-Day Delivery",
                    "Order before cutoff, receive it the same day. No delays, no excuses.",
                  ],
                  [
                    "03",
                    "Transparent Quality Reports",
                    "Regular lab reports shared openly with our subscribers — nothing hidden.",
                  ],
                  [
                    "04",
                    "Support That Never Sleeps",
                    "WhatsApp, call, or email — we're always one message away.",
                  ],
                  [
                    "05",
                    "A Commitment Beyond the Bottle",
                    "Our reusable jar system keeps thousands of plastic bottles out of landfills every month.",
                  ],
                ].map(([number, title, text]) => (
                  <div
                    key={number}
                    className="quality-item relative grid grid-cols-[45px_1fr] gap-7"
                  >
                    <div className="relative z-10 flex h-[45px] w-[45px] items-center justify-center rounded-full border border-white/15 bg-[#2d0a4e] text-[9px] font-black text-[#CE93D8]">
                      {number}
                    </div>
                    <div className="pb-5">
                      <h3 className="text-2xl font-black tracking-tight">
                        {title}
                      </h3>
                      <p className="mt-4 max-w-xl text-sm leading-7 text-white/50">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-[25px] border border-white/10 bg-white/10 sm:grid-cols-4">
                {[
                  ["10000", "Happy Customers"],
                  ["50000", "Bottles Delivered Daily"],
                  ["99", "Purity Rate"],
                  ["7", "Stage Process"],
                ].map(([value, label]) => (
                  <div
                    key={label}
                    className="bg-[#2d0a4e] p-6 text-center"
                  >
                    <div className="text-2xl font-black text-[#CE93D8]">
                      <span
                        className="counter"
                        data-value={value}
                      >
                        0+
                      </span>
                    </div>
                    <div className="mt-2 text-[8px] font-bold uppercase tracking-[0.14em] text-white/35">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section
        id="process"
        className="process-section relative overflow-hidden bg-white px-6 py-32 md:px-10 md:py-44"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#9C27B0]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#6A1B9A]">
                How It Works
              </span>
              <span className="h-px w-10 bg-[#9C27B0]" />
            </div>
            <div className="overflow-hidden">
              <h2 className="section-title-line text-5xl font-light leading-none tracking-[-0.05em] text-[#2d0a4e] md:text-7xl">
                Pure Water.
                <br />
                <span className="font-black">
                  Four Simple Steps.
                </span>
              </h2>
            </div>
          </div>

          <div className="relative mx-auto mt-24 max-w-6xl">
            <div className="absolute left-0 right-0 top-5 hidden h-px bg-[#2d0a4e]/10 md:block">
              <div className="process-progress h-full w-full origin-left bg-[#9C27B0]" />
            </div>
            <div className="grid gap-8 md:grid-cols-4">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className="process-card relative rounded-[25px] border border-[#2d0a4e]/10 bg-[#FAF5FB] p-7 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_60px_rgba(45,10,78,0.08)]"
                >
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#2d0a4e] text-[9px] font-black text-white">
                    {step.number}
                  </div>
                  <h3 className="mt-10 text-xl font-black tracking-tight text-[#2d0a4e]">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-xs leading-6 text-[#7e5a8e]">
                    {step.text}
                  </p>
                  <div className="mt-8 h-px w-10 bg-[#9C27B0]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section relative overflow-hidden bg-[#F3E5F5] py-32 md:py-44">
        <div className="px-6 md:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#9C27B0]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#6A1B9A]">
                  Customer Voices
                </span>
              </div>
              <div className="overflow-hidden">
                <h2 className="section-title-line text-5xl font-light leading-none tracking-[-0.05em] text-[#2d0a4e] md:text-7xl">
                  Loved by Homes,
                  <br />
                  <span className="font-black">
                    Offices & Celebrations.
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="testimonial-track flex w-max gap-5 px-6 md:px-10">
          {[...testimonials, ...testimonials].map(
            (item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="w-[330px] rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(45,10,78,0.07)] md:w-[430px]"
              >
                <div className="text-xl tracking-[0.2em] text-[#9C27B0]">
                  ★★★★★
                </div>
                <p className="mt-7 text-lg font-light leading-7 text-[#5e2a7e]">
                  "{item.quote}"
                </p>
                <div className="mt-10 border-t border-[#2d0a4e]/10 pt-5">
                  <div className="text-sm font-black text-[#2d0a4e]">
                    {item.name}
                  </div>
                  <div className="mt-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#7e57a2]">
                    {item.role}
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="contact-section relative overflow-hidden bg-[#2d0a4e] px-6 py-32 text-white md:px-10 md:py-44"
      >
        <div className="absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-[#9C27B0]/10 blur-[130px]" />
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-20 lg:grid-cols-[0.8fr_1.2fr]">

            {/* LEFT — Contact Info */}
            <div className="contact-info">
              <div className="contact-kicker mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#CE93D8]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#CE93D8]">
                  Get In Touch
                </span>
              </div>
              <h2 className="contact-heading text-5xl font-light leading-[0.95] tracking-[-0.05em] md:text-7xl">
                Let's Start
                <br />
                <span className="font-black">
                  Your Pure Water
                </span>
                <br />
                Journey.
              </h2>
              <p className="mt-8 max-w-md text-[15px] leading-7 text-white/50">
                Home, office, or a grand occasion — we're
                ready. Reach out and we'll respond within
                the hour.
              </p>

              <div className="mt-12 grid gap-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#CE93D8]">
                    <FiMapPin />
                  </span>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Location
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      {CONTACT_ADDRESS}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#CE93D8]">
                    <FiPhone />
                  </span>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Phone
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      {CONTACT_PHONE}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#CE93D8]">
                    <FiMail />
                  </span>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Email
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      {CONTACT_EMAIL}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#CE93D8]">
                    <FiClock />
                  </span>
                  <div>
                    <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/30">
                      Office Hours
                    </div>
                    <div className="mt-2 text-sm text-white/70">
                      {OFFICE_HOURS}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Form */}
            <form
              className="contact-form rounded-[30px] border border-white/10 bg-white/[0.06] p-7 shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-xl md:p-10"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="mb-8">
                <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#CE93D8]">
                  Request a Dealership / Enquiry
                </div>
                <h3 className="mt-3 text-2xl font-black">
                  Tell us what you need.
                </h3>
              </div>

              <div className="grid gap-5 md:grid-cols-2">

                {/* FULL NAME */}
                <div className="md:col-span-1">
                  <label
                    htmlFor="fullName"
                    className="sr-only"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={formStatus === "submitting"}
                    className={`form-input w-full ${
                      getFieldError("fullName")
                        ? "border-red-400"
                        : ""
                    }`}
                  />
                  {getFieldError("fullName") && (
                    <p className="mt-1 text-xs text-red-400">
                      {getFieldError("fullName")}
                    </p>
                  )}
                </div>

                {/* PHONE */}
                <div className="md:col-span-1">
                  <label
                    htmlFor="phone"
                    className="sr-only"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="10-digit Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={formStatus === "submitting"}
                    maxLength={10}
                    className={`form-input w-full ${
                      getFieldError("phone")
                        ? "border-red-400"
                        : ""
                    }`}
                  />
                  {getFieldError("phone") && (
                    <p className="mt-1 text-xs text-red-400">
                      {getFieldError("phone")}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="email"
                    className="sr-only"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={formStatus === "submitting"}
                    className={`form-input w-full ${
                      getFieldError("email")
                        ? "border-red-400"
                        : ""
                    }`}
                  />
                  {getFieldError("email") && (
                    <p className="mt-1 text-xs text-red-400">
                      {getFieldError("email")}
                    </p>
                  )}
                </div>

                {/* MESSAGE */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="sr-only"
                  >
                    Your Requirement
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your requirement..."
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={formStatus === "submitting"}
                    className="form-input w-full resize-none"
                  />
                </div>
              </div>

              {/* SUCCESS MESSAGE */}
              {formStatus === "success" && (
                <div className="mt-5 rounded-xl bg-[#CE93D8]/20 px-4 py-3 text-sm text-[#CE93D8]">
                  ✅ Thank you! We have received your
                  enquiry and will get back to you shortly.
                </div>
              )}

              {/* GENERAL ERROR MESSAGE */}
              {formStatus === "error" &&
                formErrors.length === 0 && (
                  <div className="mt-5 rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-300">
                    ❌ Something went wrong. Please check
                    your details and try again.
                  </div>
                )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="magnetic mt-7 flex items-center justify-center gap-3 rounded-full bg-[#CE93D8] px-7 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#2d0a4e] transition hover:bg-white disabled:opacity-60"
              >
                {formStatus === "submitting"
                  ? "Sending..."
                  : "Send Message"}
                <FiSend />
              </button>

              <p className="mt-5 text-[11px] leading-5 text-white/30">
                By submitting this form, you agree to be
                contacted by the Jambooneer team regarding
                your enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer bg-[#1a052e] px-6 py-16 text-white md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-[1.3fr_1fr_1fr]">
            <div className="footer-reveal">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-[180px] items-center justify-center">
                  <img
                    src={logo}
                    alt="Jambooneer logo"
                    className="h-[145px] w-[290px] object-contain"
                  />
                </div>
              </div>
              <p className="mt-7 max-w-sm text-[19px] leading-6 text-white/40">
                Pure water delivered with care, straight to
                your doorstep.
              </p>
            </div>

            <div className="footer-reveal">
              <div className="text-[19px] font-black uppercase tracking-[0.25em] text-[#CE93D8]">
                Products
              </div>
              <div className="mt-5 grid gap-3 text-[15px] text-white/45">
                <span>Packaged Water</span>
                <span>Dealership</span>
                <span>Bulk Supply</span>
                <span>Mineral Water</span>
                <span>Office Solutions</span>
                <span>Event Packages</span>
              </div>
            </div>

            <div className="footer-reveal">
              <div className="text-[19px] font-black uppercase tracking-[0.25em] text-[#CE93D8]">
                Company
              </div>
              <div className="mt-5 grid gap-3 text-[15px] text-white/45">
                <button
                  onClick={() => scrollTo("about")}
                  className="text-left"
                >
                  About Us
                </button>
                <button
                  onClick={() => scrollTo("why-us")}
                  className="text-left"
                >
                  Why Choose Us
                </button>
                <button
                  onClick={() => scrollTo("process")}
                  className="text-left"
                >
                  How It Works
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="text-left"
                >
                  Contact
                </button>
                <span>Careers</span>
              </div>
            </div>
          </div>

          <div className="footer-reveal flex flex-col justify-between gap-5 pt-8 text-[14px] uppercase tracking-[0.18em] text-white/25 md:flex-row">
            <span>© 2026 Jambooneer. All rights reserved.</span>
            <span>Pure water. Honest delivery.</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
