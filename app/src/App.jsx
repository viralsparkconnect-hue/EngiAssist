import { useState, useEffect, useRef, lazy, Suspense } from "react";
import "./index.css";
import {
  Cpu, Cog, Building2, Zap, Globe, FlaskConical,
  Rocket, ClipboardList, MessageCircleQuestion, GraduationCap,
  MonitorSmartphone, BarChart3, Target,
  Wrench, Lightbulb, Landmark,
  FileEdit, Handshake, PackageCheck,
  Lock, Mic,
  TrendingUp, MapPin, Megaphone, CheckCircle2, ArrowRight, ArrowUpRight, MessageCircle, ExternalLink, Mail, Sun,
} from "lucide-react";

// Lazy-loaded: Dashboard (and the Supabase client it uses) should only be
// downloaded by admins visiting /dashboard, not by every landing-page visitor.
const Dashboard = lazy(() => import("./Dashboard"));

const branches = [
  {
    id: "cs",
    icon: Cpu,
    label: "Computer Science",
    color: "#00f5ff",
    desc: "Web dev, ML/AI, DSA, OS, DBMS, App Development",
    projects: ["Portfolio Website", "Chat Application", "ML Model", "API Builder", "E-Commerce App"],
  },
  {
    id: "mech",
    icon: Cog,
    label: "Mechanical",
    color: "#ff9500",
    desc: "CAD designs, Thermodynamics, Fluid Mechanics, Robotics",
    projects: ["Robotic Arm Design", "Heat Exchanger", "Gear Mechanism", "3D CAD Model", "Drone Frame"],
  },
  {
    id: "civil",
    icon: Building2,
    label: "Civil",
    color: "#4cd964",
    desc: "Structural design, AutoCAD, Surveying, Construction Tech",
    projects: ["Bridge Design", "Smart City Plan", "Earthquake Analysis", "Water Treatment", "Green Building"],
  },
  {
    id: "elec",
    icon: Zap,
    label: "Electronics",
    color: "#ff2d55",
    desc: "Circuit Design, Embedded Systems, IoT, VLSI, PCB",
    projects: ["IoT Smart Home", "Arduino Robot", "PCB Design", "Signal Processor", "Power System"],
  },
  {
    id: "it",
    icon: Globe,
    label: "IT / AI & ML",
    color: "#af52de",
    desc: "Deep Learning, NLP, Cloud, Cybersecurity, Data Science",
    projects: ["Chatbot with NLP", "Image Classifier", "Fraud Detector", "Cloud Dashboard", "Face Recognition"],
  },
  {
    id: "chem",
    icon: FlaskConical,
    label: "Chemical",
    color: "#ffcc00",
    desc: "Process Design, Simulation, Material Science, Environment",
    projects: ["Reactor Design", "Distillation Column", "Wastewater Plant", "Polymer Study", "Catalyst Analysis"],
  },
];

const services = [
  { icon: Rocket, title: "Project Ideas", desc: "100+ curated project topics for every branch & semester" },
  { icon: ClipboardList, title: "Full Documentation", desc: "IEEE-format reports, abstracts, and project reports" },
  { icon: MessageCircleQuestion, title: "Doubt-Solving Support", desc: "Get personal guidance whenever you're stuck on your project" },
  { icon: GraduationCap, title: "Mini & Major Projects", desc: "From simple mini projects to full major project builds" },
  { icon: MonitorSmartphone, title: "Code & Design", desc: "Working source code, circuit diagrams, and CAD files" },
  { icon: BarChart3, title: "PPT & Presentation", desc: "Professional presentations with content and design" },
  { icon: Target, title: "Career & Placement Guidance", desc: "Practical support for resumes, interviews, internships, placements, and your engineering career" },
];

const stats = [
  { icon: Wrench, label: "Practical Engineering Support" },
  { icon: Lightbulb, label: "Project Ideas & Guidance" },
  { icon: Landmark, label: "Multiple Engineering Branches" },
  { icon: GraduationCap, label: "Built for Students" },
];

const howItWorksSteps = [
  {
    num: "01",
    icon: FileEdit,
    title: "Tell Us Your Project",
    desc: "Pick your branch, semester, and describe what you need — mini project, major project, or just guidance.",
  },
  {
    num: "02",
    icon: Handshake,
    title: "Get a Personal Response",
    desc: "Your request is reviewed personally and you'll hear back with next steps for your exact branch and topic — no generic templates.",
  },
  {
    num: "03",
    icon: PackageCheck,
    title: "Receive Everything You Need",
    desc: "Working code, CAD/circuit files, IEEE-format documentation, and a polished PPT — all in one package.",
  },
  {
    num: "04",
    icon: Target,
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


// Existing service pages that map directly onto a service (routes unchanged).
const serviceLinks = {
  "Full Documentation": "/project-documentation-help",
  "PPT & Presentation": "/ppt-presentation-help",
  "Career & Placement Guidance": "/career-placement-guidance",
};

const pad = (i) => String(i + 1).padStart(2, "0");

// A single shared IntersectionObserver serves every <Reveal>. Reveal is used
// sparingly (section headers only) and content is never left hidden if the
// observer is unavailable or the user prefers reduced motion.
let sharedRevealObserver = null;
const revealCallbacks = new WeakMap();

function getSharedRevealObserver() {
  if (sharedRevealObserver) return sharedRevealObserver;
  sharedRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cb = revealCallbacks.get(entry.target);
          if (cb) cb();
          sharedRevealObserver.unobserve(entry.target);
          revealCallbacks.delete(entry.target);
        }
      });
    },
    { threshold: 0.01, rootMargin: "0px 0px -6% 0px" }
  );
  return sharedRevealObserver;
}

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window === "undefined" ||
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = getSharedRevealObserver();
    revealCallbacks.set(el, () => setVisible(true));
    observer.observe(el);
    return () => {
      observer.unobserve(el);
      revealCallbacks.delete(el);
    };
  }, [visible]);

  return [ref, visible];
}

