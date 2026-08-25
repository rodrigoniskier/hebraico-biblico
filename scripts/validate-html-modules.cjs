const fs=require('fs');
const html=fs.readFileSync('salmos.html','utf8');
const runtime=fs.readFileSync('reviewed-31-60-runtime.js','utf8');
const requiredHtml=[
  '/data-1.js','/data-2.js','/data-3.js','/data-4.js','/data-5.js','/context.js','/core.js',
  '/analysis-01-10.js','/analysis-11-20.js','/analysis-21-30.js',
  '/analysis-factory.js','/analysis-31-40.js','/analysis-41-50.js','/analysis-51-60.js',
  '/manual-render.js','/render.js','/reviewed-31-60-runtime.js'
];
let last=-1;
for(const src of requiredHtml){const idx=html.indexOf(`src="${src}"`);if(idx<0)throw new Error(`salmos.html não carrega ${src}`);if(idx<=last)throw new Error(`ordem incorreta perto de ${src}`);last=idx;}
const appended=['analysis-61-70.js','analysis-71-80.js','analysis-81-90.js','reviewed-61-90-runtime.js'];
last=-1;for(const file of appended){const idx=runtime.indexOf(`"${file}"`);if(idx<0)throw new Error(`runtime não anexa ${file}`);if(idx<=last)throw new Error(`ordem dinâmica incorreta perto de ${file}`);last=idx;}
if(!runtime.includes('document.currentScript')||!runtime.includes('document.write'))throw new Error('carregamento 61–90 não preserva a origem do mesmo diretório/CDN.');
console.log('✓ Cadeia do navegador carrega módulos estáticos 1–60 e anexa 61–90 na ordem validada.');
console.log('✓ A terceira etapa usa o mesmo diretório/CDN do runtime já validado.');
