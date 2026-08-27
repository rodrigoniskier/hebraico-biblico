import { useEffect, useMemo, useState } from 'react'

type Quiz = {
  question: string
  options: string[]
  correct: number
  feedback: string
}

type Lesson = {
  id: number
  title: string
  subtitle: string
  everyday: string
  technical?: string
  paragraphs: string[]
  example?: { label: string; lines: string[]; note: string }
  remember: string
  exercise?: string
  quiz: Quiz
}

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Antes de tudo: você não precisa saber hebraico',
    subtitle: 'Comece aprendendo a enxergar, não a decorar nomes.',
    everyday: 'Um Salmo é mais parecido com uma canção ou poema do que com um parágrafo de livro didático.',
    paragraphs: [
      'Por isso, não basta perguntar “o que estas palavras dizem?”. Também vale perguntar “como elas foram organizadas?”.',
      'Repetições, contrastes, pausas e mudanças de direção ajudam a carregar o sentido. A forma não é enfeite. Ela participa da mensagem.',
      'Você pode começar em português. O hebraico melhora a precisão, mas não é a porta de entrada obrigatória para perceber boa parte da estrutura.'
    ],
    example: {
      label: 'Veja a ideia',
      lines: ['Linha A: eu clamo', 'Linha B: eu espero', 'Linha C: eu confio'],
      note: 'Só de olhar a sequência, você já percebe um movimento: clamor → espera → confiança.'
    },
    remember: 'Primeiro enxergue o movimento. Depois aprenda o nome técnico.',
    quiz: {
      question: 'Por que olhar a forma de um Salmo?',
      options: ['Para encontrar códigos secretos', 'Porque a organização do poema também ajuda a comunicar o sentido', 'Para substituir a mensagem pelo formato'],
      correct: 1,
      feedback: 'Isso mesmo. A forma ajuda a carregar o significado; ela não substitui o significado.'
    }
  },
  {
    id: 2,
    title: 'A menor peça: uma linha do poema',
    subtitle: 'Antes de contar versículos, aprenda a ver as linhas.',
    everyday: 'Pense em uma frase curta do poema que funciona como uma pequena unidade de sentido.',
    technical: 'Essa linha é chamada de cólon.',
    paragraphs: [
      'Um versículo bíblico pode conter uma, duas ou mais linhas poéticas.',
      'O importante é não pensar que “um versículo = uma única ideia”. Muitas vezes o versículo é formado por pequenas linhas que trabalham juntas.',
      'Na análise estrutural, essas linhas são as peças básicas.'
    ],
    example: {
      label: 'Um versículo imaginário',
      lines: ['A — O Senhor me guarda', 'B — Ele não dorme'],
      note: 'Temos duas pequenas linhas de sentido dentro da mesma unidade.'
    },
    remember: 'Cólon = uma linha poética de sentido.',
    quiz: {
      question: 'O que é um cólon?',
      options: ['Um capítulo', 'Uma linha poética', 'Um tipo de tradução'],
      correct: 1,
      feedback: 'Perfeito. É a pequena linha que usamos como unidade básica da análise.'
    }
  },
  {
    id: 3,
    title: 'Duas ou três linhas trabalhando juntas',
    subtitle: 'A poesia hebraica gosta de pares.',
    everyday: 'Quando duas linhas formam uma unidade, elas funcionam como duas metades de uma mesma ideia.',
    technical: 'Duas linhas formam um bicolo; três linhas, um tricolo; uma linha isolada é um monocolo.',
    paragraphs: [
      'O mais comum é encontrar duas linhas ligadas. Elas podem repetir, completar, contrastar ou intensificar a mesma ideia.',
      'Três linhas chamam mais atenção porque são menos comuns. Às vezes aparecem em abertura, clímax ou fechamento.',
      'Uma linha isolada também chama atenção. O fato de estar sozinha pode ser importante — mas não automaticamente.'
    ],
    example: {
      label: 'Visualize',
      lines: ['A — Deus é meu refúgio', 'B — Deus é minha força', 'C — Deus está perto'],
      note: 'Três linhas podem criar uma expansão: o pensamento cresce.'
    },
    remember: 'Bicolo = 2 linhas. Tricolo = 3. Monocolo = 1 isolada.',
    quiz: {
      question: 'Qual é a estrutura mais comum?',
      options: ['Duas linhas ligadas', 'Sete linhas iguais', 'Uma linha por capítulo'],
      correct: 0,
      feedback: 'Certo. O par de linhas é a forma mais frequente.'
    }
  },
  {
    id: 4,
    title: 'Quando uma linha conversa com a outra',
    subtitle: 'O segredo não é “repetir”, mas avançar.',
    everyday: 'A segunda linha costuma responder, completar ou empurrar a primeira um pouco adiante.',
    technical: 'Isso é paralelismo.',
    paragraphs: [
      'Durante muito tempo, muita gente explicou paralelismo como “a segunda linha diz a mesma coisa”. Isso é incompleto.',
      'Na prática, a segunda linha quase sempre acrescenta algo: especifica, fortalece, amplia, conclui ou contrasta.',
      'Por isso, a boa pergunta é: “o que mudou da linha A para a linha B?”'
    ],
    example: {
      label: 'A → B',
      lines: ['A — Ele me ouviu', 'B — Ele respondeu ao meu clamor'],
      note: 'A segunda linha não é cópia. Ela explica como a primeira se manifesta.'
    },
    remember: 'Paralelismo = duas linhas trabalhando juntas, não duas frases independentes.',
    quiz: {
      question: 'Qual pergunta ajuda mais ao analisar duas linhas?',
      options: ['Qual delas é mais bonita?', 'O que a segunda acrescenta à primeira?', 'Qual palavra tem mais letras?'],
      correct: 1,
      feedback: 'Exatamente. A relação entre as linhas é o centro da leitura.'
    }
  },
  {
    id: 5,
    title: 'Repetição, contraste e palavras que retornam',
    subtitle: 'O poeta deixa pistas.',
    everyday: 'Quando uma palavra ou frase volta várias vezes, ela pode funcionar como uma placa dizendo “olhe aqui”.',
    technical: 'Alguns nomes: anáfora, refrão, inclusão, palavras-chave.',
    paragraphs: [
      'Repetir no começo de várias linhas pode criar insistência. Repetir uma frase inteira pode dividir o poema em blocos.',
      'Às vezes a mesma palavra aparece no início e no fim, formando um “envelope” ao redor do texto.',
      'Também vale notar contrastes: justo/ímpio, dia/noite, subir/descer, silêncio/voz.'
    ],
    example: {
      label: 'Repetição com propósito',
      lines: ['Até quando...?', 'Até quando...?', 'Até quando...?', 'Mas eu confio...'],
      note: 'A repetição cria pressão. A mudança final parece ainda mais forte.'
    },
    remember: 'Repetição não é falta de criatividade. Muitas vezes é estrutura.',
    quiz: {
      question: 'Uma palavra repetida muitas vezes pode indicar...',
      options: ['Um erro de revisão', 'Uma pista estrutural', 'Que o texto não tem sentido'],
      correct: 1,
      feedback: 'Isso. A repetição pode organizar e intensificar o poema.'
    }
  },
  {
    id: 6,
    title: 'Ritmo sem cair na armadilha da “métrica perfeita”',
    subtitle: 'Os Salmos têm ritmo, mas não funcionam como um soneto português.',
    everyday: 'As linhas costumam ter tamanhos parecidos, mas não obedecem a uma régua fixa que nunca pode ser quebrada.',
    technical: 'Falamos em ritmo livre ou ritmo regrado, e usamos contagens de modo descritivo.',
    paragraphs: [
      'Contar palavras, sílabas ou acentos pode ajudar a comparar linhas.',
      'Mas o número não manda no texto. Não corrigimos o texto só para fazer a conta fechar.',
      'O mais importante é comparar o poema consigo mesmo: o que é normal aqui? Onde ele muda?'
    ],
    example: {
      label: 'Imagine',
      lines: ['linha curta', 'linha curta', 'linha MUITO MAIS LONGA', 'linha curta'],
      note: 'A linha longa merece atenção. Mas só vira argumento se a mudança de sentido também estiver ali.'
    },
    remember: 'Contagem é ferramenta. Nunca é dona do texto.',
    quiz: {
      question: 'Quando uma linha mais longa ganha valor interpretativo?',
      options: ['Sempre', 'Nunca', 'Quando coincide com uma mudança clara de sentido'],
      correct: 2,
      feedback: 'Perfeito. O desvio formal precisa convergir com um dado semântico real.'
    }
  },
  {
    id: 7,
    title: 'As marquinhas do hebraico: sinais de leitura e pausa',
    subtitle: 'Você não precisa decorar os nomes agora.',
    everyday: 'O texto hebraico tradicional traz sinais que ajudam a indicar como a leitura se divide e onde há pausas.',
    technical: 'São os acentos massoréticos (ṭeʿamim).',
    paragraphs: [
      'Eles funcionam, em parte, como um mapa antigo da leitura.',
      'Na prática, alguns sinais fortes ajudam a descobrir onde uma linha termina e outra começa.',
      'Para o iniciante, o objetivo não é decorar uma tabela de acentos. É entender que a divisão das linhas não nasce apenas da nossa imaginação.'
    ],
    example: {
      label: 'Pense como pontuação musical',
      lines: ['frase → pequena pausa', 'frase → pausa maior', 'fim da unidade'],
      note: 'O mapa antigo ajuda; depois conferimos se a sintaxe e o sentido concordam.'
    },
    remember: 'Os acentos ajudam a propor a divisão; a sintaxe e o paralelismo ajudam a confirmar.',
    quiz: {
      question: 'Para um iniciante, qual é o objetivo principal ao conhecer os acentos?',
      options: ['Decorar todos os nomes', 'Entender que há sinais antigos de leitura e divisão', 'Usá-los para criar códigos'],
      correct: 1,
      feedback: 'Certo. A função vem antes da memorização dos nomes.'
    }
  },
  {
    id: 8,
    title: 'Juntando linhas em “parágrafos” do poema',
    subtitle: 'Nem todo Salmo é um bloco único.',
    everyday: 'Várias linhas formam pequenos blocos de pensamento, como parágrafos.',
    technical: 'Esses blocos são estrofes.',
    paragraphs: [
      'Uma estrofe pode ser percebida quando várias pistas apontam na mesma direção.',
      'Por exemplo: uma frase retorna, muda a pessoa (“ele” vira “tu”), muda o assunto, aparece uma pausa importante ou o começo e o fim usam a mesma expressão.',
      'Não é bom dividir só porque “parece bonito”. Quanto mais pistas convergirem, mais segura é a divisão.'
    ],
    example: {
      label: 'Três blocos',
      lines: ['Bloco 1 — problema', 'Bloco 2 — pedido', 'Bloco 3 — confiança'],
      note: 'Essa divisão já começa a revelar a lógica do Salmo.'
    },
    remember: 'Estrofe = parágrafo do poema. Procure várias pistas, não uma só.',
    quiz: {
      question: 'Qual é a melhor maneira de propor uma estrofe?',
      options: ['Usar apenas o tamanho', 'Buscar várias pistas que convergem', 'Dividir sempre a cada dois versículos'],
      correct: 1,
      feedback: 'Isso. Divisões fortes nascem da convergência de sinais.'
    }
  },
  {
    id: 9,
    title: 'O desenho do Salmo inteiro',
    subtitle: 'Agora saia do detalhe e veja o mapa.',
    everyday: 'Depois de enxergar as partes, pergunte: qual é o formato do todo?',
    technical: 'Isso é macroestrutura.',
    paragraphs: [
      'Alguns Salmos têm dois grandes painéis. Outros têm um refrão que divide o poema. Outros caminham até um centro e depois voltam.',
      'Há Salmos com uma grande virada: antes da virada, tudo está escuro; depois dela, a direção muda.',
      'O objetivo é conseguir desenhar o poema de forma simples.'
    ],
    example: {
      label: 'Mapa simples',
      lines: ['A — angústia', 'B — oração', '★ PIVÔ', 'B’ — confiança', 'A’ — louvor'],
      note: 'Mesmo sem saber hebraico, um mapa assim ajuda a entender o movimento.'
    },
    remember: 'Macroestrutura = o desenho do Salmo inteiro.',
    quiz: {
      question: 'O que buscamos na macroestrutura?',
      options: ['O desenho do poema como um todo', 'Só a palavra mais difícil', 'A data exata de composição'],
      correct: 0,
      feedback: 'Correto. É a arquitetura geral do Salmo.'
    }
  },
  {
    id: 10,
    title: 'A virada e o desvio: quando o poema quebra seu próprio padrão',
    subtitle: 'É aqui que forma e interpretação se encontram.',
    everyday: 'Primeiro descubra o padrão normal do poema. Depois veja onde ele muda.',
    technical: 'Chamamos isso de desvio formal; uma mudança decisiva pode funcionar como pivô.',
    paragraphs: [
      'Uma linha isolada, muito curta, muito longa ou diferente das demais pode chamar atenção.',
      'Mas existe uma regra de ouro: nunca dê significado a uma diferença apenas porque ela existe.',
      'Pergunte: a mudança formal coincide com uma mudança clara de assunto, pessoa, emoção, argumento ou direção? Se sim, o caso é forte.'
    ],
    example: {
      label: 'Antes e depois',
      lines: ['até quando?', 'até quando?', 'até quando?', 'MAS EU...', 'confio', 'cantarei'],
      note: 'A mudança de forma e a mudança de sentido apontam para o mesmo lugar.'
    },
    remember: 'Desvio + mudança de sentido = observação forte. Desvio sozinho = cautela.',
    quiz: {
      question: 'Qual é a regra de ouro do desvio?',
      options: ['Toda diferença tem sentido oculto', 'Só é forte quando coincide com mudança clara de sentido', 'Ignore todas as diferenças'],
      correct: 1,
      feedback: 'Perfeito. Essa cautela protege a análise contra exageros.'
    }
  },
  {
    id: 11,
    title: 'Nem todo Salmo faz a mesma coisa',
    subtitle: 'Aprenda a reconhecer o tipo de oração.',
    everyday: 'Alguns Salmos louvam. Outros choram. Outros agradecem. Outros ensinam.',
    technical: 'Chamamos esses tipos de gêneros.',
    paragraphs: [
      'Lamento: apresenta dor, pedido e, muitas vezes, confiança. Hino: celebra quem Deus é e o que faz. Ação de graças: agradece um livramento concreto.',
      'Há ainda Salmos de confiança, sabedoria, reis, Sião, peregrinação e entronização.',
      'O gênero cria expectativas, mas não é uma camisa de força. Um lamento pode surpreender; um Salmo de confiança pode ter tensão.'
    ],
    example: {
      label: 'Pergunta simples',
      lines: ['O Salmo está chorando?', 'celebrando?', 'agradecendo?', 'ensinando?', 'falando do rei?'],
      note: 'Essa pergunta já orienta bastante a leitura.'
    },
    remember: 'Gênero = o tipo de ação que o Salmo está realizando.',
    quiz: {
      question: 'O gênero deve ser usado como...',
      options: ['Ajuda para criar expectativas, não como regra rígida', 'Uma fórmula que nunca admite exceção', 'Um código secreto'],
      correct: 0,
      feedback: 'Isso. A forma modula, não determina mecanicamente.'
    }
  },
  {
    id: 12,
    title: 'Os 12 passos em linguagem de gente comum',
    subtitle: 'Agora você já tem vocabulário para entender o método completo.',
    everyday: 'Os 12 passos são apenas uma ordem organizada para fazer as perguntas certas.',
    paragraphs: [
      '1. Confira qual texto estamos lendo. 2. Ouça o poema. 3. Descubra as linhas. 4. Veja se a divisão faz sentido. 5. Compare o tamanho e o ritmo.',
      '6. Veja como uma linha conversa com a outra. 7. Note repetições, contrastes e recursos especiais. 8. Agrupe os parágrafos do poema. 9. Desenhe o todo.',
      '10. Procure onde o poema muda seu próprio padrão. 11. Resuma a mensagem em uma frase. 12. Localize o Salmo no Saltério e entenda sua relação com Cristo.'
    ],
    example: {
      label: 'Uma frase para lembrar',
      lines: ['texto → som → linhas → relações → blocos → desenho → mensagem → cânon → Cristo'],
      note: 'Você não precisa decorar de uma vez. O importante é seguir a sequência.'
    },
    remember: 'Os passos evitam pular direto para a aplicação antes de realmente ler o poema.',
    quiz: {
      question: 'O que vem antes da aplicação cristológica?',
      options: ['Entender o texto e sua estrutura', 'Escolher uma ilustração', 'Procurar qualquer palavra parecida no Novo Testamento'],
      correct: 0,
      feedback: 'Exatamente. O sentido histórico e textual vem primeiro.'
    }
  },
  {
    id: 13,
    title: 'Como resumir o Salmo em uma frase',
    subtitle: 'Não é escolher um tema; é reproduzir o movimento do texto.',
    everyday: 'Depois de analisar, tente dizer em uma frase o que o Salmo afirma.',
    technical: 'Essa frase é a proposição do Salmo.',
    paragraphs: [
      'Uma boa frase precisa respeitar a arquitetura que você encontrou.',
      'Se o Salmo vai da queixa para a confiança, sua frase não pode falar apenas de confiança.',
      'Se o Salmo contrasta dois caminhos, a proposição deve preservar esse contraste.'
    ],
    example: {
      label: 'Fraca × melhor',
      lines: ['Fraca: “Deus é bom.”', 'Melhor: “Mesmo em meio à demora, o fiel clama, espera e confia no amor de Deus.”'],
      note: 'A segunda frase acompanha o movimento do poema.'
    },
    remember: 'A proposição deve poder ser “desenhada” sobre o mapa do Salmo.',
    quiz: {
      question: 'Uma boa proposição precisa...',
      options: ['Ser curta a qualquer custo', 'Respeitar a arquitetura do Salmo', 'Ter uma palavra em hebraico'],
      correct: 1,
      feedback: 'Correto. A ideia central deve nascer da estrutura real do texto.'
    }
  },
  {
    id: 14,
    title: 'Os Salmos formam um livro, não uma caixa de 150 cartões',
    subtitle: 'Há uma história editorial no Saltério.',
    everyday: 'Os 150 Salmos foram organizados em cinco grandes partes.',
    technical: 'Falamos na forma canônica do Saltério.',
    paragraphs: [
      'Livro I: Salmos 1–41. Livro II: 42–72. Livro III: 73–89. Livro IV: 90–106. Livro V: 107–150.',
      'As fronteiras e os agrupamentos ajudam a perceber temas que crescem: rei, crise, reinado de Deus, esperança, louvor final.',
      'Por isso, depois de entender um Salmo sozinho, vale perguntar: “onde ele está e quem está ao lado dele?”'
    ],
    example: {
      label: 'Mapa do Saltério',
      lines: ['I 1–41', 'II 42–72', 'III 73–89', 'IV 90–106', 'V 107–150'],
      note: 'O Salmo 150 funciona como grande final de louvor.'
    },
    remember: 'Cada Salmo é uma oração individual e também uma peça dentro de um livro organizado.',
    quiz: {
      question: 'Por que olhar os Salmos vizinhos?',
      options: ['Porque a posição no livro pode ajudar a entender a função canônica', 'Porque todo Salmo explica o anterior', 'Porque a ordem não importa'],
      correct: 0,
      feedback: 'Isso. A posição não elimina o sentido do Salmo, mas pode acrescentar contexto editorial.'
    }
  },
  {
    id: 15,
    title: 'Como chegar a Cristo sem forçar o texto',
    subtitle: 'Nem moralismo, nem alegoria sem freio.',
    everyday: 'Primeiro pergunte o que o Salmo dizia em seu contexto. Depois veja como ele entra na história bíblica e como o Novo Testamento o usa.',
    technical: 'Essa é uma leitura cristológica histórico-gramatical-teológica.',
    paragraphs: [
      'Erro 1: “Davi confiou, então confie também.” Isso pode transformar o Salmo em uma lição moral sem evangelho.',
      'Erro 2: transformar cada detalhe em símbolo secreto de Cristo. Isso pula a exegese.',
      'Caminho seguro: sentido original → tensão ou promessa que aponta adiante → uso do Novo Testamento → aplicação à igreja por meio da união com Cristo.'
    ],
    example: {
      label: 'Quatro perguntas',
      lines: ['1. O que dizia então?', '2. O que ainda espera cumprimento?', '3. O NT usa este Salmo?', '4. Como a igreja o vive em Cristo?'],
      note: 'Essa sequência controla a leitura e evita atalhos.'
    },
    remember: 'Cristo não é colado depois. Ele é alcançado pelo caminho do texto e do cânon.',
    quiz: {
      question: 'Qual é o primeiro passo de uma leitura cristológica responsável?',
      options: ['Procurar símbolos escondidos', 'Estabelecer o sentido no contexto original', 'Ignorar o Antigo Testamento'],
      correct: 1,
      feedback: 'Perfeito. Sem sentido original, a leitura vira fantasia.'
    }
  },
  {
    id: 16,
    title: 'Como a estrutura vira sermão',
    subtitle: 'O esboço deve nascer do poema, não ser colocado sobre ele.',
    everyday: 'Se o Salmo se move em três grandes blocos, o sermão normalmente deve respeitar esses movimentos.',
    technical: 'Isso é a passagem da exegese para a homilética.',
    paragraphs: [
      'Não transforme cada linha em um ponto independente. Lembre: duas linhas podem formar uma única ideia.',
      'O esboço nasce das estrofes, das viradas e da proposição central.',
      'A maior parte da análise técnica ficará “debaixo da água”, como a parte invisível de um iceberg. Ela sustenta o sermão, mesmo quando os termos técnicos não aparecem.'
    ],
    example: {
      label: 'Do poema ao sermão',
      lines: ['Estrofe 1 → movimento 1', 'Estrofe 2 → movimento 2', 'Pivô → clímax', 'Estrofe 3 → resposta/aplicação'],
      note: 'O sermão acompanha a arquitetura do texto.'
    },
    remember: 'O pregador não inventa o caminho. Ele acompanha o caminho do Salmo.',
    quiz: {
      question: 'O melhor esboço expositivo nasce de...',
      options: ['Uma fórmula pronta de três pontos', 'A estrutura real do Salmo', 'Uma lista de assuntos preferidos'],
      correct: 1,
      feedback: 'Isso. A forma do texto deve governar o movimento do sermão.'
    }
  },
  {
    id: 17,
    title: 'Como usar tudo isso na devoção',
    subtitle: 'A análise não termina na análise.',
    everyday: 'O objetivo final é ler melhor, orar melhor, meditar melhor e ouvir melhor o que o Salmo está fazendo.',
    paragraphs: [
      'Leia em voz alta. Pare entre as linhas. Note os pares. Escolha uma unidade que chamou sua atenção.',
      'Pergunte o que a segunda linha acrescenta. Depois transforme a ideia em confissão, pedido e louvor.',
      'A estrutura também dá permissão para emoções reais. Um lamento pode terminar ainda no escuro. A Bíblia não exige que toda oração termine com um sorriso artificial.'
    ],
    example: {
      label: 'Prática de 10–15 minutos',
      lines: ['1. Leia em voz alta', '2. Marque os pares', '3. Escolha um par', '4. Pergunte o que muda A→B', '5. Ore a partir disso'],
      note: 'A técnica volta para a piedade.'
    },
    remember: 'A análise serve à leitura, à oração e à adoração.',
    quiz: {
      question: 'Qual é o destino natural da análise?',
      options: ['Exibir erudição', 'Ajudar leitura, pregação e devoção', 'Substituir a oração'],
      correct: 1,
      feedback: 'Exatamente. O conhecimento técnico é meio, não fim.'
    }
  }
]

