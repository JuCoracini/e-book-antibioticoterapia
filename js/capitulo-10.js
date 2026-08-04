/* =====================================================
   CAPÍTULO 10 — PÁGINA 82
   PROCESSO DECISÓRIO INTERATIVO
   ===================================================== */

(() => {
  "use strict";

  const activity = document.querySelector("[data-cap10-p82]");

  if (!activity) return;


  /* =====================================================
     CONTEÚDO DAS ETAPAS
     ===================================================== */

  const stepsContent = {
    analisar: {
      number: "1",
      title: "Analisar os dados disponíveis",
      text:
          "Reconheça a apresentação clínica, o provável foco infeccioso, a gravidade do quadro, as características do hospedeiro e as informações que ainda precisam ser obtidas."
    },

    consultar: {
      number: "2",
      title: "Consultar os fundamentos necessários",
      text:
        "Retome os capítulos relacionados ao problema e identifique os conceitos microbiológicos, farmacológicos e clínicos que podem orientar a decisão."
    },

    decidir: {
      number: "3",
      title: "Construir uma decisão fundamentada",
      text:
        "Integre os dados do caso aos conhecimentos consultados e escolha uma estratégia proporcional ao risco clínico e microbiológico identificado."
    },

    reavaliar: {
      number: "4",
      title: "Reavaliar diante de novos dados",
      text:
        "Analise a evolução clínica e os resultados disponíveis para decidir se a estratégia deve ser mantida, ajustada, simplificada ou suspensa."
    }
  };


  /* =====================================================
     ELEMENTOS DA INTERAÇÃO
     ===================================================== */

  const tabs = Array.from(
    activity.querySelectorAll(
      "[role='tab'][data-p82-step]"
    )
  );

  const panel = document.getElementById(
    "cap10P82Panel"
  );

  const panelNumber = document.getElementById(
    "cap10P82PanelNumber"
  );

  const panelTitle = document.getElementById(
    "cap10P82PanelTitle"
  );

  const panelText = document.getElementById(
    "cap10P82PanelText"
  );


  /* =====================================================
     VERIFICAÇÃO DOS ELEMENTOS
     ===================================================== */

  if (
    tabs.length === 0 ||
    !panel ||
    !panelNumber ||
    !panelTitle ||
    !panelText
  ) {
    return;
  }


  /* =====================================================
     EXIBIÇÃO DA ETAPA SELECIONADA
     ===================================================== */

  function selectStep(selectedTab, moveFocus = false) {
    const stepKey = selectedTab.dataset.p82Step;
    const selectedContent = stepsContent[stepKey];

    if (!selectedContent) return;

    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;

      tab.classList.toggle(
        "is-active",
        isSelected
      );

      tab.setAttribute(
        "aria-selected",
        String(isSelected)
      );

      tab.tabIndex = isSelected ? 0 : -1;
    });

    panel.setAttribute(
      "aria-labelledby",
      selectedTab.id
    );

    panelNumber.textContent =
      selectedContent.number;

    panelTitle.textContent =
      selectedContent.title;

    panelText.textContent =
      selectedContent.text;

    if (moveFocus) {
      selectedTab.focus();
    }
  }


  /* =====================================================
     CLIQUE NOS BOTÕES
     ===================================================== */

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      selectStep(tab);
    });
  });


  /* =====================================================
     NAVEGAÇÃO POR TECLADO
     ===================================================== */

  tabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (event) => {
      const allowedKeys = [
        "ArrowRight",
        "ArrowLeft",
        "ArrowDown",
        "ArrowUp",
        "Home",
        "End"
      ];

      if (!allowedKeys.includes(event.key)) {
        return;
      }

      event.preventDefault();

      let nextIndex = index;

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
        nextIndex =
          tabs.length - 1;
      }

      selectStep(
        tabs[nextIndex],
        true
      );
    });
  });


  /* =====================================================
     ESTADO INICIAL
     ===================================================== */

  const initialTab =
    tabs.find(
      (tab) =>
        tab.getAttribute("aria-selected") ===
        "true"
    ) || tabs[0];

  selectStep(initialTab);
})();
/* =====================================================
   CAPÍTULO 10 — PÁGINA 83
   SIMULAÇÃO CLÍNICA 1
   ===================================================== */

(() => {
  "use strict";

  const simulation = document.querySelector(
    "[data-cap10-p83]"
  );

  if (!simulation) return;


  /* =====================================================
     ELEMENTOS DA SIMULAÇÃO
     ===================================================== */

  const stages = Array.from(
    simulation.querySelectorAll("[data-p83-stage]")
  );

  const progressItems = Array.from(
    simulation.querySelectorAll(
      "[data-p83-progress]"
    )
  );

  const progressLines = Array.from(
    simulation.querySelectorAll(
      ".cap10-p83-progress__line"
    )
  );

  const navigationButtons = Array.from(
    simulation.querySelectorAll("[data-p83-next]")
  );

  const optionButtons = Array.from(
    simulation.querySelectorAll(
      ".cap10-p83-option"
    )
  );

  const restartButton = simulation.querySelector(
    "[data-p83-restart]"
  );

  const initialFeedback =
    document.getElementById(
      "cap10P83InitialFeedback"
    );

  const evolutionFeedback =
    document.getElementById(
      "cap10P83EvolutionFeedback"
    );

  const continueToEvolution =
    document.getElementById(
      "cap10P83ContinueToEvolution"
    );

  const continueToDebrief =
    document.getElementById(
      "cap10P83ContinueToDebrief"
    );


  /* =====================================================
     VERIFICAÇÃO DE SEGURANÇA
     ===================================================== */

  if (
    stages.length === 0 ||
    progressItems.length === 0 ||
    !initialFeedback ||
    !evolutionFeedback ||
    !continueToEvolution ||
    !continueToDebrief
  ) {
    return;
  }


  /* =====================================================
     FEEDBACKS — MOMENTO DA ADMISSÃO
     ===================================================== */

  const initialFeedbacks = {
    aguardar: {
      type: "limited",

      title:
        "A incerteza não impede a construção do raciocínio",

      text:
        "A ausência de identificação microbiológica limita a precisão etiológica, mas não significa ausência de informações. A apresentação clínica, o provável foco infeccioso, a gravidade, as características do paciente e o contexto epidemiológico permitem construir uma avaliação inicial provisória."
    },

    integrar: {
      type: "consistent",

      title:
        "Integração adequada das informações iniciais",

      text:
        "No momento da admissão, a análise precisava ser construída com os dados disponíveis. A apresentação clínica, o provável foco infeccioso, a gravidade e as características do paciente permitiam fundamentar uma avaliação inicial, mesmo antes da identificação microbiológica."
    },

    idade: {
      type: "attention",

      title:
        "A idade é relevante, mas não deve ser analisada isoladamente",

      text:
        "A idade pode modificar a vulnerabilidade do paciente e a interpretação do risco. Entretanto, ela não substitui a análise da apresentação clínica, da gravidade, do provável foco infeccioso, das condições do hospedeiro e do contexto epidemiológico."
    }
  };


  /* =====================================================
     FEEDBACKS — EVOLUÇÃO DO CASO
     ===================================================== */

  const evolutionFeedbacks = {
    definitiva: {
      type: "attention",

      title:
        "A melhora clínica não transforma a avaliação inicial em definitiva",

      text:
        "A resposta clínica é uma informação importante, mas precisa ser interpretada juntamente com os resultados microbiológicos e o teste de suscetibilidade. A decisão inicial permanece vinculada ao contexto de incerteza em que foi construída."
    },

    reinterpretar: {
      type: "consistent",

      title:
        "Os novos dados reduzem a incerteza inicial",

      text:
        "A evolução clínica, a identificação do microrganismo e o teste de suscetibilidade acrescentam informações que não estavam disponíveis na admissão. Esses dados permitem reinterpretar a adequação e a proporcionalidade da estratégia inicial."
    },

    desconsiderar: {
      type: "limited",

      title:
        "A melhora clínica não elimina a importância da microbiologia",

      text:
        "Os resultados microbiológicos ajudam a compreender o agente envolvido e seu perfil de suscetibilidade. Mesmo diante de melhora clínica, essas informações precisam ser integradas à análise do tratamento em curso."
    }
  };


  /* =====================================================
     EXIBIÇÃO DAS ETAPAS
     ===================================================== */

  function showStage(stageNumber, scroll = true) {
    stages.forEach((stage) => {
      const isCurrent =
        stage.dataset.p83Stage ===
        String(stageNumber);

      stage.hidden = !isCurrent;

      stage.classList.toggle(
        "is-active",
        isCurrent
      );
    });

    updateProgress(stageNumber);

    if (scroll) {
      simulation.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }


  /* =====================================================
     ATUALIZAÇÃO DO PROGRESSO
     ===================================================== */

  function updateProgress(stageNumber) {
    progressItems.forEach((item) => {
      const itemNumber = Number(
        item.dataset.p83Progress
      );

      const isCurrent =
        itemNumber === Number(stageNumber);

      const isComplete =
        itemNumber < Number(stageNumber);

      item.classList.toggle(
        "is-active",
        isCurrent
      );

      item.classList.toggle(
        "is-complete",
        isComplete
      );

      const numberElement =
        item.querySelector("span");

      if (numberElement) {
        numberElement.textContent =
          isComplete ? "✓" : String(itemNumber);
      }
    });

    progressLines.forEach((line, index) => {
      const isComplete =
        index < Number(stageNumber) - 1;

      line.classList.toggle(
        "is-complete",
        isComplete
      );
    });
  }


  /* =====================================================
     NAVEGAÇÃO ENTRE AS ETAPAS
     ===================================================== */

  navigationButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetStage = Number(
        button.dataset.p83Next
      );

      if (!targetStage) return;

      showStage(targetStage);
    });
  });


  /* =====================================================
     LIMPEZA VISUAL DAS ALTERNATIVAS
     ===================================================== */

  function clearOptionStyles(question) {
    const groupOptions =
      optionButtons.filter(
        (option) =>
          option.dataset.p83Question ===
          question
      );

    groupOptions.forEach((option) => {
      option.classList.remove(
        "is-selected",
        "is-consistent",
        "is-attention",
        "is-limited"
      );

      option.removeAttribute(
        "aria-pressed"
      );
    });
  }


  /* =====================================================
     FORMATAÇÃO DO FEEDBACK
     ===================================================== */

  function showFeedback(
    feedbackElement,
    feedbackData
  ) {
    feedbackElement.className =
      "cap10-p83-feedback";

    feedbackElement.classList.add(
      `is-${feedbackData.type}`
    );

    feedbackElement.innerHTML = `
      <strong>${feedbackData.title}</strong>
      <p>${feedbackData.text}</p>
    `;

    feedbackElement.hidden = false;
  }


  /* =====================================================
     SELEÇÃO DAS INTERPRETAÇÕES
     ===================================================== */

  optionButtons.forEach((option) => {
    option.setAttribute(
      "aria-pressed",
      "false"
    );

    option.addEventListener("click", () => {
      const question =
        option.dataset.p83Question;

      const choice =
        option.dataset.p83Choice;

      let feedbackData = null;
      let feedbackElement = null;
      let continueButton = null;

      if (question === "initial") {
        feedbackData =
          initialFeedbacks[choice];

        feedbackElement =
          initialFeedback;

        continueButton =
          continueToEvolution;
      }

      if (question === "evolution") {
        feedbackData =
          evolutionFeedbacks[choice];

        feedbackElement =
          evolutionFeedback;

        continueButton =
          continueToDebrief;
      }

      if (
        !feedbackData ||
        !feedbackElement ||
        !continueButton
      ) {
        return;
      }

      clearOptionStyles(question);

      option.classList.add(
        "is-selected",
        `is-${feedbackData.type}`
      );

      option.setAttribute(
        "aria-pressed",
        "true"
      );

      showFeedback(
        feedbackElement,
        feedbackData
      );

      continueButton.hidden = false;
    });
  });


  /* =====================================================
     REINÍCIO DA SIMULAÇÃO
     ===================================================== */

  function restartSimulation() {
    optionButtons.forEach((option) => {
      option.classList.remove(
        "is-selected",
        "is-consistent",
        "is-attention",
        "is-limited"
      );

      option.setAttribute(
        "aria-pressed",
        "false"
      );
    });

    initialFeedback.hidden = true;
    initialFeedback.innerHTML = "";
    initialFeedback.className =
      "cap10-p83-feedback";

    evolutionFeedback.hidden = true;
    evolutionFeedback.innerHTML = "";
    evolutionFeedback.className =
      "cap10-p83-feedback";

    continueToEvolution.hidden = true;
    continueToDebrief.hidden = true;

    showStage(1);
  }

  if (restartButton) {
    restartButton.addEventListener(
      "click",
      restartSimulation
    );
  }


  /* =====================================================
     ESTADO INICIAL
     ===================================================== */

  showStage(1, false);
})();
/* =====================================================
   CAPÍTULO 10 — PÁGINA 84
   SIMULAÇÃO 2 — ESBL
   ===================================================== */

