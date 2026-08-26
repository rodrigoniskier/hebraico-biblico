const fs=require('fs');const vm=require('vm');
const code=fs.readFileSync('core.js','utf8');
const box={document:{getElementById(){return null;}}};vm.createContext(box);vm.runInContext(code,box,{filename:'core.js'});
const assert=(c,m)=>{if(!c)throw new Error(m);};
// U+0591 (atnah) must create the primary break instead of falling back to a midpoint.
const atnah='אֶחָד שֵׁנִי שְׁלִישִׁי֑ רְבִיעִי חֲמִישִׁי שִׁשִּׁי';
const a=vm.runInContext(`splitCola(${JSON.stringify(atnah)})`,box);
assert(a.length===2,`Atnah deveria produzir 2 cólons; produziu ${a.length}.`);
assert(a[0].includes('שְׁלִישִׁי'),`Atnah não determinou a fronteira esperada: ${a.join(' // ')}`);
// U+05AB (oleh) is a strong candidate for an additional division in a long poetic verse.
const oleh='א א ב ב ג֫ ג ד ד ה ה ו ו ז ז';
const o=vm.runInContext(`splitCola(${JSON.stringify(oleh)})`,box);
assert(o.length>=2,'Oleh não foi reconhecido em verso longo.');
// No strict meter: short lines without a usable disjunctive are allowed to remain one colon.
const short='אחד שני שלישי רביעי חמישי';
const s=vm.runInContext(`splitCola(${JSON.stringify(short)})`,box);
assert(s.length===1,'Linha curta sem disjuntivo foi artificialmente dividida.');
console.log('✓ Colometria: atnah e oleh são reconhecidos como caracteres massoréticos reais.');
console.log('✓ Fallback conservador não força divisão métrica em linha curta sem disjuntivo.');
