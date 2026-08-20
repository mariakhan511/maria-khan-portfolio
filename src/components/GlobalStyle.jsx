import { useTheme } from "../context/ThemeContext";

/* ------------------------------------------------------------------ */
/*  GLOBAL STYLE                                                       */
/* ------------------------------------------------------------------ */

export function GlobalStyle() {
  const { theme } = useTheme();
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500&display=swap');

      #mk-root {
        --bg: ${theme === "dark" ? "#141F1A" : "#F1ECDD"};
        --bg-translucent: ${theme === "dark" ? "rgba(20,31,26,0.85)" : "rgba(241,236,221,0.85)"};
        --card: ${theme === "dark" ? "#1B2A23" : "#FBF8EF"};
        --line: ${theme === "dark" ? "#2B3B33" : "#DED5BC"};
        --ink-1: ${theme === "dark" ? "#EFE9D9" : "#1B2A23"};
        --ink-2: ${theme === "dark" ? "#C4C9BE" : "#3E4A41"};
        --ink-3: ${theme === "dark" ? "#8B978E" : "#78725E"};
        --brass: ${theme === "dark" ? "#D2AC47" : "#A9791F"};
        --rust: #B5533C;
        background: var(--bg);
        color: var(--ink-1);
        min-height: 100vh;
        font-family: 'Inter', sans-serif;
        transition: background 0.4s ease, color 0.4s ease;
      }
            #mk-root .lib-serif { font-family: 'Fraunces', serif; }
      #mk-root .lib-mono { font-family: 'IBM Plex Mono', monospace; }
      @keyframes mk-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
           @keyframes mk-letter-in {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
      }
      }
      #mk-root input::placeholder, #mk-root textarea::placeholder { color: var(--ink-3); opacity: 0.7; }
      #mk-root input:focus, #mk-root textarea:focus { border-color: var(--brass) !important; }
      #mk-root ::selection { background: var(--brass); color: var(--bg); }
      @media (prefers-reduced-motion: reduce) {
        #mk-root * { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
      }
    `}</style>
  );
}
