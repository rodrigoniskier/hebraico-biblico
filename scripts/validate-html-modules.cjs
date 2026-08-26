const fs=require('fs');
const html=fs.readFileSync('salmos.html','utf8');
const runtime60=fs.readFileSync('reviewed-31-60-runtime.js','utf8');
const runtime90=fs.readFileSync('reviewed-61-90-runtime.js','utf8');
const runtime118=fs.readFileSync('reviewed-91-118-runtime.js','utf8');
const runtime119=fs.readFileSync('reviewed-119-runtime.js','utf8');
const runtime150=fs.readFileSync('reviewed-120-150-runtime.js','utf8');
const requiredHtml=[
  '/data-1.js','/data-2.js','/data-3.js','/data-4.js','/data-5.js','/context.js','/core.js',
  '/analysis-01-10.js','/analysis-11-20.js','/analysis-21-30.js',
  '/analysis-factory.js','/analysis-31-40.js','/analysis-41-50.js','/analysis-51-60.js',
  '/manual-render.js','/render.js','/reviewed-31-60-runtime.js'
];
let last=-1;for(const src of requiredHtml){const idx=html.indexOf(`src="${src}"`);if(idx<0)throw new Error(`salmos.html não carrega ${src}`);if(idx<=last)throw new Error(`ordem incorreta perto de ${src}`);last=idx;}
const chains=[
 ['61–90',runtime60,['analysis-61-70.js','analysis-71-80.js','analysis-81-90.js','reviewed-61-90-runtime.js']],
 ['91–118',runtime90,['analysis-91-100.js','analysis-101-110.js','analysis-111-118.js','reviewed-91-118-runtime.js']],
 ['119',runtime118,['analysis-119.js','reviewed-119-runtime.js']],
 ['120–150 + fontes',runtime119,['analysis-120-130.js','analysis-131-140.js','analysis-141-150.js','source-registry.js','reviewed-120-150-runtime.js']]
];
for(const [name,src,files] of chains){last=-1;for(const file of files){const idx=src.indexOf(`'${file}'`)>=0?src.indexOf(`'${file}'`):src.indexOf(`"${file}"`);if(idx<0)throw new Error(`runtime anterior não anexa ${file} (${name})`);if(idx<=last)throw new Error(`ordem dinâmica ${name} incorreta perto de ${file}`);last=idx;}if(!src.includes('document.currentScript')||!src.includes('document.write'))throw new Error(`carregamento ${name} não preserva a origem do mesmo diretório/CDN.`);}
if(!runtime150.includes('Salmos 1–150')||!runtime150.includes('Saltério completo'))throw new Error('Runtime final não identifica o Saltério completo como revisado.');
if(!runtime150.includes('Desenvolvido por Rodrigo Niskier Ferreira Barbosa'))throw new Error('Runtime final perdeu o crédito de produção obrigatório.');
if(!fs.existsSync('source-registry.js'))throw new Error('Registro auditado de fontes ausente.');
console.log('✓ Cadeia do navegador: HTML-base → 31–60 → 61–90 → 91–118 → 119 → 120–150.');
console.log('✓ O registro auditado de fontes é carregado antes do runtime final.');
console.log('✓ O Saltério completo é carregado do mesmo diretório/CDN e o crédito de produção está protegido.');
