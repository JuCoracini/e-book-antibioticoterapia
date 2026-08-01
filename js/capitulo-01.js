/* =====================================================
   PÁGINA 1 — EXPOSIÇÃO AO ANTIBACTERIANO
   ===================================================== */

(function initPage1AMR() {
  const root = document.querySelector("[data-amr-figure]");

  if (!root) return;

  const petri = document.getElementById("petri");

  const tabs = Array.from(
    root.querySelectorAll("[data-amr-scenario]")
  );

  const panel = root.querySelector("[data-amr-panel]");

  const scenarioTitle =
    document.getElementById("amrScenarioTitle");

  const feedback =
    document.getElementById("amrFeedback");

  const controlFill =
    document.getElementById("amrControlFill");

  const resistanceFill =
    document.getElementById("amrResistanceFill");

  const controlLabel =
    document.getElementById("amrControlLabel");

  const resistanceLabel =
    document.getElementById("amrResistanceLabel");

  const observeButton = root.querySelector(
    "[data-amr-observe-button]"
  );

  const observeContent = root.querySelector(
    "[data-amr-observe-content]"
  );

  if (
    !petri ||
    !tabs.length ||
    !panel ||
    !scenarioTitle ||
    !feedback ||
    !controlFill ||
    !resistanceFill ||
    !controlLabel ||
    !resistanceLabel
  ) {
    return;
  }

  /* População inicial representada na simulação */

  const INITIAL_COUNTS = {
    sensitive: 45,
    resistant: 5
  };

  /*
   * Os valores abaixo são exclusivamente esquemáticos.
   * Não representam taxas clínicas, probabilidades,
   * concentrações ou durações terapêuticas.
   */

  const scenarioMap = {
    adequado: {
      tabId: "amrTabAdequado",

      title: "Exposição terapêutica adequada",

      text:
        "A exposição adequada ao contexto clínico reduz expressivamente a carga bacteriana e favorece o controle do foco infeccioso. A composição relativa da população remanescente pode se modificar durante esse processo.",

      controlWidth: "90%",
      resistanceWidth: "24%",

      controlLabel: "Elevado",
      resistanceLabel: "Baixa",

      phases: [
        {
          sensitive: 45,
          resistant: 5
        },
        {
          sensitive: 24,
          resistant: 4
        },
        {
          sensitive: 9,
          resistant: 3
        }
      ]
    },

    subdose: {
      tabId: "amrTabSubdose",

      title: "Exposição subterapêutica",

      text:
        "A exposição abaixo da necessária pode produzir redução incompleta da carga bacteriana. O controle parcial do foco permite a persistência de microrganismos e modifica a participação relativa das variantes menos suscetíveis.",

      controlWidth: "48%",
      resistanceWidth: "62%",

      controlLabel: "Parcial",
      resistanceLabel: "Moderada",

      phases: [
        {
          sensitive: 45,
          resistant: 5
        },
        {
          sensitive: 34,
          resistant: 6
        },
        {
          sensitive: 26,
          resistant: 8
        }
      ]
    },

    interrupcao: {
      tabId: "amrTabInterrupcao",

      title:
        "Interrupção antes do controle da infecção",

      text:
        "Quando a exposição é interrompida antes do controle da infecção, a população bacteriana remanescente pode voltar a se expandir. O resultado depende do foco infeccioso, do fármaco, do hospedeiro e da resposta clínica.",

      controlWidth: "22%",
      resistanceWidth: "82%",

      controlLabel: "Baixo",
      resistanceLabel: "Elevada",

      phases: [
        {
          sensitive: 45,
          resistant: 5
        },
        {
          sensitive: 24,
          resistant: 8
        },
        {
          sensitive: 28,
          resistant: 20
        }
      ]
    }
  };

  let population = [];
  let activeTimers = [];
  let resizeFrame = null;
  let bugId = 0;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function clearTimers() {
    activeTimers.forEach(function (timer) {
      window.clearTimeout(timer);
    });

    activeTimers = [];
  }

  function schedule(callback, delay) {
    const timer = window.setTimeout(
      callback,
      delay
    );

    activeTimers.push(timer);

    return timer;
  }

  function clamp(min, value, max) {
    return Math.max(
      min,
      Math.min(value, max)
    );
  }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function shuffle(items) {
    return items
      .map(function (item) {
        return {
          value: item,
          sort: Math.random()
        };
      })
      .sort(function (a, b) {
        return a.sort - b.sort;
      })
      .map(function (item) {
        return item.value;
      });
  }

  function getPlateSize() {
    const rect = petri.getBoundingClientRect();

    return {
      width: rect.width || 640,
      height: rect.height || 236
    };
  }

  function pointInEllipse() {
    const size = getPlateSize();
    const padding = 18;

    const angle = Math.random() * Math.PI * 2;
    const radius = Math.sqrt(Math.random());

    const horizontalRadius =
      size.width / 2 - padding;

    const verticalRadius =
      size.height / 2 - padding;

    const x =
      size.width / 2 +
      radius *
        horizontalRadius *
        Math.cos(angle);

    const y =
      size.height / 2 +
      radius *
        verticalRadius *
        Math.sin(angle);

    return {
      x: clamp(
        padding,
        x,
        size.width - padding
      ),

      y: clamp(
        padding,
        y,
        size.height - padding
      )
    };
  }

  function nearbyPoint(parent) {
    const size = getPlateSize();
    const padding = 18;

    const angle = Math.random() * Math.PI * 2;

    const distance = randomInRange(12, 34);

    return {
      x: clamp(
        padding,
        parent.x +
          Math.cos(angle) * distance,
        size.width - padding
      ),

      y: clamp(
        padding,
        parent.y +
          Math.sin(angle) * distance,
        size.height - padding
      )
    };
  }

  function createBugElement(item, isBorn) {
    const dot = document.createElement("span");

    dot.className = "bug " + item.type;
    dot.dataset.bugId = item.id;

    dot.style.left = item.x + "px";
    dot.style.top = item.y + "px";

    if (isBorn) {
      dot.classList.add("is-born");
    }

    return dot;
  }

  function buildInitialPopulation() {
    population = [];
    bugId = 0;

    for (
      let index = 0;
      index < INITIAL_COUNTS.sensitive;
      index += 1
    ) {
      const point = pointInEllipse();

      population.push({
        id: "b" + bugId,
        type: "sensitive",
        x: point.x,
        y: point.y,
        alive: true
      });

      bugId += 1;
    }

    for (
      let index = 0;
      index < INITIAL_COUNTS.resistant;
      index += 1
    ) {
      const point = pointInEllipse();

      population.push({
        id: "b" + bugId,
        type: "resistant",
        x: point.x,
        y: point.y,
        alive: true
      });

      bugId += 1;
    }
  }

  function drawPopulation(isBorn) {
    petri.innerHTML = "";

    shuffle(population)
      .filter(function (item) {
        return item.alive;
      })
      .forEach(function (item) {
        petri.appendChild(
          createBugElement(item, isBorn)
        );
      });
  }

  function highlightInitialResistantBugs() {
    if (prefersReducedMotion) return;

    const resistantElements = Array.from(
      petri.querySelectorAll(".bug.resistant")
    );

    resistantElements.forEach(function (element) {
      element.classList.add("is-highlighted");
    });

    schedule(function () {
      resistantElements.forEach(function (element) {
        element.classList.remove(
          "is-highlighted"
        );
      });
    }, 1850);
  }

  function getAliveByType(type) {
    return population.filter(function (item) {
      return item.alive && item.type === type;
    });
  }

  function removeExcess(type, targetCount) {
    const alive = shuffle(
      getAliveByType(type)
    );

    const excess = alive.length - targetCount;

    if (excess <= 0) return;

    alive
      .slice(0, excess)
      .forEach(function (item, index) {
        const element = petri.querySelector(
          '[data-bug-id="' + item.id + '"]'
        );

        if (element) {
          window.setTimeout(function () {
            element.classList.add("is-removed");
          }, index * 18);
        }

        item.alive = false;
      });

    schedule(function () {
      drawPopulation(false);
    }, 520);
  }

  function addNewBugs(type, amount) {
    if (amount <= 0) return;

    const parents = getAliveByType(type);

    for (
      let index = 0;
      index < amount;
      index += 1
    ) {
      const parent = parents.length
        ? parents[index % parents.length]
        : null;

      const point = parent
        ? nearbyPoint(parent)
        : pointInEllipse();

      population.push({
        id: "b" + bugId,
        type: type,
        x: point.x,
        y: point.y,
        alive: true
      });

      bugId += 1;
    }

    schedule(function () {
      drawPopulation(true);
    }, 520);
  }

  function applyPhase(phase) {
    const currentSensitive =
      getAliveByType("sensitive").length;

    const currentResistant =
      getAliveByType("resistant").length;

    if (phase.sensitive < currentSensitive) {
      removeExcess(
        "sensitive",
        phase.sensitive
      );
    }

    if (phase.resistant < currentResistant) {
      removeExcess(
        "resistant",
        phase.resistant
      );
    }

    if (phase.sensitive > currentSensitive) {
      addNewBugs(
        "sensitive",
        phase.sensitive - currentSensitive
      );
    }

    if (phase.resistant > currentResistant) {
      addNewBugs(
        "resistant",
        phase.resistant - currentResistant
      );
    }
  }

  function updateMetrics(key) {
    const scenario = scenarioMap[key];

    if (!scenario) return;

    controlFill.style.width =
      scenario.controlWidth;

    resistanceFill.style.width =
      scenario.resistanceWidth;

    controlLabel.textContent =
      scenario.controlLabel;

    resistanceLabel.textContent =
      scenario.resistanceLabel;

    scenarioTitle.textContent =
      scenario.title;

    feedback.textContent =
      scenario.text;
  }

  function animateScenario(key) {
    const scenario = scenarioMap[key];

    if (!scenario) return;

    clearTimers();
    buildInitialPopulation();
    drawPopulation(true);

    if (prefersReducedMotion) {
      scenario.phases
        .slice(1)
        .forEach(function (phase) {
          applyPhase(phase);
        });

      return;
    }

    schedule(function () {
      highlightInitialResistantBugs();
    }, 300);

    scenario.phases
      .slice(1)
      .forEach(function (phase, index) {
        schedule(function () {
          applyPhase(phase);
        }, 2350 + index * 1100);
      });
  }

  function activate(key) {
    const scenario = scenarioMap[key];

    if (!scenario) return;

    tabs.forEach(function (tab) {
      const active =
        tab.dataset.amrScenario === key;

      tab.classList.toggle(
        "is-active",
        active
      );

      tab.setAttribute(
        "aria-selected",
        active ? "true" : "false"
      );

      tab.setAttribute(
        "tabindex",
        active ? "0" : "-1"
      );
    });

    panel.setAttribute(
      "aria-labelledby",
      scenario.tabId
    );

    updateMetrics(key);
    animateScenario(key);
  }

  function getActiveKey() {
    const activeTab = root.querySelector(
      "[data-amr-scenario][aria-selected='true']"
    );

    return activeTab
      ? activeTab.dataset.amrScenario
      : "adequado";
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activate(
        tab.dataset.amrScenario
      );
    });

    tab.addEventListener(
      "keydown",
      function (event) {
        const currentIndex = tabs.indexOf(tab);
        let nextIndex = null;

        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          nextIndex =
            (currentIndex + 1) % tabs.length;
        }

        if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ) {
          nextIndex =
            (
              currentIndex -
              1 +
              tabs.length
            ) % tabs.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) return;

        event.preventDefault();

        tabs[nextIndex].focus();

        activate(
          tabs[nextIndex].dataset.amrScenario
        );
      }
    );
  });

  if (observeButton && observeContent) {
    observeButton.addEventListener(
      "click",
      function () {
        const isExpanded =
          observeButton.getAttribute(
            "aria-expanded"
          ) === "true";

        observeButton.setAttribute(
          "aria-expanded",
          isExpanded ? "false" : "true"
        );

        observeContent.hidden = isExpanded;
      }
    );
  }

  window.addEventListener(
    "resize",
    function () {
      if (resizeFrame) {
        window.cancelAnimationFrame(
          resizeFrame
        );
      }

      resizeFrame =
        window.requestAnimationFrame(
          function () {
            activate(
              getActiveKey()
            );
          }
        );
    }
  );

  activate("adequado");
})();
/* =====================================================
   PÁGINA 2 — MARCOS HISTÓRICOS DA ANTIBIOTICOTERAPIA
   ===================================================== */

