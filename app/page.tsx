"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  SiGithub, SiLinkedin, SiGmail,
  SiPython, SiR, SiMysql, SiPostgresql, SiMongodb,
  SiElasticsearch, SiDocker, SiFastapi, SiTableau,
  SiPytorch, SiTensorflow, SiScikitlearn, SiJupyter,
  SiHuggingface, SiGit, SiStreamlit, SiAmazon, SiPlotly, SiSqlite, SiKeras, SiZapier
} from "react-icons/si";
import { FiExternalLink, FiBookOpen, FiAward, FiChevronDown, FiPhone, FiMapPin } from "react-icons/fi"; // ← add
import emailjs from "@emailjs/browser"; // ← add


/* ------------ Config ------------ */
const NAME = "Jathin Mandapati";
const ROLE = "Generative AI Engineer";
const CERT_BADGE = "Certified Agentic AI System Architect";
const EMAIL = "jatinvarma708@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/jathinvarma/";
const GITHUB = "https://github.com/AgentMJ5";
const RESUME_URL = "/docs/JathinVarmaMandapati.pdf";
const PHONE = "+91 7013224103";
const LOCATION = "Hyderabad, India";

const heroPhrases = ["Building", "Securing", "Explaining"];

/* ------------ Data ------------ */
type Project = {
  title: string;
  tag: string;
  technical: string[];
  business: string[];
};

const projects: Project[] = [
  {
    title: "RAG Chatbot – Hybrid Retrieval with RBAC",
    tag: "MySQL • ElasticSearch • Qdrant • LangChain • Streamlit • Docker",
    technical: [
      "Hybrid retrieval: BM25 + semantic (MiniLM-384) merged with dedup + source labels.",
      "RBAC at SQL + retrieval layers (org/domain/customer scoping).",
      "Elastic bound to localhost in Docker; curl health checks.",
      "Streamlit UI with role switcher, raw hits and synthesized answers."
    ],
    business: [
      "Secure multi-tenant self-service insights without SQL expertise.",
      "Cuts analyst handoffs and speeds decision cycles."
    ]
  },
  {
    title: "LLM Security Testing Framework",
    tag: "FastAPI • JSON Playbooks • GPT Judge • Streamlit",
    technical: [
      "OWASP-LLM aligned suites: injections, leakage, hallucination, obfuscation.",
      "Judge model produces PASS/FAIL with justification.",
      "FastAPI endpoints for automation; Streamlit verdict charts."
    ],
    business: [
      "Repeatable AI security testing for LLM components.",
      "Traceable, explainable risk reports for stakeholders."
    ]
  },
  {
    title: "Exploit Explanation Tool",
    tag: "FastAPI • GPT-4o Vision • Pillow • Mermaid.js • Streamlit",
    technical: [
      "Ingests metadata + screenshots; Pillow preprocessing.",
      "Vision model → Markdown: issue, impact, severity, lifecycle + Mermaid flow.",
      "Streamlit report rendering + export; token budgeting."
    ],
    business: [
      "Turns findings into human-readable remediation guides.",
      "Improves velocity by making results explainable."
    ]
  },
  {
    title: "Schema-Aware SQL Chatbot",
    tag: "Mistral-7B • Hugging Face • SQLAlchemy • Plotly",
    technical: [
      "NL→SQL via Mistral-7B (HF Inference); SQLAlchemy live introspection.",
      "Chunking for big results; Plotly visuals; feedback-driven prompt refinement."
    ],
    business: [
      "Removes SQL barrier within RBAC; faster reporting.",
      "Chart-ready outputs for decision makers."
    ]
  },
  {
    title: "Gitleaks Augmentation – Secret Detection",
    tag: "Gitleaks • LangChain • GPT-4 • CI/CD",
    technical: [
      "Parse Gitleaks output; contextual secret classification with GPT-4.",
      "Remediation guidance; URL-based ingestion for CI/CD."
    ],
    business: [
      "Actionable alerts prioritized for DevSecOps.",
      "Reduces remediation time with automated triage."
    ]
  },
  {
    title: "Anomaly Detection for Suspicious Logins",
    tag: "IsolationForest • scikit-learn • Splunk • Python",
    technical: [
      "IsolationForest on auth events to flag anomalous login behavior (time, geo, device, velocity).",
      "Feature pipeline with rolling windows; thresholding + human-in-the-loop review queue.",
      "Splunk integration for streaming signals and triage dashboards; JSON alerts with context."
    ],
    business: [
      "Early detection of account takeover patterns with low engineering overhead.",
      "Cuts manual log review by prioritizing suspicious sessions with explanations."
    ]
  }
];

