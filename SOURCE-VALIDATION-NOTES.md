# Notas de validação das fontes

Este arquivo registra as conclusões editoriais da revisão final do Atlas.

- A base textual de cada análise é o **texto hebraico massorético**.
- A **Sefaria Texts API v3** é a fonte eletrônica operacional usada para exibir o hebraico em produção com `version=source`; isso não identifica automaticamente uma edição crítica específica.
- **BHS/BHQ, Códice de Leningrado, Qumran, LXX, Peshitta, Tanach.us/UXLC e STEP Bible** são controles/testemunhas/ferramentas textuais usados conforme a relevância de cada variante.
- **A Medida do Louvor** fornece o protocolo, oficinas, critérios de poética, hermenêutica e homilética do projeto.
- Obras da bibliografia do livro-base são distinguidas das obras explicitamente declaradas no campo `sources` de cada Salmo. A simples presença de uma obra na bibliografia metodológica não é apresentada como consulta individual a todos os 150 Salmos.
- Rótulos como “teologia pactual”, “aliança davídica” ou “contexto do Antigo Oriente Próximo” são classificados como **enquadramento interpretativo**, não como fontes bibliográficas independentes.
- O gate de CI reprova qualquer nova referência que não possa ser classificada pelo registro auditado.
- A auditoria atual não encontrou nenhuma fonte desconhecida entre as referências declaradas nas 150 análises.

A validação bibliográfica completa e seus limites estão documentados em `SOURCES-AUDIT.md`.