(function initPage2Timeline(){
  const root = document.querySelector(".cap1-page2");

  if(!root) return;

  const content = document.getElementById("timelineContent");
  const progressFill = document.getElementById(
    "timelineProgressFill"
  );

  const buttons = Array.from(
    root.querySelectorAll(".timeline-item")
  );

  if(!content || !buttons.length) return;

  const data = {
    "1928":{
      tabId:"timelineTab1928",

      title:"1928 — Descoberta da penicilina",

      image:
        "../../assets/capitulo-01/imagens/1928-penicilina.png",

      alt:
        "Representação de Alexander Fleming observando placas de cultura bacteriana com crescimento de Penicillium.",

      caption:
        "Representação artística da observação que levou à identificação da atividade antibacteriana produzida por fungos do gênero <em>Penicillium</em>.",

      text:
        "Em 1928, Alexander Fleming observou que uma substância produzida por fungos do gênero <em>Penicillium</em> era capaz de inibir o crescimento bacteriano em condições experimentais. Embora a descoberta não tenha resultado imediatamente em um medicamento disponível, ela demonstrou que compostos naturais poderiam ser explorados como agentes antibacterianos <sup>1,2</sup>.",

      meaning:
        "Início de uma nova perspectiva: substâncias produzidas por microrganismos poderiam ser utilizadas contra bactérias."

    },

    "1935":{
      tabId:"timelineTab1935",

      title:"1935 — Introdução das sulfonamidas",

      image:
        "../../assets/capitulo-01/imagens/1935-sulfonamidas.png",

      alt:
        "Representação da estrutura química geral das sulfonamidas.",

      caption:
        "O Prontosil foi um dos primeiros compostos utilizados com eficácia clínica contra infecções bacterianas sistêmicas.",

      text:
        "A introdução das sulfonamidas, em 1935, marcou o início da quimioterapia antibacteriana sistêmica com eficácia clínica comprovada. Esses fármacos demonstraram que processos metabólicos essenciais às bactérias poderiam ser utilizados como alvos terapêuticos relativamente seletivos <sup>4,7</sup>.",

      meaning:
        "A atividade antibacteriana passou da observação experimental para o tratamento sistêmico de infecções."

    },

    "1940":{
      tabId:"timelineTab1940",

      title:"1940–1943 — Produção da penicilina em escala",

      image:
        "../../assets/capitulo-01/imagens/1940-producao-penicilina.png",

      alt:
        "Representação da produção industrial de penicilina durante a década de 1940.",

      caption:
        "O desenvolvimento de métodos de fermentação em larga escala tornou possível produzir penicilina em quantidade suficiente para uso clínico.",

      text:
        "Entre 1940 e 1943, avanços nos processos de fermentação, purificação e produção industrial possibilitaram o uso clínico amplo da penicilina. Sua disponibilidade modificou o tratamento de infecções bacterianas graves e contribuiu para a redução da mortalidade associada a essas doenças <sup>1,3</sup>.",

      meaning:
        "A descoberta científica transformou-se em um recurso terapêutico disponível para grandes populações."

    },

    "1943":{
      tabId:"timelineTab1943",

      title:"1943–1960 — Idade de Ouro dos antibacterianos",

      image:
        "../../assets/capitulo-01/imagens/1943-idade-ouro.png",

      alt:
        "Representação esquemática da descoberta de diferentes classes de antibacterianos ao longo do século vinte.",

      caption:
        "A maior concentração de descobertas de novas classes ocorreu entre as décadas de 1940 e 1960.",

      text:
        "Entre as décadas de 1940 e 1960, foram identificadas diversas classes de antibacterianos, incluindo aminoglicosídeos, tetraciclinas, macrolídeos, cloranfenicol e glicopeptídeos. Muitas dessas moléculas foram obtidas a partir de substâncias produzidas por microrganismos ambientais. Esse período ampliou de forma expressiva as opções terapêuticas disponíveis <sup>1,2</sup>.",

      meaning:
        "A antibioticoterapia consolidou-se como um dos pilares da medicina moderna."

    },

    "1961":{
      tabId:"timelineTab1961",

      title:
        "1961 — Identificação do <em>Staphylococcus aureus</em> resistente à meticilina",

      image:
        "../../assets/capitulo-01/imagens/1961-mrsa.png",

      alt:
        "Representação de Staphylococcus aureus resistente à meticilina.",

      caption:
        "As primeiras descrições de MRSA ocorreram poucos anos após a introdução clínica da meticilina.",

      text:
        "Em 1961, foram descritas cepas de <em>Staphylococcus aureus</em> resistentes à meticilina. O surgimento do MRSA demonstrou que alterações no alvo dos β-lactâmicos poderiam comprometer a atividade de grande parte dessa classe e evidenciou a rapidez com que mecanismos de resistência podem adquirir relevância clínica <sup>3,5</sup>.",

      meaning:
        "A introdução de novos antibacterianos não eliminava a capacidade adaptativa das populações bacterianas."

    },

    "1988":{
      tabId:"timelineTab1988",

      title:
      "1988 — Identificação de enterococos resistentes à vancomicina",

      image:
        "../../assets/capitulo-01/imagens/1988-vre.png",

      alt:
        "Representação de teste de suscetibilidade à vancomicina em Enterococcus.",

      caption:
        "A determinação da concentração inibitória mínima auxilia na identificação da redução de suscetibilidade à vancomicina.",

      text:
        "Em 1988, foram descritos isolados clínicos de <em>Enterococcus</em> resistentes à vancomicina. O evento demonstrou que mesmo antibacterianos utilizados contra microrganismos multirresistentes poderiam perder eficácia diante da aquisição e disseminação de mecanismos de resistência <sup>8,9</sup>.",

      meaning:
        "A resistência passou a comprometer também medicamentos considerados recursos terapêuticos de última linha."

    },

    "2018":{
      tabId:"timelineTab2018",

      title:
     "2018 — Consolidação nacional dos critérios BrCAST/EUCAST",
      image:
        "../../assets/capitulo-01/imagens/2018-brcast-eucast.png",

      alt:
        "Representação de laudo de teste de suscetibilidade interpretado segundo critérios BrCAST e EUCAST.",

      caption:
        "A adoção nacional dos critérios BrCAST/EUCAST contribuiu para uniformizar a interpretação dos testes de suscetibilidade no Brasil.",

      text:
        "Em 2018, avançou no Brasil o processo de implementação dos critérios interpretativos baseados no EUCAST e adaptados pelo BrCAST para os testes de suscetibilidade aos antimicrobianos. Essa padronização contribuiu para uniformizar os laudos microbiológicos e apoiar a interpretação clínica dos resultados <sup>10–14</sup>.",
      meaning:
  	"A qualidade da antibioticoterapia passou a depender também de critérios laboratoriais padronizados e continuamente atualizados."
    }
  };

  let transitionTimer = null;

  function updateProgress(key){
    if(!progressFill) return;

    const index = buttons.findIndex(function(button){
      return button.dataset.year === key;
    });

    const percentage = buttons.length > 1
      ? ((index + 1) / buttons.length) * 100
      : 100;

    progressFill.style.width = percentage + "%";
  }

  function updateButtonStates(activeButton){
    buttons.forEach(function(button){
      const isActive = button === activeButton;

      button.classList.toggle(
        "active",
        isActive
      );

      button.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      button.setAttribute(
        "tabindex",
        isActive ? "0" : "-1"
      );
    });
  }

  function render(key){
    const item = data[key];

    if(!item) return;

    if(transitionTimer){
      window.clearTimeout(transitionTimer);
    }

    content.classList.add("is-changing");

    transitionTimer = window.setTimeout(function(){
      content.setAttribute(
        "aria-labelledby",
        item.tabId
      );

      content.innerHTML = `
        <article class="timeline-card">

          <h3 class="timeline-title">
            ${item.title}
          </h3>

          <div class="timeline-block">

            <figure class="timeline-figure">

              <button
                class="cap1-zoomTrigger"
                type="button"
                data-zoom="${item.image}"
                data-zoom-image="${item.image}"
                data-zoom-alt="${item.alt}"
                data-zoom-caption="${item.caption.replace(/"/g, "&quot;")}"
                aria-label="Ampliar imagem: ${item.alt}"
              >
                <img
                  src="${item.image}"
                  alt="${item.alt}"
                />
              </button>

              <figcaption class="timeline-caption">
                ${item.caption}
              </figcaption>

            </figure>

            <p class="timeline-text">
              ${item.text}
            </p>

            <div class="timeline-meaning">
              <span class="timeline-meaning__label">
                O que mudou
              </span>

              <span class="timeline-meaning__text">
                ${item.meaning}
              </span>
            </div>

          </div>

        </article>
      `;

      content.classList.remove("is-changing");
      updateProgress(key);

      document.dispatchEvent(
        new CustomEvent("cap1:timeline-rendered")
      );
    }, 120);
  }

  function activate(button, moveFocus){
    if(!button) return;

    const key = button.dataset.year;

    updateButtonStates(button);
    render(key);

    if(moveFocus){
      button.focus();
    }

    if(
      window.innerWidth <= 760 &&
      typeof button.scrollIntoView === "function"
    ){
      button.scrollIntoView({
        behavior:"smooth",
        block:"nearest",
        inline:"center"
      });
    }
  }

  buttons.forEach(function(button, index){

    button.addEventListener("click", function(){
      activate(button, false);
    });

    button.addEventListener("keydown", function(event){
      let nextIndex = null;

      if(
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ){
        nextIndex =
          (index + 1) % buttons.length;
      }

      if(
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ){
        nextIndex =
          (index - 1 + buttons.length) %
          buttons.length;
      }

      if(event.key === "Home"){
        nextIndex = 0;
      }

      if(event.key === "End"){
        nextIndex = buttons.length - 1;
      }

      if(nextIndex === null) return;

      event.preventDefault();

      activate(
        buttons[nextIndex],
        true
      );
    });
  });

  activate(buttons[0], false);
})();
/* =====================================================
   PÁGINA 3 — BASES CONCEITUAIS DA ANTIBIOTICOTERAPIA
   ===================================================== */

