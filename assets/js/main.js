// Shared behavior: theme toggle, mobile nav, footer year, loading screen, scroll fade.
// Keep this lightweight to preserve performance.

(function () {
  // ---- Loading Screen ----
  function dismissLoader() {
    var loader = document.getElementById("loader");
    if (loader) loader.classList.add("hidden");
  }

  // ---- Theme Toggle ----
  function setupThemeToggle() {
    var toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    function setTheme(mode) {
      document.documentElement.setAttribute("data-theme", mode);
      try { localStorage.setItem("theme", mode); } catch (_) { }
      toggle.textContent = mode === "dark" ? "🌙" : "🌞";
      toggle.setAttribute(
        "aria-label",
        mode === "dark"
          ? "Current theme: Dark. Switch to light"
          : "Current theme: Light. Switch to dark"
      );
    }

    var cur = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(cur);

    toggle.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(current === "light" ? "dark" : "light");
    }, { passive: true });
  }

  // ---- Mobile Nav ----
  function setupMobileNav() {
    var btn = document.querySelector(".menu-toggle");
    var nav = document.getElementById("nav");
    if (!btn || !nav) return;

    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }, { passive: true });
  }

  // ---- Footer Year ----
  function setCurrentYear() {
    var el = document.getElementById("year");
    if (!el) return;
    el.textContent = String(new Date().getFullYear());
  }

  // ---- Scroll Fade-In ----
  function setupScrollFade() {
    var targets = document.querySelectorAll(".fade-up");
    if (!targets.length) return;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      targets.forEach(function (el) { observer.observe(el); });
    } else {
      // Fallback: just show everything
      targets.forEach(function (el) { el.classList.add("visible"); });
    }
  }

  // ---- Init ----
  document.addEventListener("DOMContentLoaded", function () {
    dismissLoader();
    setupThemeToggle();
    setupMobileNav();
    setCurrentYear();
    setupScrollFade();
  });
})();
