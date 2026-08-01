(function(){

const data = {

prob:{
title:"Probabilidade etiológica",
text:"A decisão inicial raramente ocorre com identificação microbiológica confirmada. A escolha parte de uma estimativa probabilística construída a partir da síndrome clínica, do sítio provável da infecção e do contexto epidemiológico.",
logic:"Se essa estimativa for inadequada, aumenta o risco de erro terapêutico precoce."
},

grav:{
title:"Gravidade clínica",
text:"A gravidade define a tolerância ao erro terapêutico e influencia a amplitude inicial da cobertura antimicrobiana.",
logic:"Quadros graves exigem menor tolerância à incerteza e maior cobertura inicial."
},

res:{
title:"Mecanismos de resistência",
text:"O perfil epidemiológico local e os mecanismos de resistência modificam a escolha empírica.",
logic:"Ignorar resistência local pode levar à ineficácia terapêutica mesmo com antibacteriano adequado."
},

pkpd:{
title:"Farmacocinética e farmacodinâmica",
text:"A eficácia depende da exposição efetiva ao fármaco no foco infeccioso.",
logic:"Mesmo antibacteriano pode falhar se não atingir concentração adequada no sítio da infecção."
},

impact:{
title:"Impacto individual e coletivo",
text:"A decisão terapêutica afeta não apenas o paciente, mas também o cenário epidemiológico.",
logic:"Uso inadequado favorece eventos adversos e seleção de resistência."
}

};

const nodes=document.querySelectorAll(".node");

nodes.forEach(n=>{
n.onclick=()=>{
nodes.forEach(b=>b.classList.remove("active"));
n.classList.add("active");

const key=n.dataset.key;

document.getElementById("title").textContent=data[key].title;
document.getElementById("text").textContent=data[key].text;
document.getElementById("logic").textContent=data[key].logic;
};
});

})();
(function(){

const cards=document.querySelectorAll(".card");
const feedback=document.getElementById("feedback");
const nextBtn=document.getElementById("nextBtn");
const track=document.getElementById("track");

cards.forEach(card=>{
card.onclick=()=>{

cards.forEach(c=>c.style.pointerEvents="none");

const choice=card.dataset.choice;

let text="";
let type="";

if(choice==="empirico"){
text="Decisão adequada: integra probabilidade etiológica e gravidade clínica, permitindo intervenção precoce.";
type="good";
}

if(choice==="aguardar"){
text="Conduta arriscada: pode atrasar o início de terapia em cenário potencialmente grave.";
type="warning";
}

if(choice==="amplo"){
text="Conduta inadequada: ampliação sem critério aumenta exposição e risco de resistência.";
type="error";
}

feedback.innerText=text;
feedback.style.display="block";

const item=document.createElement("div");
item.className="track-item "+type;
item.innerText=text;
track.appendChild(item);

nextBtn.hidden=false;

};
});

nextBtn.onclick=()=>{
window.location.href="p84.html";
};

})();

/* =====================================================
   CAPÍTULO 10
   PÁGINA 84 — SIMULAÇÃO 1 (REAVALIAR E AJUSTAR)
   ===================================================== */

