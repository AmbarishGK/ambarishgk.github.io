// Shared behavior: theme toggle, mobile nav, footer year.
// Keep this lightweight to preserve performance.

(function () {
  function setupThemeToggle() {
    var toggle = document.getElementById("themeToggle");
    if (!toggle) return;

    function setTheme(mode) {
      document.documentElement.setAttribute("data-theme", mode);
      try {
        localStorage.setItem("theme", mode);
      } catch (_) {}
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

    toggle.addEventListener(
      "click",
      function () {
        var current =
          document.documentElement.getAttribute("data-theme") || "light";
        setTheme(current === "light" ? "dark" : "light");
      },
      { passive: true }
    );
  }

  function setupMobileNav() {
    var btn = document.querySelector(".menu-toggle");
    var nav = document.getElementById("nav");
    if (!btn || !nav) return;

    btn.addEventListener(
      "click",
      function () {
        var open = nav.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      },
      { passive: true }
    );
  }

  function setCurrentYear() {
    var el = document.getElementById("year");
    if (!el) return;
    el.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupThemeToggle();
    setupMobileNav();
    setCurrentYear();
  });
})();
