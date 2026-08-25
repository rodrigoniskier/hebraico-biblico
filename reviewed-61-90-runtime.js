// Integra a terceira etapa revisada, preservando o motor validado das etapas anteriores.
(function(){
  if(typeof analysisTitleVerseCount!=="function") return;

  poemScansFor=function(a,scans){return scans.slice(analysisTitleVerseCount(a));};
  verseCountFor=function(a,verses){return Math.max(0,verses.length-analysisTitleVerseCount(a));};

  renderHebrew=function(source){
    const p=PSALMS[current-1], a=reviewedAnalysis(p), scans=currentVerses.map(scanVerse), titleCount=analysisTitleVerseCount(a), poemScans=poemScansFor(a,scans), dom=dominantPattern(poemScans);
    $("verseMetric").textContent=verseCountFor(a,currentVerses);
    const intro=a
      ? `<div class="small"><b>Texto hebraico:</b> ${simpleEsc(source)}. Para os Salmos 1–90, a interpretação dos 12 passos foi revisada manualmente. A separação visual das linhas usa os acentos massoréticos como primeira hipótese e a análise explica onde sintaxe, paralelismo e estrutura confirmam o resultado. <b>ARA:</b> use o botão ao lado de cada versículo para abrir a tradução licenciada.</div>`
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
        .replace(/Salmos 31–150/g,"Salmos 91–150")
        .replace(/Salmos 61–150/g,"Salmos 91–150");
    }
  };

  const legend=document.querySelector?.(".review-legend");
  if(legend) legend.innerHTML='<b>✓</b> = análise completa já revisada. Nesta etapa: Salmos 1–90.';
  const notice=document.querySelector?.(".notice");
  if(notice) notice.innerHTML='<strong>Revisão em etapas.</strong> Os Salmos 1–90 agora têm os 12 passos trabalhados manualmente, com linguagem mais simples e uma leitura histórico-gramatical-teológica reformada. As contagens automáticas ajudam a enxergar a forma, mas não substituem a exegese. Os Salmos 91–150 continuam marcados como preliminares até receberem a mesma revisão.';

  if(typeof current==="number" && typeof selectPsalm==="function") selectPsalm(current);
})();

// Quarta etapa: carrega 91–118 do mesmo diretório/CDN antes de executar o runtime da faixa.
(function loadReviewed91to118(){
  if(window.MANUAL_ANALYSES?.["91"] || typeof document==="undefined") return;
  const src=document.currentScript?.src||"";
  const base=src?src.slice(0,src.lastIndexOf("/")+1):"/";
  const files=["analysis-91-100.js","analysis-101-110.js","analysis-111-118.js","reviewed-91-118-runtime.js"];
  if(typeof document.write!=="function") throw new Error("Não foi possível carregar a camada revisada dos Salmos 91–118.");
  document.write(files.map(file=>`<script src="${base}${file}"><\/script>`).join(""));
})();
