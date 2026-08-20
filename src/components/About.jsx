import { Reveal } from "./common/Reveal";
import { Eyebrow } from "./common/Eyebrow";

/* ------------------------------------------------------------------ */
/*  ABOUT                                                               */
/* ------------------------------------------------------------------ */

export function About() {
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
