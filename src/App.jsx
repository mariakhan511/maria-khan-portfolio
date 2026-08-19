import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { Github, Linkedin, Mail, Sun, Moon, Menu, X, ExternalLink, ArrowRight, Loader2, CheckCircle2, AlertTriangle, Inbox, Stamp } from "lucide-react";
/* ------------------------------------------------------------------ */
/*  DATA — edit here to update content                                 */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: "home", label: "Home", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "activity", label: "Activity", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

const SKILL_GROUPS = [
  {
    tab: "Frontend",
    letter: "F",
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 92 },
      { name: "React.js", level: 90 },
    ],
  },
  {
    tab: "Styling",
    letter: "S",
    items: [
      { name: "Tailwind CSS", level: 90 },
      { name: "Bootstrap", level: 85 },
      { name: "CSS Animations", level: 82 },
      { name: "Responsive Design", level: 93 },
    ],
  },
  {
    tab: "Data & APIs",
    letter: "D",
    items: [
      { name: "REST APIs", level: 88 },
      { name: "Fetch API", level: 88 },
      { name: "Axios", level: 84 },
      { name: "JSON", level: 90 },
    ],
  },
  {
    tab: "State",
    letter: "T",
    items: [
      { name: "React Hooks", level: 90 },
      { name: "Context API", level: 85 },
    ],
  },
  {
    tab: "Tools",
    letter: "L",
    items: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "npm", level: 88 },
    ],
  },
];

// NOTE for Maria: fill in real demoUrl values as projects go live.
// repoUrl defaults to the GitHub profile — swap in the exact repo link when ready.
const PROJECTS = [
  {
    id: "LMS-014",
    title: "Library Management System",
    desc: "A catalog-and-checkout system for tracking books, members, and due dates, built around real-world librarian workflows.",
    tech: ["React", "JavaScript", "REST API", "CSS3"],
    repoUrl: "https://github.com/mariakhan511",
    demoUrl: null,
  },
  {
    id: "BKS-027",
    title: "Book Store App",
    desc: "A storefront for browsing, searching, and purchasing books, with category filters and a responsive product grid.",
    tech: ["React", "JavaScript", "REST API", "Tailwind CSS"],
    repoUrl: "https://github.com/mariakhan511",
    demoUrl: null,
  },
  {
    id: "TTT-003",
    title: "Tic Tac Toe",
    desc: "A polished two-player game with turn tracking, win detection, and a clean, animated board built to demonstrate core JS logic.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    repoUrl: "https://github.com/mariakhan511",
    demoUrl: null,
  },
  {
    id: "EXW-009",
    title: "Explore World",
    desc: "A country and destination explorer with dynamic search and detail views, built to practice API-driven UI.",
    tech: ["React", "REST API", "CSS3"],
    repoUrl: "https://github.com/mariakhan511",
    demoUrl: null,
  },
];

const GITHUB_USERNAME = "mariakhan511";
const CONTACT_EMAIL = "mariakhan32u@gmail.com";
// TODO: swap in your actual LinkedIn profile URL
const LINKEDIN_URL = "https://www.linkedin.com/in/mariakhan511";

// Shown if GitHub's API can't be reached — keeps the section looking
// intentional instead of broken. Swap in real repo details any time.
const FALLBACK_REPOS = [
  { id: "fb-1", name: "library-management-system", description: "Catalog-and-checkout system for tracking books, members, and due dates.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/mariakhan511" },
  { id: "fb-2", name: "book-store-app", description: "Storefront for browsing, searching, and purchasing books.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/mariakhan511" },
  { id: "fb-3", name: "explore-world", description: "Country and destination explorer with dynamic search.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/mariakhan511" },
  { id: "fb-4", name: "tic-tac-toe", description: "Two-player game with turn tracking and win detection.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/mariakhan511" },
];

/* ------------------------------------------------------------------ */
/*  THEME                                                              */
/* ------------------------------------------------------------------ */

