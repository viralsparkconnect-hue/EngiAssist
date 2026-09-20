import { useState, useEffect, lazy, Suspense } from "react";
import "./index.css";
import {
  Cpu, Cog, Building2, Zap, Globe, FlaskConical,
  Rocket, ClipboardList, MessageCircleQuestion, GraduationCap,
  MonitorSmartphone, BarChart3, Target,
  Wrench, FileEdit, Handshake, PackageCheck,
  Lock, ShieldCheck, Mic,
  TrendingUp, MapPin, Megaphone, Check, MessageCircle, ExternalLink, Mail,
  Menu, X, Plus, Minus, ArrowUpRight,
} from "lucide-react";

// Lazy-loaded: Dashboard (and the Supabase client it uses) should only be
// downloaded by admins visiting /dashboard, not by every landing-page visitor.
const Dashboard = lazy(() => import("./Dashboard"));

/* ────────────────────────────────────────────────────────────
   Shared helpers
   ──────────────────────────────────────────────────────────── */

const WHATSAPP_NUMBER = "919021698707";
const DEFAULT_WA_MESSAGE = "Hello EngiAssist! I need help with my engineering project.";
const waUrl = (text) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Scroll to a section on this page. If the section isn't on this page
// (e.g. an SEO landing page has no #contact form), go to the home page section.
// The original code called scrollIntoView on null here and crashed on those pages.
function goToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  } else {
    window.location.href = `/#${id}`;
  }
}

/* ────────────────────────────────────────────────────────────
   Content (unchanged from the original site)
   ──────────────────────────────────────────────────────────── */

const branches = [
  {
    id: "cs",
    icon: Cpu,
    label: "Computer Science",
    desc: "Web dev, ML/AI, DSA, OS, DBMS, App Development",
    projects: ["Portfolio Website", "Chat Application", "ML Model", "API Builder", "E-Commerce App"],
  },
  {
    id: "mech",
    icon: Cog,
    label: "Mechanical",
    desc: "CAD designs, Thermodynamics, Fluid Mechanics, Robotics",
    projects: ["Robotic Arm Design", "Heat Exchanger", "Gear Mechanism", "3D CAD Model", "Drone Frame"],
  },
  {
    id: "civil",
    icon: Building2,
    label: "Civil",
    desc: "Structural design, AutoCAD, Surveying, Construction Tech",
    projects: ["Bridge Design", "Smart City Plan", "Earthquake Analysis", "Water Treatment", "Green Building"],
  },
  {
    id: "elec",
    icon: Zap,
    label: "Electronics",
    desc: "Circuit Design, Embedded Systems, IoT, VLSI, PCB",
    projects: ["IoT Smart Home", "Arduino Robot", "PCB Design", "Signal Processor", "Power System"],
  },
  {
    id: "it",
    icon: Globe,
    label: "IT / AI & ML",
    desc: "Deep Learning, NLP, Cloud, Cybersecurity, Data Science",
    projects: ["Chatbot with NLP", "Image Classifier", "Fraud Detector", "Cloud Dashboard", "Face Recognition"],
  },
  {
    id: "chem",
    icon: FlaskConical,
    label: "Chemical",
    desc: "Process Design, Simulation, Material Science, Environment",
    projects: ["Reactor Design", "Distillation Column", "Wastewater Plant", "Polymer Study", "Catalyst Analysis"],
  },
];

const services = [
  { icon: Rocket, title: "Project ideas", desc: "100+ curated project topics for every branch & semester" },
  { icon: ClipboardList, title: "Full documentation", desc: "IEEE-format reports, abstracts, and project reports" },
  { icon: MessageCircleQuestion, title: "Doubt-solving support", desc: "Get personal guidance whenever you're stuck on your project" },
  { icon: GraduationCap, title: "Mini and major projects", desc: "From simple mini projects to full major project builds" },
  { icon: MonitorSmartphone, title: "Code and design", desc: "Working source code, circuit diagrams, and CAD files" },
  { icon: BarChart3, title: "PPT and presentation", desc: "Professional presentations with content and design" },
  { icon: Target, title: "Career and placement guidance", desc: "Practical support for resumes, interviews, internships, placements, and your engineering career" },
];

