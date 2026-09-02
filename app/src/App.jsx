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

const howItWorksSteps = [
  {
    num: "01",
    icon: "📝",
    title: "Tell Us Your Project",
    desc: "Pick your branch, semester, and describe what you need — mini project, major project, or just guidance.",
  },
  {
    num: "02",
    icon: "🤝",
    title: "Get Matched Instantly",
    desc: "We connect you with the right expert for your exact branch and topic — no generic templates.",
  },
  {
    num: "03",
    icon: "⚡",
    title: "Receive Everything You Need",
    desc: "Working code, CAD/circuit files, IEEE-format documentation, and a polished PPT — all in one package.",
  },
  {
    num: "04",
    icon: "🎯",
    title: "Submit With Confidence",
    desc: "Understand every part of your project so you can explain it in viva and score full marks.",
  },
];

const faqs = [
  {
    q: "Will I actually understand my own project?",
    a: "Yes — every project comes with a plain-language walkthrough so you can explain it confidently in your viva, not just submit it.",
  },
  {
    q: "Is the work original and plagiarism-free?",
    a: "100%. Every project is built specifically for you, not copy-pasted from old submissions.",
  },
  {
    q: "How fast can I get help?",
    a: "Most requests get a response within 24–48 hours, depending on project complexity and deadline.",
  },
  {
    q: "Do you help with mini projects and major final-year projects?",
    a: "Both — from a 2-week mini project to a full major/final-year project with complete documentation.",
  },
  {
    q: "What if my branch isn't fully listed?",
    a: "Reach out anyway — the 6 branches cover most requests, but we regularly help with related and interdisciplinary topics too.",
  },
];

const fixItems = [
  "Code Errors",
  "Missing Modules",
  "Database Problems",
  "Documentation",
  "UI Improvements",
  "Testing",
  "PPT",
  "Viva Preparation",
];

