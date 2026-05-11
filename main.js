const topbar = document.querySelector(".topbar");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("main section[id]"));
const revealNodes = document.querySelectorAll(".reveal");

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("is-active", isMatch);
  });
};

const updateScrollState = () => {
  const scrollY = window.scrollY;
  topbar.classList.toggle("is-scrolled", scrollY > 24);

  let currentId = sections[0]?.id ?? "home";

  sections.forEach((section) => {
    const start = section.offsetTop - window.innerHeight * 0.3;
    if (scrollY >= start) {
      currentId = section.id;
    }
  });

  setActiveLink(currentId);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  },
);

revealNodes.forEach((node) => revealObserver.observe(node));

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const id = link.getAttribute("href")?.replace("#", "");
    if (id) {
      setActiveLink(id);
    }
  });
});

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);

updateScrollState();
