/* =========================
   CAPÍTULO 5 — PÁGINA 39
   LIBERAÇÃO PROGRESSIVA DO LAUDO
   ========================= */

(function initCap5Page39V2(){
  const root = document.querySelector("[data-cap5-p39v2]");

  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-p39v2-target]")
  );

  const view = root.querySelector("#cap5P39V2View");
  const resultLabel = root.querySelector("#cap5P39V2ResultLabel");
  const resultText = root.querySelector("#cap5P39V2Result");
  const body = root.querySelector("#cap5P39V2Body");

  if(
    !tabs.length ||
    !view ||
    !resultLabel ||
    !resultText ||
    !body
  ){
    return;
  }

  const states = {
    gram:{
      tabId:"cap5P39V2TabGram",

      result:
        "Cocos Gram-positivos em cachos nos dois frascos.",

      question:
        "Considerando que o paciente já iniciou antibioticoterapia empírica, qual é a conduta mais adequada diante desse resultado preliminar?",

      options:[
        "Manter o esquema inicialmente prescrito até a identificação da espécie, pois a bacterioscopia fornece apenas informações sobre a morfologia e o arranjo bacteriano.",

        "Redirecionar o esquema para cocos Gram-positivos, considerando a concordância entre o resultado dos dois frascos, a presença do cateter e a instabilidade clínica.",

        "Revisar se o esquema iniciado contempla o grupo bacteriano sugerido e os fatores de risco do paciente, ajustando-o caso seja identificada possível falha de cobertura, sem restringir o tratamento apenas com base na bacterioscopia."
      ],

      correct:2,

      nextLabel:
        "Continuar para Identificação →",

      feedback:
        "A bacterioscopia deve levar à revisão da cobertura empírica, mas não determina sozinha a manutenção ou a modificação do tratamento. O achado sugere estafilococos, porém ainda não define a espécie, a fonte da infecção ou o perfil de suscetibilidade."
    },

    identificacao:{
      tabId:"cap5P39V2TabIdentificacao",

      result:
        "Microrganismo identificado nos dois frascos: <em>Staphylococcus aureus</em>.",

      question:
        "Como essa identificação deve modificar a interpretação do caso?",

      options:[
        "A presença do cateter, associada à identificação nos dois frascos, permite atribuir a ele a origem da infecção e concentrar a investigação nesse dispositivo.",

        "O isolamento deve ser considerado clinicamente relevante e levar à investigação da bacteremia e de suas possíveis fontes, incluindo o cateter, sem definir a origem apenas pelo resultado da hemocultura.",

        "Como o microrganismo pode colonizar a pele e os dois frascos pertencem à mesma coleta, o resultado deve permanecer como possível contaminação até a confirmação em uma nova amostra."
      ],

      correct:1,

      nextLabel:
        "Continuar para Suscetibilidade →",

      feedback:
        "O isolamento de <em>Staphylococcus aureus</em> em hemocultura deve ser valorizado como clinicamente relevante. O cateter é uma fonte possível, mas sua presença não confirma a origem da bacteremia. Essa definição exige integração com a avaliação clínica e outros dados da investigação."
    },

    suscetibilidade:{
      tabId:"cap5P39V2TabSuscetibilidade",

      result:
        "Perfil disponível: antibacteriano A — I; antibacteriano B — S; antibacteriano C — R <sup>3,4</sup>.",

      question:
        "Como esse perfil deve ser utilizado para direcionar o tratamento?",

      options:[
        "Priorizar o antibacteriano B, pois a categoria S indica maior atividade que a categoria I e justifica sua escolha mesmo quando apresenta espectro mais amplo.",

        "Manter o esquema empírico sem modificações até observar a evolução clínica, pois o teste realizado in vitro não reproduz todas as condições presentes no paciente.",

        "Considerar A e B como opções suscetíveis, avaliando a exposição necessária, o espectro, o local da infecção e as características do paciente, sem interpretar S como automaticamente superior a I."
      ],

      correct:2,

      feedback:
        "As categorias S e I indicam suscetibilidade: S com esquema de exposição padrão e I quando há aumento da exposição. A categoria R indica alta probabilidade de falha mesmo com maior exposição. O perfil permite direcionar o tratamento, mas a escolha também deve considerar o espectro, o local da infecção, as características do paciente, o controle do foco e a evolução clínica."
    }
  };

  let currentTarget = "gram";

  function render(target){
    const state = states[target];

    if(!state) return;

    currentTarget = target;

    tabs.forEach(function(tab){
      const active =
        tab.dataset.p39v2Target === target;

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

    view.setAttribute(
      "aria-labelledby",
      state.tabId
    );

    resultLabel.textContent =
      "Informação liberada";

    resultText.innerHTML =
      state.result;

    body.innerHTML = `
      <p class="cap5-p39v2-questionTitle">
        ${state.question}
      </p>

      <div
        class="cap5-p39v2-options"
        role="group"
        aria-label="Opções de resposta"
      >
        ${state.options.map(
          function(option, optionIndex){
            return `
              <button
                type="button"
                class="cap5-p39v2-option"
                data-option="${optionIndex}"
              >
                <span>
                  ${String.fromCharCode(
                    65 + optionIndex
                  )}
                </span>

                ${option}
              </button>
            `;
          }
        ).join("")}
      </div>

      <div
        class="cap5-p39v2-feedback"
        aria-live="polite"
      ></div>
    `;

    const optionButtons = Array.from(
      body.querySelectorAll("[data-option]")
    );

    const feedback = body.querySelector(
      ".cap5-p39v2-feedback"
    );

    optionButtons.forEach(function(button){
      button.addEventListener(
        "click",
        function(){
          const selected = Number(
            button.dataset.option
          );

          const isCorrect =
            selected === state.correct;

          optionButtons.forEach(
            function(item){
              item.disabled = true;

              if(
                Number(item.dataset.option) ===
                state.correct
              ){
                item.classList.add(
                  "is-correct"
                );
              }
            }
          );

          button.classList.add(
            isCorrect
              ? "is-correct"
              : "is-incorrect"
          );

          feedback.className =
            `cap5-p39v2-feedback ${
              isCorrect
                ? "is-success"
                : "is-attention"
            }`;

          const finalMessage = `
            <strong class="cap5-p39v2-complete">
              Análise concluída: cada novo resultado
              permitiu revisar a decisão anterior, mas
              o laudo permaneceu integrado ao quadro
              clínico.
            </strong>
          `;

          const nextContent =
            target !== "suscetibilidade"
              ? `
                <button
                  type="button"
                  class="cap5-p39v2-continue"
                >
                  ${state.nextLabel}
                </button>
              `
              : finalMessage;

          feedback.innerHTML = isCorrect
            ? `
              <strong>Muito bem.</strong>
              ${state.feedback}
              ${nextContent}
            `
            : `
              <strong>Reavalie o raciocínio.</strong>
              A alternativa escolhida não integra
              todos os dados disponíveis.
              ${state.feedback}
              ${nextContent}
            `;

          const continueButton =
            feedback.querySelector(
              ".cap5-p39v2-continue"
            );

          if(continueButton){
            continueButton.addEventListener(
              "click",
              function(){
                const currentIndex =
                  tabs.findIndex(
                    function(tab){
                      return (
                        tab.dataset.p39v2Target ===
                        target
                      );
                    }
                  );

                const nextTab =
                  tabs[currentIndex + 1];

                nextTab.disabled = false;

                nextTab.classList.add(
                  "is-unlocked"
                );

                render(
                  nextTab.dataset.p39v2Target
                );

                nextTab.focus();
              }
            );
          }
        }
      );
    });
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener(
      "click",
      function(){
        if(tab.disabled) return;

        render(
          tab.dataset.p39v2Target
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
            (
              index - 1 + tabs.length
            ) % tabs.length;
        }

        if(event.key === "Home"){
          nextIndex = 0;
        }

        if(event.key === "End"){
          nextIndex =
            tabs.length - 1;
        }

        if(
          nextIndex === null ||
          tabs[nextIndex].disabled
        ){
          return;
        }

        event.preventDefault();

        tabs[nextIndex].focus();

        render(
          tabs[nextIndex]
            .dataset.p39v2Target
        );
      }
    );
  });

  render(currentTarget);

  const revealItems =
    document.querySelectorAll(
      ".cap5-page39 .cap5-p39v2-reveal"
    );

  if(
    !(
      "IntersectionObserver"
      in window
    )
  ){
    revealItems.forEach(
      function(item){
        item.classList.add(
          "is-visible"
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      function(entries){
        entries.forEach(
          function(entry){
            if(
              !entry.isIntersecting
            ){
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold:.16,
        rootMargin:
          "0px 0px -35px 0px"
      }
    );

  revealItems.forEach(
    function(item){
      observer.observe(item);
    }
  );
})();
/* =========================
   CAPÍTULO 5 — PÁGINA 40
   ATIVIDADE: BACTERIOSCOPIA
   ========================= */

(function initCap5Page40() {
  const root = document.querySelector("[data-cap5-p40v4]");

  if (!root) {
    return;
  }

  const options = Array.from(
    root.querySelectorAll(".cap5-p40v4-option")
  );

  const inputs = Array.from(
    root.querySelectorAll(
      '.cap5-p40v4-option input[type="checkbox"]'
    )
  );

  const checkButton = root.querySelector("[data-p40v4-check]");
  const resetButton = root.querySelector("[data-p40v4-reset]");
  const alertBox = root.querySelector("[data-p40v4-alert]");
  const feedback = root.querySelector("[data-p40v4-feedback]");
  const feedbackIcon = root.querySelector(
    "[data-p40v4-feedback-icon]"
  );
  const feedbackTitle = root.querySelector(
    "[data-p40v4-feedback-title]"
  );
  const feedbackText = root.querySelector(
    "[data-p40v4-feedback-text]"
  );
  const report = root.querySelector("[data-p40v4-report]");
  const limits = root.querySelector("[data-p40v4-limits]");

  if (
    !options.length ||
    !inputs.length ||
    !checkButton ||
    !resetButton ||
    !alertBox ||
    !feedback ||
    !feedbackIcon ||
    !feedbackTitle ||
    !feedbackText ||
    !report ||
    !limits
  ) {
    return;
  }

  /*
   * Informações que podem ser adequadamente descritas
   * pela bacterioscopia apresentada.
   */
  const correctValues = new Set([
    "cocos",
    "bacilos",
    "leucocitos"
  ]);

  function updateSelectedState() {
    options.forEach(function (option) {
      const input = option.querySelector(
        'input[type="checkbox"]'
      );

      option.classList.toggle(
        "is-selected",
        input.checked
      );
    });

    alertBox.hidden = true;
  }

  function clearResultClasses() {
    options.forEach(function (option) {
      option.classList.remove(
        "is-selected",
        "is-correct",
        "is-incorrect",
        "is-missed",
        "is-locked"
      );
    });
  }

  function checkAnswers() {
    const selectedInputs = inputs.filter(function (input) {
      return input.checked;
    });

    if (!selectedInputs.length) {
      alertBox.hidden = false;
      alertBox.focus?.();
      return;
    }

    alertBox.hidden = true;

    let selectedCorrect = 0;
    let selectedIncorrect = 0;
    let missedCorrect = 0;

    options.forEach(function (option) {
      const input = option.querySelector(
        'input[type="checkbox"]'
      );

      const shouldBeSelected = correctValues.has(
        input.value
      );

      option.classList.remove("is-selected");

      if (input.checked && shouldBeSelected) {
        option.classList.add("is-correct");
        selectedCorrect += 1;
      }

      if (input.checked && !shouldBeSelected) {
        option.classList.add("is-incorrect");
        selectedIncorrect += 1;
      }

      if (!input.checked && shouldBeSelected) {
        option.classList.add("is-missed");
        missedCorrect += 1;
      }

      option.classList.add("is-locked");
      input.disabled = true;
    });

    const complete =
      selectedCorrect === correctValues.size &&
      selectedIncorrect === 0 &&
      missedCorrect === 0;

    feedback.classList.remove(
      "is-complete",
      "is-partial"
    );

    if (complete) {
      feedback.classList.add("is-complete");
      feedbackIcon.textContent = "✓";
      feedbackTitle.textContent =
        "Descrição construída adequadamente";

      feedbackText.textContent =
        "Você diferenciou os achados que podem ser descritos pela bacterioscopia das conclusões que dependem de outras etapas da investigação microbiológica.";
    } else {
      feedback.classList.add("is-partial");
      feedbackIcon.textContent = "!";
      feedbackTitle.textContent =
        "Revise o alcance da bacterioscopia";

      if (
        selectedIncorrect > 0 &&
        missedCorrect > 0
      ) {
        feedbackText.textContent =
          "Algumas informações observáveis não foram selecionadas e algumas conclusões escolhidas ultrapassam o que esse exame permite afirmar. Compare sua seleção com a descrição possível e com os limites do método.";
      } else if (selectedIncorrect > 0) {
        feedbackText.textContent =
          "Você reconheceu os principais achados, mas selecionou conclusões que dependem da cultura, da identificação ou da correlação com o tipo de amostra e o contexto clínico.";
      } else {
        feedbackText.textContent =
          "As opções selecionadas estão adequadas, mas outras informações observáveis também poderiam constar na descrição da bacterioscopia.";
      }
    }

    /*
     * A descrição e os limites aparecem mesmo quando
     * a resposta não está completa, pois fazem parte
     * do feedback formativo da atividade.
     */
    report.hidden = false;
    limits.hidden = false;
    feedback.hidden = false;

    checkButton.hidden = true;
    resetButton.hidden = false;

    feedback.focus();
  }

  function resetActivity() {
    clearResultClasses();

    inputs.forEach(function (input) {
      input.checked = false;
      input.disabled = false;
    });

    alertBox.hidden = true;
    feedback.hidden = true;
    report.hidden = true;
    limits.hidden = true;

    feedback.classList.remove(
      "is-complete",
      "is-partial"
    );

    feedbackIcon.textContent = "";
    feedbackTitle.textContent = "";
    feedbackText.textContent = "";

    checkButton.hidden = false;
    resetButton.hidden = true;

    const firstInput = inputs[0];

    if (firstInput) {
      firstInput.focus();
    }
  }

  inputs.forEach(function (input) {
    input.addEventListener(
      "change",
      updateSelectedState
    );
  });

  checkButton.addEventListener(
    "click",
    checkAnswers
  );

  resetButton.addEventListener(
    "click",
    resetActivity
  );

  /*
   * Exibe os blocos da página quando entram
   * na área visível da tela.
   */
  const revealItems = document.querySelectorAll(
    ".cap5-page40 .cap5-p40v3-reveal"
  );

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 5 — PÁGINA 41
   COLORAÇÃO DE GRAM
   ========================= */

(function initCap5Page41V4() {
  const root = document.querySelector(
    "[data-cap5-p41v4]"
  );

  if (!root) {
    return;
  }

  const tabs = Array.from(
    root.querySelectorAll("[data-p41v4-target]")
  );

  const view = root.querySelector(
    "#cap5P41V4View"
  );

  const image = root.querySelector(
    "#cap5P41V4Image"
  );

  const caption = root.querySelector(
    "#cap5P41V4Caption"
  );

  const kicker = root.querySelector(
    "#cap5P41V4Kicker"
  );

  const title = root.querySelector(
    "#cap5P41V4Title"
  );

  const body = root.querySelector(
    "#cap5P41V4Body"
  );

  const zoom = root.querySelector(
    "#cap5P41V4Zoom"
  );

  const finalResults = root.querySelector(
    "[data-p41v4-results]"
  );

  if (
    !tabs.length ||
    !view ||
    !image ||
    !caption ||
    !kicker ||
    !title ||
    !body ||
    !zoom
  ) {
    return;
  }

  function createInformationGrid(
    event,
    gramPositive,
    gramNegative,
    meaning
  ) {
    return `
      <div class="cap5-p41v4-infoGrid">

        <article class="cap5-p41v4-info">
          <span>O que acontece</span>
          <p>${event}</p>
        </article>

        <article class="cap5-p41v4-info">
          <span>Gram-positivas</span>
          <p>${gramPositive}</p>
        </article>

        <article class="cap5-p41v4-info">
          <span>Gram-negativas</span>
          <p>${gramNegative}</p>
        </article>

        <article
          class="cap5-p41v4-info cap5-p41v4-info--key"
        >
          <span>Por que isso importa?</span>
          <p>${meaning}</p>
        </article>

      </div>
    `;
  }

  const states = {
    fixacao: {
      tabId: "cap5P41V4TabFixacao",

      image:
        "../../assets/capitulo-05/imagens/fixacao.png",

      alt:
        "Etapa de fixação da amostra na coloração de Gram",

      caption:
        "Preparação e fixação do material na lâmina.",

      kicker:
        "Etapa preparatória",

      title:
        "Fixação da amostra",

      body: createInformationGrid(
        "O material é fixado à lâmina para permanecer aderido durante a coloração.",
        "Ainda não apresentam diferenciação pela cor.",
        "Ainda não apresentam diferenciação pela cor.",
        "Uma fixação inadequada pode causar perda de material ou alterar a morfologia observada."
      )
    },

    cristal: {
      tabId: "cap5P41V4TabCristal",

      image:
        "../../assets/capitulo-05/imagens/cristal-violeta.png",

      alt:
        "Aplicação do cristal violeta na coloração de Gram",

      caption:
        "Aplicação do corante primário.",

      kicker:
        "Corante primário",

      title:
        "Aplicação do cristal violeta",

      body: createInformationGrid(
        "O cristal violeta penetra nas células bacterianas e produz uma coloração violeta inicial.",
        "Ficam violetas.",
        "Também ficam violetas.",
        "Neste momento, os dois grupos apresentam a mesma cor; a diferenciação ainda não ocorreu."
      )
    },

    lugol: {
      tabId: "cap5P41V4TabLugol",

      image:
        "../../assets/capitulo-05/imagens/lugol.png",

      alt:
        "Aplicação do Lugol na coloração de Gram",

      caption:
        "Formação do complexo cristal violeta–iodo.",

      kicker:
        "Mordente",

      title:
        "Aplicação do Lugol",

      body: createInformationGrid(
        "O iodo atua como mordente e forma o complexo cristal violeta–iodo no interior das células.",
        "Permanecem violetas.",
        "Também permanecem violetas.",
        "O complexo será retido de maneira diferente pelos dois grupos durante a descoloração."
      )
    },

    alcool: {
      tabId: "cap5P41V4TabAlcool",

      image:
        "../../assets/capitulo-05/imagens/alcool-acetona.png",

      alt:
        "Etapa de descoloração na coloração de Gram",

      caption:
        "Etapa crítica da diferenciação.",

      kicker:
        "Etapa crítica",

      title:
        "Descoloração",

      body: createInformationGrid(
        "O agente descolorante remove seletivamente o complexo cristal violeta–iodo.",
        "Retêm o complexo e permanecem violetas.",
        "Perdem o complexo e ficam temporariamente incolores.",
        "Excesso ou insuficiência de descoloração pode produzir uma reação ao Gram diferente da esperada."
      )
    },

    safranina: {
      tabId: "cap5P41V4TabSafranina",

      image:
        "../../assets/capitulo-05/imagens/safranina.png",

      alt:
        "Aplicação da safranina na coloração de Gram",

      caption:
        "Aplicação do contra-corante e resultado final.",

      kicker:
        "Contra-corante",

      title:
        "Aplicação da safranina",

      body: createInformationGrid(
        "A safranina cora as bactérias que ficaram incolores após a descoloração.",
        "Permanecem violetas; a cor mais intensa do cristal violeta predomina.",
        "Adquirem coloração rosada.",
        "A cor final fornece uma caracterização inicial, mas não identifica a espécie bacteriana."
      )
    }
  };

  let transitionTimer = null;

  function updateFinalResults(target) {
    if (!finalResults) {
      return;
    }

    finalResults.hidden = target !== "safranina";
  }

  function renderStage(target) {
    const state = states[target];

    if (!state) {
      return;
    }

    tabs.forEach(function (tab) {
      const active =
        tab.dataset.p41v4Target === target;

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

    view.setAttribute(
      "aria-labelledby",
      state.tabId
    );

    updateFinalResults(target);

    window.clearTimeout(transitionTimer);
    image.classList.add("is-changing");

    transitionTimer = window.setTimeout(
      function () {
        image.src = state.image;
        image.alt = state.alt;

        caption.textContent = state.caption;
        kicker.textContent = state.kicker;
        title.textContent = state.title;
        body.innerHTML = state.body;

        zoom.dataset.zoom = state.image;

        zoom.setAttribute(
          "aria-label",
          "Ampliar imagem: " + state.title
        );

        image.classList.remove("is-changing");
      },
      120
    );
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      renderStage(
        tab.dataset.p41v4Target
      );
    });

    tab.addEventListener(
      "keydown",
      function (event) {
        let nextIndex = null;

        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          nextIndex =
            (index + 1) % tabs.length;
        }

        if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ) {
          nextIndex =
            (index - 1 + tabs.length) %
            tabs.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) {
          return;
        }

        event.preventDefault();

        tabs[nextIndex].focus();

        renderStage(
          tabs[nextIndex].dataset.p41v4Target
        );
      }
    );
  });

  renderStage("fixacao");
})();

/* =========================
   ABERTURA DAS INTERFERÊNCIAS
   ========================= */

(function initCap5Page41Disclosure() {
  const root = document.querySelector(
    "[data-cap5-p41v4-interferences]"
  );

  if (!root) {
    return;
  }

  const openButton = root.querySelector(
    "[data-p41v4-open-interferences]"
  );

  const content = root.querySelector(
    "[data-p41v4-interferences-content]"
  );

  if (!openButton || !content) {
    return;
  }

  const buttonStatus =
    openButton.querySelector("span");

  openButton.addEventListener(
    "click",
    function () {
      const expanded =
        openButton.getAttribute(
          "aria-expanded"
        ) === "true";

      openButton.setAttribute(
        "aria-expanded",
        expanded ? "false" : "true"
      );

      content.hidden = expanded;

      if (buttonStatus) {
        buttonStatus.textContent = expanded
          ? "Ver interferências →"
          : "Ocultar ↑";
      }

      if (!expanded) {
        content.setAttribute(
          "tabindex",
          "-1"
        );

        content.focus({
          preventScroll: true
        });

        content.removeAttribute("tabindex");
      }
    }
  );
})();

/* =========================
   INTERFERÊNCIAS DA COLORAÇÃO
   ========================= */

(function initCap5Page41Interferences() {
  const root = document.querySelector(
    "[data-cap5-p41v4-interferences]"
  );

  if (!root) {
    return;
  }

  const tabs = Array.from(
    root.querySelectorAll(
      "[data-p41v4-interference]"
    )
  );

  const view = root.querySelector(
    "#cap5P41V4InterferenceView"
  );

  const effect = root.querySelector(
    "#cap5P41V4InterferenceEffect"
  );

  const meaning = root.querySelector(
    "#cap5P41V4InterferenceMeaning"
  );

  if (
    !tabs.length ||
    !view ||
    !effect ||
    !meaning
  ) {
    return;
  }

  const states = {
    excesso: {
      tabId:
        "cap5P41V4IntTabExcesso",

      effect:
        "Bactérias Gram-positivas podem perder o complexo cristal violeta–iodo e aparecer rosadas.",

      meaning:
        "O resultado pode sugerir incorretamente uma reação Gram-negativa."
    },

    insuficiente: {
      tabId:
        "cap5P41V4IntTabInsuficiente",

      effect:
        "Bactérias Gram-negativas podem não perder completamente o complexo e permanecer violetas.",

      meaning:
        "O resultado pode sugerir incorretamente uma reação Gram-positiva."
    },

    espesso: {
      tabId:
        "cap5P41V4IntTabEspesso",

      effect:
        "A passagem dos reagentes e a descoloração podem ocorrer de forma irregular, com sobreposição de estruturas.",

      meaning:
        "A cor e a morfologia tornam-se mais difíceis de interpretar com segurança."
    },

    alteradas: {
      tabId:
        "cap5P41V4IntTabAlteradas",

      effect:
        "Células danificadas, expostas a antibacterianos ou provenientes de culturas envelhecidas podem apresentar coloração irregular ou Gram-variável.",

      meaning:
        "A reação observada pode não corresponder ao padrão habitualmente esperado para o microrganismo."
    },

    artefatos: {
      tabId:
        "cap5P41V4IntTabArtefatos",

      effect:
        "Precipitados de corante e outros materiais podem produzir estruturas semelhantes a bactérias.",

      meaning:
        "Um artefato pode ser interpretado como microrganismo se a lâmina não for avaliada cuidadosamente."
    }
  };

  function renderInterference(target) {
    const state = states[target];

    if (!state) {
      return;
    }

    tabs.forEach(function (tab) {
      const active =
        tab.dataset.p41v4Interference ===
        target;

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

    view.setAttribute(
      "aria-labelledby",
      state.tabId
    );

    effect.textContent = state.effect;
    meaning.textContent = state.meaning;
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener("click", function () {
      renderInterference(
        tab.dataset.p41v4Interference
      );
    });

    tab.addEventListener(
      "keydown",
      function (event) {
        let nextIndex = null;

        if (
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ) {
          nextIndex =
            (index + 1) % tabs.length;
        }

        if (
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ) {
          nextIndex =
            (index - 1 + tabs.length) %
            tabs.length;
        }

        if (event.key === "Home") {
          nextIndex = 0;
        }

        if (event.key === "End") {
          nextIndex = tabs.length - 1;
        }

        if (nextIndex === null) {
          return;
        }

        event.preventDefault();

        tabs[nextIndex].focus();

        renderInterference(
          tabs[nextIndex].dataset
            .p41v4Interference
        );
      }
    );
  });

  renderInterference("excesso");
})();

/* =========================
   ABERTURA DA SITUAÇÃO
   ========================= */

(function initCap5Page41ChallengeDisclosure() {
  const root = document.querySelector(
    "[data-cap5-p41v4-interferences]"
  );

  if (!root) {
    return;
  }

  const openButton = root.querySelector(
    "[data-p41v4-open-challenge]"
  );

  const challenge = root.querySelector(
    "[data-p41v4-challenge]"
  );

  if (!openButton || !challenge) {
    return;
  }

  openButton.addEventListener(
    "click",
    function () {
      const expanded =
        openButton.getAttribute(
          "aria-expanded"
        ) === "true";

      openButton.setAttribute(
        "aria-expanded",
        expanded ? "false" : "true"
      );

      challenge.hidden = expanded;

      openButton.textContent = expanded
        ? "Aplicar em uma situação"
        : "Ocultar situação ↑";

      if (!expanded) {
        challenge.setAttribute(
          "tabindex",
          "-1"
        );

        challenge.focus({
          preventScroll: true
        });

        challenge.removeAttribute("tabindex");
      }
    }
  );
})();

/* =========================
   QUESTÃO APLICADA
   ========================= */

(function initCap5Page41Challenge() {
  const root = document.querySelector(
    "[data-cap5-p41v4-interferences]"
  );

  if (!root) {
    return;
  }

  const options = Array.from(
    root.querySelectorAll(
      '.cap5-p41v4-option input[type="radio"]'
    )
  );

  const checkButton = root.querySelector(
    "[data-p41v4-check]"
  );

  const resetButton = root.querySelector(
    "[data-p41v4-reset]"
  );

  const alertBox = root.querySelector(
    "[data-p41v4-alert]"
  );

  const feedback = root.querySelector(
    "[data-p41v4-feedback]"
  );

  const feedbackTitle = root.querySelector(
    "[data-p41v4-feedback-title]"
  );

  const feedbackText = root.querySelector(
    "[data-p41v4-feedback-text]"
  );

  const takeaway = document.querySelector(
    "[data-p41v4-takeaway]"
  );

  if (
    !options.length ||
    !checkButton ||
    !resetButton ||
    !alertBox ||
    !feedback ||
    !feedbackTitle ||
    !feedbackText
  ) {
    return;
  }

  options.forEach(function (input) {
    input.addEventListener(
      "change",
      function () {
        alertBox.hidden = true;

        options.forEach(function (item) {
          const label = item.closest(
            ".cap5-p41v4-option"
          );

          if (!label) {
            return;
          }

          label.classList.toggle(
            "is-selected",
            item.checked
          );
        });
      }
    );
  });

  checkButton.addEventListener(
    "click",
    function () {
      const selected = options.find(
        function (input) {
          return input.checked;
        }
      );

      if (!selected) {
        alertBox.hidden = false;
        return;
      }

      const correct =
        selected.value === "b";

      options.forEach(function (input) {
        const label = input.closest(
          ".cap5-p41v4-option"
        );

        if (!label) {
          return;
        }

        label.classList.remove(
          "is-selected"
        );

        if (input.value === "b") {
          label.classList.add(
            "is-correct"
          );
        }

        if (
          input.checked &&
          input.value !== "b"
        ) {
          label.classList.add(
            "is-incorrect"
          );
        }

        input.disabled = true;
      });

      feedback.classList.toggle(
        "is-incorrect",
        !correct
      );

      if (correct) {
        feedbackTitle.textContent =
          "Interpretação adequada";

        feedbackText.textContent =
          "A reação ao Gram é uma informação inicial. Alterações nas células e interferências técnicas podem modificar a coloração; por isso, resultados inesperados devem ser correlacionados com as demais etapas e esclarecidos com o laboratório quando necessário.";
      } else {
        feedbackTitle.textContent =
          "Reconsidere a discordância";

        feedbackText.textContent =
          "Nem a bacterioscopia nem a identificação devem ser descartadas isoladamente. A discordância pode refletir alterações bacterianas ou interferências na técnica e precisa ser analisada em conjunto com os demais resultados.";
      }

      feedback.hidden = false;
      checkButton.hidden = true;
      resetButton.hidden = false;

      if (takeaway) {
        takeaway.hidden = false;
        takeaway.classList.add(
          "is-visible"
        );
      }

      feedback.focus();
    }
  );

  resetButton.addEventListener(
    "click",
    function () {
      options.forEach(function (input) {
        const label = input.closest(
          ".cap5-p41v4-option"
        );

        input.checked = false;
        input.disabled = false;

        if (label) {
          label.classList.remove(
            "is-selected",
            "is-correct",
            "is-incorrect"
          );
        }
      });

      alertBox.hidden = true;
      feedback.hidden = true;

      feedback.classList.remove(
        "is-incorrect"
      );

      feedbackTitle.textContent = "";
      feedbackText.textContent = "";

      checkButton.hidden = false;
      resetButton.hidden = true;

      if (takeaway) {
        takeaway.hidden = true;
        takeaway.classList.remove(
          "is-visible"
        );
      }

      if (options[0]) {
        options[0].focus();
      }
    }
  );
})();

/* =========================
   ANIMAÇÃO DE ENTRADA
   ========================= */

(function revealCap5Page41() {
  const items = document.querySelectorAll(
    ".cap5-page41 .cap5-p41v4-reveal"
  );

  if (!items.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (item) {
      if (!item.hidden) {
        item.classList.add("is-visible");
      }
    });

    return;
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          "is-visible"
        );

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 5 — PÁGINA 42
   GRAM-POSITIVAS E GRAM-NEGATIVAS
   ========================= */

(function initCap5Page42(){
  const envelopeRoot =
    document.querySelector("[data-cap5-p42-envelope]");

  if(envelopeRoot){
    initEnvelope(envelopeRoot);
  }

  const quizRoot =
    document.querySelector("[data-cap5-p42-quiz]");

  if(quizRoot){
    initQuiz(quizRoot);
  }

  initTableModal();
  initReveal();


  /* =========================
     ABAS DO ENVELOPE
     ========================= */

  function initEnvelope(root){
    const tabs = Array.from(
      root.querySelectorAll("[data-p42-envelope-target]")
    );

    const view =
      root.querySelector("#cap5P42EnvelopeView");

    const image =
      root.querySelector("#cap5P42EnvelopeImage");

    const caption =
      root.querySelector("#cap5P42EnvelopeCaption");

    const kicker =
      root.querySelector("#cap5P42EnvelopeKicker");

    const title =
      root.querySelector("#cap5P42EnvelopeTitle");

    const body =
      root.querySelector("#cap5P42EnvelopeBody");

    const zoomButton =
      root.querySelector("#cap5P42EnvelopeZoom");

    if(
      !tabs.length ||
      !view ||
      !image ||
      !caption ||
      !kicker ||
      !title ||
      !body ||
      !zoomButton
    ){
      return;
    }

    const states = {
      positive:{
        tabId:"cap5P42TabPositive",
        image:"../../assets/capitulo-05/imagens/gram-positivo1.png",
        alt:"Representação do envelope celular de bactéria Gram-positiva",
        caption:"Organização do envelope celular de uma bactéria Gram-positiva.",
        kicker:"Implicação estrutural",
        title:"Parede celular como alvo terapêutico",
        body:`
          <div class="cap5-p42-infoGrid">

            <article class="cap5-p42-info">
              <span>Entrada dos antibacterianos</span>
              <p>A ausência de membrana externa elimina uma importante barreira adicional à penetração de diversas moléculas.</p>
            </article>

            <article class="cap5-p42-info">
              <span>Alvo farmacológico</span>
              <p>A síntese do peptidoglicano constitui um alvo relevante para β-lactâmicos e glicopeptídeos.</p>
            </article>

            <article class="cap5-p42-info">
              <span>Interpretação do Gram</span>
              <p>O resultado orienta inicialmente para grupos bacterianos com organização estrutural distinta das Gram-negativas.</p>
            </article>

            <article class="cap5-p42-info cap5-p42-info--key">
              <span>Limite clínico</span>
              <p>A reação Gram-positiva não permite prever isoladamente a suscetibilidade do microrganismo.</p>
            </article>

          </div>
        `
      },

      negative:{
        tabId:"cap5P42TabNegative",
        image:"../../assets/capitulo-05/imagens/gram-negativo1.png",
        alt:"Representação do envelope celular de bactéria Gram-negativa",
        caption:"Organização do envelope celular de uma bactéria Gram-negativa.",
        kicker:"Barreira estrutural",
        title:"Permeabilidade e mecanismos de resistência",
        body:`
          <div class="cap5-p42-infoGrid">

            <article class="cap5-p42-info">
              <span>Entrada dos antibacterianos</span>
              <p>A membrana externa restringe a passagem de diversas moléculas, e a entrada de compostos hidrofílicos pode depender de porinas.</p>
            </article>

            <article class="cap5-p42-info">
              <span>Inativação enzimática</span>
              <p>Enzimas presentes no espaço periplasmático podem inativar alguns antibacterianos antes que alcancem seus alvos.</p>
            </article>

            <article class="cap5-p42-info">
              <span>Resistência combinada</span>
              <p>Alterações de porinas, bombas de efluxo e enzimas inativadoras podem atuar de forma associada.</p>
            </article>

            <article class="cap5-p42-info cap5-p42-info--key">
              <span>Implicação clínica</span>
              <p>A maior complexidade estrutural ajuda a explicar a dificuldade terapêutica observada em muitos bacilos Gram-negativos.</p>
            </article>

          </div>
        `
      }
    };

    let transitionTimer = null;

    function render(target){
      const state = states[target];

      if(!state) return;

      tabs.forEach(function(tab){
        const active =
          tab.dataset.p42EnvelopeTarget === target;

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

      view.setAttribute(
        "aria-labelledby",
        state.tabId
      );

      window.clearTimeout(transitionTimer);
      image.classList.add("is-changing");

      transitionTimer =
        window.setTimeout(function(){

          image.src = state.image;
          image.alt = state.alt;

          caption.textContent = state.caption;
          kicker.textContent = state.kicker;
          title.textContent = state.title;
          body.innerHTML = state.body;

          zoomButton.dataset.zoom = state.image;

          zoomButton.setAttribute(
            "aria-label",
            "Ampliar imagem: " + state.title
          );

          image.classList.remove("is-changing");

        }, 140);
    }

    tabs.forEach(function(tab, index){

      tab.addEventListener("click", function(){
        render(tab.dataset.p42EnvelopeTarget);
      });

      tab.addEventListener("keydown", function(event){
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
          nextIndex = tabs.length - 1;
        }

        if(nextIndex === null) return;

        event.preventDefault();

        tabs[nextIndex].focus();

        render(
          tabs[nextIndex]
            .dataset.p42EnvelopeTarget
        );
      });

    });

    render("positive");
  }


  /* =========================
     SITUAÇÕES CLÍNICAS
     ========================= */

  function initQuiz(root){
    const context =
      root.querySelector("#cap5P42QuizContext");

    const question =
      root.querySelector("#cap5P42QuizQuestion");

    const options =
      root.querySelector("#cap5P42QuizOptions");

    const feedback =
      root.querySelector("#cap5P42QuizFeedback");

    const counter =
      root.querySelector("#cap5P42QuizCounter");

    const prev =
      root.querySelector("#cap5P42QuizPrev");

    const next =
      root.querySelector("#cap5P42QuizNext");

    const dots =
      root.querySelector("#cap5P42QuizDots");

    if(
      !context ||
      !question ||
      !options ||
      !feedback ||
      !counter ||
      !prev ||
      !next ||
      !dots
    ){
      return;
    }

    const cases = [
      {
        context:`
          <p>Um homem é internado com sepse de provável origem urinária. Após 12 horas de incubação, a hemocultura torna-se positiva.</p>
          <span class="cap5-p42-labResult">Bacilos Gram-negativos</span>
        `,
        question:
          "Qual conclusão microbiológica pode ser feita neste momento?",
        options:[
          {
            text:"A bactéria já foi identificada como Escherichia coli.",
            feedback:"A coloração de Gram não identifica a espécie. Diversos bacilos Gram-negativos apresentam aparência microscópica semelhante."
          },
          {
            text:"O antibiograma pode ser previsto.",
            feedback:"O perfil de suscetibilidade somente será conhecido após o isolamento e a realização do teste de suscetibilidade."
          },
          {
            text:"O microrganismo pertence a um grupo que possui membrana externa, característica que pode dificultar a entrada de alguns antimicrobianos e favorecer mecanismos de resistência.",
            feedback:"A membrana externa é típica das Gram-negativas e pode coexistir com mecanismos como β-lactamases, alterações de porinas e bombas de efluxo."
          },
          {
            text:"O tratamento definitivo já pode ser definido.",
            feedback:"O Gram orienta a cobertura empírica, mas o tratamento definitivo depende da identificação e do antibiograma."
          }
        ],
        correct:2
      },

      {
        context:`
          <p>Durante a discussão do caso anterior, um estudante pergunta por que muitas infecções causadas por bacilos Gram-negativos podem apresentar maior dificuldade terapêutica.</p>
        `,
        question:
          "Qual característica explica melhor essa diferença?",
        options:[
          {
            text:"Todas as bactérias Gram-negativas produzem carbapenemases.",
            feedback:"A produção de carbapenemases não ocorre em todas as Gram-negativas e varia conforme a espécie e a cepa."
          },
          {
            text:"A presença de membrana externa, associada a mecanismos como β-lactamases, alterações de porinas e bombas de efluxo, dificulta a ação de diversos antimicrobianos.",
            feedback:"A combinação entre barreiras estruturais e mecanismos de resistência pode limitar a entrada e a atividade dos antimicrobianos."
          },
          {
            text:"As Gram-negativas possuem parede celular mais espessa.",
            feedback:"A camada de peptidoglicano das Gram-negativas é mais delgada que a das Gram-positivas."
          },
          {
            text:"As Gram-negativas não possuem parede celular.",
            feedback:"As Gram-negativas possuem parede celular delgada, localizada entre a membrana citoplasmática e a membrana externa."
          }
        ],
        correct:1
      },

      {
        context:`
          <p>Uma hemocultura apresenta o seguinte resultado preliminar:</p>
          <span class="cap5-p42-labResult">Cocos Gram-positivos em cachos</span>
        `,
        question:
          "Qual grupo bacteriano passa a ser o principal suspeito?",
        options:[
          {
            text:"Staphylococcus.",
            feedback:"O arranjo de cocos Gram-positivos em cachos é característico do gênero Staphylococcus. A espécie ainda dependerá da identificação."
          },
          {
            text:"Streptococcus.",
            feedback:"Streptococcus costuma apresentar cocos organizados em cadeias ou pares."
          },
          {
            text:"Neisseria.",
            feedback:"Neisseria é formada por diplococos Gram-negativos."
          },
          {
            text:"Enterobacterales.",
            feedback:"Os membros da ordem Enterobacterales são bacilos Gram-negativos."
          }
        ],
        correct:0
      },

      {
        context:`
          <p>Dois pacientes apresentam hemoculturas positivas.</p>
          <span class="cap5-p42-labResult">Paciente A: cocos Gram-positivos em cachos</span>
          <span class="cap5-p42-labResult">Paciente B: bacilos Gram-negativos</span>
        `,
        question:
          "Qual é a principal contribuição da coloração de Gram para a antibioticoterapia empírica?",
        options:[
          {
            text:"Identificar a espécie bacteriana.",
            feedback:"A identificação da espécie exige cultura e métodos microbiológicos adicionais."
          },
          {
            text:"Definir o antibiograma.",
            feedback:"O antibiograma depende do isolamento do microrganismo e da realização do teste de suscetibilidade."
          },
          {
            text:"Reconhecer grupos bacterianos com características estruturais e perfis microbiológicos distintos, orientando o espectro de cobertura enquanto novos resultados são aguardados.",
            feedback:"O Gram organiza precocemente o raciocínio microbiológico e auxilia na escolha da cobertura empírica."
          },
          {
            text:"Confirmar isoladamente o diagnóstico etiológico.",
            feedback:"O resultado do Gram deve ser integrado aos demais achados microbiológicos e clínicos."
          }
        ],
        correct:2
      }
    ];

    const letters = ["A", "B", "C", "D"];

    let currentIndex = 0;
    const answers = new Array(cases.length).fill(null);

    function renderDots(){
      dots.innerHTML = "";

      cases.forEach(function(_, index){
        const dot = document.createElement("span");

        dot.className = "cap5-p42-quizDot";

        if(index === currentIndex){
          dot.classList.add("is-active");
        }

        dots.appendChild(dot);
      });
    }

    function renderCase(){
      const current = cases[currentIndex];

      context.innerHTML = current.context;
      question.textContent = current.question;
      counter.textContent =
        "Situação " +
        (currentIndex + 1) +
        " de " +
        cases.length;

      options.innerHTML = "";
      feedback.hidden = true;
      feedback.className = "cap5-p42-quizFeedback";
      feedback.innerHTML = "";

      current.options.forEach(function(option, index){
        const button = document.createElement("button");

        button.type = "button";
        button.className = "cap5-p42-option";

        button.innerHTML = `
          <span class="cap5-p42-optionLetter">
            ${letters[index]}
          </span>

          <span class="cap5-p42-optionText">
            ${option.text}
          </span>
        `;

        button.addEventListener("click", function(){
          selectOption(index);
        });

        options.appendChild(button);
      });

      const savedAnswer = answers[currentIndex];

      if(savedAnswer !== null){
        showAnswer(savedAnswer);
      }

      prev.disabled = currentIndex === 0;
      next.disabled = currentIndex === cases.length - 1;

      renderDots();
    }

    function selectOption(selectedIndex){
      answers[currentIndex] = selectedIndex;
      showAnswer(selectedIndex);
    }

    function showAnswer(selectedIndex){
      const current = cases[currentIndex];
      const buttons = Array.from(
        options.querySelectorAll(".cap5-p42-option")
      );

      const correct =
        selectedIndex === current.correct;

      buttons.forEach(function(button, index){
        button.disabled = true;

        if(index === current.correct){
          button.classList.add("is-correct");
        }else if(index === selectedIndex){
          button.classList.add("is-incorrect");
        }else{
          button.classList.add("is-dimmed");
        }
      });

      feedback.hidden = false;

      feedback.classList.add(
        correct ? "is-correct" : "is-incorrect"
      );

      feedback.innerHTML = `
        <strong>
          ${correct ? "Correto." : "Incorreto."}
        </strong>

        <p>
          ${current.options[selectedIndex].feedback}
        </p>
      `;
    }

    prev.addEventListener("click", function(){
      if(currentIndex === 0) return;

      currentIndex -= 1;
      renderCase();
    });

    next.addEventListener("click", function(){
      if(currentIndex >= cases.length - 1) return;

      currentIndex += 1;
      renderCase();
    });

    renderCase();
  }


  /* =========================
     TABELA COMPARATIVA
     ========================= */

  function initTableModal(){
    const openButton =
      document.querySelector("[data-p42-open-table]");

    const modal =
      document.querySelector("[data-p42-table-modal]");

    if(!openButton || !modal) return;

    const closeButtons = Array.from(
      modal.querySelectorAll("[data-p42-close-table]")
    );

    const closeButton =
      modal.querySelector(".cap5-p42-tableClose");

    let previousFocus = null;

    function openModal(){
      previousFocus = document.activeElement;

      modal.hidden = false;
      document.body.style.overflow = "hidden";

      window.setTimeout(function(){
        if(closeButton){
          closeButton.focus();
        }
      }, 20);
    }

    function closeModal(){
      modal.hidden = true;
      document.body.style.overflow = "";

      if(previousFocus){
        previousFocus.focus();
      }
    }

    openButton.addEventListener("click", openModal);

    closeButtons.forEach(function(button){
      button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function(event){
      if(event.key === "Escape" && !modal.hidden){
        closeModal();
      }
    });
  }


  /* =========================
     ENTRADA SUAVE
     ========================= */

  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page42 .cap5-p42-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
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
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();


/* =========================
   CAPÍTULO 5 — PÁGINA 43
   IDENTIFICAÇÃO BACTERIANA
   ========================= */

(function initCap5Page43(){
  const root = document.querySelector("[data-cap5-p43]");
  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-p43-target]")
  );

  const view = root.querySelector("#cap5P43View");
  const initial = root.querySelector("#cap5P43Initial");
  const species = root.querySelector("#cap5P43Species");
  const kicker = root.querySelector("#cap5P43Kicker");
  const title = root.querySelector("#cap5P43Title");
  const body = root.querySelector("#cap5P43Body");

  if(
    !tabs.length ||
    !view ||
    !initial ||
    !species ||
    !kicker ||
    !title ||
    !body
  ){
    return;
  }

  const states = {
    negative:{
      tabId:"cap5P43TabNegative",
      viewClass:"cap5-p43-view--negative",
      initial:"Bacilos Gram-negativos",
      species:"<em>Escherichia coli</em>",
      kicker:"O que a identificação acrescenta",
      title:"Redução das incertezas microbiológicas",
      body:`
        <article class="cap5-p43-info">
          <span>Relevância clínica</span>
          <p>É uma das principais espécies associadas a infecções do trato urinário e bacteremias de origem urinária.</p>
        </article>

        <article class="cap5-p43-info">
          <span>Resistência a considerar</span>
          <p>Pode apresentar produção de β-lactamases de espectro estendido e outros mecanismos adquiridos.</p>
        </article>

        <article class="cap5-p43-info">
          <span>Diferença entre espécies</span>
          <p>Seu perfil microbiológico não pode ser extrapolado para <em>Pseudomonas aeruginosa</em> ou <em>Acinetobacter baumannii</em>.</p>
        </article>

        <article class="cap5-p43-info cap5-p43-info--key">
          <span>Implicação para o antibiograma</span>
          <p>A espécie fornece o contexto necessário para reconhecer resistências intrínsecas e interpretar corretamente os resultados S, I e R.</p>
        </article>
      `
    },

    positive:{
      tabId:"cap5P43TabPositive",
      viewClass:"cap5-p43-view--positive",
      initial:"Cocos Gram-positivos em cachos",
      species:"<em>Staphylococcus aureus</em>",
      kicker:"O que a identificação acrescenta",
      title:"Reconhecimento da relevância clínica da espécie",
      body:`
        <article class="cap5-p43-info">
          <span>Relevância clínica</span>
          <p>O isolamento em hemoculturas possui elevada importância e deve ser cuidadosamente correlacionado ao quadro clínico.</p>
        </article>

        <article class="cap5-p43-info">
          <span>Resistência a considerar</span>
          <p>A identificação exige avaliação da suscetibilidade à meticilina e da possibilidade de MRSA.</p>
        </article>

        <article class="cap5-p43-info">
          <span>Diferença entre espécies</span>
          <p>Não deve ser interpretado da mesma forma que estafilococos coagulase-negativos, que podem representar colonização ou contaminação.</p>
        </article>

        <article class="cap5-p43-info cap5-p43-info--key">
          <span>Implicação para o antibiograma</span>
          <p>A espécie determina quais marcadores de resistência e quais resultados do teste de suscetibilidade possuem maior relevância clínica.</p>
        </article>
      `
    }
  };

  function render(target){
    const state = states[target];
    if(!state) return;

    tabs.forEach(function(tab){
      const active =
        tab.dataset.p43Target === target;

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

    view.classList.remove(
      "cap5-p43-view--negative",
      "cap5-p43-view--positive"
    );

    view.classList.add(state.viewClass);

    view.setAttribute(
      "aria-labelledby",
      state.tabId
    );

    initial.textContent = state.initial;
    species.innerHTML = state.species;
    kicker.textContent = state.kicker;
    title.textContent = state.title;
    body.innerHTML = state.body;
  }

  tabs.forEach(function(tab, index){

    tab.addEventListener("click", function(){
      render(tab.dataset.p43Target);
    });

    tab.addEventListener("keydown", function(event){
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
        nextIndex = tabs.length - 1;
      }

      if(nextIndex === null) return;

      event.preventDefault();

      tabs[nextIndex].focus();

      render(
        tabs[nextIndex].dataset.p43Target
      );
    });

  });

  render("negative");

  const revealItems = document.querySelectorAll(
    ".cap5-page43 .cap5-p43-reveal"
  );

  if(!("IntersectionObserver" in window)){
    revealItems.forEach(function(item){
      item.classList.add("is-visible");
    });

    return;
  }

  const observer = new IntersectionObserver(
    function(entries){

      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;

        entry.target.classList.add(
          "is-visible"
        );

        observer.unobserve(entry.target);
      });

    },
    {
      threshold:.14,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });

})();
/* =========================
   CAPÍTULO 5 — PÁGINA 44
   ESPÉCIE E INTERPRETAÇÃO
   ========================= */

(function initCap5Page44(){
  const root = document.querySelector("[data-cap5-p44]");
  if(!root) return;

  const speciesButtons = Array.from(
    root.querySelectorAll("[data-p44-species]")
  );

  const flowButtons = Array.from(
    root.querySelectorAll("[data-p44-step]")
  );

  const kicker = root.querySelector("#cap5P44PanelKicker");
  const title = root.querySelector("#cap5P44PanelTitle");
  const body = root.querySelector("#cap5P44PanelBody");
  const selectedSpecies = root.querySelector(
    "#cap5P44SelectedSpecies"
  );

  if(
    !speciesButtons.length ||
    !flowButtons.length ||
    !kicker ||
    !title ||
    !body ||
    !selectedSpecies
  ){
    return;
  }

  const speciesData = {
    ecoli:{
      name:"<em>Escherichia coli</em>",
      species:{
        title:"Espécie identificada",
        body:`
          <p>
            O laboratório identificou <em>Escherichia coli</em>. O resultado deixa de representar apenas um grupo amplo de bacilos Gram-negativos e passa a fornecer um contexto microbiológico específico.
          </p>
        `
      },
      known:{
        title:"O que já sei sobre a espécie?",
        body:`
          <ul>
            <li>É uma das principais causas de infecção do trato urinário.</li>
            <li>Pode causar bacteremia, especialmente a partir de focos urinários ou abdominais.</li>
            <li>Pertence à ordem Enterobacterales.</li>
          </ul>
        `
      },
      intrinsic:{
        title:"Características esperadas da espécie",
        body:`
          <p>
            A interpretação deve respeitar as características próprias de Enterobacterales e não deve ser extrapolada para bacilos não fermentadores, como <em>Pseudomonas aeruginosa</em>.
          </p>
        `
      },
      acquired:{
        title:"Mecanismos adquiridos a investigar",
        body:`
          <ul>
            <li>Produção de β-lactamases de espectro estendido.</li>
            <li>Produção de carbapenemases.</li>
            <li>Resistência a fluoroquinolonas e aminoglicosídeos.</li>
          </ul>
        `
      },
      panel:{
        title:"Como interpretar o antibiograma",
        body:`
          <p>
            O painel deve ser analisado considerando a possibilidade de ESBL ou carbapenemase e a coerência entre os resultados dos diferentes β-lactâmicos testados.
          </p>
        `
      }
    },

    klebsiella:{
      name:"<em>Klebsiella pneumoniae</em>",
      species:{
        title:"Espécie identificada",
        body:`
          <p>
            A identificação de <em>Klebsiella pneumoniae</em> direciona o raciocínio para uma Enterobacterales associada a infecções urinárias, respiratórias, abdominais e bacteremias.
          </p>
        `
      },
      known:{
        title:"O que já sei sobre a espécie?",
        body:`
          <ul>
            <li>Pode estar associada a infecções comunitárias e hospitalares.</li>
            <li>Possui importância epidemiológica na disseminação de resistência.</li>
            <li>Pode colonizar o trato gastrointestinal.</li>
          </ul>
        `
      },
      intrinsic:{
        title:"Características esperadas da espécie",
        body:`
          <p>
            A espécie apresenta resistência intrínseca à ampicilina por produção constitutiva de β-lactamase cromossômica.
          </p>
        `
      },
      acquired:{
        title:"Mecanismos adquiridos a investigar",
        body:`
          <ul>
            <li>Produção de ESBL.</li>
            <li>Produção de carbapenemases, incluindo KPC.</li>
            <li>Alterações de porinas e associação entre mecanismos.</li>
          </ul>
        `
      },
      panel:{
        title:"Como interpretar o antibiograma",
        body:`
          <p>
            A suscetibilidade aos β-lactâmicos deve ser analisada de forma integrada, especialmente diante de resistência a cefalosporinas de amplo espectro ou carbapenêmicos.
          </p>
        `
      }
    },

    pseudomonas:{
      name:"<em>Pseudomonas aeruginosa</em>",
      species:{
        title:"Espécie identificada",
        body:`
          <p>
            A identificação de <em>Pseudomonas aeruginosa</em> define um bacilo Gram-negativo não fermentador com comportamento microbiológico distinto das Enterobacterales.
          </p>
        `
      },
      known:{
        title:"O que já sei sobre a espécie?",
        body:`
          <ul>
            <li>Está associada a infecções oportunistas e hospitalares.</li>
            <li>Pode acometer pacientes críticos, queimados ou com dispositivos invasivos.</li>
            <li>Possui capacidade de formar biofilme.</li>
          </ul>
        `
      },
      intrinsic:{
        title:"Características esperadas da espécie",
        body:`
          <p>
            Baixa permeabilidade da membrana externa, bombas de efluxo e β-lactamase AmpC cromossômica contribuem para menor suscetibilidade intrínseca a diversos antimicrobianos.
          </p>
        `
      },
      acquired:{
        title:"Mecanismos adquiridos a investigar",
        body:`
          <ul>
            <li>Hiperprodução de AmpC.</li>
            <li>Perda ou modificação de porinas.</li>
            <li>Carbapenemases e aumento da atividade de bombas de efluxo.</li>
          </ul>
        `
      },
      panel:{
        title:"Como interpretar o antibiograma",
        body:`
          <p>
            Devem ser considerados apenas antimicrobianos com atividade antipseudomonas. O comportamento de Enterobacterales não pode ser usado como referência para essa espécie.
          </p>
        `
      }
    },

    enterococcus:{
      name:"<em>Enterococcus faecalis</em>",
      species:{
        title:"Espécie identificada",
        body:`
          <p>
            A identificação de <em>Enterococcus faecalis</em> direciona o raciocínio para um coco Gram-positivo com características próprias de suscetibilidade.
          </p>
        `
      },
      known:{
        title:"O que já sei sobre a espécie?",
        body:`
          <ul>
            <li>Pode causar infecção urinária, bacteremia e endocardite.</li>
            <li>Integra a microbiota gastrointestinal.</li>
            <li>O significado clínico depende do tipo de amostra e do contexto.</li>
          </ul>
        `
      },
      intrinsic:{
        title:"Características esperadas da espécie",
        body:`
          <p>
            Enterococos apresentam resistência intrínseca às cefalosporinas. Por isso, esses antimicrobianos não devem ser considerados opções terapêuticas, mesmo que não apareçam no painel.
          </p>
        `
      },
      acquired:{
        title:"Mecanismos adquiridos a investigar",
        body:`
          <ul>
            <li>Resistência à vancomicina.</li>
            <li>Resistência de alto nível aos aminoglicosídeos.</li>
            <li>Alterações que reduzem a suscetibilidade a outros agentes.</li>
          </ul>
        `
      },
      panel:{
        title:"Como interpretar o antibiograma",
        body:`
          <p>
            A ausência de cefalosporinas não indica falha do laboratório. A leitura deve priorizar agentes relevantes para a espécie e para o sítio da infecção.
          </p>
        `
      }
    },

    saureus:{
      name:"<em>Staphylococcus aureus</em>",
      species:{
        title:"Espécie identificada",
        body:`
          <p>
            A identificação de <em>Staphylococcus aureus</em> estabelece um contexto clínico distinto dos estafilococos coagulase-negativos.
          </p>
        `
      },
      known:{
        title:"O que já sei sobre a espécie?",
        body:`
          <ul>
            <li>Pode causar infecções cutâneas, bacteremia, endocardite e infecções osteoarticulares.</li>
            <li>Seu isolamento em hemocultura possui elevada relevância clínica.</li>
            <li>Pode produzir diferentes fatores de virulência.</li>
          </ul>
        `
      },
      intrinsic:{
        title:"Características esperadas da espécie",
        body:`
          <p>
            O comportamento dos β-lactâmicos depende principalmente da suscetibilidade à meticilina, avaliada por marcadores laboratoriais apropriados.
          </p>
        `
      },
      acquired:{
        title:"Mecanismos adquiridos a investigar",
        body:`
          <ul>
            <li>Resistência à meticilina mediada por alteração da proteína-alvo.</li>
            <li>Resistência a macrolídeos e lincosamidas.</li>
            <li>Outros mecanismos conforme o painel testado.</li>
          </ul>
        `
      },
      panel:{
        title:"Como interpretar o antibiograma",
        body:`
          <p>
            A identificação de MRSA modifica a interpretação de praticamente todo o grupo dos β-lactâmicos. O resultado não deve ser lido fármaco por fármaco de forma isolada.
          </p>
        `
      }
    }
  };

  const stepTitles = {
    species:"Etapa 1",
    known:"Etapa 2",
    intrinsic:"Etapa 3",
    acquired:"Etapa 4",
    panel:"Etapa 5"
  };

  let currentSpecies = "ecoli";
  let currentStep = "species";

  function render(){
    const species = speciesData[currentSpecies];
    const step = species[currentStep];

    if(!species || !step) return;

    speciesButtons.forEach(function(button){
      const active =
        button.dataset.p44Species === currentSpecies;

      button.classList.toggle("is-active", active);
      button.setAttribute(
        "aria-selected",
        active ? "true" : "false"
      );
      button.setAttribute(
        "tabindex",
        active ? "0" : "-1"
      );
    });

    flowButtons.forEach(function(button){
      const active =
        button.dataset.p44Step === currentStep;

      button.classList.toggle("is-active", active);
    });

    kicker.textContent = stepTitles[currentStep];
    title.textContent = step.title;
    body.innerHTML = step.body;
    selectedSpecies.innerHTML = species.name;
  }

  speciesButtons.forEach(function(button, index){

    button.addEventListener("click", function(){
      currentSpecies = button.dataset.p44Species;
      currentStep = "species";
      render();
    });

    button.addEventListener("keydown", function(event){
      let nextIndex = null;

      if(
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ){
        nextIndex =
          (index + 1) % speciesButtons.length;
      }

      if(
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ){
        nextIndex =
          (index - 1 + speciesButtons.length) %
          speciesButtons.length;
      }

      if(event.key === "Home"){
        nextIndex = 0;
      }

      if(event.key === "End"){
        nextIndex = speciesButtons.length - 1;
      }

      if(nextIndex === null) return;

      event.preventDefault();

      speciesButtons[nextIndex].focus();
      currentSpecies =
        speciesButtons[nextIndex].dataset.p44Species;
      currentStep = "species";
      render();
    });

  });

  flowButtons.forEach(function(button){
    button.addEventListener("click", function(){
      currentStep = button.dataset.p44Step;
      render();
    });
  });

  render();

  const revealItems = document.querySelectorAll(
    ".cap5-page44 .cap5-p44-reveal"
  );

  if(!("IntersectionObserver" in window)){
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
      threshold:.14,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });

})();
/* =========================
   CAPÍTULO 5 — PÁGINA 45
   TESTE DE SUSCETIBILIDADE
   ========================= */

(function initCap5Page45(){
  const root = document.querySelector("[data-cap5-p45-tempo]");

  if(root){
    initTemporalInteraction(root);
  }

  initReveal();


  /* =========================
     EVOLUÇÃO TEMPORAL
     ========================= */

  function initTemporalInteraction(root){
    const buttons = Array.from(
      root.querySelectorAll("[data-p45-tempo]")
    );

    const image = root.querySelector(
      "#cap5P45TempoImage"
    );

    const caption = root.querySelector(
      "#cap5P45TempoCaption"
    );

    const note = root.querySelector(
      "#cap5P45TempoNote"
    );

    const zoomButton = root.querySelector(
      "#cap5P45Zoom"
    );

    if(
      !buttons.length ||
      !image ||
      !caption ||
      !note ||
      !zoomButton
    ){
      return;
    }

    const states = {
      "0":{
        image:"../../assets/capitulo-05/imagens/difusao-disco-0h.png",
        alt:"Placa de difusão em disco no tempo inicial",
        caption:"Tempo inicial: os discos foram posicionados, mas ainda não ocorreu crescimento bacteriano suficiente para leitura.",
        note:`
          <strong>O que está acontecendo?</strong>
          <p>O antibacteriano começa a difundir-se no meio, mas o resultado ainda não pode ser interpretado.</p>
        `
      },

      "6":{
        image:"../../assets/capitulo-05/imagens/difusao-disco-6h.png",
        alt:"Placa de difusão em disco após seis horas de incubação",
        caption:"Após 6 horas, a difusão e o crescimento bacteriano ainda estão em desenvolvimento.",
        note:`
          <strong>Leitura ainda prematura</strong>
          <p>Podem surgir diferenças iniciais ao redor dos discos, mas o padrão ainda não está suficientemente estabelecido para medição confiável.</p>
        `
      },

      "12":{
        image:"../../assets/capitulo-05/imagens/difusao-disco-12h.png",
        alt:"Placa de difusão em disco após doze horas de incubação",
        caption:"Após 12 horas, as zonas de inibição tornam-se mais perceptíveis, mas a incubação ainda não foi concluída.",
        note:`
          <strong>Formação progressiva dos halos</strong>
          <p>O crescimento bacteriano e o gradiente de concentração começam a produzir zonas mais definidas ao redor de alguns discos.</p>
        `
      },

      "18":{
        image:"../../assets/capitulo-05/imagens/difusao-disco-18h.png",
        alt:"Placa de difusão em disco após dezoito horas de incubação",
        caption:"Após 18 horas, o crescimento e as zonas de inibição apresentam definição adequada para muitos testes padronizados.",
        note:`
          <strong>Padrão próximo à leitura</strong>
          <p>Os halos podem ser medidos quando o tempo e as condições recomendadas para o microrganismo e o método foram atingidos.</p>
        `
      },

      "24":{
        image:"../../assets/capitulo-05/imagens/difusao-disco-24h.png",
        alt:"Placa de difusão em disco após vinte e quatro horas de incubação",
        caption:"Ao final da incubação, os halos são medidos e interpretados conforme pontos de corte padronizados.",
        note:`
          <strong>Leitura do teste</strong>
          <p>O diâmetro das zonas de inibição pode ser comparado aos critérios interpretativos aplicáveis à espécie e ao antibacteriano.</p>
        `
      }
    };

    let transitionTimer = null;

    function render(time){
      const state = states[time];

      if(!state) return;

      buttons.forEach(function(button){
        const active =
          button.dataset.p45Tempo === time;

        button.classList.toggle(
          "is-active",
          active
        );

        button.setAttribute(
          "aria-selected",
          active ? "true" : "false"
        );

        button.setAttribute(
          "tabindex",
          active ? "0" : "-1"
        );
      });

      window.clearTimeout(transitionTimer);
      image.classList.add("is-changing");

      transitionTimer = window.setTimeout(function(){
        image.src = state.image;
        image.alt = state.alt;
        caption.textContent = state.caption;
        note.innerHTML = state.note;

        zoomButton.dataset.zoom = state.image;

        zoomButton.setAttribute(
          "aria-label",
          "Ampliar imagem da difusão em disco após " +
          time +
          " horas"
        );

        image.classList.remove("is-changing");
      }, 130);
    }

    buttons.forEach(function(button, index){

      button.addEventListener("click", function(){
        render(button.dataset.p45Tempo);
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

        buttons[nextIndex].focus();

        render(
          buttons[nextIndex].dataset.p45Tempo
        );
      });

    });

    render("0");
  }


  /* =========================
     ENTRADA SUAVE
     ========================= */

  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page45 .cap5-p45-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
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
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();



/* =========================
   CAPÍTULO 5 — PÁGINA 46
   INTERPRETAÇÃO DO ANTIBIOGRAMA
   ========================= */

(function initCap5Page46(){
  const root = document.querySelector("[data-cap5-p46]");

  if(root){
    initMethodComparison(root);
  }

  initReveal();


  function initMethodComparison(root){
    const tabs = Array.from(
      root.querySelectorAll("[data-p46-target]")
    );

    const view = root.querySelector("#cap5P46View");
    const kicker = root.querySelector("#cap5P46Kicker");
    const title = root.querySelector("#cap5P46Title");
    const intro = root.querySelector("#cap5P46Intro");
    const flow = root.querySelector("#cap5P46Flow");
    const body = root.querySelector("#cap5P46Body");

    if(
      !tabs.length ||
      !view ||
      !kicker ||
      !title ||
      !intro ||
      !flow ||
      !body
    ){
      return;
    }

    const states = {
      disco:{
        tabId:"cap5P46TabDisco",
        kicker:"Medida em milímetros",
        title:"Diâmetro do halo de inibição",
        intro:"O laboratório mede a zona sem crescimento bacteriano formada ao redor do disco impregnado com antibacteriano.",
        flow:`
          <article>
            <span>1</span>
            <strong>Valor medido</strong>
            <p>Halo de 28 mm.</p>
          </article>

          <b aria-hidden="true">→</b>

          <article>
            <span>2</span>
            <strong>Breakpoint aplicável</strong>
            <p>Exemplo didático: S ≥ 25 mm.</p>
          </article>

          <b aria-hidden="true">→</b>

          <article class="cap5-p46-resultFlowFinal">
            <span>3</span>
            <strong>Categoria liberada</strong>
            <p>Sensível.</p>
          </article>
        `,
        body:`
          <article class="cap5-p46-info">
            <span>O que o método fornece</span>
            <p>Uma medida quantitativa indireta da atividade antimicrobiana, expressa pelo diâmetro do halo.</p>
          </article>

          <article class="cap5-p46-info">
            <span>Como interpretar</span>
            <p>O diâmetro deve ser comparado ao breakpoint específico da combinação entre bactéria e antibacteriano.</p>
          </article>

          <article class="cap5-p46-info">
            <span>Vantagem prática</span>
            <p>É um método padronizado, acessível e amplamente utilizado na rotina microbiológica.</p>
          </article>

          <article class="cap5-p46-info cap5-p46-info--key">
            <span>Limite interpretativo</span>
            <p>Um halo grande ou pequeno não possui significado isolado sem o critério interpretativo correspondente.</p>
          </article>
        `
      },

      mic:{
        tabId:"cap5P46TabMic",
        kicker:"Medida em mg/L",
        title:"Concentração inibitória mínima",
        intro:"A MIC corresponde à menor concentração do antibacteriano capaz de impedir o crescimento visível da bactéria em condições laboratoriais padronizadas.",
        flow:`
          <article>
            <span>1</span>
            <strong>Valor medido</strong>
            <p>MIC de 0,25 mg/L.</p>
          </article>

          <b aria-hidden="true">→</b>

          <article>
            <span>2</span>
            <strong>Breakpoint aplicável</strong>
            <p>Exemplo didático: S ≤ 1 mg/L.</p>
          </article>

          <b aria-hidden="true">→</b>

          <article class="cap5-p46-resultFlowFinal">
            <span>3</span>
            <strong>Categoria liberada</strong>
            <p>Sensível.</p>
          </article>
        `,
        body:`
          <article class="cap5-p46-info">
            <span>O que o método fornece</span>
            <p>Uma medida quantitativa direta da menor concentração que inibe o crescimento visível.</p>
          </article>

          <article class="cap5-p46-info">
            <span>Como interpretar</span>
            <p>A MIC precisa ser comparada ao breakpoint específico para aquela bactéria e aquele antibacteriano.</p>
          </article>

          <article class="cap5-p46-info">
            <span>Quando acrescenta valor</span>
            <p>Pode ser útil em resultados próximos do breakpoint, situações que exigem análise quantitativa ou quando o disco-difusão não é apropriado.</p>
          </article>

          <article class="cap5-p46-info cap5-p46-info--key">
            <span>Limite interpretativo</span>
            <p>Uma MIC numericamente menor não significa, por si só, maior eficácia clínica ou maior potência entre fármacos diferentes.</p>
          </article>
        `
      }
    };

    function render(target){
      const state = states[target];

      if(!state) return;

      tabs.forEach(function(tab){
        const active =
          tab.dataset.p46Target === target;

        tab.classList.toggle("is-active", active);

        tab.setAttribute(
          "aria-selected",
          active ? "true" : "false"
        );

        tab.setAttribute(
          "tabindex",
          active ? "0" : "-1"
        );
      });

      view.setAttribute(
        "aria-labelledby",
        state.tabId
      );

      kicker.textContent = state.kicker;
      title.textContent = state.title;
      intro.textContent = state.intro;
      flow.innerHTML = state.flow;
      body.innerHTML = state.body;
    }

    tabs.forEach(function(tab, index){

      tab.addEventListener("click", function(){
        render(tab.dataset.p46Target);
      });

      tab.addEventListener("keydown", function(event){
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
          nextIndex = tabs.length - 1;
        }

        if(nextIndex === null) return;

        event.preventDefault();

        tabs[nextIndex].focus();

        render(
          tabs[nextIndex].dataset.p46Target
        );
      });

    });

    render("disco");
  }


  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page46 .cap5-p46-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
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
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();
/* =========================
   CAPÍTULO 5 — PÁGINA 47
   BREAKPOINTS E CATEGORIAS S/I/R
   ========================= */

(function initCap5Page47(){
  const root = document.querySelector("[data-cap5-p47]");

  if(root){
    initInterpretationQuestion(root);
  }

  initReveal();


  /* =========================
     QUESTÃO SOBRE A CATEGORIA I
     ========================= */

  function initInterpretationQuestion(root){
    const options = Array.from(
      root.querySelectorAll("[data-p47-option]")
    );

    const feedback = root.querySelector(
      "#cap5P47Feedback"
    );

    if(!options.length || !feedback){
      return;
    }

    const explanations = {
      discard:{
        correct:false,
        title:"Incorreto.",
        text:"A categoria I não equivale à resistência. Ela indica suscetibilidade quando a exposição ao antibacteriano é aumentada de acordo com regimes validados."
      },

      uncertain:{
        correct:false,
        title:"Incorreto.",
        text:"O resultado I possui significado interpretativo definido. Ele não representa uma categoria indeterminada, mas uma condição de suscetibilidade dependente de maior exposição."
      },

      exposure:{
        correct:true,
        title:"Correto.",
        text:"A categoria I indica elevada probabilidade de sucesso terapêutico quando a exposição necessária pode ser alcançada por dose, intervalo, modo de infusão ou concentração elevada no sítio da infecção."
      }
    };

    function selectOption(selectedButton){
      const key = selectedButton.dataset.p47Option;
      const result = explanations[key];

      if(!result) return;

      options.forEach(function(button){
        const buttonKey = button.dataset.p47Option;

        button.disabled = true;

        button.classList.remove(
          "is-correct",
          "is-incorrect",
          "is-dimmed"
        );

        if(buttonKey === "exposure"){
          button.classList.add("is-correct");
        }else if(button === selectedButton){
          button.classList.add("is-incorrect");
        }else{
          button.classList.add("is-dimmed");
        }
      });

      feedback.hidden = false;

      feedback.className = "cap5-p47-feedback";

      feedback.classList.add(
        result.correct
          ? "is-correct"
          : "is-incorrect"
      );

      feedback.innerHTML = `
        <strong>${result.title}</strong>
        <p>${result.text}</p>
      `;
    }

    options.forEach(function(button){
      button.addEventListener("click", function(){
        selectOption(button);
      });
    });
  }


  /* =========================
     ENTRADA SUAVE
     ========================= */

  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page47 .cap5-p47-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
        item.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();
/* =========================
   CAPÍTULO 5 — PÁGINA 48
   OBSERVAÇÕES DO LAUDO
   ========================= */

(function initCap5Page48(){
  const interactionRoot = document.querySelector(
    "[data-cap5-p48]"
  );

  if(interactionRoot){
    initResistanceInteraction(interactionRoot);
  }

  const caseRoot = document.querySelector(
    "[data-cap5-p48-case]"
  );

  if(caseRoot){
    initClinicalCase(caseRoot);
  }

  initReveal();


  /* =========================
     MECANISMOS DE RESISTÊNCIA
     ========================= */

  function initResistanceInteraction(root){
    const tabs = Array.from(
      root.querySelectorAll("[data-p48-target]")
    );

    const view = root.querySelector("#cap5P48View");
    const kicker = root.querySelector("#cap5P48Kicker");
    const title = root.querySelector("#cap5P48Title");
    const intro = root.querySelector("#cap5P48Intro");
    const body = root.querySelector("#cap5P48Body");

    if(
      !tabs.length ||
      !view ||
      !kicker ||
      !title ||
      !intro ||
      !body
    ){
      return;
    }

    const states = {
      esbl:{
        tabId:"cap5P48TabEsbl",
        kicker:"β-lactamase de espectro estendido",
        title:"ESBL",
        intro:"Indica produção de enzimas capazes de hidrolisar diferentes β-lactâmicos, especialmente penicilinas, cefalosporinas de amplo espectro e aztreonam.",
        body:`
          <article class="cap5-p48-info">
            <span>Onde é mais relevante</span>
            <p>Principalmente em Enterobacterales, como <em>Escherichia coli</em> e <em>Klebsiella pneumoniae</em>.</p>
          </article>

          <article class="cap5-p48-info">
            <span>O que modifica no painel</span>
            <p>A leitura dos β-lactâmicos deve considerar o mecanismo informado e os pontos de corte vigentes para a espécie.</p>
          </article>

          <article class="cap5-p48-info">
            <span>Impacto clínico</span>
            <p>Pode modificar significativamente a escolha terapêutica, especialmente em infecções invasivas.</p>
          </article>

          <article class="cap5-p48-info cap5-p48-info--key">
            <span>Cuidado de interpretação</span>
            <p>A presença de ESBL não deve ser analisada isoladamente: é necessário integrar foco infeccioso, gravidade e perfil completo de suscetibilidade.</p>
          </article>
        `
      },

      ampc:{
        tabId:"cap5P48TabAmpc",
        kicker:"Cefalosporinase",
        title:"AmpC",
        intro:"AmpC corresponde a uma β-lactamase capaz de comprometer a atividade de diferentes β-lactâmicos. Pode ser cromossômica, induzível, hiperproduzida ou adquirida.",
        body:`
          <article class="cap5-p48-info">
            <span>Onde é mais relevante</span>
            <p>Em determinadas Enterobacterales, especialmente espécies com potencial de expressão induzível ou desreprimida.</p>
          </article>

          <article class="cap5-p48-info">
            <span>O que modifica no painel</span>
            <p>Um resultado inicial favorável para algumas cefalosporinas pode exigir cautela devido ao risco de seleção de resistência durante o tratamento.</p>
          </article>

          <article class="cap5-p48-info">
            <span>Impacto clínico</span>
            <p>A interpretação deve considerar a espécie, o sítio da infecção, a carga bacteriana e o risco de expressão aumentada do mecanismo.</p>
          </article>

          <article class="cap5-p48-info cap5-p48-info--key">
            <span>Cuidado de interpretação</span>
            <p>AmpC não significa automaticamente falha com todos os β-lactâmicos, mas exige leitura crítica e conhecimento do comportamento da espécie.</p>
          </article>
        `
      },

      carbapenemases:{
        tabId:"cap5P48TabCarbapenemases",
        kicker:"KPC · NDM · OXA-48-like",
        title:"Carbapenemases",
        intro:"São enzimas capazes de hidrolisar carbapenêmicos e outros β-lactâmicos, com extensão variável conforme a classe enzimática.",
        body:`
          <article class="cap5-p48-info">
            <span>Principais grupos</span>
            <p>KPC pertence às serino-carbapenemases; NDM é uma metalo-β-lactamase; OXA-48-like pertence ao grupo das oxacilinases.</p>
          </article>

          <article class="cap5-p48-info">
            <span>O que modifica no painel</span>
            <p>A suscetibilidade aos carbapenêmicos e a outros β-lactâmicos deve ser interpretada considerando o tipo de enzima e os agentes disponíveis.</p>
          </article>

          <article class="cap5-p48-info">
            <span>Impacto clínico</span>
            <p>Esses mecanismos podem limitar fortemente as opções terapêuticas e possuem relevância epidemiológica para controle de disseminação.</p>
          </article>

          <article class="cap5-p48-info cap5-p48-info--key">
            <span>Cuidado de interpretação</span>
            <p>Diferentes carbapenemases apresentam perfis enzimáticos distintos; a sigla informada pode influenciar a escolha entre alternativas específicas.</p>
          </article>
        `
      },

      mrsa:{
        tabId:"cap5P48TabMrsa",
        kicker:"Resistência à meticilina",
        title:"MRSA",
        intro:"MRSA indica resistência à meticilina ou oxacilina em <em>Staphylococcus aureus</em>, geralmente associada à produção de uma proteína ligadora de penicilina de baixa afinidade.",
        body:`
          <article class="cap5-p48-info">
            <span>Onde é relevante</span>
            <p>Exclusivamente no contexto de <em>Staphylococcus aureus</em> resistente à meticilina.</p>
          </article>

          <article class="cap5-p48-info">
            <span>O que modifica no painel</span>
            <p>Prediz resistência à maioria dos β-lactâmicos, com exceção de agentes especificamente desenvolvidos e validados para atividade contra MRSA.</p>
          </article>

          <article class="cap5-p48-info">
            <span>Impacto clínico</span>
            <p>Modifica de forma ampla a seleção de antibacterianos em infecções causadas por <em>S. aureus</em>.</p>
          </article>

          <article class="cap5-p48-info cap5-p48-info--key">
            <span>Cuidado de interpretação</span>
            <p>O resultado não deve ser lido β-lactâmico por β-lactâmico de forma isolada; o fenótipo modifica a interpretação do grupo.</p>
          </article>
        `
      },

      vre:{
        tabId:"cap5P48TabVre",
        kicker:"Enterococo resistente à vancomicina",
        title:"VRE",
        intro:"VRE indica resistência à vancomicina em enterococos, decorrente de alterações no alvo do glicopeptídeo.",
        body:`
          <article class="cap5-p48-info">
            <span>Onde é relevante</span>
            <p>Principalmente em espécies de <em>Enterococcus</em>, com importância variável conforme a espécie e o contexto clínico.</p>
          </article>

          <article class="cap5-p48-info">
            <span>O que modifica no painel</span>
            <p>A vancomicina deixa de ser considerada uma opção ativa, e o restante do painel deve ser analisado para identificar alternativas.</p>
          </article>

          <article class="cap5-p48-info">
            <span>Impacto clínico</span>
            <p>Pode restringir as opções terapêuticas, especialmente em bacteremias, endocardites e infecções invasivas.</p>
          </article>

          <article class="cap5-p48-info cap5-p48-info--key">
            <span>Cuidado de interpretação</span>
            <p>A escolha do tratamento depende da espécie, do sítio da infecção e da suscetibilidade aos agentes alternativos.</p>
          </article>
        `
      }
    };

    function render(target){
      const state = states[target];

      if(!state) return;

      tabs.forEach(function(tab){
        const active =
          tab.dataset.p48Target === target;

        tab.classList.toggle("is-active", active);

        tab.setAttribute(
          "aria-selected",
          active ? "true" : "false"
        );

        tab.setAttribute(
          "tabindex",
          active ? "0" : "-1"
        );
      });

      view.setAttribute(
        "aria-labelledby",
        state.tabId
      );

      kicker.textContent = state.kicker;
      title.textContent = state.title;
      intro.innerHTML = state.intro;
      body.innerHTML = state.body;
    }

    tabs.forEach(function(tab, index){

      tab.addEventListener("click", function(){
        render(tab.dataset.p48Target);
      });

      tab.addEventListener("keydown", function(event){
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
          nextIndex = tabs.length - 1;
        }

        if(nextIndex === null) return;

        event.preventDefault();

        tabs[nextIndex].focus();

        render(
          tabs[nextIndex].dataset.p48Target
        );
      });

    });

    render("esbl");
  }


  /* =========================
     CASO CLÍNICO
     ========================= */

  function initClinicalCase(root){
    const options = Array.from(
      root.querySelectorAll("[data-p48-answer]")
    );

    const feedback = root.querySelector(
      "#cap5P48Feedback"
    );

    if(!options.length || !feedback){
      return;
    }

    const answers = {
      mic:{
        correct:false,
        title:"Incorreto.",
        text:"A MIC não deve ser usada isoladamente para comparar antibacterianos diferentes. A interpretação exige breakpoint, mecanismo informado e contexto clínico."
      },

      ignore:{
        correct:false,
        title:"Incorreto.",
        text:"A observação de ESBL acrescenta informação relevante e modifica o contexto de leitura dos β-lactâmicos."
      },

      integrate:{
        correct:true,
        title:"Correto.",
        text:"O laudo deve ser interpretado integrando espécie, mecanismo de resistência, perfil S/I/R, foco infeccioso, gravidade e exposição possível ao antibacteriano."
      },

      automatic:{
        correct:false,
        title:"Incorreto.",
        text:"A presença de ESBL não determina, isoladamente, uma única escolha terapêutica para todas as infecções e todos os pacientes."
      }
    };

    function selectAnswer(selectedButton){
      const key = selectedButton.dataset.p48Answer;
      const result = answers[key];

      if(!result) return;

      options.forEach(function(button){
        const buttonKey = button.dataset.p48Answer;

        button.disabled = true;

        button.classList.remove(
          "is-correct",
          "is-incorrect",
          "is-dimmed"
        );

        if(buttonKey === "integrate"){
          button.classList.add("is-correct");
        }else if(button === selectedButton){
          button.classList.add("is-incorrect");
        }else{
          button.classList.add("is-dimmed");
        }
      });

      feedback.hidden = false;
      feedback.className = "cap5-p48-feedback";

      feedback.classList.add(
        result.correct
          ? "is-correct"
          : "is-incorrect"
      );

      feedback.innerHTML = `
        <strong>${result.title}</strong>
        <p>${result.text}</p>
      `;
    }

    options.forEach(function(button){
      button.addEventListener("click", function(){
        selectAnswer(button);
      });
    });
  }


  /* =========================
     ENTRADA SUAVE
     ========================= */

  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page48 .cap5-p48-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
        item.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();

/* =========================
   CAPÍTULO 5 — PÁGINA 49
   ESBL
   ========================= */

(function initCap5Page49(){
  const root = document.querySelector("[data-cap5-p49]");

  if(root){
    initEsblInteraction(root);
  }

  initReveal();


  /* =========================
     INTERAÇÃO ESBL
     ========================= */

  function initEsblInteraction(root){
    const tabs = Array.from(
      root.querySelectorAll("[data-p49-target]")
    );

    const view = root.querySelector("#cap5P49View");
    const image = root.querySelector("#cap5P49Image");
    const caption = root.querySelector("#cap5P49Caption");
    const kicker = root.querySelector("#cap5P49Kicker");
    const title = root.querySelector("#cap5P49Title");
    const body = root.querySelector("#cap5P49Body");
    const zoomButton = root.querySelector("#cap5P49Zoom");

    if(
      !tabs.length ||
      !view ||
      !image ||
      !caption ||
      !kicker ||
      !title ||
      !body ||
      !zoomButton
    ){
      return;
    }

    const states = {
      screening:{
        tabId:"cap5P49TabScreening",
        image:"../../assets/capitulo-05/imagens/esbl-perfil-sugestivo.png",
        alt:"Teste de suscetibilidade com perfil sugestivo de produção de ESBL",
        caption:"Perfil fenotípico que pode levantar a suspeita de produção de ESBL.",
        kicker:"Etapa de triagem",
        title:"Redução da suscetibilidade a cefalosporinas de amplo espectro",
        body:`
          <article class="cap5-p49-info">
            <span>O que o laboratório observa</span>
            <p>Um padrão de redução dos halos de inibição frente a determinados β-lactâmicos utilizados na investigação.</p>
          </article>

          <article class="cap5-p49-info">
            <span>O que esse padrão indica</span>
            <p>O comportamento pode levantar a suspeita de produção de uma β-lactamase de espectro estendido.</p>
          </article>

          <article class="cap5-p49-info">
            <span>O que ainda não conclui</span>
            <p>O padrão sugestivo, isoladamente, não deve ser confundido com confirmação definitiva do mecanismo.</p>
          </article>

          <article class="cap5-p49-info cap5-p49-info--key">
            <span>Ponto principal</span>
            <p>A triagem seleciona isolados que exigem avaliação complementar pelo método adotado pelo laboratório.</p>
          </article>
        `
      },

      confirmation:{
        tabId:"cap5P49TabConfirmation",
        image:"../../assets/capitulo-05/imagens/esbl-confirmacao-clavulanato.png",
        alt:"Teste fenotípico confirmatório de ESBL com ácido clavulânico",
        caption:"Aumento do halo na presença do ácido clavulânico, demonstrando inibição da enzima.",
        kicker:"Demonstração fenotípica",
        title:"Aumento do halo na presença do ácido clavulânico",
        body:`
          <article class="cap5-p49-info">
            <span>Princípio do teste</span>
            <p>Compara-se o comportamento do β-lactâmico isolado com aquele observado quando associado ao ácido clavulânico.</p>
          </article>

          <article class="cap5-p49-info">
            <span>Ação do clavulanato</span>
            <p>O inibidor bloqueia a atividade da β-lactamase e permite recuperação da ação do antibacteriano no teste.</p>
          </article>

          <article class="cap5-p49-info">
            <span>Resultado observado</span>
            <p>O aumento do halo demonstra sinergia entre o β-lactâmico e o inibidor, compatível com produção de ESBL.</p>
          </article>

          <article class="cap5-p49-info cap5-p49-info--key">
            <span>Ponto principal</span>
            <p>O teste evidencia que a redução da atividade do β-lactâmico estava relacionada a uma enzima inibida pelo clavulanato.</p>
          </article>
        `
      }
    };

    let transitionTimer = null;

    function render(target){
      const state = states[target];

      if(!state) return;

      tabs.forEach(function(tab){
        const active =
          tab.dataset.p49Target === target;

        tab.classList.toggle("is-active", active);

        tab.setAttribute(
          "aria-selected",
          active ? "true" : "false"
        );

        tab.setAttribute(
          "tabindex",
          active ? "0" : "-1"
        );
      });

      view.setAttribute(
        "aria-labelledby",
        state.tabId
      );

      window.clearTimeout(transitionTimer);
      image.classList.add("is-changing");

      transitionTimer = window.setTimeout(function(){
        image.src = state.image;
        image.alt = state.alt;

        caption.textContent = state.caption;
        kicker.textContent = state.kicker;
        title.textContent = state.title;
        body.innerHTML = state.body;

        zoomButton.dataset.zoom = state.image;

        zoomButton.setAttribute(
          "aria-label",
          "Ampliar imagem: " + state.title
        );

        image.classList.remove("is-changing");
      }, 130);
    }

    tabs.forEach(function(tab, index){

      tab.addEventListener("click", function(){
        render(tab.dataset.p49Target);
      });

      tab.addEventListener("keydown", function(event){
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
          nextIndex = tabs.length - 1;
        }

        if(nextIndex === null) return;

        event.preventDefault();

        tabs[nextIndex].focus();

        render(
          tabs[nextIndex].dataset.p49Target
        );
      });

    });

    render("screening");
  }


  /* =========================
     ENTRADA SUAVE
     ========================= */

  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page49 .cap5-p49-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
        item.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();
/* =========================
   CAPÍTULO 5 — PÁGINA 50
   AmpC E GRUPO CESP
   ========================= */

(function initCap5Page50(){
  const speciesRoot = document.querySelector(
    "[data-cap5-p50]"
  );

  if(speciesRoot){
    initSpeciesInteraction(speciesRoot);
  }

  const processRoot = document.querySelector(
    "[data-cap5-p50-process]"
  );

  if(processRoot){
    initProcessInteraction(processRoot);
  }

  const caseRoot = document.querySelector(
    "[data-cap5-p50-case]"
  );

  if(caseRoot){
    initClinicalCase(caseRoot);
  }

  initMnemonicModal();
  initReveal();


  /* =========================
     CLASSIFICAÇÃO DAS ESPÉCIES
     ========================= */

  function initSpeciesInteraction(root){
    const buttons = Array.from(
      root.querySelectorAll("[data-p50-species]")
    );

    const view = root.querySelector(
      "#cap5P50SpeciesView"
    );

    const badge = root.querySelector(
      "#cap5P50RiskBadge"
    );

    const title = root.querySelector(
      "#cap5P50SpeciesTitle"
    );

    const intro = root.querySelector(
      "#cap5P50SpeciesIntro"
    );

    const body = root.querySelector(
      "#cap5P50SpeciesBody"
    );

    if(
      !buttons.length ||
      !view ||
      !badge ||
      !title ||
      !intro ||
      !body
    ){
      return;
    }

    const states = {
      enterobacter:{
        tabId:"cap5P50SpeciesEnterobacter",
        riskClass:"cap5-p50-speciesView--moderate",
        badge:"Risco moderado",
        title:"<em>Enterobacter cloacae</em> complex",
        intro:"Espécie associada a risco moderado de produção clinicamente significativa de AmpC induzível.",
        body:moderateRiskBody()
      },

      klebsiella:{
        tabId:"cap5P50SpeciesKlebsiella",
        riskClass:"cap5-p50-speciesView--moderate",
        badge:"Risco moderado",
        title:"<em>Klebsiella aerogenes</em>",
        intro:"Espécie anteriormente denominada <em>Enterobacter aerogenes</em>, associada a risco moderado de desrepressão clinicamente significativa.",
        body:moderateRiskBody()
      },

      citrobacter:{
        tabId:"cap5P50SpeciesCitrobacter",
        riskClass:"cap5-p50-speciesView--moderate",
        badge:"Risco moderado",
        title:"<em>Citrobacter freundii</em>",
        intro:"Espécie associada a risco moderado de produção clinicamente significativa de AmpC induzível.",
        body:moderateRiskBody()
      },

      serratia:{
        tabId:"cap5P50SpeciesSerratia",
        riskClass:"cap5-p50-speciesView--lower",
        badge:"Menor risco",
        title:"<em>Serratia marcescens</em>",
        intro:"Possui AmpC cromossômica, mas apresenta menor risco de desrepressão clinicamente significativa.",
        body:lowerRiskBody()
      },

      morganella:{
        tabId:"cap5P50SpeciesMorganella",
        riskClass:"cap5-p50-speciesView--lower",
        badge:"Menor risco",
        title:"<em>Morganella morganii</em>",
        intro:"Possui AmpC cromossômica induzível, mas apresenta menor frequência de desrepressão clinicamente significativa.",
        body:lowerRiskBody()
      },

      providencia:{
        tabId:"cap5P50SpeciesProvidencia",
        riskClass:"cap5-p50-speciesView--lower",
        badge:"Menor risco",
        title:"<em>Providencia</em> spp.",
        intro:"O grupo possui AmpC cromossômica, porém apresenta menor risco de expressão clinicamente significativa.",
        body:lowerRiskBody()
      }
    };

    function moderateRiskBody(){
      return `
        <article class="cap5-p50-info">
          <span>O que a identificação informa</span>
          <p>A espécie possui potencial biológico para aumentar a expressão de AmpC durante a exposição a determinados β-lactâmicos.</p>
        </article>

        <article class="cap5-p50-info">
          <span>Risco microbiológico</span>
          <p>Subpopulações com produção elevada da enzima podem ser selecionadas e passar a predominar durante o tratamento.</p>
        </article>

        <article class="cap5-p50-info">
          <span>Quando exige maior cautela</span>
          <p>Em bacteremias, infecções profundas, elevada carga bacteriana ou controle inadequado do foco.</p>
        </article>

        <article class="cap5-p50-info cap5-p50-info--key">
          <span>Como interpretar</span>
          <p>O resultado inicial S, I ou R deve ser integrado à espécie, ao antibacteriano utilizado e ao contexto clínico.</p>
        </article>
      `;
    }

    function lowerRiskBody(){
      return `
        <article class="cap5-p50-info">
          <span>O que a identificação informa</span>
          <p>A espécie possui AmpC cromossômica, mas o comportamento clínico não deve ser automaticamente equiparado ao das espécies de risco moderado.</p>
        </article>

        <article class="cap5-p50-info">
          <span>Risco microbiológico</span>
          <p>A desrepressão clinicamente significativa ocorre com menor frequência.</p>
        </article>

        <article class="cap5-p50-info">
          <span>Conduta interpretativa</span>
          <p>O antibiograma e o contexto clínico permanecem centrais para a escolha terapêutica.</p>
        </article>

        <article class="cap5-p50-info cap5-p50-info--key">
          <span>Como interpretar</span>
          <p>A presença da espécie no mnemônico CESP não justifica presumir automaticamente o mesmo risco das espécies de risco moderado.</p>
        </article>
      `;
    }

    function render(target){
      const state = states[target];

      if(!state) return;

      buttons.forEach(function(button){
        const active =
          button.dataset.p50Species === target;

        button.classList.toggle("is-active", active);

        button.setAttribute(
          "aria-selected",
          active ? "true" : "false"
        );

        button.setAttribute(
          "tabindex",
          active ? "0" : "-1"
        );
      });

      view.classList.remove(
        "cap5-p50-speciesView--moderate",
        "cap5-p50-speciesView--lower"
      );

      view.classList.add(state.riskClass);

      view.setAttribute(
        "aria-labelledby",
        state.tabId
      );

      badge.textContent = state.badge;
      title.innerHTML = state.title;
      intro.innerHTML = state.intro;
      body.innerHTML = state.body;
    }

    buttons.forEach(function(button, index){

      button.addEventListener("click", function(){
        render(button.dataset.p50Species);
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

        buttons[nextIndex].focus();

        render(
          buttons[nextIndex].dataset.p50Species
        );
      });

    });

    render("enterobacter");
  }


  /* =========================
     PROCESSO DE DESREPRESSÃO
     ========================= */

  function initProcessInteraction(root){
    const buttons = Array.from(
      root.querySelectorAll("[data-p50-process]")
    );

    const kicker = root.querySelector(
      "#cap5P50ProcessKicker"
    );

    const title = root.querySelector(
      "#cap5P50ProcessPanelTitle"
    );

    const text = root.querySelector(
      "#cap5P50ProcessText"
    );

    if(
      !buttons.length ||
      !kicker ||
      !title ||
      !text
    ){
      return;
    }

    const states = {
      initial:{
        kicker:"Etapa inicial",
        title:"Expressão basal de AmpC",
        text:"A população bacteriana pode apresentar expressão basal da enzima e ser inicialmente classificada como suscetível a determinado agente."
      },

      exposure:{
        kicker:"Pressão seletiva",
        title:"Exposição ao β-lactâmico",
        text:"O antibacteriano exerce pressão seletiva sobre a população e elimina preferencialmente as bactérias mais suscetíveis."
      },

      selection:{
        kicker:"Mudança populacional",
        title:"Seleção de subpopulações",
        text:"Subpopulações com alterações regulatórias e expressão aumentada de AmpC podem sobreviver e passar a predominar."
      },

      derepression:{
        kicker:"Produção aumentada",
        title:"Desrepressão da AmpC",
        text:"A bactéria passa a produzir quantidade elevada e estável da enzima, aumentando a hidrólise de determinados β-lactâmicos."
      },

      resistance:{
        kicker:"Consequência microbiológica",
        title:"Possível resistência durante a terapia",
        text:"O perfil de suscetibilidade pode se modificar, com aparecimento de resistência microbiológica e risco de falha terapêutica."
      }
    };

    function render(target){
      const state = states[target];

      if(!state) return;

      buttons.forEach(function(button){
        const active =
          button.dataset.p50Process === target;

        button.classList.toggle("is-active", active);

        button.setAttribute(
          "aria-selected",
          active ? "true" : "false"
        );

        button.setAttribute(
          "tabindex",
          active ? "0" : "-1"
        );
      });

      kicker.textContent = state.kicker;
      title.textContent = state.title;
      text.textContent = state.text;
    }

    buttons.forEach(function(button, index){

      button.addEventListener("click", function(){
        render(button.dataset.p50Process);
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

        buttons[nextIndex].focus();

        render(
          buttons[nextIndex].dataset.p50Process
        );
      });

    });

    render("initial");
  }


  /* =========================
     CASO CLÍNICO
     ========================= */

  function initClinicalCase(root){
    const options = Array.from(
      root.querySelectorAll("[data-p50-answer]")
    );

    const feedback = root.querySelector(
      "#cap5P50CaseFeedback"
    );

    if(!options.length || !feedback){
      return;
    }

    const answers = {
      isolated:{
        correct:false,
        title:"Incorreto.",
        text:"A categoria S representa o resultado obtido nas condições do teste, mas não elimina a possibilidade de seleção de resistência durante a exposição a determinados β-lactâmicos."
      },

      integrated:{
        correct:true,
        title:"Correto.",
        text:"O problema não é considerar o resultado S como tecnicamente inválido. É reconhecer que a espécie possui capacidade biológica de modificar o perfil durante o tratamento, exigindo interpretação integrada."
      },

      all:{
        correct:false,
        title:"Incorreto.",
        text:"A presença de AmpC não significa que todos os β-lactâmicos sejam automaticamente inativos. A interpretação depende da espécie, do agente testado e do contexto clínico."
      }
    };

    function selectAnswer(selectedButton){
      const key = selectedButton.dataset.p50Answer;
      const result = answers[key];

      if(!result) return;

      options.forEach(function(button){
        const buttonKey = button.dataset.p50Answer;

        button.disabled = true;

        button.classList.remove(
          "is-correct",
          "is-incorrect",
          "is-dimmed"
        );

        if(buttonKey === "integrated"){
          button.classList.add("is-correct");
        }else if(button === selectedButton){
          button.classList.add("is-incorrect");
        }else{
          button.classList.add("is-dimmed");
        }
      });

      feedback.hidden = false;
      feedback.className = "cap5-p50-caseFeedback";

      feedback.classList.add(
        result.correct
          ? "is-correct"
          : "is-incorrect"
      );

      feedback.innerHTML = `
        <strong>${result.title}</strong>
        <p>${result.text}</p>
      `;
    }

    options.forEach(function(button){
      button.addEventListener("click", function(){
        selectAnswer(button);
      });
    });
  }


  /* =========================
     MODAL DO MNEMÔNICO
     ========================= */

  function initMnemonicModal(){
    const openButton = document.querySelector(
      "[data-p50-open-mnemonic]"
    );

    const modal = document.querySelector(
      "[data-p50-mnemonic-modal]"
    );

    if(!openButton || !modal) return;

    const closeButtons = Array.from(
      modal.querySelectorAll(
        "[data-p50-close-mnemonic]"
      )
    );

    const closeButton = modal.querySelector(
      ".cap5-p50-modalClose"
    );

    let previousFocus = null;

    function openModal(){
      previousFocus = document.activeElement;

      modal.hidden = false;
      document.body.style.overflow = "hidden";

      window.setTimeout(function(){
        if(closeButton){
          closeButton.focus();
        }
      }, 20);
    }

    function closeModal(){
      modal.hidden = true;
      document.body.style.overflow = "";

      if(previousFocus){
        previousFocus.focus();
      }
    }

    openButton.addEventListener("click", openModal);

    closeButtons.forEach(function(button){
      button.addEventListener("click", closeModal);
    });

    document.addEventListener("keydown", function(event){
      if(event.key === "Escape" && !modal.hidden){
        closeModal();
      }
    });
  }


  /* =========================
     ENTRADA SUAVE
     ========================= */

  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page50 .cap5-p50-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
        item.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();

/* =========================
   CAPÍTULO 5 — PÁGINA 51
   CARBAPENEMASES
   ========================= */

(function initCap5Page51(){
  const flowRoot = document.querySelector(
    "[data-cap5-p51-flow]"
  );

  if(flowRoot){
    initInterpretationFlow(flowRoot);
  }

  const caseRoot = document.querySelector(
    "[data-cap5-p51-case]"
  );

  if(caseRoot){
    initClinicalCase(caseRoot);
  }

  initReveal();


  /* =========================
     FLUXO DE INTERPRETAÇÃO
     ========================= */

  function initInterpretationFlow(root){
    const buttons = Array.from(
      root.querySelectorAll("[data-p51-step]")
    );

    const kicker = root.querySelector(
      "#cap5P51FlowKicker"
    );

    const title = root.querySelector(
      "#cap5P51FlowPanelTitle"
    );

    const text = root.querySelector(
      "#cap5P51FlowText"
    );

    if(
      !buttons.length ||
      !kicker ||
      !title ||
      !text
    ){
      return;
    }

    const states = {
      identification:{
        kicker:"Etapa 1",
        title:"A espécie fornece o contexto inicial",
        text:"A identificação de <em>Klebsiella pneumoniae</em> direciona o raciocínio para uma Enterobacterales com relevância clínica e epidemiológica na disseminação de mecanismos de resistência."
      },

      mechanism:{
        kicker:"Etapa 2",
        title:"A sigla indica o mecanismo detectado",
        text:"A observação “KPC positiva” informa que o isolado produz uma carbapenemase específica. Esse dado acrescenta informação que não pode ser obtida apenas pela leitura isolada das categorias S, I e R."
      },

      panel:{
        kicker:"Etapa 3",
        title:"O antibiograma precisa ser lido de forma integrada",
        text:"A presença da carbapenemase modifica o contexto do painel. É necessário verificar quais agentes apresentam atividade laboratorial e se essa atividade é coerente com o mecanismo informado."
      },

      context:{
        kicker:"Etapa 4",
        title:"O foco e a gravidade influenciam a decisão",
        text:"O significado clínico do resultado depende do sítio da infecção, da gravidade do paciente, da carga bacteriana, do controle do foco e da exposição alcançável pelo tratamento."
      },

      therapy:{
        kicker:"Etapa 5",
        title:"A terapia deve possuir atividade prevista contra o mecanismo",
        text:"A escolha final deve integrar o perfil de suscetibilidade e a atividade conhecida do agente ou da combinação diante da carbapenemase identificada."
      }
    };

    function render(target){
      const state = states[target];

      if(!state) return;

      buttons.forEach(function(button){
        const active =
          button.dataset.p51Step === target;

        button.classList.toggle(
          "is-active",
          active
        );

        button.setAttribute(
          "aria-selected",
          active ? "true" : "false"
        );

        button.setAttribute(
          "tabindex",
          active ? "0" : "-1"
        );
      });

      kicker.textContent = state.kicker;
      title.textContent = state.title;
      text.innerHTML = state.text;
    }

    buttons.forEach(function(button, index){

      button.addEventListener("click", function(){
        render(button.dataset.p51Step);
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

        buttons[nextIndex].focus();

        render(
          buttons[nextIndex].dataset.p51Step
        );
      });

    });

    render("identification");
  }


  /* =========================
     CASO CLÍNICO
     ========================= */

  function initClinicalCase(root){
    const options = Array.from(
      root.querySelectorAll("[data-p51-answer]")
    );

    const feedback = root.querySelector(
      "#cap5P51CaseFeedback"
    );

    if(!options.length || !feedback){
      return;
    }

    const answers = {
      all:{
        correct:false,
        title:"Incorreto.",
        text:"A presença de KPC não significa que todos os antibacterianos sejam ineficazes. O perfil completo de suscetibilidade ainda precisa ser analisado."
      },

      ignore:{
        correct:false,
        title:"Incorreto.",
        text:"A observação de KPC não deve ser ignorada. Ela informa um mecanismo que modifica o contexto de interpretação do painel."
      },

      integrate:{
        correct:true,
        title:"Correto.",
        text:"A escolha terapêutica deve integrar o mecanismo identificado, o perfil de suscetibilidade, o sítio da infecção, a gravidade clínica e a atividade prevista da opção contra a enzima."
      },

      same:{
        correct:false,
        title:"Incorreto.",
        text:"KPC, NDM e OXA-48-like pertencem a classes enzimáticas diferentes e apresentam perfis microbiológicos distintos."
      }
    };

    function selectAnswer(selectedButton){
      const key = selectedButton.dataset.p51Answer;
      const result = answers[key];

      if(!result) return;

      options.forEach(function(button){
        const buttonKey = button.dataset.p51Answer;

        button.disabled = true;

        button.classList.remove(
          "is-correct",
          "is-incorrect",
          "is-dimmed"
        );

        if(buttonKey === "integrate"){
          button.classList.add("is-correct");
        }else if(button === selectedButton){
          button.classList.add("is-incorrect");
        }else{
          button.classList.add("is-dimmed");
        }
      });

      feedback.hidden = false;
      feedback.className = "cap5-p51-caseFeedback";

      feedback.classList.add(
        result.correct
          ? "is-correct"
          : "is-incorrect"
      );

      feedback.innerHTML = `
        <strong>${result.title}</strong>
        <p>${result.text}</p>
      `;
    }

    options.forEach(function(button){
      button.addEventListener("click", function(){
        selectAnswer(button);
      });
    });
  }


  /* =========================
     ENTRADA SUAVE
     ========================= */

  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page51 .cap5-p51-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
        item.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();

/* =========================
   CAPÍTULO 5 — PÁGINA 52
   MRSA, VRE, MLSB E HLAR
   ========================= */

(function initCap5Page52(){
  const galleryRoot = document.querySelector(
    "[data-cap5-p52]"
  );

  if(galleryRoot){
    initGallery(galleryRoot);
  }

  const caseRoot = document.querySelector(
    "[data-cap5-p52-case]"
  );

  if(caseRoot){
    initClinicalCase(caseRoot);
  }

  initReveal();


  /* =========================
     GALERIA INTERATIVA
     ========================= */

  function initGallery(root){
    const tabs = Array.from(
      root.querySelectorAll("[data-p52-target]")
    );

    const view = root.querySelector("#cap5P52View");
    const image = root.querySelector("#cap5P52Image");
    const caption = root.querySelector("#cap5P52Caption");
    const kicker = root.querySelector("#cap5P52Kicker");
    const title = root.querySelector("#cap5P52Title");
    const text = root.querySelector("#cap5P52Text");
    const key = root.querySelector("#cap5P52Key");
    const zoomButton = root.querySelector("#cap5P52Zoom");

    if(
      !tabs.length ||
      !view ||
      !image ||
      !caption ||
      !kicker ||
      !title ||
      !text ||
      !key ||
      !zoomButton
    ){
      return;
    }

    const states = {
      mrsa:{
        tabId:"cap5P52TabMrsa",
        viewClass:"cap5-p52-view--mrsa",
        image:"../../assets/capitulo-05/imagens/mrsa-orsa-disco.png",
        alt:"Teste fenotípico com cefoxitina para detecção de MRSA",
        caption:"Detecção fenotípica da resistência à meticilina em Staphylococcus aureus.",
        kicker:"Consequência para o painel",
        title:"A resistência modifica a interpretação dos β-lactâmicos",
        text:"A identificação de MRSA ou ORSA modifica a interpretação do grupo dos β-lactâmicos. A maioria desses agentes deve ser considerada inativa contra o isolado, exceto os antibacterianos especificamente validados para atividade contra MRSA.",
        key:"<strong>Pergunta prática:</strong> o resultado indica apenas resistência à oxacilina ou modifica a interpretação de toda a classe?"
      },

      vre:{
        tabId:"cap5P52TabVre",
        viewClass:"cap5-p52-view--vre",
        image:"../../assets/capitulo-05/imagens/vre-disco.png",
        alt:"Teste com gradiente de vancomicina mostrando resistência em Enterococcus",
        caption:"Determinação fenotípica da resistência à vancomicina em enterococos.",
        kicker:"Consequência para o painel",
        title:"A vancomicina deixa de ser uma opção ativa",
        text:"O resultado VRE indica que a vancomicina não apresenta atividade prevista contra o isolado. As alternativas devem ser selecionadas conforme a espécie de enterococo, o foco infeccioso e o perfil completo de suscetibilidade.",
        key:"<strong>Pergunta prática:</strong> quais opções permanecem ativas e são adequadas para o sítio da infecção?"
      },

      mlsb:{
        tabId:"cap5P52TabMlsb",
        viewClass:"cap5-p52-view--mlsb",
        image:"../../assets/capitulo-05/imagens/mlsb-induzivel-disco.png",
        alt:"D-test positivo demonstrando resistência induzível à clindamicina",
        caption:"Fenótipo de resistência MLSB induzível demonstrado pelo D-test.",
        kicker:"Consequência para o painel",
        title:"A clindamicina não deve ser interpretada como opção ativa",
        text:"O fenótipo induzível sobrepõe um resultado aparente de suscetibilidade à clindamicina. O laudo deve refletir essa resistência para evitar o uso de uma opção associada a risco de falha terapêutica.",
        key:"<strong>Pergunta prática:</strong> o resultado isolado da clindamicina continua válido após um D-test positivo?"
      },

      hlar:{
        tabId:"cap5P52TabHlar",
        viewClass:"cap5-p52-view--hlar",
        image:"../../assets/capitulo-05/imagens/hlar-positivo.png",
        alt:"Teste com gentamicina em alta concentração demonstrando HLAR em Enterococcus",
        caption:"Detecção de resistência de alto nível aos aminoglicosídeos em enterococos.",
        kicker:"Consequência para o esquema terapêutico",
        title:"A sinergia bactericida está comprometida",
        text:"HLAR informa que não se deve esperar o efeito sinérgico entre o aminoglicosídeo testado e um agente ativo sobre a parede celular. O resultado possui importância especial em estratégias utilizadas para infecções enterocócicas graves.",
        key:"<strong>Pergunta prática:</strong> o resultado altera apenas um fármaco ou compromete uma estratégia de associação?"
      }
    };

    let transitionTimer = null;

    function render(target){
      const state = states[target];

      if(!state) return;

      tabs.forEach(function(tab){
        const active =
          tab.dataset.p52Target === target;

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

      view.classList.remove(
        "cap5-p52-view--mrsa",
        "cap5-p52-view--vre",
        "cap5-p52-view--mlsb",
        "cap5-p52-view--hlar"
      );

      view.classList.add(state.viewClass);

      view.setAttribute(
        "aria-labelledby",
        state.tabId
      );

      window.clearTimeout(transitionTimer);
      image.classList.add("is-changing");

      transitionTimer = window.setTimeout(function(){
        image.src = state.image;
        image.alt = state.alt;
        caption.textContent = state.caption;
        kicker.textContent = state.kicker;
        title.textContent = state.title;
        text.textContent = state.text;
        key.innerHTML = state.key;

        zoomButton.dataset.zoom = state.image;

        zoomButton.setAttribute(
          "aria-label",
          "Ampliar imagem: " + state.title
        );

        image.classList.remove("is-changing");
      }, 130);
    }

    tabs.forEach(function(tab, index){

      tab.addEventListener("click", function(){
        render(tab.dataset.p52Target);
      });

      tab.addEventListener("keydown", function(event){
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
          nextIndex = tabs.length - 1;
        }

        if(nextIndex === null) return;

        event.preventDefault();

        tabs[nextIndex].focus();

        render(
          tabs[nextIndex].dataset.p52Target
        );
      });

    });

    render("mrsa");
  }


  /* =========================
     CASO CLÍNICO
     ========================= */

  function initClinicalCase(root){
    const options = Array.from(
      root.querySelectorAll("[data-p52-answer]")
    );

    const feedback = root.querySelector(
      "#cap5P52Feedback"
    );

    if(!options.length || !feedback){
      return;
    }

    const answers = {
      ampicillin:{
        correct:false,
        title:"Incorreto.",
        text:"HLAR não modifica automaticamente a categoria da ampicilina. O resultado se refere à perda da sinergia esperada com o aminoglicosídeo."
      },

      vancomycin:{
        correct:false,
        title:"Incorreto.",
        text:"O isolado permanece classificado como sensível à vancomicina. HLAR não corresponde ao fenótipo VRE."
      },

      synergy:{
        correct:true,
        title:"Correto.",
        text:"A resistência de alto nível impede a sinergia esperada entre gentamicina e um agente ativo sobre a parede celular. Essa informação pode modificar esquemas utilizados em infecções enterocócicas graves."
      },

      allaminoglycosides:{
        correct:false,
        title:"Incorreto.",
        text:"O significado principal do teste é a perda da sinergia com o aminoglicosídeo avaliado. A interpretação não deve ser transformada em uma afirmação universal sobre todos os aminoglicosídeos e todos os contextos."
      }
    };

    function selectAnswer(selectedButton){
      const key = selectedButton.dataset.p52Answer;
      const result = answers[key];

      if(!result) return;

      options.forEach(function(button){
        const buttonKey = button.dataset.p52Answer;

        button.disabled = true;

        button.classList.remove(
          "is-correct",
          "is-incorrect",
          "is-dimmed"
        );

        if(buttonKey === "synergy"){
          button.classList.add("is-correct");
        }else if(button === selectedButton){
          button.classList.add("is-incorrect");
        }else{
          button.classList.add("is-dimmed");
        }
      });

      feedback.hidden = false;
      feedback.className = "cap5-p52-feedback";

      feedback.classList.add(
        result.correct
          ? "is-correct"
          : "is-incorrect"
      );

      feedback.innerHTML = `
        <strong>${result.title}</strong>
        <p>${result.text}</p>
      `;
    }

    options.forEach(function(button){
      button.addEventListener("click", function(){
        selectAnswer(button);
      });
    });
  }


  /* =========================
     ENTRADA SUAVE
     ========================= */

  function initReveal(){
    const items = document.querySelectorAll(
      ".cap5-page52 .cap5-p52-reveal"
    );

    if(!("IntersectionObserver" in window)){
      items.forEach(function(item){
        item.classList.add("is-visible");
      });

      return;
    }

    const observer = new IntersectionObserver(
      function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold:.13,
        rootMargin:"0px 0px -35px 0px"
      }
    );

    items.forEach(function(item){
      observer.observe(item);
    });
  }

})();

/* =========================
   PÁGINA 53 — QUIZ DE REVISÃO
   ========================= */

(function initCap5Page53(){
  const root = document.querySelector("[data-cap5-p53]");

  if(!root){
    return;
  }

  const questions = Array.from(
    root.querySelectorAll(".cap5-p53Question")
  );

  const statusValue = root.querySelector(
    ".cap5-p53Status__value"
  );

  const completion = root.querySelector(
    "[data-p53-completion]"
  );

  function updateStatus(){
    const confirmedQuestions = questions.filter(function(question){
      return question.dataset.questionState === "confirmed";
    }).length;

    if(statusValue){
      statusValue.textContent =
        confirmedQuestions +
        " de " +
        questions.length +
        " situações confirmadas";
    }

    if(completion){
      completion.hidden =
        confirmedQuestions !== questions.length;
    }
  }

  function parseFeedbackMap(question){
    const template = question.querySelector(
      ".cap5-p53FeedbackMap"
    );

    if(!template){
      return {};
    }

    try{
      return JSON.parse(
        template.content.textContent.trim()
      );
    }catch(error){
      console.warn(
        "Não foi possível interpretar o conteúdo de feedback da página 53.",
        error
      );

      return {};
    }
  }

  function updateSelectedOption(options, selectedOption){
    options.forEach(function(option){
      const isSelected = option === selectedOption;

      option.classList.toggle(
        "is-selected",
        isSelected
      );

      option.setAttribute(
        "aria-pressed",
        isSelected ? "true" : "false"
      );
    });
  }

  function clearOptionStates(options){
    options.forEach(function(option){
      option.disabled = false;

      option.classList.remove(
        "is-selected",
        "is-correct",
        "is-error"
      );

      option.setAttribute(
        "aria-pressed",
        "false"
      );
    });
  }

  questions.forEach(function(question){
    const options = Array.from(
      question.querySelectorAll(
        ".cap5-p53Options button"
      )
    );

    const confirmButton = question.querySelector(
      '[data-p53-action="confirm"]'
    );

    const resetButton = question.querySelector(
      '[data-p53-action="reset"]'
    );

    const feedback = question.querySelector(
      ".cap5-p53Feedback"
    );

    const feedbackMap = parseFeedbackMap(question);

    let selectedAnswer = null;

    options.forEach(function(option){
      option.addEventListener("click", function(){
        if(
          question.dataset.questionState === "confirmed"
        ){
          return;
        }

        selectedAnswer = option.dataset.answer;

        updateSelectedOption(
          options,
          option
        );

        if(confirmButton){
          confirmButton.disabled = false;
        }
      });
    });

    if(confirmButton){
      confirmButton.addEventListener("click", function(){
        if(!selectedAnswer){
          return;
        }

        const selectedOption = question.querySelector(
          '[data-answer="' +
          selectedAnswer +
          '"]'
        );

        if(!selectedOption){
          return;
        }

        const isCorrect =
          selectedOption.dataset.correct === "true";

        const selectedFeedback =
          feedbackMap[selectedAnswer];

        options.forEach(function(option){
          option.disabled = true;

          option.classList.remove(
            "is-selected"
          );

          option.setAttribute(
            "aria-pressed",
            "false"
          );

          if(
            option.dataset.correct === "true"
          ){
            option.classList.add(
              "is-correct"
            );
          }

          if(
            option.dataset.answer === selectedAnswer &&
            !isCorrect
          ){
            option.classList.add(
              "is-error"
            );
          }
        });

        if(
          feedback &&
          selectedFeedback
        ){
          const feedbackClass =
            selectedFeedback.type === "correct"
              ? "is-correct"
              : "is-error";

          feedback.className =
            "cap5-p53Feedback is-visible " +
            feedbackClass;

          feedback.innerHTML =
            "<strong>" +
            selectedFeedback.title +
            "</strong>" +
            "<p>" +
            selectedFeedback.text +
            "</p>";
        }

        question.dataset.questionState =
          "confirmed";

        confirmButton.hidden = true;

        if(resetButton){
          resetButton.hidden = false;
          resetButton.focus();
        }

        updateStatus();
      });
    }

    if(resetButton){
      resetButton.addEventListener("click", function(){
        selectedAnswer = null;

        question.dataset.questionState =
          "pending";

        clearOptionStates(options);

        if(feedback){
          feedback.className =
            "cap5-p53Feedback";

          feedback.innerHTML = "";
        }

        if(confirmButton){
          confirmButton.hidden = false;
          confirmButton.disabled = true;
        }

        resetButton.hidden = true;

        updateStatus();

        if(options[0]){
          options[0].focus();
        }
      });
    }
  });

  updateStatus();
})();