function renderList(){
  const q=$("search").value.toLowerCase().trim(), bf=$("bookFilter").value, gf=$("genreFilter").value;
  const list=PSALMS.filter(p=>(!bf||p.book===bf)&&(!gf||p.genres.includes(gf))&&(!q||`${p.n} ${p.title} ${p.genres.join(" ")}`.toLowerCase().includes(q)));
  $("psalmList").innerHTML=list.map(p=>`<button class="psalm-item ${p.n===current?"active":""}" data-n="${p.n}"><strong>${p.n}</strong><span>${p.title}${reviewedAnalysis(p)?'<em>✓</em>':''}</span></button>`).join("");
  document.querySelectorAll(".psalm-item").forEach(b=>b.onclick=()=>{selectPsalm(+b.dataset.n);$("side").classList.remove("open")});
}
function fillGenreFilter(){
  const all=[...new Set(PSALMS.flatMap(p=>p.genres))].sort();
  $("genreFilter").innerHTML=`<option value="">Todos os gêneros</option>`+all.map(g=>`<option>${g}</option>`).join("");
}
function badge(text,cls=""){return `<span class="badge ${cls}">${text}</span>`}
function evidence(label,type){return `<span class="evidence ${type}">${label}</span>`}
function poemScansFor(a,scans){return a?.titleVerse?scans.slice(1):scans}
function verseCountFor(a,verses){return Math.max(0,verses.length-(a?.titleVerse?1:0))}

