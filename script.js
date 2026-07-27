const header = document.querySelector("[data-header]");
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#site-nav");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 30);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("open", !open);
});

nav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("[data-year]").textContent = new Date().getFullYear();

const faqTabs = [...document.querySelectorAll("[data-faq-filter]")];
const faqItems = [...document.querySelectorAll("[data-faq-category]")];

faqTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.faqFilter;

    faqTabs.forEach((item) => {
      item.setAttribute("aria-selected", String(item === tab));
    });

    faqItems.forEach((item) => {
      const visible = filter === "all" || item.dataset.faqCategory === filter;
      item.hidden = !visible;
      if (!visible) item.open = false;
    });
  });
});

if (reducedMotion) {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
}