(function initCap1Page3Concepts(){
  const root = document.querySelector(
    ".cap1-page3 [data-cap1-concepts]"
  );

  if(!root) return;

  const triggers = Array.from(
    root.querySelectorAll("[data-concept-tab]")
  );

  const panes = Array.from(
    root.querySelectorAll("[data-concept-pane]")
  );

  const panel = root.querySelector(
    "[data-concept-panel]"
  );

  if(
    !triggers.length ||
    !panes.length ||
    !panel
  ){
    return;
  }

  const panelThemes = {
    antimicrobianos:{
      background:"#f8fafc",
      border:"#6faec7"
    },

    antibacterianos:{
      background:"#eef7fb",
      border:"#4f8ea8"
    },

    naturais:{
      background:"#edf8f3",
      border:"#78b99d"
    },

    semissinteticos:{
      background:"#fff6ee",
      border:"#d99a3d"
    },

    sinteticos:{
      background:"#f2f0fb",
      border:"#8a78bf"
    }
  };

  let currentKey = "antimicrobianos";
  let transitionTimer = null;
  let guideTimer = null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function getTrigger(key){
    return triggers.find(function(trigger){
      return trigger.dataset.conceptTab === key;
    });
  }

  function getPane(key){
    return panes.find(function(pane){
      return pane.dataset.conceptPane === key;
    });
  }

  function updateTriggerState(key){
    triggers.forEach(function(trigger){
      const isActive =
        trigger.dataset.conceptTab === key;

      trigger.classList.toggle(
        "is-active",
        isActive
      );

      trigger.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      trigger.setAttribute(
        "tabindex",
        isActive ? "0" : "-1"
      );
    });
  }

  function updatePanelTheme(key){
    const theme = panelThemes[key];

    if(!theme) return;

    panel.style.background =
      theme.background;

    panel.style.borderLeftColor =
      theme.border;
  }

  function showPane(key){
    panes.forEach(function(pane){
      const isActive =
        pane.dataset.conceptPane === key;

      pane.hidden = !isActive;

      pane.classList.toggle(
        "is-active",
        isActive
      );
    });
  }

  function removeInitialGuide(){
    const guidedTrigger = root.querySelector(
      ".is-guided"
    );

    if(guidedTrigger){
      guidedTrigger.classList.remove(
        "is-guided"
      );
    }

    if(guideTimer){
      window.clearTimeout(guideTimer);
      guideTimer = null;
    }
  }

  function activateConcept(key, moveFocus){
    const targetTrigger = getTrigger(key);
    const targetPane = getPane(key);

    if(!targetTrigger || !targetPane){
      return;
    }

    removeInitialGuide();

    if(key === currentKey){
      if(moveFocus){
        targetTrigger.focus();
      }

      return;
    }

    if(transitionTimer){
      window.clearTimeout(
        transitionTimer
      );
    }

    panel.classList.add(
      "is-changing"
    );

    transitionTimer = window.setTimeout(
      function(){
        currentKey = key;

        updateTriggerState(key);
        showPane(key);
        updatePanelTheme(key);

        panel.classList.remove(
          "is-changing"
        );

        if(moveFocus){
          targetTrigger.focus();
        }
      },
      prefersReducedMotion ? 0 : 150
    );
  }

  triggers.forEach(function(trigger, index){

    trigger.addEventListener(
      "click",
      function(){
        activateConcept(
          trigger.dataset.conceptTab,
          false
        );
      }
    );

    trigger.addEventListener(
      "keydown",
      function(event){
        let nextIndex = null;

        if(
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ){
          nextIndex =
            (index + 1) % triggers.length;
        }

        if(
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ){
          nextIndex =
            (index - 1 + triggers.length) %
            triggers.length;
        }

        if(event.key === "Home"){
          nextIndex = 0;
        }

        if(event.key === "End"){
          nextIndex =
            triggers.length - 1;
        }

        if(nextIndex === null){
          return;
        }

        event.preventDefault();

        activateConcept(
          triggers[nextIndex].dataset.conceptTab,
          true
        );
      }
    );
  });

  updateTriggerState(currentKey);
  showPane(currentKey);
  updatePanelTheme(currentKey);

  if(!prefersReducedMotion){
    guideTimer = window.setTimeout(
      removeInitialGuide,
      1300
    );
  }else{
    removeInitialGuide();
  }
})();
/* =====================================================
   PÁGINA 4 — TOXICIDADE SELETIVA
   ===================================================== */

