// Registro auditável de proveniência das análises do Saltério.
// As entradas bibliográficas refletem o Apêndice G de A Medida do Louvor e foram
// reconferidas em catálogos/editoras/fontes institucionais na revisão final de 2026-08-26.
(function(root){
  const SOURCES={
    tm:{name:'Texto Massorético',type:'texto primário',status:'fonte primária',url:'https://developers.sefaria.org/reference/get-v3-texts',note:'Texto hebraico com acentos; Sefaria v3 é a fonte eletrônica operacional, conferível também no Códice de Leningrado/UXLC.'},
    medida:{name:'A Medida do Louvor',type:'método-base',status:'fonte-base auditada',url:null,note:'Obra fornecida no projeto; protocolo de 12 passos, oficinas, hermenêutica reformada e bibliografia auditada.'},
    net:{name:'NET Bible Notes',type:'notas textuais/linguísticas',status:'obra confirmada',url:'https://netbible.org/',note:'Biblical Studies Press. As NET Bible Notes existem como recurso editorial próprio e documentam opções textuais, linguísticas e de tradução.'},
    calvin:{name:'João Calvino — Commentary on the Book of Psalms',type:'comentário reformado',status:'bibliografia confirmada',url:'https://www.ccel.org/ccel/calvin/calcom08.html',note:'5 vols.; tradução de James Anderson, Calvin Translation Society, 1845–1849.'},
    ash:{name:'Christopher Ash — Teaching Psalms',type:'homilética expositiva',status:'editora confirmada',url:'https://www.christianfocus.com/en-gb/product/9781527100046/teaching-psalms-vol-1-paperback',note:'Vols. 1–2, Christian Focus, 2017–2018.'},
    greidanus:{name:'Sidney Greidanus — Preaching Christ from Psalms',type:'homilética cristocêntrica',status:'editora confirmada',url:'https://www.eerdmans.com/9780802873668/preaching-christ-from-psalms/',note:'Eerdmans, 2016.'},
    vangemeren:{name:'Willem A. VanGemeren — Psalms',type:'comentário exegético evangélico',status:'editora confirmada',url:'https://zondervanacademic.com/products/psalms',note:'The Expositor’s Bible Commentary, edição revista, Zondervan, 2008; ISBN 9780310234975.'},
    waltke:{name:'Bruce K. Waltke / James M. Houston — Psalms trilogy',type:'comentário histórico-exegético',status:'editora confirmada',url:'https://www.eerdmans.com/9780802863744/the-psalms-as-christian-worship/',note:'Christian Worship (2010), Christian Lament (2014) e Christian Praise (2019).'},
    robertson:{name:'O. Palmer Robertson — The Flow of the Psalms',type:'estrutura canônica reformada',status:'editora confirmada',url:'https://www.prpbooks.com/book/the-flow-of-the-psalms',note:'P&R Publishing, 2015; ISBN 9781629951331.'},
    wilson:{name:'Gerald H. Wilson — The Editing of the Hebrew Psalter',type:'estrutura canônica',status:'bibliografia confirmada',url:'https://books.google.com/books?id=BNrYAAAAMAAJ',note:'SBL Dissertation Series 76, Scholars Press, 1985.'},
    berlin:{name:'Adele Berlin — The Dynamics of Biblical Parallelism',type:'poética / paralelismo',status:'editora confirmada',url:'https://www.eerdmans.com/9780802803979/the-dynamics-of-biblical-parallelism/',note:'Edição revista, Eerdmans, 2007/2008; ISBN 9780802803979.'},
    alter:{name:'Robert Alter — The Art of Biblical Poetry',type:'poética / leitura literária',status:'bibliografia confirmada',url:null,note:'Basic Books, 1985; edição revista, 2011.'},
    kugel:{name:'James L. Kugel — The Idea of Biblical Poetry',type:'poética / paralelismo',status:'bibliografia confirmada',url:'https://www.press.jhu.edu/books/title/2659/idea-biblical-poetry',note:'Yale, 1981; reimpressão Johns Hopkins, 1998.'},
    dobbs:{name:'F. W. Dobbs-Allsopp — On Biblical Poetry',type:'poética / ritmo livre',status:'DOI confirmado',url:'https://academic.oup.com/book/5284',note:'Oxford University Press, 2015; DOI 10.1093/acprof:oso/9780199766901.001.0001.'},
    fokkelman:{name:'J. P. Fokkelman — Major Poems of the Hebrew Bible',type:'prosódia / estrutura',status:'bibliografia confirmada',url:'https://brill.com/display/title/14827',note:'4 vols., 1998–2004; escansão quantitativa do Saltério.'},
    watson:{name:'Wilfred G. E. Watson — Classical Hebrew Poetry',type:'técnicas poéticas',status:'bibliografia confirmada',url:null,note:'JSOTSup 26, 1984; reimpressão T&T Clark/Bloomsbury, 2005; ISBN 9780567540898.'},
    wcf:{name:'Confissão de Fé de Westminster',type:'padrão confessional',status:'texto confessional confirmado',url:'https://www.wscal.edu/westminster-confession-of-faith/',note:'Especialmente caps. I, V e XXI na metodologia do projeto.'},
    textual:{name:'Testemunhas e ferramentas textuais',type:'crítica textual',status:'categoria auditada',url:null,note:'BHS/BHQ, Qumran/11QPsª, LXX/Septuaginta, Peshitta, Vulgata, Tanach.us/UXLC e STEP Bible, conforme a necessidade do texto.'},
    scripture:{name:'Escritura — referências canônicas',type:'referência bíblica',status:'fonte canônica',url:null,note:'Referências usadas para contexto remoto, analogia da fé e controle do uso cristológico.'},
    framework:{name:'Síntese/enquadramento editorial',type:'enquadramento interpretativo',status:'não é fonte independente',url:null,note:'Rótulo de síntese teológica, canônica ou histórico-cultural. Ele pode descrever o modo de leitura, mas não conta como evidência bibliográfica autônoma.'}
  };

  const bibleBooks=/(?:G[eê]nesis|[ÊE]xodo|Lev[ií]tico|N[uú]meros|Deuteron[oô]mio|Josu[eé]|Ju[ií]zes|Rute|[12]\s*Samuel|[12]\s*Reis|[12]\s*Cr[oô]nicas|Esdras|Neemias|Ester|J[oó]|Salmos?|Prov[eé]rbios|Eclesiastes|C[aâ]ntico(?:s)?|Isa[ií]as|Jeremias|Lamenta[cç][oõ]es|Ezequiel|Daniel|Os[eé]ias|Joel|Am[oó]s|Obadias|Jonas|Miqueias|Naum|Habacuque|Sofonias|Ageu|Zacarias|Malaquias|Mateus|Marcos|Lucas|Jo[aã]o|Atos|Romanos|[12]\s*Cor[ií]ntios|G[aá]latas|Ef[eé]sios|Filipenses|Colossenses|[12]\s*Tessalonicenses|[12]\s*Tim[oó]teo|Tito|Filemom|Hebreus|Tiago|[12]\s*Pedro|[123]\s*Jo[aã]o|Judas|Apocalipse)/i;

  function sourceDescriptor(label){
    const s=String(label||'').trim();
    if(!s) return null;
    if(/Texto Massor[eé]tico|Masoretic Text|Sefaria/i.test(s)) return {...SOURCES.tm,label:s,id:'tm'};
    if(/A Medida do Louvor/i.test(s)) return {...SOURCES.medida,label:s,id:'medida'};
    if(/NET Bible Notes?/i.test(s)) return {...SOURCES.net,label:s,id:'net'};
    if(/Calvino|Calvin/i.test(s)) return {...SOURCES.calvin,label:s,id:'calvin'};
    if(/Christopher Ash|\bAsh\b|Teaching Psalms/i.test(s)) return {...SOURCES.ash,label:s,id:'ash'};
    if(/Greidanus/i.test(s)) return {...SOURCES.greidanus,label:s,id:'greidanus'};
    if(/VanGemeren/i.test(s)) return {...SOURCES.vangemeren,label:s,id:'vangemeren'};
    if(/Waltke|Houston|Erika Moore|Christian (?:Worship|Lament|Praise)/i.test(s)) return {...SOURCES.waltke,label:s,id:'waltke'};
    if(/O\.?\s*Palmer Robertson|Robertson|Flow of the Psalms/i.test(s)) return {...SOURCES.robertson,label:s,id:'robertson'};
    if(/Gerald H\.? Wilson|Gerald Wilson|Editing of the Hebrew Psalter|Use of Royal Psalms/i.test(s)) return {...SOURCES.wilson,label:s,id:'wilson'};
    if(/Adele Berlin|Dynamics of Biblical Parallelism/i.test(s)) return {...SOURCES.berlin,label:s,id:'berlin'};
    if(/Robert Alter|Art of Biblical Poetry/i.test(s)) return {...SOURCES.alter,label:s,id:'alter'};
    if(/James L\.? Kugel|James Kugel|Idea of Biblical Poetry/i.test(s)) return {...SOURCES.kugel,label:s,id:'kugel'};
    if(/Dobbs[-– ]?Allsopp|On Biblical Poetry|Free Rhythms/i.test(s)) return {...SOURCES.dobbs,label:s,id:'dobbs'};
    if(/Fokkelman|Major Poems of the Hebrew Bible/i.test(s)) return {...SOURCES.fokkelman,label:s,id:'fokkelman'};
    if(/Wilfred.*Watson|\bWatson\b|Classical Hebrew Poetry/i.test(s)) return {...SOURCES.watson,label:s,id:'watson'};
    if(/Westminster|\bCFW\b|Confiss[aã]o de F[eé]/i.test(s)) return {...SOURCES.wcf,label:s,id:'wcf'};
    if(/BHS|BHQ|Qumran|11QPs|Septuaginta|\bLXX\b|Peshitta|Vulgata|Tanach\.us|UXLC|STEP Bible|C[oó]dice de Leningrado/i.test(s)) return {...SOURCES.textual,label:s,id:'textual'};
    if(bibleBooks.test(s)) return {...SOURCES.scripture,label:s,id:'scripture'};
    if(/tradi[cç][aã]o reformada|alian[cç]a dav[ií]dica|teologia pactual|teologia b[ií]blica|teologia dav[ií]dica|contexto do Antigo Oriente Pr[oó]ximo|consulta secund[aá]ria|estudos estruturais|enquadramento/i.test(s)) return {...SOURCES.framework,label:s,id:'framework'};
    return {id:'unknown',name:s,label:s,type:'não catalogada',status:'requer auditoria',url:null,note:'Esta referência ainda não corresponde a uma entrada auditada do registro.'};
  }

  function auditAnalysisSources(analysis){return (analysis?.sources||[]).map(sourceDescriptor).filter(Boolean);}
  root.SOURCE_REGISTRY=SOURCES;
  root.sourceDescriptor=sourceDescriptor;
  root.auditAnalysisSources=auditAnalysisSources;
  if(typeof module!=='undefined'&&module.exports) module.exports={SOURCES,sourceDescriptor,auditAnalysisSources};
})(typeof window!=='undefined'?window:globalThis);
