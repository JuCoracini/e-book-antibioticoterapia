/* =========================
   PÁGINA 11 — ALVOS CELULARES DOS ANTIBACTERIANOS
   ========================= */

(function initPage11CellTargets(){
  const root = document.querySelector("[data-cap2-p11]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-p11-target]"));
  const title = root.querySelector("[data-p11-title]");
  const functionText = root.querySelector("[data-p11-function]");
  const consequenceText = root.querySelector("[data-p11-consequence]");
  const responseText = root.querySelector("[data-p11-response]");
  const panel = root.querySelector(".cap2-p11-panel");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const data = {
    parede:{
      title:"Parede celular",
      function:"Síntese e remodelamento do peptidoglicano.",
      consequence:"Perda progressiva da integridade estrutural e da resistência ao estresse osmótico.",
      response:"Frequentemente bactericida, especialmente em bactérias em crescimento ativo."
    },
    ribossomo:{
      title:"Ribossomo 70S",
      function:"Síntese de proteínas essenciais ao metabolismo, ao crescimento e à divisão bacteriana.",
      consequence:"Redução da capacidade de multiplicação e de adaptação ao ambiente.",
      response:"Predominantemente bacteriostática em muitas classes, com exceções bactericidas, como aminoglicosídeos."
    },
    dna:{
      title:"DNA e RNA",
      function:"Replicação do DNA, controle do superenrolamento e transcrição do RNA.",
      consequence:"Interrupção do fluxo de informação genética e perda da viabilidade celular.",
      response:"Frequentemente bactericida, dependendo da classe, da concentração e da espécie bacteriana."
    },
    folato:{
      title:"Síntese do folato",
      function:"Produção de precursores necessários à síntese de nucleotídeos.",
      consequence:"Redução progressiva da síntese de DNA e da capacidade replicativa bacteriana.",
      response:"Geralmente bacteriostática; a associação sulfametoxazol-trimetoprima pode apresentar efeito bactericida em microrganismos suscetíveis."
    },
    membrana:{
      title:"Membrana citoplasmática",
      function:"Manutenção da permeabilidade seletiva, dos gradientes eletroquímicos e da homeostase celular.",
      consequence:"Perda de conteúdo intracelular, desorganização funcional e colapso de processos vitais.",
      response:"A alteração importante da integridade da membrana geralmente produz efeito bactericida, cuja velocidade depende do fármaco, da espécie e da exposição."
    }
  };

  function activate(key){
    const selected = data[key];
    if(!selected) return;

    if(panel && !prefersReducedMotion){
      panel.style.animation = "none";
      void panel.offsetHeight;
      panel.style.animation = "";
    }

    tabs.forEach(function(tab){
      const active = tab.dataset.p11Target === key;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");

      if(active && panel && tab.id){
        panel.setAttribute("aria-labelledby", tab.id);
      }
    });

    title.textContent = selected.title;
    functionText.textContent = selected.function;
    consequenceText.textContent = selected.consequence;
    responseText.textContent = selected.response;
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      activate(tab.dataset.p11Target);
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
      activate(tabs[nextIndex].dataset.p11Target);
    });
  });

  activate("parede");

  const revealItems = document.querySelectorAll(".cap2-page11 .cap2-p11-reveal");

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
   PÁGINA 12 — CLASSIFICAÇÃO SEGUNDO O ALVO CELULAR
   ========================= */

(function initPage12ClassificationTable(){
  const root = document.querySelector("[data-cap2-p12]");
  if(!root) return;

  const wrapper = root.querySelector("[data-p12-table-wrapper]");
  const hint = root.querySelector("[data-p12-scroll-hint]");

  if(!wrapper) return;

  function updateScrollableState(){
    const isScrollable = wrapper.scrollWidth > wrapper.clientWidth + 4;

    wrapper.classList.toggle("is-scrollable", isScrollable);

    if(hint){
      hint.hidden = !isScrollable;
    }
  }

  updateScrollableState();

  window.addEventListener("resize", updateScrollableState);

  const revealItems = document.querySelectorAll(
    ".cap2-page12 .cap2-p12-reveal"
  );

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(prefersReducedMotion || !("IntersectionObserver" in window)){
    revealItems.forEach(function(item){
      item.classList.add("is-visible");
    });

    return;
  }

  const revealObserver = new IntersectionObserver(
    function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      threshold:.14,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    revealObserver.observe(item);
  });
})();
/* =========================
   PÁGINA 13 — INIBIÇÃO DA SÍNTESE DA PAREDE CELULAR
   ========================= */