(function initCap1Page4Selectivity(){
  const root = document.querySelector(
    ".cap1-page4 [data-cap1-selectivity]"
  );

  if(!root) return;

  const triggers = Array.from(
    root.querySelectorAll("[data-selectivity-tab]")
  );

  const panes = Array.from(
    root.querySelectorAll("[data-selectivity-pane]")
  );

  const panel = root.querySelector(
    "[data-selectivity-panel]"
  );

  if(
    !triggers.length ||
    !panes.length ||
    !panel
  ){
    return;
  }

  const themes = {
    targets:{
      background:"#f8fafc",
      border:"#6faec7"
    },

    limits:{
      background:"#faf9fd",
      border:"#8a78bf"
    }
  };

  let currentKey = "targets";
  let transitionTimer = null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function getTrigger(key){
    return triggers.find(function(trigger){
      return trigger.dataset.selectivityTab === key;
    });
  }

  function getPane(key){
    return panes.find(function(pane){
      return pane.dataset.selectivityPane === key;
    });
  }

  function updateTriggerState(key){
    triggers.forEach(function(trigger){
      const isActive =
        trigger.dataset.selectivityTab === key;

      trigger.classList.toggle(
        "is-active",
        isActive
      );

      trigger.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      trigger.setAttribute(
        "tabindex",
        isActive ? "0" : "-1"
      );
    });
  }

  function showPane(key){
    panes.forEach(function(pane){
      const isActive =
        pane.dataset.selectivityPane === key;

      pane.hidden = !isActive;

      pane.classList.toggle(
        "is-active",
        isActive
      );
    });
  }

  function updateTheme(key){
    const theme = themes[key];

    if(!theme) return;

    panel.style.background =
      theme.background;

    panel.style.borderLeftColor =
      theme.border;
  }

  function activate(key, moveFocus){
    const targetTrigger = getTrigger(key);
    const targetPane = getPane(key);

    if(!targetTrigger || !targetPane){
      return;
    }

    if(key === currentKey){
      if(moveFocus){
        targetTrigger.focus();
      }

      return;
    }

    if(transitionTimer){
      window.clearTimeout(
        transitionTimer
      );
    }

    panel.classList.add(
      "is-changing"
    );

    transitionTimer = window.setTimeout(
      function(){
        currentKey = key;

        updateTriggerState(key);
        showPane(key);
        updateTheme(key);

        panel.setAttribute(
          "aria-labelledby",
          targetTrigger.id
        );

        panel.classList.remove(
          "is-changing"
        );

        if(moveFocus){
          targetTrigger.focus();
        }
      },
      prefersReducedMotion ? 0 : 140
    );
  }

  triggers.forEach(function(trigger, index){

    trigger.addEventListener(
      "click",
      function(){
        activate(
          trigger.dataset.selectivityTab,
          false
        );
      }
    );

    trigger.addEventListener(
      "keydown",
      function(event){
        let nextIndex = null;

        if(
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ){
          nextIndex =
            (index + 1) % triggers.length;
        }

        if(
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ){
          nextIndex =
            (index - 1 + triggers.length) %
            triggers.length;
        }

        if(event.key === "Home"){
          nextIndex = 0;
        }

        if(event.key === "End"){
          nextIndex =
            triggers.length - 1;
        }

        if(nextIndex === null){
          return;
        }

        event.preventDefault();

        activate(
          triggers[nextIndex].dataset.selectivityTab,
          true
        );
      }
    );
  });

  updateTriggerState(currentKey);
  showPane(currentKey);
  updateTheme(currentKey);
})();
/* =====================================================
   PÁGINA 5 — JANELA TERAPÊUTICA
   ===================================================== */

(function initCap1Page5Window(){
  const root = document.querySelector(
    ".cap1-page5 [data-cap1-window]"
  );

  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-window-tab]")
  );

  const scenes = Array.from(
    root.querySelectorAll("[data-window-scene]")
  );

  const feedback = root.querySelector(
    "[data-window-feedback]"
  );

  const state = root.querySelector(
    "[data-window-state]"
  );

  const text = root.querySelector(
    "[data-window-text]"
  );

  const svgDescription = root.querySelector(
    "[data-window-svg-desc]"
  );

  if(
    !tabs.length ||
    !scenes.length ||
    !feedback ||
    !state ||
    !text
  ){
    return;
  }

  const scenarioMap = {
    low:{
      tabId:"cap1P05TabLow",
      title:"Baixa exposição",
      text:
        "A concentração não alcança o nível mínimo necessário para produzir efeito terapêutico adequado. A resposta pode ser insuficiente e a infecção pode persistir.",
      description:
        "Cenário de baixa exposição: a curva permanece abaixo do limiar mínimo eficaz durante todo o período.",
      className:"cap1-p05-feedback--low"
    },

    ok:{
      tabId:"cap1P05TabOk",
      title:"Faixa terapêutica",
      text:
        "A concentração permanece entre o limiar de eficácia e o limiar associado ao aumento da toxicidade, favorecendo o efeito terapêutico com segurança relativa.",
      description:
        "Cenário terapêutico: a curva alcança a janela terapêutica sem ultrapassar o limiar de toxicidade.",
      className:"cap1-p05-feedback--ok"
    },

    high:{
      tabId:"cap1P05TabHigh",
      title:"Exposição excessiva",
      text:
        "A concentração ultrapassa a faixa terapêutica e aumenta a probabilidade de efeitos adversos relacionados ao medicamento.",
      description:
        "Cenário de exposição excessiva: a curva ultrapassa o limiar de toxicidade antes de retornar a níveis inferiores.",
      className:"cap1-p05-feedback--high"
    }
  };

  const feedbackClasses = [
    "cap1-p05-feedback--low",
    "cap1-p05-feedback--ok",
    "cap1-p05-feedback--high"
  ];

  let currentKey = "ok";
  let transitionTimer = null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function getTab(key){
    return tabs.find(function(tab){
      return tab.dataset.windowTab === key;
    });
  }

  function updateTabs(key){
    tabs.forEach(function(tab){
      const isActive =
        tab.dataset.windowTab === key;

      tab.classList.toggle(
        "is-active",
        isActive
      );

      tab.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      tab.setAttribute(
        "tabindex",
        isActive ? "0" : "-1"
      );
    });
  }

  function updateScenes(key){
    scenes.forEach(function(scene){
      const isActive =
        scene.dataset.windowScene === key;

      scene.classList.toggle(
        "is-active",
        isActive
      );

      if(isActive){
        const curve = scene.querySelector(
          ".cap1-p05-curve"
        );

        if(curve && !prefersReducedMotion){
          curve.style.animation = "none";

          void curve.getBoundingClientRect();

          curve.style.animation = "";
        }
      }
    });
  }

  function updateFeedback(key){
    const scenario = scenarioMap[key];

    if(!scenario) return;

    feedbackClasses.forEach(function(className){
      feedback.classList.remove(className);
    });

    feedback.classList.add(
      scenario.className
    );

    feedback.setAttribute(
      "aria-labelledby",
      scenario.tabId
    );

    state.textContent =
      scenario.title;

    text.textContent =
      scenario.text;

    if(svgDescription){
      svgDescription.textContent =
        scenario.description;
    }
  }

  function activate(key, moveFocus){
    const scenario = scenarioMap[key];
    const targetTab = getTab(key);

    if(!scenario || !targetTab){
      return;
    }

    if(key === currentKey){
      if(moveFocus){
        targetTab.focus();
      }

      return;
    }

    if(transitionTimer){
      window.clearTimeout(
        transitionTimer
      );
    }

    feedback.classList.add(
      "is-changing"
    );

    transitionTimer = window.setTimeout(
      function(){
        currentKey = key;

        updateTabs(key);
        updateScenes(key);
        updateFeedback(key);

        feedback.classList.remove(
          "is-changing"
        );

        if(moveFocus){
          targetTab.focus();
        }
      },
      prefersReducedMotion ? 0 : 130
    );
  }

  tabs.forEach(function(tab, index){

    tab.addEventListener(
      "click",
      function(){
        activate(
          tab.dataset.windowTab,
          false
        );
      }
    );

    tab.addEventListener(
      "keydown",
      function(event){
        let nextIndex = null;

        if(
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ){
          nextIndex =
            (index + 1) % tabs.length;
        }

        if(
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ){
          nextIndex =
            (index - 1 + tabs.length) %
            tabs.length;
        }

        if(event.key === "Home"){
          nextIndex = 0;
        }

        if(event.key === "End"){
          nextIndex =
            tabs.length - 1;
        }

        if(nextIndex === null){
          return;
        }

        event.preventDefault();

        activate(
          tabs[nextIndex].dataset.windowTab,
          true
        );
      }
    );
  });

  updateTabs(currentKey);
  updateScenes(currentKey);
  updateFeedback(currentKey);
})();
/* =====================================================
   PÁGINA 6 — ESPECTRO DE AÇÃO
   ===================================================== */

