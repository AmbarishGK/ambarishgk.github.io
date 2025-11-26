// Render projects and videos from window.PROJECTS into the Home and Portfolio grids.
// This keeps HTML light and makes it easy to add new work.

(function () {
  if (!window.PROJECTS || !Array.isArray(window.PROJECTS)) return;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function renderProjects(containerId, filterFn) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var items = window.PROJECTS.slice();
    if (typeof filterFn === "function") {
      items = items.filter(filterFn);
    }

    items.sort(function (a, b) {
      var ao = a.order || 0;
      var bo = b.order || 0;
      return ao - bo;
    });

    container.innerHTML = items
      .map(function (p) {
        var techLine = Array.isArray(p.tech) ? p.tech.join(" · ") : "";
        var hasVideo = !!p.youtubeId;
        var isShort = p.type === "short";

        var youtubeTag = hasVideo
          ? '<lite-youtube videoid="' +
            escapeHtml(p.youtubeId) +
            '" params="modestbranding=1&rel=0&playsinline=1"' +
            (isShort ? ' class="vertical"' : "") +
            "></lite-youtube>"
          : "";

        return (
          '<article class="card">' +
          "<h3>" + escapeHtml(p.title) + "</h3>" +
          youtubeTag +
          (p.description
            ? "<p>" + escapeHtml(p.description) + "</p>"
            : "") +
          (techLine ? '<p class="tech">' + escapeHtml(techLine) + "</p>" : "") +
          "</article>"
        );
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("featured-projects")) {
      renderProjects("featured-projects", function (p) {
        return !!p.featured;
      });
    }

    if (document.getElementById("all-projects")) {
      renderProjects("all-projects", function (p) {
        // Show everything except items marked as Home-only.
        return !p.featuredOnly;
      });
    }
  });
})();
