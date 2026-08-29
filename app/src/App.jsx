import { useState, useEffect, useRef } from "react";
import "./index.css";
import { supabase } from "./lib/supabaseClient";
import Dashboard from "./Dashboard";

const branches = [
  {
    id: "cs",
    icon: "💻",
    label: "Computer Science",
    color: "#00f5ff",
    desc: "Web dev, ML/AI, DSA, OS, DBMS, App Development",
    projects: ["Portfolio Website", "Chat Application", "ML Model", "API Builder", "E-Commerce App"],
  },
  {
    id: "mech",
    icon: "⚙️",
    label: "Mechanical",
    color: "#ff9500",
    desc: "CAD designs, Thermodynamics, Fluid Mechanics, Robotics",
    projects: ["Robotic Arm Design", "Heat Exchanger", "Gear Mechanism", "3D CAD Model", "Drone Frame"],
  },
  {
    id: "civil",
    icon: "🏗️",
    label: "Civil",
    color: "#4cd964",
    desc: "Structural design, AutoCAD, Surveying, Construction Tech",
    projects: ["Bridge Design", "Smart City Plan", "Earthquake Analysis", "Water Treatment", "Green Building"],
  },
  {
    id: "elec",
    icon: "⚡",
    label: "Electronics",
    color: "#ff2d55",
    desc: "Circuit Design, Embedded Systems, IoT, VLSI, PCB",
    projects: ["IoT Smart Home", "Arduino Robot", "PCB Design", "Signal Processor", "Power System"],
  },
  {
    id: "it",
    icon: "🌐",
    label: "IT / AI & ML",
    color: "#af52de",
    desc: "Deep Learning, NLP, Cloud, Cybersecurity, Data Science",
    projects: ["Chatbot with NLP", "Image Classifier", "Fraud Detector", "Cloud Dashboard", "Face Recognition"],
  },
  {
    id: "chem",
    icon: "🧪",
    label: "Chemical",
    color: "#ffcc00",
    desc: "Process Design, Simulation, Material Science, Environment",
    projects: ["Reactor Design", "Distillation Column", "Wastewater Plant", "Polymer Study", "Catalyst Analysis"],
  },
];

const services = [
  { icon: "🚀", title: "Project Ideas", desc: "100+ curated project topics for every branch & semester" },
  { icon: "📋", title: "Full Documentation", desc: "IEEE-format reports, abstracts, and project reports" },
  { icon: "💡", title: "AI-Powered Help", desc: "Get instant guidance on your project doubts" },
  { icon: "🎓", title: "Mini & Major Projects", desc: "From simple mini projects to full major project builds" },
  { icon: "🖥️", title: "Code & Design", desc: "Working source code, circuit diagrams, and CAD files" },
  { icon: "📊", title: "PPT & Presentation", desc: "Professional presentations with content and design" },
];

