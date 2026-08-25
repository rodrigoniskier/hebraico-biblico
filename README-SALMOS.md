# A Medida do Louvor — Atlas Estrutural dos Salmos

Página web interativa para estudar os 150 Salmos a partir do protocolo poético de doze passos apresentado em **A Medida do Louvor**.

## Estado atual

### Salmos 1–30 — revisão completa

Os Salmos 1–30 possuem uma camada editorial própria, revisada individualmente. Cada Salmo contém:

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

### Salmos 31–150 — fase preliminar

A navegação e a análise automática continuam disponíveis, mas a interface os identifica explicitamente como **análise preliminar**. Eles só receberão o selo de revisão quando passarem pelo mesmo processo manual aplicado aos Salmos 1–30.

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

Quando uma sobrescrição faz parte da numeração do Texto Massorético, mas não corresponde ao mesmo número de versículo na ARA, a interface a identifica separadamente como **sobrescrição**, evitando deslocamento entre as duas numerações.

## Arquitetura

- `salmos.html` — interface principal;
- `data-1.js` a `data-5.js` — metadados dos 150 Salmos;
- `context.js` — gêneros, conexões e dados auxiliares;
- `core.js` — funções estruturais e cálculos descritivos;
- `analysis-01-10.js` — análises manuais dos Salmos 1–10;
- `analysis-11-20.js` — análises manuais dos Salmos 11–20;
- `analysis-21-30.js` — análises manuais dos Salmos 21–30;
- `manual-render.js` — apresentação da camada revisada;
- `render.js` — navegação, carregamento do hebraico e fallback preliminar;
- `api/psalm.js` — função serverless para recuperar o texto hebraico;
- `scripts/validate-salmos-1-30.cjs` — gate de integridade editorial/estrutural;
- `scripts/smoke-salmos-ui.cjs` — teste de inicialização e integração da interface;
- `.github/workflows/validate-salmos-1-30.yml` — CI automática;
- `vercel.json` — configuração de publicação.

## Gate de integridade

A CI reprova a revisão caso, entre outros problemas:

- algum dos Salmos 1–30 esteja ausente;
- não haja exatamente 12 passos em ordem;
- faltem fontes, teologia ou campos homiléticos essenciais;
- a relação canônica/cristológica esteja ausente do passo 12;
- a regra de sobrescrição e numeração hebraico/ARA seja quebrada;
- a ordem de carregamento dos módulos seja alterada incorretamente;
- a antiga vocalização sintética reapareça;
- os arquivos JavaScript deixem de compilar ou `vercel.json` fique inválido.

O smoke test também inicializa a aplicação em ambiente simulado e verifica Salmos 1, 23 e 30, além de confirmar que o Salmo 31 permanece marcado como preliminar.

## Branch de trabalho

Revisão atual: `salmos-1-30-revisao`  
Base estrutural: `salmos-estruturais`
