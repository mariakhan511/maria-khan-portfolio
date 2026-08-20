/* ------------------------------------------------------------------ */
/*  DATA — edit here to update content                                 */
/* ------------------------------------------------------------------ */

export const NAV = [
  { id: "home", label: "Home", num: "00" },
  { id: "about", label: "About", num: "01" },
  { id: "skills", label: "Skills", num: "02" },
  { id: "projects", label: "Projects", num: "03" },
  { id: "activity", label: "Activity", num: "04" },
  { id: "contact", label: "Contact", num: "05" },
];

export const SKILL_GROUPS = [
  {
    tab: "Frontend",
    letter: "F",
    items: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 92 },
      { name: "React.js", level: 90 },
    ],
  },
  {
    tab: "Styling",
    letter: "S",
    items: [
      { name: "Tailwind CSS", level: 90 },
      { name: "Bootstrap", level: 85 },
      { name: "CSS Animations", level: 82 },
      { name: "Responsive Design", level: 93 },
    ],
  },
  {
    tab: "Data & APIs",
    letter: "D",
    items: [
      { name: "REST APIs", level: 88 },
      { name: "Fetch API", level: 88 },
      { name: "Axios", level: 84 },
      { name: "JSON", level: 90 },
    ],
  },
  {
    tab: "State",
    letter: "T",
    items: [
      { name: "React Hooks", level: 90 },
      { name: "Context API", level: 85 },
    ],
  },
  {
    tab: "Tools",
    letter: "L",
    items: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "npm", level: 88 },
    ],
  },
];

// NOTE for Maria: fill in real demoUrl values as projects go live.
// repoUrl defaults to the GitHub profile — swap in the exact repo link when ready.
// image is a placeholder (picsum.photos) — swap in a real screenshot per project when ready.
export const PROJECTS = [
  {
    id: "LMS-014",
    title: "Library Management System",
    desc: "A catalog-and-checkout system for tracking books, members, and due dates, built around real-world librarian workflows.",
    tech: ["React", "JavaScript", "REST API", "CSS3"],
    repoUrl: "https://github.com/mariakhan511",
    demoUrl: null,
    image: "https://picsum.photos/seed/lms-014/600/400",
  },
  {
    id: "BKS-027",
    title: "Book Store App",
    desc: "A storefront for browsing, searching, and purchasing books, with category filters and a responsive product grid.",
    tech: ["React", "JavaScript", "REST API", "Tailwind CSS"],
    repoUrl: "https://github.com/mariakhan511",
    demoUrl: null,
    image: "https://picsum.photos/seed/bks-027/600/400",
  },
  {
    id: "TTT-003",
    title: "Tic Tac Toe",
    desc: "A polished two-player game with turn tracking, win detection, and a clean, animated board built to demonstrate core JS logic.",
    tech: ["JavaScript", "HTML5", "CSS3"],
    repoUrl: "https://github.com/mariakhan511",
    demoUrl: null,
    image: "https://picsum.photos/seed/ttt-003/600/400",
  },
  {
    id: "EXW-009",
    title: "Explore World",
    desc: "A country and destination explorer with dynamic search and detail views, built to practice API-driven UI.",
    tech: ["React", "REST API", "CSS3"],
    repoUrl: "https://github.com/mariakhan511",
    demoUrl: null,
    image: "https://picsum.photos/seed/exw-009/600/400",
  },
];

export const GITHUB_USERNAME = "mariakhan511";
export const CONTACT_EMAIL = "mariakhan32u@gmail.com";
// TODO: swap in your actual LinkedIn profile URL
export const LINKEDIN_URL = "https://www.linkedin.com/in/mariakhan511";

// Shown if GitHub's API can't be reached — keeps the section looking
// intentional instead of broken. Swap in real repo details any time.
export const FALLBACK_REPOS = [
  { id: "fb-1", name: "library-management-system", description: "Catalog-and-checkout system for tracking books, members, and due dates.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/mariakhan511" },
  { id: "fb-2", name: "book-store-app", description: "Storefront for browsing, searching, and purchasing books.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/mariakhan511" },
  { id: "fb-3", name: "explore-world", description: "Country and destination explorer with dynamic search.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/mariakhan511" },
  { id: "fb-4", name: "tic-tac-toe", description: "Two-player game with turn tracking and win detection.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/mariakhan511" },
];
