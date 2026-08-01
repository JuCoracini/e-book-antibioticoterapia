(function initCap8Page69(){
  const page = document.querySelector(".cap8-page69");
  if (!page) return;

  const data = {
    respiratorio: {
      kicker: "Foco respiratório",
      title: "O foco provável organiza a primeira cobertura",
      text: "Em infecções respiratórias, a decisão inicial depende da coerência entre quadro clínico, exame físico e, quando disponível, achados de imagem. O foco anatômico ajuda a estimar quais patógenos são mais prováveis e qual amplitude de cobertura faz sentido naquele contexto.",
      weight: "Compatibilidade clínica do quadro e gravidade da apresentação.",
      risk: "Presumir infecção bacteriana apenas com base em sintomas respiratórios inespecíficos."
    },
    cutaneo: {
      kicker: "Foco cutâneo",
      title: "A extensão da lesão muda o raciocínio inicial",
      text: "Nas infecções cutâneas, o primeiro passo é distinguir inflamação localizada de infecção bacteriana verdadeira. A distribuição da lesão, a presença de secreção, necrose, dor desproporcional e repercussão sistêmica influenciam diretamente a decisão empírica.",
      weight: "Profundidade da lesão, extensão do acometimento e sinais sistêmicos.",
      risk: "Superestimar infecção bacteriana em processos inflamatórios não infecciosos."
    },
    intraabdominal: {
      kicker: "Foco intra-abdominal",
      title: "Antibacteriano não substitui controle de foco",
      text: "Nas infecções intra-abdominais, a estimativa microbiológica costuma ser mais complexa e frequentemente polimicrobiana. A escolha empírica precisa considerar gravidade, local provável do processo e a possibilidade de perfuração ou necrose, sem perder de vista a necessidade de controle do foco infeccioso.",
      weight: "Gravidade clínica associada à possibilidade de drenagem, cirurgia ou outra intervenção de foco.",
      risk: "Depender apenas da cobertura antibacteriana sem abordar a fonte da infecção."
    },
    sistemico: {
      kicker: "Foco sistêmico",
      title: "Gravidade redefine a urgência da decisão",
      text: "Quando a apresentação sugere infecção sistêmica, a prioridade é reduzir rapidamente o risco de inadequação terapêutica inicial. Nessa situação, a escolha empírica costuma exigir cobertura mais ampla, orientada pela gravidade, pelo provável foco de origem e pelo perfil do paciente.",
      weight: "Instabilidade hemodinâmica, sinais de disfunção orgânica e risco de sepse.",
      risk: "Subestimar gravidade e atrasar o início da antibioticoterapia empírica."
    },
    urinario: {
      kicker: "Foco urinário",
      title: "O laboratório só ganha sentido com a síndrome clínica",
      text: "Nas infecções urinárias, o raciocínio empírico depende da relação entre sintomas, contexto clínico e achados laboratoriais. O foco urinário não deve ser definido apenas por bacteriúria, porque a presença de microrganismos na urina pode refletir colonização e não doença infecciosa ativa.",
      weight: "Síndrome urinária compatível, contexto do paciente e possível repercussão sistêmica.",
      risk: "Tratar bacteriúria assintomática fora das situações em que isso é indicado."
    }
  };

  const tabs = Array.from(page.querySelectorAll(".cap8-p69-tab"));
  const panel = page.querySelector("[data-p69-panel]");
  const kicker = page.querySelector("[data-p69-kicker]");
  const title = page.querySelector("[data-p69-title]");
  const text = page.querySelector("[data-p69-text]");
  const weight = page.querySelector("[data-p69-weight]");
  const risk = page.querySelector("[data-p69-risk]");

  if (!tabs.length || !panel || !kicker || !title || !text || !weight || !risk) return;

  function syncTabs(activeKey){
    tabs.forEach((tab) => {
      const isActive = tab.dataset.focus === activeKey;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", isActive ? "true" : "false");
      tab.setAttribute("tabindex", isActive ? "0" : "-1");
    });
  }

  function renderFocus(key, animate = true){
    const entry = data[key];
    if (!entry) return;

    kicker.textContent = entry.kicker;
    title.textContent = entry.title;
    text.textContent = entry.text;
    weight.textContent = entry.weight;
    risk.textContent = entry.risk;

    syncTabs(key);
    panel.setAttribute("aria-labelledby", `p69-tab-${key}`);

    if (animate) {
      panel.classList.remove("is-updating");
      void panel.offsetWidth;
      panel.classList.add("is-updating");
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      renderFocus(tab.dataset.focus);
    });

    tab.addEventListener("keydown", (event) => {
      const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
      if (!keys.includes(event.key)) return;

      event.preventDefault();
      let nextIndex = index;

      if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;

      tabs[nextIndex].focus();
      renderFocus(tabs[nextIndex].dataset.focus);
    });
  });

  renderFocus("respiratorio", false);
})();

