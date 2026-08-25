# A Medida do Louvor — Atlas Estrutural dos Salmos

Página web interativa para estudar os 150 Salmos a partir do protocolo poético de doze passos apresentado em **A Medida do Louvor**.

## Estado atual

### Salmos 1–60 — revisão completa

Os Salmos 1–60 possuem uma camada editorial própria, revisada individualmente. Cada Salmo contém:

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

Os Salmos 46 e 51 incorporam de modo especial as oficinas correspondentes de **A Medida do Louvor**. Nos Salmos com sobrescrições massoréticas mais extensas, o motor aceita múltiplas linhas de título antes do primeiro versículo correspondente na ARA.

### Salmos 61–150 — fase preliminar

A navegação e a análise automática continuam disponíveis, mas a interface os identifica explicitamente como **análise preliminar**. Eles só receberão o selo de revisão quando passarem pelo mesmo processo manual aplicado aos Salmos 1–60.

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

## ARA

A **Almeida Revista e Atualizada (ARA)** é uma tradução protegida por direitos autorais. Para preservar a integridade jurídica do projeto, o texto integral não é copiado para o repositório. A interface oferece links para uma fonte licenciada da ARA no nível do Salmo e, nos Salmos revisados, também no nível de cada versículo.

Quando uma ou mais linhas de sobrescrição fazem parte da numeração do Texto Massorético, mas não correspondem à numeração da ARA, a interface as identifica separadamente como **sobrescrição**, evitando deslocamento entre as duas numerações. A etapa 31–60 passou a testar explicitamente casos com duas linhas de título, incluindo os Salmos 51, 52, 54 e 60.

## Arquitetura

- `salmos.html` — interface principal;
- `data-1.js` a `data-5.js` — metadados dos 150 Salmos;
- `context.js` — gêneros, conexões e dados auxiliares;
- `core.js` — funções estruturais e cálculos descritivos;
- `analysis-01-10.js`, `analysis-11-20.js`, `analysis-21-30.js` — análises manuais dos Salmos 1–30;
- `analysis-factory.js` — estrutura comum da segunda etapa de revisão;
- `analysis-31-40.js`, `analysis-41-50.js`, `analysis-51-60.js` — análises manuais dos Salmos 31–60;
- `manual-render.js` — apresentação da camada revisada;
- `render.js` — navegação, carregamento do hebraico e fallback preliminar;
- `reviewed-31-60-runtime.js` — integração da segunda etapa e suporte a múltiplas sobrescrições;
- `runtime-guard.js` — diagnóstico visível e fallback do Texto Massorético em produção;
- `api/psalm.js` — função serverless para recuperar o texto hebraico quando disponível;
- `scripts/validate-salmos-1-30.cjs` — gate editorial/estrutural atualmente ampliado para 1–60;
- `scripts/validate-html-modules.cjs` — garante que o navegador carregue todos os módulos que a CI testa;
- `scripts/smoke-salmos-ui.cjs` — teste de inicialização e integração da interface;
- `.github/workflows/validate-salmos-1-30.yml` — CI automática, atualmente denominada “Validate Psalms 1-60”;
- `vercel.json` — configuração de publicação.

## Gate de integridade

A CI reprova a revisão caso, entre outros problemas:

- algum dos Salmos 1–60 esteja ausente;
- não haja exatamente 12 passos em ordem;
- faltem fontes, teologia ou campos homiléticos essenciais;
- a relação canônica/cristológica esteja ausente do passo 12;
- a regra de sobrescrição e numeração hebraico/ARA seja quebrada;
- `salmos.html` deixe de carregar algum módulo revisado ou altere a ordem exigida;
- a antiga vocalização sintética reapareça;
- os arquivos JavaScript deixem de compilar ou `vercel.json` fique inválido;
- o bootstrap de produção deixe de apontar para o bundle imutável validado.

O smoke test abre Salmos 1, 23, 31, 46, 51, 60 e 61. Ele verifica a camada revisada, o conteúdo específico da oficina do Salmo 46, as duas sobrescrições e a numeração ARA dos Salmos 51 e 60 e confirma que o Salmo 61 permanece preliminar.

## Branches

Etapa 31–60 concluída em: `salmos-31-60-revisao`  
Base estrutural consolidada: `salmos-estruturais`
