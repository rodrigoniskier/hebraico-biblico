# Auditoria de fontes e proveniência

**Projeto:** A Medida do Louvor — Atlas Estrutural dos Salmos  
**Escopo:** Salmos 1–150  
**Data da auditoria:** 26/08/2026

## Princípio de transparência

A auditoria distingue quatro coisas que não devem ser confundidas:

1. **texto primário** — o Texto Massorético do Salmo;
2. **fontes diretamente declaradas em cada análise** — obras, notas e referências bíblicas efetivamente registradas no objeto daquele Salmo;
3. **método-base** — *A Medida do Louvor*, que fornece o protocolo dos doze passos, critérios poéticos, oficinas e enquadramento hermenêutico;
4. **bibliografia de sustentação do método** — obras acadêmicas e reformadas auditadas pelo próprio livro-base. A presença de uma obra nesta quarta categoria não significa que ela tenha sido consultada separadamente para cada um dos 150 Salmos.

Essa distinção evita inflar a bibliografia e permite identificar quando um rótulo é apenas uma síntese interpretativa, e não uma fonte independente.

## Resultado automatizado da auditoria

Na execução final de CI, os 150 Salmos foram percorridos individualmente. O registro encontrou, entre os rótulos diretamente declarados:

- **Texto Massorético:** 150 análises;
- **João Calvino, Comentário dos Salmos:** 149 análises;
- **A Medida do Louvor:** 143 análises com menção explícita no próprio campo `sources`;
- **referências bíblicas canônicas:** 147 análises com referência explícita no campo `sources`;
- **NET Bible Notes:** 9 análises;
- **testemunhas/ferramentas de crítica textual:** 1 análise com rótulo explícito agregado;
- **Confissão de Fé de Westminster:** 1 análise com rótulo explícito no campo de fontes;
- **sínteses/enquadramentos editoriais:** 7 rótulos.

As ausências de menção explícita a *A Medida do Louvor* em sete objetos antigos não significam mudança de método: o protocolo é global ao projeto. Da mesma forma, a relação canônica/cristológica é validada pelo passo 12 de todas as 150 análises, mesmo quando o campo `sources` não repete uma referência bíblica específica.

## Fontes primárias e operacionais

### Texto Massorético

O Texto Massorético é a base primária de **150/150** análises. O texto hebraico operacional é recuperado pela **Sefaria Texts API v3** em língua-fonte. A função serverless valida o retorno e usa o endpoint legado apenas como fallback técnico.

O livro-base também registra Códice de Leningrado/BHS-BHQ, Tanach.us/UXLC e STEP Bible entre as ferramentas relevantes para conferência textual.

### ARA

A Almeida Revista e Atualizada é usada como tradução de leitura por meio de links para fonte licenciada. O texto integral da ARA não é republicado no repositório.

## Fontes diretamente usadas ou declaradas

### João Calvino — *Commentary on the Book of Psalms*

- função: comentário reformado histórico;
- edição tradicional em inglês: tradução de James Anderson, Calvin Translation Society, 1845–1849;
- cópia eletrônica conferível no Christian Classics Ethereal Library (CCEL).

### NET Bible Notes

- função: apoio linguístico, textual e de opções de tradução em alguns Salmos iniciais;
- responsável editorial: Biblical Studies Press;
- as notas constituem recurso editorial próprio da NET Bible e não são tratadas como Texto Massorético nem como autoridade confessional.

### Escritura — referências canônicas

As referências bíblicas servem ao contexto remoto, analogia da fé e controle do uso cristológico. Elas não substituem o sentido histórico-gramatical do Salmo.

### Confissão de Fé de Westminster

O padrão confessional sustenta os pressupostos reformados do projeto, especialmente doutrina da Escritura, providência, meios ordinários e culto. Não é usada para impor um sentido ao texto, mas como formulação confessional que deve ser derivável da Escritura.

## Bibliografia que sustenta o método-base