(function initPage13CellWall(){
  const root = document.querySelector("[data-cap2-wall]");
  if(!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-wall-tab]"));
  const panel = root.querySelector("#cap2P13Panel");
  const image = root.querySelector("#cap2P13Image");
  const caption = root.querySelector("#cap2P13Caption");
  const kicker = root.querySelector("#cap2P13Kicker");
  const title = root.querySelector("#cap2P13Title");
  const body = root.querySelector("#cap2P13Body");
  const zoomButton = root.querySelector(".cap2-p13-zoom");
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if(
    !tabs.length ||
    !panel ||
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
    sintese:{
      tabId:"cap2P13TabSintese",
      image:"../../assets/capitulo-02/imagens/sintese-peptidoglicano.png",
      alt:"Etapas da síntese do peptidoglicano na parede celular bacteriana",
      caption:"Etapas da síntese do peptidoglicano na parede celular bacteriana.",
      kicker:"Processo fisiológico",
      title:"Formação e maturação da parede celular",
      body:`
        <div class="cap2-p13-infoGrid">
          <article class="cap2-p13-infoItem">
            <span>Função do processo</span>
            <p>Produzir e renovar continuamente a rede de peptidoglicano da parede celular.</p>
          </article>

          <article class="cap2-p13-infoItem">
            <span>Resultado estrutural</span>
            <p>Formação de uma estrutura rígida, capaz de manter a forma bacteriana e resistir à pressão osmótica.</p>
          </article>

          <article class="cap2-p13-infoItem">
            <span>Importância biológica</span>
            <p>Permite crescimento, divisão celular e manutenção da integridade mecânica da bactéria.</p>
          </article>

          <article class="cap2-p13-infoItem cap2-p13-infoItem--result">
            <span>Implicação farmacológica</span>
            <p>As etapas finais desse processo constituem alvos importantes para β-lactâmicos e glicopeptídeos.</p>
          </article>
        </div>
      `
    },

    beta:{
      tabId:"cap2P13TabBeta",
      image:"../../assets/capitulo-02/imagens/beta-lactamicos-transpeptidacao.png",
      alt:"Interferência dos beta-lactâmicos na etapa de transpeptidação do peptidoglicano",
      caption:"Interferência dos β-lactâmicos na etapa de transpeptidação do peptidoglicano.",
      kicker:"Inibição enzimática",
      title:"Ação dos β-lactâmicos sobre as PBPs",
      body:`
        <div class="cap2-p13-infoGrid">
          <article class="cap2-p13-infoItem">
            <span>Alvo molecular</span>
            <p>Proteínas ligadoras de penicilina, especialmente as enzimas envolvidas na transpeptidação.</p>
          </article>

          <article class="cap2-p13-infoItem">
            <span>Etapa comprometida</span>
            <p>Formação das ligações cruzadas entre as cadeias peptídicas do peptidoglicano.</p>
          </article>

          <article class="cap2-p13-infoItem">
            <span>Consequência estrutural</span>
            <p>A parede recém-formada perde resistência mecânica e torna-se progressivamente instável.</p>
          </article>

          <article class="cap2-p13-infoItem cap2-p13-infoItem--result">
            <span>Resposta microbiológica</span>
            <p>Efeito predominantemente bactericida em bactérias em crescimento ativo. A ativação de autolisinas pode contribuir para a lise.</p>
          </article>
        </div>
      `
    },

    glico:{
      tabId:"cap2P13TabGlico",
      image:"../../assets/capitulo-02/imagens/glicopeptideos-dala-dala.png",
      alt:"Interferência dos glicopeptídeos na síntese do peptidoglicano",
      caption:"Interferência dos glicopeptídeos na incorporação e ligação cruzada do peptidoglicano.",
      kicker:"Bloqueio do precursor",
      title:"Ação dos glicopeptídeos sobre o terminal D-Ala-D-Ala",
      body:`
        <div class="cap2-p13-infoGrid">
          <article class="cap2-p13-infoItem">
            <span>Alvo molecular</span>
            <p>Terminal D-Ala-D-Ala presente nos precursores do peptidoglicano.</p>
          </article>

          <article class="cap2-p13-infoItem">
            <span>Etapas comprometidas</span>
            <p>A ligação ao precursor dificulta a incorporação das novas subunidades e a formação das ligações cruzadas.</p>
          </article>

          <article class="cap2-p13-infoItem">
            <span>Consequência estrutural</span>
            <p>A parede em formação torna-se progressivamente incompleta e mecanicamente frágil.</p>
          </article>

          <article class="cap2-p13-infoItem cap2-p13-infoItem--result">
            <span>Resposta microbiológica</span>
            <p>Efeito bactericida em microrganismos suscetíveis, especialmente durante o crescimento ativo.</p>
          </article>
        </div>
      `
    }
  };

  function activate(key){
    const state = states[key];
    if(!state) return;

    tabs.forEach(function(tab){
      const active = tab.dataset.wallTab === key;

      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
      tab.setAttribute("tabindex", active ? "0" : "-1");
    });

    panel.setAttribute("aria-labelledby", state.tabId);
    root.dataset.wallState = key;

    image.classList.add("is-changing");

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
    }, prefersReducedMotion ? 0 : 160);
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      activate(tab.dataset.wallTab);
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
      activate(tabs[nextIndex].dataset.wallTab);
    });
  });

  activate("sintese");

  const revealItems = document.querySelectorAll(
    ".cap2-page13 .cap2-p13-reveal"
  );

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
      threshold:.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 14 — MEMBRANA CITOPLASMÁTICA
   VERSÃO SEM CONFLITOS
   ========================= */