(function initPage6Spectrum(){
  const root = document.querySelector(
    ".cap1-page6 [data-cap1-spectrum]"
  );

  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-spectrum-tab]")
  );

  const panel = root.querySelector("[data-spectrum-panel]");
  const kicker = root.querySelector("[data-spectrum-kicker]");
  const title = root.querySelector("[data-spectrum-title]");
  const definition = root.querySelector("[data-spectrum-definition]");
  const example = root.querySelector("[data-spectrum-example]");
  const limitation = root.querySelector("[data-spectrum-limitation]");
  const clinical = root.querySelector("[data-spectrum-clinical]");

  const domains = {
    gp:root.querySelector('[data-spectrum-domain="gp"]'),
    gn:root.querySelector('[data-spectrum-domain="gn"]'),
    anaerobes:root.querySelector('[data-spectrum-domain="anaerobes"]'),
    atypicals:root.querySelector('[data-spectrum-domain="atypicals"]')
  };

  if(
    !tabs.length || !panel || !kicker || !title || !definition ||
    !example || !limitation || !clinical ||
    Object.values(domains).some(function(item){ return !item; })
  ){
    return;
  }

  const scenarios = {
    "restrito-gp":{
      tabId:"cap1P06TabGp",
      theme:"cap1-p06-profile--restrito-gp",
      kicker:"Perfil de espectro estreito",
      title:"Direcionado a determinados Gram-positivos",
      example:"Vancomicina",
      definition:
        "A atividade concentra-se em um conjunto relativamente limitado de bactérias. A vancomicina atua contra determinadas espécies Gram-positivas quando suscetíveis.",
      limitation:
        "A molécula não atravessa adequadamente a membrana externa das bactérias Gram-negativas.",
      clinical:
        "O espectro relativamente estreito pode ser adequado quando há suspeita ou confirmação de uma bactéria Gram-positiva suscetível.",
      coverage:{
        gp:{text:"Atividade em suscetíveis", state:"active"},
        gn:{text:"Sem atividade esperada", state:"none"},
        anaerobes:{text:"Alguns Gram-positivos", state:"limited"},
        atypicals:{text:"Sem atividade esperada", state:"none"}
      }
    },

    "restrito-gn":{
      tabId:"cap1P06TabGn",
      theme:"cap1-p06-profile--restrito-gn",
      kicker:"Perfil de espectro estreito",
      title:"Direcionado a bacilos Gram-negativos aeróbios",
      example:"Aztreonam",
      definition:
        "A atividade concentra-se em bacilos Gram-negativos aeróbios suscetíveis, caracterizando um perfil estreito e direcionado.",
      limitation:
        "Não apresenta atividade clinicamente relevante contra Gram-positivos, anaeróbios ou bactérias atípicas.",
      clinical:
        "Seu perfil pode ser útil quando a cobertura necessária está direcionada a bacilos Gram-negativos aeróbios suscetíveis.",
      coverage:{
        gp:{text:"Sem atividade esperada", state:"none"},
        gn:{text:"Bacilos aeróbios suscetíveis", state:"active"},
        anaerobes:{text:"Sem atividade esperada", state:"none"},
        atypicals:{text:"Sem atividade esperada", state:"none"}
      }
    },

    "amplo":{
      tabId:"cap1P06TabAmplo",
      theme:"cap1-p06-profile--amplo",
      kicker:"Perfil de amplo espectro",
      title:"Abrangência de diferentes grupos bacterianos",
      example:"Amoxicilina com clavulanato",
      definition:
        "O amplo espectro abrange uma diversidade relativamente maior de espécies bacterianas, podendo incluir Gram-positivos, Gram-negativos e anaeróbios suscetíveis.",
      limitation:
        "Amplo espectro não significa cobertura universal: não se espera atividade adequada contra MRSA, <em>Pseudomonas aeruginosa</em> ou bactérias atípicas.",
      clinical:
        "Pode ser necessário quando diferentes agentes etiológicos são possíveis, mas deve ser reavaliado diante dos resultados clínicos e microbiológicos.",
      coverage:{
        gp:{text:"Atividade variável", state:"limited"},
        gn:{text:"Atividade variável", state:"limited"},
        anaerobes:{text:"Diversos suscetíveis", state:"active"},
        atypicals:{text:"Sem atividade esperada", state:"none"}
      }
    }
  };

  const themes = [
    "cap1-p06-profile--restrito-gp",
    "cap1-p06-profile--restrito-gn",
    "cap1-p06-profile--amplo"
  ];

  let currentKey = "restrito-gp";
  let transitionTimer = null;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  function updateStatus(element, item){
    element.classList.remove("is-active", "is-limited", "is-none");
    element.classList.add("is-" + item.state);
    element.textContent = item.text;
  }

  function render(key){
    const item = scenarios[key];

    if(!item) return;

    tabs.forEach(function(tab){
      const selected = tab.dataset.spectrumTab === key;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      tab.setAttribute("tabindex", selected ? "0" : "-1");
    });

    themes.forEach(function(theme){ panel.classList.remove(theme); });
    panel.classList.add(item.theme);
    panel.setAttribute("aria-labelledby", item.tabId);

    kicker.textContent = item.kicker;
    title.textContent = item.title;
    definition.textContent = item.definition;
    example.textContent = item.example;
    limitation.innerHTML = item.limitation;
    clinical.textContent = item.clinical;

    Object.keys(domains).forEach(function(keyName){
      updateStatus(domains[keyName], item.coverage[keyName]);
    });
  }

  function activate(key, moveFocus){
    const targetTab = tabs.find(function(tab){
      return tab.dataset.spectrumTab === key;
    });

    if(!scenarios[key] || !targetTab) return;

    if(key === currentKey){
      if(moveFocus) targetTab.focus();
      return;
    }

    if(transitionTimer) window.clearTimeout(transitionTimer);
    panel.classList.add("is-changing");

    transitionTimer = window.setTimeout(function(){
      currentKey = key;
      render(key);
      panel.classList.remove("is-changing");
      if(moveFocus) targetTab.focus();
    }, prefersReducedMotion ? 0 : 130);
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener("click", function(){
      activate(tab.dataset.spectrumTab, false);
    });

    tab.addEventListener("keydown", function(event){
      let nextIndex = null;

      if(event.key === "ArrowRight" || event.key === "ArrowDown"){
        nextIndex = (index + 1) % tabs.length;
      }else if(event.key === "ArrowLeft" || event.key === "ArrowUp"){
        nextIndex = (index - 1 + tabs.length) % tabs.length;
      }else if(event.key === "Home"){
        nextIndex = 0;
      }else if(event.key === "End"){
        nextIndex = tabs.length - 1;
      }

      if(nextIndex === null) return;
      event.preventDefault();
      activate(tabs[nextIndex].dataset.spectrumTab, true);
    });
  });

  render(currentKey);
})();
/* =====================================================
   PÁGINA 7 — COLONIZAÇÃO, CONTAMINAÇÃO E INFECÇÃO
   ===================================================== */