const howItWorksSteps = [
  {
    num: "01",
    icon: FileEdit,
    title: "Tell us your project",
    desc: "Pick your branch, semester, and describe what you need — mini project, major project, or just guidance.",
  },
  {
    num: "02",
    icon: Handshake,
    title: "Get a personal response",
    desc: "Your request is reviewed personally and you'll hear back with next steps for your exact branch and topic — no generic templates.",
  },
  {
    num: "03",
    icon: PackageCheck,
    title: "Receive everything you need",
    desc: "Working code, CAD/circuit files, IEEE-format documentation, and a polished PPT — all in one package.",
  },
  {
    num: "04",
    icon: Target,
    title: "Submit with confidence",
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
  "Code errors",
  "Missing modules",
  "Database problems",
  "Documentation",
  "UI improvements",
  "Testing",
  "PPT",
  "Viva preparation",
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


/* ────────────────────────────────────────────────────────────
   Small content additions for the redesign
   ──────────────────────────────────────────────────────────── */

const trustFacts = [
  { icon: Lock, text: "100% original work" },
  { icon: Zap, text: "24–48hr turnaround" },
  { icon: GraduationCap, text: "Engineer-led guidance" },
  { icon: ShieldCheck, text: "Secure data handling" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Branches", href: "/#branches" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/#projects" },
  { label: "Contact", href: "/#contact" },
];

const projectStatusOptions = [
  { value: "idea", label: "Only Idea" },
  { value: "started", label: "Started" },
  { value: "partial", label: "Partially Completed" },
  { value: "almost", label: "Almost Completed" },
];

/* ────────────────────────────────────────────────────────────
   SEO helper — sets title/description/canonical (and optional noindex)
   ──────────────────────────────────────────────────────────── */

function useSeoMeta({ title, description, path, noindex = false }) {
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

    let robots = null;
    if (noindex) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      robots.setAttribute("content", "noindex, follow");
      document.head.appendChild(robots);
    }

    return () => {
      document.title = prevTitle;
      if (robots) robots.remove();
    };
  }, [title, description, path, noindex]);
}

/* ────────────────────────────────────────────────────────────
   Layout pieces
   ──────────────────────────────────────────────────────────── */

