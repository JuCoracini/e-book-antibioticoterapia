/* =========================
   APP GLOBAL
   ========================= */

(function initGlobalLightbox() {
  if (!document.body) return;

  // Evita duplicação de lightbox
  if (document.querySelector(".lightbox")) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("aria-hidden", "true");

  lightbox.innerHTML = `
    <div class="lightbox__backdrop" data-lightbox-close></div>
    <div
      class="lightbox__dialog"
      role="dialog"
      aria-modal="true"
      aria-label="Imagem ampliada"
    >
      <button
        class="lightbox__close"
        type="button"
        aria-label="Fechar imagem ampliada"
        data-lightbox-close
      >
        ✕
      </button>
      <figure class="lightbox__figure">
        <img src="" alt="">
      </figure>
    </div>
  `;

  document.body.appendChild(lightbox);

  const image = lightbox.querySelector("img");
  const closeButton = lightbox.querySelector(".lightbox__close");

  let lastFocusedElement = null;
  let isOpen = false;

  function openLightbox(src, alt) {
    // 🔧 CORREÇÃO: sempre reinicia corretamente
    if (isOpen) {
      closeLightbox();
    }

    isOpen = true;

    lastFocusedElement = document.activeElement;

    image.src = src || "";
    image.alt = alt || "";

    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closeButton?.focus();
  }

  function closeLightbox() {
    if (!isOpen) return;

    isOpen = false;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");

    image.src = "";
    image.alt = "";

    document.body.style.overflow = "";

    lastFocusedElement?.focus?.();
  }

  document.addEventListener("click", function (event) {
    const trigger = event.target.closest("[data-zoom]");

    if (trigger) {
      const nestedImage = trigger.matches("img")
        ? trigger
        : trigger.querySelector("img");

      const src =
        trigger.getAttribute("data-zoom") ||
        nestedImage?.getAttribute("src") ||
        "";

      const alt =
        trigger.getAttribute("alt") ||
        nestedImage?.getAttribute("alt") ||
        "";

      openLightbox(src, alt);
      return;
    }

    if (event.target.closest("[data-lightbox-close]")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen) {
      closeLightbox();
    }
  });

  // 🔧 CORREÇÃO CRÍTICA: garante reset ao sair da página
  window.addEventListener("beforeunload", function () {
    closeLightbox();
  });

})();

/* =========================
   PAGINAÇÃO GLOBAL
   ========================= */

document.addEventListener("click", function (event) {

  const next = event.target.closest("[data-next]");
  if (next && !next.hasAttribute("disabled")) {
    event.preventDefault();

    fecharLightboxSeAberto();

    const url = next.getAttribute("data-next");
    if (url) window.location.href = url;
    return;
  }

  const prev = event.target.closest("[data-prev]");
  if (prev && !prev.hasAttribute("disabled")) {
    event.preventDefault();

    fecharLightboxSeAberto();

    const url = prev.getAttribute("data-prev");
    if (url) window.location.href = url;
  }

});

/* =========================
   UTILITÁRIO GLOBAL
   ========================= */

