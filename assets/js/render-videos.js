// Render videos from window.VIDEOS into the Videos page with category filtering.

(function () {
    if (!window.VIDEOS || !Array.isArray(window.VIDEOS)) return;

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function getCategories() {
        var cats = {};
        window.VIDEOS.forEach(function (v) { if (v.category) cats[v.category] = true; });
        return Object.keys(cats);
    }

    function renderVideos(containerId, category) {
        var container = document.getElementById(containerId);
        if (!container) return;

        var items = window.VIDEOS.slice();
        if (category && category !== "All") {
            items = items.filter(function (v) { return v.category === category; });
        }

        container.innerHTML = items
            .map(function (v) {
                var isShort = v.type === "short";
                return (
                    '<article class="video-card">' +
                    '<lite-youtube videoid="' + escapeHtml(v.youtubeId) +
                    '" params="modestbranding=1&rel=0&playsinline=1"' +
                    (isShort ? ' class="vertical"' : "") +
                    "></lite-youtube>" +
                    '<div class="video-card-body">' +
                    '<span class="video-card-category">' + escapeHtml(v.category || "") + "</span>" +
                    "<h3>" + escapeHtml(v.title) + "</h3>" +
                    (v.description ? "<p>" + escapeHtml(v.description) + "</p>" : "") +
                    "</div></article>"
                );
            })
            .join("");
    }

    function setupFilters(filterContainerId, videoContainerId) {
        var filterContainer = document.getElementById(filterContainerId);
        if (!filterContainer) return;

        var cats = ["All"].concat(getCategories());
        filterContainer.innerHTML = cats
            .map(function (cat, i) {
                return (
                    '<button data-cat="' + escapeHtml(cat) + '"' +
                    (i === 0 ? ' class="active"' : "") +
                    ">" + escapeHtml(cat) + "</button>"
                );
            })
            .join("");

        filterContainer.addEventListener("click", function (e) {
            var btn = e.target.closest("button");
            if (!btn) return;
            filterContainer.querySelectorAll("button").forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            renderVideos(videoContainerId, btn.getAttribute("data-cat"));
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (document.getElementById("video-grid")) {
            setupFilters("video-filters", "video-grid");
            renderVideos("video-grid", "All");
        }
    });
})();
