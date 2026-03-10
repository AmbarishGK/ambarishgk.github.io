// Enhancements: page transitions, keyboard navigation, reading time, RSS icon, GitHub stats theme switching
(function () {

    // ─── Page Transition Animation ───
    // Smooth fade when navigating between pages
    var transition = document.getElementById('page-transition');
    if (transition) {
        // On page load, remove any active transition
        window.addEventListener('pageshow', function () {
            transition.classList.remove('active');
        });

        // Intercept internal link clicks
        document.addEventListener('click', function (e) {
            var link = e.target.closest('a');
            if (!link) return;
            var href = link.getAttribute('href');
            // Only transition for internal links (not mailto, external, anchors)
            if (!href || href.startsWith('mailto:') || href.startsWith('http') || href.startsWith('#') || link.target === '_blank') return;
            e.preventDefault();
            transition.classList.add('active');
            setTimeout(function () { window.location.href = href; }, 300);
        });
    }

    // ─── Keyboard Navigation ───
    // Press 1-5 to jump to pages, ? to show help
    var NAV_KEYS = {
        '1': '/',
        '2': 'portfolio.html',
        '3': 'blog.html',
        '4': 'videos.html',
        '5': 'about.html'
    };

    document.addEventListener('keydown', function (e) {
        // Don't trigger in inputs, textareas, or contenteditable
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;
        // Don't trigger with modifier keys
        if (e.ctrlKey || e.metaKey || e.altKey) return;

        var key = e.key;

        // Navigation keys
        if (NAV_KEYS[key]) {
            e.preventDefault();
            window.location.href = NAV_KEYS[key];
            return;
        }

        // ? to show keyboard shortcuts
        if (key === '?') {
            e.preventDefault();
            toggleKeyboardHelp();
            return;
        }

        // Escape to close keyboard help
        if (key === 'Escape') {
            var help = document.getElementById('kb-help');
            if (help) help.remove();
        }
    });

    function toggleKeyboardHelp() {
        var existing = document.getElementById('kb-help');
        if (existing) { existing.remove(); return; }

        var overlay = document.createElement('div');
        overlay.id = 'kb-help';
        overlay.className = 'kb-help-overlay';
        overlay.innerHTML =
            '<div class="kb-help-modal">' +
            '<h3>Keyboard Shortcuts</h3>' +
            '<div class="kb-row"><kbd>1</kbd> Home</div>' +
            '<div class="kb-row"><kbd>2</kbd> Projects</div>' +
            '<div class="kb-row"><kbd>3</kbd> Blog</div>' +
            '<div class="kb-row"><kbd>4</kbd> Videos</div>' +
            '<div class="kb-row"><kbd>5</kbd> About</div>' +
            '<div class="kb-row"><kbd>?</kbd> Toggle this help</div>' +
            '<div class="kb-row"><kbd>Esc</kbd> Close</div>' +
            '<p class="kb-hint">Press Esc or ? to close</p>' +
            '</div>';
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) overlay.remove();
        });
        document.body.appendChild(overlay);
    }

    // ─── GitHub Stats Theme Switching ───
    // Show light/dark stats images based on theme
    function updateGHStatsTheme() {
        var theme = document.documentElement.getAttribute('data-theme');
        var lightImgs = document.querySelectorAll('.gh-light-only');
        var darkImgs = document.querySelectorAll('.gh-dark-only');

        lightImgs.forEach(function (img) {
            img.style.display = theme === 'dark' ? 'none' : 'block';
        });
        darkImgs.forEach(function (img) {
            img.style.display = theme === 'dark' ? 'block' : 'none';
        });
    }

    // Run on load and watch for theme changes
    if (document.querySelector('.gh-light-only')) {
        updateGHStatsTheme();
        // Watch for theme attribute changes
        var observer = new MutationObserver(function () { updateGHStatsTheme(); });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    // ─── Open to Work Banner ───
    var otwBanner = document.querySelector('.otw-banner');
    if (otwBanner) {
        var isActive = otwBanner.getAttribute('data-active') === 'true';
        otwBanner.style.display = isActive ? 'flex' : 'none';
    }

    // ─── Reading Time on Blog Cards ───
    // Adds reading time badge to blog cards when they are rendered
    function addReadingTime() {
        var cards = document.querySelectorAll('.blog-card');
        cards.forEach(function (card) {
            // Already has a reading time badge
            if (card.querySelector('.reading-time')) return;
            var bodyEl = card.querySelector('.blog-card-body p');
            if (!bodyEl) return;
            var text = bodyEl.textContent || '';
            // Estimate ~200 words per minute; full article is ~5x the excerpt
            var words = text.split(/\s+/).length * 5;
            var mins = Math.max(1, Math.round(words / 200));
            var badge = document.createElement('span');
            badge.className = 'reading-time';
            badge.textContent = mins + ' min read';
            var meta = card.querySelector('.blog-card-meta');
            if (meta) {
                meta.appendChild(document.createTextNode(' · '));
                meta.appendChild(badge);
            }
        });
    }

    // Watch for blog cards being added to the DOM
    var blogGrid = document.querySelector('.blog-grid');
    if (blogGrid) {
        var blogObserver = new MutationObserver(function () { addReadingTime(); });
        blogObserver.observe(blogGrid, { childList: true, subtree: true });
        // Also try on load
        addReadingTime();
    }

    // ─── On DOMContentLoaded ───
    document.addEventListener('DOMContentLoaded', function () {
        addReadingTime();
    });

})();
