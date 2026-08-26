window.MANUAL_ANALYSES=window.MANUAL_ANALYSES||{};

function reviewedAnalysis(p){return window.MANUAL_ANALYSES?.[String(p.n)]||null}
function araPsalmUrl(n){return `https://www.bible.com/pt/bible/1608/PSA.${n}.ARA`}
function araVerseUrl(n,v){return `https://www.bible.com/pt/bible/1608/PSA.${n}.${v}.ARA`}
function simpleEsc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function manualList(items){return items?.length?`<ul>${items.map(x=>`<li>${simpleEsc(x)}</li>`).join("")}</ul>`:""}
function manualSources(a){
  if(!a.sources?.length) return "";
  if(typeof auditAnalysisSources!=="function") return `<div class="source-note"><b>Base usada nesta revisão:</b> ${a.sources.map(simpleEsc).join(" · ")}</div>`;
  const audited=auditAnalysisSources(a);
  const chips=audited.map(d=>{
    const cls=d.id==="unknown"?"badge red":"badge green";
    const text=`${d.id==="unknown"?"⚠":"✓"} ${d.label} · ${d.type}`;
    return d.url?`<a class="${cls}" href="${simpleEsc(d.url)}" target="_blank" rel="noopener noreferrer" title="${simpleEsc(d.note)}">${simpleEsc(text)} ↗</a>`:`<span class="${cls}" title="${simpleEsc(d.note)}">${simpleEsc(text)}</span>`;
  }).join("");
  return `<div class="source-note"><b>Fontes e proveniência auditada</b><p class="small">✓ = fonte catalogada/confirmada no registro do projeto; referências bíblicas são tratadas como fonte canônica. O rótulo abaixo mostra a função de cada fonte na análise.</p><div class="badges">${chips}</div></div>`;
}
function analysisTitleVerseCount(a){
  if(Number.isInteger(a?.titleVerses)) return Math.max(0,a.titleVerses);
  return a?.titleVerse?1:0;
}
function manualVerseLabel(a,index){
  const offset=analysisTitleVerseCount(a);
  if(index<offset) return offset===1?"título":`título ${index+1}`;
  return String(index-offset+1);
}
function manualScanTable(scans,a){
  if(!scans.length) return `<p class="error">A tabela de linhas aparece quando o Texto Massorético é carregado.</p>`;
  return `<div class="table-wrap"><table class="scan-table"><thead><tr><th>v.</th><th>partes da linha</th><th>unidades</th><th>vogais gráficas</th><th>padrão</th></tr></thead><tbody>${scans.map((s,i)=>`<tr><td>${manualVerseLabel(a,i)}</td><td class="rtl">${s.cola.map(stripMarks).join(" // ")}</td><td>${s.counts.join(" + ")}</td><td>${s.syllables.join(" + ")}</td><td class="pattern">${s.pattern}</td></tr>`).join("")}</tbody></table></div>`;
}
function renderReviewedSteps(p,a,scans,dom,dev){
  const scanTable=manualScanTable(scans,a);
  $("steps").innerHTML=a.steps.map((step,i)=>{
    let extra="";
    if(step.n===1) extra=`<p class="copyright-note"><b>Tradução ARA:</b> a ARA é uma tradução protegida por direitos autorais. Para manter o projeto juridicamente íntegro, o texto integral não é republicado no código. <a href="${araPsalmUrl(p.n)}" target="_blank" rel="noopener noreferrer">Leia o Salmo ${p.n} na ARA em fonte licenciada ↗</a>. Ao lado de cada versículo hebraico há também um atalho direto para o versículo correspondente na ARA.</p>`;
    if(step.n===2) extra=`<p><a class="btn" href="${cantillationUrl(p.n)}" target="_blank" rel="noopener noreferrer">▶ Ouvir cantilação hebraica no YouTube</a></p>`;
    if(step.n===5) extra=`${scanTable}<p><b>Padrão mais frequente nas linhas do poema:</b> <span class="pattern">${dom}</span>. <b>Linhas que fogem dele:</b> ${dev.length?simpleEsc(dev.join("; ")):"nenhuma nesta contagem automática"}. A tabela ajuda a enxergar a forma; a interpretação é a análise revisada manualmente acima e abaixo dela.</p>`;
    return `<article class="step ${i<2?"open":""}"><button class="step-toggle" type="button" aria-expanded="${i<2?"true":"false"}"><span class="step-no">${step.n}</span><span class="step-title">${simpleEsc(step.label)}<small>${simpleEsc(step.technical)}</small></span>${evidence("análise revisada","ev-source")}</button><div class="step-content"><p>${simpleEsc(step.body)}</p>${manualList(step.items)}${extra}${step.n===12?manualSources(a):""}</div></article>`;
  }).join("");
  document.querySelectorAll(".step-toggle").forEach(b=>b.onclick=()=>{const article=b.parentElement;article.classList.toggle("open");b.setAttribute("aria-expanded",article.classList.contains("open")?"true":"false")});
}
function renderReviewedTheology(a){
  $("theology").innerHTML=a.theology.map(x=>`<li>${simpleEsc(x)}</li>`).join("");
}
function renderReviewedHomiletic(a){
  const s=a.sermon;
  $("homiletic").innerHTML=`<div class="thesis"><b>Ideia central:</b> ${simpleEsc(s.idea)}</div><div class="movement need"><b>Necessidade humana que o texto expõe</b><span>${simpleEsc(s.need)}</span></div>${s.movements.map((m,i)=>`<div class="movement"><b>${i+1}. ${simpleEsc(m.title)}</b><span>${simpleEsc(m.vv)} — ${simpleEsc(m.point)}</span></div>`).join("")}<div class="movement pivot"><b>Ponto de maior força do Salmo</b><span>${simpleEsc(s.climax)}</span></div><div class="movement"><b>Como o texto chega a Cristo</b><span>${simpleEsc(s.gospel)}</span></div><div class="movement"><b>Aplicações pastorais</b><span>${simpleEsc(s.applications.join(" · "))}</span></div>`;
}