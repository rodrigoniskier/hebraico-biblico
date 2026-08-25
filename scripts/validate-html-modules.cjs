const fs=require('fs');
const html=fs.readFileSync('salmos.html','utf8');
const required=[
  '/data-1.js','/data-2.js','/data-3.js','/data-4.js','/data-5.js','/context.js','/core.js',
  '/analysis-01-10.js','/analysis-11-20.js','/analysis-21-30.js',
  '/analysis-factory.js','/analysis-31-40.js','/analysis-41-50.js','/analysis-51-60.js',
  '/manual-render.js','/render.js','/reviewed-31-60-runtime.js'
];
let last=-1;
for(const src of required){
  const needle=`src="${src}"`;
  const idx=html.indexOf(needle);
  if(idx<0){console.error(`✗ salmos.html não carrega ${src}`);process.exit(1);}
  if(idx<=last){console.error(`✗ ordem incorreta de scripts perto de ${src}`);process.exit(1);}
  last=idx;
}
if(!html.includes('Salmos 1–60')){console.error('✗ salmos.html não informa a faixa revisada 1–60');process.exit(1);}
if(!html.includes('Salmos 61–150')){console.error('✗ salmos.html não informa a faixa preliminar 61–150');process.exit(1);}
console.log('✓ salmos.html carrega todos os módulos 1–60 na ordem validada.');
console.log('✓ A interface identifica 1–60 como revisados e 61–150 como preliminares.');