const stats = [
  { num: "10,000+", label: "Students Helped" },
  { num: "500+", label: "Project Topics" },
  { num: "6+", label: "Engineering Branches" },
  { num: "98%", label: "Success Rate" },
];

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "Branches", "Services", "Projects", "Contact"];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-logo">
        <span className="logo-icon">⚡</span>
        <span className="logo-text">EngiAssist</span>
        <span className="logo-badge">PRO</span>
      </div>
      <ul className={`nav-links ${mobileOpen ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className={active === l ? "active" : ""}
              onClick={() => { setActive(l); setMobileOpen(false); }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        <button className="btn-nav-cta" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
          Get Help Now
        </button>
        <button className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const phrases = ["Computer Science Projects", "Mechanical Design Help", "Civil Engineering Docs", "Electronics & IoT Ideas", "AI/ML Project Guidance"];
  const phraseIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    const tick = () => {
      const current = phrases[phraseIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          phraseIdx.current = (phraseIdx.current + 1) % phrases.length;
        }
      }
      setTimeout(tick, deleting.current ? 40 : 65);
    };
    const t = setTimeout(tick, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="grid-overlay"></div>
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">🎓 India's #1 Engineering Student Portal</div>
        <h1 className="hero-title">
          Your Ultimate Guide for<br />
          <span className="typed-line">
            <span className="typed-text">{typed}</span>
            <span className="cursor">|</span>
          </span>
        </h1>
        <p className="hero-sub">
          From CS to Civil, Mechanical to Electronics — we help every engineering student
          build outstanding projects, write perfect reports, and ace their academics.
        </p>
        <div className="hero-btns">
          <button
            className="btn-primary"
            onClick={() => document.getElementById("branches").scrollIntoView({ behavior: "smooth" })}
          >
            Explore Your Branch 🚀
          </button>
          <button
            className="btn-secondary"
            onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
          >
            View Projects ↗
          </button>
        </div>
        <div className="hero-stats">
          {stats.map((s) => (
            <div key={s.label} className="stat-chip">
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <div className="floating-card fc1">💻 CS Project Help</div>
        <div className="floating-card fc2">⚙️ Mech CAD Design</div>
        <div className="floating-card fc3">🤖 AI/ML Models</div>
        <div className="floating-card fc4">🏗️ Civil Reports</div>
        <div className="center-glow">
          <span>⚡</span>
        </div>
      </div>
    </section>
  );
}

function Branches() {
  const [active, setActive] = useState(null);

  return (
    <section className="branches-section" id="branches">
      <div className="section-header">
        <span className="section-tag">All Branches</span>
        <h2>Choose Your Engineering Branch</h2>
        <p>Specialized project guidance for every discipline</p>
      </div>
      <div className="branches-grid">
        {branches.map((b) => (
          <div
            key={b.id}
            className={`branch-card ${active === b.id ? "active" : ""}`}
            style={{ "--accent": b.color }}
            onClick={() => setActive(active === b.id ? null : b.id)}
          >
            <div className="branch-icon">{b.icon}</div>
            <h3>{b.label}</h3>
            <p>{b.desc}</p>
            {active === b.id && (
              <div className="branch-projects">
                <p className="proj-title">Popular Projects:</p>
                <ul>
                  {b.projects.map((p) => (
                    <li key={p}>→ {p}</li>
                  ))}
                </ul>
                <button
                  className="branch-cta"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get Help with {b.label} Projects
                </button>
              </div>
            )}
            <div className="branch-glow"></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services-section" id="services">
      <div className="section-header light">
        <span className="section-tag">What We Offer</span>
        <h2>Everything You Need to Excel</h2>
        <p>Complete engineering project support from idea to submission</p>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card">
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [selectedBranch, setSelectedBranch] = useState("cs");
  const current = branches.find((b) => b.id === selectedBranch);

  return (
    <section className="projects-section" id="projects">
      <div className="section-header">
        <span className="section-tag">Project Ideas</span>
        <h2>Explore Project Topics</h2>
        <p>Handpicked project ideas for each engineering branch</p>
      </div>
      <div className="proj-tabs">
        {branches.map((b) => (
          <button
            key={b.id}
            className={`proj-tab ${selectedBranch === b.id ? "active" : ""}`}
            style={selectedBranch === b.id ? { "--tab-color": b.color } : {}}
            onClick={() => setSelectedBranch(b.id)}
          >
            {b.icon} {b.label}
          </button>
        ))}
      </div>
      <div className="proj-cards" style={{ "--accent": current.color }}>
        {current.projects.map((p, i) => (
          <div key={p} className="proj-card" style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="proj-number">0{i + 1}</div>
            <div className="proj-name">{p}</div>
            <div className="proj-branch">{current.icon} {current.label}</div>
            <button
              className="proj-btn"
              onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
            >
              Get This Project →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", branch: "cs", semester: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const branchName =
      branches.find((b) => b.id === form.branch)?.label || form.branch;

    // Save the lead so it shows up in /dashboard — if this fails (e.g. offline),
    // we still let the student reach us on WhatsApp below.
    try {
      const { error: insertError } = await supabase.from("leads").insert([
        {
          name: form.name,
          email: form.email,
          branch: form.branch,
          semester: form.semester,
          project: form.project,
          message: form.message,
        },
      ]);
      if (insertError) console.error("Lead save failed:", insertError.message);
    } catch (err) {
      console.error("Lead save failed:", err);
    }

    const message = `Hello EngiAssist!

New Project Help Request

Name: ${form.name}
Email: ${form.email}
Branch: ${branchName}
Semester: ${form.semester || "Not specified"}
Project: ${form.project || "Not specified"}

Message:
${form.message || "No message provided"}

Please contact me regarding my project.`;

    const whatsappUrl =
      `https://wa.me/919021698707?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <div className="section-header light">
        <span className="section-tag">Get Started</span>
        <h2>Request Project Help</h2>
        <p>Tell us your branch and project needs — we'll guide you step by step</p>
      </div>
      <div className="contact-wrapper">
        <div className="contact-info">
          <h3>Why Choose EngiAssist?</h3>
          <ul>
            <li>✅ Expert guidance for all 6 engineering branches</li>
            <li>✅ Complete project from scratch or partial help</li>
            <li>✅ IEEE-format documentation & reports</li>
            <li>✅ Working source code & design files</li>
            <li>✅ Presentation & PPT preparation</li>
            <li>✅ Fast turnaround — results in 24–48 hours</li>
          </ul>
          <div className="contact-badges">
            <span>🏆 Top Rated</span>
            <span>⚡ Fast Delivery</span>
            <span>🔒 100% Original</span>
          </div>
        </div>

        {!submitted ? (
          <form className="contact-form" onSubmit={submit}>
            <div className="form-row">
              <input name="name" placeholder="Your Full Name *" value={form.name} onChange={handle} required />
              <input name="email" type="email" placeholder="Email Address *" value={form.email} onChange={handle} required />
            </div>
            <div className="form-row">
              <select name="branch" value={form.branch} onChange={handle}>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>{b.icon} {b.label}</option>
                ))}
              </select>
              <select name="semester" value={form.semester} onChange={handle}>
                <option value="">Select Semester</option>
                {[...Array(8)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                ))}
              </select>
            </div>
            <input name="project" placeholder="Project Name / Topic (if you have one)" value={form.project} onChange={handle} />
            <textarea name="message" placeholder="Describe what help you need (project type, deadline, specific requirements...)" rows={4} value={form.message} onChange={handle}></textarea>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Request 🚀"}
            </button>
          </form>
        ) : (
          <div className="success-box">
            <div className="success-icon">🎉</div>
            <h3>Request Received!</h3>
            <p>We'll reach out to you within 24 hours. Check your email at <strong>{form.email}</strong></p>
            <button className="btn-primary" onClick={() => setSubmitted(false)}>Submit Another Request</button>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo-icon">⚡</span>
          <span>EngiAssist</span>
        </div>
        <p>Empowering every engineering student to build, learn, and succeed.</p>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#branches">Branches</a>
          <a href="#services">Services</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <p className="footer-copy">© 2026 EngiAssist. Built for engineering students. 🇮🇳</p>
        <a className="footer-admin-link" href="/dashboard">Admin Login</a>
      </div>
    </footer>
  );
}