(function initPage14MembraneV2(){
  const root = document.querySelector("[data-cap2-p14v2]");
  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-p14v2-target]")
  );

  const view = root.querySelector("#cap2P14V2View");
  const image = root.querySelector("#cap2P14V2Image");
  const caption = root.querySelector("#cap2P14V2Caption");
  const kicker = root.querySelector("#cap2P14V2Kicker");
  const title = root.querySelector("#cap2P14V2Title");
  const body = root.querySelector("#cap2P14V2Body");
  const zoomButton = root.querySelector(".cap2-p14v2-zoom");
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const controls = root.querySelector("[data-p14v2-controls]");
  const counter = root.querySelector("[data-p14v2-counter]");
  const prevButton = root.querySelector('[data-p14v2-action="prev"]');
  const nextButton = root.querySelector('[data-p14v2-action="next"]');

  if(
    !tabs.length ||
    !view ||
    !image ||
    !caption ||
    !kicker ||
    !title ||
    !body ||
    !zoomButton ||
    !controls ||
    !counter ||
    !prevButton ||
    !nextButton
  ){
    return;
  }

  const states = {
    membrana:{
      tabId:"cap2P14V2TabMembrana",
      steps:[
        {
          image:"../../assets/capitulo-02/imagens/membrana-citoplasmatica.png",
          alt:"Estrutura da membrana citoplasmática bacteriana",
          caption:"Estrutura da membrana citoplasmática bacteriana.",
          kicker:"Estrutura fisiológica",
          title:"Funções essenciais da membrana citoplasmática",
          body:`
            <div class="cap2-p14v2-infoGrid">

              <article class="cap2-p14v2-info">
                <span>Função de barreira</span>
                <p>Controla a entrada e a saída de substâncias entre o citoplasma e o meio extracelular.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Equilíbrio eletroquímico</span>
                <p>Mantém gradientes iônicos e o potencial elétrico necessário ao funcionamento celular.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Produção de energia</span>
                <p>Abriga sistemas associados à força próton-motriz, à respiração celular e à síntese de ATP.</p>
              </article>

              <article class="cap2-p14v2-info cap2-p14v2-info--result">
                <span>Implicação farmacológica</span>
                <p>Sua desorganização compromete rapidamente a homeostase e a viabilidade da bactéria.</p>
              </article>

            </div>
          `
        }
      ]
    },

    polimixinas:{
      tabId:"cap2P14V2TabPolimixinas",
      steps:[
        {
          image:"../../assets/capitulo-02/imagens/polimixina-fase-1.png",
          alt:"Ligação inicial das polimixinas ao lipídio A do lipopolissacarídeo",
          caption:"Ligação inicial das polimixinas ao lipídio A da membrana externa de bactérias Gram-negativas.",
          kicker:"Etapa 1",
          title:"Ligação ao lipídio A e desestabilização do LPS",
          body:`
            <div class="cap2-p14v2-infoGrid">

              <article class="cap2-p14v2-info">
                <span>Alvo inicial</span>
                <p>Lipídio A do lipopolissacarídeo da membrana externa de bactérias Gram-negativas.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Evento molecular</span>
                <p>Deslocamento de cálcio e magnésio, que estabilizam as moléculas de LPS.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Consequência inicial</span>
                <p>Desorganização progressiva e redução da estabilidade da membrana externa.</p>
              </article>

              <article class="cap2-p14v2-info cap2-p14v2-info--result">
                <span>Implicação</span>
                <p>A perda da estabilidade facilita a progressão do antibacteriano até a membrana citoplasmática.</p>
              </article>

            </div>
          `
        },

        {
          image:"../../assets/capitulo-02/imagens/polimixina-fase-2.png",
          alt:"Aumento da permeabilidade bacteriana provocado pelas polimixinas",
          caption:"Aumento da permeabilidade e perda da função de barreira após a ação das polimixinas.",
          kicker:"Etapa 2",
          title:"Aumento da permeabilidade e perda da homeostase",
          body:`
            <div class="cap2-p14v2-infoGrid">

              <article class="cap2-p14v2-info">
                <span>Evento central</span>
                <p>Dano à bicamada fosfolipídica e aumento importante da permeabilidade da membrana.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Consequência celular</span>
                <p>Extravasamento de componentes intracelulares e perda do gradiente eletroquímico.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Impacto metabólico</span>
                <p>Interrupção de processos energéticos e de transporte essenciais à célula.</p>
              </article>

              <article class="cap2-p14v2-info cap2-p14v2-info--result">
                <span>Resposta microbiológica</span>
                <p>Efeito bactericida rápido associado à perda da função de barreira.</p>
              </article>

            </div>
          `
        }
      ]
    },

    daptomicina:{
      tabId:"cap2P14V2TabDaptomicina",
      steps:[
        {
          image:"../../assets/capitulo-02/imagens/daptomicina-fase-1.png",
          alt:"Inserção dependente de cálcio da daptomicina na membrana bacteriana",
          caption:"Inserção dependente de cálcio da daptomicina na membrana citoplasmática de bactérias Gram-positivas.",
          kicker:"Etapa 1",
          title:"Inserção dependente de cálcio",
          body:`
            <div class="cap2-p14v2-infoGrid">

              <article class="cap2-p14v2-info">
                <span>Condição necessária</span>
                <p>O cálcio promove alteração conformacional da molécula de daptomicina.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Alvo estrutural</span>
                <p>Fosfolipídios aniônicos da membrana citoplasmática de bactérias Gram-positivas.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Evento inicial</span>
                <p>Inserção da molécula na bicamada lipídica sem lise imediata.</p>
              </article>

              <article class="cap2-p14v2-info cap2-p14v2-info--result">
                <span>Implicação</span>
                <p>A inserção permite a agregação das moléculas e prepara a perda do potencial elétrico.</p>
              </article>

            </div>
          `
        },

        {
          image:"../../assets/capitulo-02/imagens/daptomicina-fase-2.png",
          alt:"Oligomerização da daptomicina e despolarização da membrana",
          caption:"Oligomerização da daptomicina e despolarização do potencial elétrico transmembrana.",
          kicker:"Etapa 2",
          title:"Oligomerização e despolarização",
          body:`
            <div class="cap2-p14v2-infoGrid">

              <article class="cap2-p14v2-info">
                <span>Evento central</span>
                <p>Agregação das moléculas de daptomicina após sua inserção na membrana.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Alteração elétrica</span>
                <p>Rápida despolarização associada ao efluxo de potássio.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Característica</span>
                <p>A perda funcional ocorre sem necessidade de lise imediata da célula.</p>
              </article>

              <article class="cap2-p14v2-info cap2-p14v2-info--result">
                <span>Implicação</span>
                <p>A bactéria perde a capacidade de sustentar processos dependentes do gradiente eletroquímico.</p>
              </article>

            </div>
          `
        },

        {
          image:"../../assets/capitulo-02/imagens/daptomicina-fase-3.png",
          alt:"Colapso funcional da bactéria após ação da daptomicina",
          caption:"Colapso funcional após a perda sustentada do potencial de membrana.",
          kicker:"Etapa 3",
          title:"Colapso metabólico e perda de viabilidade",
          body:`
            <div class="cap2-p14v2-infoGrid">

              <article class="cap2-p14v2-info">
                <span>Processos interrompidos</span>
                <p>Síntese de ATP, transporte ativo e biossíntese de macromoléculas.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Consequência funcional</span>
                <p>Perda sustentada da homeostase e incapacidade de manter funções essenciais.</p>
              </article>

              <article class="cap2-p14v2-info">
                <span>Evento predominante</span>
                <p>Colapso funcional decorrente da despolarização, sem lise imediata.</p>
              </article>

              <article class="cap2-p14v2-info cap2-p14v2-info--result">
                <span>Resposta microbiológica</span>
                <p>Efeito bactericida rápido contra bactérias Gram-positivas suscetíveis.</p>
              </article>

            </div>
          `
        }
      ]
    }
  };

  let currentTarget = "membrana";
  let currentStep = 0;
  let transitionTimer = null;

  function render(){
    const group = states[currentTarget];
    if(!group) return;

    const state = group.steps[currentStep];
    if(!state) return;

    tabs.forEach(function(tab){
      const active = tab.dataset.p14v2Target === currentTarget;

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

    view.setAttribute("aria-labelledby", group.tabId);
    root.dataset.p14v2State = currentTarget;

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
    }, prefersReducedMotion ? 0 : 160);

    const hasMultipleSteps = group.steps.length > 1;

    controls.hidden = !hasMultipleSteps;

    if(hasMultipleSteps){
      counter.textContent =
        "Etapa " +
        (currentStep + 1) +
        " de " +
        group.steps.length;

      prevButton.disabled = currentStep === 0;
      nextButton.disabled =
        currentStep === group.steps.length - 1;
    }else{
      counter.textContent = "";
      prevButton.disabled = true;
      nextButton.disabled = true;
    }
  }

  function activateTarget(target){
    if(!states[target]) return;

    currentTarget = target;
    currentStep = 0;

    render();
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      activateTarget(tab.dataset.p14v2Target);
    });

    tab.addEventListener("keydown", function(event){
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ){
        nextIndex =
          (currentIndex - 1 + tabs.length) % tabs.length;
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
      activateTarget(
        tabs[nextIndex].dataset.p14v2Target
      );
    });
  });

  prevButton.addEventListener("click", function(){
    if(currentStep === 0) return;

    currentStep -= 1;
    render();
  });

  nextButton.addEventListener("click", function(){
    const group = states[currentTarget];

    if(
      !group ||
      currentStep >= group.steps.length - 1
    ){
      return;
    }

    currentStep += 1;
    render();
  });

  render();

  const revealItems = document.querySelectorAll(
    ".cap2-page14 .cap2-p14v2-reveal"
  );

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
      threshold:.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 15 — INIBIÇÃO DA SÍNTESE PROTEICA
   ========================= */

