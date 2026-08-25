# A Medida do Louvor — Atlas Estrutural dos Salmos

Página web interativa para estudar os 150 Salmos a partir do protocolo poético de doze passos apresentado em **A Medida do Louvor**.

## Estado atual

### Salmos 1–118 — revisão completa

Os Salmos 1–118 possuem uma camada editorial própria, revisada individualmente. Cada Salmo contém:

- exatamente os 12 passos do método;
- explicações em linguagem mais simples, mantendo o termo técnico como referência secundária;
- análise de texto, divisões das linhas, sintaxe, paralelismo, ritmo, recursos poéticos, estrofes, macroestrutura e desvios relevantes;
- proposição central específica;
- localização canônica e relação com Cristo;
- implicações teológicas;
- esboço homilético derivado do movimento real do texto;
- necessidade humana exposta pelo Salmo, conexão evangélica e aplicações pastorais;
- acesso ao Texto Massorético e à cantilação hebraica;
- atalhos para a ARA em fonte licenciada, inclusive por versículo.

As oficinas e controles específicos de **A Medida do Louvor** são incorporados quando aplicáveis. Na faixa 91–118, receberam atenção especial: o uso correto das promessas do **Salmo 91** à luz da tentação de Jesus; o “Hoje” do **Salmo 95** em Hebreus 3–4; a imutabilidade/cristologia do **Salmo 102** em Hebreus 1; o **Salmo 104** e a comparação controlada com o Hino a Aton; o caráter imprecatório do **Salmo 109**; o Rei-Sacerdote do **Salmo 110**; os acrósticos pareados **111–112**; e o Hallel egípcio **113–118**, encerrado pelo uso messiânico explícito do **Salmo 118**.

### Salmo 119 — revisão separada

O Salmo 119 permanece propositalmente como **análise preliminar**. Ele será tratado em uma etapa exclusiva por causa de sua extensão (176 versículos) e de sua arquitetura acróstica de 22 estrofes correspondentes às letras do alfabeto hebraico.

### Salmos 120–150 — fase preliminar

A navegação e a análise automática continuam disponíveis, mas a interface os identifica explicitamente como **análise preliminar** até que recebam a mesma revisão manual.

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

## ARA e numeração

A **Almeida Revista e Atualizada (ARA)** é uma tradução protegida por direitos autorais. Para preservar a integridade jurídica do projeto, o texto integral não é copiado para o repositório. A interface oferece links para uma fonte licenciada da ARA no nível do Salmo e, nos Salmos revisados, também no nível de cada versículo.

Quando uma ou mais linhas de sobrescrição fazem parte da numeração do Texto Massorético, mas não correspondem à numeração da ARA, a interface as identifica separadamente como **sobrescrição**. A camada revisada também aceita Salmos sem rubrica e rubricas massoréticas de diferentes extensões sem deslocar a numeração da ARA.

## Arquitetura

- `salmos.html` — interface principal validada;
- `data-1.js` a `data-5.js` — metadados dos 150 Salmos;
- `context.js` — gêneros, conexões e dados auxiliares;
- `core.js` — funções estruturais e cálculos descritivos;
- `analysis-01-10.js`, `analysis-11-20.js`, `analysis-21-30.js` — análises 1–30;
- `analysis-factory.js` — fábrica estrutural das etapas seguintes;
- `analysis-31-40.js`, `analysis-41-50.js`, `analysis-51-60.js` — análises 31–60;
- `analysis-61-70.js`, `analysis-71-80.js`, `analysis-81-90.js` — análises 61–90;
- `analysis-91-100.js`, `analysis-101-110.js`, `analysis-111-118.js` — análises 91–118;
- `manual-render.js` — apresentação da camada revisada;
- `render.js` — navegação, carregamento do hebraico e fallback preliminar;
- `reviewed-31-60-runtime.js` — integração da segunda etapa e carregamento seguro da terceira;
- `reviewed-61-90-runtime.js` — integração 61–90 e carregamento seguro da quarta etapa;
- `reviewed-91-118-runtime.js` — atualização final da interface para 1–118 e isolamento explícito do Salmo 119;
- `runtime-guard.js` — diagnóstico visível e fallback do Texto Massorético em produção;
- `api/psalm.js` — função serverless para recuperar o texto hebraico quando disponível;
- `scripts/validate-salmos-1-30.cjs` — gate editorial/estrutural, atualmente ampliado para 1–118;
- `scripts/validate-html-modules.cjs` — verifica a cadeia real de módulos entregue ao navegador;
- `scripts/smoke-salmos-ui.cjs` — smoke test da interface;
- `.github/workflows/validate-salmos-1-30.yml` — CI automática, atualmente denominada **Validate Psalms 1-118**;
- `index.html` — bootstrap resiliente fixado em um commit imutável validado;
- `vercel.json` — configuração de publicação.

## Gate de integridade

A CI reprova a revisão se faltar qualquer Salmo 1–118, se uma análise perder um dos 12 passos, se faltarem fontes, teologia, homilética ou relação canônica/cristológica, se a regra de sobrescrição/ARA quebrar, se a cadeia real de módulos do navegador ficar incompleta, se a antiga voz sintética reaparecer, se JavaScript essencial não compilar ou se o bootstrap deixar de apontar para o bundle imutável validado.

O smoke test percorre casos de todas as etapas e, na faixa nova, verifica especialmente **91, 92, 95, 102, 104, 110, 117 e 118**. Ele exige ainda que o **Salmo 119 permaneça preliminar**, sem selo de revisão, até sua etapa própria.

## Branches

Etapa atual: `salmos-91-118-revisao`  
Base estrutural consolidada: `salmos-estruturais`
