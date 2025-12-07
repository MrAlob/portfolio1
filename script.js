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
      app.scrollIntoView({ behavior: "smooth" });
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

document.addEventListener("DOMContentLoaded", init);
