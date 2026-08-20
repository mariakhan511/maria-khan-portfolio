export function Eyebrow({ num, children }) {
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