(function initPage7Decision(){
  const root = document.querySelector(
    ".cap1-page7 [data-p07-decision]"
  );

  if(!root) return;

  const step = document.getElementById("p07Step");
  const caseType = document.getElementById("p07CaseType");
  const caseTitle = document.getElementById("p07CaseTitle");
  const caseText = document.getElementById("p07CaseText");
  const feedback = document.getElementById("p07Feedback");
  const evidence = document.getElementById("p07Evidence");

  const evidenceMicroorganism = document.getElementById(
    "p07EvidenceMicroorganism"
  );

  const evidenceInflammation = document.getElementById(
    "p07EvidenceInflammation"
  );

  const evidenceMeaning = document.getElementById(
    "p07EvidenceMeaning"
  );

  const prevButton = document.getElementById("p07Prev");
  const nextButton = document.getElementById("p07Next");
  const summary = document.getElementById("p07Summary");

  const answerButtons = Array.from(
    root.querySelectorAll("[data-p07-answer]")
  );

  const dots = Array.from(
    root.querySelectorAll(".cap1-p07-dots span")
  );

  if(
    !step ||
    !caseType ||
    !caseTitle ||
    !caseText ||
    !feedback ||
    !evidence ||
    !evidenceMicroorganism ||
    !evidenceInflammation ||
    !evidenceMeaning ||
    !prevButton ||
    !nextButton ||
    !summary ||
    !answerButtons.length
  ){
    return;
  }

  const cases = [
    {
      type:"Resultado urinário",

      title:"Urocultura positiva sem sintomas",

      text:
        'Paciente sem sintomas urinários apresenta urocultura com crescimento de <em>Escherichia coli</em> em contagem significativa, sem sinais clínicos ou laboratoriais atribuíveis à infecção urinária.',

      correct:"colonizacao",

      correctTitle:"Interpretação adequada: colonização",

      correctText:
        "O achado é compatível com bacteriúria assintomática: há presença bacteriana sem sinais ou sintomas atribuíveis à infecção urinária. Em geral, essa condição não requer tratamento, exceto em situações específicas, como gestação e antes de determinados procedimentos urológicos.",

      evidence:{
        microorganism:"Microrganismo presente",
        inflammation:"Sem resposta inflamatória atribuível",
        meaning:"Interpretação: bacteriúria assintomática"
      }
    },

    {
      type:"Qualidade da amostra",

      title:"Hemocultura positiva em apenas um frasco",

      text:
        'Paciente sem febre ou sinais de infecção sistêmica apresenta crescimento de <em>Staphylococcus</em> coagulase-negativo em apenas um dos frascos de hemocultura. As demais amostras permanecem negativas.',

      correct:"contaminacao",

      correctTitle:"Interpretação adequada: contaminação",

      correctText:
        "A ausência de correlação clínica e o crescimento em apenas um frasco tornam a contaminação durante a coleta a interpretação mais provável. Entretanto, estafilococos coagulase-negativos podem representar infecção verdadeira em pacientes com cateteres, próteses, dispositivos implantados ou imunossupressão e quando há crescimento concordante em múltiplas amostras.",

      evidence:{
        microorganism:"Microrganismo detectado na amostra",
        inflammation:"Sem evidências clínicas compatíveis",
        meaning:"Interpretação: provável contaminação"
      }
    },

    {
      type:"Correlação clínico-radiológica",

      title:"Pneumonia com isolamento compatível",

      text:
        'Paciente apresenta febre, tosse produtiva, taquipneia e infiltrado pulmonar novo. Amostra respiratória adequada demonstra crescimento predominante de bactéria compatível com o quadro clínico.',

      correct:"infeccao",

      correctTitle:"Interpretação adequada: infecção",

      correctText:
        "Há integração entre manifestações clínicas, achado radiológico e resultado microbiológico plausível. O conjunto sustenta a interpretação de processo infeccioso ativo.",

      evidence:{
        microorganism:"Microrganismo compatível com o sítio",
        inflammation:"Manifestações clínicas presentes",
        meaning:"Interpretação: infecção"
      }
    }
  ];

  let currentIndex = 0;
  const responses = new Array(cases.length).fill(null);

  function resetFeedback(){
    feedback.classList.remove(
      "is-correct",
      "is-incorrect"
    );

    feedback.innerHTML = `
      <strong>Analise o contexto clínico.</strong>
      <p>
        Considere sintomas, resposta inflamatória, qualidade da amostra e
        coerência entre o microrganismo e o sítio de coleta.
      </p>
    `;

    evidence.hidden = true;

    answerButtons.forEach(function(button){
      button.classList.remove(
        "is-selected",
        "is-correct",
        "is-incorrect"
      );

      button.disabled = false;
    });
  }

  function updateDots(){
    dots.forEach(function(dot, index){
      dot.classList.toggle(
        "is-active",
        index === currentIndex
      );

      dot.classList.toggle(
        "is-answered",
        responses[index] !== null
      );
    });
  }

  function renderCase(){
    const item = cases[currentIndex];

    step.textContent =
      "Situação " +
      (currentIndex + 1) +
      " de " +
      cases.length;

    caseType.textContent =
      item.type;

    caseTitle.textContent =
      item.title;

    caseText.innerHTML =
      item.text;

    prevButton.disabled =
      currentIndex === 0;

    nextButton.textContent =
      currentIndex === cases.length - 1
        ? "Ver síntese →"
        : "Próxima situação →";

    summary.hidden = true;

    resetFeedback();
    updateDots();

    if(responses[currentIndex]){
      const previousButton = answerButtons.find(function(button){
        return button.dataset.p07Answer === responses[currentIndex];
      });

      if(previousButton){
        presentAnswer(previousButton, false);
      }
    }
  }

  function showEvidence(item){
    evidenceMicroorganism.textContent =
      item.evidence.microorganism;

    evidenceInflammation.textContent =
      item.evidence.inflammation;

    evidenceMeaning.textContent =
      item.evidence.meaning;

    evidence.hidden = false;
  }

  function presentAnswer(button, saveResponse){
    const item = cases[currentIndex];
    const selected = button.dataset.p07Answer;
    const isCorrect = selected === item.correct;

    answerButtons.forEach(function(answerButton){
      answerButton.disabled = true;

      answerButton.classList.toggle(
        "is-selected",
        answerButton === button
      );

      if(
        answerButton.dataset.p07Answer === item.correct
      ){
        answerButton.classList.add(
          "is-correct"
        );
      }
    });

    if(!isCorrect){
      button.classList.add(
        "is-incorrect"
      );
    }

    feedback.classList.remove(
      "is-correct",
      "is-incorrect"
    );

    if(isCorrect){
      feedback.classList.add(
        "is-correct"
      );

      feedback.innerHTML = `
        <strong>Interpretação mais adequada.</strong>
        <p>${item.correctText}</p>
      `;
    }else{
      feedback.classList.add(
        "is-incorrect"
      );

      feedback.innerHTML = `
        <strong>Considere novamente os dados clínicos.</strong>
        <p>
          ${item.correctText}
        </p>
      `;
    }

    if(saveResponse){
      responses[currentIndex] = selected;
      updateDots();
    }

    showEvidence(item);
  }

  answerButtons.forEach(function(button){
    button.addEventListener(
      "click",
      function(){
        presentAnswer(button, true);
      }
    );
  });

  prevButton.addEventListener(
    "click",
    function(){
      if(currentIndex === 0){
        return;
      }

      currentIndex -= 1;
      renderCase();
    }
  );

  nextButton.addEventListener(
    "click",
    function(){
      if(currentIndex < cases.length - 1){
        currentIndex += 1;
        renderCase();
        return;
      }

      summary.hidden = false;

      summary.scrollIntoView({
        behavior:window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth",
        block:"nearest"
      });
    }
  );

  renderCase();
})();
/* =====================================================
   PÁGINA 8 — TERAPIA EMPÍRICA E TERAPIA DIRIGIDA
   ===================================================== */

(function initPage8Therapy(){
  const root = document.querySelector(
    ".cap1-page8 [data-cap1-therapy]"
  );

  if(!root) return;

  const steps = [
    {
      flow:0,
      title:"Suspeita clínica de infecção grave",
      caseText:
        "Paciente idoso é internado com pneumonia adquirida na comunidade, febre, dispneia e instabilidade hemodinâmica.",
      question:"Qual princípio deve orientar a abordagem inicial?",
      options:[
        {
          key:"aguardar",
          label:"Aguardar a identificação definitiva do agente antes de organizar qualquer intervenção.",
          correct:false
        },
        {
          key:"reconhecer",
          label:"Reconhecer a gravidade e iniciar imediatamente a abordagem diagnóstica e terapêutica.",
          correct:true
        },
        {
          key:"colonizacao",
          label:"Interpretar o quadro como colonização até que uma cultura confirme a infecção.",
          correct:false
        }
      ],
      correctTitle:"Decisão mais apropriada neste momento.",
      correctText:
        "A instabilidade hemodinâmica indica risco de progressão. A prioridade é reconhecer a gravidade, obter amostras adequadas sem atraso relevante e organizar o início precoce da terapia empírica."
    },
    {
      flow:1,
      title:"Coleta de culturas",
      caseText:
        "Antes da primeira dose, há possibilidade de obter hemoculturas e amostra respiratória adequada sem atrasar significativamente o tratamento.",
      question:"Como integrar a coleta microbiológica ao tratamento?",
      options:[
        {
          key:"esperar_resultado",
          label:"Coletar as culturas e aguardar os resultados antes de iniciar o antibacteriano.",
          correct:false
        },
        {
          key:"coletar_iniciar",
          label:"Coletar as amostras prontamente e iniciar a terapia empírica sem atraso significativo.",
          correct:true
        },
        {
          key:"sem_coleta",
          label:"Iniciar o tratamento e dispensar a coleta porque o quadro clínico já é suficiente.",
          correct:false
        }
      ],
      correctTitle:"Decisão mais apropriada neste momento.",
      correctText:
        "As culturas devem ser coletadas antes da antibioticoterapia quando isso puder ser feito prontamente. A investigação microbiológica não deve provocar atraso clinicamente relevante no tratamento de uma infecção grave."
    },
    {
      flow:2,
      title:"Terapia empírica inicial",
      caseText:
        "Após a coleta, inicia-se um esquema empírico adequado à síndrome clínica, à gravidade e ao perfil epidemiológico local.",
      question:"Por que a cobertura inicial pode ser relativamente ampla?",
      options:[
        {
          key:"etiologia",
          label:"Porque o agente ainda é desconhecido e é necessário cobrir os patógenos prováveis.",
          correct:true
        },
        {
          key:"sempre",
          label:"Porque o esquema de amplo espectro deve ser mantido até o final do tratamento.",
          correct:false
        },
        {
          key:"sem_reavaliacao",
          label:"Porque uma cobertura ampla elimina a necessidade de reavaliação posterior.",
          correct:false
        }
      ],
      correctTitle:"Interpretação mais adequada.",
      correctText:
        "A cobertura empírica deve contemplar os agentes prováveis sem ser indiscriminada. Ela é uma estratégia inicial e precisa ser reavaliada diante da evolução clínica e dos resultados microbiológicos."
    },
    {
      flow:3,
      title:"Reavaliação em 48–72 horas",
      caseText:
        "A cultura identifica <em>Streptococcus pneumoniae</em> suscetível à penicilina e o paciente apresenta melhora clínica.",
      question:"Como os novos dados devem modificar o tratamento?",
      options:[
        {
          key:"manter_amplo",
          label:"Manter obrigatoriamente o esquema empírico inicial até o final do tratamento.",
          correct:false
        },
        {
          key:"descalonar",
          label:"Direcionar e descalonar para penicilina ou outro β-lactâmico apropriado.",
          correct:true
        },
        {
          key:"suspender",
          label:"Suspender todo antibacteriano apenas porque houve melhora clínica.",
          correct:false
        }
      ],
      correctTitle:"Direcionamento e descalonamento indicados.",
      correctText:
        "A identificação do agente e de sua suscetibilidade permite selecionar um esquema mais direcionado, desde que também sejam considerados o sítio da infecção, a exposição, a segurança e as características do paciente."
    }
  ];

  const stepBadge = root.querySelector("#p08Step");
  const title = root.querySelector("#p08Title");
  const caseBox = root.querySelector("#p08Case");
  const question = root.querySelector("#p08Question");
  const optionsBox = root.querySelector("#p08Options");
  const feedback = root.querySelector("#p08Feedback");
  const prev = root.querySelector("#p08Prev");
  const next = root.querySelector("#p08Next");
  const dots = Array.from(root.querySelectorAll(".cap1-p08-dots span"));
  const flowItems = Array.from(root.querySelectorAll("[data-p08-flow]"));
  const summary = root.querySelector("#p08Summary");

  if(
    !stepBadge || !title || !caseBox || !question || !optionsBox ||
    !feedback || !prev || !next || !dots.length || !flowItems.length
  ){
    return;
  }

  let current = 0;
  const responses = new Array(steps.length).fill(null);

  function showFeedback(item, selected){
    feedback.className =
      "cap1-p08-feedback " +
      (selected.correct ? "is-correct" : "is-wrong");

    feedback.innerHTML = `
      <strong>${selected.correct
        ? item.correctTitle
        : "Considere novamente o momento clínico."}</strong>
      <p>${selected.correct
        ? item.correctText
        : "Integre gravidade, oportunidade da coleta, necessidade de tratamento precoce e possibilidade de reavaliação posterior."}</p>
    `;
  }

  function updateProgress(){
    dots.forEach(function(dot, index){
      dot.classList.toggle("is-active", index === current);
      dot.classList.toggle("is-answered", responses[index] !== null);
    });

    flowItems.forEach(function(flow){
      const flowIndex = Number(flow.dataset.p08Flow);
      flow.classList.toggle("is-active", flowIndex === steps[current].flow);
      flow.classList.toggle("is-complete", flowIndex < steps[current].flow);
    });
  }

  function renderOptions(item){
    optionsBox.innerHTML = item.options.map(function(option){
      return (
        '<button type="button" data-p08-answer="' + option.key + '">' +
        option.label +
        "</button>"
      );
    }).join("");

    const buttons = Array.from(
      optionsBox.querySelectorAll("[data-p08-answer]")
    );

    buttons.forEach(function(button){
      button.addEventListener("click", function(){
        const selected = item.options.find(function(option){
          return option.key === button.dataset.p08Answer;
        });

        if(!selected) return;

        responses[current] = selected.key;

        buttons.forEach(function(itemButton){
          itemButton.classList.remove("is-correct", "is-wrong", "is-selected");
        });

        button.classList.add(
          "is-selected",
          selected.correct ? "is-correct" : "is-wrong"
        );

        showFeedback(item, selected);
        updateProgress();
      });
    });

    if(responses[current]){
      const saved = item.options.find(function(option){
        return option.key === responses[current];
      });
      const savedButton = buttons.find(function(button){
        return button.dataset.p08Answer === responses[current];
      });

      if(saved && savedButton){
        savedButton.classList.add(
          "is-selected",
          saved.correct ? "is-correct" : "is-wrong"
        );
        showFeedback(item, saved);
      }
    }
  }

  function renderStep(){
    const item = steps[current];

    stepBadge.textContent = "Etapa " + (current + 1) + " de " + steps.length;
    title.textContent = item.title;
    caseBox.innerHTML = item.caseText;
    question.textContent = item.question;

    feedback.className = "cap1-p08-feedback";
    feedback.innerHTML = `
      <strong>Analise o momento clínico.</strong>
      <p>
        Considere gravidade, oportunidade da coleta, necessidade de tratamento
        precoce e possibilidade de reavaliação.
      </p>
    `;

    renderOptions(item);

    prev.disabled = current === 0;
    next.disabled = current === steps.length - 1;
    updateProgress();

    if(summary){
      summary.hidden = current !== steps.length - 1;
    }
  }

  prev.addEventListener("click", function(){
    if(current > 0){
      current -= 1;
      renderStep();
    }
  });

  next.addEventListener("click", function(){
    if(current < steps.length - 1){
      current += 1;
      renderStep();
    }
  });

  renderStep();
})();
/* =====================================================
   PÁGINA 9 — PROFILAXIA ANTIBACTERIANA
   ===================================================== */

