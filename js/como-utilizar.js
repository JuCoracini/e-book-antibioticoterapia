/* =========================
   COMO UTILIZAR ESTE E-BOOK
   Navegação por teclado
   ========================= */

(function initGuidePageNavigation() {

  const previousLink = document.querySelector(
    "[data-guide-prev]"
  );

  const nextLink = document.querySelector(
    "[data-guide-next]"
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