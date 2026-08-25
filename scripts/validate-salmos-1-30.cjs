const fs = require('fs');
const vm = require('vm');

const ROOT = process.cwd();
const ANALYSIS_FILES = ['analysis-01-10.js','analysis-11-20.js','analysis-21-30.js'];
const COMPILE_FILES = [
  'data-1.js','data-2.js','data-3.js','data-4.js','data-5.js',
  'context.js','core.js','manual-render.js','render.js',...ANALYSIS_FILES
];
const errors = [];
const warnings = [];
const fail = msg => errors.push(msg);
const warn = msg => warnings.push(msg);
const read = file => fs.readFileSync(`${ROOT}/${file}`, 'utf8');
const nonEmpty = (value, min=1) => typeof value === 'string' && value.trim().length >= min;
const fullStepText = step => [step.body, ...(Array.isArray(step.items)?step.items:[])].filter(Boolean).join(' ');

for (const file of COMPILE_FILES) {
  try { new Function(read(file)); }
  catch (err) { fail(`${file}: erro de sintaxe: ${err.message}`); }
}

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ['data-1.js', ...ANALYSIS_FILES]) {
  try { vm.runInContext(read(file), sandbox, { filename: file }); }
  catch (err) { fail(`${file}: não pôde ser carregado: ${err.message}`); }
}

const psalms = sandbox.window.PSALMS || [];
const analyses = sandbox.window.MANUAL_ANALYSES || {};
const expected = Array.from({length:30}, (_,i)=>String(i+1));
const keys = Object.keys(analyses).sort((a,b)=>Number(a)-Number(b));

if (psalms.length !== 30) fail(`data-1.js deveria conter 30 Salmos; contém ${psalms.length}.`);
if (keys.length !== 30) fail(`Deveriam existir 30 análises revisadas; existem ${keys.length}.`);
for (const n of expected) if (!analyses[n]) fail(`Salmo ${n}: análise ausente.`);
for (const n of keys) if (!expected.includes(n)) fail(`Análise inesperada fora do intervalo 1–30: ${n}.`);

const expectedNoTitleVerse = new Set(['1','2','10']);
const expectedTechnical = {
  1:'Texto e variantes', 2:'Leitura e cantilação', 3:'Cólons e acentos',
  4:'Sintaxe e paralelismo', 5:'Escansão', 6:'Paralelismo',
  7:'Recursos poéticos', 8:'Estrofes', 9:'Macroestrutura',
  10:'Desvios significativos', 11:'Proposição', 12:'Situação canônica e cristológica'
};

for (const n of expected) {
  const a = analyses[n];
  if (!a) continue;
  const prefix = `Salmo ${n}`;

  if (typeof a.titleVerse !== 'boolean') fail(`${prefix}: titleVerse precisa ser booleano.`);
  const shouldHaveTitle = !expectedNoTitleVerse.has(n);
  if (a.titleVerse !== shouldHaveTitle) fail(`${prefix}: titleVerse=${a.titleVerse}; esperado ${shouldHaveTitle} para manter a numeração hebraico/ARA coerente.`);

  if (!Array.isArray(a.sources) || a.sources.length < 3) fail(`${prefix}: precisa de pelo menos 3 bases/fontes declaradas.`);
  else {
    if (!a.sources.some(s => /Texto Massorético/i.test(String(s)))) fail(`${prefix}: fontes não registram o Texto Massorético.`);
    if (new Set(a.sources.map(String)).size !== a.sources.length) warn(`${prefix}: há fontes repetidas.`);
  }

  if (!Array.isArray(a.steps) || a.steps.length !== 12) {
    fail(`${prefix}: precisa ter exatamente 12 passos; encontrou ${a.steps?.length ?? 0}.`);
  } else {
    const nums = a.steps.map(s=>s.n);
    if (nums.join(',') !== '1,2,3,4,5,6,7,8,9,10,11,12') fail(`${prefix}: numeração dos passos inválida: ${nums.join(',')}.`);
    for (const step of a.steps) {
      const sp = `${prefix}, passo ${step.n}`;
      if (!nonEmpty(step.label, 12)) fail(`${sp}: título simples ausente ou curto demais.`);
      if (!nonEmpty(step.technical, 4)) fail(`${sp}: termo técnico ausente.`);
      if (expectedTechnical[step.n] && step.technical !== expectedTechnical[step.n]) warn(`${sp}: termo técnico '${step.technical}' difere do padrão '${expectedTechnical[step.n]}'.`);
      if (!nonEmpty(step.body, 25)) fail(`${sp}: explicação principal ausente ou curta demais.`);
      if (step.items && (!Array.isArray(step.items) || step.items.some(x=>!nonEmpty(x,12)))) fail(`${sp}: lista de itens malformada.`);
      const total = fullStepText(step);
      if (total.length < 100) fail(`${sp}: conteúdo total insuficiente para uma análise completa (mín. 100 caracteres somando explicação e itens).`);
      if (/\b(?:TODO|TBD|PLACEHOLDER)\b/.test(total) || /preencher depois/i.test(total)) fail(`${sp}: contém marcador de conteúdo pendente.`);
    }
    const step12 = a.steps.find(s=>s.n===12);
    if (step12 && !/(Crist|Messi|Novo Testamento|\bNT\b)/i.test(fullStepText(step12))) fail(`${prefix}: passo 12 não explicita a relação canônica/cristológica.`);
  }

  if (!Array.isArray(a.theology) || a.theology.length < 3) fail(`${prefix}: precisa de pelo menos 3 implicações teológicas.`);
  else if (a.theology.some(x=>!nonEmpty(x,15))) fail(`${prefix}: há implicação teológica vazia ou excessivamente curta.`);

  const s = a.sermon;
  if (!s || typeof s !== 'object') fail(`${prefix}: bloco homilético ausente.`);
  else {
    if (!nonEmpty(s.idea, 35)) fail(`${prefix}: sermão.idea está ausente ou curto demais.`);
    if (!nonEmpty(s.need, 35)) fail(`${prefix}: sermão.need está ausente ou curto demais.`);
    if (!nonEmpty(s.climax, 15)) fail(`${prefix}: sermão.climax está ausente ou curto demais.`);
    if (!nonEmpty(s.gospel, 35)) fail(`${prefix}: sermão.gospel está ausente ou curto demais.`);
    if (!Array.isArray(s.movements) || s.movements.length < 2 || s.movements.length > 5) fail(`${prefix}: sermão deve ter de 2 a 5 movimentos derivados do texto.`);
    else for (const [i,m] of s.movements.entries()) if (!nonEmpty(m.title, 5) || !nonEmpty(m.vv, 3) || !nonEmpty(m.point, 25)) fail(`${prefix}: movimento ${i+1} incompleto.`);
    if (!Array.isArray(s.applications) || s.applications.length < 2 || s.applications.some(x=>!nonEmpty(x,15))) fail(`${prefix}: aplicações pastorais insuficientes ou incompletas.`);
    if (nonEmpty(s.gospel) && !/(Jesus|Crist|Messi|evangelho|Filho|Segundo Adão|Bom Pastor)/i.test(s.gospel)) warn(`${prefix}: conexão evangélica merece revisão; não contém marcador cristológico explícito.`);
  }
}