const testimonials = [
  {
    quote: "I finally understood my own major project well enough to ace the viva. The documentation was IEEE-perfect too.",
    name: "Aditi R.",
    branch: "Computer Science, Final Year",
  },
  {
    quote: "My CAD design for the robotic arm project was done professionally, and they explained every part of it to me.",
    name: "Rohan K.",
    branch: "Mechanical Engineering",
  },
  {
    quote: "Fast turnaround, clean code, and a presentation that actually looked premium in front of my panel.",
    name: "Sneha P.",
    branch: "IT / AI & ML",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function CountUp({ value }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState("0");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const match = value.match(/^([\d,]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseInt(match[1].replace(/,/g, ""), 10);
    const suffix = match[2];
    const duration = 1400;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      setDisplay(current.toLocaleString() + suffix);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target.toLocaleString() + suffix);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, value]);

  return <span ref={ref}>{display}</span>;
}

function TrustStrip() {
  const items = [
    { icon: "🔒", text: "100% Original Work" },
    { icon: "⚡", text: "24–48hr Turnaround" },
    { icon: "🎓", text: "Expert Engineers" },
    { icon: "✅", text: "Verified & Secure" },
  ];
  return (
    <div className="trust-strip">
      {items.map((t) => (
        <div key={t.text} className="trust-item">
          <span className="trust-icon">{t.icon}</span>
          <span>{t.text}</span>
        </div>
      ))}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const move = (e) => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div className="cursor-glow" ref={glowRef}></div>;
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Home", "Branches", "Services", "About", "Projects", "Contact"];

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
              href={l === "About" ? "/about" : l === "Home" ? "/" : `/#${l.toLowerCase()}`}
              className={active === l ? "active" : ""}
              onClick={() => { setActive(l); setMobileOpen(false); }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-actions">
        <button
          className="btn-nav-cta"
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else window.location.href = "/#contact";
          }}
        >
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
              <span className="stat-num"><CountUp value={s.num} /></span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
        <TrustStrip />
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
      <Reveal className="section-header">
        <span className="section-tag">All Branches</span>
        <h2>Choose Your Engineering Branch</h2>
        <p>Specialized project guidance for every discipline</p>
      </Reveal>
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
      <Reveal className="section-header light">
        <span className="section-tag">What We Offer</span>
        <h2>Everything You Need to Excel</h2>
        <p>Complete engineering project support from idea to submission</p>
      </Reveal>
      <div className="services-grid">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 60} className="service-card">
            <div className="service-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works">
      <Reveal className="section-header light">
        <span className="section-tag">Simple Process</span>
        <h2>How EngiAssist Works</h2>
        <p>From idea to submission in 4 clear steps</p>
      </Reveal>
      <div className="how-grid">
        {howItWorksSteps.map((s, i) => (
          <Reveal key={s.num} delay={i * 100} className="how-card-wrap">
            <div className="how-card">
              <span className="how-num">{s.num}</span>
              <div className="how-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
            {i < howItWorksSteps.length - 1 && <div className="how-connector"></div>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FixMyProject() {
  return (
    <section className="fix-section" id="fix-my-project">
      <Reveal className="section-header">
        <span className="section-tag">Already In Progress?</span>
        <h2>Your Project Doesn't Have To Start From Zero</h2>
        <p>Already have a project? We can help you fix, finish, or explain it.</p>
      </Reveal>
      <Reveal className="fix-wrapper" delay={100}>
        <div className="fix-chips">
          {fixItems.map((f) => (
            <span key={f} className="fix-chip">{f}</span>
          ))}
        </div>
        <button
          className="btn-primary"
          onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
        >
          Get Help With My Existing Project →
        </button>
      </Reveal>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonials-section">
      <Reveal className="section-header">
        <span className="section-tag">Student Voices</span>
        <h2>What Students Say</h2>
        <p>Real feedback from students who got their projects done right</p>
      </Reveal>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 100} className="testimonial-card">
            <div className="testimonial-quote-mark">"</div>
            <p className="testimonial-text">{t.quote}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.name.charAt(0)}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-branch">{t.branch}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section" id="faq">
      <Reveal className="section-header light">
        <span className="section-tag">Got Questions?</span>
        <h2>Frequently Asked Questions</h2>
        <p>Everything students usually ask before getting started</p>
      </Reveal>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 60} className="faq-item-wrap">
            <div className={`faq-item ${open === i ? "faq-open" : ""}`}>
              <button className="faq-question" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-toggle">{open === i ? "−" : "+"}</span>
              </button>
              <div className="faq-answer">
                <p>{f.a}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
function AboutUs() {
  return (
    <section className="about-section" id="about">
      <Reveal className="section-header">
        <span className="section-tag">Who We Are</span>
        <h2>Meet the Founder</h2>
        <p>Built by an engineer, for engineers</p>
      </Reveal>

      <div className="about-wrapper">
        <div className="founder-card">
          <div className="founder-glow"></div>
          <div className="founder-avatar">
            <span>PP</span>
          </div>
          <h3 className="founder-name">Pratik Patil</h3>
          <p className="founder-role">CEO &amp; Founder, EngiAssist</p>

          <div className="founder-badges">
            <span className="founder-badge">⚙️ Mechanical Engineer</span>
            <span className="founder-badge">📈 Marketing Manager @ Top Company</span>
            <span className="founder-badge">📍 Jalgaon, Maharashtra</span>
          </div>

          <p className="founder-bio">
            Pratik founded EngiAssist to give engineering students across every
            branch the same project guidance and support he wished he'd had —
            combining hands-on mechanical engineering expertise with real-world
            marketing and leadership experience at a top company. Based in
            Jalgaon, Maharashtra, he's built EngiAssist into a trusted resource
            for thousands of students working on mini and major projects.
          </p>
        </div>

        <div className="about-highlights">
          <div className="about-highlight-card">
            <div className="about-highlight-icon">🎓</div>
            <h4>Engineer-Led</h4>
            <p>Every project reviewed with real engineering rigor, not just templates.</p>
          </div>
          <div className="about-highlight-card">
            <div className="about-highlight-icon">📣</div>
            <h4>Marketing-Backed</h4>
            <p>Presentation and communication polish from real industry marketing experience.</p>
          </div>
          <div className="about-highlight-card">
            <div className="about-highlight-icon">🇮🇳</div>
            <h4>Proudly Local</h4>
            <p>Based in Jalgaon, Maharashtra — supporting students across India.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const [active, setActive] = useState("About");
  return (
    <div className="app">
      <CursorGlow />
      <Navbar active={active} setActive={setActive} />
      <section className="about-hero">
        <div className="hero-bg">
          <div className="grid-overlay"></div>
          <div className="orb orb1"></div>
          <div className="orb orb2"></div>
        </div>
        <Reveal className="about-hero-content">
          <span className="hero-badge">🎓 The Story Behind EngiAssist</span>
          <h1 className="about-hero-title">About EngiAssist</h1>
          <p className="hero-sub">
            Built by an engineer who understands exactly what students need —
            not just a finished project, but real understanding.
          </p>
        </Reveal>
      </section>
      <AboutUs />
      <Testimonials />
      <Footer />
    </div>
  );
}

function Projects() {
  const [selectedBranch, setSelectedBranch] = useState("cs");
  const current = branches.find((b) => b.id === selectedBranch);

  return (
    <section className="projects-section" id="projects">
      <Reveal className="section-header">
        <span className="section-tag">Project Ideas</span>
        <h2>Explore Project Topics</h2>
        <p>Handpicked project ideas for each engineering branch</p>
      </Reveal>
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

const projectStatusOptions = [
  { value: "idea", label: "Only Idea" },
  { value: "started", label: "Started" },
  { value: "partial", label: "Partially Completed" },
  { value: "almost", label: "Almost Completed" },
];

function makeLeadCode() {
  // Short human-readable reference the student can quote over WhatsApp —
  // not a database key, just something friendlier than a UUID.
  const n = Date.now().toString().slice(-6);
  return `EA-${n}`;
}

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    branch: "cs",
    semester: "",
    project: "",
    projectStatus: "",
    deadline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leadCode, setLeadCode] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const branchName =
      branches.find((b) => b.id === form.branch)?.label || form.branch;
    const statusLabel =
      projectStatusOptions.find((s) => s.value === form.projectStatus)?.label || "Not specified";

    const code = makeLeadCode();

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
          project_status: form.projectStatus || null,
          deadline: form.deadline || null,
          message: form.message,
          lead_code: code,
        },
      ]);
      if (insertError) console.error("Lead save failed:", insertError.message);
    } catch (err) {
      console.error("Lead save failed:", err);
    }

    const message = `Hello EngiAssist!

New Project Help Request (Ref: ${code})

Name: ${form.name}
Email: ${form.email}
Branch: ${branchName}
Semester: ${form.semester || "Not specified"}
Project: ${form.project || "Not specified"}
Current Status: ${statusLabel}
Deadline: ${form.deadline || "Not specified"}

Message:
${form.message || "No message provided"}

Please contact me regarding my project.`;

    const whatsappUrl =
      `https://wa.me/919021698707?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setSubmitting(false);
    setLeadCode(code);
    setSubmitted(true);
  };

  return (
    <section className="contact-section" id="contact">
      <Reveal className="section-header light">
        <span className="section-tag">Get Started</span>
        <h2>Request Project Help</h2>
        <p>Tell us your branch and project needs — we'll guide you step by step</p>
      </Reveal>
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
            <div className="form-row">
              <select name="projectStatus" value={form.projectStatus} onChange={handle}>
                <option value="">Current Status</option>
                {projectStatusOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
              <input name="deadline" type="date" placeholder="Deadline" value={form.deadline} onChange={handle} />
            </div>
            <textarea name="message" placeholder="Describe what help you need (specific requirements, existing issues, etc.)" rows={4} value={form.message} onChange={handle}></textarea>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Request 🚀"}
            </button>
          </form>
        ) : (
          <div className="success-box">
            <div className="success-icon">🎉</div>
            <h3>Requirement Received!</h3>
            <p className="success-lead-code">Reference ID: <strong>{leadCode}</strong></p>
            <p>Our team will review your requirement and reach out on WhatsApp. Quote the reference above if you follow up with us.</p>
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
          <a href="/">Home</a>
          <a href="/#branches">Branches</a>
          <a href="/#services">Services</a>
          <a href="/about">About</a>
          <a href="/#projects">Projects</a>
          <a href="/#contact">Contact</a>
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
      <CursorGlow />
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Branches />
      <HowItWorks />
      <Services />
      <FixMyProject />
      <Testimonials />
      <Projects />
      <FAQ />
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
  // Lightweight path-based routing — no router library needed for a few pages.
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "") || "/"
      : "/";

  if (path === "/dashboard") return <Dashboard />;
  if (path === "/about") return <AboutPage />;
  return <Landing />;
}
