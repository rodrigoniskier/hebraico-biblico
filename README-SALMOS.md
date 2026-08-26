# A Medida do Louvor — Atlas Estrutural dos Salmos

Página web interativa para estudar os 150 Salmos a partir do protocolo poético de doze passos apresentado em **A Medida do Louvor**.

## Estado atual

### Salmos 1–119 — revisão completa

Os Salmos 1–119 possuem uma camada editorial própria, revisada individualmente. Cada Salmo contém:

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

### Salmo 119 — tratamento especial

O Salmo 119 não foi reduzido ao mesmo nível de detalhe dos Salmos menores. Ele recebeu uma camada própria baseada especialmente no cap. 15.3 de **A Medida do Louvor**, que o descreve como a “arquitetura suprema” do acróstico bíblico.

A revisão registra e testa:

- 176 versículos sem sobrescrição separada;
- 22 estrofes de 8 versos, de **א Aleph** a **ת Tav**;
- todos os oito versos de cada estrofe iniciados pela mesma letra hebraica;
- os oito termos recorrentes da instrução divina: `tôrâ`, `ʿēdōt/ʿēdût`, `piqqûdîm`, `ḥuqqîm`, `miṣwōt`, `mišpāṭîm`, `dābār` e `ʾimrâ`;
- resumo exegético individual das 22 estrofes;
- leitura do paralelismo em cada uma das 22 estrofes;
- mapa visual Aleph–Tav e tabela dos oito termos na interface;
- os três efeitos formais defendidos pelo livro: **exaustividade, ordem e memorização**;
- cautela explícita diante de contagens divergentes dos versos que não usam um dos oito termos estritos;
- rejeição de numerologia e de uma leitura messiânica direta não sustentada;
- conexão cristológica histórico-canônica: Cristo como Filho obediente que cumpre a Lei, sem alegorizar cada ocorrência de “palavra” como referência lexical a João 1;
- v. 176, a ovelha perdida, como correção final de qualquer perfeccionismo ou autossuficiência;
- recomendação homilética de trabalhar preferencialmente uma estrofe por sermão, explicando a arquitetura do todo.

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

Quando uma ou mais linhas de sobrescrição fazem parte da numeração do Texto Massorético, mas não correspondem à numeração da ARA, a interface as identifica separadamente como **sobrescrição**. O Salmo 119 é testado especificamente como um Salmo sem sobrescrição separada, mantendo correspondência direta entre TM 119.1–176 e ARA 119.1–176.

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
- `analysis-119.js` — análise dedicada do Salmo 119 e metadados das 22 estrofes / oito termos;
- `manual-render.js` — apresentação da camada revisada;
- `render.js` — navegação, carregamento do hebraico e fallback preliminar;
- `reviewed-31-60-runtime.js` — integração 31–60 e carregamento das etapas seguintes;
- `reviewed-61-90-runtime.js` — integração 61–90 e carregamento 91–118;
- `reviewed-91-118-runtime.js` — integração 91–118 e carregamento da etapa exclusiva 119;
- `reviewed-119-runtime.js` — atualização da interface para 1–119 e mapa especial do acróstico;
- `runtime-guard.js` — diagnóstico visível e fallback do Texto Massorético em produção;
- `api/psalm.js` — função serverless para recuperar o texto hebraico quando disponível;
- `scripts/validate-salmos-1-30.cjs` — gate editorial/estrutural, atualmente ampliado para 1–119;
- `scripts/validate-html-modules.cjs` — verifica a cadeia real de módulos entregue ao navegador;
- `scripts/smoke-salmos-ui.cjs` — smoke test da interface, incluindo 176 versos do Salmo 119;
- `.github/workflows/validate-salmos-1-30.yml` — CI automática, atualmente denominada **Validate Psalms 1-119**;
- `index.html` — bootstrap resiliente fixado em um commit imutável validado;
- `vercel.json` — configuração de publicação.

## Gate de integridade

A CI reprova a revisão se faltar qualquer Salmo 1–119, se uma análise perder um dos 12 passos, se faltarem fontes, teologia, homilética ou relação canônica/cristológica, se a regra de sobrescrição/ARA quebrar, se a cadeia real de módulos do navegador ficar incompleta, se a antiga voz sintética reaparecer, se JavaScript essencial não compilar ou se o bootstrap deixar de apontar para o bundle imutável validado.

Para o Salmo 119, o gate ainda exige **22 estrofes**, **8 termos da Torá**, a sequência hebraica completa `אבגדהוזחטיכלמנסעפצקרשת`, 22 entradas no passo 6, 22 entradas no passo 8, a cautela do livro no passo 10 e a rejeição de uma profecia messiânica direta no passo 12. O smoke test exige ainda 176 versículos, ARA 119.176, clímax homilético no v. 176 e confirma que o **Salmo 120 permanece preliminar**.

## Branches

Etapa especial: `salmo-119-revisao`  
Base estrutural consolidada: `salmos-estruturais`