const ThemeContext = createContext(null);
const useTheme = () => useContext(ThemeContext);

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) setTheme(saved);
    } catch {
      /* no saved preference yet */
    } finally {
      setLoaded(true);
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* ignore storage errors */
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle, loaded }}>
      {children}
    </ThemeContext.Provider>
  );
}
/* ------------------------------------------------------------------ */
/*  SCROLL-REVEAL HOOK                                                  */
/* ------------------------------------------------------------------ */

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SHARED UI BITS                                                     */
/* ------------------------------------------------------------------ */

function Eyebrow({ num, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="lib-mono text-xs tracking-[0.25em]" style={{ color: "var(--brass)" }}>
        {num}
      </span>
      <span className="h-px w-10" style={{ background: "var(--brass)" }} />
      <span className="lib-mono text-xs tracking-[0.25em] uppercase" style={{ color: "var(--ink-3)" }}>
        {children}
      </span>
    </div>
  );
}

function CardChrome({ children, className = "" }) {
  return (
    <div
      className={`relative rounded-sm border ${className}`}
      style={{
        background: "var(--card)",
        borderColor: "var(--line)",
        boxShadow: "0 1px 0 0 var(--line), 0 12px 24px -18px rgba(0,0,0,0.55)",
      }}
    >
      <div
        className="absolute top-0 left-6 w-px h-3"
        style={{ background: "var(--brass)" }}
        aria-hidden="true"
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */

function Nav() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "var(--bg-translucent)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} className="lib-serif text-lg tracking-wide" style={{ color: "var(--ink-1)" }}>
          Maria Khan
          <span className="lib-mono text-[10px] align-super ml-1" style={{ color: "var(--brass)" }}>MK</span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="lib-mono text-xs px-3 py-2 rounded-sm transition-colors duration-200 flex items-center gap-2"
              style={{
                color: active === n.id ? "var(--brass)" : "var(--ink-3)",
              }}
            >
              <span className="opacity-60">{n.num}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle dark and light mode"
            className="w-9 h-9 rounded-sm flex items-center justify-center border transition-colors duration-200"
            style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden w-9 h-9 rounded-sm flex items-center justify-center border"
            style={{ borderColor: "var(--line)", color: "var(--ink-2)" }}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-1" style={{ background: "var(--bg)" }}>
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className="lib-mono text-sm py-2.5 text-left border-b"
              style={{ color: active === n.id ? "var(--brass)" : "var(--ink-2)", borderColor: "var(--line)" }}
            >
              <span className="opacity-50 mr-3">{n.num}</span>
              {n.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="home" className="relative max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-24 md:pb-32">
      <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <Reveal>
            <div className="lib-mono text-xs tracking-[0.3em] uppercase mb-6 flex items-center gap-3" style={{ color: "var(--ink-3)" }}>
              <Stamp size={14} style={{ color: "var(--brass)" }} />
              Catalog No. FE — 2026
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="lib-serif leading-[1.03] text-5xl md:text-7xl mb-6" style={{ color: "var(--ink-1)" }}>
              Maria Khan
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="lib-mono text-sm tracking-[0.15em] uppercase mb-8" style={{ color: "var(--brass)" }}>
              Frontend Developer
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-lg leading-relaxed max-w-lg mb-10" style={{ color: "var(--ink-2)" }}>
              I build modern, responsive, user-friendly web applications —
              from data-driven dashboards to storefronts — with clean
              component architecture and a careful eye for detail.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="group px-6 py-3.5 rounded-sm lib-mono text-xs tracking-[0.15em] uppercase flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--brass)", color: "var(--bg)" }}
              >
                View My Work
                <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
                className="px-6 py-3.5 rounded-sm lib-mono text-xs tracking-[0.15em] uppercase border transition-colors duration-200"
                style={{ borderColor: "var(--line)", color: "var(--ink-1)" }}
              >
                Contact Me
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={180} className="hidden md:block">
          <CatalogCardIllustration />
        </Reveal>
      </div>
    </section>
  );
}

