/* =========================
   PÁGINA 54 — POR QUE ASSOCIAR ANTIBACTERIANOS?
   ========================= */

(function initCap6Page54(){

  const root =
    document.querySelector(".cap6-page54");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p54]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p54-answer]")
  );

  const feedback =
    interaction.querySelector("[data-p54-feedback]");

  if(!answers.length || !feedback) return;

  const content = {

    quantidade:{
      correct:false,

      title:
        "Mais antibacterianos não significam maior eficácia.",

      text:
        "A combinação não deve ser mantida apenas porque contém dois agentes. Sem um objetivo microbiológico ou clínico definido, a associação pode aumentar toxicidade, pressão seletiva e alterações da microbiota sem oferecer benefício proporcional."
    },

    objetivo:{
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "A associação deve responder a uma finalidade específica: ampliar a cobertura empírica, obter sinergismo comprovado, reduzir a seleção de resistência em situações bem estabelecidas ou tratar uma infecção polimicrobiana."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p54Answer;

      const selected =
        content[key];

      if(!selected) return;

      answers.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p54-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p54-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

      function(entries){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

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
   PÁGINA 55 — INTERAÇÃO ENTRE ANTIBACTERIANOS
   ========================= */

(function initCap6Page55(){

  const root =
    document.querySelector(".cap6-page55");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p55]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p55-answer]")
  );

  const feedback =
    interaction.querySelector("[data-p55-feedback]");

  if(!answers.length || !feedback) return;

  const content = {

    suficiente:{
      correct:false,

      title:
        "O resultado laboratorial não define sozinho a indicação.",

      text:
        "O sinergismo descreve uma interação observada em condições experimentais, mas não comprova automaticamente benefício clínico. A associação deve possuir indicação específica, sustentada por evidências e pelo contexto da infecção."
    },

    contexto:{
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "Os resultados de estudos in vitro ajudam a compreender o comportamento da combinação, mas devem ser integrados às evidências clínicas. A indicação depende do microrganismo, do foco infeccioso e do objetivo terapêutico."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p55Answer;

      const selected =
        content[key];

      if(!selected) return;

      answers.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p55-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p55-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

      function(entries){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

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
   PÁGINA 56 — ASSOCIAÇÃO PARA AMPLIAR A COBERTURA
   ========================= */

(function initCap6Page56(){

  const root =
    document.querySelector(".cap6-page56");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p56]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p56-answer]")
  );

  if(!answers.length) return;

  const content = {

    "complementar-sinergismo":{
      caseName:"complementar",
      correct:false,

      title:
        "O objetivo principal não é o sinergismo.",

      text:
        "Nesse contexto, a associação é empírica e busca cobrir grupos diferentes de microrganismos enquanto o agente etiológico permanece desconhecido. A demonstração de sinergismo não é a justificativa central."
    },

    "complementar-cobertura":{
      caseName:"complementar",
      correct:true,

      title:
        "Interpretação adequada: cobertura complementar.",

      text:
        "O cefepime amplia a cobertura contra bacilos Gram-negativos, incluindo Pseudomonas aeruginosa, enquanto a vancomicina cobre cocos Gram-positivos resistentes, incluindo MRSA. A combinação aumenta a probabilidade de atividade inicial contra o agente responsável."
    },

    "duplicacao-sim":{
      caseName:"duplicacao",
      correct:false,

      title:
        "Dois antibacterianos não significam dois espectros diferentes.",

      text:
        "Piperacilina-tazobactam e meropenem apresentam ampla sobreposição de atividade contra Gram-negativos, incluindo Pseudomonas aeruginosa, e anaeróbios. A presença de dois agentes não garante ampliação relevante da cobertura."
    },

    "duplicacao-nao":{
      caseName:"duplicacao",
      correct:true,

      title:
        "Interpretação adequada: duplicação de espectro.",

      text:
        "Quando os dois agentes cobrem vários dos mesmos grupos bacterianos, o ganho de cobertura pode ser pequeno. Na ausência de indicação específica, a associação pode aumentar toxicidade, custos e pressão seletiva sem benefício proporcional."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p56Answer;

      const selected =
        content[key];

      if(!selected) return;

      const currentCase =
        interaction.querySelector(
          `[data-p56-case="${selected.caseName}"]`
        );

      if(!currentCase) return;

      const caseButtons = Array.from(
        currentCase.querySelectorAll(
          "[data-p56-answer]"
        )
      );

      const feedback =
        currentCase.querySelector(
          `[data-p56-feedback="${selected.caseName}"]`
        );

      if(!feedback) return;

      caseButtons.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p56-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p56-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

      function(entries){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

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
   PÁGINA 57 — TRATAMENTO EMPÍRICO E DESCALONAMENTO
   ========================= */

(function initCap6Page57(){

  const root =
    document.querySelector(".cap6-page57");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p57]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p57-answer]")
  );

  const feedback =
    interaction.querySelector("[data-p57-feedback]");

  if(!answers.length || !feedback) return;

  const content = {

    manter:{
      correct:false,

      title:
        "A cobertura empírica deve ser reavaliada.",

      text:
        "A associação foi utilizada enquanto o agente etiológico era desconhecido. Após a identificação de um único microrganismo suscetível ao cefepime, a vancomicina perde sua justificativa microbiológica. Manter ambos aumenta a exposição sem benefício proporcional."
    },

    descalonar:{
      correct:true,

      title:
        "Interpretação adequada: descalonamento.",

      text:
        "Quando o agente etiológico e seu perfil de suscetibilidade são conhecidos, o esquema deve ser direcionado. O descalonamento consiste em retirar componentes desnecessários e manter o antibacteriano de menor espectro que permaneça eficaz."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p57Answer;

      const selected =
        content[key];

      if(!selected) return;

      answers.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p57-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p57-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

      function(entries){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

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
   PÁGINA 58 — ASSOCIAÇÃO PARA PREVENIR RESISTÊNCIA
   ========================= */

(function initCap6Page58(){

  const root =
    document.querySelector(".cap6-page58");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p58]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p58-case-answer]")
  );

  if(!answers.length) return;

  const content = {

    "tuberculose-sim":{
      caseName:"tuberculose",
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "Na tuberculose, diferentes fármacos são utilizados simultaneamente para reduzir a probabilidade de seleção de mutantes naturalmente resistentes durante o tratamento."
    },

    "tuberculose-nao":{
      caseName:"tuberculose",
      correct:false,

      title:
        "Reavalie a finalidade da associação.",

      text:
        "A tuberculose constitui o exemplo clássico em que a prevenção da seleção de resistência é um objetivo direto da terapia combinada."
    },

    "itu-sim":{
      caseName:"itu",
      correct:false,

      title:
        "A associação não reduz resistência automaticamente.",

      text:
        "Quando existe um único microrganismo suscetível e um antibacteriano apropriado, acrescentar outro agente geralmente amplia exposição, toxicidade e pressão seletiva sem benefício microbiológico proporcional."
    },

    "itu-nao":{
      caseName:"itu",
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "Nas infecções bacterianas comuns, a monoterapia costuma ser suficiente quando existe um agente ativo. A prevenção da resistência depende principalmente de escolha, dose, duração e controle do foco adequados."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p58CaseAnswer;

      const selected =
        content[key];

      if(!selected) return;

      const currentCase =
        interaction.querySelector(
          `[data-p58-case="${selected.caseName}"]`
        );

      if(!currentCase) return;

      const caseButtons = Array.from(
        currentCase.querySelectorAll(
          "[data-p58-case-answer]"
        )
      );

      const feedback =
        currentCase.querySelector(
          `[data-p58-feedback="${selected.caseName}"]`
        );

      if(!feedback) return;

      caseButtons.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p58-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p58-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

      function(entries){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

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
   PÁGINA 59 — QUANDO A ASSOCIAÇÃO NÃO CORRIGE O PROBLEMA
   ========================= */

(function initCap6Page59(){

  const root =
    document.querySelector(".cap6-page59");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p59]");

  if(!interaction) return;

  const answers = Array.from(
    interaction.querySelectorAll("[data-p59-answer]")
  );

  const feedback =
    interaction.querySelector("[data-p59-feedback]");

  if(!answers.length || !feedback) return;

  const content = {

    ampliar:{
      correct:false,

      title:
        "A ampliação da cobertura não é a primeira explicação.",

      text:
        "O microrganismo já demonstra suscetibilidade ao antibacteriano utilizado. Antes de interpretar a ausência de resposta como necessidade de outro agente, devem ser considerados a exposição farmacológica e o controle do foco infeccioso."
    },

    reavaliar:{
      correct:true,

      title:
        "Interpretação adequada.",

      text:
        "A suscetibilidade no antibiograma é apenas um dos determinantes da resposta. Dose, intervalo, via, penetração no sítio infeccioso e controle do foco também influenciam o sucesso terapêutico. A associação não corrige essas falhas."
    }

  };

  answers.forEach(function(button){

    button.addEventListener("click", function(){

      const key =
        button.dataset.p59Answer;

      const selected =
        content[key];

      if(!selected) return;

      answers.forEach(function(item){

        item.classList.remove(
          "is-correct",
          "is-wrong"
        );

      });

      button.classList.add(
        selected.correct
          ? "is-correct"
          : "is-wrong"
      );

      feedback.className =
        "cap6-p59-case__feedback " +
        (
          selected.correct
            ? "is-correct"
            : "is-wrong"
        );

      feedback.innerHTML = `
        <strong>${selected.title}</strong>
        <p>${selected.text}</p>
      `;

    });

  });

  const revealItems =
    root.querySelectorAll(".cap6-p59-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

      function(entries){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

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
   PÁGINA 60 — CONSEQUÊNCIAS DO USO INDISCRIMINADO
   ========================= */

(function initCap6Page60(){

  const root =
    document.querySelector(".cap6-page60");

  if(!root) return;

  const interaction =
    root.querySelector("[data-cap6-p60]");

  if(!interaction) return;

  const revealButton =
    interaction.querySelector("[data-p60-reveal]");

  const consequences =
    interaction.querySelector("[data-p60-consequences]");

  if(!revealButton || !consequences) return;

  function setExpanded(expanded){

    revealButton.setAttribute(
      "aria-expanded",
      expanded ? "true" : "false"
    );

    consequences.hidden = !expanded;

    revealButton.textContent =
      expanded
        ? "Ocultar consequências"
        : "Mostrar consequências";

    if(expanded){

      consequences
        .querySelectorAll(".cap6-p60-consequence")
        .forEach(function(item, index){

          item.style.opacity = "0";
          item.style.transform = "translateY(8px)";

          window.setTimeout(function(){

            item.style.transition =
              "opacity .32s ease, transform .32s ease";

            item.style.opacity = "1";
            item.style.transform = "translateY(0)";

          }, index * 85);

        });

    }

  }

  revealButton.addEventListener(
    "click",
    function(){

      const expanded =
        revealButton.getAttribute(
          "aria-expanded"
        ) === "true";

      setExpanded(!expanded);

    }
  );

  setExpanded(false);

  const revealItems =
    root.querySelectorAll(".cap6-p60-reveal");

  if(!("IntersectionObserver" in window)){

    revealItems.forEach(function(item){

      item.classList.add("is-visible");

    });

    return;

  }

  const observer =
    new IntersectionObserver(

      function(entries){

        entries.forEach(function(entry){

          if(!entry.isIntersecting) return;

          entry.target.classList.add(
            "is-visible"
          );

          observer.unobserve(
            entry.target
          );

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
   PÁGINA 61 — QUIZ DE REVISÃO
   ========================= */

(function initCap6Page61(){
  const root = document.querySelector("[data-cap6-p61]");

  if(!root){
    return;
  }

  const questions = Array.from(
    root.querySelectorAll(".cap6-p61Question")
  );

  const statusValue = root.querySelector(
    ".cap6-p61Status__value"
  );

  const completion = root.querySelector(
    "[data-p61-completion]"
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
      ".cap6-p61FeedbackMap"
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
        "Não foi possível interpretar o conteúdo de feedback da página 61.",
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
        ".cap6-p61Options button"
      )
    );

    const confirmButton = question.querySelector(
      '[data-p61-action="confirm"]'
    );

    const resetButton = question.querySelector(
      '[data-p61-action="reset"]'
    );

    const feedback = question.querySelector(
      ".cap6-p61Feedback"
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
            "cap6-p61Feedback is-visible " +
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
            "cap6-p61Feedback";

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