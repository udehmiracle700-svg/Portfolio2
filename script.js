const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";

  // Force a solid black menu panel when opened (not transparent).
  if (isOpen && window.matchMedia("(max-width: 760px)").matches) {
    Object.assign(nav.style, {
      position: "fixed",
      top: "72px",
      right: "0",
      bottom: "0",
      left: "0",
      width: "100vw",
      height: "calc(100dvh - 72px)",
      backgroundColor: "#000",
      backgroundImage: "none",
      opacity: "1",
      zIndex: "10001"
    });
  } else {
    ["position", "top", "right", "bottom", "left", "width", "height", "backgroundColor", "backgroundImage", "opacity", "zIndex"].forEach(prop => nav.style.removeProperty(prop.replace(/[A-Z]/g, m => "-" + m.toLowerCase())));
  }
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

// Reveal sections and cards smoothly as they enter the screen.
const revealItems = document.querySelectorAll(
  ".section-label, .about-grid, .skill-card, .tool-strip, .section-heading, .project-card, .process-grid > div, .contact-panel, .stats > div"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  if (item.matches(".skill-card, .process-grid > div, .stats > div")) {
    item.classList.add(`reveal-delay-${(index % 3) + 1}`);
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}