function Navbar({ active }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="/" className="nav-logo" aria-label="EngiAssist home">
          <img src="/logo-96.png" alt="" width="34" height="34" />
          <span>EngiAssist</span>
        </a>

        <nav id="primary-nav" className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary">
          <ul>
            {navLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-current={active === l.label ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="btn btn-amber btn-sm"
            onClick={() => { setOpen(false); goToSection("contact"); }}
          >
            Get help now
          </button>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}

function PageShell({ active, children }) {
  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar active={active} />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}

function PageHero({ title, lead }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}

function SectionHead({ title, children }) {
  return (
    <div className="sec-head">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   Hero + example project tracker
   ──────────────────────────────────────────────────────────── */

function ProjectTracker() {
  const steps = [
    { state: "done", title: "Request reviewed", note: "Topic and scope confirmed with you" },
    { state: "done", title: "Code and circuit built", note: "Tested and ready to download" },
    { state: "now", title: "IEEE report and PPT", note: "Being written from your final design" },
    { state: "next", title: "Viva walkthrough", note: "Scheduled before your submission date" },
  ];
  const files = [
    { ext: ".ino", name: "irrigation_controller.ino", note: "Arduino source code", status: "Ready", ok: true },
    { ext: ".pdf", name: "circuit_diagram.pdf", note: "Schematic and pin map", status: "Ready", ok: true },
    { ext: ".docx", name: "project_report.docx", note: "IEEE format", status: "In progress", ok: false },
    { ext: ".pptx", name: "presentation.pptx", note: "Slides with speaker notes", status: "Up next", ok: false },
  ];

  return (
    <figure className="tracker" aria-label="Example of how a project moves from request to viva">
      <div className="tracker-head">
        <div>
          <span className="tracker-sample">Sample project</span>
          <p className="tracker-title">Soil moisture based irrigation controller</p>
          <p>Electronics and Communication, Semester 6</p>
        </div>
        <span className="pill">Report in progress</span>
      </div>
      <div className="tracker-body">
        <ol className="tracker-rail">
          {steps.map((s) => (
            <li key={s.title} className={`tnode is-${s.state}`}>
              <span className="tdot" aria-hidden="true">
                {s.state === "done" && <Check size={13} strokeWidth={3} />}
              </span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.note}</p>
              </div>
            </li>
          ))}
        </ol>
        <ul className="tracker-files">
          {files.map((f) => (
            <li key={f.name}>
              <span className="tfile-ext">{f.ext}</span>
              <div className="tfile-main">
                <strong>{f.name}</strong>
                <span>{f.note}</span>
              </div>
              <span className={`tfile-state ${f.ok ? "is-ok" : ""}`}>{f.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="wrap">
        <h1 className="hero-title">Get your engineering project built, documented and explained.</h1>
        <p className="hero-lead">
          Original code, drawings, IEEE reports and presentations for every branch,
          with a walkthrough so you can answer any question in your viva.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-amber" onClick={() => goToSection("contact")}>
            Request help with my project
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => goToSection("projects")}>
            See project ideas
          </button>
        </div>
        <ul className="hero-facts">
          {trustFacts.map((t) => (
            <li key={t.text}><t.icon size={16} strokeWidth={2.2} aria-hidden="true" /> {t.text}</li>
          ))}
        </ul>
        <ProjectTracker />
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Landing sections
   ──────────────────────────────────────────────────────────── */

function Branches() {
  return (
    <section className="section" id="branches">
      <div className="wrap">
        <SectionHead title="Choose your engineering branch">
          Specialized project guidance for every discipline, planned around your syllabus and semester.
        </SectionHead>
        <div className="branch-grid">
          {branches.map((b) => {
            const page = branchSeoContent[b.id];
            return (
              <article key={b.id} className="branch-cell">
                <b.icon className="branch-icon" size={22} strokeWidth={1.8} aria-hidden="true" />
                <h3>{b.label}</h3>
                <p>{b.desc}</p>
                <ul className="chips">
                  {b.projects.slice(0, 3).map((p) => <li key={p}>{p}</li>)}
                </ul>
                {page && (
                  <a className="text-link" href={page.path}>
                    Explore {b.label} help <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section section-alt" id="how-it-works">
      <div className="wrap">
        <SectionHead title="How EngiAssist works">From idea to submission in 4 clear steps</SectionHead>
        <ol className="steps">
          {howItWorksSteps.map((s) => (
            <li key={s.num} className="step">
              <span className="step-num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section" id="services">
      <div className="wrap">
        <SectionHead title="Everything you need to excel">
          Complete engineering project support, from idea to submission
        </SectionHead>
        <div className="bento">
          {services.map((s) => (
            <article key={s.title} className="bento-tile">
              <s.icon className="bento-icon" size={24} strokeWidth={1.8} aria-hidden="true" />
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FixMyProject() {
  return (
    <section className="section section-alt" id="fix-my-project">
      <div className="wrap fix">
        <div>
          <SectionHead title="Your project doesn't have to start from zero">
            Already have a project? We can help you fix, finish, or explain it.
          </SectionHead>
          <button type="button" className="btn btn-amber" onClick={() => goToSection("contact")}>
            Get help with my existing project
          </button>
        </div>
        <ul className="chips chips-lg">
          {fixItems.map((f) => <li key={f}>{f}</li>)}
        </ul>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead title="What students say">
          Real feedback from students who got their projects done right
        </SectionHead>
        <div className="quotes">
          {testimonials.map((t) => (
            <figure key={t.name} className="quote">
              <blockquote>{t.quote}</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                <span>{t.branch}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectList({ branch }) {
  return (
    <ul className="proj-list">
      {branch.projects.map((p) => (
        <li key={p}>
          <strong>{p}</strong>
          <a className="text-link" href="/#contact">
            Get this project <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function Projects() {
  const [selected, setSelected] = useState("cs");
  const current = branches.find((b) => b.id === selected);

  return (
    <section className="section section-alt" id="projects">
      <div className="wrap">
        <SectionHead title="Explore project topics">
          Handpicked project ideas for each engineering branch
        </SectionHead>
        <div className="tabs" role="group" aria-label="Choose a branch">
          {branches.map((b) => (
            <button
              key={b.id}
              type="button"
              className={`tab ${selected === b.id ? "is-active" : ""}`}
              aria-pressed={selected === b.id}
              onClick={() => setSelected(b.id)}
            >
              {b.label}
            </button>
          ))}
        </div>
        <ProjectList branch={current} />
      </div>
    </section>
  );
}

function FAQ() {
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
    <section className="section" id="faq">
      <div className="wrap faq-layout">
        <SectionHead title="Frequently asked questions">
          Everything students usually ask before getting started
        </SectionHead>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq-item ${open === i ? "is-open" : ""}`}>
              <h3>
                <button
                  type="button"
                  className="faq-q"
                  id={`faq-q-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-a-${i}`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span>{f.q}</span>
                  {open === i ? <Minus size={20} aria-hidden="true" /> : <Plus size={20} aria-hidden="true" />}
                </button>
              </h3>
              <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                <div><p>{f.a}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutUs() {
  return (
    <section className="section" id="about">
      <div className="wrap">
        <SectionHead title="Meet the founder">Built by an engineer, for engineers</SectionHead>
        <div className="about-grid">
          <div className="founder">
            <div className="founder-top">
              <span className="founder-avatar" aria-hidden="true">PP</span>
              <div>
                <h3>Pratik Patil</h3>
                <p>CEO &amp; Founder, EngiAssist</p>
              </div>
            </div>
            <ul className="founder-facts">
              <li><Cog size={16} aria-hidden="true" /> Mechanical Engineer</li>
              <li><TrendingUp size={16} aria-hidden="true" /> Marketing Manager in the solar industry</li>
              <li><MapPin size={16} aria-hidden="true" /> Jalgaon, Maharashtra</li>
            </ul>
            <p className="founder-bio">
              Pratik founded EngiAssist to give engineering students across every
              branch the same project guidance and support he wished he'd had —
              combining hands-on mechanical engineering expertise with real-world
              marketing and leadership experience in the solar industry. Based in
              Jalgaon, Maharashtra, he personally works with students on their
              mini and major projects.
            </p>
            <a
              href="https://www.linkedin.com/in/pratik-patil-7347512b2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              Connect on LinkedIn <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>

          <ul className="highlights">
            <li>
              <GraduationCap size={22} strokeWidth={1.8} aria-hidden="true" />
              <div>
                <h4>Engineer-led</h4>
                <p>Every project reviewed with real engineering rigor, not just templates.</p>
              </div>
            </li>
            <li>
              <Megaphone size={22} strokeWidth={1.8} aria-hidden="true" />
              <div>
                <h4>Marketing-backed</h4>
                <p>Presentation and communication polish from real industry marketing experience.</p>
              </div>
            </li>
            <li>
              <MapPin size={22} strokeWidth={1.8} aria-hidden="true" />
              <div>
                <h4>Proudly local</h4>
                <p>Based in Jalgaon, Maharashtra — supporting students across India.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Contact form
   ──────────────────────────────────────────────────────────── */

// Short, human-readable reference the student can quote over WhatsApp.
// Uses crypto randomness so two students never get the same code
// (the old clock-based code repeated every ~17 minutes).
function makeLeadCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return "EA-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

// Supabase is imported dynamically so the landing page doesn't ship that code upfront.
async function saveLead(payload) {
  try {
    const { supabase } = await import("./lib/supabaseClient");
    const { error } = await supabase.from("leads").insert([payload]);
    if (error) {
      console.error("Lead save failed:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Lead save failed:", err);
    return false;
  }
}

const emptyForm = {
  name: "", phone: "", email: "", branch: "cs", semester: "",
  project: "", projectStatus: "", deadline: "", message: "",
  website: "", // honeypot — real students never see or fill this
};

function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [leadCode, setLeadCode] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (submitting) return;

    // Spam bots fill every field, including the hidden one. Pretend it worked.
    if (form.website) {
      setLeadCode(makeLeadCode());
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    const code = makeLeadCode();
    const branchName = branches.find((b) => b.id === form.branch)?.label || form.branch;
    const statusLabel =
      projectStatusOptions.find((s) => s.value === form.projectStatus)?.label || "Not specified";

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
    const url = waUrl(message);
    setWhatsappLink(url);

    // 1) Start saving the lead (shows up in /dashboard).
    const saving = saveLead({
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
    });

    // 2) Open WhatsApp right now, while we are still inside the student's tap.
    //    Phones (especially iPhone Safari) block popups that open after a network wait,
    //    which is what the old code did. If it is still blocked, the success screen
    //    below has a visible "Open WhatsApp" button.
    const win = window.open(url, "_blank");
    if (win) win.opener = null;

    // 3) Wait for the save (max 8s) before showing the confirmation.
    const timeout = new Promise((resolve) => setTimeout(resolve, 8000));
    Promise.race([saving, timeout]).finally(() => {
      setSubmitting(false);
      setLeadCode(code);
      setSubmitted(true);
    });
  };

  const reset = () => {
    setForm(emptyForm);
    setSubmitted(false);
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-info">
          <SectionHead title="Request project help">
            Tell us your branch and project needs — we'll guide you step by step.
          </SectionHead>
          <ul className="checklist">
            <li><Check size={18} aria-hidden="true" /> Guidance for all 6 engineering branches</li>
            <li><Check size={18} aria-hidden="true" /> Complete project from scratch or partial help</li>
            <li><Check size={18} aria-hidden="true" /> IEEE-format documentation &amp; reports</li>
            <li><Check size={18} aria-hidden="true" /> Working source code &amp; design files</li>
            <li><Check size={18} aria-hidden="true" /> Presentation &amp; PPT preparation</li>
            <li><Check size={18} aria-hidden="true" /> Fast turnaround — results in 24–48 hours</li>
          </ul>
          <a href="mailto:Contact@Engiassist.in" className="text-link">
            <Mail size={16} aria-hidden="true" /> Contact@Engiassist.in
          </a>
        </div>

        {!submitted ? (
          <form className="form" onSubmit={submit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="c-name">Full name *</label>
                <input id="c-name" name="name" autoComplete="name" value={form.name} onChange={handle} required />
              </div>
              <div className="field">
                <label htmlFor="c-phone">Phone / WhatsApp *</label>
                <input
                  id="c-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel"
                  pattern="[0-9+\s\-]{10,15}" title="Enter a 10-digit phone number"
                  value={form.phone} onChange={handle} required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="c-email">Email address *</label>
                <input id="c-email" name="email" type="email" autoComplete="email" value={form.email} onChange={handle} required />
              </div>
              <div className="field">
                <label htmlFor="c-branch">Branch</label>
                <select id="c-branch" name="branch" value={form.branch} onChange={handle}>
                  {branches.map((b) => <option key={b.id} value={b.id}>{b.label}</option>)}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="c-semester">Semester</label>
                <select id="c-semester" name="semester" value={form.semester} onChange={handle}>
                  <option value="">Select semester</option>
                  {[...Array(8)].map((_, i) => <option key={i + 1} value={i + 1}>Semester {i + 1}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-project">Project name or topic</label>
                <input id="c-project" name="project" placeholder="If you already have one" value={form.project} onChange={handle} />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="c-status">Current status</label>
                <select id="c-status" name="projectStatus" value={form.projectStatus} onChange={handle}>
                  <option value="">Select status</option>
                  {projectStatusOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-deadline">Deadline</label>
                <input id="c-deadline" name="deadline" type="date" value={form.deadline} onChange={handle} />
              </div>
            </div>
            <div className="field">
              <label htmlFor="c-message">What help do you need?</label>
              <textarea
                id="c-message" name="message" rows={4}
                placeholder="Specific requirements, existing issues, anything your guide asked for"
                value={form.message} onChange={handle}
              />
            </div>

            {/* Honeypot: hidden from people, visible to bots */}
            <div className="hp" aria-hidden="true">
              <label htmlFor="c-website">Website</label>
              <input id="c-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={handle} />
            </div>

            <button type="submit" className="btn btn-amber btn-block" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit request"}
            </button>
            <p className="form-note">We'll open WhatsApp with your details so you can send them to us directly.</p>
          </form>
        ) : (
          <div className="success" role="status">
            <span className="success-icon"><Check size={26} strokeWidth={2.6} aria-hidden="true" /></span>
            <h3>Requirement received</h3>
            <p className="success-code">Reference ID <strong>{leadCode}</strong></p>
            <p>
              Our team will review your requirement and reach out on WhatsApp.
              Quote the reference above if you follow up with us.
            </p>
            <div className="success-actions">
              <a className="btn btn-amber" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                Open WhatsApp
              </a>
              <button type="button" className="btn btn-ghost" onClick={reset}>Submit another request</button>
            </div>
            <p className="form-note">If WhatsApp did not open on its own, tap “Open WhatsApp”.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Footer, CTA band, floating WhatsApp
   ──────────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="nav-logo" aria-label="EngiAssist home">
              <img src="/logo-96.png" alt="" width="34" height="34" loading="lazy" />
              <span>EngiAssist</span>
            </a>
            <p>Empowering every engineering student to build, learn, and succeed.</p>
            <a href="mailto:Contact@Engiassist.in" className="text-link">
              <Mail size={15} aria-hidden="true" /> Contact@Engiassist.in
            </a>
          </div>

          <nav className="footer-col" aria-label="Site">
            <p className="footer-col-title">Explore</p>
            <a href="/">Home</a>
            <a href="/#branches">Branches</a>
            <a href="/#services">Services</a>
            <a href="/about">About</a>
            <a href="/#projects">Projects</a>
            <a href="/#contact">Contact</a>
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
          <p>© 2026 EngiAssist. Built for engineering students in India.</p>
          <div className="footer-legal">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
            <a href="/refund-policy">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SeoCta({ heading = "Ready to get started?" }) {
  return (
    <section className="cta-band">
      <div className="wrap cta-inner">
        <h2>{heading}</h2>
        <div className="cta-actions">
          <a className="btn btn-dark" href={waUrl(DEFAULT_WA_MESSAGE)} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden="true" /> Chat on WhatsApp
          </a>
          <a className="cta-link" href="/#contact">Request this service</a>
        </div>
      </div>
    </section>
  );
}

function FloatingWhatsApp() {
  return (
    <aside aria-label="Chat on WhatsApp">
    <a
      className="wa-float"
      href={waUrl(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M20.52 3.449A11.86 11.86 0 0 0 12.05 0C5.495 0 .163 5.332.163 11.89c0 2.096.548 4.142 1.588 5.946L0 24l6.335-1.655a11.88 11.88 0 0 0 5.709 1.447h.005c6.554 0 11.887-5.332 11.887-11.89a11.85 11.85 0 0 0-3.416-8.453zM12.05 21.79h-.004a9.87 9.87 0 0 1-5.032-1.378l-.361-.214-3.76.982 1.004-3.67-.235-.375a9.87 9.87 0 0 1-1.51-5.245c0-5.442 4.43-9.872 9.877-9.872a9.83 9.83 0 0 1 6.994 2.9 9.83 9.83 0 0 1 2.894 6.994c-.003 5.445-4.433 9.878-9.867 9.878zm5.413-7.397c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.149-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.256-.463-2.39-1.475-.883-.788-1.48-1.762-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.173.198-.298.298-.496.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      </svg>
    </a>
    </aside>
  );
}

/* ────────────────────────────────────────────────────────────
   Pages
   ──────────────────────────────────────────────────────────── */

function BranchSeoPage({ branchId }) {
  const branch = branches.find((b) => b.id === branchId);
  const content = branchSeoContent[branchId];
  useSeoMeta({ title: content.title, description: content.metaDescription, path: content.path });

  return (
    <PageShell active="Branches">
      <PageHero title={`${branch.label} Project Assistance`} lead={branch.desc} />
      <section className="section seo-body">
        <div className="wrap">
          <p>{content.intro}</p>
        </div>
      </section>
      <section className="section section-alt" id="projects">
        <div className="wrap">
          <SectionHead title={`${branch.label} project ideas`}>
            A starting point — we also build custom topics around your requirement
          </SectionHead>
          <ProjectList branch={branch} />
        </div>
      </section>
      <HowItWorks />
      <FixMyProject />
      <FAQ />
      <SeoCta heading={`Need help with your ${branch.label} project?`} />
    </PageShell>
  );
}

function ServiceSeoPage({ slug }) {
  const content = serviceSeoPages[slug];
  useSeoMeta({ title: content.title, description: content.metaDescription, path: content.path });

  return (
    <PageShell active="Services">
      <PageHero title={content.heading} lead={content.intro} />
      <section className="section">
        <div className="wrap">
          <ul className="chips chips-lg">
            {content.items.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      </section>
      <Branches />
      <HowItWorks />
      <FAQ />
      <SeoCta heading={`Need help with ${content.heading.toLowerCase()}?`} />
    </PageShell>
  );
}

function FinalYearProjectPage() {
  useSeoMeta({
    title: "Final Year Project Help for Engineering Students | EngiAssist",
    description: "Complete final year project assistance for B.Tech, BE and Diploma students — development, debugging, documentation, PPT and viva preparation, across all branches.",
    path: "/final-year-project-help",
  });

  return (
    <PageShell active="Home">
      <PageHero
        title="Final Year Project Help, Start to Submission"
        lead="From choosing a topic to building it, documenting it and defending it in your viva — support for B.Tech, BE and Diploma students across every engineering branch."
      />
      <Branches />
      <HowItWorks />
      <Services />
      <FixMyProject />
      <FAQ />
      <SeoCta heading="Ready to start your final year project?" />
    </PageShell>
  );
}

function AboutPage() {
  return (
    <PageShell active="About">
      <PageHero
        title="About EngiAssist"
        lead="Built by an engineer who understands exactly what students need — not just a finished project, but real understanding."
      />
      <AboutUs />
      <Testimonials />
    </PageShell>
  );
}

function Landing() {
  return (
    <PageShell active="Home">
      <Hero />
      <Branches />
      <HowItWorks />
      <Services />
      <FixMyProject />
      <Testimonials />
      <Projects />
      <FAQ />
      <Contact />
    </PageShell>
  );
}

function NotFound() {
  useSeoMeta({
    title: "Page not found | EngiAssist",
    description: "This page could not be found.",
    path: "/404",
    noindex: true,
  });
  return (
    <PageShell active={null}>
      <section className="page-hero not-found">
        <div className="wrap">
          <h1>We couldn't find that page.</h1>
          <p className="lead">The link may be old or mistyped. Here are some good places to start.</p>
          <div className="hero-actions">
            <a className="btn btn-amber" href="/">Go to home page</a>
            <a className="btn btn-ghost" href="/#branches">Browse branches</a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function LegalPage({ slug }) {
  const content = legalPages[slug];
  useSeoMeta({ title: content.title, description: content.title, path: `/${slug}` });
  return (
    <PageShell active={null}>
      <article className="wrap legal-page">
        <h1>{content.heading}</h1>
        <p className="legal-updated">Last updated: September 2026</p>
        {content.body}
      </article>
    </PageShell>
  );
}

/* ────────────────────────────────────────────────────────────
   Router
   ──────────────────────────────────────────────────────────── */

export default function App() {
  // Lightweight path-based routing — no router library needed for a few pages.
  const rawPath =
    typeof window !== "undefined"
      ? window.location.pathname.replace(/\/+$/, "") || "/"
      : "/";
  const path = rawPath === "/index.html" ? "/" : rawPath;

  if (path === "/dashboard") {
    return (
      <Suspense fallback={<div className="dash-loading-screen">Loading dashboard…</div>}>
        <Dashboard />
      </Suspense>
    );
  }

  let page;
  if (path === "/") page = <Landing />;
  else if (path === "/about") page = <AboutPage />;
  else if (path === "/final-year-project-help") page = <FinalYearProjectPage />;
  else if (legalPages[path.replace(/^\//, "")]) page = <LegalPage slug={path.replace(/^\//, "")} />;
  else {
    const branchMatch = Object.entries(branchSeoContent).find(([, c]) => c.path === path);
    const serviceMatch = Object.entries(serviceSeoPages).find(([, c]) => c.path === path);
    if (branchMatch) page = <BranchSeoPage branchId={branchMatch[0]} />;
    else if (serviceMatch) page = <ServiceSeoPage slug={serviceMatch[0]} />;
    else page = <NotFound />; // was: silently showed the home page for any URL
  }

  return (
    <>
      {page}
      <FloatingWhatsApp />
    </>
  );
}
