const fs=require('fs');const vm=require('vm');
const ROOT=process.cwd(),read=f=>fs.readFileSync(`${ROOT}/${f}`,'utf8');
const analysisFiles=['analysis-01-10.js','analysis-11-20.js','analysis-21-30.js','analysis-factory.js','analysis-31-40.js','analysis-41-50.js','analysis-51-60.js','analysis-61-70.js','analysis-71-80.js','analysis-81-90.js','analysis-91-100.js','analysis-101-110.js','analysis-111-118.js','analysis-119.js','analysis-120-130.js','analysis-131-140.js','analysis-141-150.js'];
const {sourceDescriptor,SOURCES}=require('../source-registry.js');
const box={window:{}};vm.createContext(box);for(const f of analysisFiles)vm.runInContext(read(f),box,{filename:f});
const analyses=box.window.MANUAL_ANALYSES||{},errors=[],warnings=[],categoryCounts={},unique=new Map();
for(let n=1;n<=150;n++){
  const a=analyses[String(n)];if(!a){errors.push(`Salmo ${n}: análise ausente para auditoria de fontes.`);continue;}
  const labels=Array.isArray(a.sources)?a.sources:[];if(labels.length<3)errors.push(`Salmo ${n}: menos de três fontes/referências declaradas.`);
  const desc=labels.map(sourceDescriptor);for(const d of desc){categoryCounts[d.id]=(categoryCounts[d.id]||0)+1;if(!unique.has(d.label))unique.set(d.label,d);if(d.id==='unknown')errors.push(`Salmo ${n}: fonte não catalogada: "${d.label}".`);}
  if(!desc.some(d=>d.id==='tm'))errors.push(`Salmo ${n}: não declara o Texto Massorético como base primária.`);
  if(!desc.some(d=>d.id==='medida'))warnings.push(`Salmo ${n}: não declara explicitamente A Medida do Louvor como fonte metodológica.`);
  if(!desc.some(d=>d.id==='scripture'))warnings.push(`Salmo ${n}: fontes não trazem referência bíblica canônica explícita; conferir se ela está apenas no corpo da análise.`);
}
const requiredRegistry=['tm','medida','calvin','ash','greidanus','vangemeren','waltke','robertson','wilson','berlin','alter','kugel','dobbs','fokkelman','watson','wcf','textual','scripture'];
for(const id of requiredRegistry){const s=SOURCES[id];if(!s)errors.push(`Registro de fontes: entrada obrigatória ausente: ${id}.`);else if(!s.name||!s.type||!s.status||!s.note)errors.push(`Registro de fontes: entrada ${id} incompleta.`);}
console.log('\nCategorias de proveniência encontradas:');for(const [id,count] of Object.entries(categoryCounts).sort())console.log(`  ${id}: ${count}`);
console.log(`\nRótulos de fonte únicos: ${unique.size}.`);
if(warnings.length){console.log(`\nAvisos (${warnings.length}):`);for(const w of warnings)console.log(`  ⚠ ${w}`);}
if(errors.length){console.error(`\nAuditoria de fontes falhou: ${errors.length} problema(s).`);for(const e of errors)console.error(`  ✗ ${e}`);process.exit(1);}
console.log('\n✓ Todas as fontes declaradas nos 150 Salmos correspondem ao registro auditado ou a referências bíblicas canônicas.');
console.log('✓ Texto Massorético está declarado como base primária em 150/150 análises.');
console.log('✓ Registro bibliográfico separa texto primário, método, poética, estrutura canônica, comentário reformado e fontes confessionais.');