/* Technical Expertise groups — balanced */
const techGroups = [
  {
    title: "Programming & Tools",
    items: [
      { name: "Python", icon: <SiPython /> },
      { name: "R", icon: <SiR /> },
      { name: "SQL", icon: <SiMysql /> },
      { name: "Git", icon: <SiGit /> },
      { name: "Jupyter / VS Code", icon: <SiJupyter /> },
      { name: "Streamlit", icon: <SiStreamlit /> },
    ]
  },
  {
    title: "ML / DL Frameworks",
    items: [
      { name: "PyTorch", icon: <SiPytorch /> },
      { name: "TensorFlow", icon: <SiTensorflow /> },
      { name: "scikit-learn", icon: <SiScikitlearn /> },
      { name: "Transformers / HF", icon: <SiHuggingface /> },
      { name: "XGBoost", icon: <FiExternalLink /> },
      { name: "Keras", icon: <SiKeras /> }
    ]
  },
  {
    title: "Retrieval / Data",
    items: [
      { name: "ElasticSearch", icon: <SiElasticsearch /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "Qdrant", icon: <FiExternalLink /> },
      { name: "SQLite", icon: <SiSqlite /> }
    ]
  },
  {
    title: "Cloud & DevOps",
    items: [
      { name: "AWS (S3, SageMaker)", icon: <SiAmazon /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "FastAPI", icon: <SiFastapi /> },
    ]
  },
  {
    title: "Visualization",
    items: [
      { name: "Tableau", icon: <SiTableau /> },
      { name: "PowerPoint", icon: <FiExternalLink /> },
      { name: "Plotly", icon: <SiPlotly /> }
    ]
  },
  {
    title: "Orchestration",
    items: [
      { name: "LangChain / LangFlow", icon: <SiHuggingface /> },
      { name: "AutoGen / LangGraph / Swarm", icon: <FiExternalLink /> },
      { name: "n8n / Zapier", icon: <SiZapier /> }
    ]
  }
];

/* Journey logos (put these files in /public/logos/...) */
const orgLogo: Record<string, string> = {
  "Cybermindr (WATI Group)": "/logos/cybermindr.png",
  "WATI": "/logos/wati.png",
  "Digi Tele Networks": "/logos/digitele.jpeg",
  "Enercast GmbH": "/logos/enercast.png",
  "Delite Software Technologies": "/logos/delite.jpeg",
};

/* Professional Journey (resume-aligned) */
type Step = { period: string; role: string; org: string; location?: string; bullets: string[]; tech?: string[] };
const journey: Step[] = [
  {
    period: "Apr 2025 – Present",
    role: "AI Engineer",
    org: "Cybermindr (WATI Group)",
    location: "Hyderabad",
    bullets: [
      "Built vulnerability-reporting system (Python, FastAPI, GPT-4o, Pillow, Mermaid) to generate clear VAPT reports from metadata/screenshots.",
      "Researched and operationalized LLM security testing (pytest, Garak, Promptfoo, DeepTeam, OWASP Top 10) with custom playbooks and a GPT judge.",
      "Enhanced Gitleaks with GPT-4 + LangChain to classify secrets and surface remediation guidance.",
      "Designed an RBAC-aware SQL chatbot (Mistral-7B-Instruct, LangChain, MySQL, FastAPI, Plotly) to accelerate data access."
    ],
    tech: ["Python", "FastAPI", "GPT-4o", "Pillow", "Mermaid.js", "pytest", "Garak", "Promptfoo", "LangChain", "MySQL", "Plotly"]
  },
  {
    period: "Mar 2024 – Mar 2025",
    role: "AI Engineer",
    org: "WATI",
    location: "Hyderabad",
    bullets: [
      "Prototyped assistants with LangChain, HF Transformers, and OpenAI APIs—groundwork for Cybermindr chatbot and RAG search.",
      "Implemented anomaly-detection modules (Python, scikit-learn, Splunk) for internal analytics."
    ],
    tech: ["LangChain", "Transformers", "OpenAI", "Python", "scikit-learn", "Splunk"]
  },
  {
    period: "Jan 2023 – Mar 2024",
    role: "ML Engineer",
    org: "Digi Tele Networks",
    location: "Hyderabad",
    bullets: [
      "Developed renewable-energy forecasting models (TensorFlow, scikit-learn, XGBoost).",
      "Improved GRIB processing speed by ~30% using PyNio, Xarray, NumPy, Pandas to analyze weather factors."
    ],
    tech: ["TensorFlow", "scikit-learn", "XGBoost", "PyNio", "Xarray", "NumPy", "Pandas"]
  },
  {
    period: "Jul 2022 – Sep 2022",
    role: "Machine Learning Intern",
    org: "Enercast GmbH",
    location: "Remote",
    bullets: [
      "Ran statistical inference on sandbox data from 150 wind and 40 solar farms.",
      "Proposed and implemented a new preprocessing pipeline, improving power-production accuracy by ~15%."
    ],
    tech: ["Python", "Pandas", "NumPy"]
  },
  {
    period: "Jul 2020 – Jul 2021",
    role: "Software Engineer",
    org: "Delite Software Technologies",
    location: "Hyderabad",
    bullets: [
      "Designed Site IQ OMNI—real-time monitoring for 50+ gas stations (Python, Flask, MySQL, Bootstrap).",
      "Led alerting, analytics, and reporting, cutting incident response times by ~60% (Matplotlib, REST APIs)."
    ],
    tech: ["Python", "Flask", "MySQL", "Bootstrap", "Matplotlib", "REST"]
  }
];

