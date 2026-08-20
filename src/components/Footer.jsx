import { Github, Linkedin, Mail } from "lucide-react";
import { LINKEDIN_URL, CONTACT_EMAIL } from "../data/content";

/* ------------------------------------------------------------------ */
/*  FOOTER                                                              */
/* ------------------------------------------------------------------ */

export function Footer() {
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