const glossary: Record<string, string> = {
  'Cólon': 'Uma linha poética curta que funciona como unidade de sentido.',
  'Bicolo': 'Duas linhas poéticas que trabalham juntas.',
  'Tricolo': 'Três linhas poéticas formando uma unidade.',
  'Monocolo': 'Uma linha poética isolada.',
  'Estrofe': 'Um “parágrafo” do poema: várias linhas formando um bloco de pensamento.',
  'Macroestrutura': 'O desenho do Salmo inteiro.',
  'Paralelismo': 'A relação entre duas linhas que se completam, contrastam, intensificam ou avançam.',
  'Anáfora': 'Repetição da mesma palavra ou expressão no começo de várias linhas.',
  'Inclusão': 'Quando o começo e o fim repetem uma palavra ou ideia e formam um “envelope”.',
  'Quiasmo': 'Estrutura em espelho, como A–B–C–B’–A’.',
  'Acróstico': 'Poema organizado pelas letras do alfabeto.',
  'Refrão': 'Frase que volta e ajuda a dividir ou organizar o poema.',
  'Pivô': 'Lugar em que a direção do poema muda.',
  'Escansão': 'Comparação descritiva do ritmo, tamanho, acentos, sílabas ou palavras das linhas.',
  'Acento massorético': 'Sinal tradicional do texto hebraico que ajuda na leitura, pausa e divisão.',
  'Maqqef': 'Traço que liga palavras hebraicas e pode fazê-las funcionar como uma unidade de acento.',
  'Texto Massorético': 'Forma tradicional do texto hebraico do Antigo Testamento usada como base principal de leitura.',
  'Cânon': 'A coleção organizada dos livros bíblicos e, aqui, também a posição do Salmo dentro do Saltério.',
  'Gênero': 'O tipo de ação do Salmo: louvar, lamentar, agradecer, ensinar, confiar etc.',
  'Exegese': 'Ler o texto para entender o que ele realmente diz em seu contexto.',
  'Hermenêutica': 'Princípios usados para interpretar corretamente o texto.',
  'Homilética': 'A arte e o método de transformar a interpretação em pregação fiel.',
  'Cristologia': 'O estudo de quem Cristo é e de como a Escritura aponta para ele.'
}

