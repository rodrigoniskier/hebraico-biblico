const NT_EXPLICIT = new Set([2,16,22,34,40,41,45,68,69,78,89,95,102,104,109,110,118,132]);
let current = 1;
let currentVerses = [];
let speechCount = 0;

const $ = id => document.getElementById(id);
const stripHtml = s => String(s||"").replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();
const stripMarks = s => stripHtml(s).normalize("NFD").replace(/[\u0591-\u05C7]/g,"").normalize("NFC");
const hebrewWords = s => stripHtml(s).replace(/[׃]/g,"").trim().split(/\s+/).filter(Boolean);
const wordCount = s => hebrewWords(s).length;
const vowelCount = s => (stripHtml(s).match(/[\u05B0-\u05BB\u05C7]/g)||[]).length;
const accentUnitCount = s => hebrewWords(s).length; // maqqef-linked forms remain one phonological token
const pct = (a,b)=> b ? Math.round(a/b*100) : 0;

function bookRange(book){return ({I:"1–41",II:"42–72",III:"73–89",IV:"90–106",V:"107–150"})[book]}
function primaryGenre(p){return p.genres[0] || "Misto / não indexado no Apêndice E"}

function thesisFor(p){
  if(p.n===1) return "YHWH distingue dois caminhos: a vida enraizada em sua instrução recebe estabilidade e fruto, enquanto o caminho ímpio perde substância e futuro.";
  if(p.n===2) return "A rebelião das nações não anula o decreto de YHWH: seu Ungido reina, e a resposta sábia é abandonar a resistência e refugiar-se nele.";
  const g=primaryGenre(p);
  const stem = {
    "Hino de louvor":`O salmo convoca o povo a louvar YHWH a partir de “${p.title.toLowerCase()}”, fazendo dos atributos e atos divinos o motivo da adoração.`,
    "Lamento individual":`O salmista leva a YHWH a experiência de “${p.title.toLowerCase()}” e a transforma, pela oração, em petição e esperança diante do Deus da aliança.`,
    "Lamento comunitário":`A comunidade apresenta a YHWH “${p.title.toLowerCase()}”, interpreta a crise pactualmente e apela por intervenção e restauração.`,
    "Ação de graças":`O livramento ligado a “${p.title.toLowerCase()}” é narrado para que a graça recebida se torne memória, testemunho e louvor público.`,
    "Régio":`O poema lê “${p.title.toLowerCase()}” à luz do governo de YHWH, subordinando o rei humano ao propósito pactual que encontra seu horizonte no Messias.`,
    "Sabedoria / Torá":`O salmo usa “${p.title.toLowerCase()}” para formar o adorador no caminho da sabedoria pactual, contrastando escolhas, caráter e destino diante de YHWH.`,
    "Confiança":`Diante de “${p.title.toLowerCase()}”, o salmo reafirma que a segurança do fiel repousa no caráter, na presença e na guarda de YHWH.`,
    "Sião":`Ao cantar “${p.title.toLowerCase()}”, o poema confessa que a segurança e a beleza de Sião procedem da presença de YHWH e de seu reinado.`,
    "Entronização":`“${p.title}” anuncia que YHWH reina; por isso criação, povos e adoradores são chamados a responder com temor, alegria e louvor.`,
    "Histórico":`O salmo transforma “${p.title.toLowerCase()}” em memória pactual: os atos de YHWH interpretam a história e instruem as gerações seguintes.`,
    "Penitencial":`Em “${p.title.toLowerCase()}”, pecado e aflição são levados à misericórdia de YHWH, e o arrependimento busca perdão, purificação e renovação.`,
    "Imprecatório":`O poema leva “${p.title.toLowerCase()}” ao tribunal de YHWH, recusando a vingança privada e apelando ao Juiz justo.`,
    "Misto / não indexado no Apêndice E":`O movimento de “${p.title.toLowerCase()}” deve ser lido a partir de sua própria arquitetura: cólons, estrofes, desvios e situação canônica convergem para a afirmação central.`
  }[g];
  return stem;
}

function christologyFor(p){
  const explicit=CHRIST[String(p.n)];
  if(explicit) return {...explicit, reason:"uso explícito no Novo Testamento registrado como conexão prioritária"};
  if(p.genres.includes("Régio")) return {mode:"vox de Christo", nt:"sem citação explícita cadastrada nesta ferramenta", reason:"trajetória régia/davídica para o Messias"};
  return {mode:"vox ecclesiae in Christo", nt:"sem citação explícita cadastrada nesta ferramenta", reason:"oração da igreja unida ao verdadeiro Israelita e Rei"};
}

function splitCola(verse){
  const text=stripHtml(verse);
  const words=text.split(/\s+/).filter(Boolean);
  if(words.length<=4) return [text];
  let cuts=[];
  words.forEach((w,i)=>{
    if(w.includes("\u0591")) cuts.push({i,weight:5,name:"ʾatnāḥ"});
    if(w.includes("\u05AB")) cuts.push({i,weight:4,name:"ʿoleh"});
    if(w.includes("\u0597")||w.includes("\u05AD")||w.includes("\u05AE")) cuts.push({i,weight:2,name:"disjuntivo"});
  });
  let boundaries=[];
  const atnah=cuts.find(c=>c.name==="ʾatnāḥ");
  if(atnah && atnah.i < words.length-1) boundaries.push(atnah.i);
  if(words.length>11){
    const candidates=cuts.filter(c=>c.i>1 && c.i<words.length-2 && !boundaries.includes(c.i))
      .sort((a,b)=>b.weight-a.weight || Math.abs(a.i-words.length/2)-Math.abs(b.i-words.length/2));
    if(candidates[0]) boundaries.push(candidates[0].i);
  }
  boundaries=[...new Set(boundaries)].sort((a,b)=>a-b).slice(0,2);
  if(!boundaries.length && words.length>=9) boundaries=[Math.floor(words.length/2)-1];
  const out=[];let start=0;
  for(const b of boundaries){out.push(words.slice(start,b+1).join(" "));start=b+1}
  if(start<words.length) out.push(words.slice(start).join(" "));
  return out.filter(Boolean);
}

