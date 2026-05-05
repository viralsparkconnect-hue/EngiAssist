import { useState, useEffect, useRef } from "react";
import "./index.css";

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

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
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
            <button type="submit" className="btn-submit">
              Submit Request 🚀
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
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");
  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Branches />
      <Services />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
