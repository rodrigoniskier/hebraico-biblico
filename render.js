function renderList(){
  const q=$("search").value.toLowerCase().trim(), bf=$("bookFilter").value, gf=$("genreFilter").value;
  const list=PSALMS.filter(p=>(!bf||p.book===bf)&&(!gf||p.genres.includes(gf))&&(!q||`${p.n} ${p.title} ${p.genres.join(" ")}`.toLowerCase().includes(q)));
  $("psalmList").innerHTML=list.map(p=>`<button class="psalm-item ${p.n===current?"active":""}" data-n="${p.n}"><strong>${p.n}</strong><span>${p.title}</span></button>`).join("");
  document.querySelectorAll(".psalm-item").forEach(b=>b.onclick=()=>{selectPsalm(+b.dataset.n);$("side").classList.remove("open")});
}
function fillGenreFilter(){
  const all=[...new Set(PSALMS.flatMap(p=>p.genres))].sort();
  $("genreFilter").innerHTML=`<option value="">Todos os gêneros</option>`+all.map(g=>`<option>${g}</option>`).join("");
}
function badge(text,cls=""){return `<span class="badge ${cls}">${text}</span>`}

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
    $("hebrewPanel").innerHTML=`<div class="error">Não foi possível carregar o hebraico agora (${e.message}). A análise estrutural editorial continua disponível; para os passos 1, 3 e 5, consulte o TM em Sefaria/Tanach.us/BHS/BHQ e recarregue.</div>`;
    $("verseMetric").textContent="—";
    renderSteps();
    renderHomiletic();
  }
}
function renderHebrew(source){
  const scans=currentVerses.map(scanVerse);
  const dom=dominantPattern(scans);
  $("verseMetric").textContent=currentVerses.length;
  $("hebrewPanel").innerHTML=`<div class="small">Fonte: ${source}. A divisão em cólons abaixo é uma <b>proposta automática conservadora</b>, conferida primeiro por ʾatnāḥ e outros disjuntivos; o passo 4 exige verificação sintática e semântica humana. Contagem silábica = núcleos vocálicos gráficos, portanto aproximada.</div>`+
  currentVerses.map((v,i)=>{
    const s=scans[i];
    return `<div class="verse"><span class="verse-num">${i+1}</span><div class="hebrew">${v}</div><div class="cola-grid">${s.cola.map((c,j)=>`<div class="colon"><div class="hebrew">${c}</div><div class="colon-meta"><span>cólon ${String.fromCharCode(97+j)}</span><span>${s.words[j]} palavras/unidades aprox.</span><span>${s.syllables[j]} núcleos vocálicos</span></div></div>`).join("")}</div><div class="colon-meta"><span class="pattern">${s.pattern}</span>${s.pattern===dom?'<span>padrão recorrente nesta leitura</span>':'<span>desvio a testar semanticamente</span>'}</div></div>`
  }).join("");
  renderSteps(); renderHomiletic();
}
function renderHeader(){
  const p=PSALMS[current-1], ex=EXEMPLARS[String(current)];
  $("canonLine").textContent=`LIVRO ${p.book} · SALMOS ${bookRange(p.book)}`;
  $("psalmTitle").textContent=`Salmo ${p.n}`;
  $("theme").textContent=p.title;
  $("bookMetric").textContent=p.book;
  $("genreMetric").textContent=primaryGenre(p).replace("Lamento ","Lam. ").replace("Misto / não indexado no Apêndice E","Misto");
  $("thesis").textContent=thesisFor(p);
  $("badges").innerHTML=p.genres.map(g=>badge(g,"green")).join("")+p.collections.map(c=>badge(c,"gold")).join("")+(NT_EXPLICIT.has(p.n)?badge("uso explícito no NT","red"):"")+(ex?badge("oficina no livro","gold"):"");
  $("formalBadges").innerHTML=p.formal.length?p.formal.map(f=>badge(f)).join(""):'<span class="small">Nenhum traço especial listado no índice formal do Apêndice E; isso não significa ausência de estrutura.</span>';
  renderTheology();
  renderHomiletic();
}
function evidence(label,type){return `<span class="evidence ${type}">${label}</span>`}
function renderSteps(){
  const p=PSALMS[current-1], scans=currentVerses.map(scanVerse), dom=dominantPattern(scans), dev=significantDeviations(scans), ch=christologyFor(p), ex=EXEMPLARS[String(p.n)];
  const st=inferredStrophes(p,currentVerses.length||Math.max(6, p.n===117?2:6));
  const scanTable=scans.length?`<div class="table-wrap"><table class="scan-table"><thead><tr><th>v.</th><th>cólons</th><th>unidades</th><th>núcleos vocálicos</th><th>padrão</th></tr></thead><tbody>${scans.map(s=>`<tr><td>${s.verse}</td><td class="rtl">${s.cola.map(stripMarks).join(" // ")}</td><td>${s.counts.join(" + ")}</td><td>${s.syllables.join(" + ")}</td><td class="pattern">${s.pattern}</td></tr>`).join("")}</tbody></table></div>`:`<p class="error">A escansão automática só aparece quando o TM é carregado.</p>`;
  const contents=[
    {t:"Estabeleça o texto",s:"TM, variantes e disciplina textual",ev:evidence("revisão de aparato","ev-review"),html:`<p><b>Texto-base:</b> Texto Massorético carregado do Sefaria quando disponível. O método exige comparar BHS/BHQ, Qumran e versões antigas quando houver variante relevante. <b>Nenhuma emenda é aceita só para “fechar” uma contagem.</b></p><p class="small">A ferramenta não inventa notas de aparato: onde uma variante não foi cadastrada, ela sinaliza a necessidade de consulta crítica.</p>${p.n===145?'<p><b>Nota conhecida:</b> o acróstico do Salmo 145 tem a questão do verso de nûn ausente no TM, com apoio em 11QPsᵃ, LXX e Peshitta; conferir o aparato antes de decidir.</p>':''}`},
    {t:"Leia em voz alta três vezes",s:"o ouvido precede a grade",ev:evidence("interativo","ev-calc"),html:`<p>Use o botão <b>“ler 3×”</b>. Quando o navegador dispõe de voz hebraica, ele vocaliza o texto; caso contrário, o contador ainda funciona como roteiro para acompanhar uma gravação externa.</p><p>Escute especialmente: comprimento comparável das linhas, pausas, retomadas, sons repetidos e mudanças de fôlego.</p>`},
    {t:"Delimite os cólons pelos acentos",s:"sillûq, ʿoleh we-yôrēd, ʾatnāḥ e disjuntivos",ev:evidence(scans.length?"calculado":"aguarda TM",scans.length?"ev-calc":"ev-review"),html:`<p>A proposta automática aparece sob cada versículo. Ela prioriza <b>ʾatnāḥ</b> e consulta disjuntivos poéticos para versos longos. O sôf pāsûq fecha o versículo.</p><p class="small">É uma primeira hipótese, não um oráculo: o passo seguinte pode confirmar ou corrigir a divisão.</p>`},
    {t:"Confirme pela sintaxe e pelo paralelismo",s:"coesão antes da contagem",ev:evidence("revisão humana","ev-review"),html:`<p>Teste cada fronteira: o cólon preserva um sintagma coeso? A divisão massorética coincide com a relação A // B? Se divergir, <b>registre a divergência e justifique</b> em vez de escondê-la.</p><p>Na oficina pessoal, anote as decisões que você alteraria na colometria automática.</p>`},
    {t:"Escanda",s:"acentos/unidades, sílabas e palavras",ev:evidence(scans.length?"calculado":"aguarda TM",scans.length?"ev-calc":"ev-review"),html:`${scanTable}<p><b>Padrão dominante nesta leitura:</b> <span class="pattern">${dom}</span>. A ferramenta trata o padrão como descrição estatística, nunca como metro gerador rígido.</p>`},
    {t:"Mapeie o paralelismo verso a verso",s:"cinco perguntas operacionais",ev:evidence("grade do livro","ev-source"),html:`<p>Para cada bicolo/tricolo, responda:</p><ol><li>Que elementos correspondem (A₁↔B₁ etc.)?</li><li>O que aparece em A sem correspondente em B — e vice-versa?</li><li>Em que direção B leva A: intensifica, especifica, conclui, contrasta ou completa?</li><li>Há mudança gramatical marcada: aspecto, pessoa, número ou voz?</li><li>Há eco sonoro?</li></ol><p class="small">A ferramenta mostra os cólons lado a lado; as correspondências semânticas não são preenchidas automaticamente para não simular uma análise lexical que não foi feita.</p>`},
    {t:"Identifique os recursos técnicos",s:"elipse, lastro, escada, terraço, quiasmo, merismo…",ev:evidence(p.formal.length?"índice + inspeção":"inspeção",p.formal.length?"ev-source":"ev-review"),html:`<p><b>Traços já indexados para este salmo:</b> ${p.formal.length?p.formal.join(", "):"nenhum dos traços especiais do Apêndice E foi marcado"}.</p><p>Procure ainda: elipse, variante de lastro, terraço, quiasmo, merismo, pares fixos, anáfora, epífora e paronomásia. Um recurso só deve receber peso interpretativo quando convergir com a semântica.</p>`},
    {t:"Delimite as estrofes",s:"exija convergência de pelo menos três critérios",ev:evidence("hipótese testável","ev-editor"),html:`<p>Critérios do método: <b>refrão, Selâ, mudança de pessoa, mudança de aspecto/campo semântico e inclusão</b>. Nenhum funciona sozinho.</p><div class="structure">${st.map(x=>`<div class="movement"><b>${x.range} · ${x.label}</b><span>${x.criteria}</span></div>`).join("")}</div><p class="small">Quando a divisão acima é inferida pelo gênero, ela é explicitamente uma hipótese de trabalho; substitua-a se o texto não fornecer três sinais convergentes.</p>`},
    {t:"Identifique a macroestrutura",s:"inclusão, quiasmo, refrão, painéis, pivô, acróstico",ev:evidence(p.formal.length||ex?"fonte + síntese":"teste aberto",p.formal.length||ex?"ev-source":"ev-review"),html:`<ul>${macroFor(p).map(x=>`<li>${x}</li>`).join("")}</ul>${ex?`<p><b>Eixo/clímax sugerido pela oficina:</b> ${ex.pivot}.</p>`:""}`},
    {t:"Localize os desvios e pergunte por quê",s:"o desvio vira interpretação apenas por convergência",ev:evidence(scans.length?"calculado + revisar":"aguarda TM",scans.length?"ev-calc":"ev-review"),html:`<p><b>Desvios rítmicos automáticos:</b> ${dev.length?dev.join("; "):scans.length?"nenhum desvio em relação ao padrão mais frequente nesta heurística":"indisponíveis sem o texto hebraico"}.</p><p>Agora aplique o teste decisivo: o desvio coincide com uma <b>articulação semântica identificável por razões independentes</b>? Se não, não o transforme em mensagem.</p>`},
    {t:"Formule a proposição do salmo",s:"uma frase que possa ser mapeada sobre a arquitetura",ev:evidence("síntese editorial","ev-editor"),html:`<div class="thesis">${thesisFor(p)}</div><p class="small">Esta é uma proposição editorial de trabalho, não uma citação do livro. O teste é rigoroso: se ela não puder ser mapeada sobre as estrofes e a macroestrutura que você confirmou, deve ser reescrita.</p>`},
    {t:"Situe canônica e cristologicamente",s:"cinco livros, vizinhos, NT e relação com Cristo",ev:evidence(NT_EXPLICIT.has(p.n)?"NT explícito + cânon":"cânon + síntese",NT_EXPLICIT.has(p.n)?"ev-source":"ev-editor"),html:`<p><b>Livro ${p.book}</b> (${bookRange(p.book)}). Vizinhos imediatos: ${p.n>1?`Sl ${p.n-1}`:"início do Saltério"} · ${p.n<150?`Sl ${p.n+1}`:"fim do Saltério"}.</p><p><b>Relação dominante:</b> ${ch.mode}. <b>Uso no NT:</b> ${ch.nt}.</p><p><b>Controle hermenêutico:</b> evitar tanto o moralismo exemplarista quanto a alegorização atomística. A conexão cristológica deve seguir a teologia do pacto, a função canônica e o uso do NT.</p>`}
  ];
  $("steps").innerHTML=contents.map((x,i)=>`<article class="step ${i<2?"open":""}"><button class="step-toggle"><span class="step-no">${i+1}</span><span class="step-title">${x.t}<small>${x.s}</small></span>${x.ev}</button><div class="step-content">${x.html}</div></article>`).join("");
  document.querySelectorAll(".step-toggle").forEach(b=>b.onclick=()=>b.parentElement.classList.toggle("open"));
}
function renderTheology(){
  const p=PSALMS[current-1], gs=p.genres.filter(g=>THEOLOGY[g]), seen=[];
  gs.slice(0,2).forEach(g=>THEOLOGY[g].forEach(x=>{if(!seen.includes(x))seen.push(x)}));
  if(!seen.length) seen.push(...THEOLOGY["Misto / não indexado no Apêndice E"]);
  const ch=christologyFor(p);
  seen.push(`Leitura cristológica controlada: ${ch.mode}; ${ch.reason}.`);
  $("theology").innerHTML=seen.slice(0,6).map(x=>`<li>${x}</li>`).join("");
}
function renderHomiletic(){
  const p=PSALMS[current-1], s=sermonFor(p,currentVerses.length||6);
  $("homiletic").innerHTML=`<div class="thesis"><b>Ideia central:</b> ${s.idea}</div>${s.movements.map(m=>`<div class="movement"><b>${m.title}</b><span>${m.range}</span></div>`).join("")}<div class="movement pivot"><b>Clímax</b><span>${s.climax}</span></div><div class="movement"><b>Conclusão evangélica</b><span>${s.gospel}</span></div>`;
}
function selectPsalm(n){
  current=Math.min(150,Math.max(1,n));currentVerses=[];speechCount=0;
  history.replaceState(null,"",`#salmo-${current}`);
  renderHeader();renderList();loadWorkshop();loadHebrew(current);
  window.scrollTo({top:0,behavior:"smooth"});
}
function workshopKey(){return `medida-louvor-${current}`}
function saveWorkshop(){
  const data={notes:$("notes").value,checks:["done1","done2","done3"].map(id=>$(id).checked)};
  localStorage.setItem(workshopKey(),JSON.stringify(data)); updateProgress();
}
function loadWorkshop(){
  let d={notes:"",checks:[false,false,false]};try{d={...d,...JSON.parse(localStorage.getItem(workshopKey())||"{}")}}catch{}
  $("notes").value=d.notes||"";["done1","done2","done3"].forEach((id,i)=>$(id).checked=!!d.checks?.[i]);updateProgress();
}
function updateProgress(){
  const n=["done1","done2","done3"].filter(id=>$(id).checked).length;$("progressBar").style.width=`${n/3*100}%`;
}
function speakHebrew(){
  speechCount=(speechCount%3)+1;
  $("readBtn").textContent=`▶ leitura ${speechCount}/3`;
  if(!currentVerses.length || !("speechSynthesis" in window)) return;
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(currentVerses.map(stripMarks).join(" "));
  u.lang="he-IL";u.rate=.82;speechSynthesis.speak(u);
}
function init(){
  fillGenreFilter();
  ["search","bookFilter","genreFilter"].forEach(id=>$(id).addEventListener(id==="search"?"input":"change",renderList));
  $("prevBtn").onclick=()=>selectPsalm(current-1);$("nextBtn").onclick=()=>selectPsalm(current+1);$("readBtn").onclick=speakHebrew;
  $("openSide").onclick=()=>$("side").classList.toggle("open");
  $("notes").addEventListener("input",saveWorkshop);["done1","done2","done3"].forEach(id=>$(id).addEventListener("change",saveWorkshop));
  const h=location.hash.match(/salmo-(\d+)/);selectPsalm(h?+h[1]:1);
}
init();
