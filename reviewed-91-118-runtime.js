// Integra a quarta etapa revisada, preservando o motor e a cadeia de carregamento já validados.
(function(){
  if(typeof analysisTitleVerseCount!=="function") return;

  poemScansFor=function(a,scans){return scans.slice(analysisTitleVerseCount(a));};
  verseCountFor=function(a,verses){return Math.max(0,verses.length-analysisTitleVerseCount(a));};

  renderHebrew=function(source){
    const p=PSALMS[current-1], a=reviewedAnalysis(p), scans=currentVerses.map(scanVerse), titleCount=analysisTitleVerseCount(a), poemScans=poemScansFor(a,scans), dom=dominantPattern(poemScans);
    $("verseMetric").textContent=verseCountFor(a,currentVerses);
    const intro=a
      ? `<div class="small"><b>Texto hebraico:</b> ${simpleEsc(source)}. Para os Salmos 1–118, a interpretação dos 12 passos foi revisada manualmente. A separação visual das linhas usa os acentos massoréticos como primeira hipótese e a análise explica onde sintaxe, paralelismo e estrutura confirmam o resultado. <b>ARA:</b> use o botão ao lado de cada versículo para abrir a tradução licenciada.</div>`
      : `<div class="small">Fonte: ${simpleEsc(source)}. A separação das linhas abaixo é uma proposta automática conservadora e precisa ser conferida pela sintaxe e pelo sentido.</div>`;
    $("hebrewPanel").innerHTML=intro+currentVerses.map((v,i)=>{
      const s=scans[i], isTitle=!!(a&&i<titleCount), label=a?manualVerseLabel(a,i):String(i+1), araV=isTitle?null:(a?i-titleCount+1:i+1);
      const araLink=araV?`<a class="verse-ara" href="${araVerseUrl(current,araV)}" target="_blank" rel="noopener noreferrer" title="Abrir Salmo ${current}.${araV} na ARA">ARA ↗</a>`:`<span class="verse-title-note">sobrescrição</span>`;
      return `<div class="verse ${isTitle?'superscription':''}"><div class="verse-tools"><span class="verse-num">${label}</span>${a?araLink:""}</div><div class="hebrew">${v}</div><div class="cola-grid">${s.cola.map((c,j)=>`<div class="colon"><div class="hebrew">${c}</div><div class="colon-meta"><span>parte ${String.fromCharCode(65+j)}</span><span>${s.words[j]} palavras/unidades aprox.</span><span>${s.syllables[j]} núcleos vocálicos</span></div></div>`).join("")}</div>${isTitle?'':`<div class="colon-meta"><span class="pattern">${s.pattern}</span>${s.pattern===dom?'<span>padrão recorrente nesta leitura</span>':'<span>mudança de tamanho a comparar com o sentido</span>'}</div>`}</div>`;
    }).join("");
    renderSteps();renderHomiletic();
  };

  const previousRenderSteps=renderSteps;
  renderSteps=function(){
    previousRenderSteps();
    const p=PSALMS[current-1];
    if(!reviewedAnalysis(p) && $("steps")) {
      $("steps").innerHTML=$("steps").innerHTML
        .replace(/Salmos 31–150/g,"Salmos 119–150")
        .replace(/Salmos 61–150/g,"Salmos 119–150")
        .replace(/Salmos 91–150/g,"Salmos 119–150");
    }
  };

  const legend=document.querySelector?.(".review-legend");
  if(legend) legend.innerHTML='<b>✓</b> = análise completa já revisada. Nesta etapa: Salmos 1–118. O Salmo 119 será analisado separadamente.';
  const notice=document.querySelector?.(".notice");
  if(notice) notice.innerHTML='<strong>Revisão em etapas.</strong> Os Salmos 1–118 agora têm os 12 passos trabalhados manualmente, com linguagem mais simples e uma leitura histórico-gramatical-teológica reformada. O Salmo 119 permanece propositalmente preliminar porque receberá uma revisão exclusiva devido ao seu acróstico de 22 estrofes e 176 versículos. Os Salmos 120–150 continuam preliminares.';

  if(typeof current==="number" && typeof selectPsalm==="function") selectPsalm(current);
})();

// Etapa exclusiva: carrega a análise do Salmo 119 e seu runtime especializado.
(function loadReviewed119(){
  if(window.MANUAL_ANALYSES?.["119"] || typeof document==="undefined") return;
  const src=document.currentScript?.src||"";
  const base=src?src.slice(0,src.lastIndexOf("/")+1):"/";
  const files=["analysis-119.js","reviewed-119-runtime.js"];
  if(typeof document.write!=="function") throw new Error("Não foi possível carregar a camada revisada do Salmo 119.");
  document.write(files.map(file=>`<script src="${base}${file}"><\/script>`).join(""));
})();
