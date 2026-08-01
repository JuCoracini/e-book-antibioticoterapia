/* =========================
   PÁGINA 20 — RESISTÊNCIA COMO MECANISMO DE ADAPTAÇÃO
   ========================= */

(function initPage20Resistance(){
  const root = document.querySelector(".cap3-page20");
  if(!root) return;

  const revealItems = root.querySelectorAll(".cap3-p20-reveal");
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(prefersReducedMotion || !("IntersectionObserver" in window)){
    revealItems.forEach(function(item){
      item.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold:0.18,
      rootMargin:"0px 0px -40px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 21 — RESISTÊNCIA INTRÍNSECA X ADQUIRIDA
   ========================= */

(function initPage21ResistanceTypes(){
  const root = document.querySelector("[data-cap3-p21]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p21-tab]"));
  const panels = Array.from(root.querySelectorAll("[data-p21-panel]"));
  const playButtons = Array.from(root.querySelectorAll(".cap3-p21-play"));
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function activateTab(target){
    tabs.forEach(function(tab){
      const isActive = tab.dataset.p21Tab === target;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });

    panels.forEach(function(panel){
      const isActive = panel.dataset.p21Panel === target;

      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      activateTab(tab.dataset.p21Tab);
    });

    tab.addEventListener("keydown", function(event){
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(event.key === "ArrowRight" || event.key === "ArrowDown"){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(event.key === "ArrowLeft" || event.key === "ArrowUp"){
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if(event.key === "Home"){
        nextIndex = 0;
      }

      if(event.key === "End"){
        nextIndex = tabs.length - 1;
      }

      if(nextIndex === null) return;

      event.preventDefault();
      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex].dataset.p21Tab);
    });
  });

  playButtons.forEach(function(button){
    button.addEventListener("click", function(){
      const card = button.closest(".cap3-p21-animCard");
      if(!card) return;

      const img = card.querySelector(".cap3-p21-animImg");
      const zoomButton = card.querySelector("[data-zoom]");
      if(!img) return;

      const frameA = img.dataset.frameA;
      const frameB = img.dataset.frameB;
      const current = img.getAttribute("src");
      const isFrameB = current === frameB;
      const nextFrame = isFrameB ? frameA : frameB;

      img.classList.add("is-changing");

      window.setTimeout(function(){
        img.setAttribute("src", nextFrame);

        if(zoomButton){
          zoomButton.dataset.zoom = nextFrame;
        }

        img.classList.remove("is-changing");
        button.textContent = isFrameB
          ? "Observar mecanismo"
          : "Voltar ao início";
      }, prefersReducedMotion ? 0 : 220);
    });
  });

  activateTab("intrinseca");
})();
/* =========================
   PÁGINA 22 — MUTAÇÕES E SELEÇÃO CLONAL
   Substitua somente o bloco da página 22 no capitulo-03.js.
   ========================= */

(function initPage22ClonalSelection(){
  const root = document.querySelector(".cap3-page22");
  if(!root) return;

  const interaction = root.querySelector("[data-cap3-p22-process]");
  if(!interaction) return;

  const tabs = Array.from(interaction.querySelectorAll("[data-p22-step]"));
  const panels = Array.from(interaction.querySelectorAll("[data-p22-panel]"));

  function activateStep(step){
    tabs.forEach(function(tab){
      const active = tab.dataset.p22Step === step;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function(panel){
      const active = panel.dataset.p22Panel === step;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener("click", function(){
      activateStep(tab.dataset.p22Step);
    });

    tab.addEventListener("keydown", function(event){
      if(!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if(event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if(event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if(event.key === "Home") nextIndex = 0;
      if(event.key === "End") nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
      activateStep(tabs[nextIndex].dataset.p22Step);
    });
  });
})();
/* =========================
   PÁGINA 23 — TRANSFERÊNCIA HORIZONTAL DE GENES
   Substitua somente o bloco da página 23 no capitulo-03.js.
   ========================= */

(function initPage23HorizontalTransfer(){
  const root = document.querySelector(".cap3-page23");
  if(!root) return;

  const interaction = root.querySelector("[data-cap3-p23]");
  if(!interaction) return;

  const tabs = Array.from(interaction.querySelectorAll("[data-p23-tab]"));
  const panels = Array.from(interaction.querySelectorAll("[data-p23-panel]"));

  function activateTab(target){
    tabs.forEach(function(tab){
      const active = tab.dataset.p23Tab === target;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function(panel){
      const active = panel.dataset.p23Panel === target;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener("click", function(){
      activateTab(tab.dataset.p23Tab);
    });

    tab.addEventListener("keydown", function(event){
      if(!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if(event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if(event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if(event.key === "Home") nextIndex = 0;
      if(event.key === "End") nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex].dataset.p23Tab);
    });
  });
})();
/* =========================
   PÁGINA 24 — β-LACTAMASES
   Substitua somente o bloco da página 24 no capitulo-03.js.
   ========================= */

(function initPage24BetaLactamases(){
  const root = document.querySelector(".cap3-page24");
  if(!root) return;

  const interaction = root.querySelector("[data-cap3-p24]");
  if(!interaction) return;

  const tabs = Array.from(interaction.querySelectorAll("[data-p24-tab]"));
  const panels = Array.from(interaction.querySelectorAll("[data-p24-panel]"));

  function activateTab(target){
    tabs.forEach(function(tab){
      const active = tab.dataset.p24Tab === target;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function(panel){
      const active = panel.dataset.p24Panel === target;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener("click", function(){
      activateTab(tab.dataset.p24Tab);
    });

    tab.addEventListener("keydown", function(event){
      if(!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if(event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if(event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if(event.key === "Home") nextIndex = 0;
      if(event.key === "End") nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex].dataset.p24Tab);
    });
  });
})();
/* =========================
   PÁGINA 25 — ALTERAÇÃO DO ALVO MOLECULAR
   Substitua somente o bloco da página 25 no capitulo-03.js.
   ========================= */

(function initPage25TargetModification(){
  const root = document.querySelector(".cap3-page25");
  if(!root) return;

  const interaction = root.querySelector("[data-cap3-p25]");
  if(!interaction) return;

  const tabs = Array.from(interaction.querySelectorAll("[data-p25-tab]"));
  const panels = Array.from(interaction.querySelectorAll("[data-p25-panel]"));

  function activateTab(target){
    tabs.forEach(function(tab){
      const active = tab.dataset.p25Tab === target;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function(panel){
      const active = panel.dataset.p25Panel === target;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener("click", function(){
      activateTab(tab.dataset.p25Tab);
    });

    tab.addEventListener("keydown", function(event){
      if(!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();

      let nextIndex = index;
      if(event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if(event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if(event.key === "Home") nextIndex = 0;
      if(event.key === "End") nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex].dataset.p25Tab);
    });
  });
})();
/* =========================
   PÁGINA 26 — PERMEABILIDADE E EFLUXO
   ========================= */

(function initPage26PermeabilityEfflux() {
  const root = document.querySelector(".cap3-page26");
  if (!root) return;

  const interaction = root.querySelector("[data-cap3-p26]");
  if (!interaction) return;

  const mainTabs = Array.from(
    interaction.querySelectorAll("[data-p26-main-tab]")
  );

  const mainPanels = Array.from(
    interaction.querySelectorAll("[data-p26-main-panel]")
  );

  const porinStates = [
    {
      title: "Porinas preservadas",
      text:
        "As porinas permitem a entrada do antibacteriano e favorecem " +
        "concentrações adequadas no espaço periplásmico.",
      image:
        "../../assets/capitulo-03/imagens/porinas-suscetivel.png",
      alt:
        "Porinas preservadas permitindo a entrada do antibacteriano",
      level: "100%",
      value: "Alta"
    },
    {
      title: "Redução do número de porinas",
      text:
        "A menor quantidade de canais disponíveis limita a passagem " +
        "do antibacteriano pela membrana externa.",
      image:
        "../../assets/capitulo-03/imagens/perda-de-porinas.png",
      alt:
        "Redução de porinas limitando a entrada do antibacteriano",
      level: "42%",
      value: "Reduzida"
    },
    {
      title: "Porinas modificadas",
      text:
        "Alterações estruturais do canal dificultam a passagem e " +
        "reduzem a concentração do fármaco no espaço periplásmico.",
      image:
        "../../assets/capitulo-03/imagens/porinas-resistente.png",
      alt:
        "Porinas modificadas dificultando a entrada do antibacteriano",
      level: "20%",
      value: "Muito baixa"
    }
  ];

  function activate(items, panels, target, itemKey, panelKey) {
    items.forEach(function (item) {
      const active = item.dataset[itemKey] === target;

      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
      item.tabIndex = active ? 0 : -1;
    });

    panels.forEach(function (panel) {
      const active = panel.dataset[panelKey] === target;

      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
    });
  }

  function addTabKeyboard(items, callback) {
    items.forEach(function (item, index) {
      item.addEventListener("keydown", function (event) {
        const validKeys = [
          "ArrowLeft",
          "ArrowRight",
          "Home",
          "End"
        ];

        if (!validKeys.includes(event.key)) return;

        event.preventDefault();

        let nextIndex = index;

        if (event.key === "ArrowRight") {
          nextIndex = (index + 1) % items.length;
        }

        if (event.key === "ArrowLeft") {
          nextIndex =
            (index - 1 + items.length) % items.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = items.length - 1;
        }

        items[nextIndex].focus();
        callback(items[nextIndex]);
      });
    });
  }

  function selectMain(tab) {
    activate(
      mainTabs,
      mainPanels,
      tab.dataset.p26MainTab,
      "p26MainTab",
      "p26MainPanel"
    );
  }

  mainTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      selectMain(tab);
    });
  });

  addTabKeyboard(mainTabs, selectMain);

  /* -------------------------
     INTERAÇÃO DAS PORINAS
     ------------------------- */

  const porinTabs = Array.from(
    interaction.querySelectorAll("[data-p26-porin]")
  );

  const porinImage = interaction.querySelector(
    ".cap3-p26-stepImage"
  );

  const porinZoom = interaction.querySelector(
    ".cap3-p26-zoom"
  );

  const porinTitle = interaction.querySelector(
    ".cap3-p26-stepTitle"
  );

  const porinText = interaction.querySelector(
    ".cap3-p26-stepText"
  );

  const porinLevel = interaction.querySelector(
    ".cap3-p26-meterBar i"
  );

  const porinValue = interaction.querySelector(
    ".cap3-p26-meterValue"
  );

  function selectPorin(tab) {
    const index = Number(tab.dataset.p26Porin);
    const state = porinStates[index];

    porinTabs.forEach(function (button) {
      const active = button === tab;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });

    porinImage.classList.add("is-changing");

    window.setTimeout(function () {
      porinImage.src = state.image;
      porinImage.alt = state.alt;
      porinZoom.dataset.zoom = state.image;

      porinTitle.textContent = state.title;
      porinText.textContent = state.text;

      porinLevel.style.setProperty(
        "--level",
        state.level
      );

      porinValue.textContent = state.value;

      porinImage.classList.remove("is-changing");
    }, 140);
  }

  porinTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      selectPorin(tab);
    });
  });

  addTabKeyboard(porinTabs, selectPorin);

  /* -------------------------
     INTERAÇÃO DO EFLUXO
     ------------------------- */

  const effluxTabs = Array.from(
    interaction.querySelectorAll("[data-p26-efflux]")
  );

  const effluxPanel = interaction.querySelector(
    ".cap3-p26-effluxPanel"
  );

  const effluxTitle = interaction.querySelector(
    ".cap3-p26-effluxTitle"
  );

  const effluxText = interaction.querySelector(
    ".cap3-p26-effluxText"
  );

  const effluxLevel = interaction.querySelector(
    ".cap3-p26-effluxLevel"
  );

  const effluxValue = interaction.querySelector(
    ".cap3-p26-effluxValue"
  );

  const effluxImage = interaction.querySelector(
    ".cap3-p26-effluxImage"
  );

  const effluxZoom = interaction.querySelector(
    ".cap3-p26-effluxZoom"
  );

  const effluxStates = {
    basal: {
      title: "Atividade fisiológica basal",
      text:
        "A remoção ocorre em intensidade basal, permitindo maior " +
        "permanência relativa do antibacteriano no interior da célula.",
      image:
        "../../assets/capitulo-03/imagens/" +
        "efluxo-atividade-basal.png",
      alt:
        "Atividade basal de bomba de efluxo com maior concentração " +
        "intracelular de antibacteriano",
      zoomLabel:
        "Ampliar imagem da atividade basal das bombas de efluxo",
      level: "75%",
      value: "Maior"
    },

    alta: {
      title: "Superexpressão das bombas",
      text:
        "A remoção intensificada reduz o acúmulo intracelular do " +
        "antibacteriano e pode afetar diferentes classes de fármacos.",
      image:
        "../../assets/capitulo-03/imagens/" +
        "efluxo-superexpressao.png",
      alt:
        "Superexpressão de bombas de efluxo com menor concentração " +
        "intracelular de antibacteriano",
      zoomLabel:
        "Ampliar imagem da superexpressão das bombas de efluxo",
      level: "24%",
      value: "Baixa"
    }
  };

  function selectEfflux(tab) {
    const key = tab.dataset.p26Efflux;
    const state = effluxStates[key];

    if (!state) return;

    effluxTabs.forEach(function (button) {
      const active = button === tab;

      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });

    effluxPanel.dataset.effluxState = key;
    effluxImage.classList.add("is-changing");

    window.setTimeout(function () {
      effluxImage.src = state.image;
      effluxImage.alt = state.alt;

      effluxZoom.dataset.zoom = state.image;
      effluxZoom.setAttribute(
        "aria-label",
        state.zoomLabel
      );

      effluxTitle.textContent = state.title;
      effluxText.textContent = state.text;

      effluxLevel.style.setProperty(
        "--level",
        state.level
      );

      effluxValue.textContent = state.value;

      effluxImage.classList.remove("is-changing");
    }, 140);
  }

  effluxTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      selectEfflux(tab);
    });
  });

  addTabKeyboard(effluxTabs, selectEfflux);
})();
/* =========================
   PÁGINA 27 — RESISTÊNCIA CRUZADA
   ========================= */
(function () {
  "use strict";

  const page = document.querySelector(".cap3-page27");
  if (!page) return;

  const interaction = page.querySelector(".cap3-p27-interaction");
  if (!interaction) return;

  const options = Array.from(interaction.querySelectorAll('input[name="cap3P27Answer"]'));
  const confirmButton = interaction.querySelector(".cap3-p27-confirm");
  const resetButton = interaction.querySelector(".cap3-p27-reset");
  const feedback = interaction.querySelector(".cap3-p27-feedback");
  const mechanism = interaction.querySelector(".cap3-p27-mechanism");
  const progress = interaction.querySelector(".cap3-p27-progress");

  if (!options.length || !confirmButton || !resetButton || !feedback || !mechanism || !progress) return;

  const feedbackText = {
    exposicao: {
      title: "Reveja a relação entre exposição e resistência.",
      body: "A bactéria pode apresentar resistência mesmo que o paciente nunca tenha recebido aquele fármaco. A resistência depende das características do microrganismo e do mecanismo presente."
    },
    cruzada: {
      title: "Interpretação adequada.",
      body: "Como ciprofloxacina e levofloxacina pertencem à mesma classe e compartilham alvos bacterianos, um mecanismo comum pode reduzir a atividade dos dois fármacos."
    },
    independente: {
      title: "Os resultados podem estar relacionados.",
      body: "Antibacterianos diferentes podem compartilhar a mesma classe, os mesmos alvos ou mecanismos semelhantes. Por isso, um único mecanismo pode afetar mais de um medicamento."
    }
  };

  function selectedOption() {
    return options.find(function (option) {
      return option.checked;
    });
  }

  function clearOptionStates() {
    options.forEach(function (option) {
      const label = option.closest(".cap3-p27-option");
      if (label) label.classList.remove("is-correct", "is-incorrect");
    });
  }

  options.forEach(function (option) {
    option.addEventListener("change", function () {
      confirmButton.disabled = false;
      clearOptionStates();
    });
  });

  confirmButton.addEventListener("click", function () {
    const selected = selectedOption();
    if (!selected) return;

    const isCorrect = selected.value === "cruzada";
    const content = feedbackText[selected.value];
    const label = selected.closest(".cap3-p27-option");

    clearOptionStates();
    if (label) label.classList.add(isCorrect ? "is-correct" : "is-incorrect");

    feedback.className = "cap3-p27-feedback " + (isCorrect ? "is-correct" : "is-incorrect");
    feedback.innerHTML = "<strong>" + content.title + "</strong><br>" + content.body;
    feedback.hidden = false;
    mechanism.hidden = false;
    progress.textContent = "Etapa 2 de 2";

    options.forEach(function (option) {
      option.disabled = true;
    });

    confirmButton.hidden = true;
    resetButton.hidden = false;
    mechanism.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  resetButton.addEventListener("click", function () {
    options.forEach(function (option) {
      option.checked = false;
      option.disabled = false;
    });

    clearOptionStates();
    feedback.hidden = true;
    feedback.textContent = "";
    mechanism.hidden = true;
    confirmButton.hidden = false;
    confirmButton.disabled = true;
    resetButton.hidden = true;
    progress.textContent = "Etapa 1 de 2";

    const firstOption = interaction.querySelector(".cap3-p27-option");
    if (firstOption) firstOption.focus();
  });
})();
/* =========================
   PÁGINA 28 — MULTIRRESISTÊNCIA E IMPACTO CLÍNICO
   ========================= */

(function () {
  "use strict";

  const page = document.querySelector(".cap3-page28");
  if (!page) return;

  const mechanisms = {
    carbapenemase: {
      text: "A hidrólise enzimática pode comprometer diferentes β-lactâmicos. O espectro varia conforme a carbapenemase produzida.",
      classes: ["penicilinas", "cefalosporinas", "carbapenemicos"]
    },
    porinas: {
      text: "A redução da permeabilidade limita a entrada de alguns fármacos e costuma ganhar importância quando associada a outros mecanismos.",
      classes: ["penicilinas", "cefalosporinas", "carbapenemicos", "fluoroquinolonas"]
    },
    efluxo: {
      text: "A remoção ativa reduz a concentração intracelular. As classes afetadas dependem dos substratos reconhecidos pela bomba.",
      classes: ["fluoroquinolonas", "tetraciclinas", "macrolideos"]
    },
    girase: {
      text: "Alterações no alvo podem diminuir a ligação das fluoroquinolonas e reduzir sua atividade.",
      classes: ["fluoroquinolonas"]
    }
  };

  const selected = new Set();
  const mechanismButtons = Array.from(page.querySelectorAll("[data-p28-mech]"));
  const classChips = Array.from(page.querySelectorAll("[data-p28-class]"));
  const title = page.querySelector(".cap3-p28-profileTitle");
  const consequence = page.querySelector(".cap3-p28-consequence p");
  const meterDots = Array.from(page.querySelectorAll(".cap3-p28-meter i"));
  const resetButton = page.querySelector(".cap3-p28-reset");

  function updateProfile() {
    const activeClasses = new Set();
    const descriptions = [];

    selected.forEach(function (key) {
      const mechanism = mechanisms[key];
      descriptions.push(mechanism.text);
      mechanism.classes.forEach(function (className) {
        activeClasses.add(className);
      });
    });

    classChips.forEach(function (chip) {
      chip.classList.toggle("is-active", activeClasses.has(chip.dataset.p28Class));
    });

    meterDots.forEach(function (dot, index) {
      dot.classList.toggle("is-active", index < selected.size);
    });

    if (selected.size === 0) {
      title.textContent = "Nenhum mecanismo selecionado";
      consequence.textContent = "Selecione um ou mais mecanismos para observar suas possíveis repercussões.";
    } else {
      title.textContent = selected.size === 1
        ? "1 mecanismo selecionado"
        : selected.size + " mecanismos associados";
      consequence.textContent = descriptions.join(" ");
    }

    resetButton.disabled = selected.size === 0;
  }

  mechanismButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const key = button.dataset.p28Mech;

      if (selected.has(key)) {
        selected.delete(key);
      } else {
        selected.add(key);
      }

      button.setAttribute("aria-pressed", String(selected.has(key)));
      updateProfile();
    });
  });

  resetButton.addEventListener("click", function () {
    selected.clear();
    mechanismButtons.forEach(function (button) {
      button.setAttribute("aria-pressed", "false");
    });
    updateProfile();
    mechanismButtons[0]?.focus();
  });

  const definitions = {
    mdr: {
      title: "Multirresistente",
      definition: "Não suscetibilidade a pelo menos um agente em três ou mais categorias de antibacterianos.",
      meaning: "Há resistência relevante, mas ainda podem existir diferentes opções terapêuticas."
    },
    xdr: {
      title: "Extensivamente resistente",
      definition: "Não suscetibilidade a pelo menos um agente em todas, exceto duas ou menos categorias.",
      meaning: "A bactéria permanece suscetível a agentes de apenas uma ou duas categorias."
    },
    pdr: {
      title: "Pan-resistente",
      definition: "Não suscetibilidade a todos os agentes de todas as categorias avaliadas.",
      meaning: "Não se identifica atividade entre os agentes incluídos na avaliação padronizada."
    }
  };

  const definitionButtons = Array.from(page.querySelectorAll("[data-p28-definition]"));
  const definitionPanel = page.querySelector(".cap3-p28-definitionPanel");

  function showDefinition(key) {
    const definition = definitions[key];
    if (!definition || !definitionPanel) return;

    definitionButtons.forEach(function (button) {
      const active = button.dataset.p28Definition === key;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });

    definitionPanel.innerHTML =
      "<strong>" + definition.title + "</strong>" +
      "<p>" + definition.definition + "</p>" +
      "<span>" + definition.meaning + "</span>";
  }

  definitionButtons.forEach(function (button, index) {
    button.addEventListener("click", function () {
      showDefinition(button.dataset.p28Definition);
    });

    button.addEventListener("keydown", function (event) {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + direction + definitionButtons.length) % definitionButtons.length;
      definitionButtons[next].focus();
      definitionButtons[next].click();
    });
  });

  updateProfile();
  showDefinition("mdr");
})();
/* =========================
   PÁGINA 29 — QUIZ DE REVISÃO
   ========================= */

(function initPage29Quiz() {
  const root = document.querySelector("[data-cap3-p29]");
  if (!root) return;

  const situations = [
    {
      caseText:
        "Um paciente hospitalizado apresenta infecção por <em>Klebsiella pneumoniae</em>. O antibiograma demonstra resistência a diferentes cefalosporinas de terceira geração, e um teste fenotípico complementar evidencia restauração da atividade do β-lactâmico na presença de um inibidor de β-lactamase.",
      prompt:
        "Qual mecanismo de resistência é mais compatível com esse padrão microbiológico?",
      correct: "b",
      options: [
        {
          key: "a",
          label: "Redução da permeabilidade da membrana bacteriana."
        },
        {
          key: "b",
          label: "Produção de β-lactamase com atividade contra cefalosporinas."
        },
        {
          key: "c",
          label: "Alteração da DNA girase."
        },
        {
          key: "d",
          label: "Modificação do alvo ribossomal."
        }
      ],
      feedback: {
        a: "A redução da permeabilidade pode contribuir para a resistência aos β-lactâmicos, mas não explica a restauração da atividade observada na presença do inibidor.",
        b: "A atividade restaurada na presença do inibidor é compatível com inativação enzimática do β-lactâmico por uma β-lactamase com atividade contra cefalosporinas.",
        c: "Alterações da DNA girase estão relacionadas principalmente à resistência às fluoroquinolonas e não explicam o padrão descrito com cefalosporinas.",
        d: "Modificações do alvo ribossomal afetam antibacterianos que atuam na síntese proteica e não explicam a resistência às cefalosporinas."
      }
    },
    {
      caseText:
        "Um isolado bacteriano apresenta resistência simultânea a diferentes fluoroquinolonas, embora pertença a uma espécie habitualmente suscetível a essa classe. Estudos laboratoriais demonstram mutação na enzima DNA girase.",
      prompt:
        "Qual conceito descreve melhor esse fenômeno?",
      correct: "c",
      options: [
        {
          key: "a",
          label: "Resistência causada por transferência horizontal de plasmídeo."
        },
        {
          key: "b",
          label: "Resistência intrínseca."
        },
        {
          key: "c",
          label: "Resistência cruzada entre antibacterianos relacionados."
        },
        {
          key: "d",
          label: "Multirresistência associada a múltiplos mecanismos independentes."
        }
      ],
      feedback: {
        a: "O caso demonstra uma mutação na DNA girase e não apresenta evidência de aquisição de genes por transferência horizontal.",
        b: "A resistência intrínseca é uma característica natural e previsível da espécie. O caso descreve uma alteração adquirida em uma espécie habitualmente suscetível.",
        c: "Uma alteração em um alvo compartilhado pode reduzir simultaneamente a atividade de diferentes fluoroquinolonas, caracterizando resistência cruzada entre fármacos relacionados.",
        d: "A multirresistência descreve não suscetibilidade a múltiplas categorias de antibacterianos. O caso apresenta um mecanismo que afeta diferentes fármacos relacionados."
      }
    }
  ];

  const progress = root.querySelector("[data-p29-progress]");
  const kicker = root.querySelector("[data-p29-kicker]");
  const caseBox = root.querySelector("[data-p29-case]");
  const prompt = root.querySelector("[data-p29-prompt]");
  const optionsBox = root.querySelector("[data-p29-options]");
  const confirmButton = root.querySelector("[data-p29-confirm]");
  const resetButton = root.querySelector("[data-p29-reset]");
  const feedback = root.querySelector("[data-p29-feedback]");
  const prevButton = root.querySelector("[data-p29-prev]");
  const nextButton = root.querySelector("[data-p29-next]");
  const dots = Array.from(
    root.querySelectorAll(".cap3-p29Dots span")
  );

  if (
    !progress ||
    !kicker ||
    !caseBox ||
    !prompt ||
    !optionsBox ||
    !confirmButton ||
    !resetButton ||
    !feedback ||
    !prevButton ||
    !nextButton ||
    !dots.length
  ) {
    return;
  }

  let current = 0;

  const responses = situations.map(function () {
    return {
      selected: null,
      confirmed: false
    };
  });

  function updateNavigation() {
    const response = responses[current];

    prevButton.disabled = current === 0;

    nextButton.disabled =
      current === situations.length - 1 ||
      !response.confirmed;

    nextButton.textContent =
      current === situations.length - 1
        ? "Última situação"
        : "Próxima situação →";

    dots.forEach(function (dot, index) {
      dot.classList.toggle(
        "is-active",
        index === current
      );

      dot.classList.toggle(
        "is-answered",
        responses[index].confirmed
      );
    });
  }

  function showConfirmedState(item, response) {
    const buttons = Array.from(
      optionsBox.querySelectorAll("[data-answer]")
    );

    const isCorrect =
      response.selected === item.correct;

    buttons.forEach(function (button) {
      button.disabled = true;

      button.classList.remove(
        "is-selected",
        "is-correct",
        "is-error"
      );

      if (button.dataset.answer === item.correct) {
        button.classList.add("is-correct");
      }

      if (
        button.dataset.answer === response.selected &&
        !isCorrect
      ) {
        button.classList.add("is-error");
      }
    });

    feedback.className =
      "cap3-p29Feedback is-visible " +
      (isCorrect ? "is-correct" : "is-error");

    feedback.innerHTML =
      "<strong>" +
      (
        isCorrect
          ? "Interpretação mais adequada."
          : "Considere novamente os dados."
      ) +
      "</strong>" +
      "<p>" +
      item.feedback[response.selected] +
      "</p>";

    confirmButton.hidden = true;
    resetButton.hidden = false;
  }

  function render() {
    const item = situations[current];
    const response = responses[current];
    const letters = ["A", "B", "C", "D"];

    progress.textContent =
      "Situação " +
      (current + 1) +
      " de " +
      situations.length;

    kicker.textContent =
      "Situação clínica " + (current + 1);

    caseBox.innerHTML = item.caseText;
    prompt.textContent = item.prompt;

    optionsBox.innerHTML = item.options
      .map(function (option, index) {
        return (
          '<button type="button" data-answer="' +
          option.key +
          '">' +
          '<span class="cap3-p29Letter">' +
          letters[index] +
          "</span>" +
          "<span>" +
          option.label +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    feedback.className = "cap3-p29Feedback";
    feedback.innerHTML = "";

    confirmButton.hidden = false;
    confirmButton.disabled = !response.selected;
    resetButton.hidden = true;

    const buttons = Array.from(
      optionsBox.querySelectorAll("[data-answer]")
    );

    buttons.forEach(function (button) {
      if (
        !response.confirmed &&
        button.dataset.answer === response.selected
      ) {
        button.classList.add("is-selected");
      }

      button.addEventListener("click", function () {
        if (response.confirmed) return;

        response.selected = button.dataset.answer;

        buttons.forEach(function (itemButton) {
          itemButton.classList.toggle(
            "is-selected",
            itemButton === button
          );
        });

        confirmButton.disabled = false;
      });
    });

    if (response.confirmed) {
      showConfirmedState(item, response);
    }

    updateNavigation();
  }

  confirmButton.addEventListener("click", function () {
    const response = responses[current];

    if (!response.selected) return;

    response.confirmed = true;

    showConfirmedState(
      situations[current],
      response
    );

    updateNavigation();
  });

  resetButton.addEventListener("click", function () {
    responses[current] = {
      selected: null,
      confirmed: false
    };

    render();
  });

  prevButton.addEventListener("click", function () {
    if (current > 0) {
      current -= 1;
      render();
    }
  });

  nextButton.addEventListener("click", function () {
    if (
      current < situations.length - 1 &&
      responses[current].confirmed
    ) {
      current += 1;
      render();
    }
  });

  render();
})();