(function initCap8Page70() {
  const root = document.querySelector(".cap8-page70");

  if (!root) return;

  const options = Array.from(
    root.querySelectorAll(".cap8-p70-option")
  );

  const feedback = root.querySelector(
    ".cap8-p70-feedback"
  );

  const evolution = root.querySelector(
    ".cap8-p70-evolution"
  );

  const revealButton = root.querySelector(
    "[data-reveal]"
  );

  const reveal = root.querySelector(
    ".cap8-p70-reveal"
  );

  if (
    !options.length ||
    !feedback ||
    !evolution
  ) {
    return;
  }

  const feedbackMap = {
    alta: {
      title: "Interpretação precipitada",
      text:
        "Sintomas isolados não permitem distinguir " +
        "etiologia viral de bacteriana."
    },

    moderada: {
      title: "Raciocínio parcialmente adequado",
      text:
        "Ainda faltam elementos objetivos para " +
        "sustentar infecção bacteriana."
    },

    baixa: {
      title: "Leitura mais consistente",
      text:
        "Na ausência de achados específicos, a " +
        "probabilidade de etiologia viral é maior."
    }
  };

  function selectOption(selectedButton) {
    const choice = selectedButton.dataset.choice;
    const entry = feedbackMap[choice];

    if (!entry) return;

    options.forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });

    selectedButton.classList.add("is-selected");
    selectedButton.setAttribute("aria-pressed", "true");

    feedback.innerHTML = `
      <strong>${entry.title}</strong>
      <span>${entry.text}</span>
    `;

    feedback.classList.add("is-visible");

    evolution.hidden = false;
  }

  options.forEach((button) => {
    button.addEventListener("click", () => {
      selectOption(button);
    });
  });

  revealButton?.addEventListener("click", () => {
    if (!reveal) return;

    reveal.textContent =
      "O novo conjunto de achados aumenta a probabilidade " +
      "de etiologia bacteriana e modifica a avaliação " +
      "realizada apenas com base nos sintomas iniciais.";

    reveal.classList.add("is-visible");

    revealButton.setAttribute(
      "aria-expanded",
      "true"
    );

    revealButton.textContent =
      "Novo dado integrado ao raciocínio";
  });
})();

