// Lightweight YouTube facade: loads iframe only on click for performance.

(function () {
  class LiteYouTube extends HTMLElement {
    connectedCallback() {
      const id = this.getAttribute("videoid");
      if (!id) return;
      const params = this.getAttribute("params") || "";
      const poster = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
      const isVertical = this.classList.contains("vertical");

      this.innerHTML =
        '<div class="lyt ' + (isVertical ? "vertical" : "") + '" part="button">' +
        '<img src="' +
        poster +
        '" alt="YouTube poster" loading="lazy" decoding="async">' +
        '<button aria-label="Play video"></button>' +
        "</div>";

      const wrapper = this.querySelector(".lyt");
      if (!wrapper) return;

      wrapper.addEventListener(
        "click",
        () => {
          const src =
            "https://www.youtube-nocookie.com/embed/" +
            encodeURIComponent(id) +
            "?autoplay=1&playsinline=1" +
            (params ? "&" + params : "");
          this.innerHTML =
            '<iframe title="YouTube video" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy" src="' +
            src +
            '"></iframe>';
        },
        { passive: true }
      );
    }
  }

  if (!customElements.get("lite-youtube")) {
    customElements.define("lite-youtube", LiteYouTube);
  }
})();
