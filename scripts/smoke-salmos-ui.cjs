const fs = require('fs');
const vm = require('vm');

const read = file => fs.readFileSync(file, 'utf8');
const elements = new Map();
function fakeElement(id=''){return{id,value:'',innerHTML:'',textContent:'',checked:false,href:'',title:'',style:{width:''},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return false;}},addEventListener(){},setAttribute(name,value){this[name]=value;},getAttribute(name){return this[name];},onclick:null};}
const requiredIds=['search','bookFilter','genreFilter','psalmList','side','hebrewPanel','verseMetric','canonLine','psalmTitle','theme','bookMetric','genreMetric','thesis','badges','formalBadges','araBtn','theology','homiletic','steps','prevBtn','nextBtn','readBtn','openSide','notes','done1','done2','done3','progressBar'];
for(const id of requiredIds)elements.set(id,fakeElement(id));
const document={getElementById(id){if(!elements.has(id))elements.set(id,fakeElement(id));return elements.get(id);},querySelectorAll(){return[];},querySelector(){return null;}};
const storage=new Map();
const TITLE_COUNTS={31:1,32:0,33:0,34:1,35:0,36:1,37:0,38:1,39:1,40:1,41:1,42:1,43:0,44:1,45:1,46:1,47:1,48:1,49:1,50:0,51:2,52:2,53:1,54:2,55:1,56:1,57:1,58:1,59:1,60:2};
const oldNoTitle=new Set([1,2,10]);
const sandbox={console,document,location:{hash:''},history:{replaceState(_a,_b,url){if(typeof url==='string'&&url.includes('#'))sandbox.location.hash=url.slice(url.indexOf('#'));}},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,String(v))},encodeURIComponent,setTimeout,clearTimeout,Promise,fetch:async url=>{const m=String(url).match(/number=(\d+)/);const n=m?Number(m[1]):1;const count=n>=31&&n<=60?TITLE_COUNTS[n]:(oldNoTitle.has(n)?0:1);const body=['אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ','כִּי אִם בְּתוֹרַת יְהוָה חֶפְצוֹ','וְהָיָה כְּעֵץ שָׁתוּל עַל פַּלְגֵי מָיִם','לֹא כֵן הָרְשָׁעִים','כִּי יוֹדֵעַ יְהוָה דֶּרֶךְ צַדִּיקִים'];const titles=Array.from({length:count},(_,i)=>i===0?'מִזְמוֹר לְדָוִד':'בְּבוֹא אֵלָיו נָתָן הַנָּבִיא');return{ok:true,json:async()=>({verses:[...titles,...body],source:'Smoke Test TM'})};}};
sandbox.window=sandbox;sandbox.window.open=()=>null;sandbox.window.scrollTo=()=>null;sandbox.window.print=()=>null;
vm.createContext(sandbox);
const scripts=['data-1.js','data-2.js','data-3.js','data-4.js','data-5.js','context.js','core.js','analysis-01-10.js','analysis-11-20.js','analysis-21-30.js','analysis-factory.js','analysis-31-40.js','analysis-41-50.js','analysis-51-60.js','manual-render.js','render.js','reviewed-31-60-runtime.js'];
for(const file of scripts)vm.runInContext(read(file),sandbox,{filename:file});
const wait=()=>new Promise(resolve=>setTimeout(resolve,20));
const assert=(cond,msg)=>{if(!cond)throw new Error(msg);};
async function openPsalm(n){vm.runInContext(`selectPsalm(${n})`,sandbox);await wait();}
(async()=>{
  await wait();
  assert(elements.get('psalmTitle').textContent==='Salmo 1','Salmo 1 não inicializou.');
  assert((elements.get('steps').innerHTML.match(/class="step /g)||[]).length===12,'Salmo 1 não renderizou 12 passos.');
  assert(elements.get('homiletic').innerHTML.includes('Como o texto chega a Cristo'),'Homilética revisada não apareceu.');
  await openPsalm(23);assert(elements.get('hebrewPanel').innerHTML.includes('sobrescrição'),'Salmo 23 perdeu tratamento da sobrescrição.');
  await openPsalm(31);assert(elements.get('badges').innerHTML.includes('12 passos revisados'),'Salmo 31 não está revisado.');assert(elements.get('theology').innerHTML.length>100,'Teologia do Salmo 31 ausente.');
  await openPsalm(46);assert(elements.get('steps').innerHTML.includes('larguem as armas'),'Salmo 46 não carregou a revisão específica da oficina.');
  await openPsalm(51);assert(elements.get('hebrewPanel').innerHTML.includes('título 1')&&elements.get('hebrewPanel').innerHTML.includes('título 2'),'Salmo 51 não marcou as duas linhas de sobrescrição.');assert(elements.get('hebrewPanel').innerHTML.includes('PSA.51.1.ARA'),'Salmo 51 não alinhou o primeiro verso do poema com ARA 51.1.');assert(elements.get('verseMetric').textContent===5,'Salmo 51 contou sobrescrições como versículos da ARA.');
  await openPsalm(60);assert(elements.get('badges').innerHTML.includes('12 passos revisados'),'Salmo 60 não está revisado.');assert(elements.get('hebrewPanel').innerHTML.includes('título 2'),'Salmo 60 perdeu a segunda linha de título.');
  await openPsalm(61);assert(elements.get('badges').innerHTML.includes('análise preliminar'),'Salmo 61 deveria permanecer preliminar.');assert(elements.get('steps').innerHTML.includes('Salmos 61–150'),'Faixa preliminar não foi atualizada para 61–150.');
  console.log('✓ Smoke UI: camada revisada abre do Salmo 1 ao 60.');
  console.log('✓ Salmos 51 e 60 preservam duas sobrescrições e alinham a numeração ARA.');
  console.log('✓ Salmo 46 carrega a oficina específica; Salmo 61 permanece preliminar.');
})().catch(err=>{console.error(`✗ Smoke UI falhou: ${err.message}`);process.exit(1);});
