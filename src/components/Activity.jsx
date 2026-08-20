import { useState, useCallback, useEffect } from "react";
import { Loader2, Inbox, FileText, Github, Star } from "lucide-react";
import { Reveal } from "./common/Reveal";
import { Eyebrow } from "./common/Eyebrow";
import { CardChrome } from "./common/CardChrome";
import { GITHUB_USERNAME, FALLBACK_REPOS } from "../data/content";

/* ------------------------------------------------------------------ */
/*  ACTIVITY — live GitHub API demo (loading / success / empty / error) */
/* ------------------------------------------------------------------ */

export function Activity() {
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
        const DESCRIPTIONS = {
          "maria-khan-portfolio": "Personal portfolio website built with React and Tailwind CSS, featuring dark/light mode and live GitHub integration.",
          "React-TCSS": "Practice project combining React.js with Tailwind CSS for responsive UI components.",
          "React-figma": "React project translating Figma designs into pixel-accurate, responsive components.",
          "React-tutorial": "Collection of React.js fundamentals and hands-on exercises for learning hooks and components.",
          "Bootstrap": "Responsive web pages built with HTML, CSS, and Bootstrap for layout and styling practice.",
          "My-Portfolio": "Early version of a personal portfolio site built with HTML and CSS.",
        };
        const enriched = data.map((r) => ({
          ...r,
          description: r.description || DESCRIPTIONS[r.name] || null,
        }));
        setRepos(enriched);
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
                                    {r.description ? (
                    <p className="text-xs leading-relaxed mb-4 line-clamp-2" style={{ color: "var(--ink-3)", minHeight: "2.2em" }}>
                      {r.description}
                    </p>
                  ) : (
                    <p
                      className="text-xs leading-relaxed mb-4 flex items-center gap-1.5 italic"
                      style={{ color: "var(--ink-3)", opacity: 0.6, minHeight: "2.2em" }}
                    >
                      <FileText size={12} />

                    </p>
                  )}
                  <div className="flex items-center gap-4 lib-mono text-[10px]" style={{ color: "var(--ink-3)" }}>
                    {r.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ background: "var(--brass)" }}
                        />
                        {r.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={11} />
                      {r.stargazers_count}
                    </span>
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
