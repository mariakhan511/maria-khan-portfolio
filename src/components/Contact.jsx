import { useState, useCallback } from "react";
import { Loader2, CheckCircle2, AlertTriangle, Trash2 } from "lucide-react";
import { Reveal } from "./common/Reveal";
import { Eyebrow } from "./common/Eyebrow";
import { CardChrome } from "./common/CardChrome";
import { CONTACT_EMAIL } from "../data/content";

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

export function Contact() {
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
      const existing = localStorage.getItem("contact-submissions");
      const list = existing ? JSON.parse(existing) : [];
      const entry = {
        id: `MSG-${Date.now()}`,
        ...fields,
        submittedAt: new Date().toISOString(),
        status: "New",
      };
      list.unshift(entry);
      localStorage.setItem("contact-submissions", JSON.stringify(list));

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
      const existing = localStorage.getItem("contact-submissions");
      const list = existing ? JSON.parse(existing) : [];
      setSubs(list);
      setSubsState(list.length ? "success" : "empty");
    } catch {
      setSubsState("empty");
    }
  }, []);

  const deleteSub = (id) => {
    setSubs((prev) => {
      const next = prev.filter((s) => s.id !== id);
      localStorage.setItem("contact-submissions", JSON.stringify(next));
      setSubsState(next.length ? "success" : "empty");
      return next;
    });
  };

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
                      <th className="text-left px-5 py-3 font-normal">Actions</th>
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
                        <td className="px-5 py-3.5">
                          <button
                            onClick={() => deleteSub(s.id)}
                            aria-label="Delete submission"
                            title="Delete submission"
                            className="lib-mono text-[10px] px-2 py-1 rounded-sm border flex items-center gap-1.5 transition-colors duration-200"
                            style={{ borderColor: "var(--line)", color: "var(--rust)" }}
                          >
                            <Trash2 size={12} /> Delete
                          </button>
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
