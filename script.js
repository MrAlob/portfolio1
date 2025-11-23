// Cache key DOM nodes that we interact with multiple times.
const app = document.querySelector("#app");
const panels = document.querySelectorAll("[data-panel]");
const navButtons = document.querySelectorAll("nav [data-target]");
const jumpButtons = document.querySelectorAll(".cta[data-target]");
const yearEl = document.querySelector("#year");
const contactForm = document.querySelector(".contact-form");

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
}

document.addEventListener("DOMContentLoaded", init);