const labs = [
  { psalm: 'Salmo 1', cue: 'Dois caminhos', map: ['justo', 'árvore', 'ímpio', 'palha', 'dois destinos'], lesson: 'Observe contraste, repetição e o fechamento com os dois caminhos.' },
  { psalm: 'Salmo 13', cue: 'Da queixa à confiança', map: ['“até quando?” × 4', 'pedido', 'MAS EU', 'confiança', 'louvor'], lesson: 'A virada formal coincide com a virada de sentido.' },
  { psalm: 'Salmo 23', cue: 'Mudança de pessoa', map: ['Ele guia', 'Ele conduz', 'TU estás comigo', 'TU preparas', 'volta ao horizonte da casa'], lesson: 'A mudança de “ele” para “tu” marca aproximação no vale.' },
  { psalm: 'Salmo 29', cue: 'A voz que domina a tempestade', map: ['voz', 'voz', 'voz', 'linha isolada', 'voz', 'glória', 'paz'], lesson: 'Uma linha curta e isolada pode ser marcada dentro de uma sequência maior.' },
  { psalm: 'Salmo 121', cue: 'Do “eu” para “você”', map: ['eu levanto', 'meu socorro', 'ele não deixará', 'ele guardará', 'ele guardará'], lesson: 'A mudança de pessoa sugere uma dinâmica de resposta e bênção.' },
  { psalm: 'Salmo 130', cue: 'Profundezas → perdão → espera → povo', map: ['clamo', 'quem ficará de pé?', 'contigo está o perdão', 'espero', 'espere Israel'], lesson: 'O versículo central é muito curto e concentra a teologia do Salmo.' }
]

