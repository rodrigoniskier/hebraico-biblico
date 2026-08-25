window.MANUAL_ANALYSES=window.MANUAL_ANALYSES||{};

function reviewedAnalysis(p){return window.MANUAL_ANALYSES?.[String(p.n)]||null}
function araPsalmUrl(n){return `https://www.bible.com/pt/bible/1608/PSA.${n}.ARA`}
function araVerseUrl(n,v){return `https://www.bible.com/pt/bible/1608/PSA.${n}.${v}.ARA`}
function simpleEsc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function manualList(items){return items?.length?`<ul>${items.map(x=>`<li>${simpleEsc(x)}</li>`).join("")}</ul>`:""}
function manualSources(a){return a.sources?.length?`<div class="source-note"><b>Base usada nesta revisão:</b> ${a.sources.map(simpleEsc).join(" · ")}</div>`:""}
function manualScanTable(scans){
  if(!scans.length) return `<p class="error">A tabela de linhas aparece quando o Texto Massorético é carregado.</p>`;
  return `<div class="table-wrap"><table class="scan-table"><thead><tr><th>linha hebraica</th><th>partes</th><th>unidades</th><th>vogais gráficas</th><th>padrão</th></tr></thead><tbody>${scans.map(s=>`<tr><td>${s.verse}</td><td class="rtl">${s.cola.map(stripMarks).join(" // ")}</td><td>${s.counts.join(" + ")}</td><td>${s.syllables.join(" + ")}</td><td class="pattern">${s.pattern}</td></tr>`).join("")}</tbody></table></div>`;
}
function renderReviewedSteps(p,a,scans,dom,dev){
  const scanTable=manualScanTable(scans);
  $("steps").innerHTML=a.steps.map((step,i)=>{
    let extra="";
    if(step.n===1) extra=`<p class="copyright-note"><b>ARA:</b> por direitos autorais, o texto integral não é copiado para o repositório. <a href="${araPsalmUrl(p.n)}" target="_blank" rel="noopener">Leia este Salmo na ARA em fonte licenciada ↗</a></p>`;
    if(step.n===2) extra=`<p><a class="btn" href="${cantillationUrl(p.n)}" target="_blank" rel="noopener">▶ Ouvir cantilação hebraica no YouTube</a></p>`;
    if(step.n===5) extra=`${scanTable}<p><b>Padrão mais frequente calculado:</b> <span class="pattern">${dom}</span>. <b>Linhas que fogem dele:</b> ${dev.length?simpleEsc(dev.join("; ")):"nenhuma nesta contagem automática"}. A interpretação abaixo é a parte revisada manualmente; a tabela é apenas uma ajuda de contagem.</p>`;
    return `<article class="step ${i<2?"open":""}"><button class="step-toggle"><span class="step-no">${step.n}</span><span class="step-title">${simpleEsc(step.label)}<small>${simpleEsc(step.technical)}</small></span>${evidence("revisado 1–30","ev-source")}</button><div class="step-content"><p>${simpleEsc(step.body)}</p>${manualList(step.items)}${extra}${step.n===12?manualSources(a):""}</div></article>`;
  }).join("");
  document.querySelectorAll(".step-toggle").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"));
}
function renderReviewedTheology(a){
  $("theology").innerHTML=a.theology.map(x=>`<li>${simpleEsc(x)}</li>`).join("");
}
function renderReviewedHomiletic(a){
  const s=a.sermon;
  $("homiletic").innerHTML=`<div class="thesis"><b>Ideia central:</b> ${simpleEsc(s.idea)}</div><div class="movement need"><b>Problema humano que o texto confronta</b><span>${simpleEsc(s.need)}</span></div>${s.movements.map((m,i)=>`<div class="movement"><b>${i+1}. ${simpleEsc(m.title)}</b><span>${simpleEsc(m.vv)} — ${simpleEsc(m.point)}</span></div>`).join("")}<div class="movement pivot"><b>Ponto de maior força</b><span>${simpleEsc(s.climax)}</span></div><div class="movement"><b>Como o evangelho entra sem forçar o texto</b><span>${simpleEsc(s.gospel)}</span></div><div class="movement"><b>Aplicações</b><span>${simpleEsc(s.applications.join(" · "))}</span></div>`;
}