O próprio *A Medida do Louvor* possui um **Apêndice G — Bibliografia auditada**. Entre as obras ali registradas e reconferidas nesta auditoria estão:

### Poética hebraica

- Robert Alter, *The Art of Biblical Poetry*;
- Adele Berlin, *The Dynamics of Biblical Parallelism*;
- F. W. Dobbs-Allsopp, *On Biblical Poetry*;
- J. P. Fokkelman, *Major Poems of the Hebrew Bible*;
- James L. Kugel, *The Idea of Biblical Poetry*;
- Wilfred G. E. Watson, *Classical Hebrew Poetry*.

### Forma canônica do Saltério

- Gerald H. Wilson, *The Editing of the Hebrew Psalter*;
- O. Palmer Robertson, *The Flow of the Psalms*;
- Bruce K. Waltke e colaboradores, estudos dos Salmos e de sua interpretação cristã.

### Hermenêutica e homilética

- Christopher Ash, *Teaching Psalms*;
- Sidney Greidanus, *Preaching Christ from Psalms*;
- Willem A. VanGemeren, *Psalms* no *Expositor's Bible Commentary* revisado;
- Bruce K. Waltke, James M. Houston e Erika Moore, trilogia *The Psalms as Christian Worship / Lament / Praise*;
- João Calvino, *Commentary on the Book of Psalms*.

Essas obras sustentam o método e o enquadramento do livro-base. **Não são apresentadas como se cada uma tivesse sido consultada diretamente em cada análise individual.**

## Referências bibliográficas reconferidas externamente

Durante a revisão final foram reconferidos, em páginas de editoras, catálogos ou repositórios institucionais:

- Adele Berlin — Eerdmans, ISBN 9780802803979, publicação da edição revista em 2007;
- Sidney Greidanus — Eerdmans, *Preaching Christ from Psalms*, 2016, ISBN 9780802873668;
- Waltke/Houston — Eerdmans, *Christian Worship* (2010), *Christian Lament* (2014) e *Christian Praise* (2019);
- Willem A. VanGemeren — Zondervan Academic, *Psalms*, EBC revisado, 2008, ISBN 9780310234975;
- Gerald H. Wilson — Scholars Press/SBL Dissertation Series 76, 1985, ISBN 9780891307280;
- Christopher Ash — Christian Focus, *Teaching Psalms*, vol. 1 publicado em 2017;
- João Calvino / James Anderson — CCEL, *Commentary on Psalms*;
- F. W. Dobbs-Allsopp — Oxford University Press, *On Biblical Poetry*, 2015, DOI 10.1093/acprof:oso/9780199766901.001.0001;
- NET Bible Notes — Biblical Studies Press.

## Rótulos que não são fontes bibliográficas

Alguns objetos antigos continham expressões como:

- “teologia pactual reformada”;
- “aliança davídica”;
- “teologia bíblica da presença de Deus”;
- “contexto do Antigo Oriente Próximo usado apenas como iluminação comparativa”;
- “consulta secundária: estudos estruturais”.

A auditoria **não os promoveu a fontes**. Eles são agora classificados como **◇ síntese/enquadramento editorial — não é fonte independente**. Na interface:

- **✓** = fonte ou referência catalogada/auditada;
- **◇** = enquadramento interpretativo do projeto;
- **⚠** = referência não catalogada que exigiria auditoria.

O gate de CI falha se surgir uma nova fonte `⚠`.

## Limites da validação

Esta auditoria valida **existência, identidade bibliográfica, função declarada e rastreabilidade** das fontes. Ela não significa que toda afirmação de cada obra secundária foi independentemente reproduzida ou verificada página por página. Para as afirmações centrais do site, a ordem de controle continua sendo:

**Texto Massorético → gramática/sintaxe/forma do Salmo → contexto canônico → uso explícito do Novo Testamento → síntese teológica reformada.**

Fontes comparativas do Antigo Oriente Próximo iluminam o ambiente; não substituem o controle canônico. Diferenças rítmicas só recebem significado quando convergem com uma articulação semântica identificável por razões independentes.