(function initPage9Prophylaxis(){
  const root = document.querySelector(
    ".cap1-page9 [data-cap1-prophylaxis]"
  );

  if(!root) return;

  const cases = [
    {
      title:"Procedimento cirúrgico com risco definido",
      caseText:
        "Paciente sem infecção ativa será submetido a procedimento cirúrgico com indicação estabelecida de prevenção da infecção do sítio cirúrgico.",
      question:"Qual estratégia corresponde a este momento clínico?",
      correct:"profilaxia",
      options:[
        {
          key:"empirica",
          label:"Iniciar terapia empírica porque ainda não há cultura disponível."
        },
        {
          key:"profilaxia",
          label:"Realizar profilaxia no momento adequado e pelo período recomendado."
        },
        {
          key:"prolongada",
          label:"Manter o antibacteriano por vários dias, independentemente da evolução."
        }
      ],
      correctTitle:"Indicação profilática reconhecida.",
      correctText:
        "Não há infecção ativa, mas existe um risco previsível relacionado ao procedimento. A profilaxia deve produzir exposição adequada no momento da possível inoculação bacteriana, sem prolongamento desnecessário."
    },
    {
      title:"Neutropenia profunda e prolongada",
      caseText:
        "Paciente em tratamento de neoplasia hematológica apresenta previsão de neutropenia profunda por mais de sete dias, sem sinais atuais de infecção.",
      question:"Como interpretar o uso preventivo nesse contexto?",
      correct:"profilaxia",
      options:[
        {
          key:"profilaxia",
          label:"Pode constituir profilaxia em paciente de alto risco, limitada ao período definido."
        },
        {
          key:"dirigida",
          label:"É terapia dirigida, pois o agente etiológico já foi identificado."
        },
        {
          key:"empirica",
          label:"É obrigatoriamente terapia empírica, mesmo sem suspeita de infecção ativa."
        }
      ],
      correctTitle:"Profilaxia possível em contexto selecionado.",
      correctText:
        "A profilaxia pode ser considerada em pacientes com risco elevado de neutropenia profunda e prolongada. A decisão é individualizada e considera resistência local, efeitos adversos, interações e protocolo institucional."
    },
    {
      title:"Febre durante o período de neutropenia",
      caseText:
        "Durante o período de neutropenia, o paciente que recebia profilaxia desenvolve febre e instabilidade hemodinâmica.",
      question:"O que muda no objetivo do uso do antibacteriano?",
      correct:"empirica",
      options:[
        {
          key:"manter_profilaxia",
          label:"Manter apenas a profilaxia, pois ainda não há agente identificado."
        },
        {
          key:"empirica",
          label:"Investigar prontamente e iniciar terapia empírica adequada à suspeita de infecção."
        },
        {
          key:"aguardar",
          label:"Aguardar os resultados das culturas antes de modificar a estratégia."
        }
      ],
      correctTitle:"O objetivo passa a ser terapêutico.",
      correctText:
        "O surgimento de febre e instabilidade estabelece suspeita clínica de infecção ativa. A estratégia deixa de ser profilática e passa a exigir investigação e terapia empírica precoce, de acordo com o risco e o protocolo institucional."
    }
  ];

  const step = root.querySelector("#p09Step");
  const title = root.querySelector("#p09Title");
  const caseBox = root.querySelector("#p09Case");
  const question = root.querySelector("#p09Question");
  const optionsBox = root.querySelector("#p09Options");
  const feedback = root.querySelector("#p09Feedback");
  const prev = root.querySelector("#p09Prev");
  const next = root.querySelector("#p09Next");
  const dots = Array.from(root.querySelectorAll(".cap1-p09-dots span"));
  const summary = root.querySelector("#p09Summary");

  if(
    !step || !title || !caseBox || !question || !optionsBox ||
    !feedback || !prev || !next || !dots.length
  ){
    return;
  }

  let current = 0;
  const responses = new Array(cases.length).fill(null);

  function updateProgress(){
    dots.forEach(function(dot, index){
      dot.classList.toggle("is-active", index === current);
      dot.classList.toggle("is-answered", responses[index] !== null);
    });
  }

  function showFeedback(item, selectedKey){
    const isCorrect = selectedKey === item.correct;

    feedback.className =
      "cap1-p09-feedback " +
      (isCorrect ? "is-correct" : "is-wrong");

    feedback.innerHTML = `
      <strong>${isCorrect
        ? item.correctTitle
        : "Considere novamente o objetivo do uso."}</strong>
      <p>${isCorrect
        ? item.correctText
        : "Diferencie prevenção diante de risco definido, tratamento empírico de uma infecção suspeita e exposição sem indicação clínica."}</p>
    `;
  }

  function renderOptions(item){
    optionsBox.innerHTML = item.options.map(function(option){
      return (
        '<button type="button" data-p09-answer="' + option.key + '">' +
        option.label +
        "</button>"
      );
    }).join("");

    const buttons = Array.from(
      optionsBox.querySelectorAll("[data-p09-answer]")
    );

    buttons.forEach(function(button){
      button.addEventListener("click", function(){
        const selectedKey = button.dataset.p09Answer;
        responses[current] = selectedKey;

        buttons.forEach(function(itemButton){
          itemButton.classList.remove("is-correct", "is-wrong", "is-selected");
        });

        button.classList.add(
          "is-selected",
          selectedKey === item.correct ? "is-correct" : "is-wrong"
        );

        showFeedback(item, selectedKey);
        updateProgress();
      });
    });

    if(responses[current]){
      const savedButton = buttons.find(function(button){
        return button.dataset.p09Answer === responses[current];
      });

      if(savedButton){
        savedButton.classList.add(
          "is-selected",
          responses[current] === item.correct ? "is-correct" : "is-wrong"
        );
        showFeedback(item, responses[current]);
      }
    }
  }

  function renderCase(){
    const item = cases[current];

    step.textContent =
      "Situação " + (current + 1) + " de " + cases.length;
    title.textContent = item.title;
    caseBox.textContent = item.caseText;
    question.textContent = item.question;

    feedback.className = "cap1-p09-feedback";
    feedback.innerHTML = `
      <strong>Analise a indicação.</strong>
      <p>
        Considere se há apenas risco previsível ou se já existe suspeita de
        infecção ativa.
      </p>
    `;

    renderOptions(item);

    prev.disabled = current === 0;
    next.disabled = current === cases.length - 1;
    updateProgress();

    if(summary){
      summary.hidden = current !== cases.length - 1;
    }
  }

  prev.addEventListener("click", function(){
    if(current > 0){
      current -= 1;
      renderCase();
    }
  });

  next.addEventListener("click", function(){
    if(current < cases.length - 1){
      current += 1;
      renderCase();
    }
  });

  renderCase();
})();
/* =====================================================
   PÁGINA 10 — QUIZ DE REVISÃO
   ===================================================== */