async function loadHebrew(n){
  $("hebrewPanel").innerHTML=`<div class="loading">Carregando o Texto Massorético do Salmo ${n}…</div>`;
  try{
    const r=await fetch(`/api/psalm?number=${n}`);
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    const data=await r.json();
    if(!Array.isArray(data.verses)||!data.verses.length) throw new Error("texto vazio");
    currentVerses=data.verses.map(stripHtml);
    renderHebrew(data.source||"Sefaria");
  }catch(e){
    currentVerses=[];
    $("hebrewPanel").innerHTML=`<div class="error">Não foi possível carregar o hebraico agora (${simpleEsc(e.message)}). A análise revisada continua disponível. Para conferir o original, consulte o Texto Massorético em Sefaria/Tanach.us/BHS/BHQ e tente novamente.</div>`;
    $("verseMetric").textContent="—";
    renderSteps();
    renderHomiletic();
  }
}
function renderHebrew(source){
  const p=PSALMS[current-1], a=reviewedAnalysis(p), scans=currentVerses.map(scanVerse), poemScans=poemScansFor(a,scans), dom=dominantPattern(poemScans);
  $("verseMetric").textContent=verseCountFor(a,currentVerses);
  const intro=a
    ? `<div class="small"><b>Texto hebraico:</b> ${simpleEsc(source)}. Para os Salmos 1–30, a interpretação dos 12 passos foi revisada manualmente. A separação visual das linhas usa os acentos massoréticos como primeira hipótese e a análise explica onde a sintaxe, o paralelismo e a estrutura confirmam o resultado. <b>ARA:</b> use o botão ao lado de cada versículo para abrir a tradução licenciada.</div>`
    : `<div class="small">Fonte: ${simpleEsc(source)}. A separação das linhas abaixo é uma proposta automática conservadora e precisa ser conferida pela sintaxe e pelo sentido.</div>`;
  $("hebrewPanel").innerHTML=intro+currentVerses.map((v,i)=>{
    const s=scans[i], isTitle=!!(a?.titleVerse&&i===0), label=a?manualVerseLabel(a,i):String(i+1), araV=isTitle?null:(a?(a.titleVerse?i:i+1):i+1);
    const araLink=araV?`<a class="verse-ara" href="${araVerseUrl(current,araV)}" target="_blank" rel="noopener noreferrer" title="Abrir Salmo ${current}.${araV} na ARA">ARA ↗</a>`:"<span class=\"verse-title-note\">sobrescrição</span>";
    return `<div class="verse ${isTitle?'superscription':''}"><div class="verse-tools"><span class="verse-num">${label}</span>${a?araLink:""}</div><div class="hebrew">${v}</div><div class="cola-grid">${s.cola.map((c,j)=>`<div class="colon"><div class="hebrew">${c}</div><div class="colon-meta"><span>parte ${String.fromCharCode(65+j)}</span><span>${s.words[j]} palavras/unidades aprox.</span><span>${s.syllables[j]} núcleos vocálicos</span></div></div>`).join("")}</div>${isTitle?'':`<div class="colon-meta"><span class="pattern">${s.pattern}</span>${s.pattern===dom?'<span>padrão recorrente nesta leitura</span>':'<span>mudança de tamanho a comparar com o sentido</span>'}</div>`}</div>`;
  }).join("");
  renderSteps();renderHomiletic();
}
function renderHeader(){
  const p=PSALMS[current-1], ex=EXEMPLARS[String(current)], a=reviewedAnalysis(p);
  $("canonLine").textContent=`LIVRO ${p.book} · SALMOS ${bookRange(p.book)}`;
  $("psalmTitle").textContent=`Salmo ${p.n}`;
  $("theme").textContent=p.title;
  $("bookMetric").textContent=p.book;
  $("genreMetric").textContent=primaryGenre(p).replace("Lamento ","Lam. ").replace("Misto / não indexado no Apêndice E","Misto");
  $("thesis").textContent=a?.steps?.find(s=>s.n===11)?.body||thesisFor(p);
  $("badges").innerHTML=(a?badge("12 passos revisados","green"):badge("análise preliminar","gold"))+p.genres.map(g=>badge(g,"green")).join("")+p.collections.map(c=>badge(c,"gold")).join("")+(NT_EXPLICIT.has(p.n)?badge("uso explícito no NT","red"):"")+(ex?badge("oficina no livro","gold"):"");
  $("formalBadges").innerHTML=p.formal.length?p.formal.map(f=>badge(f)).join(""):'<span class="small">Nenhum traço especial listado no índice formal do Apêndice E; isso não significa ausência de estrutura.</span>';
  if($("araBtn")){$("araBtn").href=araPsalmUrl(p.n);$("araBtn").title=`Abrir o Salmo ${p.n} completo na ARA`;}
  renderTheology();renderHomiletic();
}
function renderSteps(){
  const p=PSALMS[current-1], a=reviewedAnalysis(p), scans=currentVerses.map(scanVerse), poemScans=poemScansFor(a,scans), dom=dominantPattern(poemScans), dev=significantDeviations(poemScans);
  if(a){renderReviewedSteps(p,a,scans,dom,dev);return;}
  const ch=christologyFor(p), ex=EXEMPLARS[String(p.n)], st=inferredStrophes(p,currentVerses.length||Math.max(6,p.n===117?2:6));
  const scanTable=scans.length?`<div class="table-wrap"><table class="scan-table"><thead><tr><th>v.</th><th>partes</th><th>unidades</th><th>vogais</th><th>padrão</th></tr></thead><tbody>${scans.map(s=>`<tr><td>${s.verse}</td><td class="rtl">${s.cola.map(stripMarks).join(" // ")}</td><td>${s.counts.join(" + ")}</td><td>${s.syllables.join(" + ")}</td><td class="pattern">${s.pattern}</td></tr>`).join("")}</tbody></table></div>`:`<p class="error">A tabela aparece quando o hebraico é carregado.</p>`;
  const contents=[
    {t:"Confira o texto que será estudado",s:"Texto e variantes",html:`<p>Use o Texto Massorético como base e consulte BHS/BHQ, Qumran e versões antigas quando houver dificuldade. Esta etapa ainda não recebeu revisão integral para o Salmo ${p.n}.</p><p><a href="${araPsalmUrl(p.n)}" target="_blank" rel="noopener noreferrer">Abrir ARA licenciada ↗</a></p>`},
    {t:"Ouça o Salmo como poesia hebraica",s:"Leitura e cantilação",html:`<p>Ouça três vezes e marque pausas, repetições e mudanças de fôlego. <a href="${cantillationUrl(p.n)}" target="_blank" rel="noopener noreferrer">Ouvir cantilação no YouTube ↗</a></p>`},
    {t:"Veja onde cada verso se divide",s:"Cólons e acentos",html:`<p>A separação automática usa primeiro os acentos massoréticos. Ela é uma hipótese de trabalho e precisa de confirmação pelo sentido.</p>`},
    {t:"Confirme se as divisões fazem sentido",s:"Sintaxe e paralelismo",html:`<p>Confira se cada parte forma uma unidade gramatical e se a relação entre as linhas confirma a pausa. Registre qualquer divergência.</p>`},
    {t:"Observe o ritmo e as mudanças de tamanho",s:"Escansão",html:`${scanTable}<p>Padrão mais frequente nesta contagem: <span class="pattern">${dom}</span>. Uma mudança só ganha peso quando coincide com uma mudança clara de sentido.</p>`},
    {t:"Veja como uma linha responde à outra",s:"Paralelismo",html:`<p>Compare correspondências, diferenças, direção do avanço, mudanças gramaticais e ecos sonoros. Esta etapa requer revisão manual verso a verso.</p>`},
    {t:"Perceba repetições e imagens importantes",s:"Recursos poéticos",html:`<p>Traços já indexados: ${p.formal.length?p.formal.join(", "):"nenhum traço especial no índice"}. Procure ainda repetições, contrastes, elipses, merismos e jogos sonoros.</p>`},
    {t:"Separe os grandes blocos",s:"Estrofes",html:`<div class="structure">${st.map(x=>`<div class="movement"><b>${x.range} · ${x.label}</b><span>${x.criteria}</span></div>`).join("")}</div><p class="small">Esta divisão é preliminar até a revisão manual.</p>`},
    {t:"Veja o desenho do Salmo inteiro",s:"Macroestrutura",html:`<ul>${macroFor(p).map(x=>`<li>${x}</li>`).join("")}</ul>${ex?`<p><b>Ponto de virada sugerido pela oficina:</b> ${ex.pivot}.</p>`:""}`},
    {t:"Note o que foge do padrão",s:"Desvios significativos",html:`<p>${dev.length?`Mudanças automáticas: ${dev.join("; ")}.`:"Nenhuma mudança automática relevante foi calculada."} Só trate uma delas como significativa se o sentido mudar no mesmo lugar.</p>`},
    {t:"Resuma a mensagem em uma frase",s:"Proposição",html:`<div class="thesis">${thesisFor(p)}</div><p class="small">Proposição preliminar; os Salmos 31–150 serão revisados nas próximas etapas.</p>`},
    {t:"Coloque o Salmo no conjunto da Bíblia",s:"Cânon e Cristo",html:`<p><b>Livro ${p.book}</b> (${bookRange(p.book)}). Vizinhos: ${p.n>1?`Sl ${p.n-1}`:"início"} · ${p.n<150?`Sl ${p.n+1}`:"fim"}. Relação cristológica preliminar: ${ch.mode}. Uso no NT: ${ch.nt}.</p><p>Controle: sentido histórico-gramatical primeiro; depois situação canônica, teologia do pacto e uso do Novo Testamento, evitando moralismo e alegoria sem apoio textual.</p>`}
  ];
  $("steps").innerHTML=contents.map((x,i)=>`<article class="step ${i<2?"open":""}"><button class="step-toggle"><span class="step-no">${i+1}</span><span class="step-title">${x.t}<small>${x.s}</small></span>${evidence("preliminar","ev-editor")}</button><div class="step-content">${x.html}</div></article>`).join("");
  document.querySelectorAll(".step-toggle").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"));
}
function renderTheology(){
  const p=PSALMS[current-1], a=reviewedAnalysis(p);
  if(a){renderReviewedTheology(a);return;}
  const gs=p.genres.filter(g=>THEOLOGY[g]), seen=[];
  gs.slice(0,2).forEach(g=>THEOLOGY[g].forEach(x=>{if(!seen.includes(x))seen.push(x)}));
  if(!seen.length) seen.push(...THEOLOGY["Misto / não indexado no Apêndice E"]);
  const ch=christologyFor(p);seen.push(`Leitura cristológica preliminar: ${ch.mode}; ${ch.reason}.`);
  $("theology").innerHTML=seen.slice(0,6).map(x=>`<li>${x}</li>`).join("");
}
function renderHomiletic(){
  const p=PSALMS[current-1], a=reviewedAnalysis(p);
  if(a){renderReviewedHomiletic(a);return;}
  const s=sermonFor(p,currentVerses.length||6);
  $("homiletic").innerHTML=`<div class="thesis"><b>Ideia central preliminar:</b> ${s.idea}</div>${s.movements.map(m=>`<div class="movement"><b>${m.title}</b><span>${m.range}</span></div>`).join("")}<div class="movement pivot"><b>Ponto de maior força</b><span>${s.climax}</span></div><div class="movement"><b>Conclusão evangélica preliminar</b><span>${s.gospel}</span></div>`;
}
function selectPsalm(n){
  current=Math.min(150,Math.max(1,n));currentVerses=[];
  history.replaceState(null,"",`#salmo-${current}`);
  renderHeader();renderList();loadWorkshop();loadHebrew(current);
  window.scrollTo({top:0,behavior:"smooth"});
}
function workshopKey(){return `medida-louvor-${current}`}
function saveWorkshop(){
  const data={notes:$("notes").value,checks:["done1","done2","done3"].map(id=>$(id).checked)};
  localStorage.setItem(workshopKey(),JSON.stringify(data));updateProgress();
}
function loadWorkshop(){
  let d={notes:"",checks:[false,false,false]};try{d={...d,...JSON.parse(localStorage.getItem(workshopKey())||"{}")}}catch{}
  $("notes").value=d.notes||"";["done1","done2","done3"].forEach((id,i)=>$(id).checked=!!d.checks?.[i]);updateProgress();
}
function updateProgress(){
  const n=["done1","done2","done3"].filter(id=>$(id).checked).length;$("progressBar").style.width=`${n/3*100}%`;
}
function cantillationUrl(n){
  const query=`תהילים ${n} טעמי המקרא Tehillim ${n} cantillation Ta'amei Emet`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
function openCantillation(){window.open(cantillationUrl(current),"_blank","noopener,noreferrer")}
function init(){
  fillGenreFilter();
  ["search","bookFilter","genreFilter"].forEach(id=>$(id).addEventListener(id==="search"?"input":"change",renderList));
  $("prevBtn").onclick=()=>selectPsalm(current-1);$("nextBtn").onclick=()=>selectPsalm(current+1);
  $("readBtn").textContent="▶ Ouvir cantilação";$("readBtn").title="Abrir cantilação do Salmo atual no YouTube";$("readBtn").onclick=openCantillation;
  $("openSide").onclick=()=>$("side").classList.toggle("open");
  $("notes").addEventListener("input",saveWorkshop);["done1","done2","done3"].forEach(id=>$(id).addEventListener("change",saveWorkshop));
  const h=location.hash.match(/salmo-(\d+)/);selectPsalm(h?+h[1]:1);
}
init();