(function initCap8Page71() {
  const root = document.querySelector(".cap8-page71");

  if (!root) return;

  const options = Array.from(
    root.querySelectorAll(".cap8-p71-option")
  );

  const feedback = root.querySelector(
    ".cap8-p71-feedback"
  );

  const consequenceBox = root.querySelector(
    ".cap8-p71-consequence"
  );

  const consequenceButton = root.querySelector(
    "[data-consequence]"
  );

  const result = root.querySelector(
    ".cap8-p71-result"
  );

  if (
    !options.length ||
    !feedback ||
    !consequenceBox
  ) {
    return;
  }

  const feedbackMap = {
    infeccao: {
      title: "Interpretação inadequada",
      text:
        "A presença isolada de bacteriúria não " +
        "define infecção urinária ativa na " +
        "ausência de sintomas.",
      tone: "warning"
    },

    colonizacao: {
      title: "Interpretação mais consistente",
      text:
        "Na ausência de sintomas urinários, a " +
        "bacteriúria corresponde à colonização " +
        "e não deve ser tratada na maioria das " +
        "situações.",
      tone: "correct"
    },

    inconclusivo: {
      title: "Leitura incompleta",
      text:
        "A urocultura não deve ser interpretada " +
        "isoladamente, mas neste caso já há " +
        "elementos suficientes para afastar " +
        "infecção ativa.",
      tone: "warning"
    }
  };

  function selectOption(selectedButton) {
    const choice = selectedButton.dataset.choice;
    const entry = feedbackMap[choice];

    if (!entry) return;

    options.forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });

    selectedButton.classList.add("is-selected");

    selectedButton.setAttribute(
      "aria-pressed",
      "true"
    );

    feedback.className =
      `cap8-p71-feedback is-visible is-${entry.tone}`;

    feedback.innerHTML = `
      <strong>${entry.title}</strong>
      <span>${entry.text}</span>
    `;

    consequenceBox.hidden = false;
  }

  options.forEach((button) => {
    button.addEventListener("click", () => {
      selectOption(button);
    });
  });

  consequenceButton?.addEventListener(
    "click",
    () => {
      if (!result) return;

      result.innerHTML = `
        <strong>
          Risco do tratamento desnecessário
        </strong>

        <span>
          O tratamento pode levar à seleção de
          cepas resistentes, alteração da microbiota
          e exposição a efeitos adversos sem
          benefício clínico.
        </span>
      `;

      result.classList.add("is-visible");

      consequenceButton.setAttribute(
        "aria-expanded",
        "true"
      );

      consequenceButton.textContent =
        "Risco do tratamento analisado";
    }
  );
})();


(function initCap8Page72() {
  const root = document.querySelector(".cap8-page72");

  if (!root) return;

  const options = Array.from(
    root.querySelectorAll(".cap8-p72-option")
  );

  const feedback = root.querySelector(
    ".cap8-p72-feedback"
  );

  if (!options.length || !feedback) return;

  const feedbackMap = {
    polimicrobiana: {
      title: "Perfil microbiológico relevante",

      text:
        "A etiologia polimicrobiana influencia a " +
        "cobertura inicial, mas não determina " +
        "isoladamente toda a conduta clínica.",

      tone: "micro"
    },

    espectro: {
      title:
        "Cobertura necessária, mas não suficiente",

      text:
        "A amplitude do espectro deve acompanhar " +
        "o contexto clínico e epidemiológico, mas " +
        "não garante a resolução do processo " +
        "infeccioso.",

      tone: "spectrum"
    },

    foco: {
      title: "Elemento decisivo da abordagem",

      text:
        "Sem controle do foco infeccioso, a " +
        "infecção pode persistir mesmo na presença " +
        "de antibacterianos microbiologicamente " +
        "ativos.",

      tone: "focus"
    }
  };

  function selectOption(selectedButton) {
    const choice = selectedButton.dataset.choice;
    const entry = feedbackMap[choice];

    if (!entry) return;

    options.forEach((button) => {
      button.classList.remove("is-selected");

      button.setAttribute(
        "aria-pressed",
        "false"
      );
    });

    selectedButton.classList.add("is-selected");

    selectedButton.setAttribute(
      "aria-pressed",
      "true"
    );

    feedback.className =
      `cap8-p72-feedback is-visible is-${entry.tone}`;

    feedback.innerHTML = `
      <strong>${entry.title}</strong>
      <span>${entry.text}</span>
    `;
  }

  options.forEach((button) => {
    button.addEventListener("click", () => {
      selectOption(button);
    });
  });
})();