(function initPage15ProteinSynthesisV2(){
  const root = document.querySelector("[data-cap2-p15v2]");
  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-p15v2-target]")
  );

  const view = root.querySelector("#cap2P15V2View");
  const image = root.querySelector("#cap2P15V2Image");
  const caption = root.querySelector("#cap2P15V2Caption");
  const kicker = root.querySelector("#cap2P15V2Kicker");
  const title = root.querySelector("#cap2P15V2Title");
  const body = root.querySelector("#cap2P15V2Body");
  const zoomButton = root.querySelector(".cap2-p15v2-zoom");
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    normal:{
      tabId:"cap2P15V2TabNormal",
      image:"../../assets/capitulo-02/imagens/cap02-p15-normal.png",
      alt:"Processo normal da síntese proteica bacteriana",
      caption:"Processo normal da síntese proteica bacteriana.",
      kicker:"Processo fisiológico",
      title:"Atuação coordenada das subunidades 30S e 50S",
      body:`
        <div class="cap2-p15v2-infoGrid">

          <article class="cap2-p15v2-info">
            <span>Função do processo</span>
            <p>Converter a informação codificada no RNAm em uma cadeia de aminoácidos organizada.</p>
          </article>

          <article class="cap2-p15v2-info">
            <span>Papel da subunidade 30S</span>
            <p>Reconhecer o RNAm, posicionar os tRNAs e assegurar a leitura adequada dos códons.</p>
          </article>

          <article class="cap2-p15v2-info">
            <span>Papel da subunidade 50S</span>
            <p>Catalisar a formação das ligações peptídicas e permitir a elongação da cadeia polipeptídica.</p>
          </article>

          <article class="cap2-p15v2-info cap2-p15v2-info--result">
            <span>Importância biológica</span>
            <p>A produção contínua de proteínas sustenta o metabolismo, o crescimento e a adaptação bacteriana.</p>
          </article>

        </div>
      `
    },

    "30s":{
      tabId:"cap2P15V2Tab30S",
      image:"../../assets/capitulo-02/imagens/cap02-p15-30s.png",
      alt:"Interferência dos antibacterianos sobre a subunidade ribossomal 30S",
      caption:"Interferência farmacológica sobre a subunidade ribossomal bacteriana 30S.",
      kicker:"Alvo ribossomal",
      title:"Interferência sobre a subunidade 30S",
      body:`
        <div class="cap2-p15v2-infoGrid">

          <article class="cap2-p15v2-info">
            <span>Funções comprometidas</span>
            <p>Reconhecimento do RNAm, posicionamento dos tRNAs e fidelidade da leitura dos códons.</p>
          </article>

          <article class="cap2-p15v2-info">
            <span>Possíveis efeitos</span>
            <p>Bloqueio da iniciação da tradução ou incorporação incorreta de aminoácidos na proteína em formação.</p>
          </article>

          <article class="cap2-p15v2-info">
            <span>Classes relacionadas</span>
            <p>Tetraciclinas e aminoglicosídeos atuam sobre a subunidade 30S por mecanismos distintos.</p>
          </article>

          <article class="cap2-p15v2-info cap2-p15v2-info--result">
            <span>Resposta microbiológica</span>
            <p>As tetraciclinas são predominantemente bacteriostáticas; os aminoglicosídeos apresentam efeito bactericida.</p>
          </article>

        </div>
      `
    },

    "50s":{
      tabId:"cap2P15V2Tab50S",
      image:"../../assets/capitulo-02/imagens/cap02-p15-50s.png",
      alt:"Interferência dos antibacterianos sobre a subunidade ribossomal 50S",
      caption:"Interferência farmacológica sobre a subunidade ribossomal bacteriana 50S.",
      kicker:"Alvo ribossomal",
      title:"Interferência sobre a subunidade 50S",
      body:`
        <div class="cap2-p15v2-infoGrid">

          <article class="cap2-p15v2-info">
            <span>Funções comprometidas</span>
            <p>Formação das ligações peptídicas, translocação dos tRNAs e progressão do ribossomo pelo RNAm.</p>
          </article>

          <article class="cap2-p15v2-info">
            <span>Consequência traducional</span>
            <p>A elongação é interrompida antes da formação de uma proteína completa e funcional.</p>
          </article>

          <article class="cap2-p15v2-info">
            <span>Classes relacionadas</span>
            <p>Macrolídeos, lincosamidas, oxazolidinonas e outras classes atuam em regiões distintas da subunidade 50S.</p>
          </article>

          <article class="cap2-p15v2-info cap2-p15v2-info--result">
            <span>Resposta microbiológica</span>
            <p>Predomina a redução progressiva da multiplicação bacteriana, frequentemente associada a efeito bacteriostático.</p>
          </article>

        </div>
      `
    }
  };

  let currentTarget = "normal";
  let transitionTimer = null;

  function render(target){
    const state = states[target];
    if(!state) return;

    currentTarget = target;

    tabs.forEach(function(tab){
      const active = tab.dataset.p15v2Target === target;

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

    view.setAttribute("aria-labelledby", state.tabId);
    root.dataset.p15v2State = target;

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
}, prefersReducedMotion ? 0 : 160);
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      render(tab.dataset.p15v2Target);
    });

    tab.addEventListener("keydown", function(event){
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ){
        nextIndex =
          (currentIndex - 1 + tabs.length) % tabs.length;
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
      render(tabs[nextIndex].dataset.p15v2Target);
    });
  });

  render(currentTarget);

  const revealItems = document.querySelectorAll(
    ".cap2-page15 .cap2-p15v2-reveal"
  );

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
      threshold:.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 16 — INIBIÇÃO DA SÍNTESE DE ÁCIDOS NUCLEICOS
   ========================= */