(() => {
  "use strict";

  const simulation = document.querySelector(
    "[data-cap10-p84]"
  );

  if (!simulation) return;


  /* =====================================================
     ELEMENTOS DA SIMULAÇÃO
     ===================================================== */

  const stages = Array.from(
    simulation.querySelectorAll(
      "[data-p84-stage]"
    )
  );

  const progressItems = Array.from(
    simulation.querySelectorAll(
      "[data-p84-progress]"
    )
  );

  const progressLines = Array.from(
    simulation.querySelectorAll(
      ".cap10-p84-progress__line"
    )
  );

  const navigationButtons = Array.from(
    simulation.querySelectorAll(
      "[data-p84-next]"
    )
  );

  const optionButtons = Array.from(
    simulation.querySelectorAll(
      ".cap10-p84-option"
    )
  );

  const legendButtons = Array.from(
    simulation.querySelectorAll(
      "[data-p84-legend]"
    )
  );

  const restartButton =
    simulation.querySelector(
      "[data-p84-restart]"
    );

  const legendFeedback =
    document.getElementById(
      "cap10P84LegendFeedback"
    );

  const mechanismFeedback =
    document.getElementById(
      "cap10P84MechanismFeedback"
    );

  const integrationFeedback =
    document.getElementById(
      "cap10P84IntegrationFeedback"
    );

  const continueToIntegration =
    document.getElementById(
      "cap10P84ContinueToIntegration"
    );

  const continueToDebrief =
    document.getElementById(
      "cap10P84ContinueToDebrief"
    );


  /* =====================================================
     VERIFICAÇÃO DE SEGURANÇA
     ===================================================== */

  if (
    stages.length === 0 ||
    progressItems.length === 0 ||
    !legendFeedback ||
    !mechanismFeedback ||
    !integrationFeedback ||
    !continueToIntegration ||
    !continueToDebrief
  ) {
    return;
  }


  /* =====================================================
     SIGNIFICADO DAS CATEGORIAS S, I E R
     ===================================================== */

  const legendContent = {
    s: {
      title: "S — Suscetível",

      text:
        "A categoria S indica elevada probabilidade de sucesso terapêutico quando o agente é utilizado conforme o regime de exposição considerado na definição do ponto de corte. O resultado ainda precisa ser relacionado ao provável foco e às características do paciente."
    },

    i: {
      title:
        "I — Suscetível, aumentando a exposição",

      text:
        "A categoria I indica elevada probabilidade de sucesso terapêutico quando a exposição ao agente é aumentada. A exposição pode depender da dose, do intervalo, do tempo de infusão, da distribuição e da concentração alcançada no provável foco infeccioso."
    },

    r: {
      title: "R — Resistente",

      text:
        "A categoria R indica elevada probabilidade de falha terapêutica mesmo quando há aumento da exposição. Essa classificação é estabelecida a partir dos pontos de corte e dos critérios laboratoriais vigentes."
    }
  };


  /* =====================================================
     FEEDBACKS — MECANISMO ESBL
     ===================================================== */

  const mechanismFeedbacks = {
    intrinseca: {
      type: "limited",

      title:
        "ESBL não é uma característica intrínseca de toda Escherichia coli",

      text:
        "A produção de ESBL representa um mecanismo adquirido de resistência. Cepas da mesma espécie podem apresentar perfis diferentes, dependendo dos determinantes de resistência que possuem."
    },

    enzimatica: {
      type: "consistent",

      title:
        "ESBL representa resistência enzimática adquirida",

      text:
        "As β-lactamases de espectro estendido são enzimas capazes de hidrolisar determinados β-lactâmicos. A identificação desse mecanismo ajuda a explicar parte do perfil fenotípico observado, mas não substitui a interpretação individual das categorias apresentadas no laudo."
    },

    total: {
      type: "limited",

      title:
        "ESBL não significa resistência a todos os antibacterianos",

      text:
        "O mecanismo ESBL interfere na atividade de determinados β-lactâmicos, mas não permite concluir que todos os agentes avaliados sejam inativos. Cada categoria do antibiograma precisa ser interpretada individualmente."
    }
  };


  /* =====================================================
     FEEDBACKS — INTEGRAÇÃO DO LAUDO AO CASO
     ===================================================== */

  const integrationFeedbacks = {
    suficiente: {
      type: "attention",

      title:
        "A categoria S é importante, mas não encerra o raciocínio",

      text:
        "A suscetibilidade in vitro é uma informação necessária, mas não responde isoladamente se a exposição será adequada no provável foco ou se o agente é compatível com a função renal, a gravidade, a toxicidade e as demais características da paciente."
    },

    integrar: {
      type: "consistent",

      title:
        "O resultado laboratorial precisa ser integrado ao contexto clínico",

      text:
        "A interpretação combina identificação bacteriana, mecanismo de resistência, categorias S, I e R, provável foco infeccioso, gravidade, função renal, exposição alcançável, toxicidade e evolução clínica. Nenhuma dessas dimensões deve ser analisada isoladamente."
    },

    ignorar: {
      type: "limited",

      title:
        "A presença de ESBL não invalida o antibiograma",

      text:
        "O mecanismo de resistência acrescenta informação à análise, mas não autoriza desconsiderar automaticamente as categorias liberadas pelo laboratório. Os resultados devem ser interpretados conforme os pontos de corte e as regras laboratoriais vigentes."
    }
  };


  /* =====================================================
     EXIBIÇÃO DAS ETAPAS
     ===================================================== */

  function showStage(
    stageNumber,
    scroll = true
  ) {
    stages.forEach((stage) => {
      const isCurrent =
        stage.dataset.p84Stage ===
        String(stageNumber);

      stage.hidden = !isCurrent;

      stage.classList.toggle(
        "is-active",
        isCurrent
      );
    });

    updateProgress(stageNumber);

    if (scroll) {
      simulation.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }


  /* =====================================================
     ATUALIZAÇÃO DO PROGRESSO
     ===================================================== */

  function updateProgress(stageNumber) {
    progressItems.forEach((item) => {
      const itemNumber = Number(
        item.dataset.p84Progress
      );

      const isCurrent =
        itemNumber === Number(stageNumber);

      const isComplete =
        itemNumber < Number(stageNumber);

      item.classList.toggle(
        "is-active",
        isCurrent
      );

      item.classList.toggle(
        "is-complete",
        isComplete
      );

      const numberElement =
        item.querySelector("span");

      if (numberElement) {
        numberElement.textContent =
          isComplete
            ? "✓"
            : String(itemNumber);
      }
    });

    progressLines.forEach(
      (line, index) => {
        const isComplete =
          index <
          Number(stageNumber) - 1;

        line.classList.toggle(
          "is-complete",
          isComplete
        );
      }
    );
  }


  /* =====================================================
     NAVEGAÇÃO ENTRE AS ETAPAS
     ===================================================== */

  navigationButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const targetStage = Number(
          button.dataset.p84Next
        );

        if (!targetStage) return;

        showStage(targetStage);
      }
    );
  });


  /* =====================================================
     LEGENDA INTERATIVA S, I E R
     ===================================================== */

  legendButtons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const legendKey =
          button.dataset.p84Legend;

        const content =
          legendContent[legendKey];

        if (!content) return;

        legendButtons.forEach(
          (legendButton) => {
            const isSelected =
              legendButton === button;

            legendButton.classList.toggle(
              "is-active",
              isSelected
            );

            legendButton.setAttribute(
              "aria-pressed",
              String(isSelected)
            );
          }
        );

        legendFeedback.innerHTML = `
          <strong>${content.title}</strong>
          <p>${content.text}</p>
        `;

        legendFeedback.hidden = false;
      }
    );
  });


  /* =====================================================
     LIMPEZA VISUAL DAS ALTERNATIVAS
     ===================================================== */

  function clearOptionStyles(question) {
    optionButtons
      .filter(
        (option) =>
          option.dataset.p84Question ===
          question
      )
      .forEach((option) => {
        option.classList.remove(
          "is-selected",
          "is-consistent",
          "is-attention",
          "is-limited"
        );

        option.setAttribute(
          "aria-pressed",
          "false"
        );
      });
  }


  /* =====================================================
     EXIBIÇÃO DOS FEEDBACKS
     ===================================================== */

  function showFeedback(
    feedbackElement,
    feedbackData
  ) {
    feedbackElement.className =
      "cap10-p84-feedback";

    feedbackElement.classList.add(
      `is-${feedbackData.type}`
    );

    feedbackElement.innerHTML = `
      <strong>${feedbackData.title}</strong>
      <p>${feedbackData.text}</p>
    `;

    feedbackElement.hidden = false;
  }


  /* =====================================================
     SELEÇÃO DAS INTERPRETAÇÕES
     ===================================================== */

  optionButtons.forEach((option) => {
    option.setAttribute(
      "aria-pressed",
      "false"
    );

    option.addEventListener(
      "click",
      () => {
        const question =
          option.dataset.p84Question;

        const choice =
          option.dataset.p84Choice;

        let feedbackData = null;
        let feedbackElement = null;
        let continueButton = null;

        if (question === "mechanism") {
          feedbackData =
            mechanismFeedbacks[choice];

          feedbackElement =
            mechanismFeedback;

          continueButton =
            continueToIntegration;
        }

        if (question === "integration") {
          feedbackData =
            integrationFeedbacks[choice];

          feedbackElement =
            integrationFeedback;

          continueButton =
            continueToDebrief;
        }

        if (
          !feedbackData ||
          !feedbackElement ||
          !continueButton
        ) {
          return;
        }

        clearOptionStyles(question);

        option.classList.add(
          "is-selected",
          `is-${feedbackData.type}`
        );

        option.setAttribute(
          "aria-pressed",
          "true"
        );

        showFeedback(
          feedbackElement,
          feedbackData
        );

        continueButton.hidden = false;
      }
    );
  });


  /* =====================================================
     REINÍCIO DA SIMULAÇÃO
     ===================================================== */

  function restartSimulation() {
    optionButtons.forEach((option) => {
      option.classList.remove(
        "is-selected",
        "is-consistent",
        "is-attention",
        "is-limited"
      );

      option.setAttribute(
        "aria-pressed",
        "false"
      );
    });

    legendButtons.forEach((button) => {
      button.classList.remove(
        "is-active"
      );

      button.setAttribute(
        "aria-pressed",
        "false"
      );
    });

    legendFeedback.hidden = true;
    legendFeedback.innerHTML = "";

    mechanismFeedback.hidden = true;
    mechanismFeedback.innerHTML = "";
    mechanismFeedback.className =
      "cap10-p84-feedback";

    integrationFeedback.hidden = true;
    integrationFeedback.innerHTML = "";
    integrationFeedback.className =
      "cap10-p84-feedback";

    continueToIntegration.hidden = true;
    continueToDebrief.hidden = true;

    showStage(1);
  }

  if (restartButton) {
    restartButton.addEventListener(
      "click",
      restartSimulation
    );
  }


  /* =====================================================
     ESTADO INICIAL
     ===================================================== */

  legendButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      "false"
    );
  });

  showStage(1, false);
})();

