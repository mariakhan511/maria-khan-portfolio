import { useState } from "react";
import { Reveal } from "./common/Reveal";
import { Eyebrow } from "./common/Eyebrow";
import { CardChrome } from "./common/CardChrome";
import { SKILL_GROUPS } from "../data/content";

/* ------------------------------------------------------------------ */
/*  SKILLS — catalog index                                             */
/* ------------------------------------------------------------------ */

export function Skills() {
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
