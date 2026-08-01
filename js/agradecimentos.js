/* =========================
   AGRADECIMENTOS
   Navegação por teclado
   ========================= */

(function initThanksNavigation() {

  const previousLink = document.querySelector(
    "[data-thanks-prev]"
  );

  const nextLink = document.querySelector(
    "[data-thanks-next]"
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