(function initPage16NucleicAcidsV2(){
  const root = document.querySelector("[data-cap2-p16v2]");
  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-p16v2-target]")
  );

  const view = root.querySelector("#cap2P16V2View");
  const image = root.querySelector("#cap2P16V2Image");
  const caption = root.querySelector("#cap2P16V2Caption");
  const kicker = root.querySelector("#cap2P16V2Kicker");
  const title = root.querySelector("#cap2P16V2Title");
  const body = root.querySelector("#cap2P16V2Body");
  const zoomButton = root.querySelector(".cap2-p16v2-zoom");
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    processo:{
      tabId:"cap2P16V2TabProcesso",
      image:"../../assets/capitulo-02/imagens/acidos-nucleicos-processo.png",
      alt:"Etapas gerais da replicação do DNA e da transcrição do RNA bacteriano",
      caption:"Processos gerais de replicação do DNA e transcrição do RNA bacteriano.",
      kicker:"Fluxo da informação genética",
      title:"Replicação do DNA e transcrição do RNA",
      body:`
        <div class="cap2-p16v2-infoGrid">

          <article class="cap2-p16v2-info">
            <span>Replicação</span>
            <p>Duplica o cromossomo bacteriano antes da divisão celular.</p>
          </article>

          <article class="cap2-p16v2-info">
            <span>Controle topológico</span>
            <p>A DNA girase e a topoisomerase IV regulam a tensão e o superenrolamento do DNA.</p>
          </article>

          <article class="cap2-p16v2-info">
            <span>Transcrição</span>
            <p>A RNA polimerase converte a informação do DNA em moléculas de RNA funcionais.</p>
          </article>

          <article class="cap2-p16v2-info cap2-p16v2-info--result">
            <span>Importância biológica</span>
            <p>Esses processos sustentam a divisão, a expressão gênica e a adaptação bacteriana.</p>
          </article>

        </div>
      `
    },

    fluoroquinolonas:{
      tabId:"cap2P16V2TabFluoro",
      image:"../../assets/capitulo-02/imagens/fluoroquinolona-dna-topoisomerase.png",
      alt:"Interferência das fluoroquinolonas no complexo formado entre DNA e topoisomerases",
      caption:"Interferência das fluoroquinolonas no complexo DNA–topoisomerase.",
      kicker:"Bloqueio da replicação",
      title:"Estabilização do complexo DNA–topoisomerase",
      body:`
        <div class="cap2-p16v2-infoGrid">

          <article class="cap2-p16v2-info">
            <span>Alvos moleculares</span>
            <p>DNA girase e topoisomerase IV, com importância relativa variável entre diferentes grupos bacterianos.</p>
          </article>

          <article class="cap2-p16v2-info">
            <span>Evento central</span>
            <p>Estabilização do complexo formado após a clivagem do DNA, impedindo a religação das fitas.</p>
          </article>

          <article class="cap2-p16v2-info">
            <span>Consequência genética</span>
            <p>Acúmulo de quebras no DNA e interrupção da progressão da replicação cromossômica.</p>
          </article>

          <article class="cap2-p16v2-info cap2-p16v2-info--result">
            <span>Resposta microbiológica</span>
            <p>Perda da integridade do material genético e efeito predominantemente bactericida.</p>
          </article>

        </div>
      `
    },

    rifamicinas:{
      tabId:"cap2P16V2TabRifamicinas",
      image:"../../assets/capitulo-02/imagens/rifamicina-rna-polimerase.png",
      alt:"Bloqueio da transcrição bacteriana pela ligação das rifamicinas à RNA polimerase",
      caption:"Bloqueio da transcrição bacteriana por ação das rifamicinas.",
      kicker:"Bloqueio da transcrição",
      title:"Inibição da RNA polimerase bacteriana",
      body:`
        <div class="cap2-p16v2-infoGrid">

          <article class="cap2-p16v2-info">
            <span>Alvo molecular</span>
            <p>Subunidade β da RNA polimerase bacteriana dependente de DNA.</p>
          </article>

          <article class="cap2-p16v2-info">
            <span>Etapa comprometida</span>
            <p>Início da elongação da transcrição e progressão inicial da síntese de RNA.</p>
          </article>

          <article class="cap2-p16v2-info">
            <span>Consequência funcional</span>
            <p>Interrupção precoce da formação de RNA mensageiro e de outros RNAs celulares.</p>
          </article>

          <article class="cap2-p16v2-info cap2-p16v2-info--result">
            <span>Impacto microbiológico</span>
            <p>Redução rápida da expressão gênica e da produção de proteínas essenciais.</p>
          </article>

        </div>
      `
    },

    nitroimidazois:{
      tabId:"cap2P16V2TabNitro",
      image:"../../assets/capitulo-02/imagens/nitroimidazol-dano-dna.png",
      alt:"Dano molecular direto ao DNA após ativação intracelular dos nitroimidazóis",
      caption:"Dano direto ao DNA provocado por metabólitos reativos dos nitroimidazóis.",
      kicker:"Ativação intracelular",
      title:"Formação de metabólitos reativos e dano ao DNA",
      body:`
        <div class="cap2-p16v2-infoGrid">

          <article class="cap2-p16v2-info">
            <span>Condição de ativação</span>
            <p>Redução enzimática do pró-fármaco em microrganismos anaeróbios ou em ambientes de baixo potencial redox.</p>
          </article>

          <article class="cap2-p16v2-info">
            <span>Evento molecular</span>
            <p>Formação de radicais livres e outros metabólitos altamente reativos.</p>
          </article>

          <article class="cap2-p16v2-info">
            <span>Consequência genética</span>
            <p>Quebras nas fitas de DNA e outras alterações que comprometem sua estabilidade.</p>
          </article>

          <article class="cap2-p16v2-info cap2-p16v2-info--result">
            <span>Resposta microbiológica</span>
            <p>Perda da integridade genética e morte de microrganismos suscetíveis.</p>
          </article>

        </div>
      `
    }
  };

  let currentTarget = "processo";
  let transitionTimer = null;

  function render(target){
    const state = states[target];
    if(!state) return;

    currentTarget = target;

    tabs.forEach(function(tab){
      const active = tab.dataset.p16v2Target === target;

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

    view.setAttribute("aria-labelledby", state.tabId);
    root.dataset.p16v2State = target;

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
    }, prefersReducedMotion ? 0 : 160);
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      render(tab.dataset.p16v2Target);
    });

    tab.addEventListener("keydown", function(event){
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ){
        nextIndex =
          (currentIndex - 1 + tabs.length) % tabs.length;
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
      render(tabs[nextIndex].dataset.p16v2Target);
    });
  });
  render(currentTarget);

  const revealItems = document.querySelectorAll(
    ".cap2-page16 .cap2-p16v2-reveal"
  );

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
      threshold:.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 17 — INIBIÇÃO DO METABOLISMO DO FOLATO
   ========================= */

