// Fetch Medium articles via RSS and render as blog cards.
// Uses corsproxy.io to bypass CORS since we're on a static site.
// Falls back to a direct Medium link if the feed can't be loaded.

(function () {
    var MEDIUM_USER = "Ambarishgk";
    // Try multiple CORS proxy options for reliability
    var FEED_URL = "https://medium.com/feed/@" + MEDIUM_USER;
    var PROXIES = [
        "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(FEED_URL),
        "https://corsproxy.io/?" + encodeURIComponent(FEED_URL)
    ];

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    function stripHtml(html) {
        var tmp = document.createElement("div");
        tmp.innerHTML = html;
        return (tmp.textContent || tmp.innerText || "").trim();
    }

    function formatDate(dateStr) {
        var d = new Date(dateStr);
        if (isNaN(d.getTime())) return "";
        return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    }

    function extractImage(content) {
        if (!content) return "";
        var match = content.match(/<img[^>]+src=["']([^"']+)["']/);
        return match ? match[1] : "";
    }

    function renderCards(container, items) {
        container.innerHTML = items
            .map(function (item) {
                var thumb = item.thumbnail || extractImage(item.content || item.description || "");
                var desc = stripHtml(item.description || item.content || "").slice(0, 160);
                var date = formatDate(item.pubDate);

                var imageHtml;
                if (thumb) {
                    imageHtml = '<img src="' + escapeHtml(thumb) + '" alt="' + escapeHtml(item.title) +
                        '" loading="lazy" decoding="async" onerror="this.outerHTML=\'<div class=blog-card-placeholder>📝</div>\'">';
                } else {
                    imageHtml = '<div class="blog-card-placeholder">📝</div>';
                }

                return (
                    '<article class="blog-card">' +
                    imageHtml +
                    '<div class="blog-card-body">' +
                    "<h3><a href=\"" + escapeHtml(item.link) + '" target="_blank" rel="noopener">' +
                    escapeHtml(item.title) +
                    "</a></h3>" +
                    "<p>" + escapeHtml(desc) + (desc.length >= 160 ? "..." : "") + "</p>" +
                    '<span class="blog-card-meta">' + escapeHtml(date) + "</span>" +
                    "</div></article>"
                );
            })
            .join("");
    }

    // Parse RSS XML into an array of items
    function parseRssXml(text) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(text, "text/xml");
        var items = xml.querySelectorAll("item");
        var results = [];
        items.forEach(function (item) {
            var title = (item.querySelector("title") || {}).textContent || "";
            var link = (item.querySelector("link") || {}).textContent || "";
            var desc = (item.querySelector("description") || {}).textContent || "";
            var content = (item.querySelector("content\\:encoded, encoded") || {}).textContent || "";
            var pubDate = (item.querySelector("pubDate") || {}).textContent || "";
            results.push({
                title: title,
                link: link,
                description: desc,
                content: content,
                pubDate: pubDate,
                thumbnail: extractImage(content || desc)
            });
        });
        return results;
    }

    function renderFallback(container) {
        container.innerHTML =
            '<div style="text-align:center;padding:2rem 1rem;color:#888;">' +
            "<p>Couldn't load articles right now.</p>" +
            '<p><a class="button" href="https://medium.com/@' +
            encodeURIComponent(MEDIUM_USER) +
            '" target="_blank" rel="noopener">Read on Medium →</a></p></div>';
    }

    // Try rss2json API first (returns JSON), then CORS proxy (returns XML)
    function fetchArticles(container) {
        fetch(PROXIES[0])
            .then(function (res) {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.json();
            })
            .then(function (data) {
                if (data.status === "ok" && data.items && data.items.length > 0) {
                    renderCards(container, data.items);
                } else {
                    throw new Error("No items");
                }
            })
            .catch(function () {
                // Fallback: try CORS proxy with raw XML
                fetch(PROXIES[1])
                    .then(function (res) {
                        if (!res.ok) throw new Error("HTTP " + res.status);
                        return res.text();
                    })
                    .then(function (text) {
                        var items = parseRssXml(text);
                        if (items.length > 0) {
                            renderCards(container, items);
                        } else {
                            renderFallback(container);
                        }
                    })
                    .catch(function () {
                        renderFallback(container);
                    });
            });
    }

    document.addEventListener("DOMContentLoaded", function () {
        var container = document.getElementById("blog-posts");
        if (!container) return;
        fetchArticles(container);
    });
})();
