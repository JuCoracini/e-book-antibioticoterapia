/* =========================
   CAPÍTULO 7 — PÁGINA 62
   EFEITOS ADVERSOS DOS ANTIBACTERIANOS
   ========================= */

(function initCap7Page62(){
  "use strict";

  const root = document.querySelector(".cap7-page62");
  if(!root) return;

  const revealItems = Array.from(
    root.querySelectorAll(".cap7-p62-reveal")
  );

  if(!revealItems.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(reducedMotion || !("IntersectionObserver" in window)){
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
      threshold:0.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 7 — PÁGINA 63
   INIBIDORES DA SÍNTESE DA PAREDE CELULAR
   ========================= */

(function initCap7Page63(){
  "use strict";

  const root = document.querySelector(".cap7-page63");
  if(!root) return;

  const revealItems = Array.from(
    root.querySelectorAll(".cap7-p63-reveal")
  );

  if(!revealItems.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(reducedMotion || !("IntersectionObserver" in window)){
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
      threshold:0.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 7 — PÁGINA 64
   INIBIDORES DA SÍNTESE PROTEICA
   ========================= */

(function initCap7Page64(){
  "use strict";

  const page = document.querySelector(".cap7-page64");
  if(!page) return;

  const root = page.querySelector("[data-cap7-p64]");
  const tabs = root
    ? Array.from(root.querySelectorAll(".cap7-p64-tab"))
    : [];

  const panels = root
    ? Array.from(root.querySelectorAll(".cap7-p64-panel"))
    : [];

  function activateStep(key, moveFocus){
    tabs.forEach(function(tab){
      const isActive = tab.dataset.p64Step === key;

      tab.classList.toggle("is-active", isActive);
      tab.setAttribute(
        "aria-selected",
        isActive ? "true" : "false"
      );

      tab.tabIndex = isActive ? 0 : -1;

      if(isActive && moveFocus){
        tab.focus();
      }
    });

    panels.forEach(function(panel){
      panel.hidden = panel.dataset.p64Panel !== key;
    });
  }

  if(tabs.length && panels.length){
    tabs.forEach(function(tab, index){
      tab.addEventListener("click", function(){
        activateStep(tab.dataset.p64Step, false);
      });

      tab.addEventListener("keydown", function(event){
        let nextIndex = index;

        if(
          event.key === "ArrowRight" ||
          event.key === "ArrowDown"
        ){
          event.preventDefault();
          nextIndex = (index + 1) % tabs.length;
        }

        if(
          event.key === "ArrowLeft" ||
          event.key === "ArrowUp"
        ){
          event.preventDefault();
          nextIndex = (index - 1 + tabs.length) % tabs.length;
        }

        if(event.key === "Home"){
          event.preventDefault();
          nextIndex = 0;
        }

        if(event.key === "End"){
          event.preventDefault();
          nextIndex = tabs.length - 1;
        }

        if(nextIndex !== index){
          activateStep(
            tabs[nextIndex].dataset.p64Step,
            true
          );
        }
      });
    });

    const initialTab = tabs.find(function(tab){
      return tab.classList.contains("is-active");
    });

    activateStep(
      initialTab
        ? initialTab.dataset.p64Step
        : tabs[0].dataset.p64Step,
      false
    );
  }

  const revealItems = Array.from(
    page.querySelectorAll(".cap7-p64-reveal")
  );

  if(!revealItems.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(
    reducedMotion ||
    !("IntersectionObserver" in window)
  ){
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
      threshold:0.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   CAPÍTULO 7 — PÁGINA 65
   INIBIDORES DA SÍNTESE DE ÁCIDOS NUCLEICOS
   ========================= */

(function initCap7Page65(){
  "use strict";

  const page = document.querySelector(".cap7-page65");
  if(!page) return;

  const interaction = page.querySelector("[data-cap7-p65-risk]");

  const patientButtons = interaction
    ? Array.from(
        interaction.querySelectorAll(".cap7-p65-patient")
      )
    : [];

  const eyebrow = page.querySelector("#cap7-p65-eyebrow");
  const title = page.querySelector("#cap7-p65-title");
  const text = page.querySelector("#cap7-p65-text");

  const profiles = {
    baixo:{
      eyebrow:"Menor vulnerabilidade aparente",
      title:"Risco clínico menos evidente",
      text:
        "A ausência de fatores predisponentes não elimina a possibilidade de eventos adversos, mas reduz a presença de vulnerabilidades clínicas reconhecíveis no momento da avaliação."
    },

    tendao:{
      eyebrow:"Maior atenção para o tecido conjuntivo",
      title:"Tendinopatia e ruptura de tendão",
      text:
        "Idade avançada, uso concomitante de corticosteroide e história prévia de tendinopatia aumentam a vulnerabilidade do tendão. A dor súbita deve ser interpretada como possível manifestação musculoesquelética associada à exposição."
    },

    qt:{
      eyebrow:"Maior atenção para a repolarização cardíaca",
      title:"Prolongamento do intervalo QT",
      text:
        "A combinação entre cardiopatia, hipocalemia e uso de amiodarona cria um contexto de maior suscetibilidade à alteração da repolarização ventricular e ao desenvolvimento de arritmias."
    },

    neuro:{
      eyebrow:"Maior atenção para o sistema nervoso",
      title:"Neuropatia e maior exposição sistêmica",
      text:
        "Neuropatia periférica prévia e depuração renal reduzida podem aumentar a vulnerabilidade neurológica e a exposição ao medicamento, exigindo interpretação cuidadosa de novas manifestações sensitivas ou motoras."
    }
  };

  function activateProfile(key){
    const selectedProfile = profiles[key];
    if(!selectedProfile) return;

    patientButtons.forEach(function(button){
      const isActive =
        button.dataset.p65Patient === key;

      button.classList.toggle(
        "is-active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        isActive ? "true" : "false"
      );
    });

    if(eyebrow){
      eyebrow.textContent =
        selectedProfile.eyebrow;
    }

    if(title){
      title.textContent =
        selectedProfile.title;
    }

    if(text){
      text.textContent =
        selectedProfile.text;
    }
  }

  patientButtons.forEach(function(button){
    button.addEventListener("click", function(){
      activateProfile(
        button.dataset.p65Patient
      );
    });
  });

  if(patientButtons.length){
    const initialButton = patientButtons.find(
      function(button){
        return button.classList.contains(
          "is-active"
        );
      }
    );

    activateProfile(
      initialButton
        ? initialButton.dataset.p65Patient
        : patientButtons[0].dataset.p65Patient
    );
  }

  const revealItems = Array.from(
    page.querySelectorAll(
      ".cap7-p65-reveal"
    )
  );

  if(!revealItems.length) return;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if(
    reducedMotion ||
    !("IntersectionObserver" in window)
  ){
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

        observer.unobserve(
          entry.target
        );
      });
    },
    {
      threshold:0.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 68 — QUIZ DE REVISÃO
   ========================= */

(function initCap7Page68(){
  const root = document.querySelector("[data-cap7-p68]");

  if(!root){
    return;
  }

  const questions = Array.from(
    root.querySelectorAll(".cap7-p68Question")
  );

  const statusValue = root.querySelector(
    ".cap7-p68Status__value"
  );

  const completion = root.querySelector(
    "[data-p68-completion]"
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
      ".cap7-p68FeedbackMap"
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
        "Não foi possível interpretar o conteúdo de feedback da página 68.",
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
        ".cap7-p68Options button"
      )
    );

    const confirmButton = question.querySelector(
      '[data-p68-action="confirm"]'
    );

    const resetButton = question.querySelector(
      '[data-p68-action="reset"]'
    );

    const feedback = question.querySelector(
      ".cap7-p68Feedback"
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
            "cap7-p68Feedback is-visible " +
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
            "cap7-p68Feedback";

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