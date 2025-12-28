// --- TRANSLATION SYSTEM ---
// Define translations for English (en) and Norwegian (no).
// Each key matches a data-i18n attribute in the HTML.
const translations = {
  en: {
    skills_title: "Skills in progress",
    skills_intro: "I like learning in tiny, steady steps. Here's what I'm practicing now:",
    skills_node_title: "Node.js runtime",
    skills_node_text: "Exploring server-side JavaScript, simple APIs, and tooling to round out my front-end skills.",
    skills_collab_title: "Collaboration habits",
    skills_collab_text: "Using GitHub, issue tracking, and weekly retros to stay aligned and iterate with teammates.",
    skills_js_title: "JavaScript essentials",
    skills_js_text: "Practicing DOM scripting, state management, and fetch workflows to bring interactivity to small apps.",
    skills_css_title: "CSS layout systems",
    skills_css_text: "Experimenting with flexbox, grid, and custom properties to build fluid, themeable interfaces that scale.",
    skills_html_title: "HTML foundations",
    skills_html_text: "Crafting semantic layouts, accessible forms, and tidy document structures that screen readers understand.",
    brand_name: "Murtada Al-Obaidi",
    brand_role: "Front-End Student",
    nav_about: "About",
    nav_skills: "Skills",
    nav_projects: "Projects",
    nav_blog: "Blog",
    nav_contact: "Contact",
    about_hello: "Hello!",
    about_headline: "I design and build friendly web experiences.",
    about_intro: "I'm a front-end developer who loves translating ideas into clean, responsive UI using just HTML, CSS, and JavaScript.",
    about_highlight1: "Delivers user-friendly, accessible layouts that work on all screens",
    about_highlight2: "SEO optimization and marketing to increase visibility and traffic",
    about_highlight3: "Communicates progress clearly and is curious when problems arise",
    about_interests: "Interests",
    about_interest_testing: "Testing",
    about_interest_testing1: "Testing with Lighthouse for accessibility and performance",
    about_interest_testing2: "Testing with code (unit and integration tests)",
    about_interest_security: "Security",
    about_interest_security1: "Web Application Security: learning to protect apps from common threats",
  },
  no: {
    skills_title: "Ferdigheter i utvikling",
    skills_intro: "Jeg liker å lære i små, jevne steg. Dette øver jeg på nå:",
    skills_node_title: "Node.js-miljø",
    skills_node_text: "Utforsker server-side JavaScript, enkle API-er og verktøy for å runde frontend-ferdighetene mine.",
    skills_collab_title: "Samarbeidsvaner",
    skills_collab_text: "Bruker GitHub, oppgavehåndtering og ukentlige retros for å holde teamet samkjørt og forbedre oss.",
    skills_js_title: "JavaScript-grunnleggende",
    skills_js_text: "Øver på DOM-manipulering, tilstandshåndtering og fetch-arbeidsflyter for å gi små apper interaktivitet.",
    skills_css_title: "CSS-layoutsystemer",
    skills_css_text: "Eksperimenterer med flexbox, grid og CSS-variabler for å bygge fleksible, temavennlige grensesnitt.",
    skills_html_title: "HTML-grunnmurer",
    skills_html_text: "Lager semantiske oppsett, tilgjengelige skjemaer og ryddige dokumentstrukturer som skjermlesere forstår.",
    brand_name: "Murtada Al-Obaidi",
    brand_role: "Frontend-student",
    nav_about: "Om meg",
    nav_skills: "Ferdigheter",
    nav_projects: "Prosjekter",
    nav_blog: "Blogg",
    nav_contact: "Kontakt",
    about_hello: "Hei!",
    about_headline: "Jeg designer og bygger brukervennlige webløsninger.",
    about_intro: "Jeg er en frontend-utvikler som elsker å gjøre ideer om til rene, responsive brukergrensesnitt med HTML, CSS og JavaScript.",
    about_highlight1: "Leverer kundevennlige, tilgjengelige oppsett som fungerer på alle skjermer",
    about_highlight2: "SEO optimalisering og markedsføring for å øke synlighet og trafikk",
    about_highlight3: "Kommuniserer fremdrift tydelig og er nysgjerrig når problemer oppstår",
    about_interests: "Interesser",
    about_interest_testing: "Testing",
    about_interest_testing1: "Tester med Lighthouse for tilgjengelighet og ytelse",
    about_interest_testing2: "Tester med kode (enhetstester og integrasjonstester)",
    about_interest_security: "Sikkerhet",
    about_interest_security1: "Webapplikasjonssikkerhet: lærer å beskytte apper mot vanlige trusler",
  }
};

// Set default language
let currentLang = "no";

// Update all elements with data-i18n attribute to the selected language
function updateTranslations(lang) {
  const dict = translations[lang] || translations.en;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  currentLang = lang;
}

// Wire up language switcher buttons
function wireLanguageSwitcher() {
  const btnEn = document.getElementById("lang-en");
  const btnNo = document.getElementById("lang-no");
  if (btnEn) btnEn.addEventListener("click", () => updateTranslations("en"));
  if (btnNo) btnNo.addEventListener("click", () => updateTranslations("no"));
}