(function initPage10Quiz(){
  const root = document.querySelector("[data-cap1-p10]");

  if(!root) return;

  const situations = [
    {
      caseText:
        "Paciente de 68 anos apresenta hemocultura positiva para <em>Staphylococcus</em> coagulase-negativo em apenas um frasco. Não há febre, sinais de infecção sistêmica ou resposta inflamatória significativa.",
      prompt:"Qual interpretação melhor integra os dados apresentados?",
      correct:"b",
      options:[
        {
          key:"a",
          label:"A cultura positiva confirma infecção sistêmica e exige tratamento imediato."
        },
        {
          key:"b",
          label:"O achado sugere provável contaminação e deve ser interpretado junto ao contexto clínico e à qualidade da coleta."
        },
        {
          key:"c",
          label:"O resultado deve ser desconsiderado sem avaliar o número de frascos, o microrganismo ou os fatores de risco."
        }
      ],
      feedback:{
        a:"Uma cultura positiva isoladamente não confirma infecção. O número de frascos positivos, o microrganismo, os dispositivos presentes e o quadro clínico precisam ser integrados.",
        b:"Nesse contexto, o isolamento em apenas um frasco, sem correlação clínica ou inflamatória, torna a contaminação durante a coleta a interpretação mais provável. Ainda assim, dispositivos intravasculares, próteses e imunossupressão devem ser considerados.",
        c:"O achado não deve ser automaticamente tratado nem simplesmente ignorado. É necessário avaliar a qualidade da coleta e sua coerência com o contexto clínico."
      }
    },
    {
      caseText:
        "Paciente com pneumonia grave iniciou terapia empírica após a coleta de culturas. Em 48–72 horas, identifica-se <em>Streptococcus pneumoniae</em> suscetível à penicilina, com melhora clínica.",
      prompt:"Como os novos dados devem orientar o tratamento?",
      correct:"b",
      options:[
        {
          key:"a",
          label:"Manter obrigatoriamente todo o esquema empírico de amplo espectro."
        },
        {
          key:"b",
          label:"Direcionar e descalonar para um β-lactâmico apropriado ao agente e ao sítio da infecção."
        },
        {
          key:"c",
          label:"Suspender imediatamente o tratamento apenas porque houve melhora clínica."
        }
      ],
      feedback:{
        a:"A manutenção do esquema inicial deve ser reavaliada quando a etiologia e a suscetibilidade se tornam conhecidas. Cobertura desnecessária amplia a exposição sem benefício adicional.",
        b:"A identificação do agente e de sua suscetibilidade permite direcionar e reduzir o espectro, desde que o medicamento escolhido alcance o sítio da infecção em exposição adequada.",
        c:"A melhora clínica isoladamente não determina suspensão. É necessário considerar diagnóstico, agente, sítio, evolução e duração apropriada."
      }
    },
    {
      caseText:
        "Paciente sem infecção ativa será submetido a procedimento cirúrgico com indicação estabelecida de prevenção da infecção do sítio cirúrgico.",
      prompt:"Qual estratégia corresponde a esse momento clínico?",
      correct:"b",
      options:[
        {
          key:"a",
          label:"Iniciar terapia empírica e aguardar culturas para decidir a duração."
        },
        {
          key:"b",
          label:"Administrar profilaxia adequada ao procedimento, no momento recomendado e sem prolongamento desnecessário."
        },
        {
          key:"c",
          label:"Manter antibacteriano por vários dias após a cirurgia, independentemente do protocolo."
        }
      ],
      feedback:{
        a:"Não existe infecção ativa ou suspeita clínica que caracterize terapia empírica. O objetivo é prevenir uma infecção diante de risco definido.",
        b:"A profilaxia cirúrgica depende da indicação correta, da atividade contra os microrganismos prováveis, da administração no momento adequado e da duração limitada.",
        c:"O prolongamento sem indicação não aumenta necessariamente a proteção e favorece efeitos adversos, alteração da microbiota e pressão seletiva."
      }
    }
  ];

  const progress = root.querySelector("[data-p10-progress]");
  const kicker = root.querySelector("[data-p10-kicker]");
  const caseBox = root.querySelector("[data-p10-case]");
  const prompt = root.querySelector("[data-p10-prompt]");
  const optionsBox = root.querySelector("[data-p10-options]");
  const confirmButton = root.querySelector("[data-p10-confirm]");
  const resetButton = root.querySelector("[data-p10-reset]");
  const feedback = root.querySelector("[data-p10-feedback]");
  const prevButton = root.querySelector("[data-p10-prev]");
  const nextButton = root.querySelector("[data-p10-next]");
  const dots = Array.from(root.querySelectorAll(".cap1-p10Dots span"));

  if(
    !progress || !kicker || !caseBox || !prompt || !optionsBox ||
    !confirmButton || !resetButton || !feedback || !prevButton ||
    !nextButton || !dots.length
  ){
    return;
  }

  let current = 0;
  const responses = situations.map(function(){
    return {selected:null, confirmed:false};
  });

  function updateNavigation(){
    const response = responses[current];

    prevButton.disabled = current === 0;
    nextButton.disabled =
      current === situations.length - 1 || !response.confirmed;

    nextButton.textContent =
      current === situations.length - 1
        ? "Última situação"
        : "Próxima situação →";

    dots.forEach(function(dot, index){
      dot.classList.toggle("is-active", index === current);
      dot.classList.toggle("is-answered", responses[index].confirmed);
    });
  }

  function showConfirmedState(item, response){
    const buttons = Array.from(
      optionsBox.querySelectorAll("[data-answer]")
    );
    const isCorrect = response.selected === item.correct;

    buttons.forEach(function(button){
      button.disabled = true;
      button.classList.remove("is-selected", "is-correct", "is-error");

      if(button.dataset.answer === item.correct){
        button.classList.add("is-correct");
      }

      if(button.dataset.answer === response.selected && !isCorrect){
        button.classList.add("is-error");
      }
    });

    feedback.className =
      "cap1-p10Feedback is-visible " +
      (isCorrect ? "is-correct" : "is-error");

    feedback.innerHTML = `
      <strong>${isCorrect
        ? "Interpretação mais adequada."
        : "Considere novamente os dados."}</strong>
      <p>${item.feedback[response.selected]}</p>
    `;

    confirmButton.hidden = true;
    resetButton.hidden = false;
  }

  function render(){
    const item = situations[current];
    const response = responses[current];
    const letters = ["A", "B", "C", "D"];

    progress.textContent =
      "Situação " + (current + 1) + " de " + situations.length;
    kicker.textContent = "Situação clínica " + (current + 1);
    caseBox.innerHTML = item.caseText;
    prompt.textContent = item.prompt;

    optionsBox.innerHTML = item.options.map(function(option, index){
      return `
        <button type="button" data-answer="${option.key}">
          <span class="cap1-p10Letter">${letters[index]}</span>
          <span>${option.label}</span>
        </button>
      `;
    }).join("");

    feedback.className = "cap1-p10Feedback";
    feedback.innerHTML = "";
    confirmButton.hidden = false;
    confirmButton.disabled = !response.selected;
    resetButton.hidden = true;

    const buttons = Array.from(
      optionsBox.querySelectorAll("[data-answer]")
    );

    buttons.forEach(function(button){
      if(!response.confirmed && button.dataset.answer === response.selected){
        button.classList.add("is-selected");
      }

      button.addEventListener("click", function(){
        if(response.confirmed) return;

        response.selected = button.dataset.answer;

        buttons.forEach(function(itemButton){
          itemButton.classList.toggle(
            "is-selected",
            itemButton === button
          );
        });

        confirmButton.disabled = false;
      });
    });

    if(response.confirmed){
      showConfirmedState(item, response);
    }

    updateNavigation();
  }

  confirmButton.addEventListener("click", function(){
    const response = responses[current];

    if(!response.selected) return;

    response.confirmed = true;
    showConfirmedState(situations[current], response);
    updateNavigation();
  });

  resetButton.addEventListener("click", function(){
    responses[current] = {selected:null, confirmed:false};
    render();
  });

  prevButton.addEventListener("click", function(){
    if(current > 0){
      current -= 1;
      render();
    }
  });

  nextButton.addEventListener("click", function(){
    if(
      current < situations.length - 1 &&
      responses[current].confirmed
    ){
      current += 1;
      render();
    }
  });

  render();
})();