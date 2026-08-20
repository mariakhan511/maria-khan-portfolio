import { ThemeProvider } from "./context/ThemeContext";
import { GlobalStyle } from "./components/GlobalStyle";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Activity } from "./components/Activity";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

/* ------------------------------------------------------------------ */
/*  APP                                                                 */
/* ------------------------------------------------------------------ */

function PortfolioBody() {
  return (
    <div id="mk-root">
      <GlobalStyle />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Activity />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioBody />
    </ThemeProvider>
  );
}
