/* =========================
   FOLHA DE ROSTO
   Navegação por teclado
   ========================= */

(function initTitlePageNavigation() {

  const previousLink = document.querySelector(
    "[data-title-prev]"
  );

  const nextLink = document.querySelector(
    "[data-title-next]"
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
      window.location.href =
        previousLink.getAttribute("href");
    }

    if (
      event.key === "ArrowRight" &&
      nextLink
    ) {
      window.location.href =
        nextLink.getAttribute("href");
    }

  });

})();