(function initPage84Simulation(){
  const root = document.querySelector("[data-cap10-p84]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p84-step"));
  const feedback = document.getElementById("cap10P84Feedback");
  const feedbackFinal = document.getElementById("cap10P84FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p84Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function lockGroup(option){
    const group = option.closest(".cap10-p84-options");
    if(!group) return;

    group.querySelectorAll(".cap10-p84-option").forEach((btn) => {
      btn.classList.add("is-locked");
    });
  }

  function markOption(option, choice){
    option.classList.add("is-selected");

    if(choice === "ajustar" || choice === "reavaliar-espectro"){
      option.classList.add("is-correct");
    } else if(choice === "manter" || choice === "permanecer-amplo"){
      option.classList.add("is-warning");
    } else {
      option.classList.add("is-error");
    }
  }

  function setFirstFeedback(choice){
    const map = {
      manter: `
        <strong>Interpretação:</strong> manutenção automática da estratégia inicial.<br><br>
        <strong>Impacto clínico:</strong> ausência de ajuste diante de evidência microbiológica nova.<br><br>
        <strong>Consequência:</strong> uma decisão que era provisória pode transformar-se em erro persistente ao longo do tratamento.
      `,
      ajustar: `
        <strong>Interpretação:</strong> a decisão passa a incorporar evidência microbiológica direta.<br><br>
        <strong>Impacto clínico:</strong> aumento da precisão terapêutica e melhor coerência entre microrganismo, resistência e estratégia adotada.<br><br>
        <strong>Consequência:</strong> a conduta deixa de depender apenas de probabilidade e passa a responder ao risco microbiológico real.
      `,
      ampliar: `
        <strong>Interpretação:</strong> ampliação do espectro sem direcionamento microbiológico específico.<br><br>
        <strong>Impacto clínico:</strong> aumento de exposição antimicrobiana sem garantia proporcional de benefício.<br><br>
        <strong>Consequência:</strong> maior risco de toxicidade, desequilíbrio ecológico e seleção de resistência.
      `
    };

    feedback.innerHTML = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      "permanecer-amplo": `
        <strong>Interpretação:</strong> manutenção automática de esquema amplo por sensação de segurança.<br><br>
        <strong>Impacto clínico:</strong> prolonga exposição desnecessária quando os dados já permitem reavaliar proporcionalidade.<br><br>
        <strong>Consequência:</strong> amplia riscos sem substituir adequação terapêutica.
      `,
      "reavaliar-espectro": `
        <strong>Interpretação:</strong> o espectro é reinterpretado à luz da suscetibilidade identificada e da evolução clínica.<br><br>
        <strong>Impacto clínico:</strong> melhora a proporcionalidade da terapia e reduz exposição antimicrobiana desnecessária.<br><br>
        <strong>Consequência:</strong> mantém coerência entre precisão microbiológica e racionalidade terapêutica.
      `,
      associar: `
        <strong>Interpretação:</strong> associação de novos agentes sem relação definida com o perfil microbiológico.<br><br>
        <strong>Impacto clínico:</strong> aumenta complexidade terapêutica, toxicidade e pressão seletiva.<br><br>
        <strong>Consequência:</strong> mais antibacterianos não significam, por si só, melhor tratamento.
      `
    };

    feedbackFinal.innerHTML = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p84-option");
    const next = event.target.closest(".cap10-p84-next");

    if(option){
      const choice = option.dataset.p84Choice;
      lockGroup(option);
      markOption(option, choice);

      if(choice === "manter" || choice === "ajustar" || choice === "ampliar"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "permanecer-amplo" || choice === "reavaliar-espectro" || choice === "associar"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p84Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 85 — SIMULAÇÃO 2 (COBRIR, REAVALIAR E SIMPLIFICAR)
   ===================================================== */

(function initPage85Simulation(){
  const root = document.querySelector("[data-cap10-p85]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p85-step"));
  const feedback = document.getElementById("cap10P85Feedback");
  const feedbackFinal = document.getElementById("cap10P85FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p85Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function lockGroup(option){
    const group = option.closest(".cap10-p85-options");
    if(!group) return;

    group.querySelectorAll(".cap10-p85-option").forEach((btn) => {
      btn.classList.add("is-locked");
    });
  }

  function markOption(option, choice){
    option.classList.add("is-selected");

    if(choice === "simplificar" || choice === "ajuste-proporcional"){
      option.classList.add("is-correct");
    } else if(choice === "manter-associacao" || choice === "cobertura-eterna"){
      option.classList.add("is-warning");
    } else {
      option.classList.add("is-error");
    }
  }

  function setFirstFeedback(choice){
    const map = {
      "manter-associacao": `
        <strong>Interpretação:</strong> manutenção automática da estratégia inicial ampliada.<br><br>
        <strong>Impacto clínico:</strong> ignora que a cobertura empírica inicial e sua manutenção prolongada obedecem a lógicas diferentes.<br><br>
        <strong>Consequência:</strong> a proteção inicial contra incerteza transforma-se em exposição desnecessária quando o risco microbiológico real já diminuiu.
      `,
      simplificar: `
        <strong>Interpretação:</strong> a estratégia passa a ser reavaliada à luz da melhora clínica e da suscetibilidade conhecida.<br><br>
        <strong>Impacto clínico:</strong> favorece proporcionalidade terapêutica, menor toxicidade e menor pressão seletiva.<br><br>
        <strong>Consequência:</strong> cobertura inicial adequada não precisa ser mantida automaticamente quando o cenário clínico e microbiológico muda.
      `,
      "ampliar-precaucao": `
        <strong>Interpretação:</strong> ampliação adicional do espectro sem novo fundamento microbiológico.<br><br>
        <strong>Impacto clínico:</strong> aumenta exposição e risco de dano sem benefício proporcional demonstrado.<br><br>
        <strong>Consequência:</strong> o raciocínio deixa de ser guiado por evidência e passa a ser guiado por excesso de precaução.
      `
    };

    feedback.innerHTML = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      "cobertura-eterna": `
        <strong>Interpretação:</strong> transforma gravidade inicial em justificativa permanente para manutenção de esquema amplo.<br><br>
        <strong>Impacto clínico:</strong> desconsidera toxicidade acumulada e mudança do risco microbiológico real.<br><br>
        <strong>Consequência:</strong> uma estratégia inicialmente proporcional passa a produzir mais dano do que benefício.
      `,
      "ajuste-proporcional": `
        <strong>Interpretação:</strong> a estratégia é reinterpretada conforme melhora clínica, suscetibilidade conhecida e sinais de toxicidade.<br><br>
        <strong>Impacto clínico:</strong> favorece equilíbrio entre eficácia, segurança e impacto ecológico.<br><br>
        <strong>Consequência:</strong> tratar com precisão significa reduzir excesso quando o risco real deixa de justificá-lo.
      `,
      "duplicar-seguranca": `
        <strong>Interpretação:</strong> associação prolongada sem novo ganho microbiológico demonstrado.<br><br>
        <strong>Impacto clínico:</strong> aumenta toxicidade, complexidade terapêutica e pressão seletiva.<br><br>
        <strong>Consequência:</strong> mais cobertura não equivale, automaticamente, a melhor tratamento.
      `
    };

    feedbackFinal.innerHTML = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p85-option");
    const next = event.target.closest(".cap10-p85-next");

    if(option){
      const choice = option.dataset.p85Choice;
      lockGroup(option);
      markOption(option, choice);

      if(choice === "manter-associacao" || choice === "simplificar" || choice === "ampliar-precaucao"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "cobertura-eterna" || choice === "ajuste-proporcional" || choice === "duplicar-seguranca"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p85Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 86 — SIMULAÇÃO 3 (TRATAR INFECÇÃO, NÃO COLONIZAÇÃO)
   ===================================================== */

(function initPage86Simulation(){
  const root = document.querySelector("[data-cap10-p86]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p86-step"));
  const feedback = document.getElementById("cap10P86Feedback");
  const feedbackFinal = document.getElementById("cap10P86FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p86Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function lockGroup(option){
    const group = option.closest(".cap10-p86-options");
    if(!group) return;

    group.querySelectorAll(".cap10-p86-option").forEach((btn) => {
      btn.classList.add("is-locked");
    });
  }

  function markOption(option, choice){
    option.classList.add("is-selected");

    if(choice === "avaliar" || choice === "sindrome"){
      option.classList.add("is-correct");
    } else if(choice === "repetir" || choice === "idade"){
      option.classList.add("is-warning");
    } else {
      option.classList.add("is-error");
    }
  }

  function setFirstFeedback(choice){
    const map = {
      tratar: `
        <strong>Interpretação:</strong> o crescimento bacteriano foi transformado diretamente em indicação de antibacteriano.<br><br>
        <strong>Impacto clínico:</strong> trata colonização estável como se fosse infecção urinária ativa.<br><br>
        <strong>Consequência:</strong> aumenta exposição desnecessária, risco de eventos adversos e pressão seletiva sem evidência suficiente de benefício.
      `,
      repetir: `
        <strong>Interpretação:</strong> a atenção permanece centrada no exame, e não na coerência clínica do achado.<br><br>
        <strong>Impacto clínico:</strong> um novo laudo pode reproduzir a mesma colonização sem resolver a ausência de síndrome compatível.<br><br>
        <strong>Consequência:</strong> a repetição laboratorial não substitui julgamento clínico.
      `,
      avaliar: `
        <strong>Interpretação:</strong> a decisão é construída a partir da relação entre microbiologia e síndrome clínica.<br><br>
        <strong>Impacto clínico:</strong> evita transformar bacteriúria assintomática em infecção tratável sem base suficiente.<br><br>
        <strong>Consequência:</strong> preserva coerência diagnóstica e reduz prescrição antimicrobiana desnecessária.
      `
    };

    feedback.innerHTML = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      laboratorio: `
        <strong>Interpretação:</strong> o número de colônias é tratado como critério suficiente para definir doença.<br><br>
        <strong>Impacto clínico:</strong> reduz a interpretação a um dado laboratorial isolado.<br><br>
        <strong>Consequência:</strong> favorece medicalização de colonização microbiológica estável.
      `,
      sindrome: `
        <strong>Interpretação:</strong> o achado microbiológico é reinterpretado à luz da presença real de síndrome infecciosa.<br><br>
        <strong>Impacto clínico:</strong> distingue colonização de infecção e melhora a precisão diagnóstica.<br><br>
        <strong>Consequência:</strong> evita tratar laudo isolado quando a plausibilidade clínica de infecção permanece baixa.
      `,
      idade: `
        <strong>Interpretação:</strong> a idade passa a funcionar como justificativa terapêutica independente da síndrome clínica.<br><br>
        <strong>Impacto clínico:</strong> amplia risco de antibacterianos desnecessários em um grupo já vulnerável a eventos adversos.<br><br>
        <strong>Consequência:</strong> precaução sem critério pode transformar vulnerabilidade em excesso terapêutico.
      `
    };

    feedbackFinal.innerHTML = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p86-option");
    const next = event.target.closest(".cap10-p86-next");

    if(option){
      const choice = option.dataset.p86Choice;
      lockGroup(option);
      markOption(option, choice);

      if(choice === "tratar" || choice === "repetir" || choice === "avaliar"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "laboratorio" || choice === "sindrome" || choice === "idade"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p86Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 87 — SIMULAÇÃO 4 (TEMPO E AJUSTE RESPONSÁVEL)
   ===================================================== */

(function initPage87Simulation(){
  const root = document.querySelector("[data-cap10-p87]");
  if(!root) return;

  const steps = Array.from(root.querySelectorAll(".cap10-p87-step"));
  const feedback = document.getElementById("cap10P87Feedback");
  const feedbackFinal = document.getElementById("cap10P87FeedbackFinal");

  if(!steps.length || !feedback || !feedbackFinal) return;

  function showStep(stepNumber){
    steps.forEach((step) => {
      const isTarget = step.dataset.p87Step === String(stepNumber);
      step.classList.toggle("is-active", isTarget);
      step.hidden = !isTarget;
    });
  }

  function lockGroup(option){
    const group = option.closest(".cap10-p87-options");
    if(!group) return;

    group.querySelectorAll(".cap10-p87-option").forEach((btn) => {
      btn.classList.add("is-locked");
    });
  }

  function markOption(option, choice){
    option.classList.add("is-selected");

    if(choice === "iniciar" || choice === "reavaliar-contexto"){
      option.classList.add("is-correct");
    } else if(choice === "observar" || choice === "falha-automatica"){
      option.classList.add("is-warning");
    } else {
      option.classList.add("is-error");
    }
  }

  function setFirstFeedback(choice){
    const map = {
      aguardar: `
        <strong>Interpretação:</strong> o início da terapia é adiado até que a microbiologia confirme o agente.<br><br>
        <strong>Impacto clínico:</strong> em neutropenia profunda, isso amplia a exposição ao risco de progressão precoce da infecção.<br><br>
        <strong>Consequência:</strong> a incerteza microbiológica não reduz o peso do tempo quando o hospedeiro é altamente vulnerável.
      `,
      iniciar: `
        <strong>Interpretação:</strong> a cobertura adequada é iniciada prontamente após a coleta das culturas.<br><br>
        <strong>Impacto clínico:</strong> reduz o risco associado ao atraso terapêutico em um contexto de alta vulnerabilidade.<br><br>
        <strong>Consequência:</strong> a resposta inicial reconhece que, em certos cenários, tempo e adequação precisam caminhar juntos desde o início.
      `,
      observar: `
        <strong>Interpretação:</strong> a decisão é adiada em busca de maior clareza clínica espontânea.<br><br>
        <strong>Impacto clínico:</strong> transfere para o tempo o custo da incerteza em um paciente com baixa tolerância ao atraso terapêutico.<br><br>
        <strong>Consequência:</strong> esperar mais pode parecer prudente, mas torna-se clinicamente arriscado em um hospedeiro de alto risco.
      `
    };

    feedback.innerHTML = map[choice] || "";
  }

  function setSecondFeedback(choice){
    const map = {
      "falha-automatica": `
        <strong>Interpretação:</strong> a persistência da febre é tratada como prova suficiente de falha terapêutica.<br><br>
        <strong>Impacto clínico:</strong> transforma um único sinal em gatilho automático para ampliação do espectro.<br><br>
        <strong>Consequência:</strong> a decisão passa a reagir à febre isoladamente, sem integrar estabilidade clínica e dados microbiológicos disponíveis.
      `,
      "reavaliar-contexto": `
        <strong>Interpretação:</strong> a febre persistente é analisada junto da evolução global do paciente e dos dados disponíveis até o momento.<br><br>
        <strong>Impacto clínico:</strong> evita escalada precipitada e preserva proporcionalidade terapêutica.<br><br>
        <strong>Consequência:</strong> a reavaliação clínica estruturada substitui reflexos automáticos de ampliação do espectro.
      `,
      "associar-rotina": `
        <strong>Interpretação:</strong> múltiplos agentes são associados como resposta padrão à persistência da febre.<br><br>
        <strong>Impacto clínico:</strong> aumenta exposição, toxicidade e pressão seletiva sem novo fundamento clínico ou microbiológico claro.<br><br>
        <strong>Consequência:</strong> a rotina de ampliar ou associar deixa de ser prudência e passa a ser excesso terapêutico.
      `
    };

    feedbackFinal.innerHTML = map[choice] || "";
  }

  root.addEventListener("click", (event) => {
    const option = event.target.closest(".cap10-p87-option");
    const next = event.target.closest(".cap10-p87-next");

    if(option){
      const choice = option.dataset.p87Choice;
      lockGroup(option);
      markOption(option, choice);

      if(choice === "aguardar" || choice === "iniciar" || choice === "observar"){
        setFirstFeedback(choice);
        showStep(2);
        return;
      }

      if(choice === "falha-automatica" || choice === "reavaliar-contexto" || choice === "associar-rotina"){
        setSecondFeedback(choice);
        showStep(4);
        return;
      }
    }

    if(next){
      const target = next.dataset.p87Next;
      if(target){
        showStep(target);
      }
    }
  });

  showStep(1);
})();
/* =====================================================
   CAPÍTULO 10
   PÁGINA 88 — SÍNTESE DA DECISÃO EM ANTIBIOTICOTERAPIA
   ===================================================== */

(function initPage88Flow(){
  const root = document.querySelector(".cap10-page88 .cap10-p88-flow");
  if(!root) return;

  const nodes = Array.from(root.querySelectorAll(".cap10-p88-node"));
  const eyebrow = document.getElementById("cap10P88FlowEyebrow");
  const title = document.getElementById("cap10P88FlowTitle");
  const text = document.getElementById("cap10P88FlowText");
  const impact = document.getElementById("cap10P88FlowImpact");

  if(!nodes.length || !eyebrow || !title || !text || !impact) return;

  const content = {
    plausibilidade: {
      eyebrow: "Pergunta decisória em foco",
      title: "Há plausibilidade de infecção bacteriana?",
      text: "A decisão não começa no antibacteriano. Ela começa na interpretação clínica do caso. Antes de prescrever, é necessário perguntar se há coerência entre síndrome apresentada, achados clínicos e possibilidade real de infecção bacteriana ativa.",
      impact: "Quando essa etapa é negligenciada, aumenta o risco de tratar colonização, contaminação ou quadros não bacterianos como se fossem infecção verdadeira."
    },
    gravidade: {
      eyebrow: "Pergunta decisória em foco",
      title: "Qual é a gravidade do quadro e a vulnerabilidade do hospedeiro?",
      text: "A gravidade e as características do hospedeiro determinam a tolerância ao atraso terapêutico e ao erro inicial. Um mesmo grau de incerteza não tem o mesmo peso em um paciente estável e em um paciente altamente vulnerável.",
      impact: "Ignorar esse ponto pode levar tanto a atraso terapêutico em cenários graves quanto a ampliação desproporcional em situações de menor risco."
    },
    inicio: {
      eyebrow: "Pergunta decisória em foco",
      title: "É necessário iniciar antibacteriano agora?",
      text: "Em alguns cenários, o risco da espera supera o risco da incerteza. Em outros, a melhor decisão pode ser não iniciar antibacteriano naquele momento. A prescrição racional depende de reconhecer essa diferença.",
      impact: "Iniciar quando não é necessário expõe o paciente a dano evitável; não iniciar quando o risco é alto pode comprometer desfechos clínicos."
    },
    cobertura: {
      eyebrow: "Pergunta decisória em foco",
      title: "Que cobertura inicial é proporcional ao risco microbiológico real?",
      text: "A escolha empírica deve ser suficiente para cobrir os agentes prováveis em função do sítio infeccioso, da gravidade, do hospedeiro e do contexto epidemiológico, sem transformar incerteza em ampliação indiscriminada do espectro.",
      impact: "O problema não é apenas cobrir pouco, mas também cobrir demais quando isso não traz ganho proporcional."
    },
    dados: {
      eyebrow: "Pergunta decisória em foco",
      title: "Quais novos dados clínicos e microbiológicos surgiram?",
      text: "Evolução clínica, culturas, identificação do microrganismo, perfil de suscetibilidade e sinais de toxicidade modificam o significado da decisão inicial. O tratamento em curso precisa ser reinterpretado à luz desses dados.",
      impact: "Sem integrar informação nova, uma estratégia provisória tende a persistir por inércia."
    },
    reavaliacao: {
      eyebrow: "Pergunta decisória em foco",
      title: "A estratégia precisa ser mantida, ajustada, simplificada ou suspensa?",
      text: "Reavaliar não significa apenas trocar um fármaco por outro. Pode significar manter, descalonar, reduzir espectro, suspender ou redefinir completamente a interpretação diagnóstica do caso.",
      impact: "A qualidade da antibioticoterapia depende tanto da decisão inicial quanto da capacidade de corrigir sua trajetória."
    },
    impacto: {
      eyebrow: "Pergunta decisória em foco",
      title: "Qual é o impacto individual e coletivo da decisão tomada?",
      text: "Toda prescrição afeta o paciente em termos de benefício, toxicidade e exposição desnecessária, mas também afeta o ecossistema microbiológico e a eficácia futura das terapias antimicrobianas.",
      impact: "Antibioticoterapia racional é sempre clínica e, ao mesmo tempo, ecológica."
    }
  };

  function activate(key){
    const item = content[key];
    if(!item) return;

    nodes.forEach((node) => {
      const active = node.dataset.p88Node === key;
      node.classList.toggle("is-active", active);
      node.setAttribute("aria-pressed", active ? "true" : "false");
    });

    eyebrow.textContent = item.eyebrow;
    title.textContent = item.title;
    text.textContent = item.text;
    impact.textContent = item.impact;
  }

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      activate(node.dataset.p88Node);
    });
  });

  activate("plausibilidade");
})();
/* =====================================================
   PÁGINA FINAL PREMIUM
   ===================================================== */

(function initFinalPage(){
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(prefersReducedMotion){
    document.querySelectorAll(".final-prose p, .final-quote-block, .final-mark").forEach((el) => {
      el.style.animation = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    });
  }
})();