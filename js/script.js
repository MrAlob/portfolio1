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

// --- END TRANSLATION SYSTEM ---
// Cache key DOM nodes that we interact with multiple times.
const app = document.querySelector("#app");
const panels = document.querySelectorAll("[data-panel]");
const navButtons = document.querySelectorAll("nav [data-target]");
const jumpButtons = document.querySelectorAll(".cta[data-target]");
const yearEl = document.querySelector("#year");
const contactForm = document.querySelector(".contact-form");
const welcomeOverlay = document.querySelector(".welcome-overlay");
const timelineCards = document.querySelectorAll("[data-timeline-card]");

// Track simple UI state (which panel is visible).
const state = {
  activePanel: "about",
};

// Swap the visible panel + highlight the matching nav button.
function showPanel(id) {
  if (!id || id === state.activePanel) return;
  panels.forEach((panel) => {
    panel.classList.toggle("panel--active", panel.id === id);
  });

  navButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.target === id);
  });

  state.activePanel = id;
}

// Drop the current year into the footer so it stays up to date.
function hydrateYear() {
  yearEl.textContent = new Date().getFullYear();
}

// Handle clicks from the nav + CTA buttons and show the requested panel.
function wireNavigation() {
  [...navButtons, ...jumpButtons].forEach((btn) => {
    btn.addEventListener("click", (event) => {
      const target = event.currentTarget.dataset.target;
      showPanel(target);
      scrollToContent();
    });
  });
}

// Fake-submit the contact form and show a friendly acknowledgement.
function wireContactForm() {
  if (!contactForm) return;
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get("name") || "Friend";
    contactForm.reset();
    const button = contactForm.querySelector("button[type='submit']");
    const defaultLabel = "Send message";
    button.textContent = `Thanks, ${name}!`;
    button.disabled = true;
    setTimeout(() => {
      button.textContent = defaultLabel;
      button.disabled = false;
    }, 1800);
  });
}

// Kick everything off once the DOM is ready.
function init() {
  showPanel(state.activePanel);
  hydrateYear();
  wireNavigation();
  wireContactForm();
  fadeWelcomeOverlay();
  observeTimelineCards();
  wireLanguageSwitcher(); // Enable language switching
  updateTranslations(currentLang); // Set initial language
}

function fadeWelcomeOverlay() {
  if (!welcomeOverlay) return;
  welcomeOverlay.addEventListener("animationend", () => {
    welcomeOverlay.classList.add("is-hidden");
  });
}

function observeTimelineCards() {
  if (!timelineCards.length) return;

  // Start all cards hidden; they'll reveal sequentially.
  timelineCards.forEach((card) => {
    card.classList.remove("is-visible");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Reveal this card and all preceding cards in order.
          const index = [...timelineCards].indexOf(entry.target);
          timelineCards.forEach((card, i) => {
            if (i <= index) {
              // Stagger reveal with delay based on position.
              setTimeout(() => {
                card.classList.add("is-visible");
              }, i * 150);
            }
          });
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
  );

  timelineCards.forEach((card) => observer.observe(card));

  attachTimelineCardInteractions();
}

function attachTimelineCardInteractions() {
  timelineCards.forEach((card) => {
    if (card.dataset.timelineInteractive === "true") return;
    card.dataset.timelineInteractive = "true";

    const handleEnter = () => {
      if (!card.classList.contains("is-visible")) return;
      highlightTimelineCard(card);
    };

    const handleLeave = (event) => {
      const nextTarget = event.relatedTarget?.closest?.("[data-timeline-card]");
      if (nextTarget) return;
      clearTimelineHighlight();
    };

    card.addEventListener("pointerenter", handleEnter);
    card.addEventListener("focus", handleEnter);
    card.addEventListener("pointerleave", handleLeave);
    card.addEventListener("blur", clearTimelineHighlight);
  });
}

function highlightTimelineCard(card) {
  timelineCards.forEach((item) => {
    item.classList.toggle("timeline-card--glow", item === card);
  });
}

function clearTimelineHighlight() {
  timelineCards.forEach((item) => {
    item.classList.remove("timeline-card--glow");
  });
}

function scrollToContent() {
  if (!app) return;
  const header = document.querySelector(".site-header");
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const buffer = 24;
  const offset = headerHeight + buffer;
  const target = app.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({
    top: Math.max(target, 0),
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", init);