(function initPage17FolatoV2(){
  const root = document.querySelector("[data-cap2-p17v2]");
  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-p17v2-target]")
  );

  const view = root.querySelector("#cap2P17V2View");
  const image = root.querySelector("#cap2P17V2Image");
  const caption = root.querySelector("#cap2P17V2Caption");
  const kicker = root.querySelector("#cap2P17V2Kicker");
  const title = root.querySelector("#cap2P17V2Title");
  const body = root.querySelector("#cap2P17V2Body");
  const zoomButton = root.querySelector(".cap2-p17v2-zoom");
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    via:{
      tabId:"cap2P17V2TabVia",
      image:"../../assets/capitulo-02/imagens/folato-via-geral.png",
      alt:"Via metabólica bacteriana de síntese do folato",
      caption:"Via metabólica bacteriana de síntese do folato.",
      kicker:"Via metabólica",
      title:"Produção de folato e síntese de nucleotídeos",
      body:`
        <div class="cap2-p17v2-infoGrid">

          <article class="cap2-p17v2-info">
            <span>Precursor inicial</span>
            <p>O PABA participa das etapas iniciais da síntese bacteriana do folato.</p>
          </article>

          <article class="cap2-p17v2-info">
            <span>Intermediário metabólico</span>
            <p>O ácido di-hidrofólico (DHF) é formado antes da etapa de redução enzimática.</p>
          </article>

          <article class="cap2-p17v2-info">
            <span>Cofator funcional</span>
            <p>O ácido tetrahidrofólico (THF) fornece unidades de um carbono para reações biossintéticas.</p>
          </article>

          <article class="cap2-p17v2-info cap2-p17v2-info--result">
            <span>Resultado biológico</span>
            <p>A via sustenta a produção de purinas, timidilato e, consequentemente, de DNA e RNA.</p>
          </article>

        </div>
      `
    },

    sulfonamidas:{
      tabId:"cap2P17V2TabSulfonamidas",
      image:"../../assets/capitulo-02/imagens/folato-sulfonamida.png",
      alt:"Interferência das sulfonamidas na via bacteriana do folato",
      caption:"Bloqueio da etapa dependente de PABA pelas sulfonamidas.",
      kicker:"Antagonismo metabólico",
      title:"Inibição da di-hidropteroato sintase",
      body:`
        <div class="cap2-p17v2-infoGrid">

          <article class="cap2-p17v2-info">
            <span>Relação estrutural</span>
            <p>As sulfonamidas apresentam estrutura semelhante ao PABA.</p>
          </article>

          <article class="cap2-p17v2-info">
            <span>Alvo enzimático</span>
            <p>Di-hidropteroato sintase (DHPS), envolvida em etapa inicial da via bacteriana.</p>
          </article>

          <article class="cap2-p17v2-info">
            <span>Consequência metabólica</span>
            <p>A competição com o PABA reduz a formação de ácido di-hidrofólico.</p>
          </article>

          <article class="cap2-p17v2-info cap2-p17v2-info--result">
            <span>Resposta microbiológica</span>
            <p>Redução progressiva da síntese de nucleotídeos, geralmente associada a efeito bacteriostático.</p>
          </article>

        </div>
      `
    },

    trimetoprim:{
      tabId:"cap2P17V2TabTrimetoprim",
      image:"../../assets/capitulo-02/imagens/folato-trimetoprim.png",
      alt:"Interferência do trimetoprim na conversão de DHF em THF",
      caption:"Bloqueio da conversão de DHF em THF pelo trimetoprim.",
      kicker:"Inibição enzimática",
      title:"Inibição da di-hidrofolato redutase bacteriana",
      body:`
        <div class="cap2-p17v2-infoGrid">

          <article class="cap2-p17v2-info">
            <span>Alvo enzimático</span>
            <p>Di-hidrofolato redutase (DHFR) bacteriana.</p>
          </article>

          <article class="cap2-p17v2-info">
            <span>Etapa comprometida</span>
            <p>Conversão do ácido di-hidrofólico em ácido tetrahidrofólico.</p>
          </article>

          <article class="cap2-p17v2-info">
            <span>Consequência metabólica</span>
            <p>A redução de THF limita a síntese de purinas e timidilato.</p>
          </article>

          <article class="cap2-p17v2-info cap2-p17v2-info--result">
            <span>Resposta microbiológica</span>
            <p>Comprometimento progressivo da multiplicação, geralmente com efeito bacteriostático quando utilizado isoladamente.</p>
          </article>

        </div>
      `
    },

    associacao:{
      tabId:"cap2P17V2TabAssociacao",
      image:"../../assets/capitulo-02/imagens/folato-associacao.png",
      alt:"Bloqueio sequencial da via do folato pela associação sulfametoxazol-trimetoprim",
      caption:"Bloqueio sequencial da via do folato pela associação sulfametoxazol–trimetoprim.",
      kicker:"Bloqueio sequencial",
      title:"Ação combinada de sulfametoxazol e trimetoprim",
      body:`
        <div class="cap2-p17v2-infoGrid">

          <article class="cap2-p17v2-info">
            <span>Primeiro bloqueio</span>
            <p>O sulfametoxazol reduz a formação de DHF ao inibir a etapa dependente de PABA.</p>
          </article>

          <article class="cap2-p17v2-info">
            <span>Segundo bloqueio</span>
            <p>O trimetoprim impede a conversão de DHF em THF.</p>
          </article>

          <article class="cap2-p17v2-info">
            <span>Consequência metabólica</span>
            <p>A inibição consecutiva reduz de forma mais intensa a disponibilidade de cofatores e nucleotídeos.</p>
          </article>

          <article class="cap2-p17v2-info cap2-p17v2-info--result">
            <span>Resposta microbiológica</span>
            <p>Maior comprometimento da replicação bacteriana, frequentemente associado a atividade bactericida.</p>
          </article>

        </div>
      `
    }
  };

  let currentTarget = "via";
  let transitionTimer = null;

  function render(target){
    const state = states[target];
    if(!state) return;

    currentTarget = target;

    tabs.forEach(function(tab){
      const active = tab.dataset.p17v2Target === target;

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

    view.setAttribute("aria-labelledby", state.tabId);
    root.dataset.p17v2State = target;

    window.clearTimeout(transitionTimer);
    image.classList.add("is-changing");

    transitionTimer = window.setTimeout(function(){
      image.src = state.image;
      image.alt = state.alt;
      image.classList.toggle(
        "cap2-p17v2-image--via",
        target === "via"
      );

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
    }, prefersReducedMotion ? 0 : 160);
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      render(tab.dataset.p17v2Target);
    });

    tab.addEventListener("keydown", function(event){
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ){
        nextIndex =
          (currentIndex - 1 + tabs.length) % tabs.length;
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
      render(tabs[nextIndex].dataset.p17v2Target);
    });
  });

  render(currentTarget);

  const revealItems = document.querySelectorAll(
    ".cap2-page17 .cap2-p17v2-reveal"
  );

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
      threshold:.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =========================
   PÁGINA 18 — BACTERICIDA E BACTERIOSTÁTICO
   ========================= */

