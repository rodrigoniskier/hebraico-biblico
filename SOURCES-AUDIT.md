# Auditoria de fontes e proveniência

**Projeto:** A Medida do Louvor — Atlas Estrutural dos Salmos  
**Escopo:** Salmos 1–150  
**Data da auditoria:** 26/08/2026

## Princípio de transparência

A auditoria distingue quatro coisas que não devem ser confundidas:

1. **texto primário** — o texto hebraico massorético do Salmo;
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

As ausências de menção explícita a *A Medida do Louvor* em sete objetos antigos não significam mudança de método: o protocolo é global ao projeto. Da mesma forma, a relação canônica/cristológica é validada pelo passo 12 de todas as 150 análises, mesmo quando o campo `sources` não repete uma referência bíblica específica. Os avisos gerados pela auditoria nesses casos são de **completude de metadados**, não indícios de fonte desconhecida ou de análise sem controle canônico.

## Fontes primárias e operacionais

### Texto hebraico massorético

O texto hebraico massorético é a base primária de **150/150** análises. Em produção, o hebraico é recuperado pela **Sefaria Texts API v3**, pedindo `version=source` e `return_format=text_only`; a própria documentação da Sefaria define `source` como a edição em língua-fonte e recomenda a v3 como endpoint atual para recuperação de textos. A função serverless valida o retorno, aplica timeout e cache e usa o endpoint v1 apenas como fallback técnico.

**Precisão importante:** a chamada `version=source` não deve ser descrita como se fixasse, por si só, uma edição crítica específica como BHS/BHQ ou o Códice de Leningrado. A Sefaria seleciona a versão-fonte prioritária de seu acervo. Por isso o projeto distingue:

- **fonte eletrônica operacional:** Sefaria, para exibição do hebraico com sinais massoréticos;
- **controle textual/metodológico:** Códice de Leningrado, BHS/BHQ, Qumran, LXX, Peshitta, Tanach.us/UXLC e outras testemunhas/ferramentas quando uma variante é relevante.

Essa distinção impede que a interface atribua a uma edição eletrônica uma identidade crítica que o endpoint não garante.

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

Durante a revisão final foram reconferidos, em documentação oficial, páginas de editoras, catálogos ou repositórios institucionais:

- **Sefaria Texts API v3** — documentação oficial confirma `version=source`, `return_format=text_only` e a v3 como endpoint atual;
- **Adele Berlin** — Eerdmans, *The Dynamics of Biblical Parallelism*, ISBN 9780802803979, edição revista publicada em 18/12/2007;
- **Sidney Greidanus** — Eerdmans, *Preaching Christ from Psalms*, 2016, ISBN 9780802873668;
- **Waltke/Houston/Moore** — Eerdmans, *Christian Worship* (2010), *Christian Lament* (2014) e *Christian Praise* (2019);
- **Willem A. VanGemeren** — Zondervan Academic, *Psalms*, EBC revisado, 2008, ISBN 9780310234975;
- **Gerald H. Wilson** — *The Editing of the Hebrew Psalter*, SBL Dissertation Series 76, Scholars Press, 1985, confirmado também em publicação da Society of Biblical Literature;
- **O. Palmer Robertson** — P&R, *The Flow of the Psalms*, 2015, ISBN 9781629951331;
- **Christopher Ash** — Christian Focus, *Teaching Psalms Vol. 1*, 2017, ISBN 9781527100046;
- **João Calvino / James Anderson** — CCEL, *Commentary on the Book of Psalms*;
- **F. W. Dobbs-Allsopp** — Oxford University Press, *On Biblical Poetry*, 2015, DOI 10.1093/acprof:oso/9780199766901.001.0001;
- **James L. Kugel** — Johns Hopkins University Press, *The Idea of Biblical Poetry*, reimpressão de 1998, ISBN 9780801859441;
- **J. P. Fokkelman** — Brill, série *Major Poems of the Hebrew Bible*: vol. I (1998), vol. II (2000), vol. III e vol. IV, completando o projeto até 2004 nas edições impressas originais;
- **Confissão de Fé de Westminster** — texto confessional conferido na Westminster Seminary California;
- **NET Bible / NET Bible Notes** — recurso editorial ligado à Biblical Studies Press.

## Rótulos que não são fontes bibliográficas

Alguns objetos antigos continham expressões como:

- “teologia pactual reformada”;
- “aliança davídica”;
- “teologia bíblica da presença de Deus”;
- “contexto do Antigo Oriente Próximo usado apenas como iluminação comparativa”;
- “consulta secundária: estudos estruturais”.

A auditoria **não os promoveu a fontes**. Eles são classificados como **◇ síntese/enquadramento editorial — não é fonte independente**. Na interface:

- **✓** = fonte ou referência catalogada/auditada;
- **◇** = enquadramento interpretativo do projeto;
- **⚠** = referência não catalogada que exigiria auditoria.

O gate de CI falha se surgir uma nova fonte `⚠`.

## Limites da validação

Esta auditoria valida **existência, identidade bibliográfica, função declarada e rastreabilidade** das fontes. Ela não significa que toda afirmação de cada obra secundária foi independentemente reproduzida ou verificada página por página. Para as afirmações centrais do site, a ordem de controle continua sendo:

**texto hebraico massorético → gramática/sintaxe/forma do Salmo → contexto canônico → uso explícito do Novo Testamento → síntese teológica reformada.**

Fontes comparativas do Antigo Oriente Próximo iluminam o ambiente; não substituem o controle canônico. Diferenças rítmicas só recebem significado quando convergem com uma articulação semântica identificável por razões independentes.