(function initCap8Page73() {
  const page = document.querySelector(".cap8-page73");

  if (!page) return;

  const phaseData = {
    "hora-zero": {
      kicker: "Hora Zero",

      title:
        "Prioridade é não atrasar cobertura adequada",

      text:
        "Em pacientes com suspeita de sepse e " +
        "disfunção orgânica, a prioridade é iniciar " +
        "prontamente terapia antimicrobiana empírica " +
        "adequada. Nessa fase, a urgência clínica " +
        "predomina sobre a precisão etiológica, e o " +
        "risco de inadequação terapêutica precoce " +
        "pesa diretamente no prognóstico.",

      focus:
        "Reduzir rapidamente o risco de tratamento " +
        "inicial inadequado.",

      risk:
        "Subestimar a gravidade do quadro e atrasar " +
        "a cobertura empírica nas primeiras horas."
    },

    "24-48h": {
      kicker: "24–48h",

      title:
        "Reavaliação contínua passa a reorganizar a conduta",

      text:
        "À medida que a evolução clínica e os " +
        "resultados parciais se tornam disponíveis, " +
        "a estratégia inicial precisa ser reavaliada. " +
        "Nessa fase, o raciocínio deve integrar " +
        "resposta clínica, foco provável e dados " +
        "microbiológicos ainda incompletos, sem manter " +
        "decisões iniciais de forma automática.",

      focus:
        "Integrar evolução clínica, hipótese etiológica " +
        "e resultados parciais.",

      risk:
        "Manter cobertura empírica ampla sem " +
        "reavaliação ativa da estratégia inicial."
    },

    "72h": {
      kicker: "72h+",

      title:
        "Patógeno identificado deve orientar terapia direcionada",

      text:
        "Quando o microrganismo é identificado e seu " +
        "perfil de suscetibilidade se torna conhecido, " +
        "a terapia deve ser ajustada ao patógeno " +
        "isolado. O objetivo passa a ser preservar " +
        "eficácia clínica com menor exposição ecológica " +
        "e menor uso desnecessário de antibacterianos " +
        "de amplo espectro.",

      focus:
        "Direcionar o tratamento ao agente identificado " +
        "e reduzir exposição desnecessária.",

      risk:
        "Manter ampliação empírica inicial " +
        "indefinidamente, mesmo diante de dados que " +
        "permitem estreitamento."
    }
  };

  const tabs = Array.from(
    page.querySelectorAll(".cap8-p73-tab")
  );

  const segments = Array.from(
    page.querySelectorAll(
      ".cap8-p73-stage__segment"
    )
  );

  const timeline = page.querySelector(
    ".cap8-p73-timeline"
  );

  const panel = page.querySelector(
    "[data-p73-panel]"
  );

  const kicker = page.querySelector(
    "[data-p73-kicker]"
  );

  const title = page.querySelector(
    "[data-p73-title]"
  );

  const text = page.querySelector(
    "[data-p73-text]"
  );

  const focus = page.querySelector(
    "[data-p73-focus]"
  );

  const risk = page.querySelector(
    "[data-p73-risk]"
  );

  if (
    !tabs.length ||
    !timeline ||
    !panel ||
    !kicker ||
    !title ||
    !text ||
    !focus ||
    !risk
  ) {
    return;
  }

  const phaseOrder = [
    "hora-zero",
    "24-48h",
    "72h"
  ];

  function synchronizeTimeline(activeKey) {
    const activeIndex =
      phaseOrder.indexOf(activeKey);

    tabs.forEach((tab) => {
      const isActive =
        tab.dataset.phase === activeKey;

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

    segments.forEach((segment) => {
      const segmentIndex =
        phaseOrder.indexOf(
          segment.dataset.segment
        );

      const isActive =
        segmentIndex === activeIndex;

      const isComplete =
        segmentIndex < activeIndex;

      segment.classList.toggle(
        "is-active",
        isActive
      );

      segment.classList.toggle(
        "is-complete",
        isComplete
      );
    });

    timeline.dataset.activePhase = activeKey;
  }

  function renderPhase(
    phaseKey,
    animate = true
  ) {
    const entry = phaseData[phaseKey];

    if (!entry) return;

    kicker.textContent = entry.kicker;
    title.textContent = entry.title;
    text.textContent = entry.text;
    focus.textContent = entry.focus;
    risk.textContent = entry.risk;

    synchronizeTimeline(phaseKey);

    panel.setAttribute(
      "aria-labelledby",
      `p73-tab-${phaseKey}`
    );

    if (animate) {
      panel.classList.remove("is-updating");

      void panel.offsetWidth;

      panel.classList.add("is-updating");
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      renderPhase(tab.dataset.phase);
    });

    tab.addEventListener(
      "keydown",
      (event) => {
        const navigationKeys = [
          "ArrowRight",
          "ArrowLeft",
          "Home",
          "End"
        ];

        if (
          !navigationKeys.includes(event.key)
        ) {
          return;
        }

        event.preventDefault();

        let nextIndex = index;

        if (event.key === "ArrowRight") {
          nextIndex =
            (index + 1) % tabs.length;
        }

        if (event.key === "ArrowLeft") {
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

        tabs[nextIndex].focus();

        renderPhase(
          tabs[nextIndex].dataset.phase
        );
      }
    );
  });

  renderPhase("hora-zero", false);
})();

(function initCap8Page74() {
  const page = document.querySelector(".cap8-page74");

  if (!page) return;

  const caseData = {
    "nao-purulenta": {
      kicker: "Celulite não purulenta",

      title:
        "Sem gravidade e sem purulência, o alvo " +
        "inicial costuma ser mais estreito",

      text:
        "Na ausência de secreção purulenta, abscesso " +
        "e sinais sistêmicos relevantes, a hipótese " +
        "de infecção superficial não purulenta orienta " +
        "cobertura dirigida principalmente a " +
        "estreptococos, sem justificativa rotineira " +
        "para ampliação desnecessária do espectro.",

      focus:
        "Direcionar o tratamento ao perfil mais " +
        "provável e evitar amplo espectro desnecessário.",

      risk:
        "Automatizar cobertura ampliada para " +
        "Gram-negativos e anaeróbios em infecções " +
        "superficiais não complicadas."
    },

    purulenta: {
      kicker: "Abscesso purulento",

      title:
        "Quando há purulência, drenagem reorganiza " +
        "a prioridade terapêutica",

      text:
        "A presença de coleção purulenta ou abscesso " +
        "aumenta a probabilidade de participação " +
        "estafilocócica e recoloca a drenagem como " +
        "elemento central da conduta. Em quadros " +
        "selecionados, sem sinais sistêmicos de " +
        "infecção, a intervenção local pode ser " +
        "suficiente sem necessidade obrigatória de " +
        "antibioticoterapia sistêmica.",

      focus:
        "Reconhecer o papel central da drenagem e " +
        "ajustar a necessidade real de antibioticoterapia.",

      risk:
        "Reduzir todo quadro purulento a antibacteriano " +
        "sistêmico, negligenciando a abordagem local " +
        "do foco."
    },

    grave: {
      kicker: "Necrose / gravidade",

      title:
        "Rápida progressão, necrose ou instabilidade " +
        "mudam imediatamente a escala da resposta",

      text:
        "Em apresentações com necrose tecidual, " +
        "progressão rápida, instabilidade hemodinâmica " +
        "ou comprometimento sistêmico importante, a " +
        "probabilidade de infecção invasiva ou " +
        "polimicrobiana aumenta. Nessa situação, a " +
        "conduta passa a exigir abordagem terapêutica " +
        "mais abrangente e, frequentemente, intervenção " +
        "cirúrgica imediata.",

      focus:
        "Reconhecer gravidade precocemente e integrar " +
        "antibacteriano amplo com avaliação cirúrgica " +
        "urgente.",

      risk:
        "Tratar quadros potencialmente necrosantes " +
        "como celulites simples e retardar intervenção " +
        "decisiva."
    }
  };

  const tabs = Array.from(
    page.querySelectorAll(".cap8-p74-tab")
  );

  const clinic = page.querySelector(
    ".cap8-p74-clinic"
  );

  const panel = page.querySelector(
    "[data-p74-panel]"
  );

  const kicker = page.querySelector(
    "[data-p74-kicker]"
  );

  const title = page.querySelector(
    "[data-p74-title]"
  );

  const text = page.querySelector(
    "[data-p74-text]"
  );

  const focus = page.querySelector(
    "[data-p74-focus]"
  );

  const risk = page.querySelector(
    "[data-p74-risk]"
  );

  if (
    !tabs.length ||
    !clinic ||
    !panel ||
    !kicker ||
    !title ||
    !text ||
    !focus ||
    !risk
  ) {
    return;
  }

  function synchronizeTabs(activeKey) {
    tabs.forEach((tab) => {
      const isActive =
        tab.dataset.case === activeKey;

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

    clinic.dataset.activeCase = activeKey;
  }

  function renderCase(
    caseKey,
    animate = true
  ) {
    const entry = caseData[caseKey];

    if (!entry) return;

    kicker.textContent = entry.kicker;
    title.textContent = entry.title;
    text.textContent = entry.text;
    focus.textContent = entry.focus;
    risk.textContent = entry.risk;

    synchronizeTabs(caseKey);

    panel.setAttribute(
      "aria-labelledby",
      `p74-tab-${caseKey}`
    );

    if (animate) {
      panel.classList.remove("is-updating");

      void panel.offsetWidth;

      panel.classList.add("is-updating");
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
      renderCase(tab.dataset.case);
    });

    tab.addEventListener(
      "keydown",
      (event) => {
        const navigationKeys = [
          "ArrowRight",
          "ArrowLeft",
          "Home",
          "End"
        ];

        if (
          !navigationKeys.includes(event.key)
        ) {
          return;
        }

        event.preventDefault();

        let nextIndex = index;

        if (event.key === "ArrowRight") {
          nextIndex =
            (index + 1) % tabs.length;
        }

        if (event.key === "ArrowLeft") {
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

        tabs[nextIndex].focus();

        renderCase(
          tabs[nextIndex].dataset.case
        );
      }
    );
  });

  renderCase("nao-purulenta", false);
})();


/* =========================
   PÁGINA 75 — QUIZ DE REVISÃO
   Padrão interativo da página 10
   ========================= */

(function initCap8Page75ClinicalSynthesis() {
  const root = document.querySelector("[data-cap8-p75]");

  if (!root) return;

  const questions = Array.from(
    root.querySelectorAll(".cap8-p75Question")
  );

  const statusValue = root.querySelector(
    ".cap8-p75Status__value"
  );

  const completion = root.querySelector(
    "[data-p75-completion]"
  );

  const completionText = root.querySelector(
    "[data-p75-completion-text]"
  );

  if (!questions.length) return;

  const completionMap = {
    perfect:
      "Você articulou os dois eixos centrais desta síntese: achados isolados não substituem a avaliação clínica, e a presença de um foco anatômico passível de intervenção pode ser determinante para o sucesso terapêutico.",

    partial:
      "A leitura clínica está se consolidando, mas ainda exige atenção a dois pontos: a etiologia não deve ser definida por um dado laboratorial isolado, e a antibioticoterapia não substitui o controle de um foco infeccioso drenável.",

    needsReview:
      "Vale revisar o encadeamento clínico do capítulo: primeiro, estimar a probabilidade de infecção bacteriana; depois, identificar o foco provável; por fim, integrar cobertura antimicrobiana e necessidade de intervenção sobre o foco."
  };

  function updateStatus() {
    const confirmedCount = questions.filter(
      (question) =>
        question.dataset.questionState === "confirmed"
    ).length;

    if (statusValue) {
      statusValue.textContent =
        `${confirmedCount} de ${questions.length} situações confirmadas`;
    }

    if (!completion || !completionText) return;

    if (confirmedCount !== questions.length) {
      completion.hidden = true;
      return;
    }

    const correctCount = questions.filter(
      (question) =>
        question.dataset.result === "correct"
    ).length;

    if (correctCount === questions.length) {
      completionText.textContent = completionMap.perfect;
    } else if (correctCount >= 1) {
      completionText.textContent = completionMap.partial;
    } else {
      completionText.textContent = completionMap.needsReview;
    }

    completion.hidden = false;
  }

  questions.forEach((question) => {
    const optionButtons = Array.from(
      question.querySelectorAll(
        ".cap8-p75Options button"
      )
    );

    const confirmButton = question.querySelector(
      '[data-p75-action="confirm"]'
    );

    const resetButton = question.querySelector(
      '[data-p75-action="reset"]'
    );

    const feedbackBox = question.querySelector(
      ".cap8-p75Feedback"
    );

    const feedbackTemplate = question.querySelector(
      ".cap8-p75FeedbackMap"
    );

    if (
      !confirmButton ||
      !resetButton ||
      !feedbackBox ||
      !feedbackTemplate
    ) {
      return;
    }

    let selectedAnswer = null;
    let confirmed = false;
    let feedbackMap = {};

    try {
      feedbackMap = JSON.parse(
        feedbackTemplate.innerHTML.trim()
      );
    } catch (error) {
      console.error(
        "Erro ao ler o feedback do quiz da página 75:",
        error
      );

      return;
    }

    function resetQuestion() {
      confirmed = false;
      selectedAnswer = null;

      question.dataset.questionState = "pending";
      question.dataset.result = "";

      optionButtons.forEach((button) => {
        button.disabled = false;

        button.classList.remove(
          "selected",
          "correct",
          "error"
        );

        button.setAttribute(
          "aria-pressed",
          "false"
        );
      });

      feedbackBox.innerHTML = "";
      feedbackBox.className = "cap8-p75Feedback";

      confirmButton.hidden = false;
      confirmButton.disabled = true;
      resetButton.hidden = true;

      updateStatus();
    }

    optionButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        "false"
      );

      button.addEventListener("click", () => {
        if (confirmed) return;

        optionButtons.forEach((item) => {
          item.classList.remove("selected");

          item.setAttribute(
            "aria-pressed",
            "false"
          );
        });

        button.classList.add("selected");

        button.setAttribute(
          "aria-pressed",
          "true"
        );

        selectedAnswer =
          button.dataset.answer || null;

        confirmButton.disabled =
          !selectedAnswer;
      });
    });

    confirmButton.addEventListener("click", () => {
      if (!selectedAnswer || confirmed) return;

      confirmed = true;

      const chosenButton = question.querySelector(
        `.cap8-p75Options button[data-answer="${selectedAnswer}"]`
      );

      const correctButton = question.querySelector(
        '.cap8-p75Options button[data-correct="true"]'
      );

      const feedbackItem =
        feedbackMap[selectedAnswer];

      const isCorrect = Boolean(
        chosenButton &&
        chosenButton.dataset.correct === "true"
      );

      question.dataset.questionState =
        "confirmed";

      question.dataset.result =
        isCorrect ? "correct" : "error";

      optionButtons.forEach((button) => {
        button.disabled = true;
      });

      if (chosenButton) {
        if (isCorrect) {
          chosenButton.classList.add("correct");

          feedbackBox.className =
            "cap8-p75Feedback correct";
        } else {
          chosenButton.classList.add("error");

          if (correctButton) {
            correctButton.classList.add("correct");
          }

          feedbackBox.className =
            "cap8-p75Feedback error";
        }
      }

      if (feedbackItem) {
        feedbackBox.innerHTML = `
          <p>
            <strong>${feedbackItem.title}</strong>
          </p>

          <p>${feedbackItem.text}</p>
        `;
      }

      confirmButton.hidden = true;
      resetButton.hidden = false;

      updateStatus();
    });

    resetButton.addEventListener(
      "click",
      resetQuestion
    );

    resetQuestion();
  });

  updateStatus();
})();