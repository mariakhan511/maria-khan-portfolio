export function CardChrome({ children, className = "" }) {
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
