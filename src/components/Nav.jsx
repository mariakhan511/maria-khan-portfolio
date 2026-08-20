import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { NAV } from "../data/content";

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */

export function Nav() {
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