function Reveal({ children, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

// Left-aligned section header with a numbered technical label ("01 — BRANCHES").
// `n` is only passed on the landing page; reused sections on inner pages omit it.
function SectionHead({ n, label, title, titleId, children }) {
  return (
    <Reveal className="section-head">
      <p className="label">
        {n && (<><span className="label-num">{n}</span>{" — "}</>)}
        {label}
      </p>
      <h2 id={titleId}>{title}</h2>
      {children && <p className="section-sub">{children}</p>}
    </Reveal>
  );
}

function PageHero({ label, title, sub, marker }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="label">
          {marker && <span className="swatch" style={{ "--branch": marker }} aria-hidden="true"></span>}
          {label}
        </p>
        <h1>{title}</h1>
        <p className="page-sub">{sub}</p>
      </div>
    </section>
  );
}

function Navbar({ active, setActive }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef(null);

  // Close the mobile menu with Escape or a tap/click outside it.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setMobileOpen(false); };
    const onDown = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [mobileOpen]);

  const links = ["Home", "Branches", "Services", "About", "Projects", "Contact"];

  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header" ref={headerRef}>
        <nav className="navbar" aria-label="Primary">
          <a href="/" className="nav-logo" aria-label="EngiAssist home">
            <img src="/logo-72.png" width="34" height="34" alt="" className="logo-icon-img" />
            <span className="logo-text">EngiAssist</span>
          </a>
          <ul id="primary-menu" className={`nav-links ${mobileOpen ? "open" : ""}`}>
            {links.map((l) => (
              <li key={l}>
                <a
                  href={l === "About" ? "/about" : l === "Home" ? "/" : `/#${l.toLowerCase()}`}
                  className={active === l ? "active" : ""}
                  aria-current={active === l && (l === "Home" || l === "About") ? "page" : undefined}
                  onClick={() => { setActive(l); setMobileOpen(false); }}
                >
                  {l}
                </a>
              </li>
            ))}
            <li className="nav-divider-item">
              <a href="/Engisun" className="nav-solar"><Sun size={14} aria-hidden="true" /> EngiSun</a>
            </li>
          </ul>
          <div className="nav-actions">
            <a href="/#contact" className="btn btn-primary btn-sm" onClick={() => setMobileOpen(false)}>
              Get Help Now
            </a>
            <button
              type="button"
              className="hamburger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="primary-menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}

