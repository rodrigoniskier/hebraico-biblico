// Integra a etapa final: Salmos 120–150. O Saltério inteiro passa a usar a camada revisada.
(function(){
  if(typeof analysisTitleVerseCount!=="function" || !window.MANUAL_ANALYSES?.['150']) return;

  poemScansFor=function(a,scans){return scans.slice(analysisTitleVerseCount(a));};
  verseCountFor=function(a,verses){return Math.max(0,verses.length-analysisTitleVerseCount(a));};

  renderHebrew=function(source){
    const p=PSALMS[current-1], a=reviewedAnalysis(p), scans=currentVerses.map(scanVerse), titleCount=analysisTitleVerseCount(a), poemScans=poemScansFor(a,scans), dom=dominantPattern(poemScans);
    $("verseMetric").textContent=verseCountFor(a,currentVerses);
    const intro=a
      ? `<div class="small"><b>Texto hebraico:</b> ${simpleEsc(source)}. Os 150 Salmos têm os 12 passos revisados manualmente. A separação visual das linhas usa os acentos massoréticos como primeira hipótese; sintaxe, paralelismo e estrutura controlam a interpretação. <b>ARA:</b> use o botão ao lado de cada versículo para abrir a tradução licenciada.</div>`
      : `<div class="small">Fonte: ${simpleEsc(source)}. A separação das linhas é uma proposta automática conservadora.</div>`;
    $("hebrewPanel").innerHTML=intro+currentVerses.map((v,i)=>{
      const s=scans[i], isTitle=!!(a&&i<titleCount), label=a?manualVerseLabel(a,i):String(i+1), araV=isTitle?null:(a?i-titleCount+1:i+1);
      const araLink=araV?`<a class="verse-ara" href="${araVerseUrl(current,araV)}" target="_blank" rel="noopener noreferrer" title="Abrir Salmo ${current}.${araV} na ARA">ARA ↗</a>`:`<span class="verse-title-note">sobrescrição</span>`;
      return `<div class="verse ${isTitle?'superscription':''}"><div class="verse-tools"><span class="verse-num">${label}</span>${a?araLink:""}</div><div class="hebrew">${v}</div><div class="cola-grid">${s.cola.map((c,j)=>`<div class="colon"><div class="hebrew">${c}</div><div class="colon-meta"><span>parte ${String.fromCharCode(65+j)}</span><span>${s.words[j]} palavras/unidades aprox.</span><span>${s.syllables[j]} núcleos vocálicos</span></div></div>`).join("")}</div>${isTitle?'':`<div class="colon-meta"><span class="pattern">${s.pattern}</span>${s.pattern===dom?'<span>padrão recorrente nesta leitura</span>':'<span>mudança de tamanho a comparar com o sentido</span>'}</div>`}</div>`;
    }).join("");
    renderSteps();renderHomiletic();
  };

  // Não reescreva steps.innerHTML depois de renderReviewedSteps(): isso recria os botões
  // e remove os handlers de expansão. Reforçamos aqui o vínculo após cada renderização.
  function bindReviewedStepToggles(){
    if(typeof document==='undefined') return;
    document.querySelectorAll('#steps .step-toggle').forEach((b,i)=>{
      const article=b.parentElement;
      if(!article) return;
      const content=article.querySelector?.('.step-content');
      if(content){
        if(!content.id) content.id=`step-content-${current}-${i+1}`;
        b.setAttribute('aria-controls',content.id);
      }
      b.setAttribute('aria-expanded',article.classList.contains('open')?'true':'false');
      b.onclick=()=>{
        article.classList.toggle('open');
        b.setAttribute('aria-expanded',article.classList.contains('open')?'true':'false');
      };
    });
  }

  const previousRenderSteps=renderSteps;
  renderSteps=function(){
    previousRenderSteps();
    bindReviewedStepToggles();
  };

  function ensureProductionCredit(){
    if(typeof document==='undefined' || !document.body) return;
    let credit=document.getElementById?.('productionCredit');
    if(!credit){
      credit=document.createElement('div');
      credit.id='productionCredit';
      document.body.appendChild(credit);
    }
    credit.textContent='Desenvolvido por Rodrigo Niskier Ferreira Barbosa';
    credit.setAttribute?.('aria-label','Crédito de produção');
    Object.assign(credit.style,{
      position:'fixed',right:'12px',bottom:'10px',zIndex:'60',padding:'7px 10px',borderRadius:'999px',
      border:'1px solid #d8d2c3',background:'#fffdf7ee',color:'#667269',fontSize:'11px',lineHeight:'1.2',
      boxShadow:'0 4px 18px #17201816',backdropFilter:'blur(6px)',maxWidth:'calc(100vw - 24px)',textAlign:'center'
    });
  }

  const legend=document.querySelector?.('.review-legend');
  if(legend) legend.innerHTML='<b>✓</b> = análise completa revisada. Saltério completo: Salmos 1–150.';
  const notice=document.querySelector?.('.notice');
  if(notice) notice.innerHTML='<strong>Revisão completa.</strong> Os 150 Salmos têm os 12 passos trabalhados manualmente, com linguagem acessível e leitura histórico-gramatical-teológica reformada. As contagens rítmicas continuam descritivas e só recebem peso interpretativo quando convergem com o sentido do texto.';

  ensureProductionCredit();
  if(typeof current==='number' && typeof selectPsalm==='function') selectPsalm(current);
})();
