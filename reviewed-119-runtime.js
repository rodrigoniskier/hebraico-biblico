// Integra o Salmo 119 como etapa própria e acrescenta seu mapa acróstico sem alterar o motor-base.
(function(){
  if(typeof analysisTitleVerseCount!=="function" || !window.MANUAL_ANALYSES?.['119']) return;

  const previousReviewedSteps=renderReviewedSteps;
  renderReviewedSteps=function(p,a,scans,dom,dev){
    previousReviewedSteps(p,a,scans,dom,dev);
    if(p.n!==119 || !a.psalm119 || typeof document==='undefined') return;
    const articles=document.querySelectorAll?.('#steps .step')||[];
    const termsTarget=articles[6]?.querySelector?.('.step-content');
    if(termsTarget){
      const rows=a.psalm119.torahTerms.map(([heb,trans,sense])=>`<tr><td class="rtl">${simpleEsc(heb)}</td><td>${simpleEsc(trans)}</td><td>${simpleEsc(sense)}</td></tr>`).join('');
      termsTarget.insertAdjacentHTML?.('beforeend',`<h4>Os oito termos recorrentes da instrução divina</h4><div class="table-wrap"><table class="scan-table"><thead><tr><th>hebraico</th><th>termo</th><th>sentido básico</th></tr></thead><tbody>${rows}</tbody></table></div>`);
    }
    const stropheTarget=articles[7]?.querySelector?.('.step-content');
    if(stropheTarget){
      const cards=a.psalm119.letters.map(([heb,name,vv,theme])=>`<div class="movement"><b><span class="hebrew" style="font-size:1.1rem">${simpleEsc(heb)}</span> ${simpleEsc(name)} · vv. ${simpleEsc(vv)}</b><span>${simpleEsc(theme)}</span></div>`).join('');
      stropheTarget.insertAdjacentHTML?.('beforeend',`<h4>Mapa completo das 22 estrofes</h4><div class="structure">${cards}</div><p class="source-note"><b>Plano sugerido de leitura:</b> ${simpleEsc(a.psalm119.readingPlan)}</p>`);
    }
  };

  const previousHebrew=renderHebrew;
  renderHebrew=function(source){
    previousHebrew(source);
    if($("hebrewPanel")) $("hebrewPanel").innerHTML=$("hebrewPanel").innerHTML.replace(/Salmos 1–118/g,'Salmos 1–119');
  };

  const previousRenderSteps=renderSteps;
  renderSteps=function(){
    previousRenderSteps();
    const p=PSALMS[current-1];
    if(!reviewedAnalysis(p) && $("steps")) {
      $("steps").innerHTML=$("steps").innerHTML
        .replace(/Salmos 119–150/g,'Salmos 120–150')
        .replace(/Salmos 91–150/g,'Salmos 120–150');
    }
  };

  const legend=document.querySelector?.('.review-legend');
  if(legend) legend.innerHTML='<b>✓</b> = análise completa já revisada. Nesta etapa: Salmos 1–119.';
  const notice=document.querySelector?.('.notice');
  if(notice) notice.innerHTML='<strong>Revisão em etapas.</strong> Os Salmos 1–119 agora têm os 12 passos trabalhados manualmente. O Salmo 119 recebeu tratamento próprio para suas 22 estrofes de oito versos e 176 versículos. Os Salmos 120–150 continuam preliminares.';

  if(typeof current==='number' && typeof selectPsalm==='function') selectPsalm(current);
})();

// Etapa final: carrega Salmos 120–150, o registro auditado de fontes e o runtime que conclui o Saltério.
(function loadReviewed120to150(){
  if(window.MANUAL_ANALYSES?.['120'] || typeof document==='undefined') return;
  const src=document.currentScript?.src||'';
  const base=src?src.slice(0,src.lastIndexOf('/')+1):'/';
  const files=['analysis-120-130.js','analysis-131-140.js','analysis-141-150.js','source-registry.js','reviewed-120-150-runtime.js'];
  if(typeof document.write!=='function') throw new Error('Não foi possível carregar a camada revisada dos Salmos 120–150.');
  document.write(files.map(file=>`<script src="${base}${file}"><\/script>`).join(''));
})();
