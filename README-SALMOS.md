# A Medida do Louvor — Atlas Estrutural dos Salmos

Página web interativa para estudar os 150 Salmos a partir do protocolo poético de doze passos apresentado em **A Medida do Louvor**.

## Estado atual

### Salmos 1–90 — revisão completa

Os Salmos 1–90 possuem uma camada editorial própria, revisada individualmente. Cada Salmo contém:

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

As oficinas do livro recebem tratamento especial quando pertencem à faixa já revisada. Nesta etapa, o **Salmo 73** segue de perto a oficina sobre o pivô no santuário. Também foram preservados controles canônicos importantes no **Salmo 88** (lamento sem resolução) e na costura **Salmos 89–90** entre a crise davídica do Livro III e a abertura mosaica do Livro IV.

### Salmos 91–150 — fase preliminar

A navegação e a análise automática continuam disponíveis, mas a interface os identifica explicitamente como **análise preliminar**. Eles só receberão o selo de revisão quando passarem pelo mesmo processo manual aplicado aos Salmos 1–90.

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

Quando uma ou mais linhas de sobrescrição fazem parte da numeração do Texto Massorético, mas não correspondem à numeração da ARA, a interface as identifica separadamente como **sobrescrição**. A camada revisada também aceita rubricas que aparecem no mesmo verso massorético que o início do poema, evitando criar deslocamentos artificiais em Salmos como 72, 73, 82, 86, 87 e 90.

## Arquitetura

- `salmos.html` — interface principal validada;
- `data-1.js` a `data-5.js` — metadados dos 150 Salmos;
- `context.js` — gêneros, conexões e dados auxiliares;
- `core.js` — funções estruturais e cálculos descritivos;
- `analysis-01-10.js`, `analysis-11-20.js`, `analysis-21-30.js` — análises manuais dos Salmos 1–30;
- `analysis-factory.js` — fábrica estrutural das etapas seguintes;
- `analysis-31-40.js`, `analysis-41-50.js`, `analysis-51-60.js` — análises 31–60;
- `analysis-61-70.js`, `analysis-71-80.js`, `analysis-81-90.js` — análises 61–90;
- `manual-render.js` — apresentação da camada revisada;
- `render.js` — navegação, carregamento do hebraico e fallback preliminar;
- `reviewed-31-60-runtime.js` — integração da segunda etapa e carregamento seguro da terceira;
- `reviewed-61-90-runtime.js` — atualização da interface e numeração para 1–90;
- `runtime-guard.js` — diagnóstico visível e fallback do Texto Massorético em produção;
- `api/psalm.js` — função serverless para recuperar o texto hebraico quando disponível;
- `scripts/validate-salmos-1-30.cjs` — gate editorial/estrutural, atualmente ampliado para 1–90;
- `scripts/validate-html-modules.cjs` — verifica a cadeia real de módulos entregue ao navegador;
- `scripts/smoke-salmos-ui.cjs` — smoke test da interface;
- `.github/workflows/validate-salmos-1-30.yml` — CI automática, atualmente denominada **Validate Psalms 1-90**;
- `index.html` — bootstrap resiliente fixado em um commit imutável validado;
- `vercel.json` — configuração de publicação.

## Gate de integridade

A CI reprova a revisão se faltar qualquer Salmo 1–90, se qualquer análise perder um dos 12 passos, se faltarem fontes, teologia, homilética ou relação canônica/cristológica, se a regra de sobrescrição/ARA quebrar, se a cadeia real de módulos do navegador ficar incompleta, se a antiga voz sintética reaparecer, se JavaScript essencial não compilar ou se o bootstrap deixar de apontar para o bundle imutável validado.

O smoke test percorre a camada anterior e casos específicos desta etapa, incluindo **61, 73, 82, 88, 89, 90 e 91**. Ele exige que o Salmo 73 carregue sua análise do santuário, que o 88 preserve o final em trevas sem uma virada artificial, que 89–90 preservem a costura canônica e que o Salmo 91 permaneça explicitamente preliminar.

## Branches

Etapa atual: `salmos-61-90-revisao`  
Base estrutural consolidada: `salmos-estruturais`