function scanVerse(v,idx){
  const cola=splitCola(v);
  const counts=cola.map(c=>accentUnitCount(c));
  return {verse:idx+1,cola,counts,syllables:cola.map(vowelCount),words:cola.map(wordCount),pattern:counts.join("+")};
}
function dominantPattern(scans){
  const f={};scans.forEach(s=>f[s.pattern]=(f[s.pattern]||0)+1);
  return Object.entries(f).sort((a,b)=>b[1]-a[1])[0]?.[0]||"—";
}
function significantDeviations(scans){
  const dom=dominantPattern(scans);
  return scans.filter(s=>s.pattern!==dom).map(s=>`v. ${s.verse}: ${s.pattern}`).slice(0,12);
}
function inferredStrophes(p,count){
  const g=primaryGenre(p), labels=GENRE_SHAPES[g]||GENRE_SHAPES["Misto / não indexado no Apêndice E"];
  if(count<=3) return [{range:`vv. 1–${count}`,label:labels[0]||"Unidade breve",criteria:"poema curto; confirmar sintaxe/paralelismo"}];
  const exempl=EXEMPLARS[String(p.n)];
  if(p.n===23) return [
    {range:"vv. 1–3",label:"YHWH como Pastor",criteria:"mudança de pessoa no bloco seguinte"},
    {range:"vv. 4–5",label:"Presença no vale e à mesa",criteria:"2ª pessoa; região central"},
    {range:"v. 6",label:"Bondade e casa de YHWH",criteria:"fecho e retorno"}
  ];
  if(p.n===13) return [
    {range:"vv. 1–2",label:"Queixa: “até quando?”",criteria:"anáfora e compressão"},
    {range:"vv. 3–4",label:"Petição",criteria:"mudança de função discursiva"},
    {range:"vv. 5–6",label:"Confiança e canto",criteria:"virada semântica e expansão final"}
  ];
  const a=Math.max(1,Math.round(count*.34)), b=Math.max(a+1,Math.round(count*.67));
  return [
    {range:`vv. 1–${a}`,label:labels[0],criteria:"hipótese por contorno do gênero; verificar ≥3 critérios"},
    {range:`vv. ${a+1}–${b}`,label:labels[1],criteria:"hipótese por mudança funcional; verificar pessoa/aspecto/campo semântico"},
    {range:`vv. ${b+1}–${count}`,label:labels[2],criteria:"hipótese de fecho; verificar inclusão/refrão/retomada"}
  ];
}
function macroFor(p){
  const f=p.formal;
  let items=[];
  if(f.includes("Acróstico")) items.push("Acróstico: a ordem alfabética participa do argumento de totalidade/ordem.");
  if(f.includes("Refrão explícito")) items.push("Refrão: a repetição funciona como junta estrutural e deve ser ouvida nas transições.");
  if(f.includes("Inclusão literal")) items.push("Inclusão: abertura e fecho se espelham e emolduram o conteúdo interno.");
  if(f.includes("Paralelismo em escada")) items.push("Escada: a repetição com acréscimo produz avanço/crescendo.");
  if(f.includes("Salmo gêmeo / par")) items.push("Par canônico: a leitura deve testar como o salmo vizinho completa ou tensiona este poema.");
  if(f.includes("Selâ")) items.push("Selâ: possível marcador de fronteira; nunca usado isoladamente para decidir uma estrofe.");
  if(!items.length) items.push("Sem macroforma especial indexada no Apêndice E: testar inclusão, quiasmo, refrão, painéis, pivô e progressão diretamente no texto.");
  const ex=EXEMPLARS[String(p.n)]; if(ex) items.unshift(`${ex.label}: ${ex.note}`);
  return items;
}
function sermonFor(p,count){
  const g=primaryGenre(p), shape=GENRE_SHAPES[g]||GENRE_SHAPES["Misto / não indexado no Apêndice E"];
  const st=inferredStrophes(p,count||6);
  const ex=EXEMPLARS[String(p.n)];
  let climax= ex?.pivot || (p.formal.includes("Refrão explícito") ? "o refrão repetido" : p.formal.includes("Acróstico") ? "o ponto em que a ordem alfabética serve ao argumento" : "o pivô semântico identificado no passo 10");
  return {
    idea:thesisFor(p),
    movements:st.map((s,i)=>({title:`Movimento ${i+1} · ${s.label}`,range:s.range})),
    climax,
    gospel: christologyFor(p).mode==="vox de Christo" ? "Conduzir do reinado pactual ao Rei messiânico sem alegorização atomística." :
            christologyFor(p).mode==="vox Christi" ? "Mostrar como Cristo entra na voz do salmo e como a igreja ora nele." :
            "Levar a oração do salmo à comunhão com Deus em Cristo, preservando primeiro o sentido histórico-literário."
  };
}

