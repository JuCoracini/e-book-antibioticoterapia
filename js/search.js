/* =========================
   BUSCA GLOBAL DO E-BOOK
   ========================= */

(function initEbookSearch() {

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

  const STORAGE_KEY = "ebookSearchSession";

  function normalizeText(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/β/g, "beta")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[‐-‒–—−-]+/g, " ")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getContentBase() {
    const path = window.location.pathname.replace(/\\/g, "/");
    const contentIndex = path.toLowerCase().indexOf("/content/");

    if (contentIndex >= 0) {
      return path.slice(0, contentIndex) + "/content";
    }

    return "/content";
  }

  function chapterForPage(pageNumber) {
    return CHAPTERS.find(function (item) {
      return pageNumber >= item.start && pageNumber <= item.end;
    });
  }

  function pageUrl(pageNumber) {
    const chapter = chapterForPage(pageNumber);

    if (!chapter) return null;

    const chapterNumber = String(chapter.chapter).padStart(2, "0");
    const pageFile = String(pageNumber).padStart(2, "0");

    return (
      getContentBase() +
      "/capitulo-" +
      chapterNumber +
      "/p" +
      pageFile +
      ".html"
    );
  }

  function createPagesList() {
    const pages = [];

    for (let page = 1; page <= TOTAL_PAGES; page += 1) {
      const chapter = chapterForPage(page);

      pages.push({
        page: page,
        chapter: chapter.chapter,
        url: pageUrl(page)
      });
    }

    return pages;
  }

  function createInterface() {
    if (document.querySelector(".ebook-search-button")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "ebook-search-button";
    button.innerHTML = "⌕ <span>Buscar</span>";
    button.setAttribute("aria-label", "Buscar no e-book");

    const panel = document.createElement("div");
    panel.className = "ebook-search-panel";
    panel.hidden = true;
    panel.setAttribute("aria-hidden", "true");

    panel.innerHTML = `
      <div class="ebook-search-panel__backdrop" data-search-close></div>

      <section
        class="ebook-search-panel__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ebookSearchTitle"
      >
        <header class="ebook-search-panel__header">
          <h2
            id="ebookSearchTitle"
            class="ebook-search-panel__title"
          >
            Buscar no e-book
          </h2>

          <button
            type="button"
            class="ebook-search-panel__close"
            data-search-close
            aria-label="Fechar busca"
          >
            ×
          </button>
        </header>

        <form class="ebook-search-form">
          <input
            type="search"
            class="ebook-search-input"
            placeholder="Ex.: β-lactâmicos, antibiograma, resistência..."
            autocomplete="off"
            aria-label="Digite uma palavra ou expressão"
          >

          <button
            type="submit"
            class="ebook-search-submit"
          >
            Buscar
          </button>
        </form>

        <p
          class="ebook-search-status"
          role="status"
          aria-live="polite"
        ></p>

        <div class="ebook-search-results"></div>
      </section>
    `;

    const navigation = document.createElement("div");
    navigation.className = "ebook-search-navigation";
    navigation.hidden = true;

    navigation.innerHTML = `
      <span class="ebook-search-navigation__term"></span>

      <span class="ebook-search-navigation__counter"></span>

      <button
        type="button"
        class="ebook-search-navigation__button"
        data-search-previous
        aria-label="Ocorrência anterior"
        title="Ocorrência anterior"
      >
        ‹
      </button>

      <button
        type="button"
        class="ebook-search-navigation__button"
        data-search-next
        aria-label="Próxima ocorrência"
        title="Próxima ocorrência"
      >
        ›
      </button>

      <button
        type="button"
        class="ebook-search-navigation__button"
        data-search-clear
        aria-label="Fechar resultados da busca"
        title="Fechar busca"
      >
        ×
      </button>
    `;

    document.body.append(button, panel, navigation);

    return {
      button: button,
      panel: panel,
      navigation: navigation,
      input: panel.querySelector(".ebook-search-input"),
      form: panel.querySelector(".ebook-search-form"),
      status: panel.querySelector(".ebook-search-status"),
      results: panel.querySelector(".ebook-search-results"),
      term: navigation.querySelector(
        ".ebook-search-navigation__term"
      ),
      counter: navigation.querySelector(
        ".ebook-search-navigation__counter"
      )
    };
  }

  const ui = createInterface();

  if (!ui) return;

  function openPanel() {
    ui.panel.hidden = false;
    ui.panel.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    window.setTimeout(function () {
      ui.input.focus();
      ui.input.select();
    }, 30);
  }

  function closePanel() {
    ui.panel.hidden = true;
    ui.panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  ui.button.addEventListener("click", openPanel);

  ui.panel.addEventListener("click", function (event) {
    if (event.target.closest("[data-search-close]")) {
      closePanel();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {
      event.preventDefault();
      openPanel();
      return;
    }

    if (event.key === "Escape" && !ui.panel.hidden) {
      closePanel();
    }
  });

  async function readPage(pageData, query) {
    const response = await fetch(pageData.url, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Não foi possível abrir " + pageData.url);
    }

    const html = await response.text();
    const parser = new DOMParser();
    const documentPage = parser.parseFromString(
      html,
      "text/html"
    );

    documentPage
      .querySelectorAll(
        "script, style, nav, .pager, .ebook-search-panel, .ebook-search-navigation"
      )
      .forEach(function (element) {
        element.remove();
      });

    const titleElement =
      documentPage.querySelector(".page-title") ||
      documentPage.querySelector("h1");

    const title =
      titleElement?.textContent?.trim() ||
      documentPage.title ||
      "Página " + pageData.page;

    const text = normalizeText(
      documentPage.body.textContent || ""
    );

    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
      return null;
    }

    let count = 0;
    let position = 0;

    while (true) {
      position = text.indexOf(normalizedQuery, position);

      if (position === -1) break;

      count += 1;
      position += Math.max(normalizedQuery.length, 1);
    }

    if (count === 0) return null;

    return {
      page: pageData.page,
      chapter: pageData.chapter,
      title: title,
      url: pageData.url,
      count: count
    };
  }

  async function performSearch(query) {
    const normalizedQuery = normalizeText(query);

    ui.results.innerHTML = "";

    if (normalizedQuery.length < 2) {
      ui.status.textContent =
        "Digite pelo menos dois caracteres.";
      return;
    }

    if (window.location.protocol === "file:") {
      ui.status.textContent =
        "A busca global precisa ser testada na versão publicada no GitHub Pages ou em um servidor local.";
      return;
    }

    ui.status.textContent =
      "Procurando em todas as páginas...";

    const pages = createPagesList();
    const results = [];

    for (const pageData of pages) {
      try {
        const result = await readPage(pageData, query);

        if (result) {
          results.push(result);
        }
      } catch (error) {
        console.warn(error);
      }
    }

    if (results.length === 0) {
      ui.status.textContent =
        "Nenhuma ocorrência encontrada.";
      return;
    }

    const occurrences = [];

    results.forEach(function (result) {
      for (
        let pageHit = 0;
        pageHit < result.count;
        pageHit += 1
      ) {
        occurrences.push({
          url: result.url,
          page: result.page,
          chapter: result.chapter,
          title: result.title,
          pageHit: pageHit
        });
      }
    });

    const session = {
      query: query,
      occurrences: occurrences,
      globalIndex: 0
    };

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session)
    );

    const totalOccurrences = occurrences.length;

    ui.status.textContent =
      totalOccurrences +
      (totalOccurrences === 1
        ? " ocorrência encontrada em "
        : " ocorrências encontradas em ") +
      results.length +
      (results.length === 1 ? " página." : " páginas.");

    results.forEach(function (result) {
      const firstGlobalIndex = occurrences.findIndex(
        function (item) {
          return item.url === result.url;
        }
      );

      const link = document.createElement("a");
      link.className = "ebook-search-result";

      link.href =
        result.url +
        "?search=" +
        encodeURIComponent(query) +
        "&hit=0&global=" +
        firstGlobalIndex;

      link.innerHTML = `
        <span class="ebook-search-result__meta">
          Capítulo ${result.chapter} · Página ${result.page}
        </span>

        <span class="ebook-search-result__title">
          ${escapeHtml(result.title)}
        </span>

        <span class="ebook-search-result__count">
          ${result.count}
          ${result.count === 1 ? "ocorrência" : "ocorrências"}
        </span>
      `;

      ui.results.appendChild(link);
    });
  }

  ui.form.addEventListener("submit", function (event) {
    event.preventDefault();
    performSearch(ui.input.value.trim());
  });

  function escapeHtml(value) {
    const element = document.createElement("div");
    element.textContent = value;
    return element.innerHTML;
  }

  function clearHighlights() {
    document
      .querySelectorAll("mark.ebook-search-highlight")
      .forEach(function (mark) {
        mark.replaceWith(
          document.createTextNode(mark.textContent)
        );
      });

    document.body.normalize();
  }

  function createNormalizedMap(text) {
    let normalized = "";
    const map = [];

    for (let index = 0; index < text.length; index += 1) {
      const character = text[index];

      let transformed = character
        .toLowerCase()
        .replace(/β/g, "beta")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      transformed = transformed.replace(
        /[‐-‒–—−-]+/g,
        " "
      );

      transformed = transformed.replace(
        /[^a-z0-9\s]/g,
        " "
      );

      for (const part of transformed) {
        normalized += part;
        map.push(index);
      }
    }

    return {
      normalized: normalized,
      map: map
    };
  }

  function highlightPage(query) {
    clearHighlights();

    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) return [];

    const excludedSelectors = [
      "script",
      "style",
      "button",
      "input",
      "textarea",
      "select",
      "nav",
      ".ebook-search-panel",
      ".ebook-search-navigation"
    ].join(",");

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          const parent = node.parentElement;

          if (!parent) {
            return NodeFilter.FILTER_REJECT;
          }

          if (parent.closest(excludedSelectors)) {
            return NodeFilter.FILTER_REJECT;
          }

          if (!node.nodeValue.trim()) {
            return NodeFilter.FILTER_REJECT;
          }

          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes = [];

    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach(function (textNode) {
      const original = textNode.nodeValue;
      const mapped = createNormalizedMap(original);
      const normalizedText = mapped.normalized;

      const matches = [];
      let searchPosition = 0;

      while (true) {
        const foundIndex = normalizedText.indexOf(
          normalizedQuery,
          searchPosition
        );

        if (foundIndex === -1) break;

        const originalStart = mapped.map[foundIndex];

        const finalNormalizedPosition =
          foundIndex + normalizedQuery.length - 1;

        const originalEnd =
          mapped.map[finalNormalizedPosition] + 1;

        matches.push({
          start: originalStart,
          end: originalEnd
        });

        searchPosition =
          foundIndex + normalizedQuery.length;
      }

      if (matches.length === 0) return;

      const fragment = document.createDocumentFragment();
      let lastPosition = 0;

      matches.forEach(function (match) {
        fragment.append(
          document.createTextNode(
            original.slice(lastPosition, match.start)
          )
        );

        const mark = document.createElement("mark");
        mark.className = "ebook-search-highlight";
        mark.textContent = original.slice(
          match.start,
          match.end
        );

        fragment.append(mark);
        lastPosition = match.end;
      });

      fragment.append(
        document.createTextNode(
          original.slice(lastPosition)
        )
      );

      textNode.replaceWith(fragment);
    });

    return Array.from(
      document.querySelectorAll(
        "mark.ebook-search-highlight"
      )
    );
  }

  function activatePageHit(highlights, pageHit) {
    if (highlights.length === 0) return;

    const safeIndex = Math.min(
      Math.max(Number(pageHit) || 0, 0),
      highlights.length - 1
    );

    highlights.forEach(function (mark) {
      mark.classList.remove("is-active");
    });

    const active = highlights[safeIndex];
    active.classList.add("is-active");

    active.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

  function navigateGlobal(direction) {
    const stored = sessionStorage.getItem(STORAGE_KEY);

    if (!stored) return;

    let session;

    try {
      session = JSON.parse(stored);
    } catch (error) {
      return;
    }

    if (
      !session.occurrences ||
      session.occurrences.length === 0
    ) {
      return;
    }

    let index =
      Number(session.globalIndex) + direction;

    if (index < 0) {
      index = session.occurrences.length - 1;
    }

    if (index >= session.occurrences.length) {
      index = 0;
    }

    session.globalIndex = index;

    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session)
    );

    const occurrence = session.occurrences[index];

    window.location.href =
      occurrence.url +
      "?search=" +
      encodeURIComponent(session.query) +
      "&hit=" +
      occurrence.pageHit +
      "&global=" +
      index;
  }

  function initializeHighlightsFromUrl() {
    const params = new URLSearchParams(
      window.location.search
    );

    const query = params.get("search");

    if (!query) return;

    const pageHit = Number(params.get("hit") || 0);
    const globalIndex = Number(params.get("global") || 0);

    const highlights = highlightPage(query);

    if (highlights.length === 0) return;

    let storedSession = null;

    try {
      storedSession = JSON.parse(
        sessionStorage.getItem(STORAGE_KEY)
      );
    } catch (error) {
      storedSession = null;
    }

    if (storedSession) {
      storedSession.globalIndex = globalIndex;

      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(storedSession)
      );
    }

    ui.navigation.hidden = false;
    ui.term.textContent = query;

    const total =
      storedSession?.occurrences?.length ||
      highlights.length;

    ui.counter.textContent =
      globalIndex + 1 + " de " + total;

    window.setTimeout(function () {
      activatePageHit(highlights, pageHit);
    }, 100);
  }

  ui.navigation
    .querySelector("[data-search-previous]")
    .addEventListener("click", function () {
      navigateGlobal(-1);
    });

  ui.navigation
    .querySelector("[data-search-next]")
    .addEventListener("click", function () {
      navigateGlobal(1);
    });

  ui.navigation
    .querySelector("[data-search-clear]")
    .addEventListener("click", function () {
      clearHighlights();
      ui.navigation.hidden = true;

      const cleanUrl =
        window.location.pathname +
        window.location.hash;

      window.history.replaceState(
        {},
        document.title,
        cleanUrl
      );

      sessionStorage.removeItem(STORAGE_KEY);
    });

  initializeHighlightsFromUrl();

})();