/* =========================================================
   CAPÍTULO 10 — PÁGINA 85
   Simulação 3 — Resistência em Gram-positivos
   ========================================================= */

(function () {
  "use strict";

  function iniciarPagina85() {
    const pagina = document.querySelector(
      "[data-cap10-p85]"
    );

    if (!pagina) return;

    const etapas = Array.from(
      pagina.querySelectorAll("[data-p85-stage]")
    );

    const indicadores = Array.from(
      pagina.querySelectorAll("[data-p85-progress]")
    );

    const linhas = Array.from(
      pagina.querySelectorAll(
        ".cap10-p85-progress__line"
      )
    );

    const feedbackMarcadores = pagina.querySelector(
      "#cap10P85MarkerFeedback"
    );

    const feedbackVanA = pagina.querySelector(
      "#cap10P85VanFeedback"
    );

    const feedbackPacienteA = pagina.querySelector(
      "#cap10P85PatientAFeedback"
    );

    const feedbackPacienteB = pagina.querySelector(
      "#cap10P85PatientBFeedback"
    );

    const botaoPacienteB = pagina.querySelector(
      "#cap10P85ContinueToPatientB"
    );

    const botaoComparacao = pagina.querySelector(
      "#cap10P85ContinueToComparison"
    );

    let etapaAtual = 1;

    function normalizar(valor) {
      return String(valor || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
    }

    /* =====================================================
       NAVEGAÇÃO ENTRE AS ETAPAS
       ===================================================== */

    function mostrarEtapa(numero, rolar) {
      const etapaEscolhida = etapas.find(
        function (etapa) {
          return (
            Number(etapa.dataset.p85Stage) === numero
          );
        }
      );

      if (!etapaEscolhida) return;

      etapaAtual = numero;

      etapas.forEach(function (etapa) {
        const estaAtiva =
          Number(etapa.dataset.p85Stage) === numero;

        etapa.hidden = !estaAtiva;

        etapa.classList.toggle(
          "is-active",
          estaAtiva
        );
      });

      indicadores.forEach(function (indicador) {
        const posicao = Number(
          indicador.dataset.p85Progress
        );

        indicador.classList.remove(
          "is-active",
          "is-complete"
        );

        indicador.removeAttribute("aria-current");

        if (posicao < numero) {
          indicador.classList.add("is-complete");
        }

        if (posicao === numero) {
          indicador.classList.add("is-active");

          indicador.setAttribute(
            "aria-current",
            "step"
          );
        }
      });

      linhas.forEach(function (linha, indice) {
        linha.classList.toggle(
          "is-complete",
          indice < numero - 1
        );
      });

      if (rolar !== false) {
        etapaEscolhida.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }

    /* =====================================================
       FEEDBACKS
       ===================================================== */

    function escreverFeedback(
      elemento,
      classe,
      titulo,
      texto
    ) {
      if (!elemento) return;

      elemento.classList.remove(
        "is-consistent",
        "is-limited",
        "is-attention"
      );

      elemento.classList.add(classe);
      elemento.hidden = false;

      elemento.setAttribute(
        "role",
        "status"
      );

      elemento.setAttribute(
        "aria-live",
        "polite"
      );

      elemento.innerHTML =
        "<strong>" +
        titulo +
        "</strong> " +
        texto;
    }

    function limparFeedback(elemento) {
      if (!elemento) return;

      elemento.textContent = "";
      elemento.hidden = true;

      elemento.classList.remove(
        "is-consistent",
        "is-limited",
        "is-attention"
      );
    }

    /* =====================================================
       MARCADORES — PACIENTE A
       ===================================================== */

    function selecionarMarcadorA(botao) {
      const marcador = normalizar(
        botao.dataset.p85Marker
      );

      pagina
        .querySelectorAll(
          ".cap10-p85-markers [data-p85-marker]"
        )
        .forEach(function (item) {
          item.classList.remove("is-active");

          item.setAttribute(
            "aria-pressed",
            "false"
          );
        });

      botao.classList.add("is-active");

      botao.setAttribute(
        "aria-pressed",
        "true"
      );

      if (marcador === "cefoxitina") {
        escreverFeedback(
          feedbackMarcadores,
          "is-attention",
          "Cefoxitina resistente.",
          "Esse resultado funciona como marcador fenotípico de resistência à meticilina em Staphylococcus aureus e direciona a interpretação para alteração da proteína-alvo dos β-lactâmicos."
        );

        return;
      }

      if (marcador === "teste-d") {
        escreverFeedback(
          feedbackMarcadores,
          "is-consistent",
          "Teste D positivo.",
          "O achatamento do halo da clindamicina próximo ao disco de eritromicina indica resistência induzível do tipo MLSB. Por isso, a clindamicina deve ser reinterpretada como resistente no laudo."
        );
      }
    }

    /* =====================================================
       MARCADOR — PACIENTE B
       ===================================================== */

    function selecionarVanA(botao) {
      botao.classList.toggle("is-active");

      const estaAtivo =
        botao.classList.contains("is-active");

      botao.setAttribute(
        "aria-pressed",
        estaAtivo ? "true" : "false"
      );

      if (!estaAtivo) {
        limparFeedback(feedbackVanA);
        return;
      }

      escreverFeedback(
        feedbackVanA,
        "is-consistent",
        "Gene vanA detectado.",
        "Esse mecanismo modifica o precursor da parede celular, substituindo D-Ala-D-Ala por D-Ala-D-Lac e reduzindo a afinidade dos glicopeptídeos pelo alvo."
      );
    }

    /* =====================================================
       IDENTIFICAÇÃO DO QUIZ
       ===================================================== */

    function identificarQuestao(botao) {
      if (botao.dataset.p85Question) {
        return normalizar(
          botao.dataset.p85Question
        );
      }

      const etapa = botao.closest(
        "[data-p85-stage]"
      );

      if (!etapa) return "";

      if (etapa.dataset.p85Stage === "2") {
        return "patient-a";
      }

      if (etapa.dataset.p85Stage === "3") {
        return "patient-b";
      }

      return "";
    }

    function limparAlternativas(questao) {
      pagina
        .querySelectorAll(
          ".cap10-p85-options button"
        )
        .forEach(function (botao) {
          if (
            identificarQuestao(botao) !== questao
          ) {
            return;
          }

          botao.classList.remove(
            "is-selected",
            "is-consistent",
            "is-limited",
            "is-attention"
          );

          botao.setAttribute(
            "aria-pressed",
            "false"
          );
        });
    }

    /* =====================================================
       QUIZ — PACIENTE A
       ===================================================== */

    function avaliarPacienteA(botao, resposta) {
      limparAlternativas("patient-a");

      botao.classList.add("is-selected");

      botao.setAttribute(
        "aria-pressed",
        "true"
      );

      if (resposta === "distintos") {
        botao.classList.add("is-consistent");

        escreverFeedback(
          feedbackPacienteA,
          "is-consistent",
          "Interpretação consistente.",
          "Os achados representam mecanismos diferentes. A cefoxitina avalia resistência à meticilina, enquanto o teste D investiga resistência induzível aos macrolídeos, lincosamidas e estreptograminas B."
        );
      } else if (resposta === "mesmo") {
        botao.classList.add("is-limited");

        escreverFeedback(
          feedbackPacienteA,
          "is-limited",
          "Vale separar os mecanismos.",
          "A resistência indicada pela cefoxitina e o teste D positivo não representam o mesmo fenômeno. Observe as classes e as estruturas bacterianas envolvidas."
        );
      } else {
        botao.classList.add("is-limited");

        escreverFeedback(
          feedbackPacienteA,
          "is-limited",
          "Observe a função de cada teste.",
          "O teste D não identifica resistência à meticilina. Ele demonstra resistência induzível do tipo MLSB e modifica a interpretação da clindamicina."
        );
      }

      if (botaoPacienteB) {
        botaoPacienteB.hidden = false;
        botaoPacienteB.style.display = "";
      }
    }

    /* =====================================================
       QUIZ — PACIENTE B
       ===================================================== */

    function avaliarPacienteB(botao, resposta) {
      limparAlternativas("patient-b");

      botao.classList.add("is-selected");

      botao.setAttribute(
        "aria-pressed",
        "true"
      );

      if (resposta === "precursor") {
        botao.classList.add("is-consistent");

        escreverFeedback(
          feedbackPacienteB,
          "is-consistent",
          "Interpretação consistente.",
          "O fenótipo VanA está relacionado à modificação do precursor da parede celular. Essa mudança reduz a ligação dos glicopeptídeos ao alvo."
        );
      } else if (resposta === "enzima") {
        botao.classList.add("is-limited");

        escreverFeedback(
          feedbackPacienteB,
          "is-limited",
          "Reavalie o mecanismo.",
          "Nesse caso, o principal fenômeno não é a destruição do antibacteriano. O gene vanA promove uma mudança no precursor da parede celular."
        );
      } else {
        botao.classList.add("is-limited");

        escreverFeedback(
          feedbackPacienteB,
          "is-limited",
          "Observe a estrutura envolvida.",
          "O mecanismo VanA não atua no ribossomo. Ele modifica o precursor utilizado na formação da parede celular."
        );
      }

      if (botaoComparacao) {
        botaoComparacao.hidden = false;
        botaoComparacao.style.display = "";
      }
    }

    /* =====================================================
       REINICIAR A ATIVIDADE
       ===================================================== */

    function reiniciarAtividade() {
      pagina
        .querySelectorAll(
          ".cap10-p85-options button," +
          ".cap10-p85-markers button," +
          ".cap10-p85-van-button"
        )
        .forEach(function (botao) {
          botao.classList.remove(
            "is-active",
            "is-selected",
            "is-consistent",
            "is-limited",
            "is-attention"
          );

          botao.setAttribute(
            "aria-pressed",
            "false"
          );
        });

      limparFeedback(feedbackMarcadores);
      limparFeedback(feedbackVanA);
      limparFeedback(feedbackPacienteA);
      limparFeedback(feedbackPacienteB);

      if (botaoPacienteB) {
        botaoPacienteB.hidden = true;
      }

      if (botaoComparacao) {
        botaoComparacao.hidden = true;
      }

      mostrarEtapa(1);
    }

    /* =====================================================
       CONTROLE DOS CLIQUES
       ===================================================== */

    pagina.addEventListener(
      "click",
      function (evento) {
        const elemento = evento.target.closest(
          "button, a, [role='button']"
        );

        if (
          !elemento ||
          !pagina.contains(elemento)
        ) {
          return;
        }

        /* Reiniciar */

        if (
          elemento.hasAttribute(
            "data-p85-restart"
          )
        ) {
          evento.preventDefault();
          reiniciarAtividade();
          return;
        }

        /* Paciente A para paciente B */

        if (
          elemento.id ===
          "cap10P85ContinueToPatientB"
        ) {
          evento.preventDefault();
          mostrarEtapa(3);
          return;
        }

        /* Paciente B para comparação */

        if (
          elemento.id ===
          "cap10P85ContinueToComparison"
        ) {
          evento.preventDefault();
          mostrarEtapa(4);
          return;
        }

        /* Navegação geral */

        if (
          elemento.hasAttribute(
            "data-p85-next"
          )
        ) {
          evento.preventDefault();

          const destino =
            Number(
              elemento.dataset.p85Next
            ) ||
            etapaAtual + 1;

          mostrarEtapa(destino);
          return;
        }

        if (
          elemento.hasAttribute(
            "data-p85-prev"
          )
        ) {
          evento.preventDefault();

          const destino =
            Number(
              elemento.dataset.p85Prev
            ) ||
            Math.max(1, etapaAtual - 1);

          mostrarEtapa(destino);
          return;
        }

        /* Marcadores microbiológicos */

        if (
          elemento.hasAttribute(
            "data-p85-marker"
          )
        ) {
          evento.preventDefault();

          const marcador = normalizar(
            elemento.dataset.p85Marker
          );

          if (
            marcador === "vana" ||
            marcador === "van-a"
          ) {
            selecionarVanA(elemento);
          } else {
            selecionarMarcadorA(elemento);
          }

          return;
        }

        /* Alternativas do quiz */

        if (
          elemento.hasAttribute(
            "data-p85-choice"
          )
        ) {
          evento.preventDefault();

          const questao =
            identificarQuestao(elemento);

          const resposta = normalizar(
            elemento.dataset.p85Choice
          );

          if (questao === "patient-a") {
            avaliarPacienteA(
              elemento,
              resposta
            );
          }

          if (questao === "patient-b") {
            avaliarPacienteB(
              elemento,
              resposta
            );
          }
        }
      }
    );

    /* =====================================================
       ESTADO INICIAL
       ===================================================== */

    pagina
      .querySelectorAll(
        ".cap10-p85-options button," +
        ".cap10-p85-markers button," +
        ".cap10-p85-van-button"
      )
      .forEach(function (botao) {
        botao.setAttribute(
          "aria-pressed",
          "false"
        );
      });

    if (botaoPacienteB) {
      botaoPacienteB.hidden = true;
    }

    if (botaoComparacao) {
      botaoComparacao.hidden = true;
    }

    mostrarEtapa(1, false);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarPagina85
    );
  } else {
    iniciarPagina85();
  }
})();
/* =========================================================
   CAPÍTULO 10 — PÁGINA 86
   Simulação 4 — Cultura positiva significa infecção?
   ========================================================= */

(function () {
  "use strict";

  function iniciarPagina86() {
    const simulacao = document.querySelector(
      "[data-cap10-p86]"
    );

    if (!simulacao) return;

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const etapas = Array.from(
      simulacao.querySelectorAll(
        "[data-p86-stage]"
      )
    );

    const indicadores = Array.from(
      simulacao.querySelectorAll(
        "[data-p86-progress]"
      )
    );

    const linhas = Array.from(
      simulacao.querySelectorAll(
        ".cap10-p86-progress__line"
      )
    );

    const botoesNavegacao = Array.from(
      simulacao.querySelectorAll(
        "[data-p86-next]"
      )
    );

    const botoesPistas = Array.from(
      simulacao.querySelectorAll(
        "[data-p86-clue]"
      )
    );

    const alternativas = Array.from(
      simulacao.querySelectorAll(
        ".cap10-p86-option"
      )
    );

    const botaoReiniciar =
      simulacao.querySelector(
        "[data-p86-restart]"
      );

    const feedbackPistas =
      simulacao.querySelector(
        "#cap10P86ClueFeedback"
      );

    const feedbackLaboratorio =
      simulacao.querySelector(
        "#cap10P86LabFeedback"
      );

    const feedbackContexto =
      simulacao.querySelector(
        "#cap10P86ContextFeedback"
      );

    const continuarContexto =
      simulacao.querySelector(
        "#cap10P86ContinueToContext"
      );

    const continuarDebrief =
      simulacao.querySelector(
        "#cap10P86ContinueToDebrief"
      );

    /* Verificação */

    if (
      etapas.length === 0 ||
      indicadores.length === 0 ||
      !feedbackPistas ||
      !feedbackLaboratorio ||
      !feedbackContexto ||
      !continuarContexto ||
      !continuarDebrief
    ) {
      return;
    }

    /* =====================================================
       CONTEÚDO DAS PISTAS
       ===================================================== */

    const conteudoPistas = {
      piuria: {
        titulo:
          "A piúria demonstra resposta inflamatória na amostra.",

        texto:
          "Ela pode estar presente em diferentes contextos, incluindo infecção, bacteriúria assintomática e exposição recente a dispositivos urinários. Isoladamente, não diferencia essas situações."
      },

      cultura: {
        titulo:
          "A urocultura demonstra crescimento bacteriano.",

        texto:
          "Ela identifica e quantifica o microrganismo presente na amostra. O resultado não estabelece, sozinho, se esse achado corresponde a uma infecção sintomática."
      }
    };

    /* =====================================================
       FEEDBACKS — LABORATÓRIO
       ===================================================== */

    const feedbacksLaboratorio = {
      confirma: {
        tipo: "limited",

        titulo:
          "A quantidade bacteriana não deve ser interpretada isoladamente.",

        texto:
          "O crescimento ≥ 10⁵ UFC/mL confirma bacteriúria na amostra, mas não comprova, por si só, uma infecção sintomática. Ainda é necessário verificar o contexto clínico e as circunstâncias da coleta."
      },

      integrar: {
        tipo: "consistent",

        titulo:
          "Interpretação consistente do resultado.",

        texto:
          "O laudo identifica bacteriúria e resposta inflamatória na amostra. Para definir o significado clínico desses achados, é necessário relacioná-los aos sintomas, aos sinais clínicos e ao contexto da paciente."
      },

      piuria: {
        tipo: "limited",

        titulo:
          "A piúria não diferencia sozinha colonização e infecção.",

        texto:
          "A presença de leucócitos indica resposta inflamatória, mas esse achado também pode ocorrer sem infecção sintomática, especialmente após manipulação ou uso de dispositivos urinários."
      }
    };

    /* =====================================================
       FEEDBACKS — CONTEXTO
       ===================================================== */

    const feedbacksContexto = {
      infeccao: {
        tipo: "limited",

        titulo:
          "O resultado quantitativo não substitui a avaliação clínica.",

        texto:
          "A paciente não apresenta manifestações urinárias ou sistêmicas atribuíveis ao trato urinário. O crescimento bacteriano descreve a amostra, mas não confirma isoladamente uma infecção sintomática."
      },

      bacteriuria: {
        tipo: "consistent",

        titulo:
          "Síntese coerente com os dados apresentados.",

        texto:
          "A cultura demonstra bacteriúria, mas não há sintomas ou sinais clínicos atribuíveis ao trato urinário. O conjunto é compatível com bacteriúria assintomática e evidencia a diferença entre presença bacteriana e infecção."
      },

      contaminacao: {
        tipo: "attention",

        titulo:
          "Ausência de sintomas não significa contaminação.",

        texto:
          "Contaminação está relacionada à qualidade da coleta e à presença de microrganismos que não representam adequadamente o conteúdo do local analisado. A ausência de sintomas, isoladamente, não confirma que a amostra foi contaminada."
      }
    };

    /* =====================================================
       ETAPAS
       ===================================================== */

    function mostrarEtapa(numero, rolar) {
      const etapaEscolhida = etapas.find(
        function (etapa) {
          return (
            Number(etapa.dataset.p86Stage) === numero
          );
        }
      );

      if (!etapaEscolhida) return;

      etapas.forEach(function (etapa) {
        const estaAtiva =
          Number(etapa.dataset.p86Stage) === numero;

        etapa.hidden = !estaAtiva;

        etapa.classList.toggle(
          "is-active",
          estaAtiva
        );
      });

      atualizarProgresso(numero);

      if (rolar !== false) {
        etapaEscolhida.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }

    /* =====================================================
       PROGRESSO
       ===================================================== */

    function atualizarProgresso(numero) {
      indicadores.forEach(function (indicador) {
        const posicao = Number(
          indicador.dataset.p86Progress
        );

        const estaAtivo = posicao === numero;
        const estaCompleto = posicao < numero;

        indicador.classList.toggle(
          "is-active",
          estaAtivo
        );

        indicador.classList.toggle(
          "is-complete",
          estaCompleto
        );

        indicador.removeAttribute("aria-current");

        if (estaAtivo) {
          indicador.setAttribute(
            "aria-current",
            "step"
          );
        }

        const numeroVisual =
          indicador.querySelector("span");

        if (numeroVisual) {
          numeroVisual.textContent =
            estaCompleto ? "✓" : String(posicao);
        }
      });

      linhas.forEach(function (linha, indice) {
        linha.classList.toggle(
          "is-complete",
          indice < numero - 1
        );
      });
    }

    /* =====================================================
       NAVEGAÇÃO
       ===================================================== */

    botoesNavegacao.forEach(function (botao) {
      botao.addEventListener(
        "click",
        function () {
          const destino = Number(
            botao.dataset.p86Next
          );

          if (!destino) return;

          mostrarEtapa(destino);
        }
      );
    });

    /* =====================================================
       PISTAS INTERATIVAS
       ===================================================== */

    botoesPistas.forEach(function (botao) {
      botao.setAttribute(
        "aria-pressed",
        "false"
      );

      botao.addEventListener(
        "click",
        function () {
          const pista =
            botao.dataset.p86Clue;

          const conteudo =
            conteudoPistas[pista];

          if (!conteudo) return;

          botoesPistas.forEach(
            function (outroBotao) {
              const estaSelecionado =
                outroBotao === botao;

              outroBotao.classList.toggle(
                "is-active",
                estaSelecionado
              );

              outroBotao.setAttribute(
                "aria-pressed",
                String(estaSelecionado)
              );
            }
          );

          feedbackPistas.innerHTML =
            "<strong>" +
            conteudo.titulo +
            "</strong> " +
            conteudo.texto;

          feedbackPistas.hidden = false;
        }
      );
    });

    /* =====================================================
       FORMATAÇÃO DO FEEDBACK
       ===================================================== */

    function exibirFeedback(
      elemento,
      dados
    ) {
      if (!elemento || !dados) return;

      elemento.className =
        "cap10-p86-feedback";

      elemento.classList.add(
        "is-" + dados.tipo
      );

      elemento.innerHTML =
        "<strong>" +
        dados.titulo +
        "</strong> " +
        dados.texto;

      elemento.hidden = false;
    }

    /* =====================================================
       LIMPEZA DAS ALTERNATIVAS
       ===================================================== */

    function limparAlternativas(questao) {
      alternativas
        .filter(function (alternativa) {
          return (
            alternativa.dataset.p86Question ===
            questao
          );
        })
        .forEach(function (alternativa) {
          alternativa.classList.remove(
            "is-selected",
            "is-consistent",
            "is-limited",
            "is-attention"
          );

          alternativa.setAttribute(
            "aria-pressed",
            "false"
          );
        });
    }

    /* =====================================================
       QUIZ
       ===================================================== */

    alternativas.forEach(function (alternativa) {
      alternativa.setAttribute(
        "aria-pressed",
        "false"
      );

      alternativa.addEventListener(
        "click",
        function () {
          const questao =
            alternativa.dataset.p86Question;

          const escolha =
            alternativa.dataset.p86Choice;

          let dadosFeedback = null;
          let elementoFeedback = null;
          let botaoContinuar = null;

          if (questao === "laboratorio") {
            dadosFeedback =
              feedbacksLaboratorio[escolha];

            elementoFeedback =
              feedbackLaboratorio;

            botaoContinuar =
              continuarContexto;
          }

          if (questao === "contexto") {
            dadosFeedback =
              feedbacksContexto[escolha];

            elementoFeedback =
              feedbackContexto;

            botaoContinuar =
              continuarDebrief;
          }

          if (
            !dadosFeedback ||
            !elementoFeedback ||
            !botaoContinuar
          ) {
            return;
          }

          limparAlternativas(questao);

          alternativa.classList.add(
            "is-selected",
            "is-" + dadosFeedback.tipo
          );

          alternativa.setAttribute(
            "aria-pressed",
            "true"
          );

          exibirFeedback(
            elementoFeedback,
            dadosFeedback
          );

          botaoContinuar.hidden = false;
        }
      );
    });

    /* =====================================================
       REINICIAR
       ===================================================== */

    function reiniciarSimulacao() {
      alternativas.forEach(function (alternativa) {
        alternativa.classList.remove(
          "is-selected",
          "is-consistent",
          "is-limited",
          "is-attention"
        );

        alternativa.setAttribute(
          "aria-pressed",
          "false"
        );
      });

      botoesPistas.forEach(function (botao) {
        botao.classList.remove("is-active");

        botao.setAttribute(
          "aria-pressed",
          "false"
        );
      });

      feedbackPistas.hidden = true;
      feedbackPistas.innerHTML = "";

      feedbackLaboratorio.hidden = true;
      feedbackLaboratorio.innerHTML = "";
      feedbackLaboratorio.className =
        "cap10-p86-feedback";

      feedbackContexto.hidden = true;
      feedbackContexto.innerHTML = "";
      feedbackContexto.className =
        "cap10-p86-feedback";

      continuarContexto.hidden = true;
      continuarDebrief.hidden = true;

      mostrarEtapa(1);
    }

    if (botaoReiniciar) {
      botaoReiniciar.addEventListener(
        "click",
        reiniciarSimulacao
      );
    }

    /* =====================================================
       ESTADO INICIAL
       ===================================================== */

    feedbackPistas.hidden = true;
    feedbackLaboratorio.hidden = true;
    feedbackContexto.hidden = true;

    continuarContexto.hidden = true;
    continuarDebrief.hidden = true;

    mostrarEtapa(1, false);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarPagina86
    );
  } else {
    iniciarPagina86();
  }
})();
/* =========================================================
   CAPÍTULO 10 — PÁGINA 87
   Simulação 5 — Alta segura
   ========================================================= */

(function () {
  "use strict";

  function iniciarPagina87() {
    const simulacao = document.querySelector(
      "[data-cap10-p87]"
    );

    if (!simulacao) return;

    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const etapas = Array.from(
      simulacao.querySelectorAll(
        "[data-p87-stage]"
      )
    );

    const indicadores = Array.from(
      simulacao.querySelectorAll(
        "[data-p87-progress]"
      )
    );

    const linhas = Array.from(
      simulacao.querySelectorAll(
        ".cap10-p87-progress__line"
      )
    );

    const botoesNavegacao = Array.from(
      simulacao.querySelectorAll(
        "[data-p87-next]"
      )
    );

    const alternativas = Array.from(
      simulacao.querySelectorAll(
        ".cap10-p87-option"
      )
    );

    const temas = Array.from(
      simulacao.querySelectorAll(
        "[data-p87-topic]"
      )
    );

    const feedbackResposta =
      simulacao.querySelector(
        "#cap10P87ResponseFeedback"
      );

    const continuarOrientacao =
      simulacao.querySelector(
        "#cap10P87ContinueToOrientation"
      );

    const contadorTemas =
      simulacao.querySelector(
        "#cap10P87TopicCounter"
      );

    const feedbackTemas =
      simulacao.querySelector(
        "#cap10P87TopicFeedback"
      );

    const continuarTeachBack =
      simulacao.querySelector(
        "#cap10P87ContinueToTeachBack"
      );

    const feedbackTeachBack =
      simulacao.querySelector(
        "#cap10P87TeachBackFeedback"
      );

    const debrief =
      simulacao.querySelector(
        "#cap10P87Debrief"
      );

    const ideiaEssencial =
      simulacao.querySelector(
        "#cap10P87Essential"
      );

    const acoesFinais =
      simulacao.querySelector(
        "#cap10P87FinalActions"
      );

    const botaoReiniciar =
      simulacao.querySelector(
        "[data-p87-restart]"
      );

    if (
      etapas.length === 0 ||
      indicadores.length === 0 ||
      !feedbackResposta ||
      !continuarOrientacao ||
      !contadorTemas ||
      !feedbackTemas ||
      !continuarTeachBack ||
      !feedbackTeachBack ||
      !debrief ||
      !ideiaEssencial ||
      !acoesFinais
    ) {
      return;
    }

    /* =====================================================
       FEEDBACKS — PRIMEIRA RESPOSTA
       ===================================================== */

    const feedbacksResposta = {
      ordem: {
        tipo: "limited",

        titulo:
          "A orientação fica centrada apenas na ordem.",

        texto:
          "A resposta informa que o paciente deve seguir a prescrição, mas não explora sua dúvida, não esclarece o motivo da orientação e não cria espaço para confirmar o que ele compreendeu."
      },

      tecnica: {
        tipo: "attention",

        titulo:
          "A informação científica precisa ser traduzida.",

        texto:
          "A explicação apresenta conceitos pertinentes, mas utiliza uma linguagem técnica que pode dificultar a compreensão. O paciente precisa receber informações aplicáveis ao cuidado em casa."
      },

      dialogo: {
        tipo: "consistent",

        titulo:
          "A resposta favorece diálogo e compreensão.",

        texto:
          "A fala reconhece a dúvida, evita julgamento e abre espaço para explicar a duração prescrita, os riscos da alteração por conta própria e a inadequação de guardar ou reutilizar medicamentos."
      }
    };

    /* =====================================================
       CONTEÚDO DOS TEMAS
       ===================================================== */

    const conteudoTemas = {
      finalidade: {
        tipo: "consistent",

        titulo:
          "Finalidade incluída.",

        texto:
          "Explicar por que o medicamento foi prescrito ajuda o paciente a relacionar o tratamento à situação clínica que motivou sua utilização."
      },

      uso: {
        tipo: "consistent",

        titulo:
          "Forma de uso incluída.",

        texto:
          "Horários, intervalo e duração precisam ser apresentados de maneira clara. O paciente também deve saber que não deve modificar essas orientações por conta própria."
      },

      seguranca: {
        tipo: "consistent",

        titulo:
          "Informações de segurança incluídas.",

        texto:
          "É importante diferenciar eventos adversos esperados de sinais que exigem contato com a equipe ou nova avaliação."
      },

      duvidas: {
        tipo: "consistent",

        titulo:
          "Dúvidas práticas incluídas.",

        texto:
          "A conversa deve abordar esquecimentos, armazenamento, sobras e não compartilhamento. Orientações específicas devem respeitar o medicamento e a prescrição recebida."
      },

      mecanismo: {
        tipo: "attention",

        titulo:
          "O detalhamento molecular não é prioridade nessa conversa.",

        texto:
          "O mecanismo de ação pode ser explicado se houver interesse ou necessidade, mas não deve ocupar o lugar das informações essenciais para o uso seguro do medicamento."
      }
    };

    /* =====================================================
       FEEDBACKS — CONFIRMAÇÃO DA COMPREENSÃO
       ===================================================== */

    const feedbacksTeachBack = {
      entendeu: {
        tipo: "limited",

        titulo:
          "Uma pergunta fechada fornece pouca informação.",

        texto:
          "O paciente pode responder “sim” mesmo quando permaneceu com dúvidas. A pergunta não permite observar como ele interpretou as orientações."
      },

      prova: {
        tipo: "attention",

        titulo:
          "A confirmação não deve parecer uma prova.",

        texto:
          "A formulação responsabiliza e pode constranger o paciente. O objetivo é verificar se a explicação foi clara, e não testar sua atenção ou memória."
      },

      confirmar: {
        tipo: "consistent",

        titulo:
          "Forma adequada de confirmar a compreensão.",

        texto:
          "A pergunta aberta atribui ao profissional a responsabilidade pela clareza da explicação e permite que o paciente descreva, com suas próprias palavras, como realizará o cuidado em casa."
      }
    };

    /* =====================================================
       EXIBIÇÃO DAS ETAPAS
       ===================================================== */

    function mostrarEtapa(numero, rolar) {
      const etapaEscolhida = etapas.find(
        function (etapa) {
          return (
            Number(etapa.dataset.p87Stage) ===
            numero
          );
        }
      );

      if (!etapaEscolhida) return;

      etapas.forEach(function (etapa) {
        const estaAtiva =
          Number(etapa.dataset.p87Stage) ===
          numero;

        etapa.hidden = !estaAtiva;

        etapa.classList.toggle(
          "is-active",
          estaAtiva
        );
      });

      atualizarProgresso(numero);

      if (rolar !== false) {
        etapaEscolhida.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }

    /* =====================================================
       PROGRESSO
       ===================================================== */

    function atualizarProgresso(numero) {
      indicadores.forEach(function (indicador) {
        const posicao = Number(
          indicador.dataset.p87Progress
        );

        const estaAtivo = posicao === numero;
        const estaCompleto = posicao < numero;

        indicador.classList.toggle(
          "is-active",
          estaAtivo
        );

        indicador.classList.toggle(
          "is-complete",
          estaCompleto
        );

        indicador.removeAttribute("aria-current");

        if (estaAtivo) {
          indicador.setAttribute(
            "aria-current",
            "step"
          );
        }

        const numeroVisual =
          indicador.querySelector("span");

        if (numeroVisual) {
          numeroVisual.textContent =
            estaCompleto
              ? "✓"
              : String(posicao);
        }
      });

      linhas.forEach(function (linha, indice) {
        linha.classList.toggle(
          "is-complete",
          indice < numero - 1
        );
      });
    }

    /* =====================================================
       NAVEGAÇÃO
       ===================================================== */

    botoesNavegacao.forEach(function (botao) {
      botao.addEventListener(
        "click",
        function () {
          const destino = Number(
            botao.dataset.p87Next
          );

          if (!destino) return;

          mostrarEtapa(destino);
        }
      );
    });

    /* =====================================================
       FORMATAÇÃO DOS FEEDBACKS
       ===================================================== */

    function exibirFeedback(
      elemento,
      dados,
      classeBase
    ) {
      if (!elemento || !dados) return;

      elemento.className = classeBase;

      elemento.classList.add(
        "is-" + dados.tipo
      );

      elemento.innerHTML =
        "<strong>" +
        dados.titulo +
        "</strong> " +
        dados.texto;

      elemento.hidden = false;
    }

    /* =====================================================
       LIMPEZA DAS ALTERNATIVAS
       ===================================================== */

    function limparAlternativas(questao) {
      alternativas
        .filter(function (alternativa) {
          return (
            alternativa.dataset.p87Question ===
            questao
          );
        })
        .forEach(function (alternativa) {
          alternativa.classList.remove(
            "is-selected",
            "is-consistent",
            "is-limited",
            "is-attention"
          );

          alternativa.setAttribute(
            "aria-pressed",
            "false"
          );
        });
    }

    /* =====================================================
       QUIZ — RESPOSTA E TEACH-BACK
       ===================================================== */

    alternativas.forEach(function (alternativa) {
      alternativa.setAttribute(
        "aria-pressed",
        "false"
      );

      alternativa.addEventListener(
        "click",
        function () {
          const questao =
            alternativa.dataset.p87Question;

          const escolha =
            alternativa.dataset.p87Choice;

          let dadosFeedback = null;
          let elementoFeedback = null;

          if (questao === "resposta") {
            dadosFeedback =
              feedbacksResposta[escolha];

            elementoFeedback =
              feedbackResposta;
          }

          if (questao === "teachback") {
            dadosFeedback =
              feedbacksTeachBack[escolha];

            elementoFeedback =
              feedbackTeachBack;
          }

          if (
            !dadosFeedback ||
            !elementoFeedback
          ) {
            return;
          }

          limparAlternativas(questao);

          alternativa.classList.add(
            "is-selected",
            "is-" + dadosFeedback.tipo
          );

          alternativa.setAttribute(
            "aria-pressed",
            "true"
          );

          exibirFeedback(
            elementoFeedback,
            dadosFeedback,
            "cap10-p87-feedback"
          );

          if (questao === "resposta") {
            continuarOrientacao.hidden = false;
          }

          if (questao === "teachback") {
            debrief.hidden = false;
            ideiaEssencial.hidden = false;
            acoesFinais.hidden = false;
          }
        }
      );
    });

    /* =====================================================
       SELEÇÃO DOS TEMAS DA ORIENTAÇÃO
       ===================================================== */

    function contarTemasEssenciais() {
      return temas.filter(function (tema) {
        return (
          tema.dataset.p87Essential === "true" &&
          tema.classList.contains("is-selected")
        );
      }).length;
    }

    function atualizarContadorTemas() {
      const totalSelecionado =
        contarTemasEssenciais();

      contadorTemas.textContent =
        totalSelecionado + " de 4";

      contadorTemas.classList.toggle(
        "is-complete",
        totalSelecionado === 4
      );

      continuarTeachBack.hidden =
        totalSelecionado !== 4;
    }

    temas.forEach(function (tema) {
      tema.setAttribute(
        "aria-pressed",
        "false"
      );

      tema.addEventListener(
        "click",
        function () {
          const nomeTema =
            tema.dataset.p87Topic;

          const essencial =
            tema.dataset.p87Essential === "true";

          const dados =
            conteudoTemas[nomeTema];

          if (!dados) return;

          const estavaSelecionado =
            tema.classList.contains(
              "is-selected"
            );

          tema.classList.toggle(
            "is-selected",
            !estavaSelecionado
          );

          tema.classList.remove(
            "is-essential",
            "is-extra"
          );

          if (!estavaSelecionado) {
            tema.classList.add(
              essencial
                ? "is-essential"
                : "is-extra"
            );
          }

          tema.setAttribute(
            "aria-pressed",
            String(!estavaSelecionado)
          );

          if (!estavaSelecionado) {
            exibirFeedback(
              feedbackTemas,
              dados,
              "cap10-p87-topic-feedback"
            );
          } else {
            feedbackTemas.hidden = true;
            feedbackTemas.innerHTML = "";
          }

          atualizarContadorTemas();
        }
      );
    });

    /* =====================================================
       REINICIAR
       ===================================================== */

    function reiniciarSimulacao() {
      alternativas.forEach(function (alternativa) {
        alternativa.classList.remove(
          "is-selected",
          "is-consistent",
          "is-limited",
          "is-attention"
        );

        alternativa.setAttribute(
          "aria-pressed",
          "false"
        );
      });

      temas.forEach(function (tema) {
        tema.classList.remove(
          "is-selected",
          "is-essential",
          "is-extra"
        );

        tema.setAttribute(
          "aria-pressed",
          "false"
        );
      });

      feedbackResposta.hidden = true;
      feedbackResposta.innerHTML = "";
      feedbackResposta.className =
        "cap10-p87-feedback";

      feedbackTemas.hidden = true;
      feedbackTemas.innerHTML = "";
      feedbackTemas.className =
        "cap10-p87-topic-feedback";

      feedbackTeachBack.hidden = true;
      feedbackTeachBack.innerHTML = "";
      feedbackTeachBack.className =
        "cap10-p87-feedback";

      continuarOrientacao.hidden = true;
      continuarTeachBack.hidden = true;

      contadorTemas.textContent = "0 de 4";
      contadorTemas.classList.remove(
        "is-complete"
      );

      debrief.hidden = true;
      ideiaEssencial.hidden = true;
      acoesFinais.hidden = true;

      mostrarEtapa(1);
    }

    if (botaoReiniciar) {
      botaoReiniciar.addEventListener(
        "click",
        reiniciarSimulacao
      );
    }

    /* =====================================================
       ESTADO INICIAL
       ===================================================== */

    feedbackResposta.hidden = true;
    feedbackTemas.hidden = true;
    feedbackTeachBack.hidden = true;

    continuarOrientacao.hidden = true;
    continuarTeachBack.hidden = true;

    debrief.hidden = true;
    ideiaEssencial.hidden = true;
    acoesFinais.hidden = true;

    contadorTemas.textContent = "0 de 4";

    mostrarEtapa(1, false);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarPagina87
    );
  } else {
    iniciarPagina87();
  }
})();
/* =========================================================
   CAPÍTULO 10 — PÁGINA 88
   Desafio integrador: microrganismos multirresistentes
========================================================= */

(function () {
  "use strict";

  function iniciarPagina88() {
    const pagina = document.querySelector("[data-cap10-p88]");

    if (!pagina) {
      return;
    }

    /* -----------------------------------------------------
       ELEMENTOS DA PÁGINA
    ----------------------------------------------------- */

    const etapas = Array.from(
      pagina.querySelectorAll("[data-p88-stage]")
    );

    const itensProgresso = Array.from(
      pagina.querySelectorAll("[data-p88-progress]")
    );

    const linhasProgresso = Array.from(
      pagina.querySelectorAll(".cap10-p88-progress__line")
    );

    const botoesNavegacao = Array.from(
      pagina.querySelectorAll("[data-p88-next]")
    );

    const abasAlertas = Array.from(
      pagina.querySelectorAll("[data-p88-alert]")
    );

    const paineisAlertas = Array.from(
      pagina.querySelectorAll("[data-p88-alert-panel]")
    );

    const contadorAlertas = pagina.querySelector(
      "#cap10P88AlertCounter"
    );

    const opcoesAlertas = Array.from(
      pagina.querySelectorAll(".cap10-p88-option")
    );

    const feedbackAlertas = pagina.querySelector(
      "#cap10P88AlertFeedback"
    );

    const botaoContinuarIntegracao = pagina.querySelector(
      "#cap10P88ContinueToIntegration"
    );

    const fatores = Array.from(
      pagina.querySelectorAll("[data-p88-factor]")
    );

    const contadorFatores = pagina.querySelector(
      "#cap10P88FactorCounter"
    );

    const feedbackFatores = pagina.querySelector(
      "#cap10P88FactorFeedback"
    );

    const botaoContinuarDebriefing = pagina.querySelector(
      "#cap10P88ContinueToDebrief"
    );

    const botaoReiniciar = pagina.querySelector(
      "[data-p88-restart]"
    );

    const alertasConsultados = new Set(["crab"]);
    let perguntaAlertasRespondida = false;

    /* -----------------------------------------------------
       NAVEGAÇÃO ENTRE AS ETAPAS
    ----------------------------------------------------- */

    function mostrarEtapa(numeroEtapa, rolar = true) {
      const etapaAtual = String(numeroEtapa);

      etapas.forEach(function (etapa) {
        const estaAtiva =
          etapa.dataset.p88Stage === etapaAtual;

        etapa.hidden = !estaAtiva;
        etapa.classList.toggle("is-active", estaAtiva);
      });

      itensProgresso.forEach(function (item) {
        const numero = Number(item.dataset.p88Progress);
        const marcador = item.querySelector("span");
        const estaAtivo = numero === numeroEtapa;
        const estaConcluido = numero < numeroEtapa;

        item.classList.toggle("is-active", estaAtivo);
        item.classList.toggle("is-complete", estaConcluido);

        if (marcador) {
          marcador.textContent = estaConcluido ? "✓" : String(numero);
        }
      });

      linhasProgresso.forEach(function (linha, indice) {
        linha.classList.toggle(
          "is-complete",
          numeroEtapa > indice + 1
        );
      });

      if (rolar) {
        pagina.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }

    botoesNavegacao.forEach(function (botao) {
      botao.addEventListener("click", function () {
        const destino = Number(botao.dataset.p88Next);

        if (!Number.isNaN(destino)) {
          mostrarEtapa(destino);
        }
      });
    });

    /* -----------------------------------------------------
       ETAPA 2 — CONSULTA DOS TRÊS ALERTAS
    ----------------------------------------------------- */

    function atualizarContadorAlertas() {
      const quantidade = alertasConsultados.size;

      if (contadorAlertas) {
        contadorAlertas.textContent = quantidade + " de 3";
        contadorAlertas.classList.toggle(
          "is-complete",
          quantidade === 3
        );
      }

      atualizarContinuacaoIntegracao();
    }

    function atualizarContinuacaoIntegracao() {
      if (!botaoContinuarIntegracao) {
        return;
      }

      const atividadeConcluida =
        alertasConsultados.size === 3 &&
        perguntaAlertasRespondida;

      botaoContinuarIntegracao.hidden = !atividadeConcluida;
    }

    function ativarAlerta(chaveAlerta, moverFoco = false) {
      abasAlertas.forEach(function (aba) {
        const estaAtiva =
          aba.dataset.p88Alert === chaveAlerta;

        aba.classList.toggle("is-active", estaAtiva);
        aba.setAttribute(
          "aria-selected",
          estaAtiva ? "true" : "false"
        );

        aba.tabIndex = estaAtiva ? 0 : -1;

        if (estaAtiva && moverFoco) {
          aba.focus();
        }
      });

      paineisAlertas.forEach(function (painel) {
        const estaAtivo =
          painel.dataset.p88AlertPanel === chaveAlerta;

        painel.hidden = !estaAtivo;
        painel.classList.toggle("is-active", estaAtivo);
      });

      alertasConsultados.add(chaveAlerta);
      atualizarContadorAlertas();
    }

    abasAlertas.forEach(function (aba, indice) {
      aba.addEventListener("click", function () {
        ativarAlerta(aba.dataset.p88Alert);
      });

      aba.addEventListener("keydown", function (evento) {
        let novoIndice = indice;

        if (evento.key === "ArrowRight") {
          novoIndice = (indice + 1) % abasAlertas.length;
        } else if (evento.key === "ArrowLeft") {
          novoIndice =
            (indice - 1 + abasAlertas.length) %
            abasAlertas.length;
        } else if (evento.key === "Home") {
          novoIndice = 0;
        } else if (evento.key === "End") {
          novoIndice = abasAlertas.length - 1;
        } else {
          return;
        }

        evento.preventDefault();

        ativarAlerta(
          abasAlertas[novoIndice].dataset.p88Alert,
          true
        );
      });
    });

    /* -----------------------------------------------------
       QUESTÃO DA ETAPA 2
    ----------------------------------------------------- */

    const respostasAlertas = {
      prescreve: {
        tipo: "limitada",
        texto:
          "O mecanismo de resistência não determina sozinho uma estratégia terapêutica. Ainda é necessário confirmar a relevância clínica do isolado, o foco infeccioso, a gravidade, o painel de sensibilidade, a exposição esperada e os riscos para o paciente."
      },

      restricoes: {
        tipo: "consistente",
        texto:
          "Isso mesmo. O mecanismo ajuda a reconhecer restrições e possíveis falhas, mas precisa ser integrado ao quadro clínico, ao foco, à microbiologia completa, à exposição e à segurança."
      },

      "unico-s": {
        tipo: "limitada",
        texto:
          "A categoria “sensível” indica maior probabilidade de sucesso sob condições definidas de exposição. Um único resultado sensível não representa, isoladamente, uma recomendação de tratamento nem confirma que a opção seja adequada para aquele paciente."
      }
    };

    opcoesAlertas.forEach(function (opcao) {
      opcao.addEventListener("click", function () {
        const escolha = opcao.dataset.p88Choice;
        const resposta = respostasAlertas[escolha];

        if (!resposta) {
          return;
        }

        opcoesAlertas.forEach(function (item) {
          item.classList.remove(
            "is-selected",
            "is-consistent",
            "is-limited",
            "is-attention"
          );

          item.setAttribute("aria-pressed", "false");
        });

        opcao.classList.add("is-selected");
        opcao.setAttribute("aria-pressed", "true");

        if (resposta.tipo === "consistente") {
          opcao.classList.add("is-consistent");
        } else {
          opcao.classList.add("is-limited");
        }

        if (feedbackAlertas) {
          feedbackAlertas.hidden = false;
          feedbackAlertas.textContent = resposta.texto;
        }

        perguntaAlertasRespondida = true;
        atualizarContinuacaoIntegracao();
      });
    });

    /* -----------------------------------------------------
       ETAPA 3 — FATORES DO RACIOCÍNIO
    ----------------------------------------------------- */

    const explicacoesFatores = {
      infeccao:
        "Antes de interpretar o antibiograma, confirme se o microrganismo representa infecção, colonização ou possível contaminação. Considere sinais clínicos, qualidade da amostra e evolução.",

      foco:
        "O foco provável, a gravidade e a possibilidade de controle da fonte modificam a interpretação dos resultados e o grau de urgência da decisão.",

      microbiologia:
        "O método utilizado, as categorias do antibiograma, as concentrações inibitórias, o painel ampliado e a confirmação do mecanismo ajudam a definir os limites da análise.",

      pkpd:
        "Sensibilidade laboratorial e exposição clínica precisam conversar. Dose, intervalo, penetração no foco e características farmacocinéticas e farmacodinâmicas interferem na probabilidade de resposta.",

      seguranca:
        "Função renal, toxicidades, interações, tratamentos prévios, evidências disponíveis e recursos locais devem integrar a avaliação.",

      atalho:
        "Reconhecer o nome do microrganismo ou contar quantas opções aparecem como resistentes não substitui a integração dos dados clínicos, microbiológicos e farmacológicos."
    };

    function atualizarFatores() {
      const essenciaisSelecionados = fatores.filter(
        function (fator) {
          return (
            fator.dataset.p88Essential === "true" &&
            fator.classList.contains("is-selected")
          );
        }
      ).length;

      if (contadorFatores) {
        contadorFatores.textContent =
          essenciaisSelecionados + " de 5";

        contadorFatores.classList.toggle(
          "is-complete",
          essenciaisSelecionados === 5
        );
      }

      if (botaoContinuarDebriefing) {
        botaoContinuarDebriefing.hidden =
          essenciaisSelecionados !== 5;
      }
    }

    fatores.forEach(function (fator) {
      fator.addEventListener("click", function () {
        const nomeFator = fator.dataset.p88Factor;
        const essencial =
          fator.dataset.p88Essential === "true";

        const foiSelecionado =
          fator.classList.toggle("is-selected");

        fator.classList.remove(
          "is-essential",
          "is-shortcut"
        );

        fator.setAttribute(
          "aria-pressed",
          foiSelecionado ? "true" : "false"
        );

        if (foiSelecionado) {
          fator.classList.add(
            essencial ? "is-essential" : "is-shortcut"
          );
        }

        if (feedbackFatores) {
          if (foiSelecionado) {
            feedbackFatores.hidden = false;
            feedbackFatores.textContent =
              explicacoesFatores[nomeFator] || "";

            feedbackFatores.classList.remove(
              "is-consistent",
              "is-attention"
            );

            feedbackFatores.classList.add(
              essencial ? "is-consistent" : "is-attention"
            );
          } else {
            feedbackFatores.hidden = true;
            feedbackFatores.textContent = "";
            feedbackFatores.classList.remove(
              "is-consistent",
              "is-attention"
            );
          }
        }

        atualizarFatores();
      });
    });

    /* -----------------------------------------------------
       REINICIAR A SIMULAÇÃO
    ----------------------------------------------------- */

    function reiniciarPagina88() {
      alertasConsultados.clear();
      alertasConsultados.add("crab");
      perguntaAlertasRespondida = false;

      ativarAlerta("crab");

      opcoesAlertas.forEach(function (opcao) {
        opcao.classList.remove(
          "is-selected",
          "is-consistent",
          "is-limited",
          "is-attention"
        );

        opcao.setAttribute("aria-pressed", "false");
      });

      if (feedbackAlertas) {
        feedbackAlertas.hidden = true;
        feedbackAlertas.textContent = "";
      }

      if (botaoContinuarIntegracao) {
        botaoContinuarIntegracao.hidden = true;
      }

      fatores.forEach(function (fator) {
        fator.classList.remove(
          "is-selected",
          "is-essential",
          "is-shortcut"
        );

        fator.setAttribute("aria-pressed", "false");
      });

      if (contadorFatores) {
        contadorFatores.textContent = "0 de 5";
        contadorFatores.classList.remove("is-complete");
      }

      if (feedbackFatores) {
        feedbackFatores.hidden = true;
        feedbackFatores.textContent = "";
        feedbackFatores.classList.remove(
          "is-consistent",
          "is-attention"
        );
      }

      if (botaoContinuarDebriefing) {
        botaoContinuarDebriefing.hidden = true;
      }

      mostrarEtapa(1);
    }

    if (botaoReiniciar) {
      botaoReiniciar.addEventListener(
        "click",
        reiniciarPagina88
      );
    }

    /* -----------------------------------------------------
       ESTADO INICIAL
    ----------------------------------------------------- */

    mostrarEtapa(1, false);
    ativarAlerta("crab");
    atualizarFatores();
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      iniciarPagina88
    );
  } else {
    iniciarPagina88();
  }
})();