function Hero() {
  // Existing capability labels from the previous trust strip, shown once.
  const facts = ["100% Original Work", "24–48hr Turnaround", "Engineer-Led Guidance", "Secure Data Handling"];
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Engineering Help, Made Simple</p>
          <h1 className="hero-title" id="hero-title">Engineering project help, from first idea to viva.</h1>
          <p className="hero-sub">
            EngiAssist helps B.Tech, BE and Diploma students with project ideas, working code
            and design files, IEEE-format documentation, presentations and viva preparation —
            across six engineering branches.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#branches">Explore Your Branch <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /></a>
            <a className="btn btn-secondary" href="#projects">View Projects <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" /></a>
          </div>
          <ul className="hero-facts">
            {facts.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <aside className="branch-index" aria-label="Supported engineering branches">
          <div className="bi-head">
            <span>Branch index</span>
            <span>{String(branches.length).padStart(2, "0")} disciplines</span>
          </div>
          <ol>
            {branches.map((b, i) => (
              <li key={b.id} className="bi-row" style={{ "--branch": b.color }}>
                <span className="bi-num">{pad(i)}</span>
                <div>
                  <h3 className="bi-name"><span className="swatch" aria-hidden="true"></span>{b.label}</h3>
                  <p className="bi-desc">{b.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}

function Branches({ n }) {
  const [active, setActive] = useState(null);

  return (
    <section className="section section-alt" id="branches" aria-labelledby="branches-title">
      <div className="container">
        <SectionHead n={n} label="Branches" title="Choose Your Engineering Branch" titleId="branches-title">
          Specialized project guidance for every discipline
        </SectionHead>
        <ul className="rule-list">
          {branches.map((b, i) => {
            const open = active === b.id;
            return (
              <li key={b.id} className={open ? "is-open" : ""} style={{ "--branch": b.color }}>
                <h3 className="branch-heading">
                  <button
                    type="button"
                    className="branch-toggle"
                    id={`branch-btn-${b.id}`}
                    aria-expanded={open}
                    aria-controls={`branch-panel-${b.id}`}
                    onClick={() => setActive(open ? null : b.id)}
                  >
                    <span className="row-num">{pad(i)}</span>
                    <span className="branch-name"><span className="swatch" aria-hidden="true"></span>{b.label}</span>
                    <span className="branch-desc">{b.desc}</span>
                    <span className="toggle-mark" aria-hidden="true"></span>
                  </button>
                </h3>
                <div className="disclosure" id={`branch-panel-${b.id}`} role="region" aria-labelledby={`branch-btn-${b.id}`}>
                  <div className="disclosure-inner">
                    <div className="disclosure-body">
                      <span className="mono-label">Popular projects</span>
                      <ul className="topic-list">
                        {b.projects.map((p) => <li key={p}>{p}</li>)}
                      </ul>
                      <div className="branch-actions">
                        <a className="btn btn-secondary btn-sm" href="/#contact">
                          Get Help with {b.label} Projects <ArrowRight size={14} aria-hidden="true" />
                        </a>
                        <a className="text-link" href={branchSeoContent[b.id].path}>
                          About {b.label} project help <ArrowRight size={14} aria-hidden="true" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Services({ n }) {
  const career = services.find((s) => s.title.startsWith("Career"));
  const core = services.filter((s) => s !== career);
  const careerItems = serviceSeoPages["career-placement-guidance"].items;

  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="container">
        <SectionHead n={n} label="Services" title="Everything You Need to Excel" titleId="services-title">
          Complete engineering project support from idea to submission
        </SectionHead>
        <ul className="service-grid">
          {core.map((s) => (
            <li key={s.title}>
              <div className="service-row">
                <span className="service-icon" aria-hidden="true"><s.icon size={22} strokeWidth={1.75} /></span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  {serviceLinks[s.title] && (
                    <a className="text-link" href={serviceLinks[s.title]}>Learn more <ArrowRight size={14} aria-hidden="true" /></a>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="career-feature">
          <div className="career-main">
            <span className="mono-label">Featured</span>
            <h3><career.icon size={24} strokeWidth={1.75} aria-hidden="true" /> {career.title}</h3>
            <p className="career-lede">
              Explore project ideas, get guidance, and find resources to support your engineering journey — from projects to placements.
            </p>
            <p>{career.desc}</p>
            <div className="career-actions">
              <a className="btn btn-primary" href={serviceLinks[career.title]}>Explore Career Guidance <ArrowRight size={16} aria-hidden="true" /></a>
              <a className="btn btn-secondary" href="/#contact">Ask a Question</a>
            </div>
          </div>
          <ul className="career-items" aria-label="Career guidance topics">
            {careerItems.map((c, i) => <li key={c} data-n={pad(i)}>{c}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ n }) {
  return (
    <section className="section" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <SectionHead n={n} label="How it works" title="How EngiAssist Works" titleId="how-title">
          From idea to submission in 4 clear steps
        </SectionHead>
        <ol className="rail">
          {howItWorksSteps.map((s) => (
            <li key={s.num} className="rail-step">
              <span className="rail-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FixMyProject({ n }) {
  return (
    <section className="section section-alt" id="fix-my-project" aria-labelledby="fix-title">
      <div className="container split">
        <div>
          <SectionHead n={n} label="Already in progress?" title="Your Project Doesn't Have To Start From Zero" titleId="fix-title">
            Already have a project? We can help you fix, finish, or explain it.
          </SectionHead>
          <a className="btn btn-primary" href="/#contact">Get Help With My Existing Project <ArrowRight size={16} aria-hidden="true" /></a>
        </div>
        <ul className="checklist" aria-label="What we can help with">
          {fixItems.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </section>
  );
}

// NOTE: testimonial content is unchanged from the repository and has not been
// verified as genuine — see the final report.
function Testimonials({ n }) {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <SectionHead n={n} label="Student voices" title="What Students Say" titleId="testimonials-title">
          Real feedback from students who got their projects done right
        </SectionHead>
        <div className="quote-grid">
          {testimonials.map((t) => (
            <figure key={t.name} className="quote">
              <blockquote><p>{t.quote}</p></blockquote>
              <figcaption>
                <span className="quote-name">{t.name}</span>
                <span className="quote-meta">{t.branch}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ({ n }) {
  const [open, setOpen] = useState(0);

  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    script.setAttribute("data-faq-schema", "true");
    document.head.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <section className="section section-alt" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <SectionHead n={n} label="Questions" title="Frequently Asked Questions" titleId="faq-title">
          Everything students usually ask before getting started
        </SectionHead>
        <ul className="faq-list">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    className="faq-question"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="toggle-mark" aria-hidden="true"></span>
                  </button>
                </h3>
                <div className="disclosure" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                  <div className="disclosure-inner">
                    <div className="disclosure-body"><p>{f.a}</p></div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="section section-alt" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead label="Who we are" title="Meet the Founder" titleId="about-title">
          Built by an engineer, for engineers
        </SectionHead>
        <div className="about-grid">
          <div className="founder">
            <div className="founder-avatar" aria-hidden="true">PP</div>
            <h3 className="founder-name">Pratik Patil</h3>
            <p className="founder-role">CEO &amp; Founder, EngiAssist</p>
            <ul className="founder-tags">
              <li><Cog size={14} strokeWidth={2} aria-hidden="true" /> Mechanical Engineer</li>
              <li><TrendingUp size={14} strokeWidth={2} aria-hidden="true" /> Marketing Manager @ In Solar industry</li>
              <li><MapPin size={14} strokeWidth={2} aria-hidden="true" /> Jalgaon, Maharashtra</li>
            </ul>
            <p className="founder-bio">
              Pratik founded EngiAssist to give engineering students across every
              branch the same project guidance and support he wished he'd had —
              combining hands-on mechanical engineering expertise with real-world
              marketing and leadership experience In Solar industry. Based in
              Jalgaon, Maharashtra, he personally works with students on their
              mini and major projects.
            </p>
            <a
              href="https://www.linkedin.com/in/pratik-patil-7347512b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <ExternalLink size={14} strokeWidth={2} aria-hidden="true" /> Connect on LinkedIn
            </a>
          </div>

          <ul className="about-points">
            <li>
              <GraduationCap size={22} strokeWidth={1.75} aria-hidden="true" />
              <div><h4>Engineer-Led</h4><p>Every project reviewed with real engineering rigor, not just templates.</p></div>
            </li>
            <li>
              <Megaphone size={22} strokeWidth={1.75} aria-hidden="true" />
              <div><h4>Marketing-Backed</h4><p>Presentation and communication polish from real industry marketing experience.</p></div>
            </li>
            <li>
              <MapPin size={22} strokeWidth={1.75} aria-hidden="true" />
              <div><h4>Proudly Local</h4><p>Based in Jalgaon, Maharashtra — supporting students across India.</p></div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  const [active, setActive] = useState("About");
  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <main id="main" tabIndex={-1}>
        <PageHero
          label="The story behind EngiAssist"
          title="About EngiAssist"
          sub="Built by an engineer who understands exactly what students need — not just a finished project, but real understanding."
        />
        <AboutUs />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

// Ruled list of project topics for one branch (shared by the landing page and branch pages).
function TopicTable({ branch }) {
  return (
    <ol className="topic-table">
      {branch.projects.map((p, i) => (
        <li key={p} className="topic-row">
          <span className="row-num">{pad(i)}</span>
          <span className="topic-name">{p}</span>
          <span className="topic-branch">{branch.label}</span>
          <a className="text-link" href="/#contact">Get This Project <ArrowRight size={14} aria-hidden="true" /></a>
        </li>
      ))}
    </ol>
  );
}

function Projects({ n }) {
  const [selectedBranch, setSelectedBranch] = useState("cs");
  const current = branches.find((b) => b.id === selectedBranch);

  return (
    <section className="section section-alt" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHead n={n} label="Project ideas" title="Explore Project Topics" titleId="projects-title">
          Handpicked project ideas for each engineering branch
        </SectionHead>
        <div className="tabs" role="group" aria-label="Show project topics for a branch">
          {branches.map((b) => (
            <button
              key={b.id}
              type="button"
              className="tab"
              aria-pressed={selectedBranch === b.id}
              style={{ "--branch": b.color }}
              onClick={() => setSelectedBranch(b.id)}
            >
              <span className="swatch" aria-hidden="true"></span>{b.label}
            </button>
          ))}
        </div>
        <p className="label tab-status" aria-live="polite">Topics — {current.label}</p>
        <TopicTable branch={current} />
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

function Contact({ n }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
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
    // we still let the student reach us on WhatsApp below. Supabase is imported
    // dynamically here so the landing page doesn't ship that code upfront.
    try {
      const { supabase } = await import("./lib/supabaseClient");
      const { error: insertError } = await supabase.from("leads").insert([
        {
          name: form.name,
          phone: form.phone,
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
Phone: ${form.phone}
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
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHead n={n} label="Request help" title="Request Project Help" titleId="contact-title">
          Tell us your branch and project needs — we'll guide you step by step
        </SectionHead>
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Why Choose EngiAssist?</h3>
            <ul className="check-list">
              <li><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" /> Guidance for all 6 engineering branches</li>
              <li><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" /> Complete project from scratch or partial help</li>
              <li><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" /> IEEE-format documentation &amp; reports</li>
              <li><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" /> Working source code &amp; design files</li>
              <li><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" /> Presentation &amp; PPT preparation</li>
              <li><CheckCircle2 size={16} strokeWidth={2} aria-hidden="true" /> Fast turnaround — results in 24–48 hours</li>
            </ul>
            <ul className="contact-badges">
              <li><Zap size={13} strokeWidth={2} aria-hidden="true" /> Fast Delivery</li>
              <li><Lock size={13} strokeWidth={2} aria-hidden="true" /> 100% Original</li>
            </ul>
            <a href="mailto:Contact@Engiassist.in" className="text-link contact-email">
              <Mail size={16} strokeWidth={2} aria-hidden="true" /> Contact@Engiassist.in
            </a>
          </div>

          {!submitted ? (
            <form className="contact-form" onSubmit={submit}>
              <p className="form-note">Fields marked <span className="req" aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required.</p>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-name">Full name <span className="req" aria-hidden="true">*</span></label>
                  <input id="f-name" name="name" autoComplete="name" value={form.name} onChange={handle} required />
                </div>
                <div className="field">
                  <label htmlFor="f-phone">Phone / WhatsApp number <span className="req" aria-hidden="true">*</span></label>
                  <input id="f-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handle} required />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-email">Email address <span className="req" aria-hidden="true">*</span></label>
                  <input id="f-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handle} required />
                </div>
                <div className="field">
                  <label htmlFor="f-branch">Branch</label>
                  <select id="f-branch" name="branch" value={form.branch} onChange={handle}>
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>{b.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-semester">Semester</label>
                  <select id="f-semester" name="semester" value={form.semester} onChange={handle}>
                    <option value="">Select Semester</option>
                    {[...Array(8)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-project">Project name / topic <span className="sr-only">(optional)</span></label>
                  <input id="f-project" name="project" value={form.project} onChange={handle} placeholder="If you have one" />
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-status">Current status</label>
                  <select id="f-status" name="projectStatus" value={form.projectStatus} onChange={handle}>
                    <option value="">Current Status</option>
                    {projectStatusOptions.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="f-deadline">Deadline</label>
                  <input id="f-deadline" name="deadline" type="date" value={form.deadline} onChange={handle} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-message">What help do you need?</label>
                <textarea id="f-message" name="message" rows={4} value={form.message} onChange={handle} placeholder="Specific requirements, existing issues, etc."></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Request"} {!submitting && <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />}
              </button>
            </form>
          ) : (
            <div className="success-box" role="status">
              <CheckCircle2 size={32} strokeWidth={1.75} aria-hidden="true" />
              <h3>Requirement Received!</h3>
              <p className="success-lead-code">Reference ID: <strong>{leadCode}</strong></p>
              <p>Our team will review your requirement and reach out on WhatsApp. Quote the reference above if you follow up with us.</p>
              <button type="button" className="btn btn-secondary" onClick={() => setSubmitted(false)}>Submit Another Request</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand-col">
            <a href="/" className="footer-brand">
              <img src="/logo-72.png" width="34" height="34" alt="" className="logo-icon-img" />
              <span>EngiAssist</span>
            </a>
            <p className="footer-tagline">Empowering every engineering student to build, learn, and succeed.</p>
            <a href="mailto:Contact@Engiassist.in" className="footer-email">
              <Mail size={14} strokeWidth={2} aria-hidden="true" /> Contact@Engiassist.in
            </a>
          </div>

          <nav className="footer-col" aria-label="Explore">
            <p className="footer-col-title">Explore</p>
            <a href="/">Home</a>
            <a href="/#branches">Branches</a>
            <a href="/#services">Services</a>
            <a href="/about">About</a>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact</a>
            <a href="/Engisun">EngiSun (solar division)</a>
          </nav>

          <nav className="footer-col" aria-label="By branch">
            <p className="footer-col-title">By branch</p>
            {Object.entries(branchSeoContent).map(([id, c]) => (
              <a key={id} href={c.path}>{branches.find((b) => b.id === id)?.label} projects</a>
            ))}
          </nav>

          <nav className="footer-col" aria-label="By service">
            <p className="footer-col-title">By service</p>
            <a href="/final-year-project-help">Final Year Project Help</a>
            {Object.entries(serviceSeoPages).map(([slug, c]) => (
              <a key={slug} href={c.path}>{c.heading}</a>
            ))}
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">© 2026 EngiAssist. Built for engineering students in India.</p>
          <div className="footer-legal-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/refund-policy">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function useSeoMeta({ title, description, path }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    const url = `https://www.engiassist.in${path}`;
    setMeta('link[rel="canonical"]', "href", url);
    setMeta('meta[property="og:url"]', "content", url);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, path]);
}

function SeoCta({ heading = "Ready to get started?" }) {
  const openWhatsApp = () => {
    const message = "Hello EngiAssist! I need help with my engineering project.";
    window.open(`https://wa.me/919021698707?text=${encodeURIComponent(message)}`, "_blank");
  };
  return (
    <section className="seo-cta">
      <div className="container">
        <h2>{heading}</h2>
        <div className="seo-cta-actions">
          <button type="button" className="btn btn-primary" onClick={openWhatsApp}><MessageCircle size={16} strokeWidth={2} aria-hidden="true" /> Chat on WhatsApp</button>
          <a className="btn btn-secondary" href="/#contact">Request This Service <ArrowUpRight size={16} aria-hidden="true" /></a>
        </div>
      </div>
    </section>
  );
}

// Branch-specific SEO landing page — reuses real branch/project data so each
// page has genuinely distinct content instead of a templated re-skin.
const branchSeoContent = {
  cs: {
    path: "/cse-project-help",
    title: "CSE Project Help — Web, DSA, DBMS & OS Projects | EngiAssist",
    metaDescription: "Get expert help with Computer Science engineering projects — web development, DSA, OS, DBMS and app development. Working code, documentation and viva support.",
    intro: "Computer Science projects are judged on more than working code — evaluators expect you to explain your architecture, your database design and your algorithmic choices. We help CSE and B.Tech students plan, build and document projects across web development, DSA-heavy systems, database-driven apps and operating-systems coursework, so you walk into your review able to answer anything asked.",
  },
  it: {
    path: "/ai-ml-project-help",
    title: "AI/ML & IT Project Help — Deep Learning, NLP, Cloud | EngiAssist",
    metaDescription: "Project assistance for AI, Machine Learning, NLP, Cloud and Cybersecurity coursework. Real datasets, working models and documentation explained clearly.",
    intro: "AI/ML and IT projects live or die on whether you can explain your model, your dataset choices and your evaluation metrics — not just whether the notebook runs. We help IT and AI/ML students build classifiers, NLP pipelines, cloud-deployed dashboards and cybersecurity projects with real datasets, and walk through the reasoning behind every design decision so it's genuinely yours to defend.",
  },
  mech: {
    path: "/mechanical-project-help",
    title: "Mechanical Engineering Project Help — CAD, Robotics & Design | EngiAssist",
    metaDescription: "Mechanical engineering project support — CAD design, thermodynamics, fluid mechanics and robotics projects with working models and full documentation.",
    intro: "Mechanical projects usually combine a CAD model, hand calculations and a physical or simulated justification for your design choices. We help mechanical engineering students with CAD design work, thermodynamics and fluid-mechanics analysis, and robotics builds — plus the documentation that ties the calculations to the final design so your panel sees a coherent project, not disconnected parts.",
  },
  civil: {
    path: "/civil-project-help",
    title: "Civil Engineering Project Help — Structural Design & AutoCAD | EngiAssist",
    metaDescription: "Civil engineering project assistance — structural design, AutoCAD drawings, surveying and construction technology projects with complete reports.",
    intro: "Civil engineering projects are usually assessed on whether your structural design holds up to scrutiny and whether your drawings and calculations are consistent with each other. We help civil engineering students with structural design, AutoCAD drafting, surveying work and construction-technology projects, along with the technical report that explains your design logic clearly.",
  },
  elec: {
    path: "/electronics-project-help",
    title: "ECE Project Help — Embedded Systems, IoT & PCB Design | EngiAssist",
    metaDescription: "Electronics and communication engineering project help — circuit design, embedded systems, IoT builds, VLSI and PCB design with working hardware.",
    intro: "ECE projects need a working circuit or embedded build, not just a schematic on paper. We help electronics and communication engineering students with circuit design, embedded systems, IoT projects, VLSI work and PCB design — and make sure you understand every component choice well enough to explain it during your viva, not just plug it in.",
  },
  chem: {
    path: "/chemical-project-help",
    title: "Chemical Engineering Project Help — Process Design & Simulation | EngiAssist",
    metaDescription: "Chemical engineering project support — process design, simulation, material science and environmental engineering projects with full documentation.",
    intro: "Chemical engineering projects usually hinge on process design logic and simulation results holding together end to end. We help chemical engineering students with process design, simulation work, material-science studies and environmental-engineering projects, along with documentation that connects your assumptions to your results clearly.",
  },
};

function BranchSeoPage({ branchId }) {
  const [active, setActive] = useState("Branches");
  const branch = branches.find((b) => b.id === branchId);
  const content = branchSeoContent[branchId];
  useSeoMeta({ title: content.title, description: content.metaDescription, path: content.path });

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <main id="main" tabIndex={-1}>
        <PageHero label={branch.label} marker={branch.color} title={`${branch.label} Project Assistance`} sub={branch.desc} />
        <section className="section">
          <div className="container">
            <p className="prose-block">{content.intro}</p>
          </div>
        </section>
        <section className="section section-alt" id="projects" aria-labelledby="branch-topics-title">
          <div className="container">
            <SectionHead label="Popular topics" title={`${branch.label} Project Ideas`} titleId="branch-topics-title">
              A starting point — we also build custom topics around your requirement
            </SectionHead>
            <TopicTable branch={branch} />
          </div>
        </section>
        <HowItWorks />
        <FixMyProject />
        <FAQ />
        <SeoCta heading={`Need help with your ${branch.label} project?`} />
      </main>
      <Footer />
    </div>
  );
}

// Service-specific SEO landing pages.
const serviceSeoPages = {
  "project-debugging": {
    path: "/project-debugging",
    icon: Wrench,
    title: "Project Debugging Help for Engineering Students | EngiAssist",
    metaDescription: "Stuck with a broken engineering project? Get help fixing code errors, missing modules and database issues — for any branch, at any stage of completion.",
    heading: "Project Debugging & Error Fixing",
    intro: "Most engineering students don't need a project built from zero — they need help finishing one that's already 50–80% done. We review existing code, identify what's actually broken (a bug, a missing module, a database misconfiguration, or a UI issue), and fix it while explaining what went wrong, so the next issue doesn't stump you again.",
    items: fixItems,
  },
  "project-documentation-help": {
    path: "/project-documentation-help",
    icon: ClipboardList,
    title: "Project Documentation & Report Writing Help | EngiAssist",
    metaDescription: "IEEE-format project reports, synopsis, SRS documents and technical diagrams for engineering final year and mini projects.",
    heading: "Project Documentation & Reports",
    intro: "A working project without proper documentation loses marks it shouldn't. We help engineering students put together IEEE-format project reports, synopsis documents, SRS write-ups and technical diagrams that actually match what you built — not generic templates padded with filler.",
    items: ["Project Report", "Synopsis", "SRS Document", "Technical Diagrams", "Abstract Writing", "Reference Formatting"],
  },
  "viva-preparation": {
    path: "/viva-preparation",
    icon: Mic,
    title: "Viva Preparation for Engineering Projects | EngiAssist",
    metaDescription: "Understand your engineering project well enough to defend it confidently in your viva — plain-language walkthroughs for every branch.",
    heading: "Viva & Project Explanation",
    intro: "The most common reason students lose marks isn't a weak project — it's not being able to explain it under questioning. We walk you through your own project in plain language: why you made each design choice, how each module works, and what to say when a panel member asks 'why not do it this way instead?'",
    items: ["Concept Walkthrough", "Likely Questions", "Design Justification", "Code Explanation", "Mock Viva Practice", "Confidence Building"],
  },
  "ppt-presentation-help": {
    path: "/ppt-presentation-help",
    icon: BarChart3,
    title: "Project PPT & Presentation Design Help | EngiAssist",
    metaDescription: "Professional PPT design and presentation preparation for engineering project submissions and final year project defense.",
    heading: "PPT & Presentation Design",
    intro: "A cluttered, generic-template slide deck undersells a good project. We help design clean, professional presentations that highlight your actual work — problem statement, methodology, results — and prepare you to present it clearly within the time you're given.",
    items: ["Slide Design", "Content Structuring", "Speaker Notes", "Presentation Practice", "Timing Guidance", "Visual Diagrams"],
  },
  "career-placement-guidance": {
    path: "/career-placement-guidance",
    icon: Target,
    title: "Career & Placement Guidance for Engineering Students | EngiAssist",
    metaDescription: "Resume building, mock interviews, internship guidance and placement prep for engineering students — practical support, no false promises.",
    heading: "Career & Placement Guidance",
    intro: "A strong project counts for little if it isn't backed by a resume and interview performance that reflect it. We help engineering students turn their coursework and projects into a placement-ready profile — practical, one-on-one support, not a guaranteed-job pitch.",
    items: ["Resume Building", "Mock Interviews", "Internship Guidance", "LinkedIn Profile Review", "Aptitude Prep", "Career Roadmap"],
  },
};

function ServiceSeoPage({ slug }) {
  const [active, setActive] = useState("Services");
  const content = serviceSeoPages[slug];
  useSeoMeta({ title: content.title, description: content.metaDescription, path: content.path });

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <main id="main" tabIndex={-1}>
        <PageHero label="Engineering project support" title={content.heading} sub={content.intro} />
        <section className="section">
          <div className="container">
            <ul className="checklist" aria-label={`${content.heading}: what is covered`}>
              {content.items.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </section>
        <Branches />
        <HowItWorks />
        <FAQ />
        <SeoCta heading={`Need help with ${content.heading.toLowerCase()}?`} />
      </main>
      <Footer />
    </div>
  );
}

function FinalYearProjectPage() {
  const [active, setActive] = useState("Home");
  useSeoMeta({
    title: "Final Year Project Help for Engineering Students | EngiAssist",
    description: "Complete final year project assistance for B.Tech, BE and Diploma students — development, debugging, documentation, PPT and viva preparation, across all branches.",
    path: "/final-year-project-help",
  });

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <main id="main" tabIndex={-1}>
        <PageHero
          label="Final year project assistance"
          title="Final Year Project Help, Start to Submission"
          sub="From choosing a topic to building it, documenting it and defending it in your viva — support for B.Tech, BE and Diploma students across every engineering branch."
        />
        <Branches />
        <HowItWorks />
        <Services />
        <FixMyProject />
        <FAQ />
        <SeoCta heading="Ready to start your final year project?" />
      </main>
      <Footer />
    </div>
  );
}

function FloatingWhatsApp() {
  const [tucked, setTucked] = useState(false);

  // On small screens the button steps aside while the request form is visible,
  // so it never covers the form fields or submit button.
  useEffect(() => {
    const el = document.getElementById("contact");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setTucked(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const openWhatsApp = () => {
    const message = "Hello EngiAssist! I need help with my engineering project.";
    window.open(`https://wa.me/919021698707?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <button
      type="button"
      onClick={openWhatsApp}
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className={`wa-fab ${tucked ? "is-tucked" : ""}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.52 3.449A11.86 11.86 0 0 0 12.05 0C5.495 0 .163 5.332.163 11.89c0 2.096.548 4.142 1.588 5.946L0 24l6.335-1.655a11.88 11.88 0 0 0 5.709 1.447h.005c6.554 0 11.887-5.332 11.887-11.89a11.85 11.85 0 0 0-3.416-8.453zM12.05 21.79h-.004a9.87 9.87 0 0 1-5.032-1.378l-.361-.214-3.76.982 1.004-3.67-.235-.375a9.87 9.87 0 0 1-1.51-5.245c0-5.442 4.43-9.872 9.877-9.872a9.83 9.83 0 0 1 6.994 2.9 9.83 9.83 0 0 1 2.894 6.994c-.003 5.445-4.433 9.878-9.867 9.878zm5.413-7.397c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.149-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.256-.463-2.39-1.475-.883-.788-1.48-1.762-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    </button>
  );
}

// EngiSun is a separate solar business — visually distinct from the student-project flow.
function SolarPromo() {
  return (
    <section className="solar-band" id="engisun" aria-labelledby="engisun-title">
      <div className="container solar-inner">
        <div className="solar-mark" aria-hidden="true"><Sun size={40} strokeWidth={1.5} /></div>
        <div>
          <p className="label">EngiSun · Solar division</p>
          <h2 id="engisun-title">Introducing <span>EngiSun</span></h2>
          <p>Our solar division — DCR &amp; non-DCR rooftop installation for homes and businesses, with subsidy guidance and net metering support.</p>
          <p className="solar-note">Separate from student project support.</p>
        </div>
        <a href="/Engisun" className="btn btn-solar">Explore EngiSun <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" /></a>
      </div>
    </section>
  );
}

function Landing() {
  const [active, setActive] = useState("Home");

  return (
    <div className="app">
      <Navbar active={active} setActive={setActive} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Branches n="01" />
        <Services n="02" />
        <HowItWorks n="03" />
        <Projects n="04" />
        <FixMyProject n="05" />
        <Testimonials n="06" />
        <FAQ n="07" />
        <Contact n="08" />
        <SolarPromo />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

// Legal page drafts. These are reasonable starting-point templates for a
// small, India-based, founder-led service business that collects contact-form
// leads and sells a paid package — but they are NOT a substitute for review
// by a qualified professional before publishing, especially around the
// payment/refund terms.
const legalPages = {
  "privacy-policy": {
    title: "Privacy Policy | EngiAssist",
    heading: "Privacy Policy",
    body: (
      <>
        <p>
          EngiAssist ("we", "us") provides engineering project guidance to
          students. This page explains what information we collect through
          engiassist.in and how we use it.
        </p>
        <h2>Information We Collect</h2>
        <ul>
          <li>Contact details you submit through our request form: name, phone/WhatsApp number, email address.</li>
          <li>Project details you choose to share: branch, semester, project topic, current status, deadline, and any message you write.</li>
        </ul>
        <p>We do not collect payment card details directly — any payment is handled through a third-party payment processor.</p>
        <h2>How We Use Your Information</h2>
        <ul>
          <li>To respond to your request and provide the project guidance you asked for.</li>
          <li>To contact you on WhatsApp, phone, or email about your request.</li>
          <li>We do not sell your personal information to third parties.</li>
        </ul>
        <h2>How Your Information Is Stored</h2>
        <p>
          Form submissions are stored in a secured database with access
          restricted to EngiAssist. We take reasonable technical measures to
          protect your data, but no online system can be guaranteed 100%
          secure.
        </p>
        <h2>Your Choices</h2>
        <p>
          You can ask us to delete your submitted information at any time by
          messaging us on WhatsApp or emailing us with your request.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent via the contact form on
          this site, on WhatsApp, or by emailing{" "}
          <a href="mailto:Contact@Engiassist.in">Contact@Engiassist.in</a>.
        </p>
      </>
    ),
  },
  "terms-of-service": {
    title: "Terms of Service | EngiAssist",
    heading: "Terms of Service",
    body: (
      <>
        <p>
          By using engiassist.in or engaging EngiAssist for project help, you
          agree to the terms below.
        </p>
        <h2>What We Provide</h2>
        <p>
          EngiAssist provides guidance, code, documentation, presentation, and
          related support for engineering student projects, as agreed with
          you before work begins. Exact scope, deliverables, and timeline are
          confirmed individually for each request — this website describes
          our general services, not a binding quote for every case.
        </p>
        <h2>Your Responsibilities</h2>
        <ul>
          <li>You are responsible for how you use any material we provide, including complying with your institution's academic integrity policies.</li>
          <li>Please provide accurate project details so we can give you relevant guidance.</li>
        </ul>
        <h2>Academic Integrity</h2>
        <p>
          We provide guidance and support to help you understand and complete
          your own project. You remain responsible for how you present and
          submit any work at your institution, and for complying with your
          college's rules on originality and permitted assistance.
        </p>
        <h2>Payments</h2>
        <p>
          Where a paid package is agreed (for example, the Founding Batch
          offer), pricing and inclusions will be stated clearly before you
          pay. See our Refund Policy for cancellation terms.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          We aim to provide accurate, useful guidance, but we do not
          guarantee any specific grade, evaluation outcome, or placement
          result, since these depend on factors outside our control.
        </p>
        <h2>Changes</h2>
        <p>We may update these terms from time to time; the current version will always be posted on this page.</p>
      </>
    ),
  },
  "refund-policy": {
    title: "Refund Policy | EngiAssist",
    heading: "Refund Policy",
    body: (
      <>
        <p>
          This policy applies to any paid package offered by EngiAssist,
          including the Founding Batch offer.
        </p>
        <h2>Before Work Begins</h2>
        <p>
          If you cancel before we begin work on your request, you are
          eligible for a full refund.
        </p>
        <h2>After Work Begins</h2>
        <p>
          Once we have started work on your project (for example, reviewing
          your requirements, building code, or preparing documentation), a
          partial refund may be available depending on the work already
          completed, at our discretion. This will be discussed with you
          directly before any deduction is made.
        </p>
        <h2>How to Request a Refund</h2>
        <p>
          Message us on WhatsApp or email{" "}
          <a href="mailto:Contact@Engiassist.in">Contact@Engiassist.in</a>{" "}
          with your reference ID and the reason for your request. We aim to
          respond within 2 business days.
        </p>
        <h2>Non-Refundable Situations</h2>
        <p>
          Refunds are not available once all agreed deliverables have been
          completed and shared with you.
        </p>
      </>
    ),
  },
};

function LegalPage({ slug }) {
  const content = legalPages[slug];
  useSeoMeta({ title: content.title, description: content.title, path: `/${slug}` });
  return (
    <div className="app">
      <Navbar active={null} setActive={() => {}} />
      <main id="main" tabIndex={-1} className="legal-page">
        <h1>{content.heading}</h1>
        <p className="legal-updated">Last updated: September 2026</p>
        {content.body}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  // Lightweight path-based routing — no router library needed for a few pages.
  const path =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "") || "/"
      : "/";

  if (path === "/dashboard") {
    return (
      <Suspense fallback={<div className="dash-loading-screen">Loading dashboard…</div>}>
        <Dashboard />
      </Suspense>
    );
  }

  let page;
  if (path === "/about") page = <AboutPage />;
  else if (path === "/final-year-project-help") page = <FinalYearProjectPage />;
  else if (legalPages[path.replace(/^\//, "")]) page = <LegalPage slug={path.replace(/^\//, "")} />;
  else {
    const branchMatch = Object.entries(branchSeoContent).find(([, c]) => c.path === path);
    const serviceMatch = Object.entries(serviceSeoPages).find(([, c]) => c.path === path);
    if (branchMatch) page = <BranchSeoPage branchId={branchMatch[0]} />;
    else if (serviceMatch) page = <ServiceSeoPage slug={serviceMatch[0]} />;
    else page = <Landing />;
  }

  return (
    <>
      {page}
      {path !== "/" && <FloatingWhatsApp />}
    </>
  );
}