function CatalogCardIllustration() {
  return (
    <div className="relative">
      <div
        className="absolute -inset-4 rounded-sm opacity-40"
        style={{ background: "radial-gradient(circle at 30% 20%, var(--brass) 0%, transparent 60%)", filter: "blur(30px)" }}
        aria-hidden="true"
      />
      <CardChrome className="relative p-7">
        <div className="flex justify-between items-start mb-6">
          <span className="lib-mono text-[10px] tracking-[0.2em]" style={{ color: "var(--ink-3)" }}>FRONT-END / 001.3</span>
          <span className="lib-mono text-[10px] px-2 py-0.5 rounded-sm border" style={{ borderColor: "var(--brass)", color: "var(--brass)" }}>
            AVAILABLE
          </span>
        </div>
        <div className="space-y-4">
          {["React.js", "Tailwind CSS", "REST APIs", "State Mgmt", "Responsive UI"].map((row, i) => (
            <div key={row} className="flex items-center justify-between border-b pb-3" style={{ borderColor: "var(--line)" }}>
              <span className="text-sm" style={{ color: "var(--ink-2)" }}>{row}</span>
              <span className="lib-mono text-[10px]" style={{ color: "var(--ink-3)" }}>{`0${i + 1}`}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 flex items-center justify-between">
          <span className="lib-mono text-[10px]" style={{ color: "var(--ink-3)" }}>ISSUED TO: RECRUITER</span>
          <span className="lib-serif italic text-sm" style={{ color: "var(--brass)" }}>M. Khan</span>
        </div>
      </CardChrome>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                               */
/* ------------------------------------------------------------------ */

function About() {
  const chips = [
    "HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Bootstrap",
    "REST APIs", "API Integration", "State Management", "Git/GitHub",
    "Responsive Design", "Component Architecture",
  ];
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal><Eyebrow num="01">About</Eyebrow></Reveal>
      <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-14">
        <Reveal delay={60}>
          <h2 className="lib-serif text-3xl md:text-4xl leading-tight" style={{ color: "var(--ink-1)" }}>
            Building interfaces people actually enjoy using.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <div className="space-y-5 text-base leading-relaxed" style={{ color: "var(--ink-2)" }}>
            <p>
              I'm a frontend developer who focuses on building responsive,
              accessible, and scalable web applications — the kind that hold
              up under real users and real data, not just a demo.
            </p>
            <p>
              My work spans component-based development in React, API
              integration, and thoughtful state management, always paired
              with clean, maintainable code and an eye for the small details
              that make an interface feel considered rather than assembled.
            </p>
            <div className="flex flex-wrap gap-2 pt-4">
              {chips.map((c) => (
                <span
                  key={c}
                  className="lib-mono text-[11px] px-2.5 py-1.5 rounded-sm border"
                  style={{ borderColor: "var(--line)", color: "var(--ink-3)" }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  SKILLS — catalog index                                             */
/* ------------------------------------------------------------------ */

function Skills() {
  const [tab, setTab] = useState(0);
  const group = SKILL_GROUPS[tab];

  return (
    <section id="skills" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal><Eyebrow num="02">Skills Index</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h2 className="lib-serif text-3xl md:text-4xl mb-10" style={{ color: "var(--ink-1)" }}>
          Filed by category.
        </h2>
      </Reveal>

      <Reveal delay={100}>
        <div className="flex flex-wrap gap-1 mb-1 border-b" style={{ borderColor: "var(--line)" }}>
          {SKILL_GROUPS.map((g, i) => (
            <button
              key={g.tab}
              onClick={() => setTab(i)}
              className="relative px-4 md:px-5 py-3 lib-mono text-xs tracking-[0.1em] uppercase transition-colors duration-200"
              style={{ color: tab === i ? "var(--brass)" : "var(--ink-3)" }}
            >
              <span className="mr-2 opacity-60">{g.letter}</span>
              {g.tab}
              {tab === i && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5" style={{ background: "var(--brass)" }} />
              )}
            </button>
          ))}
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {group.items.map((item, i) => (
          <Reveal key={item.name} delay={i * 60}>
            <CardChrome className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium" style={{ color: "var(--ink-1)" }}>{item.name}</span>
                <span className="lib-mono text-[10px]" style={{ color: "var(--brass)" }}>{item.level}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--line)" }}>
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${item.level}%`, background: "var(--brass)" }}
                />
              </div>
            </CardChrome>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */

function ProjectCard({ p, i }) {
  return (
    <Reveal delay={i * 90}>
      <CardChrome className="p-6 h-full flex flex-col group hover:-translate-y-1 transition-transform duration-300">
        <div className="flex items-start justify-between mb-4">
          <span className="lib-mono text-[10px] tracking-[0.15em]" style={{ color: "var(--ink-3)" }}>{p.id}</span>
          <span className="lib-mono text-[10px] px-2 py-0.5 rounded-sm border" style={{ borderColor: "var(--line)", color: "var(--ink-3)" }}>
            CARD {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="lib-serif text-xl mb-2" style={{ color: "var(--ink-1)" }}>{p.title}</h3>
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--ink-2)" }}>{p.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.tech.map((t) => (
            <span key={t} className="lib-mono text-[10px] px-2 py-1 rounded-sm" style={{ background: "var(--line)", color: "var(--ink-3)" }}>
              {t}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: "var(--line)" }}>
          {p.demoUrl ? (
            <a href={p.demoUrl} target="_blank" rel="noreferrer" className="lib-mono text-xs flex items-center gap-1.5 transition-colors duration-200" style={{ color: "var(--brass)" }}>
              Live Demo <ExternalLink size={12} />
            </a>
          ) : (
            <span className="lib-mono text-xs flex items-center gap-1.5" style={{ color: "var(--ink-3)" }} title="Add a deployed link when it's ready">
              Demo pending
            </span>
          )}
          <span className="opacity-30">·</span>
          <a href={p.repoUrl} target="_blank" rel="noreferrer" className="lib-mono text-xs flex items-center gap-1.5 transition-colors duration-200" style={{ color: "var(--ink-2)" }}>
            <Github size={12} /> GitHub
          </a>
        </div>
      </CardChrome>
    </Reveal>
  );
}

function Projects() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal><Eyebrow num="03">Projects</Eyebrow></Reveal>
      <Reveal delay={60}>
        <h2 className="lib-serif text-3xl md:text-4xl mb-10" style={{ color: "var(--ink-1)" }}>
          A few cards from the drawer.
        </h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 gap-5">
        {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  ACTIVITY — live GitHub API demo (loading / success / empty / error) */
/* ------------------------------------------------------------------ */

function Activity() {
  const [state, setState] = useState("loading"); // loading | success | fallback | empty
  const [repos, setRepos] = useState([]);

  const load = useCallback(async () => {
    setState("loading");
    try {
      const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);
      if (!res.ok) throw new Error(`GitHub API responded ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data) || data.length === 0) {
        setState("empty");
      } else {
        setRepos(data);
        setState("success");
      }
    } catch (e) {
      // GitHub unreachable — degrade gracefully to a static snapshot
      // rather than showing an error to visitors.
      setRepos(FALLBACK_REPOS);
      setState("fallback");
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <section id="activity" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal><Eyebrow num="04">Live Data</Eyebrow></Reveal>
      <Reveal delay={60}>
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <h2 className="lib-serif text-3xl md:text-4xl" style={{ color: "var(--ink-1)" }}>
            Recent from GitHub.
          </h2>
          <span className="lib-mono text-[11px]" style={{ color: "var(--ink-3)" }}>
            api.github.com/users/{GITHUB_USERNAME}/repos
          </span>
        </div>
      </Reveal>

      {state === "loading" && (
        <Reveal>
          <div className="flex items-center gap-3 py-16 justify-center lib-mono text-sm" style={{ color: "var(--ink-3)" }}>
            <Loader2 size={16} className="animate-spin" /> Pulling the latest card…
          </div>
        </Reveal>
      )}

      {state === "fallback" && (
        <Reveal>
          <p className="lib-mono text-[11px] mb-5 -mt-4" style={{ color: "var(--ink-3)" }}>
            Showing a recent snapshot.
          </p>
        </Reveal>
      )}

      {state === "empty" && (
        <Reveal>
          <CardChrome className="p-8 flex flex-col items-center text-center gap-3">
            <Inbox size={20} style={{ color: "var(--ink-3)" }} />
            <p className="text-sm" style={{ color: "var(--ink-2)" }}>No public repositories to show yet.</p>
          </CardChrome>
        </Reveal>
      )}

      {(state === "success" || state === "fallback") && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {repos.map((r, i) => (
            <Reveal key={r.id} delay={i * 70}>
              <a href={r.html_url} target="_blank" rel="noreferrer">
                <CardChrome className="p-5 h-full hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium truncate" style={{ color: "var(--ink-1)" }}>{r.name}</span>
                    <Github size={13} style={{ color: "var(--ink-3)" }} />
                  </div>
                  <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--ink-3)", minHeight: "2.2em" }}>
                    {r.description || "No description provided."}
                  </p>
                  <div className="flex items-center gap-3 lib-mono text-[10px]" style={{ color: "var(--ink-3)" }}>
                    {r.language && <span>{r.language}</span>}
                    <span>★ {r.stargazers_count}</span>
                  </div>
                </CardChrome>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CONTACT                                                             */
/* ------------------------------------------------------------------ */

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Full name is required.";
  if (!fields.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!fields.subject.trim()) errors.subject = "Subject is required.";
  if (!fields.message.trim()) {
    errors.message = "Message is required.";
  } else if (fields.message.trim().length < 20) {
    errors.message = "Message should be at least 20 characters.";
  }
  return errors;
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="lib-mono text-[11px] tracking-[0.1em] uppercase mb-2 block" style={{ color: "var(--ink-3)" }}>
        {label}
      </span>
      {children}
      {error && <span className="text-xs mt-1.5 block" style={{ color: "var(--rust)" }}>{error}</span>}
    </label>
  );
}

const inputStyle = {
  background: "var(--bg)",
  borderColor: "var(--line)",
  color: "var(--ink-1)",
};

function Contact() {
  const [fields, setFields] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [showAdmin, setShowAdmin] = useState(false);
  const [subs, setSubs] = useState([]);
  const [subsState, setSubsState] = useState("idle"); // idle | loading | success | empty | error

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate(fields);
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    setSubmitting(true);
    setSubmitError(false);
    try {
      const existing = await window.storage.get("contact-submissions").catch(() => null);
      const list = existing?.value ? JSON.parse(existing.value) : [];
      const entry = {
        id: `MSG-${Date.now()}`,
        ...fields,
        submittedAt: new Date().toISOString(),
        status: "New",
      };
      list.unshift(entry);
      const result = await window.storage.set("contact-submissions", JSON.stringify(list));
      if (!result) throw new Error("Storage write failed");

      // Route the message to the inbox. A static site can't send email
      // silently without a backend/email service, so this opens the
      // visitor's mail client with everything pre-filled.
      const mailBody = `From: ${fields.name} (${fields.email})\n\n${fields.message}`;
      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(mailBody)}`;
      window.location.href = mailtoLink;

      setSubmitted(true);
      setFields({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const loadSubs = useCallback(async () => {
    setSubsState("loading");
    try {
      const res = await window.storage.get("contact-submissions");
      const list = res?.value ? JSON.parse(res.value) : [];
      setSubs(list);
      setSubsState(list.length ? "success" : "empty");
    } catch {
      setSubsState("empty");
    }
  }, []);

  const toggleAdmin = () => {
    setShowAdmin((s) => {
      const next = !s;
      if (next) loadSubs();
      return next;
    });
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
      <Reveal><Eyebrow num="05">Contact</Eyebrow></Reveal>
      <div className="grid md:grid-cols-[0.8fr_1.2fr] gap-14">
        <Reveal delay={60}>
          <div>
            <h2 className="lib-serif text-3xl md:text-4xl mb-5" style={{ color: "var(--ink-1)" }}>
              Request a card.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--ink-2)" }}>
              Have a role, project, or idea in mind? Fill out the form and
              it'll land straight in my inbox — I read every message.
            </p>
            <button
              onClick={toggleAdmin}
              className="lib-mono text-xs px-4 py-2.5 rounded-sm border transition-colors duration-200"
              style={{ borderColor: "var(--line)", color: "var(--ink-3)" }}
            >
              {showAdmin ? "Hide" : "View"} submissions log
            </button>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <CardChrome className="p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center text-center py-10 gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center rotate-[-8deg] border-2"
                  style={{ borderColor: "var(--brass)", color: "var(--brass)" }}
                >
                  <CheckCircle2 size={26} />
                </div>
                <p className="lib-serif text-xl" style={{ color: "var(--ink-1)" }}>Stamped &amp; filed.</p>
                <p className="text-sm max-w-xs" style={{ color: "var(--ink-2)" }}>
                  Thank you for contacting me. Your email app should now be
                  open with your message ready to send.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="lib-mono text-xs mt-2 px-4 py-2 rounded-sm border"
                  style={{ borderColor: "var(--line)", color: "var(--ink-1)" }}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" error={errors.name}>
                    <input
                      value={fields.name}
                      onChange={set("name")}
                      className="w-full px-3.5 py-2.5 rounded-sm border text-sm focus:outline-none focus:ring-1"
                      style={inputStyle}
                      placeholder="Your name"
                    />
                  </Field>
                  <Field label="Email Address" error={errors.email}>
                    <input
                      value={fields.email}
                      onChange={set("email")}
                      className="w-full px-3.5 py-2.5 rounded-sm border text-sm focus:outline-none focus:ring-1"
                      style={inputStyle}
                      placeholder="you@example.com"
                    />
                  </Field>
                </div>
                <Field label="Subject" error={errors.subject}>
                  <input
                    value={fields.subject}
                    onChange={set("subject")}
                    className="w-full px-3.5 py-2.5 rounded-sm border text-sm focus:outline-none focus:ring-1"
                    style={inputStyle}
                    placeholder="What's this about?"
                  />
                </Field>
                <Field label="Message" error={errors.message}>
                  <textarea
                    value={fields.message}
                    onChange={set("message")}
                    rows={5}
                    className="w-full px-3.5 py-2.5 rounded-sm border text-sm focus:outline-none focus:ring-1 resize-none"
                    style={inputStyle}
                    placeholder="Tell me a bit more…"
                  />
                </Field>

                {submitError && (
                  <p className="text-xs flex items-center gap-1.5" style={{ color: "var(--rust)" }}>
                    <AlertTriangle size={13} /> Something went wrong saving your message. Please try again.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-sm lib-mono text-xs tracking-[0.15em] uppercase flex items-center justify-center gap-2 transition-opacity duration-200 disabled:opacity-60"
                  style={{ background: "var(--brass)", color: "var(--bg)" }}
                >
                  {submitting ? <><Loader2 size={14} className="animate-spin" /> Submitting…</> : "Submit Message"}
                </button>
              </form>
            )}
          </CardChrome>
        </Reveal>
      </div>

      {showAdmin && (
        <Reveal>
          <div className="mt-14">
            <div className="flex items-center justify-between mb-5">
              <h3 className="lib-mono text-xs tracking-[0.2em] uppercase" style={{ color: "var(--ink-3)" }}>
                Submissions Log
              </h3>
              <button onClick={loadSubs} className="lib-mono text-[11px]" style={{ color: "var(--brass)" }}>Refresh</button>
            </div>

            {subsState === "loading" && (
              <div className="flex items-center gap-2 py-8 justify-center lib-mono text-sm" style={{ color: "var(--ink-3)" }}>
                <Loader2 size={14} className="animate-spin" /> Loading…
              </div>
            )}
            {subsState === "empty" && (
              <CardChrome className="p-8 text-center">
                <p className="text-sm" style={{ color: "var(--ink-2)" }}>No submissions yet — this fills in as messages come through.</p>
              </CardChrome>
            )}
            {subsState === "success" && (
              <CardChrome className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="border-b lib-mono text-[10px] uppercase tracking-wider" style={{ borderColor: "var(--line)", color: "var(--ink-3)" }}>
                      <th className="text-left px-5 py-3 font-normal">Name</th>
                      <th className="text-left px-5 py-3 font-normal">Email</th>
                      <th className="text-left px-5 py-3 font-normal">Subject</th>
                      <th className="text-left px-5 py-3 font-normal">Received</th>
                      <th className="text-left px-5 py-3 font-normal">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subs.map((s) => (
                      <tr key={s.id} className="border-b last:border-0" style={{ borderColor: "var(--line)" }}>
                        <td className="px-5 py-3.5" style={{ color: "var(--ink-1)" }}>{s.name}</td>
                        <td className="px-5 py-3.5" style={{ color: "var(--ink-2)" }}>{s.email}</td>
                        <td className="px-5 py-3.5" style={{ color: "var(--ink-2)" }}>{s.subject}</td>
                        <td className="px-5 py-3.5 lib-mono text-xs" style={{ color: "var(--ink-3)" }}>
                          {new Date(s.submittedAt).toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="lib-mono text-[10px] px-2 py-0.5 rounded-sm border" style={{ borderColor: "var(--brass)", color: "var(--brass)" }}>
                            {s.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardChrome>
            )}
          </div>
        </Reveal>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--line)" }}>
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <p className="lib-serif text-lg" style={{ color: "var(--ink-1)" }}>Maria Khan</p>
          <p className="lib-mono text-xs mt-1" style={{ color: "var(--ink-3)" }}>Frontend Developer — building tidy, dependable interfaces.</p>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/mariakhan511" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: "var(--ink-2)" }}>
            <Github size={18} />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: "var(--ink-2)" }}>
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" style={{ color: "var(--ink-2)" }}>
            <Mail size={18} />
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 md:px-10 pb-8">
        <p className="lib-mono text-[11px]" style={{ color: "var(--ink-3)" }}>
          © {new Date().getFullYear()} Maria Khan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  GLOBAL STYLE                                                       */
/* ------------------------------------------------------------------ */

function GlobalStyle() {
  const { theme } = useTheme();
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500&display=swap');

      #mk-root {
        --bg: ${theme === "dark" ? "#141F1A" : "#F1ECDD"};
        --bg-translucent: ${theme === "dark" ? "rgba(20,31,26,0.85)" : "rgba(241,236,221,0.85)"};
        --card: ${theme === "dark" ? "#1B2A23" : "#FBF8EF"};
        --line: ${theme === "dark" ? "#2B3B33" : "#DED5BC"};
        --ink-1: ${theme === "dark" ? "#EFE9D9" : "#1B2A23"};
        --ink-2: ${theme === "dark" ? "#C4C9BE" : "#3E4A41"};
        --ink-3: ${theme === "dark" ? "#8B978E" : "#78725E"};
        --brass: ${theme === "dark" ? "#D2AC47" : "#A9791F"};
        --rust: #B5533C;
        background: var(--bg);
        color: var(--ink-1);
        min-height: 100vh;
        font-family: 'Inter', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
      }
      #mk-root .lib-serif { font-family: 'Fraunces', serif; }
      #mk-root .lib-mono { font-family: 'IBM Plex Mono', monospace; }
      #mk-root input::placeholder, #mk-root textarea::placeholder { color: var(--ink-3); opacity: 0.7; }
      #mk-root input:focus, #mk-root textarea:focus { border-color: var(--brass) !important; }
      #mk-root ::selection { background: var(--brass); color: var(--bg); }
      @media (prefers-reduced-motion: reduce) {
        #mk-root * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
      }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */

function PortfolioBody() {
  return (
    <div id="mk-root">
      <GlobalStyle />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Activity />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioBody />
    </ThemeProvider>
  );
}
