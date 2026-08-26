const fs=require('fs');
const html=fs.readFileSync('salmos.html','utf8');
const runtime60=fs.readFileSync('reviewed-31-60-runtime.js','utf8');
const runtime90=fs.readFileSync('reviewed-61-90-runtime.js','utf8');
const runtime118=fs.readFileSync('reviewed-91-118-runtime.js','utf8');
const requiredHtml=[
  '/data-1.js','/data-2.js','/data-3.js','/data-4.js','/data-5.js','/context.js','/core.js',
  '/analysis-01-10.js','/analysis-11-20.js','/analysis-21-30.js',
  '/analysis-factory.js','/analysis-31-40.js','/analysis-41-50.js','/analysis-51-60.js',
  '/manual-render.js','/render.js','/reviewed-31-60-runtime.js'
];
let last=-1;for(const src of requiredHtml){const idx=html.indexOf(`src="${src}"`);if(idx<0)throw new Error(`salmos.html não carrega ${src}`);if(idx<=last)throw new Error(`ordem incorreta perto de ${src}`);last=idx;}
const stage90=['analysis-61-70.js','analysis-71-80.js','analysis-81-90.js','reviewed-61-90-runtime.js'];last=-1;for(const file of stage90){const idx=runtime60.indexOf(`"${file}"`);if(idx<0)throw new Error(`runtime 31–60 não anexa ${file}`);if(idx<=last)throw new Error(`ordem dinâmica 61–90 incorreta perto de ${file}`);last=idx;}
const stage118=['analysis-91-100.js','analysis-101-110.js','analysis-111-118.js','reviewed-91-118-runtime.js'];last=-1;for(const file of stage118){const idx=runtime90.indexOf(`"${file}"`);if(idx<0)throw new Error(`runtime 61–90 não anexa ${file}`);if(idx<=last)throw new Error(`ordem dinâmica 91–118 incorreta perto de ${file}`);last=idx;}
const stage119=['analysis-119.js','reviewed-119-runtime.js'];last=-1;for(const file of stage119){const idx=runtime118.indexOf(`"${file}"`);if(idx<0)throw new Error(`runtime 91–118 não anexa ${file}`);if(idx<=last)throw new Error(`ordem dinâmica do Salmo 119 incorreta perto de ${file}`);last=idx;}
for(const [name,src] of [['61–90',runtime60],['91–118',runtime90],['119',runtime118]])if(!src.includes('document.currentScript')||!src.includes('document.write'))throw new Error(`carregamento ${name} não preserva a origem do mesmo diretório/CDN.`);
console.log('✓ Cadeia do navegador: HTML-base → 31–60 → 61–90 → 91–118 → 119.');
console.log('✓ O Salmo 119 é carregado como etapa dedicada do mesmo diretório/CDN e na ordem validada.');