(function initPage18ResponsePatternsV2(){
  const root = document.querySelector("[data-cap2-p18v2]");
  if(!root) return;

  const tabs = Array.from(
    root.querySelectorAll("[data-p18v2-target]")
  );

  const view = root.querySelector("#cap2P18V2View");
  const image = root.querySelector("#cap2P18V2Image");
  const caption = root.querySelector("#cap2P18V2Caption");
  const kicker = root.querySelector("#cap2P18V2Kicker");
  const title = root.querySelector("#cap2P18V2Title");
  const body = root.querySelector("#cap2P18V2Body");
  const zoomButton = root.querySelector(".cap2-p18v2-zoom");
  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
    bacteriostatico:{
      tabId:"cap2P18V2TabBacteriostatico",
      image:"../../assets/capitulo-02/imagens/bacteriostatico-resposta-populacional.png",
      alt:"Representação do comportamento bacteriostático de uma população bacteriana",
      caption:"Representação do padrão de resposta bacteriostática.",
      kicker:"Padrão populacional",
      title:"Inibição da multiplicação bacteriana",
      body:`
        <div class="cap2-p18v2-infoGrid">

          <article class="cap2-p18v2-info">
            <span>Interpretação microbiológica</span>
            <p>A expansão da população é interrompida ou significativamente reduzida durante a exposição.</p>
          </article>

          <article class="cap2-p18v2-info">
            <span>Classes frequentemente associadas</span>
            <p>Tetraciclinas, macrolídeos, lincosamidas, oxazolidinonas e sulfonamidas.</p>
          </article>

          <article class="cap2-p18v2-info">
            <span>Dependência experimental</span>
            <p>O comportamento pode variar conforme a concentração, a espécie bacteriana e o tempo de exposição.</p>
          </article>

          <article class="cap2-p18v2-info cap2-p18v2-info--result">
            <span>Importância clínica</span>
            <p>Atividade bacteriostática não significa menor eficácia terapêutica.</p>
          </article>

        </div>
      `
    },

    bactericida:{
      tabId:"cap2P18V2TabBactericida",
      image:"../../assets/capitulo-02/imagens/bactericida-resposta-populacional.png",
      alt:"Representação do comportamento bactericida de uma população bacteriana",
      caption:"Representação do padrão de resposta bactericida.",
      kicker:"Padrão populacional",
      title:"Perda efetiva da viabilidade bacteriana",
      body:`
        <div class="cap2-p18v2-infoGrid">

          <article class="cap2-p18v2-info">
            <span>Interpretação microbiológica</span>
            <p>A exposição provoca perda efetiva da viabilidade e redução da população bacteriana recuperável.</p>
          </article>

          <article class="cap2-p18v2-info">
            <span>Mecanismos frequentemente associados</span>
            <p>Dano à parede celular, à membrana citoplasmática ou ao DNA, além de exceções como aminoglicosídeos.</p>
          </article>

          <article class="cap2-p18v2-info">
            <span>Critério experimental</span>
            <p>Convencionalmente, utiliza-se a redução mínima de 3 log<sub>10</sub> UFC/mL em relação ao inóculo inicial.</p>
          </article>

          <article class="cap2-p18v2-info cap2-p18v2-info--result">
            <span>Importância clínica</span>
            <p>Atividade bactericida não significa superioridade terapêutica em todas as infecções.</p>
          </article>

        </div>
      `
    }
  };

  let currentTarget = "bacteriostatico";
  let transitionTimer = null;

  function render(target){
    const state = states[target];
    if(!state) return;

    currentTarget = target;

    tabs.forEach(function(tab){
      const active = tab.dataset.p18v2Target === target;

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

    view.setAttribute("aria-labelledby", state.tabId);
    root.dataset.p18v2State = target;

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
    }, prefersReducedMotion ? 0 : 160);
  }

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      render(tab.dataset.p18v2Target);
    });

    tab.addEventListener("keydown", function(event){
      const currentIndex = tabs.indexOf(tab);
      let nextIndex = null;

      if(
        event.key === "ArrowRight" ||
        event.key === "ArrowDown"
      ){
        nextIndex = (currentIndex + 1) % tabs.length;
      }

      if(
        event.key === "ArrowLeft" ||
        event.key === "ArrowUp"
      ){
        nextIndex =
          (currentIndex - 1 + tabs.length) % tabs.length;
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
      render(tabs[nextIndex].dataset.p18v2Target);
    });
  });

  render(currentTarget);

  const revealItems = document.querySelectorAll(
    ".cap2-page18 .cap2-p18v2-reveal"
  );

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
      threshold:.16,
      rootMargin:"0px 0px -35px 0px"
    }
  );

  revealItems.forEach(function(item){
    observer.observe(item);
  });
})();
/* =====================================================
   PÁGINA 19 — QUIZ DE REVISÃO
   ===================================================== */