const AppUtils = {
  fecharLightboxSeAberto(){
    const lightbox = document.querySelector(".lightbox");
    if (!lightbox) return;

    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");

    const img = lightbox.querySelector("img");
    if (img) {
      img.src = "";
      img.alt = "";
    }

    document.body.style.overflow = "";
  }
};
/* =========================
   IR PARA PÁGINA + SUMÁRIO
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

  const TOTAL_PAGES = 89;

  const CHAPTERS = [
    { chapter: 1, start: 1, end: 10 },
    { chapter: 2, start: 11, end: 19 },
    { chapter: 3, start: 20, end: 29 },
    { chapter: 4, start: 30, end: 38 },
    { chapter: 5, start: 39, end: 53 },
    { chapter: 6, start: 54, end: 61 },
    { chapter: 7, start: 62, end: 68 },
    { chapter: 8, start: 69, end: 75 },
    { chapter: 9, start: 76, end: 81 },
    { chapter: 10, start: 82, end: 89 }
  ];

  const caminhoAtual = window.location.href.replace(/\\/g, "/");

  const paginaEncontrada = caminhoAtual.match(
    /\/capitulo-\d+\/p(\d+)\.html/i
  );

  if (!paginaEncontrada) return;

  const centroDoRodape = document.querySelector(".pager .center");

  if (!centroDoRodape) return;

  if (centroDoRodape.querySelector(".page-jump")) return;

  const paginaAtual = parseInt(paginaEncontrada[1], 10);

  const navegacao = document.createElement("div");
  navegacao.className = "page-jump";

  navegacao.innerHTML = `
    <label class="page-jump__label" for="pageJumpInput">
      Ir para:
    </label>

    <input
      id="pageJumpInput"
      class="page-jump__input"
      type="number"
      min="1"
      max="${TOTAL_PAGES}"
      value="${paginaAtual}"
      aria-label="Número da página"
    >

    <button
      class="page-jump__button"
      type="button"
      aria-label="Ir para a página digitada"
    >
      Ir
    </button>

    <span class="page-jump__separator" aria-hidden="true">•</span>

    <a class="page-jump__summary" href="../sumario/p00.html">
      Sumário
    </a>
  `;

  const mensagem = document.createElement("div");
  mensagem.className = "page-jump__message";
  mensagem.setAttribute("aria-live", "polite");

  centroDoRodape.appendChild(navegacao);
  centroDoRodape.appendChild(mensagem);

  const campo = navegacao.querySelector(".page-jump__input");
  const botaoIr = navegacao.querySelector(".page-jump__button");

  function identificarCapitulo(numeroDaPagina) {
    return CHAPTERS.find(function (item) {
      return (
        numeroDaPagina >= item.start &&
        numeroDaPagina <= item.end
      );
    });
  }

  function montarEndereco(numeroDaPagina) {
    const capitulo = identificarCapitulo(numeroDaPagina);

    if (!capitulo) return null;

    const numeroCapitulo = String(capitulo.chapter).padStart(2, "0");
    const numeroPagina = String(numeroDaPagina).padStart(2, "0");

    return (
      "../capitulo-" +
      numeroCapitulo +
      "/p" +
      numeroPagina +
      ".html"
    );
  }

  function mostrarErro(texto) {
    mensagem.textContent = texto;

    setTimeout(function () {
      mensagem.textContent = "";
    }, 3000);
  }

  function irParaPagina() {
    const numeroDaPagina = Number(campo.value);

    if (
      !Number.isInteger(numeroDaPagina) ||
      numeroDaPagina < 1 ||
      numeroDaPagina > TOTAL_PAGES
    ) {
      mostrarErro("Digite uma página entre 1 e 89.");
      campo.focus();
      return;
    }

    const endereco = montarEndereco(numeroDaPagina);

    if (!endereco) {
      mostrarErro("Página não encontrada.");
      return;
    }

    window.location.href = endereco;
  }

  botaoIr.addEventListener("click", irParaPagina);

  campo.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter") {
      evento.preventDefault();
      irParaPagina();
    }
  });

  campo.addEventListener("focus", function () {
    campo.select();
  });

});
/* =========================
   CARREGAMENTO DA BUSCA GLOBAL
   ========================= */

document.addEventListener("DOMContentLoaded", function () {

  if (!document.querySelector('link[data-ebook-search-css]')) {
    const searchCss = document.createElement("link");

    searchCss.rel = "stylesheet";
    searchCss.href = "../../css/search.css";
    searchCss.setAttribute(
      "data-ebook-search-css",
      "true"
    );

    document.head.appendChild(searchCss);
  }

  if (!document.querySelector('script[data-ebook-search-js]')) {
    const searchScript = document.createElement("script");

    searchScript.src = "../../js/search.js";
    searchScript.defer = true;
    searchScript.setAttribute(
      "data-ebook-search-js",
      "true"
    );

    document.body.appendChild(searchScript);
  }

});