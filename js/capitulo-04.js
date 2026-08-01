/* =========================
   PÁGINA 30 — EXPOSIÇÃO AO ANTIBACTERIANO E SELEÇÃO DE RESISTÊNCIA
   ========================= */

(function initCap4Page30(){
  const root = document.querySelector(".cap4-page30");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap4-p30-guide__chip"));
  const eyebrow = root.querySelector("#cap4-p30-eyebrow");
  const title = root.querySelector("#cap4-p30-title");
  const text = root.querySelector("#cap4-p30-text");

  const content = {
    cim:{
      title:"Concentração inibitória mínima",
      html:`
        <p>
          A CIM representa a menor concentração capaz de inibir o crescimento bacteriano em condições laboratoriais padronizadas.
        </p>
      `
    },
    cpm:{
      title:"Concentração de prevenção de mutantes",
      html:`
        <p>
          A CPM representa a concentração acima da qual a sobrevivência de variantes com menor suscetibilidade relativa torna-se menos provável.
        </p>
      `
    },
    janela:{
      html:`
        <p>
          A janela de seleção mutante corresponde à faixa entre a CIM e a CPM. Nessa região, bactérias mais suscetíveis tendem a ser inibidas, enquanto variantes menos suscetíveis podem permanecer viáveis.
        </p>
      `
    },
    curva:{
      html:`
        <p>
          O risco de seleção depende do tempo em que a concentração do antibacteriano permanece dentro da janela de seleção mutante, e não apenas do pico alcançado após a administração.
        </p>
      `
    }
  };

  function activate(key){
    const selected = content[key];
    if(!selected) return;

    tabs.forEach(function(tab){
      const active = tab.dataset.p30Step === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = selected.eyebrow;
    title.textContent = selected.title;
    text.innerHTML = selected.html;
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener("click", function(){
      activate(tab.dataset.p30Step);
    });

    tab.addEventListener("keydown", function(event){
      let nextIndex = index;

      if(event.key === "ArrowRight" || event.key === "ArrowDown"){
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
      }

      if(event.key === "ArrowLeft" || event.key === "ArrowUp"){
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
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p30Step);
      }
    });
  });

  activate("cim");

  const revealItems = root.querySelectorAll(".cap4-p30-reveal");

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
      threshold:0.18,
      rootMargin:"0px 0px -40px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 31 — ÍNDICES FARMACODINÂMICOS
   ========================= */

(function initCap4Page31(){
  const root = document.querySelector(".cap4-page31");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll(".cap4-p31-guide__chip"));
  const eyebrow = root.querySelector("#cap4-p31-eyebrow");
  const title = root.querySelector("#cap4-p31-title");
  const text = root.querySelector("#cap4-p31-text");

  const content = {
    tempo:{
      eyebrow:"Tempo acima da CIM",
      title:"%fT>CIM",
      html:`
        <p>
          O efeito depende do tempo em que a concentração livre do antibacteriano permanece acima da CIM.
        </p>
        <p>
          <strong>Principal classe:</strong> β-lactâmicos.
        </p>
      `
    },
    pico:{
      eyebrow:"Pico de concentração",
      title:"Cmax/CIM",
      html:`
        <p>
          O efeito depende da magnitude da concentração máxima em relação à CIM.
        </p>
        <p>
          <strong>Principal classe:</strong> aminoglicosídeos.
        </p>
      `
    },
    auc:{
      eyebrow:"Exposição total",
      title:"AUC/CIM",
      html:`
        <p>
          O efeito depende da exposição total ao antibacteriano ao longo do tempo.
        </p>
        <p>
          <strong>Principais classes:</strong> fluoroquinolonas, glicopeptídeos e oxazolidinonas.
        </p>
      `
    }
  };

  function activate(key){
    const selected = content[key];
    if(!selected) return;

    tabs.forEach(function(tab){
      const active = tab.dataset.p31Index === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    eyebrow.textContent = selected.eyebrow;
    title.textContent = selected.title;
    text.innerHTML = selected.html;
  }

  tabs.forEach(function(tab, index){
    tab.addEventListener("click", function(){
      activate(tab.dataset.p31Index);
    });

    tab.addEventListener("keydown", function(event){
      let nextIndex = index;

      if(event.key === "ArrowRight" || event.key === "ArrowDown"){
        event.preventDefault();
        nextIndex = (index + 1) % tabs.length;
      }

      if(event.key === "ArrowLeft" || event.key === "ArrowUp"){
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
        tabs[nextIndex].focus();
        activate(tabs[nextIndex].dataset.p31Index);
      }
    });
  });

  activate("tempo");

  const revealItems = root.querySelectorAll(".cap4-p31-reveal");

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
      threshold:0.18,
      rootMargin:"0px 0px -40px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 32 — VIA DE ADMINISTRAÇÃO
   ========================= */

(function initCap4Page32(){
  const root = document.querySelector(".cap4-page32");
  if(!root) return;

  const data = {
    iv:{
      eyebrow:"Maior previsibilidade da exposição",
      title:"Via intravenosa",
      absorption:"Não há etapa de absorção.",
      bioavailability:"Completa.",
      exposure:"Mais previsível desde o início do tratamento.",
      limitation:"Exige acesso venoso e monitoramento compatível com o contexto clínico.",
      curve:"curve-iv"
    },
    oral:{
      eyebrow:"Maior dependência da absorção gastrointestinal",
      title:"Via oral",
      absorption:"Depende da absorção no trato gastrointestinal.",
      bioavailability:"Variável entre pacientes e contextos clínicos.",
      exposure:"Pode ser influenciada por alimentos, pH gástrico, motilidade intestinal, mucosa e interações medicamentosas.",
      limitation:"Pode ser inadequada quando há vômitos, má absorção, instabilidade clínica ou necessidade de exposição imediata.",
      curve:"curve-oral"
    },
    im:{
      eyebrow:"Absorção dependente da perfusão muscular",
      title:"Via intramuscular",
      absorption:"O fármaco precisa ser absorvido a partir do tecido muscular.",
      bioavailability:"Pode ser boa, mas depende do fármaco e da perfusão local.",
      exposure:"Geralmente mais lenta que a via intravenosa.",
      limitation:"Em hipoperfusão ou choque, a absorção pode tornar-se imprevisível.",
      curve:"curve-im"
    },
    sc:{
      eyebrow:"Absorção dependente do tecido subcutâneo",
      title:"Via subcutânea",
      absorption:"O fármaco precisa ser absorvido a partir do tecido subcutâneo.",
      bioavailability:"Variável conforme perfusão local e propriedades do fármaco.",
      exposure:"Tende a ser mais gradual, com menor velocidade de entrada sistêmica.",
      limitation:"Pode ser comprometida em situações de hipoperfusão periférica.",
      curve:"curve-sc"
    }
  };

  const tabs = Array.from(root.querySelectorAll("[data-p32-route]"));
  const curves = Array.from(root.querySelectorAll(".cap4-p32-miniChart .curve"));
  const eyebrow = root.querySelector("#cap4-p32-eyebrow");
  const title = root.querySelector("#cap4-p32-title");
  const absorption = root.querySelector("#cap4-p32-absorption");
  const bioavailability = root.querySelector("#cap4-p32-bioavailability");
  const exposure = root.querySelector("#cap4-p32-exposure");
  const limitation = root.querySelector("#cap4-p32-limitation");

  function activate(route){
    const selected = data[route];
    if(!selected) return;

    tabs.forEach(function(tab){
      const active = tab.dataset.p32Route === route;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.tabIndex = active ? 0 : -1;
    });

    curves.forEach(function(curve){
      curve.classList.toggle("is-active", curve.classList.contains(selected.curve));
    });

    eyebrow.textContent = selected.eyebrow;
    title.textContent = selected.title;
    absorption.textContent = selected.absorption;
    bioavailability.textContent = selected.bioavailability;
    exposure.textContent = selected.exposure;
    limitation.textContent = selected.limitation;
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      activate(tab.dataset.p32Route);
    });
  });

  activate("iv");

  const revealItems = root.querySelectorAll(".cap4-p32-reveal");

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
      threshold:0.18,
      rootMargin:"0px 0px -40px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 33 — VIA DE ADMINISTRAÇÃO E EXPOSIÇÃO
   ========================= */

(function initCap4Page33(){
  const root = document.querySelector(".cap4-page33");
  if(!root) return;

  const revealItems = root.querySelectorAll(".cap4-p33-reveal");

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
      threshold:0.18,
      rootMargin:"0px 0px -40px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 34 — VIA DE ADMINISTRAÇÃO E RESPOSTA TERAPÊUTICA
   ========================= */

(function initCap4Page34(){
  const root = document.querySelector(".cap4-page34");
  if(!root) return;

  const cases = [
    {
      title:"Absorção confiável e baixa gravidade clínica",
      subtitle:"Analise o contexto clínico e escolha a via que tende a oferecer exposição adequada.",
      features:[
        "Pneumonia adquirida na comunidade.",
        "Paciente estável, sem vômitos.",
        "Alimentação preservada.",
        "Antibacteriano com elevada biodisponibilidade oral."
      ],
      question:"Qual via tende a proporcionar exposição adequada?",
      options:[
        { key:"oral", label:"Via oral" },
        { key:"iv", label:"Via intravenosa" }
      ],
      correct:"oral",
      feedbackTitle:"Via oral.",
      feedback:"A absorção gastrointestinal é previsível e a biodisponibilidade é elevada, permitindo exposição sistêmica compatível com eficácia terapêutica."
    },
    {
      title:"Absorção imprevisível em paciente grave",
      subtitle:"Observe como a condição clínica modifica a previsibilidade da exposição.",
      features:[
        "Paciente com sepse.",
        "Hipotensão e uso de vasopressor.",
        "Íleo paralítico.",
        "Risco de absorção gastrointestinal reduzida."
      ],
      question:"Qual via proporciona exposição inicial mais previsível?",
      options:[
        { key:"oral", label:"Via oral" },
        { key:"iv", label:"Via intravenosa" }
      ],
      correct:"iv",
      feedbackTitle:"Via intravenosa.",
      feedback:"A absorção gastrointestinal torna-se imprevisível nesse contexto. A via intravenosa reduz a variabilidade inicial da exposição sistêmica."
    },
    {
      title:"Transição segura após estabilização clínica",
      subtitle:"Analise se a mudança de via preserva a exposição necessária.",
      features:[
        "Paciente internado em tratamento intravenoso há quatro dias.",
        "Afebril e com melhora clínica.",
        "Alimentando-se normalmente.",
        "Opção oral com boa biodisponibilidade."
      ],
      question:"É possível considerar transição para via oral?",
      options:[
        { key:"sim", label:"Sim" },
        { key:"nao", label:"Não" }
      ],
      correct:"sim",
      feedbackTitle:"Sim.",
      feedback:"Quando a estabilidade clínica é alcançada e a absorção gastrointestinal torna-se confiável, a transição para via oral pode preservar a exposição farmacocinética necessária."
    }
  ];

  let current = 0;

  const step = root.querySelector("#cap4-p34-step");
  const title = root.querySelector("#cap4-p34-title");
  const subtitle = root.querySelector("#cap4-p34-subtitle");
  const features = root.querySelector("#cap4-p34-features");
  const question = root.querySelector("#cap4-p34-question");
  const options = Array.from(root.querySelectorAll("[data-p34-answer]"));
  const feedback = root.querySelector("#cap4-p34-feedback");
  const prev = root.querySelector("#cap4-p34-prev");
  const next = root.querySelector("#cap4-p34-next");
  const dots = Array.from(root.querySelectorAll(".cap4-p34-dots span"));

  function renderCase(){
    const item = cases[current];

    step.textContent = "Situação " + (current + 1) + " de " + cases.length;
    title.textContent = item.title;
    subtitle.textContent = item.subtitle;

    features.innerHTML = item.features.map(function(feature){
      return "<li>" + feature + "</li>";
    }).join("");

    question.textContent = item.question;

    options.forEach(function(button, index){
      const option = item.options[index];
      button.dataset.p34Answer = option.key;
      button.textContent = option.label;
      button.classList.remove("is-correct", "is-wrong");
    });

    feedback.className = "cap4-p34-feedback";
    feedback.innerHTML = `
      <strong>Escolha uma opção.</strong>
      <p>A interpretação deve considerar absorção, biodisponibilidade e gravidade clínica.</p>
    `;

    prev.disabled = current === 0;
    next.disabled = current === cases.length - 1;

    dots.forEach(function(dot, index){
      dot.classList.toggle("is-active", index === current);
    });
  }

  options.forEach(function(button){
    button.addEventListener("click", function(){
      const item = cases[current];
      const answer = button.dataset.p34Answer;
      const isCorrect = answer === item.correct;

      options.forEach(function(option){
        option.classList.remove("is-correct", "is-wrong");
      });

      button.classList.add(isCorrect ? "is-correct" : "is-wrong");

      feedback.className = "cap4-p34-feedback " + (isCorrect ? "is-correct" : "is-wrong");
      feedback.innerHTML = `
        <strong>${isCorrect ? item.feedbackTitle : "Reavalie a exposição."}</strong>
        <p>${isCorrect ? item.feedback : "Observe se a absorção é confiável e se a gravidade clínica permite maior variabilidade farmacocinética."}</p>
      `;
    });
  });

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

  const revealItems = root.querySelectorAll(".cap4-p34-reveal");

  if(!("IntersectionObserver" in window)){
    revealItems.forEach(function(item){
      item.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold:0.18, rootMargin:"0px 0px -40px 0px" });

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 35 — PENETRAÇÃO TECIDUAL E COMPARTIMENTOS INFECCIOSOS
   ========================= */

(function initCap4Page35(){
  const root = document.querySelector(".cap4-page35");
  if(!root) return;

  const revealItems = root.querySelectorAll(".cap4-p35-reveal");

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
      threshold:0.18,
      rootMargin:"0px 0px -40px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 36 — BIOFILME E MICROAMBIENTE INFECCIOSO
   ========================= */

(function initCap4Page36(){
  const root = document.querySelector(".cap4-page36");
  if(!root) return;

  const buttons = Array.from(root.querySelectorAll("[data-p36-answer]"));
  const feedback = root.querySelector("#cap4-p36-feedback");

  const explanations = {
    resistencia:{
      correct:false,
      title:"Nem sempre há resistência genética.",
      text:"A persistência da infecção em biofilme pode ocorrer mesmo sem mutações ou aquisição de genes de resistência. O problema central é a organização da população bacteriana em matriz, com menor difusão do fármaco e alterações metabólicas locais."
    },
    betalactamase:{
      correct:false,
      title:"Esse não é o melhor mecanismo para o caso.",
      text:"A inativação enzimática pode causar resistência em algumas situações, mas o enunciado destaca um microrganismo suscetível no antibiograma e uma infecção associada a cateter, contexto em que o biofilme é uma explicação mais compatível."
    },
    biofilme:{
      correct:true,
      title:"Interpretação adequada.",
      text:"Embora o microrganismo seja suscetível em crescimento livre, a organização em biofilme reduz a difusão do antibacteriano, cria gradientes de concentração e abriga bactérias com menor atividade metabólica. Assim, a resposta clínica pode ser inferior ao esperado mesmo sem resistência genética adquirida."
    },
    plasma:{
      correct:false,
      title:"A concentração plasmática pode ser adequada.",
      text:"O problema não precisa estar na concentração plasmática. Em biofilmes, a concentração no foco infeccioso pode ser menor ou heterogênea mesmo quando a exposição sistêmica parece suficiente."
    }
  };

  buttons.forEach(function(button){
    button.addEventListener("click", function(){
      const key = button.dataset.p36Answer;
      const result = explanations[key];
      if(!result || !feedback) return;

      buttons.forEach(function(item){
        item.classList.remove("is-correct", "is-wrong");
      });

      button.classList.add(result.correct ? "is-correct" : "is-wrong");

      feedback.className = "cap4-p36-feedback " + (result.correct ? "is-correct" : "is-wrong");
      feedback.innerHTML = `
        <strong>${result.title}</strong>
        <p>${result.text}</p>
      `;
    });
  });

  const revealItems = root.querySelectorAll(".cap4-p36-reveal");

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
      threshold:0.18,
      rootMargin:"0px 0px -40px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 37 — EXPOSIÇÃO ANTIMICROBIANA E DINÂMICA EVOLUTIVA
   ========================= */

(function initCap4Page37(){
  const root = document.querySelector(".cap4-page37");
  if(!root) return;

  const content = {
    inicial:{
      eyebrow:"Antes do tratamento",
      title:"População bacteriana heterogênea",
      text:"Antes da exposição ao antibacteriano, já existem pequenas diferenças naturais de suscetibilidade entre as bactérias da população."
    },
    exposicao:{
      eyebrow:"Início da exposição",
      title:"Eliminação preferencial das bactérias mais suscetíveis",
      text:"A exposição ao antibacteriano não elimina a população de forma uniforme. As bactérias mais suscetíveis tendem a ser removidas primeiro."
    },
    selecao:{
      eyebrow:"Pressão seletiva incompleta",
      title:"Sobrevivência de variantes menos suscetíveis",
      text:"Quando a exposição não é suficiente para erradicação completa, variantes menos suscetíveis permanecem viáveis e passam a representar uma fração maior da população residual."
    },
    predominio:{
      eyebrow:"Mudança da composição populacional",
      title:"Predomínio de variantes menos suscetíveis",
      text:"Com exposições repetidas ou subótimas, variantes previamente raras podem se tornar predominantes, aumentando o risco de falha microbiológica."
    }
  };

  const tabs = Array.from(root.querySelectorAll("[data-p37-step]"));
  const eyebrow = root.querySelector("#cap4-p37-eyebrow");
  const title = root.querySelector("#cap4-p37-title");
  const text = root.querySelector("#cap4-p37-text");

  function activate(step){
    const selected = content[step];
    if(!selected || !eyebrow || !title || !text) return;

    tabs.forEach(function(tab){
      const active = tab.dataset.p37Step === step;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    eyebrow.textContent = selected.eyebrow;
    title.textContent = selected.title;
    text.textContent = selected.text;
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      activate(tab.dataset.p37Step);
    });
  });

  activate("inicial");

  const revealItems = root.querySelectorAll(".cap4-p37-reveal");

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
      threshold:0.18,
      rootMargin:"0px 0px -40px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 38 — QUIZ DE REVISÃO
   ========================= */

(function initCap4Page38(){
  const root = document.querySelector("[data-cap4-p38]");

  if(!root){
    return;
  }

  const questions = Array.from(
    root.querySelectorAll(".cap4-p38Question")
  );

  const statusValue = root.querySelector(
    ".cap4-p38Status__value"
  );

  const completion = root.querySelector(
    "[data-p38-completion]"
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
      ".cap4-p38FeedbackMap"
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
        "Não foi possível interpretar o conteúdo de feedback da página 38.",
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
        ".cap4-p38Options button"
      )
    );

    const confirmButton = question.querySelector(
      '[data-p38-action="confirm"]'
    );

    const resetButton = question.querySelector(
      '[data-p38-action="reset"]'
    );

    const feedback = question.querySelector(
      ".cap4-p38Feedback"
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
            "cap4-p38Feedback is-visible " +
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
            "cap4-p38Feedback";

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