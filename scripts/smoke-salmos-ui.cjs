const fs = require('fs');
const vm = require('vm');

const read = file => fs.readFileSync(file, 'utf8');
const elements = new Map();

function fakeElement(id='') {
  return {
    id,
    value:'',
    innerHTML:'',
    textContent:'',
    checked:false,
    href:'',
    title:'',
    style:{width:''},
    dataset:{},
    classList:{add(){},remove(){},toggle(){},contains(){return false;}},
    addEventListener(){},
    setAttribute(name,value){this[name]=value;},
    getAttribute(name){return this[name];},
    onclick:null
  };
}

const requiredIds = [
  'search','bookFilter','genreFilter','psalmList','side','hebrewPanel','verseMetric','canonLine',
  'psalmTitle','theme','bookMetric','genreMetric','thesis','badges','formalBadges','araBtn','theology',
  'homiletic','steps','prevBtn','nextBtn','readBtn','openSide','notes','done1','done2','done3','progressBar'
];
for (const id of requiredIds) elements.set(id,fakeElement(id));

const document = {
  getElementById(id){
    if(!elements.has(id)) elements.set(id,fakeElement(id));
    return elements.get(id);
  },
  querySelectorAll(){return [];}
};

const storage = new Map();
const sandbox = {
  console,
  document,
  location:{hash:''},
  history:{replaceState(_a,_b,url){ if(typeof url==='string' && url.includes('#')) sandbox.location.hash=url.slice(url.indexOf('#')); }},
  localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))},
  encodeURIComponent,
  setTimeout,
  clearTimeout,
  Promise,
  fetch: async url => {
    const m=String(url).match(/number=(\d+)/);
    const n=m?Number(m[1]):1;
    const hasTitle=!new Set([1,2,10]).has(n);
    const body=[
      'אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ',
      'כִּי אִם בְּתוֹרַת יְהוָה חֶפְצוֹ',
      'וְהָיָה כְּעֵץ שָׁתוּל עַל פַּלְגֵי מָיִם',
      'לֹא כֵן הָרְשָׁעִים',
      'כִּי יוֹדֵעַ יְהוָה דֶּרֶךְ צַדִּיקִים'
    ];
    const verses=hasTitle?['מִזְמוֹר לְדָוִד',...body]:body;
    return {ok:true,json:async()=>({verses,source:'Smoke Test TM'})};
  }
};
sandbox.window=sandbox;
sandbox.window.open=()=>null;
sandbox.window.scrollTo=()=>null;
sandbox.window.print=()=>null;
vm.createContext(sandbox);

const scripts=[
  'data-1.js','data-2.js','data-3.js','data-4.js','data-5.js','context.js','core.js',
  'analysis-01-10.js','analysis-11-20.js','analysis-21-30.js','manual-render.js','render.js'
];
for(const file of scripts) vm.runInContext(read(file),sandbox,{filename:file});

const wait=()=>new Promise(resolve=>setTimeout(resolve,15));
const assert=(cond,msg)=>{if(!cond) throw new Error(msg);};

(async()=>{
  await wait();
  assert(elements.get('psalmTitle').textContent==='Salmo 1','Salmo 1 não inicializou.');
  assert((elements.get('steps').innerHTML.match(/class="step /g)||[]).length===12,'Salmo 1 não renderizou 12 passos.');
  assert(elements.get('homiletic').innerHTML.includes('Como o texto chega a Cristo'),'Bloco homilético revisado não apareceu.');
  assert(elements.get('araBtn').href.includes('PSA.1.ARA'),'Link ARA do Salmo 1 incorreto.');
  assert(elements.get('readBtn').textContent.includes('cantilação'),'Botão de cantilação não foi configurado.');

  vm.runInContext('selectPsalm(23)',sandbox);
  await wait();
  assert(elements.get('psalmTitle').textContent==='Salmo 23','Salmo 23 não abriu.');
  assert(elements.get('araBtn').href.includes('PSA.23.ARA'),'Link ARA do Salmo 23 incorreto.');
  assert(elements.get('hebrewPanel').innerHTML.includes('sobrescrição'),'Salmo 23 não distinguiu a sobrescrição do texto numerado na ARA.');
  assert((elements.get('steps').innerHTML.match(/class="step /g)||[]).length===12,'Salmo 23 não renderizou 12 passos.');

  vm.runInContext('selectPsalm(30)',sandbox);
  await wait();
  assert(elements.get('psalmTitle').textContent==='Salmo 30','Salmo 30 não abriu.');
  assert(elements.get('badges').innerHTML.includes('12 passos revisados'),'Salmo 30 não está marcado como revisado.');
  assert(elements.get('theology').innerHTML.length>100,'Teologia do Salmo 30 não foi renderizada.');
  assert(elements.get('homiletic').innerHTML.length>250,'Homilética do Salmo 30 não foi renderizada.');

  vm.runInContext('selectPsalm(31)',sandbox);
  await wait();
  assert(elements.get('badges').innerHTML.includes('análise preliminar'),'Salmo 31 deveria permanecer explicitamente preliminar.');

  console.log('✓ Smoke UI: Salmos 1, 23 e 30 renderizam a camada revisada.');
  console.log('✓ Sobrescrição e links ARA permanecem alinhados.');
  console.log('✓ Salmo 31 continua claramente marcado como preliminar.');
})().catch(err=>{
  console.error(`✗ Smoke UI falhou: ${err.message}`);
  process.exit(1);
});
