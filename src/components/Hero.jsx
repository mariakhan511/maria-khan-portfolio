import { ArrowRight } from "lucide-react";
import { Typewriter } from "react-simple-typewriter";
import { Reveal } from "./common/Reveal";
import { CardChrome } from "./common/CardChrome";

/* ------------------------------------------------------------------ */
/*  HERO                                                                */
/* ------------------------------------------------------------------ */

export function Hero() {
  return (
    <section
      id="home"
      className="relative max-w-6xl mx-auto px-6 md:px-10 pt-16 md:pt-28 pb-24 md:pb-32"
    >
      <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <Reveal>
            <div className="relative w-24 h-24 mb-6">
              <div
                className="absolute -inset-1.5 rounded-full opacity-70"
                style={{
                  background:
                    "conic-gradient(from 0deg, var(--brass), transparent, var(--brass))",
                  animation: "mk-spin 6s linear infinite",
                }}
                aria-hidden="true"
              />
              <div className="relative w-36 h-36 mb-6 -translate-y-8">
                {/* Golden animated ring */}
                <div
                  className="absolute -inset-2 rounded-full opacity-70"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--brass), transparent, var(--brass))",
                    animation: "mk-spin 6s linear infinite",
                  }}
                />

                {/* Profile image */}
                <img
                  src="/profile (1).jpg"
                  alt="Maria Khan"
                  className="relative w-36 h-36 rounded-full object-cover border-2"
                  style={{
                    borderColor: "var(--bg)",
                    animation: "mk-float 4s ease-in-out infinite",
                  }}
                />
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="lib-serif leading-[1.03] text-5xl md:text-7xl mb-6 maria-slide">
              <Typewriter
                words={["Maria Khan"]}
                loop={2}
                cursor
                cursorStyle="|"
                cursorColor="var(--brass)"
                typeSpeed={110}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p
              className="lib-mono text-sm tracking-[0.15em] uppercase mb-8"
              style={{ color: "var(--brass)" }}
            >
              Frontend Developer
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p
              className="text-lg leading-relaxed max-w-lg mb-10"
              style={{ color: "var(--ink-2)" }}
            >
              I build modern, responsive, user-friendly web applications — from
              data-driven dashboards to storefronts — with clean component
              architecture and a careful eye for detail.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group px-6 py-3.5 rounded-sm lib-mono text-xs tracking-[0.15em] uppercase flex items-center gap-2 transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--brass)", color: "var(--bg)" }}
              >
                View My Work
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
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
        style={{
          background:
            "radial-gradient(circle at 30% 20%, var(--brass) 0%, transparent 60%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />
      <CardChrome className="relative p-7">
        <div className="flex justify-between items-start mb-6">
          <span
            className="lib-mono text-[10px] tracking-[0.2em]"
            style={{ color: "var(--ink-3)" }}
          >
            Frontend Developer
          </span>
          <span
            className="lib-mono text-[10px] px-2 py-0.5 rounded-sm border"
            style={{ borderColor: "var(--brass)", color: "var(--brass)" }}
          >
            AVAILABLE
          </span>
        </div>
        <div className="space-y-4">
          {[
            "React.js",
            "Tailwind CSS",
            "REST APIs",
            "State Mgmt",
            "Responsive UI",
          ].map((row, i) => (
            <div
              key={row}
              className="flex items-center justify-between border-b pb-3"
              style={{ borderColor: "var(--line)" }}
            >
              <span className="text-sm" style={{ color: "var(--ink-2)" }}>
                {row}
              </span>
              <span
                className="lib-mono text-[10px]"
                style={{ color: "var(--ink-3)" }}
              >{`0${i + 1}`}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 flex items-center justify-between">
          <span
            className="lib-mono text-[10px]"
            style={{ color: "var(--ink-3)" }}
          >
            ISSUED TO: RECRUITER
          </span>
          <span
            className="lib-serif italic text-sm"
            style={{ color: "var(--brass)" }}
          >
            M. Khan
          </span>
        </div>
      </CardChrome>
    </div>
  );
}