(function initPage19Quiz(){
  const root = document.querySelector("[data-cap2-p19]");

  if(!root) return;

  const situations = [
    {
      caseText:
        "Durante a discussão de um caso de endocardite infecciosa, o estudante observa que β-lactâmicos podem apresentar menor atividade contra bactérias das vegetações valvares, que frequentemente permanecem em crescimento lento ou em fase estacionária.",
      prompt:"Qual característica do mecanismo de ação explica esse comportamento?",
      correct:"a",
      options:[
        {
          key:"a",
          label:"Os β-lactâmicos interferem na síntese do peptidoglicano, processo mais ativo durante o crescimento e a divisão bacteriana."
        },
        {
          key:"b",
          label:"Esses fármacos atuam exclusivamente sobre bactérias Gram-positivas."
        },
        {
          key:"c",
          label:"A atividade desses fármacos depende de uma resposta inflamatória intensa do hospedeiro."
        },
        {
          key:"d",
          label:"Esses fármacos dependem da presença de anticorpos para exercer sua atividade."
        }
      ],
      feedback:{
        a:"A síntese e a remodelação do peptidoglicano são mais intensas durante o crescimento e a divisão bacteriana. Em populações de crescimento lento ou em fase estacionária, a atividade bactericida dos β-lactâmicos pode ser reduzida.",
        b:"A dependência do crescimento bacteriano não se explica por atividade exclusiva contra Gram-positivos. O fator central é a intensidade dos processos celulares sobre os quais o antibacteriano atua.",
        c:"A atividade dos β-lactâmicos não depende da intensidade da resposta inflamatória do hospedeiro, mas da interação com as PBPs e da atividade de síntese da parede celular.",
        d:"A ação dos β-lactâmicos decorre da ligação às PBPs bacterianas e não depende da presença de anticorpos."
      }
    },
    {
      caseText:
        "Paciente de 24 anos com pneumonia atípica recebeu claritromicina. Durante a discussão do caso, o preceptor pergunta por que a inibição da síntese proteica bacteriana não compromete da mesma forma a síntese proteica das células da paciente.",
      prompt:"Qual alternativa explica corretamente essa seletividade?",
      correct:"b",
      options:[
        {
          key:"a",
          label:"A claritromicina inibe uma parede celular estruturalmente idêntica às estruturas das células humanas."
        },
        {
          key:"b",
          label:"A claritromicina liga-se à subunidade 50S bacteriana, enquanto os ribossomos citoplasmáticos humanos são 80S e estruturalmente diferentes."
        },
        {
          key:"c",
          label:"O fármaco bloqueia preferencialmente a replicação do DNA humano, preservando o DNA bacteriano."
        },
        {
          key:"d",
          label:"O fármaco destrói indiscriminadamente as membranas bacterianas e as membranas das células humanas."
        }
      ],
      feedback:{
        a:"Macrolídeos não atuam sobre a parede celular. A seletividade decorre principalmente das diferenças estruturais entre os ribossomos bacterianos e os ribossomos citoplasmáticos humanos.",
        b:"A claritromicina é um macrolídeo que atua preferencialmente sobre a subunidade 50S do ribossomo bacteriano. A diferença em relação aos ribossomos citoplasmáticos humanos 80S permite inibição preferencial da tradução bacteriana.",
        c:"A claritromicina não atua predominantemente sobre a replicação do DNA. Seu principal alvo é a subunidade 50S do ribossomo bacteriano.",
        d:"Macrolídeos não atuam por destruição indiscriminada de membranas. Seu mecanismo central é a interferência na síntese proteica bacteriana."
      }
    }
  ];

  const progress = root.querySelector("[data-p19-progress]");
  const kicker = root.querySelector("[data-p19-kicker]");
  const caseBox = root.querySelector("[data-p19-case]");
  const prompt = root.querySelector("[data-p19-prompt]");
  const optionsBox = root.querySelector("[data-p19-options]");
  const confirmButton = root.querySelector("[data-p19-confirm]");
  const resetButton = root.querySelector("[data-p19-reset]");
  const feedback = root.querySelector("[data-p19-feedback]");
  const prevButton = root.querySelector("[data-p19-prev]");
  const nextButton = root.querySelector("[data-p19-next]");
  const dots = Array.from(root.querySelectorAll(".cap2-p19Dots span"));

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
      "cap2-p19Feedback is-visible " +
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
          <span class="cap2-p19Letter">${letters[index]}</span>
          <span>${option.label}</span>
        </button>
      `;
    }).join("");

    feedback.className = "cap2-p19Feedback";
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