/* ------------ Motion helpers ------------ */
const container = {
  hidden: { opacity: 0, y: 10 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};
const fadeIn = (delay = 0, y = 14) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10% 0px" },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1], round: 0.5 },
});

const fadeInList = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-12% 0px" },
  transition: { duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] },
});

const CompanyBadge = ({ org }: { org: string }) => (
  <div
    className={`inline-flex items-center justify-center rounded-md ring-1 ring-slate-800 overflow-hidden flex-shrink-0
      ${org.includes("Cybermindr") ? "bg-white" : "bg-slate-900/70"}
      size-12 md:size-14 xl:size-16`}
    style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
  >
    {orgLogo[org] && (
      <Image
        src={orgLogo[org]}
        alt={org}
        width={56}
        height={56}
        className="object-contain select-none pointer-events-none"
      />
    )}
  </div>
);

/* Client-side email form via EmailJS (silent send) */
function EmailContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    setMsg("");

    console.log(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);

    const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const serviceId  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

    if (!publicKey || !serviceId || !templateId) {
      setStatus("err");
      setMsg("Email service not configured. Please try again later.");
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus("ok");
      setMsg("Thanks! I’ll get back to you soon.");
      formRef.current.reset();
    } catch (err) {
      setStatus("err");
      setMsg("Something went wrong. Please try again.");
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} className="mt-4 grid gap-4">
      {/* spam honeypot */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
      {/* names must match your EmailJS template vars */}
      <input name="from_name" className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none" placeholder="Your name" required />
      <input type="email" name="reply_to" className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none" placeholder="Your email" required />
      <textarea name="message" rows={5} className="px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 focus:outline-none" placeholder="Message" required />
      <button disabled={status==="sending"} className="px-5 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition disabled:opacity-60">
        {status==="sending" ? "Sending..." : "Send"}
      </button>
      {status!=="idle" && (
        <p className={`text-sm mt-1 ${status==="ok" ? "text-emerald-400" : "text-rose-400"}`}>{msg}</p>
      )}
    </form>
  );
}