const twelve = [
  ['1', 'Confira o texto', 'Estabeleça o texto'],
  ['2', 'Ouça o poema', 'Leia em voz alta'],
  ['3', 'Descubra as linhas', 'Delimite os cólons'],
  ['4', 'Veja se a divisão faz sentido', 'Confirme por sintaxe e paralelismo'],
  ['5', 'Compare tamanho e ritmo', 'Escanda'],
  ['6', 'Veja como A conversa com B', 'Mapeie o paralelismo'],
  ['7', 'Note repetições e formas especiais', 'Identifique recursos técnicos'],
  ['8', 'Agrupe os parágrafos do poema', 'Delimite estrofes'],
  ['9', 'Desenhe o Salmo inteiro', 'Identifique a macroestrutura'],
  ['10', 'Ache onde o padrão muda', 'Localize os desvios'],
  ['11', 'Resuma a mensagem em uma frase', 'Formule a proposição'],
  ['12', 'Localize no Saltério e em Cristo', 'Situe canônica e cristologicamente']
]

function useHash() {
  const [hash, setHash] = useState(window.location.hash || '#/inicio')
  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/inicio')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return hash
}

function navigate(to: string) {
  window.location.hash = to
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Diagram({ lines }: { lines: string[] }) {
  return <div className="diagram">{lines.map((line, i) => <div key={i} className="diagram-line"><span>{String.fromCharCode(65 + i)}</span><b>{line.replace(/^[A-Z] — /, '')}</b></div>)}</div>
}

function QuizCard({ lesson, onDone }: { lesson: Lesson; onDone: () => void }) {
  const [choice, setChoice] = useState<number | null>(null)
  const correct = choice === lesson.quiz.correct
  return <section className="quiz-card">
    <div className="eyebrow">CHECAGEM RÁPIDA</div>
    <h3>{lesson.quiz.question}</h3>
    <div className="quiz-options">
      {lesson.quiz.options.map((o, i) => <button className={`quiz-option ${choice === i ? (correct ? 'correct' : 'wrong') : ''}`} onClick={() => setChoice(i)} key={o}>{o}</button>)}
    </div>
    {choice !== null && <div className={`feedback ${correct ? 'ok' : 'no'}`}>{correct ? `✓ ${lesson.quiz.feedback}` : 'Ainda não. Volte à explicação acima e tente outra resposta.'}</div>}
    {correct && <button className="primary" onClick={onDone}>Marcar módulo como concluído</button>}
  </section>
}

function App() {
  const hash = useHash()
  const [done, setDone] = useState<number[]>(() => JSON.parse(localStorage.getItem('salmos-guia-progress') || '[]'))
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => localStorage.setItem('salmos-guia-progress', JSON.stringify(done)), [done])

  const progress = Math.round((done.length / lessons.length) * 100)
  const lessonMatch = hash.match(/^#\/modulo\/(\d+)/)
  const currentLesson = lessonMatch ? lessons.find(l => l.id === Number(lessonMatch[1])) : undefined

  const route = useMemo(() => {
    if (currentLesson) return 'lesson'
    if (hash.startsWith('#/trilha')) return 'trail'
    if (hash.startsWith('#/laboratorio')) return 'lab'
    if (hash.startsWith('#/glossario')) return 'glossary'
    if (hash.startsWith('#/passos')) return 'steps'
    if (hash.startsWith('#/revisao')) return 'review'
    if (hash.startsWith('#/sobre')) return 'about'
    return 'home'
  }, [hash, currentLesson])

  const markDone = (id: number) => {
    setDone(v => v.includes(id) ? v : [...v, id].sort((a,b)=>a-b))
  }

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => navigate('#/inicio')}>
        <span className="brand-mark">א</span>
        <span><strong>Aprendendo a Ler a Forma dos Salmos</strong><small>Guia didático de A Medida do Louvor</small></span>
      </button>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      <nav className={menuOpen ? 'open' : ''} onClick={() => setMenuOpen(false)}>
        <a href="#/trilha">Trilha</a><a href="#/laboratorio">Laboratório</a><a href="#/passos">12 passos</a><a href="#/glossario">Glossário</a><a href="#/sobre">Sobre</a>
      </nav>
    </header>

    <div className="progress-strip"><span style={{ width: `${progress}%` }} /></div>

    {route === 'home' && <main className="home">
      <section className="hero">
        <div>
          <div className="pill">COMECE DO ZERO</div>
          <h1>Você não precisa saber hebraico para começar a enxergar a forma dos Salmos.</h1>
          <p>Este guia ensina, passo a passo e em linguagem comum, como compreender a análise estrutural usada no Atlas dos 150 Salmos.</p>
          <div className="hero-actions"><button className="primary" onClick={() => navigate('#/modulo/1')}>Começar do início</button><button className="secondary" onClick={() => navigate('#/trilha')}>Ver a trilha completa</button></div>
          <div className="hero-note">Sem login • sem coleta de dados • seu progresso fica apenas neste navegador</div>
        </div>
        <div className="hero-visual">
          <div className="poem-card"><span>Linha A</span><b>uma ideia começa</b></div>
          <div className="poem-card shift"><span>Linha B</span><b>a ideia avança</b></div>
          <div className="arrow">↓</div>
          <div className="poem-card gold"><span>Virada</span><b>o poema muda de direção</b></div>
        </div>
      </section>

      <section className="promise-grid">
        <article><span>01</span><h3>Primeiro, enxergar</h3><p>Você aprende a ver linhas, pares, repetições e mudanças sem decorar termos.</p></article>
        <article><span>02</span><h3>Depois, dar nome</h3><p>Só depois aparecem palavras como cólon, bicolo, estrofe e macroestrutura.</p></article>
        <article><span>03</span><h3>Por fim, interpretar</h3><p>O caminho termina em mensagem, cânon, Cristo, sermão e devoção.</p></article>
      </section>

      <section className="rule-card"><div>REGRA DE OURO</div><h2>Uma diferença de forma só ganha peso quando também existe uma mudança clara de sentido.</h2><p>Isso evita “ver significado em tudo”. O método pede observação e humildade.</p></section>

      <section className="cta-block"><h2>Você já concluiu {done.length} de {lessons.length} módulos.</h2><div className="big-progress"><span style={{ width: `${progress}%` }}/></div><button className="primary" onClick={() => navigate(done.length ? `#/modulo/${Math.min(lessons.length, (done[done.length-1] || 0)+1)}` : '#/modulo/1')}>{done.length ? 'Continuar de onde parei' : 'Começar agora'}</button></section>
    </main>}

    {route === 'trail' && <main className="content-page">
      <header className="page-head"><div className="eyebrow">TRILHA PROGRESSIVA</div><h1>Do zero à leitura estrutural</h1><p>Os módulos foram colocados nessa ordem de propósito. Cada um prepara o próximo.</p></header>
      <div className="lesson-list">{lessons.map(l => <button key={l.id} className={`lesson-row ${done.includes(l.id) ? 'done' : ''}`} onClick={() => navigate(`#/modulo/${l.id}`)}><span className="lesson-number">{String(l.id).padStart(2,'0')}</span><span><strong>{l.title}</strong><small>{l.subtitle}</small></span><em>{done.includes(l.id) ? '✓' : '→'}</em></button>)}</div>
    </main>}

    {route === 'lesson' && currentLesson && <main className="lesson-page">
      <aside className="lesson-side"><button onClick={() => navigate('#/trilha')}>← Trilha</button><div className="module-count">MÓDULO {currentLesson.id} / {lessons.length}</div><div className="side-progress"><span style={{height:`${progress}%`}}/></div></aside>
      <article className="lesson-content">
        <div className="eyebrow">MÓDULO {currentLesson.id}</div>
        <h1>{currentLesson.title}</h1><p className="lead">{currentLesson.subtitle}</p>
        <section className="plain-card"><span>EM LINGUAGEM COMUM</span><h2>{currentLesson.everyday}</h2>{currentLesson.technical && <p><b>Nome técnico:</b> {currentLesson.technical}</p>}</section>
        <div className="prose">{currentLesson.paragraphs.map(p => <p key={p}>{p}</p>)}</div>
        {currentLesson.example && <section className="example-card"><div><span>{currentLesson.example.label}</span><Diagram lines={currentLesson.example.lines}/></div><p>{currentLesson.example.note}</p></section>}
        <section className="remember"><span>GUARDE ISTO</span><strong>{currentLesson.remember}</strong></section>
        <QuizCard lesson={currentLesson} onDone={() => markDone(currentLesson.id)} />
        <div className="lesson-nav"><button className="secondary" disabled={currentLesson.id === 1} onClick={() => navigate(`#/modulo/${currentLesson.id-1}`)}>← anterior</button><button className="primary" onClick={() => currentLesson.id === lessons.length ? navigate('#/revisao') : navigate(`#/modulo/${currentLesson.id+1}`)}>próximo →</button></div>
      </article>
    </main>}

    {route === 'lab' && <main className="content-page">
      <header className="page-head"><div className="eyebrow">LABORATÓRIO</div><h1>Veja o método funcionando</h1><p>Aqui não reproduzimos longos trechos de traduções. Usamos mapas curtos para aprender a enxergar o movimento.</p></header>
      <div className="lab-grid">{labs.map(l => <article className="lab-card" key={l.psalm}><div className="lab-top"><span>{l.psalm}</span><b>{l.cue}</b></div><div className="flow">{l.map.map((m,i)=><div key={m}><span>{i+1}</span>{m}</div>)}</div><p>{l.lesson}</p></article>)}</div>
      <section className="lab-challenge"><div className="eyebrow">DESAFIO</div><h2>Escolha um Salmo curto e faça só três perguntas:</h2><ol><li>Quais palavras se repetem?</li><li>Onde o assunto muda?</li><li>Se eu desenhasse o Salmo em 3 blocos, como ficaria?</li></ol></section>
    </main>}

    {route === 'steps' && <main className="content-page">
      <header className="page-head"><div className="eyebrow">MAPA DO MÉTODO</div><h1>Os 12 passos em linguagem de gente comum</h1><p>Cada cartão mostra primeiro a pergunta simples e depois o nome usado na análise técnica.</p></header>
      <div className="steps-grid">{twelve.map(([n,a,b]) => <article key={n}><span>{n}</span><h3>{a}</h3><p>{b}</p></article>)}</div>
      <section className="rule-card compact"><div>ORDEM IMPORTA</div><h2>Não pule direto para “o que isso significa para mim?”.</h2><p>Primeiro leia o texto, depois enxergue a estrutura, formule a mensagem e só então avance para cânon, Cristo e aplicação.</p></section>
    </main>}

    {route === 'glossary' && <main className="content-page">
      <header className="page-head"><div className="eyebrow">TRADUTOR DE PALAVRAS DIFÍCEIS</div><h1>Glossário sem complicação</h1><p>Os termos existem para ajudar a ver o texto, não para impressionar ninguém.</p></header>
      <div className="glossary-grid">{Object.entries(glossary).map(([k,v]) => <article key={k}><h3>{k}</h3><p>{v}</p></article>)}</div>
    </main>}

    {route === 'review' && <main className="content-page review-page">
      <header className="page-head"><div className="eyebrow">REVISÃO FINAL</div><h1>Você consegue explicar o método sem usar palavras técnicas?</h1><p>Se consegue, você realmente aprendeu.</p></header>
      <div className="review-box"><h2>O mapa em uma frase</h2><p>Leia o texto → ouça o poema → descubra as linhas → veja como elas se relacionam → agrupe os blocos → desenhe o todo → note as viradas → resuma a mensagem → situe no cânon → chegue a Cristo → pregue e ore a partir do texto.</p></div>
      <div className="certificate"><div className="cert-mark">✓</div><h2>Certificado informal de conclusão</h2><p>Você percorreu o guia “Aprendendo a Ler a Forma dos Salmos”.</p><strong>{progress === 100 ? 'Trilha completa' : `Progresso atual: ${progress}%`}</strong><small>Este certificado não coleta nome nem dados pessoais.</small></div>
      <button className="secondary" onClick={() => { setDone([]); localStorage.removeItem('salmos-guia-progress'); navigate('#/inicio') }}>Reiniciar progresso</button>
    </main>}

    {route === 'about' && <main className="content-page">
      <header className="page-head"><div className="eyebrow">SOBRE ESTE GUIA</div><h1>Um caminho de entrada para uma análise mais profunda</h1></header>
      <div className="about-prose"><p>Este site é um guia didático complementar criado para ajudar leitores iniciantes a compreender a análise estrutural dos Salmos apresentada no projeto <b>A Medida do Louvor</b>.</p><p>O princípio central é simples: na poesia bíblica, a organização do texto também participa da comunicação do sentido. Por isso aprendemos a enxergar linhas, pares, repetições, estrofes, viradas e a arquitetura do todo.</p><p>O guia mantém uma postura de cautela: ritmo e tamanho são observações descritivas. Uma diferença formal só recebe peso quando coincide com uma mudança de sentido identificável por outras razões.</p><p>A leitura cristológica segue uma abordagem reformada histórico-gramatical-teológica: sentido original primeiro, contexto canônico depois, uso do Novo Testamento como controle e aplicação à igreja através de Cristo.</p><a className="atlas-link" href="https://medida-do-louvor-salmos-1-150-rodrigoniskiers-projects.vercel.app" target="_blank" rel="noreferrer">Abrir o Atlas técnico dos 150 Salmos ↗</a></div>
    </main>}

    <footer><div><b>Conteúdo didático baseado em A Medida do Louvor</b><span>Guia complementar para leitores iniciantes</span></div><strong>Desenvolvido por Rodrigo Niskier Ferreira Barbosa</strong></footer>
  </div>
}

export default App
