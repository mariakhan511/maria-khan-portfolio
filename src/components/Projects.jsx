import { ExternalLink, Github } from "lucide-react";
import { Reveal } from "./common/Reveal";
import { Eyebrow } from "./common/Eyebrow";
import { CardChrome } from "./common/CardChrome";
import { PROJECTS } from "../data/content";

/* ------------------------------------------------------------------ */
/*  PROJECTS                                                           */
/* ------------------------------------------------------------------ */

function ProjectCard({ p, i }) {
  return (
    <Reveal delay={i * 90}>
      <CardChrome className="overflow-hidden h-full flex flex-col group hover:-translate-y-1 transition-transform duration-300">
        <div className="relative overflow-hidden">
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, var(--card) 0%, transparent 55%)" }}
            aria-hidden="true"
          />
          <span
            className="absolute top-3 right-3 lib-mono text-[10px] px-2 py-0.5 rounded-sm border backdrop-blur-sm"
            style={{ borderColor: "var(--line)", color: "var(--ink-1)", background: "var(--bg-translucent)" }}
          >
            CARD {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="p-6 flex flex-col flex-1">
          <span className="lib-mono text-[10px] tracking-[0.15em] mb-2" style={{ color: "var(--ink-3)" }}>{p.id}</span>
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
        </div>
      </CardChrome>
    </Reveal>
  );
}

export function Projects() {
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
