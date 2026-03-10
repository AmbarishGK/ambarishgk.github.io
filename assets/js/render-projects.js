// Render projects from window.PROJECTS into the Home and Portfolio grids.
// Supports: YouTube embeds (video + shorts), GitHub links, and extra links (blog posts, papers, demos).

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

  var ghIconSvg =
    '<svg class="gh-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34 .73-4.04-1.61-4.04-1.61-.55-1.41-1.35-1.78-1.35-1.78-1.1-.75 .08-.74 .08-.74 1.22 .09 1.86 1.26 1.86 1.26 1.08 1.85 2.83 1.32 3.52 1.01 .11-.79 .42-1.32 .76-1.63-2.67-.3-5.48-1.34-5.48-5.95 0-1.31 .47-2.38 1.24-3.22-.12-.3-.54-1.52 .12-3.16 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23 .66 1.64 .24 2.86 .12 3.16 .78 .84 1.24 1.91 1.24 3.22 0 4.62-2.82 5.65-5.5 5.95 .43 .37 .81 1.1 .81 2.22v3.29c0 .32 .21 .7 .82 .58A12 12 0 0 0 12 .5z"/></svg>';

  var linkIconSvg =
    '<svg class="gh-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.78 3.653a3.936 3.936 0 1 1 5.567 5.567l-3.627 3.627a3.936 3.936 0 0 1-5.88-.353.75.75 0 0 0-1.18.928 5.436 5.436 0 0 0 8.12.486l3.628-3.628a5.436 5.436 0 1 0-7.688-7.688l-3 3a.75.75 0 1 0 1.06 1.061l3-3Z"/><path d="M7.28 11.153a3.936 3.936 0 0 1 5.88.353.75.75 0 0 0 1.18-.928 5.436 5.436 0 0 0-8.12-.486L2.592 13.72a5.436 5.436 0 1 0 7.688 7.688l3-3a.75.75 0 1 0-1.06-1.06l-3 3a3.936 3.936 0 0 1-5.567-5.568l3.627-3.627Z"/></svg>';

  function renderProjects(containerId, filterFn) {
    var container = document.getElementById(containerId);
    if (!container) return;

    var items = window.PROJECTS.slice();
    if (typeof filterFn === "function") {
      items = items.filter(filterFn);
    }

    items.sort(function (a, b) {
      return (a.order || 0) - (b.order || 0);
    });

    container.innerHTML = items
      .map(function (p) {
        var techLine = Array.isArray(p.tech) ? p.tech.join(" · ") : "";
        var hasVideo = !!p.youtubeId;
        // type "short" gets vertical aspect ratio automatically
        var isShort = p.type === "short";

        var youtubeTag = hasVideo
          ? '<lite-youtube videoid="' +
          escapeHtml(p.youtubeId) +
          '" params="modestbranding=1&rel=0&playsinline=1"' +
          (isShort ? ' class="vertical"' : "") +
          "></lite-youtube>"
          : "";

        // Build links section: GitHub + any extra links
        var linkItems = [];

        if (p.github) {
          linkItems.push(
            '<a href="' + escapeHtml(p.github) +
            '" target="_blank" rel="noopener">' +
            ghIconSvg + " Source</a>"
          );
        }

        if (Array.isArray(p.links)) {
          p.links.forEach(function (lnk) {
            if (lnk && lnk.url && lnk.label) {
              linkItems.push(
                '<a href="' + escapeHtml(lnk.url) +
                '" target="_blank" rel="noopener">' +
                linkIconSvg + " " + escapeHtml(lnk.label) + "</a>"
              );
            }
          });
        }

        var linksHtml = linkItems.length > 0
          ? '<div class="card-links">' + linkItems.join("") + "</div>"
          : "";

        return (
          '<article class="card">' +
          "<h3>" + escapeHtml(p.title) + "</h3>" +
          youtubeTag +
          (p.description ? "<p>" + escapeHtml(p.description) + "</p>" : "") +
          (techLine ? '<p class="tech">' + escapeHtml(techLine) + "</p>" : "") +
          linksHtml +
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
        return !p.featuredOnly;
      });
    }
  });
})();
