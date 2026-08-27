# A Medida do Louvor — Atlas Estrutural dos Salmos

Página web interativa para estudar os 150 Salmos a partir do protocolo poético de doze passos apresentado em **A Medida do Louvor**.

## Estado atual

### Salmos 1–150 — revisão completa

Os **150 Salmos** possuem uma camada editorial própria, revisada individualmente. Cada Salmo contém:

- exatamente os 12 passos do método;
- explicações em linguagem mais simples, mantendo o termo técnico como referência secundária;
- análise de texto, divisões das linhas, sintaxe, paralelismo, ritmo, recursos poéticos, estrofes, macroestrutura e desvios relevantes;
- proposição central específica;
- localização canônica e relação com Cristo;
- implicações teológicas;
- esboço homilético derivado do movimento real do texto;
- necessidade humana exposta pelo Salmo, conexão evangélica e aplicações pastorais;
- acesso ao texto hebraico massorético e à cantilação hebraica;
- atalhos para a ARA em fonte licenciada, inclusive por versículo;
- proveniência das fontes exibida na própria análise.

A interface mantém em todas as telas o crédito: **Desenvolvido por Rodrigo Niskier Ferreira Barbosa**.

### Salmo 119 — tratamento especial

O Salmo 119 recebeu uma camada própria baseada especialmente no cap. 15.3 de **A Medida do Louvor**, que o descreve como a “arquitetura suprema” do acróstico bíblico. O gate preserva 176 versículos, 22 estrofes × 8 versos, sequência Aleph–Tav, oito termos recorrentes da instrução divina, cautela textual e leitura cristológica histórico-canônica sem alegorização atomística.

### Salmos 120–150 — etapa final

A última etapa conclui o Saltério com atenção especial a:

- 120–134 — Cânticos das Subidas;
- 121 — oficina da mudança de pessoa e provável dinâmica antifonal;
- 127–128 — par formal;
- 130 — oficina *De profundis*, quatro estrofes e v. 4 como centro teológico;
- 137 — lamento imprecatório lido como entrega da causa ao Juiz, não licença para vingança privada;
- 145 — acróstico com a lacuna do *nûn* no TM e testemunhos de Qumran/LXX/Peshitta;
- 146–150 — Hallel final e conclusão do Saltério.

## Hermenêutica adotada

A leitura segue uma abordagem reformada histórico-gramatical-teológica:

1. estabelece o texto e observa primeiro o hebraico em seu contexto literário e histórico;
2. deixa gramática, sintaxe, paralelismo e estrutura controlarem a interpretação;
3. usa a própria Escritura como regra de interpretação da Escritura;
4. situa o Salmo na progressão pactual e canônica;
5. chega a Cristo por caminhos controlados pelo texto e pelo cânon, sobretudo pelo uso do Novo Testamento;
6. evita tanto moralismo sem evangelho quanto alegorização de detalhes sem apoio exegético;
7. deriva teologia, aplicação e pregação da mensagem e da arquitetura do próprio Salmo.

As contagens rítmicas são descritivas. Uma diferença de tamanho só recebe peso interpretativo quando coincide com uma mudança de sentido identificável por razões independentes.

## Texto hebraico, Sefaria e controle textual

O hebraico de produção é recuperado pela **Sefaria Texts API v3** com `version=source` e `return_format=text_only`. Essa chamada fornece a versão em língua-fonte prioritária no acervo da Sefaria; ela **não deve ser confundida com a afirmação de que o endpoint fixa uma edição crítica específica**.

BHS/BHQ, Códice de Leningrado, Qumran, LXX, Peshitta, Tanach.us/UXLC e outras testemunhas/ferramentas pertencem à camada de controle textual quando uma variante é relevante. A função serverless possui validação de resposta, timeout, cache e fallback para o endpoint legado da Sefaria.

## ARA e numeração

A **Almeida Revista e Atualizada (ARA)** é uma tradução protegida por direitos autorais. O texto integral não é copiado para o repositório. A interface oferece links para uma fonte licenciada no nível do Salmo e de cada versículo revisado.

Quando linhas de sobrescrição pertencem à numeração do Texto Massorético, mas não à numeração da ARA, a interface as identifica como **sobrescrição** e desloca corretamente os links. Casos com mais de uma linha-título e o Salmo 119 sem sobrescrição separada estão cobertos pelo smoke test.

## Proveniência das análises

`source-registry.js` cataloga as fontes e separa três classes visuais:

- **✓** fonte/referência catalogada e auditada;
- **◇** síntese ou enquadramento interpretativo — não é fonte bibliográfica independente;
- **⚠** fonte não catalogada — reprova a auditoria de CI.

O relatório completo está em `SOURCES-AUDIT.md`. A auditoria confirma Texto Massorético como base declarada em 150/150 análises e impede o surgimento silencioso de referências desconhecidas. A bibliografia do método-base é diferenciada das obras efetivamente declaradas em cada Salmo, evitando inflar a proveniência.

## Arquitetura

- `salmos.html` — interface principal;
- `data-1.js` a `data-5.js` — metadados dos 150 Salmos;
- `context.js` — gêneros, conexões e dados auxiliares;
- `core.js` — colometria conservadora, cálculos descritivos e funções estruturais;
- `analysis-01-10.js` a `analysis-141-150.js` — análises revisadas dos 150 Salmos;
- `analysis-119.js` — camada especializada do Salmo 119;
- `source-registry.js` — registro auditável de proveniência;
- `manual-render.js` — apresentação da análise revisada e das fontes;
- `render.js` — navegação e carregamento do hebraico;
- `reviewed-31-60-runtime.js`, `reviewed-61-90-runtime.js`, `reviewed-91-118-runtime.js`, `reviewed-119-runtime.js`, `reviewed-120-150-runtime.js` — cadeia progressiva de módulos;
- `runtime-guard.js` — diagnóstico visível e fallback do texto hebraico;
- `api/psalm.js` — função serverless endurecida para a Sefaria;
- `scripts/validate-salmos-1-30.cjs` — gate editorial/estrutural ampliado para 1–150;
- `scripts/audit-sources.cjs` — auditoria de proveniência;
- `scripts/test-colometry.cjs` — testes dos disjuntivos massoréticos usados pela colometria;
- `scripts/validate-html-modules.cjs` — valida cadeia real entregue ao navegador;
- `scripts/smoke-salmos-ui.cjs` — testa interface, navegação, numeração, ARA, hash, limites, persistência, fontes e créditos;
- `.github/workflows/validate-salmos-1-30.yml` — CI **Validate Psalms 1-150**;
- `index.html` — bootstrap resiliente para publicação;
- `SOURCES-AUDIT.md` — relatório de fontes e limites da validação;
- `vercel.json` — configuração da publicação.

## Gate de integridade

A CI reprova a revisão se:

- faltar qualquer Salmo 1–150 ou qualquer um dos 12 passos;
- fontes, teologia, homilética ou relação canônica/cristológica ficarem incompletas;
- surgir uma fonte não catalogada;
- a numeração TM/ARA quebrar;
- a colometria deixar de reconhecer os disjuntivos massoréticos testados;
- a cadeia de módulos do navegador ficar incompleta;
- a antiga voz sintética reaparecer;
- JavaScript essencial não compilar;
- navegação, hash, limites ou persistência local quebrarem;
- o crédito **Desenvolvido por Rodrigo Niskier Ferreira Barbosa** desaparecer;
- o bootstrap de produção deixar de apontar para um bundle imutável validado.

## Branches

Etapa final em revisão: `salmos-120-150-revisao`  
Base estrutural consolidada: `salmos-estruturais`
