# A Medida do Louvor — Atlas Estrutural dos Salmos

Página web interativa para estudar os 150 Salmos por meio do protocolo poético-rítmico de doze passos apresentado em **A Medida do Louvor**.

## Conteúdo

- navegação e filtros dos 150 Salmos por livro do Saltério, gênero e características formais;
- texto hebraico sob demanda, com colometria conservadora apoiada nos acentos massoréticos;
- contagens descritivas de unidades, palavras e núcleos vocálicos, com destaque de desvios;
- os 12 passos do protocolo, com distinção explícita entre dado do livro, cálculo, síntese editorial e revisão humana;
- grade das cinco perguntas de paralelismo;
- estrofes, macroestrutura, situação canônica e relação cristológica;
- implicações teológicas e esboço homilético derivado da forma;
- oficina pessoal com notas e progresso gravados no navegador.

## Princípio metodológico

A aplicação não trata a poesia hebraica como portadora de metro clássico rígido. As contagens são descritivas e as divisões automáticas em cólons são hipóteses de trabalho a serem verificadas pela sintaxe, pelo paralelismo e pelo aparato crítico. Nenhuma emenda textual é proposta *metri causa*.

## Arquivos principais

- `salmos.html`: interface;
- `data-1.js` a `data-5.js`: metadados dos 150 Salmos;
- `context.js`: gêneros, teologia, oficinas-modelo e conexões cristológicas;
- `core.js`: motor de análise estrutural;
- `render.js`: interação e apresentação dos 12 passos;
- `api/psalm.js`: função serverless para o texto hebraico;
- `vercel.json`: configuração de publicação.

Branch: `salmos-estruturais`.
