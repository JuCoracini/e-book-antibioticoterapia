/* =========================
   APRESENTAÇÃO
   Navegação por teclado
   ========================= */

(function initPresentationNavigation() {

  const previousLink = document.querySelector(
    "[data-presentation-prev]"
  );

  const nextLink = document.querySelector(
    "[data-presentation-next]"
  );

  document.addEventListener("keydown", function (event) {

    const activeElement = document.activeElement;

    const isTyping =
      activeElement &&
      (
        activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.tagName === "SELECT"
      );

    if (isTyping) return;

    if (
      event.key === "ArrowLeft" &&
      previousLink
    ) {
      event.preventDefault();

      window.location.href =
        previousLink.getAttribute("href");
    }

    if (
      event.key === "ArrowRight" &&
      nextLink
    ) {
      event.preventDefault();

      window.location.href =
        nextLink.getAttribute("href");
    }

  });

})();