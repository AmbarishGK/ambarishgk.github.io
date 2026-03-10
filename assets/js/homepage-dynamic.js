// Homepage dynamic features:
// 1. Typing animation for the hero section
// 2. Auto-load Latest content from Medium RSS + YouTube RSS
// 3. Update stats bar counts

(function () {
    // ─── Typing Animation ───
    var roles = [
        "real-world robotic systems",
        "autonomous navigation pipelines",
        "sensor fusion with LiDAR",
        "AI models that run on edge devices",
        "open-source robotics tools",
        "teaching videos and tutorials"
    ];
    var typedEl = document.getElementById("typed-text");
    if (typedEl) {
        var roleIndex = 0;
        var charIndex = 0;
        var deleting = false;
        var pauseMs = 0;

        function typeLoop() {
            var current = roles[roleIndex];
            if (!deleting) {
                typedEl.textContent = current.slice(0, charIndex + 1);
                charIndex++;
                if (charIndex >= current.length) {
                    deleting = true;
                    pauseMs = 1800;
                } else {
                    pauseMs = 50 + Math.random() * 40;
                }
            } else {
                typedEl.textContent = current.slice(0, charIndex);
                charIndex--;
                if (charIndex < 0) {
                    deleting = false;
                    charIndex = 0;
                    roleIndex = (roleIndex + 1) % roles.length;
                    pauseMs = 400;
                } else {
                    pauseMs = 30;
                }
            }
            setTimeout(typeLoop, pauseMs);
        }
        typeLoop();
    }

    // ─── Auto-load Latest content ───
    var MEDIUM_USER = "Ambarishgk";
    var YT_CHANNEL_ID = "UCQiE2vnqJeYAbxBm4FiVrNw"; // AmbarishGK channel ID
    var FEED_URL = "https://medium.com/feed/@" + MEDIUM_USER;
    var MEDIUM_PROXIES = [
        "https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(FEED_URL),
        "https://corsproxy.io/?" + encodeURIComponent(FEED_URL)
    ];
    var YT_RSS = "https://corsproxy.io/?" + encodeURIComponent(
        "https://www.youtube.com/feeds/videos.xml?channel_id=" + YT_CHANNEL_ID
    );

    function escapeHtml(s) {
        return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }
    function stripHtml(h) {
        var d = document.createElement("div"); d.innerHTML = h; return (d.textContent || "").trim();
    }
    function formatDate(ds) {
        var d = new Date(ds); return isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }

    function buildLatestCard(icon, label, title, desc, url) {
        return '<a class="latest-card" href="' + escapeHtml(url) + '" target="_blank" rel="noopener">' +
            '<div class="card-label">' + icon + " " + escapeHtml(label) + "</div>" +
            "<h3>" + escapeHtml(title) + "</h3>" +
            "<p>" + escapeHtml(desc) + "</p></a>";
    }

    // Collect results and render when ready
    var latestArticle = null;
    var latestVideo = null;
    var readyCount = 0;
    var totalFeeds = 2;

    function checkAndRender() {
        readyCount++;
        if (readyCount < totalFeeds) return;
        var container = document.getElementById("auto-latest");
        if (!container) return;

        var cards = [];

        if (latestVideo) {
            cards.push(buildLatestCard("📹", "New Video", latestVideo.title, latestVideo.desc, latestVideo.url));
        }
        if (latestArticle) {
            cards.push(buildLatestCard("📝", "New Article", latestArticle.title, latestArticle.desc, latestArticle.url));
        }

        // Always add a project card from projects data
        if (window.PROJECTS && window.PROJECTS.length > 0) {
            var proj = window.PROJECTS.find(function (p) { return p.featured && !p.featuredOnly; }) || window.PROJECTS[0];
            cards.push(buildLatestCard("🔬", "Latest Project", proj.title, proj.description || "",
                proj.github || "portfolio.html"));
        }

        if (cards.length === 0) {
            // Fallback static cards
            cards.push(buildLatestCard("📹", "Latest Video", "Robotic Oximeter Placement",
                "Imitation learning with VLMs to control a robotic arm.", "videos.html"));
            cards.push(buildLatestCard("📝", "Latest Article", "Read on Medium",
                "Sharing insights on robotics, AI, and engineering.", "https://medium.com/@" + MEDIUM_USER));
            cards.push(buildLatestCard("🔬", "Latest Project", "Multi-Modal Sensor Fusion",
                "LiDAR + stereo cameras for real-time 3D mapping.", "portfolio.html"));
        }

        container.innerHTML = cards.join("");
    }

    // Fetch Medium articles
    function fetchMediumLatest() {
        fetch(MEDIUM_PROXIES[0])
            .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
            .then(function (data) {
                if (data.status === "ok" && data.items && data.items.length > 0) {
                    var a = data.items[0];
                    latestArticle = {
                        title: a.title,
                        desc: stripHtml(a.description || "").slice(0, 120),
                        url: a.link
                    };
                    // Update article count
                    var statEl = document.getElementById("stat-articles");
                    if (statEl) statEl.textContent = data.items.length + "+";
                }
                checkAndRender();
            })
            .catch(function () {
                // Try CORS proxy
                fetch(MEDIUM_PROXIES[1])
                    .then(function (r) { if (!r.ok) throw new Error(); return r.text(); })
                    .then(function (text) {
                        var parser = new DOMParser();
                        var xml = parser.parseFromString(text, "text/xml");
                        var items = xml.querySelectorAll("item");
                        if (items.length > 0) {
                            var first = items[0];
                            latestArticle = {
                                title: (first.querySelector("title") || {}).textContent || "Read on Medium",
                                desc: stripHtml((first.querySelector("description") || {}).textContent || "").slice(0, 120),
                                url: (first.querySelector("link") || {}).textContent || "https://medium.com/@" + MEDIUM_USER
                            };
                            var statEl = document.getElementById("stat-articles");
                            if (statEl) statEl.textContent = items.length + "+";
                        }
                        checkAndRender();
                    })
                    .catch(function () { checkAndRender(); });
            });
    }

    // Fetch YouTube latest
    function fetchYTLatest() {
        fetch(YT_RSS)
            .then(function (r) { if (!r.ok) throw new Error(); return r.text(); })
            .then(function (text) {
                var parser = new DOMParser();
                var xml = parser.parseFromString(text, "text/xml");
                var entries = xml.querySelectorAll("entry");
                if (entries.length > 0) {
                    var first = entries[0];
                    var ns = "http://search.yahoo.com/mrss/";
                    var title = (first.querySelector("title") || {}).textContent || "";
                    var videoId = (first.querySelector("videoId") || {}).textContent || "";
                    var descEl = first.getElementsByTagNameNS(ns, "description");
                    var desc = descEl.length > 0 ? descEl[0].textContent || "" : "";
                    latestVideo = {
                        title: title,
                        desc: desc.slice(0, 120),
                        url: "https://www.youtube.com/watch?v=" + videoId
                    };
                    // Update video count
                    var statEl = document.getElementById("stat-videos");
                    if (statEl) statEl.textContent = entries.length;
                }
                checkAndRender();
            })
            .catch(function () { checkAndRender(); });
    }

    // Update project count from data
    function updateProjectCount() {
        if (window.PROJECTS) {
            var statEl = document.getElementById("stat-projects");
            if (statEl) statEl.textContent = window.PROJECTS.filter(function (p) { return !p.featuredOnly; }).length;
        }
    }

    // Fetch YouTube subscriber count
    // Tries free third-party APIs, then falls back to a hardcoded value.
    // UPDATE THE FALLBACK below periodically to keep it accurate.
    var YT_SUB_FALLBACK = "118"; // ← Update this number when your subs grow!

    function fetchYTSubscribers() {
        var subEl = document.getElementById("stat-subscribers");
        if (!subEl) return;

        // Try Mixerno API first (free, no key needed)
        fetch("https://mixerno.space/api/youtube-channel-counter/current/" + YT_CHANNEL_ID)
            .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
            .then(function (data) {
                // Mixerno returns counts array, first item is usually subscribers
                if (data && data.counts && data.counts.length > 0) {
                    var subs = data.counts[0].count;
                    subEl.textContent = formatSubCount(subs);
                } else { throw new Error(); }
            })
            .catch(function () {
                // Try SocialCounts API
                fetch("https://api.socialcounts.org/youtube-live-subscriber-count/" + YT_CHANNEL_ID)
                    .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
                    .then(function (data) {
                        if (data && data.est_sub) {
                            subEl.textContent = formatSubCount(data.est_sub);
                        } else { throw new Error(); }
                    })
                    .catch(function () {
                        // Fallback to hardcoded value
                        subEl.textContent = YT_SUB_FALLBACK;
                    });
            });
    }

    function formatSubCount(n) {
        n = parseInt(n, 10);
        if (isNaN(n)) return YT_SUB_FALLBACK;
        if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
        if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
        return String(n);
    }

    document.addEventListener("DOMContentLoaded", function () {
        updateProjectCount();
        fetchMediumLatest();
        fetchYTLatest();
        fetchYTSubscribers();
    });
})();
