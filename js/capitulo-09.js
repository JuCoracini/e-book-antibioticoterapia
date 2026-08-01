(function () {
  "use strict";

  function initCap9Page76Activity() {
    const root = document.querySelector("[data-cap9-p76-activity]");
    if (!root) return;

    const buttons = Array.from(root.querySelectorAll("[data-p76-answer]"));
    const feedback = root.querySelector(".cap9-p76-feedback");

    const feedbacks = {
      a: {
        type: "error",
        title: "❌ Incorreta.",
        text: "A prescrição de antibacterianos deve ser baseada em critérios clínicos e evidências científicas, não apenas na expectativa do paciente. O uso desnecessário expõe o indivíduo a riscos e contribui para o uso inadequado desses medicamentos."
      },
      b: {
        type: "correct",
        title: "✅ Correta.",
        text: "Quando não há indicação de antibacteriano, a comunicação adequada é parte fundamental da conduta. Explicar os motivos da não prescrição, orientar medidas de suporte e esclarecer sinais de alerta fortalece a confiança do paciente e favorece o uso racional dos antimicrobianos."
      },
      c: {
        type: "error",
        title: "❌ Incorreta.",
        text: "Reduzir arbitrariamente a duração do tratamento não torna a prescrição mais segura. A indicação, a dose e a duração devem ser definidas de acordo com a condição clínica e as evidências disponíveis."
      }
    };

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const answer = button.dataset.p76Answer;
        const item = feedbacks[answer];
        if (!item || !feedback) return;

        buttons.forEach(function (option) {
          option.classList.remove("is-correct", "is-error");
        });

        button.classList.add(item.type === "correct" ? "is-correct" : "is-error");

        feedback.className = "cap9-p76-feedback is-visible";
        feedback.classList.add(item.type === "correct" ? "is-correct" : "is-error");

        feedback.innerHTML =
          "<strong>" + item.title + "</strong>" +
          "<span>" + item.text + "</span>";
      });
    });
  }

  function initCap9Page79Flow() {
    const root = document.querySelector(".cap9-page79 [data-cap9-flow]");
    if (!root) return;

    const steps = Array.from(root.querySelectorAll(".cap9-p79-step"));
    const panels = Array.from(root.querySelectorAll(".cap9-p79-panel"));
    const fill = root.querySelector("[data-cap9-flow-fill]");

    if (!steps.length || !panels.length) return;

    function activate(stepValue, moveFocus) {
      steps.forEach(function (step, index) {
        const isActive = step.dataset.step === stepValue;

        step.classList.toggle("is-active", isActive);
        step.setAttribute("aria-selected", isActive ? "true" : "false");
        step.setAttribute("tabindex", isActive ? "0" : "-1");

        if (isActive && moveFocus) {
          step.focus();
        }

        if (isActive && fill) {
          fill.style.width = (((index + 1) / steps.length) * 100) + "%";
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.panel !== stepValue;
      });
    }

    steps.forEach(function (step) {
      step.addEventListener("click", function () {
        activate(step.dataset.step, false);
      });

      step.addEventListener("keydown", function (event) {
        const currentIndex = steps.indexOf(step);
        let nextIndex = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % steps.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + steps.length) % steps.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = steps.length - 1;
        }

        if (nextIndex === null) return;

        event.preventDefault();
        activate(steps[nextIndex].dataset.step, true);
      });
    });

    const initialActive = root.querySelector(".cap9-p79-step.is-active");
    activate(initialActive ? initialActive.dataset.step : steps[0].dataset.step, false);
  }

  function initCap9Page80Decision() {
    const root = document.querySelector(".cap9-page80 [data-cap9-p80]");
    if (!root) return;

    const options = Array.from(root.querySelectorAll(".cap9-p80-option"));
    const panels = Array.from(root.querySelectorAll("[data-p80-panel]"));

    if (!options.length || !panels.length) return;

    function activate(key, moveFocus) {
      options.forEach(function (option) {
        const isActive = option.dataset.p80Case === key;

        option.classList.toggle("is-active", isActive);
        option.setAttribute("aria-selected", isActive ? "true" : "false");
        option.setAttribute("tabindex", isActive ? "0" : "-1");

        if (isActive && moveFocus) {
          option.focus();
        }
      });

      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.p80Panel !== key;
      });
    }

    options.forEach(function (option) {
      option.addEventListener("click", function () {
        activate(option.dataset.p80Case, false);
      });

      option.addEventListener("keydown", function (event) {
        const currentIndex = options.indexOf(option);
        let nextIndex = null;

        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % options.length;
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + options.length) % options.length;
        } else if (event.key === "Home") {
          nextIndex = 0;
        } else if (event.key === "End") {
          nextIndex = options.length - 1;
        }

        if (nextIndex === null) return;

        event.preventDefault();
        activate(options[nextIndex].dataset.p80Case, true);
      });
    });

    const initial = root.querySelector(".cap9-p80-option.is-active");
    activate(initial ? initial.dataset.p80Case : options[0].dataset.p80Case, false);
  }

  function initCap9Page81() {
    const root = document.querySelector("[data-cap9-p81]");
    if (!root) return;

    const statusValue = root.querySelector(".cap9-p81Status__value");
    const questions = Array.from(root.querySelectorAll(".cap9-p81Question"));
    const completion = root.querySelector("[data-p81-completion]");

    if (!questions.length) return;

    function parseFeedbackMap(article) {
      const template = article.querySelector(".cap9-p81FeedbackMap");
      if (!template) return {};

      try {
        return JSON.parse(template.textContent.trim());
      } catch (error) {
        console.error("Erro ao ler feedback do quiz da página 81:", error);
        return {};
      }
    }

    function updateStatus() {
      const confirmedCount = questions.filter(function (question) {
        return question.getAttribute("data-question-state") === "confirmed";
      }).length;

      if (statusValue) {
        statusValue.textContent =
          confirmedCount + " de " + questions.length + " situações confirmadas";
      }

      if (completion) {
        completion.hidden = confirmedCount !== questions.length;
      }
    }

    function clearFeedback(feedback) {
      if (!feedback) return;
      feedback.className = "cap9-p81Feedback";
      feedback.innerHTML = "";
    }

    questions.forEach(function (article) {
      const options = Array.from(article.querySelectorAll(".cap9-p81Options button"));
      const confirmButton = article.querySelector('[data-p81-action="confirm"]');
      const resetButton = article.querySelector('[data-p81-action="reset"]');
      const feedback = article.querySelector(".cap9-p81Feedback");
      const feedbackMap = parseFeedbackMap(article);

      let selectedAnswer = null;

      function resetQuestion() {
        selectedAnswer = null;
        article.setAttribute("data-question-state", "pending");

        options.forEach(function (button) {
          button.disabled = false;
          button.classList.remove("is-selected", "is-correct", "is-error");
          button.setAttribute("aria-pressed", "false");
        });

        if (confirmButton) {
          confirmButton.disabled = true;
        }

        if (resetButton) {
          resetButton.hidden = true;
        }

        clearFeedback(feedback);
        updateStatus();
      }

      options.forEach(function (button) {
        button.addEventListener("click", function () {
          if (article.getAttribute("data-question-state") === "confirmed") return;

          selectedAnswer = button.getAttribute("data-answer");

          options.forEach(function (option) {
            option.classList.remove("is-selected");
            option.setAttribute("aria-pressed", "false");
          });

          button.classList.add("is-selected");
          button.setAttribute("aria-pressed", "true");

          if (confirmButton) {
            confirmButton.disabled = false;
          }
        });
      });

      if (confirmButton) {
        confirmButton.addEventListener("click", function () {
          if (!selectedAnswer) return;

          const selectedButton = options.find(function (button) {
            return button.getAttribute("data-answer") === selectedAnswer;
          });

          const entry = feedbackMap[selectedAnswer];
          if (!selectedButton || !entry || !feedback) return;

          article.setAttribute("data-question-state", "confirmed");

          options.forEach(function (button) {
            button.disabled = true;
            button.classList.remove("is-selected");
            button.setAttribute("aria-pressed", "false");
          });

          selectedButton.classList.add(entry.type === "correct" ? "is-correct" : "is-error");

          feedback.classList.add("is-visible");
          feedback.classList.add(entry.type === "correct" ? "is-correct" : "is-error");

          feedback.innerHTML =
            '<p class="cap9-p81Feedback__title">' + entry.title + '</p>' +
            '<p class="cap9-p81Feedback__text">' + entry.text + "</p>";

          confirmButton.disabled = true;

          if (resetButton) {
            resetButton.hidden = false;
          }

          updateStatus();
        });
      }

      if (resetButton) {
        resetButton.addEventListener("click", resetQuestion);
      }

      resetQuestion();
    });

    updateStatus();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initCap9Page76Activity();
      initCap9Page79Flow();
      initCap9Page80Decision();
      initCap9Page81();
    });
  } else {
    initCap9Page76Activity();
    initCap9Page79Flow();
    initCap9Page80Decision();
    initCap9Page81();
  }
})();