function Landing() {
  const [active, setActive] = useState("Home");

  const openWhatsApp = () => {
    const message = "Hello EngiAssist! I need help with my engineering project.";
    const whatsappUrl = `https://wa.me/919021698707?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Branches />
      <Services />
      <Projects />
      <Contact />
      <Footer />

      {/* Floating WhatsApp Button */}
      <button
        onClick={openWhatsApp}
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        style={{
          position: "fixed",
          right: "24px",
          bottom: "24px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          background: "#25D366",
          color: "white",
          fontSize: "30px",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  width="32"
  height="32"
  fill="white"
  aria-hidden="true"
>
  <path d="M20.52 3.449A11.86 11.86 0 0 0 12.05 0C5.495 0 .163 5.332.163 11.89c0 2.096.548 4.142 1.588 5.946L0 24l6.335-1.655a11.88 11.88 0 0 0 5.709 1.447h.005c6.554 0 11.887-5.332 11.887-11.89a11.85 11.85 0 0 0-3.416-8.453zM12.05 21.79h-.004a9.87 9.87 0 0 1-5.032-1.378l-.361-.214-3.76.982 1.004-3.67-.235-.375a9.87 9.87 0 0 1-1.51-5.245c0-5.442 4.43-9.872 9.877-9.872a9.83 9.83 0 0 1 6.994 2.9 9.83 9.83 0 0 1 2.894 6.994c-.003 5.445-4.433 9.878-9.867 9.878zm5.413-7.397c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.149-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.256-.463-2.39-1.475-.883-.788-1.48-1.762-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
</svg>
      </button>
    </div>
  );
}

export default function App() {
  // Lightweight path-based routing — no router library needed for two pages.
  const isDashboard =
    typeof window !== "undefined" &&
    window.location.pathname.replace(/\/+$/, "") === "/dashboard";
  return isDashboard ? <Dashboard /> : <Landing />;
}