const html = read('salmos.html');
const expectedScripts = [
  '/data-1.js','/data-2.js','/data-3.js','/data-4.js','/data-5.js','/context.js','/core.js',
  '/analysis-01-10.js','/analysis-11-20.js','/analysis-21-30.js','/manual-render.js','/render.js'
];
let last = -1;
for (const src of expectedScripts) {
  const idx = html.indexOf(`src="${src}"`);
  if (idx < 0) fail(`salmos.html: script ausente: ${src}`);
  if (idx <= last) fail(`salmos.html: ordem de scripts incorreta perto de ${src}`);
  last = idx;
}
for (const id of ['araBtn','readBtn','hebrewPanel','steps','theology','homiletic']) if (!html.includes(`id="${id}"`)) fail(`salmos.html: elemento obrigatório #${id} ausente.`);
if (!/Salmos 1–30/.test(html)) fail('salmos.html: não informa claramente que a revisão completa atual é 1–30.');

const render = read('render.js');
const manual = read('manual-render.js');
for (const token of ['reviewedAnalysis','manualVerseLabel','araVerseUrl','poemScansFor']) if (!(render+manual).includes(token)) fail(`Integração: função/uso obrigatório '${token}' ausente.`);
for (const forbidden of ['speechSynthesis','SpeechSynthesisUtterance','evoice']) if ((render+manual+html).includes(forbidden)) fail(`Vocalização sintética proibida ainda presente: ${forbidden}.`);
if (!manual.includes('noopener noreferrer')) fail('manual-render.js: links externos devem usar noopener noreferrer.');
if (!html.includes('ARA é acessada por links para fonte licenciada')) warn('salmos.html: convém manter explícita a política de não republicação integral da ARA.');

try { JSON.parse(read('vercel.json')); }
catch (err) { fail(`vercel.json inválido: ${err.message}`); }

if (warnings.length) {
  console.log('\nAvisos de revisão:');
  for (const w of warnings) console.log(`  ⚠ ${w}`);
}
if (errors.length) {
  console.error(`\nFalha de integridade: ${errors.length} problema(s).`);
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log('\n✓ Salmos 1–30: 30 análises presentes.');
console.log('✓ Cada Salmo contém exatamente os 12 passos e conteúdo mínimo substantivo.');
console.log('✓ Teologia e homilética possuem campos estruturais completos.');
console.log('✓ Numeração hebraico/ARA e sobrescrições passaram na regra estrutural.');
console.log('✓ Ordem dos módulos, links ARA, cantilação e ausência de voz sintética verificadas.');
console.log('✓ JavaScript essencial compila e vercel.json é válido.');
