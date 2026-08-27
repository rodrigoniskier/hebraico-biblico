const fs=require('fs');
const runtime=fs.readFileSync('reviewed-120-150-runtime.js','utf8');
const renderer=fs.readFileSync('manual-render.js','utf8');
function assert(condition,message){if(!condition){console.error(`✗ ${message}`);process.exit(1);}}
assert(/renderReviewedSteps/.test(renderer),'Renderizador revisado não foi encontrado.');
assert(/classList\.toggle\(["']open["']\)/.test(renderer),'Renderizador base perdeu o toggle dos passos.');
assert(/bindReviewedStepToggles/.test(runtime),'Runtime final não reforça a interatividade dos passos.');
assert(/b\.onclick\s*=/.test(runtime),'Runtime final não registra clique nos passos revisados.');
assert(!/\$\(["']steps["']\)\.innerHTML\s*=\s*\$\(["']steps["']\)\.innerHTML/.test(runtime),'Runtime final volta a reescrever steps.innerHTML e destruir eventos.');
assert(/aria-expanded/.test(runtime)&&/aria-controls/.test(runtime),'Runtime final perdeu atributos de acessibilidade do acordeão.');
console.log('✓ Acordeões dos 12 passos preservam eventos após a renderização final.');