export default function Page() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroPhrases.length), 2200);
    return () => clearInterval(t);
  }, []);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  // Sections (for dot nav)
  const sections = ["hero","about","expertise","journey","featured","pubs","contact"];
  const [active, setActive] = useState("hero");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter(e=>e.isIntersecting)
          .sort((a,b)=>b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target?.id) setActive(vis.target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.2, 0.4, 0.6] }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen text-slate-100 overflow-x-hidden">
  <div
    className="fixed inset-0 -z-10 bg-cover bg-center"
    style={{ backgroundImage: "url('/textures/night_man.jpg')" }}
  ></div>

      {/* progress bar & top nav */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-sky-400 via-emerald-400 to-fuchsia-400 z-50" />
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/80 border-b border-slate-900">
        <nav className="w-full px-6 md:px-12 xl:px-20 2xl:px-28 h-16 flex items-center justify-between">
          <Link href="#hero" className="text-xl font-semibold hover:text-white">&lt;Sensei /&gt;</Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <Link href="#expertise" className="hover:text-white">Technical</Link>
            <Link href="#journey" className="hover:text-white">Professional Journey</Link>
            <Link href="#featured" className="hover:text-white">Featured Projects</Link>
            <Link href="#pubs" className="hover:text-white">Publications & Certs</Link>
            <Link href="#contact" className="hover:text-white">Contact</Link>
            <a href={RESUME_URL} target="_blank" className="hover:text-white">Resume</a>
          </div>
        </nav>
      </header>

      {/* left dot nav */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {sections.map((id)=>(
          <a key={id} href={`#${id}`} aria-label={id}>
            <span className={`block h-2.5 w-2.5 rounded-full transition-all ${active===id ? "bg-emerald-400 scale-110" : "bg-slate-700 hover:bg-slate-500"}`} />
          </a>
        ))}
      </div>

      {/* ===== Hero ===== */}
      <section id="hero" className="min-h-[60svh] flex items-center py-8 md:py-12">
        <div className="w-full px-6 md:px-12 xl:px-20 2xl:px-28">
          <motion.div className="grid grid-cols-12 gap-6 xl:gap-8 items-center" variants={container} initial="hidden" animate="show">
            {/* LEFT */}
            <div className="col-span-12 lg:col-span-7 xl:col-span-8">
              <motion.h1 className="text-5xl md:text-6xl xl:text-7xl font-semibold tracking-tight">{NAME}</motion.h1>
              <motion.p className="mt-3 text-sky-300 text-2xl xl:text-3xl">
                {ROLE} · {CERT_BADGE}
              </motion.p>

              <motion.div className="mt-5 h-12 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroPhrases[idx]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block rounded-xl bg-slate-900 border border-slate-800 px-5 py-2 text-slate-200 text-lg"
                  >
                    {heroPhrases[idx]}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <motion.p className="mt-4 max-w-[80ch] text-3xl md:text-3xl">
                I build things that pull their weight. I care about snappy UX, small feedback loops,
                and shipping useful tools over buzzwords. If it helps real people make better calls,
                I’m in.
              </motion.p>

              <motion.div className="mt-8 flex flex-wrap gap-4">
                <a href="#contact" className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition text-lg">Get In Touch</a>
                <a href={RESUME_URL} target="_blank" className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 transition text-lg">Download Resume</a>
              </motion.div>

              <div className="mt-10 opacity-70">
                <a href="#about" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-200 text-lg">
                  <FiChevronDown /> Scroll
                </a>
              </div>
            </div>

            {/* RIGHT photo */}
            <motion.div className="col-span-12 lg:col-span-5 xl:col-span-4">
              <div className="relative h-64 w-64 md:h-80 md:w-80 xl:h-[22rem] xl:w-[22rem] rounded-full ring-1 ring-sky-700/40 ring-offset-2 ring-offset-slate-950 overflow-hidden mx-auto">
                <Image src="/images/me.jpg" alt="Profile" fill className="object-cover" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== About ===== */}
      <section id="about" className="min-h-[60svh] flex items-center py-8 md:py-12">
        <div className="w-full px-6 md:px-12 xl:px-20 2xl:px-28">
          <motion.h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center" {...fadeIn(0)}>About Me</motion.h2>
          <div className="grid md:grid-cols-1 gap-6">
            <motion.div {...fadeIn(0.05)}>
              <p className="w-full text-3xl md:text-3xl mx-auto">
                Hi, I’m Jathin. I like taking fuzzy ideas and turning them into clean, fast,
                no-drama products. I start simple, prove value, then layer in the fancy bits.
              </p>
              <p className="w-full text-3xl md:text-3xl mt-4 mx-auto">
                My style: talk less, ship more. Iterate in public, keep the stack boring where it
                matters, and make the interface do the explaining. Off-hours it’s notebooks, gaming,
                hot chocolate, and weird datasets.
              </p>
            </motion.div>

            <motion.div className="grid sm:grid-cols-4 gap-4" {...fadeIn(0.1)}>
              {[
                {k:"Projects Completed",v:"10+"},
                {k:"Years of Experience",v:"3+ overall"},
                {k:"AI Experience",v:"2.5+ years"},
                {k:"Technologies Mastered",v:"15+"},
              ].map(card=>(
                <div key={card.k} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                  <div className="text-slate-400 text-sm">{card.k}</div>
                  <div className="text-3xl font-semibold mt-1">{card.v}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Technical Expertise ===== */}
      <section id="expertise" className="min-h-[60svh] flex items-center py-8 md:py-12">
        <div className="w-full px-6 md:px-12 xl:px-20 2xl:px-28">
          <motion.h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center" {...fadeIn(0)}>Technical Expertise</motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techGroups.map((g, gi)=>(
              <motion.div key={g.title} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6" {...fadeIn(0.05*(gi+1))}>
                <h3 className="font-semibold text-xl">{g.title}</h3>
                <ul className="mt-4 space-y-3">
                  {g.items.map((it)=>(
                    <li key={it.name} className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-2xl">
                        {it.icon ?? <span className="text-sm">{it.name[0]}</span>}
                      </span>
                      <div className="text-lg">{it.name}</div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Professional Journey ===== */}
      <section id="journey" className="py-8 md:py-12">
        <div className="w-full px-6 md:px-12 xl:px-20 2xl:px-28">
          <motion.h2 className="text-3xl md:text-4xl font-semibold mb-6 text-center" {...fadeIn(0)}>
            Professional Journey
          </motion.h2>

          <div className="relative">
            {/* vertical rail */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-800 md:left-8" />

            {/* simple stack; no overflow, no snap */}
            <div className="space-y-5">
              {journey.map((s, i) => (
                <motion.article key={i} {...fadeInList(0.05 * (i + 1))}>
                  <div className="relative border-l border-slate-800 pl-6 md:pl-10">
                    {/* dot */}
                    <span className="absolute -left-[5px] top-7 h-2 w-2 rounded-full bg-emerald-400" />

                    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 w-full">
                      <div className="flex items-center gap-3 leading-none">
                        <CompanyBadge org={s.org} />
                        <div className="text-slate-400 text-sm md:text-[0.95rem] whitespace-nowrap">
                          {s.period}
                        </div>
                      </div>

                      <div className="mt-1 text-2xl font-semibold">
                        {s.role} — <span className="text-white/95">{s.org}</span>
                      </div>

                      <ul className="mt-3 list-disc ml-5 text-slate-300 space-y-1">
                        {s.bullets.map((b, bi) => <li key={bi}>{b}</li>)}
                      </ul>

                      {s.tech && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {s.tech.map(t => (
                            <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-slate-800 border border-slate-700">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Featured Projects ===== */}
      <section id="featured" className="min-h-[60svh] flex items-center py-8 md:py-12">
        <div className="w-full px-6 md:px-12 xl:px-20 2xl:px-28">
          <motion.h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center" {...fadeIn(0)}>Featured Projects</motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((p, i)=>(
              <motion.article key={p.title} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition" {...fadeIn(0.05*(i+1))}>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="mt-1 text-slate-400">{p.tag}</p>

                <details className="mt-4 group">
                  <summary className="cursor-pointer font-semibold text-lg">Technical Standpoint</summary>
                  <ul className="mt-2 list-disc ml-5 text-slate-300 space-y-1">
                    {p.technical.map((t, idx)=><li key={idx}>{t}</li>)}
                  </ul>
                </details>

                <details className="mt-4 group">
                  <summary className="cursor-pointer font-semibold text-lg">Business Standpoint</summary>
                  <ul className="mt-2 list-disc ml-5 text-slate-300 space-y-1">
                    {p.business.map((b, idx)=><li key={idx}>{b}</li>)}
                  </ul>
                </details>
              </motion.article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-300 text-lg mb-4">
              Got an interesting idea? I’m game.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition text-lg"
              >
                Let’s Work Together
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Publications & Certifications ===== */}
      <section id="pubs" className="min-h-[60svh] flex items-center py-8 md:py-12">
        <div className="w-full px-6 md:px-12 xl:px-20 2xl:px-28">
          <motion.h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center" {...fadeIn(0)}>Publications and Certifications</motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Publications */}
            <motion.div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6" {...fadeIn(0.05)}>
              <div className="flex items-center gap-2 font-semibold text-xl">
                <FiBookOpen /> Publications
              </div>
              <ul className="mt-3 list-disc ml-5 text-slate-300 space-y-2">
                <li className="flex items-center gap-2">
                  Final-year project publication —{" "}
                  <a
                    href="https://ieeexplore.ieee.org/document/9143046"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-slate-500 hover:decoration-slate-300"
                  >
                    IEEE Xplore
                  </a>
                </li>
                <li className="flex items-center gap-2">

                  MSc dissertation report —{" "}
                  <a
                    href="https://github.com/AgentMJ5/Project_Dumps_AIML/blob/main/Jathin_Aviation_Islands/Jathin_Aviation_Islands/Report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-slate-500 hover:decoration-slate-300"
                  >
                    PDF
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Certifications */}
            <motion.div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6" {...fadeIn(0.1)}>
              <div className="flex items-center gap-2 font-semibold text-xl">
                <FiAward /> Certifications
              </div>
              <ul className="mt-3 list-disc ml-5 text-slate-300 space-y-2">
                <li className="flex items-center gap-2">

                  Agentic AI System Architect (ADaSci) —{" "}
                  <a href="https://www.linkedin.com/feed/update/urn:li:activity:7374664824166862848/?commentUrn=urn%3Ali%3Acomment%3A(activity%3A7374664824166862848%2C7375549373197479936)&dashCommentUrn=urn%3Ali%3Afsd_comment%3A(7375549373197479936%2Curn%3Ali%3Aactivity%3A7374664824166862848)"
                     target="_blank" rel="noopener noreferrer"
                     className="underline decoration-slate-500 hover:decoration-slate-300">certificate post</a>
                </li>
                <li className="flex items-center gap-2">
                  Machine Learning Engineering for Production —{" "}
                  <a href="https://www.coursera.org/account/accomplishments/specialization/certificate/3EFCG9C5HAV9"
                     target="_blank" rel="noopener noreferrer"
                     className="underline decoration-slate-500 hover:decoration-slate-300">certificate</a>
                </li>
                <li className="flex items-center gap-2">

                  Generative AI with LLMs —{" "}
                  <a href="https://www.coursera.org/account/accomplishments/certificate/SVTKUX2Y9UAP"
                     target="_blank" rel="noopener noreferrer"
                     className="underline decoration-slate-500 hover:decoration-slate-300">certificate</a>
                </li>
                <li className="flex items-center gap-2">
 
                  PGP in AI & ML — UT Austin (Great Learning)
                </li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-slate-300 text-lg mb-4">
              Research, OSS, or a quirky prototype — up for it?
            </p>
            <div className="flex justify-center">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 transition text-lg"
              >
                Let’s Collab
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Get in Touch (EmailJS) ===== */}
      <section id="contact" className="min-h-[60svh] flex items-center py-8 md:py-12">
        <div className="w-full px-6 md:px-12 xl:px-20 2xl:px-28">
          <motion.h2 className="text-3xl md:text-4xl font-semibold mb-4 text-center" {...fadeIn(0)}>
            Get In touch
          </motion.h2>

          <div className="grid md:grid-cols-[1.3fr_1fr] gap-8">
            {/* Form (EmailJS) */}
            <motion.div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6" {...fadeIn(0.05)}>
              <div className="text-slate-300">Send me a message</div>
              <EmailContactForm />
              <p className="text-slate-400 text-sm mt-2">Powered by EmailJS</p>
            </motion.div>

            {/* Contact Info with icons */}
            <motion.div className="grid gap-4" {...fadeIn(0.1)}>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="text-slate-300">Contact Information</div>
                <ul className="mt-3 space-y-3 text-slate-200">
                  <li className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      <SiGmail className="text-xl" />
                    </span>
                    <a href={`mailto:${EMAIL}`} className="hover:underline">{EMAIL}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      <FiPhone className="text-xl" />
                    </span>
                    <a href="tel:+917013224103" className="hover:underline">{PHONE}</a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                      <FiMapPin className="text-xl" />
                    </span>
                    <span>{LOCATION}</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <div className="text-slate-300">Follow</div>
                <div className="mt-4 flex items-center gap-4">
                  <a href={GITHUB} target="_blank" className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-2xl"><SiGithub /></a>
                  <a href={LINKEDIN} target="_blank" className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-2xl"><SiLinkedin /></a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      </main>
    );
  }
