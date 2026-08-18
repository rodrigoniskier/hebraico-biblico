const CHRIST = {"2": {"mode": "vox de Christo", "nt": "At 4.25–26; 13.33; Hb 1.5"}, "16": {"mode": "vox Christi", "nt": "At 2.25–32; 13.35"}, "22": {"mode": "vox Christi", "nt": "Mt 27.35,39,43,46; Jo 19.24; Hb 2.12"}, "34": {"mode": "vox ecclesiae in Christo", "nt": "Jo 19.36; 1Pe 3.10–12"}, "40": {"mode": "vox Christi", "nt": "Hb 10.5–9"}, "41": {"mode": "vox Christi", "nt": "Jo 13.18"}, "45": {"mode": "vox de Christo", "nt": "Hb 1.8–9"}, "68": {"mode": "vox de Christo", "nt": "Ef 4.8"}, "69": {"mode": "vox Christi", "nt": "Jo 2.17; 15.25; Rm 15.3"}, "78": {"mode": "vox de Christo", "nt": "Mt 13.35"}, "95": {"mode": "vox ecclesiae in Christo", "nt": "Hb 3.7–11; 4.7"}, "102": {"mode": "vox de Christo", "nt": "Hb 1.10–12"}, "104": {"mode": "vox de Christo", "nt": "Hb 1.7"}, "109": {"mode": "vox Christi", "nt": "At 1.20"}, "110": {"mode": "vox de Christo", "nt": "Mt 22.44; At 2.34–35; Hb 1.13"}, "118": {"mode": "vox de Christo", "nt": "Mt 21.9,42; At 4.11"}, "132": {"mode": "vox de Christo", "nt": "At 2.30 (promessa davídica)"}};
const EXEMPLARS = {"1": {"label": "Oficina 1 no livro", "note": "O eixo formal é o contraste que introduz o ímpio; a moldura caminho/bênção e caminho/perecimento organiza o veredito pactual.", "pivot": "v. 4a — “não assim”"}, "2": {"label": "Oficina 9 no livro", "note": "Leia o decreto régio e a reação das nações como arquitetura do conflito entre rebelião e o Ungido de YHWH.", "pivot": "o decreto e sua resposta"}, "8": {"label": "Oficina 8 no livro", "note": "A criação é lida por meio de louvor, contraste e dignidade humana; compare sua forma com o Salmo 19.", "pivot": "a pergunta sobre o ser humano"}, "13": {"label": "Oficina 3 no livro", "note": "O lamento começa contraído e termina expandido: o fecho em tricolo cria espaço formal para confiança, alegria e canto.", "pivot": "a virada da queixa para a confiança"}, "19": {"label": "Oficina 8 no livro", "note": "O salmo aproxima dois modos de revelação — criação e Torá — sem achatá-los numa única sequência em prosa.", "pivot": "transição da criação para a Torá"}, "22": {"label": "Oficina 7 no livro", "note": "A arquitetura do abandono deve ser acompanhada até o movimento de louvor e alcance universal, sem pular a tensão inicial.", "pivot": "da aflição ao louvor"}, "23": {"label": "Oficina 2 no livro", "note": "O poema é centrado, e o v. 4 funciona como região de clímax; o sermão deve subir ao centro e não guardar tudo para o fim.", "pivot": "v. 4"}, "29": {"label": "Oficina 4 no livro", "note": "A repetição da “voz de YHWH” e o paralelismo em escada transformam a tempestade em argumento teológico.", "pivot": "sequência das vozes de YHWH"}, "46": {"label": "Oficina 10 no livro", "note": "O refrão estrutura movimentos repetidos; ele deve ser ouvido como eixo litúrgico, não tratado como redundância.", "pivot": "refrão"}, "51": {"label": "Oficina 11 no livro", "note": "A gramática dos pedidos de purificação e renovação dá forma ao arrependimento; imperativos e mudança interior devem ser lidos em conjunto.", "pivot": "renovação interior"}, "73": {"label": "Oficina 12 no livro", "note": "A leitura muda no santuário; o pivô não é detalhe cronológico, mas a junta que reorganiza o poema inteiro.", "pivot": "entrada no santuário"}, "121": {"label": "Oficina 5 no livro", "note": "A arquitetura lexical da guarda divina sustenta a confiança e deve orientar as divisões homiléticas.", "pivot": "repetição do campo semântico de guardar"}, "130": {"label": "Oficina 6 no livro", "note": "Das profundezas, o poema progride do clamor para perdão, espera e redenção; a forma conduz a esperança.", "pivot": "do clamor à espera"}};

const GENRE_SHAPES = {
  "Hino de louvor": ["Convite ao louvor","Motivos / feitos de YHWH","Louvor renovado"],
  "Lamento individual": ["Invocação e queixa","Petição / argumento","Confiança ou louvor"],
  "Lamento comunitário": ["Crise da comunidade","Apelo pactual","Esperança / pedido de restauração"],
  "Ação de graças": ["Intenção de agradecer","Narração do livramento","Louvor público"],
  "Régio": ["Rei e vocação pactual","Ação / decreto de YHWH","Horizonte do reino"],
  "Sabedoria / Torá": ["Caminho / tese sapiencial","Contraste e desenvolvimento","Veredito"],
  "Confiança": ["Asserção de confiança","Ameaça reinterpretada","Repouso / segurança"],
  "Sião": ["Presença de Deus","Segurança / beleza de Sião","Chamado à memória e louvor"],
  "Entronização": ["Aclamação: YHWH reina","Juízo / soberania","Alegria cósmica"],
  "Histórico": ["Memória dos atos de Deus","Resposta humana / rebeldia","Lição pactual"],
  "Penitencial": ["Confissão / aflição","Pedido de perdão e renovação","Esperança na misericórdia"],
  "Imprecatório": ["Injustiça nomeada","Apelo ao Juiz","Entrega do juízo a Deus"],
  "Misto / não indexado no Apêndice E": ["Abertura","Desenvolvimento","Fecho"]
};

const THEOLOGY = {
  "Hino de louvor":[
    "A forma do louvor é responsiva: o imperativo de adorar nasce do caráter e dos feitos de YHWH, não de entusiasmo autogerado.",
    "A criação, a história e a aliança são apresentadas como razões públicas para a doxologia.",
    "Homileticamente, a exposição deve terminar em adoração, não apenas em informação sobre Deus."
  ],
  "Lamento individual":[
    "O pacto permite que a dor seja dita diretamente a Deus; a queixa bíblica é fé que se recusa a procurar outro endereço.",
    "A passagem formal de queixa a petição e confiança ensina que esperança não é negação da aflição.",
    "Em Cristo, o fiel pode orar o lamento sem moralismo e sem alegorizar cada detalhe."
  ],
  "Lamento comunitário":[
    "A igreja aprende a lamentar corporativamente: sofrimento, pecado, memória pactual e esperança pertencem à oração pública.",
    "O juízo é entregue a YHWH, o que impede tanto a vingança privada quanto a banalização da injustiça.",
    "A estrutura comunitária deve aparecer no sermão: o texto não é apenas uma terapia para o indivíduo."
  ],
  "Ação de graças":[
    "O livramento recebido torna-se testemunho; graça lembrada gera louvor público.",
    "O movimento do passado para o presente impede uma espiritualidade sem memória.",
    "A conclusão homilética deve reconduzir o ouvinte ao Doador, não à técnica de superar crises."
  ],
  "Régio":[
    "A realeza humana é avaliada pelo governo pactual de YHWH e aponta além de si para o Rei davídico perfeito.",
    "A leitura cristológica deve nascer da função régia e do uso canônico, não de correspondências alegóricas inventadas.",
    "O sermão deve mostrar reino, justiça e submissão ao Ungido antes de extrair aplicações individuais."
  ],
  "Sabedoria / Torá":[
    "A vida pactual é apresentada como caminho, formação e destino; sabedoria bíblica é moralmente estruturada diante de YHWH.",
    "A forma contrastiva impede reduzir o salmo a máximas isoladas: os caminhos precisam ser vistos como totalidades.",
    "Cristo cumpre perfeitamente a justiça para a qual o salmo chama e, unidos a ele, os crentes são conformados a esse caminho."
  ],
  "Confiança":[
    "A confiança não remove a ameaça; ela reorganiza a percepção da ameaça à luz da presença e do caráter de YHWH.",
    "Repetições breves e afirmações de segurança têm função pastoral: fazem a verdade ser habitada, não apenas entendida.",
    "A exposição deve dar tempo para o repouso do texto, evitando transformar confiança em uma lista apressada de conselhos."
  ],
  "Sião":[
    "Sião é teologia espacial: a segurança da cidade deriva da presença de Deus, não da topografia ou do poder político.",
    "Canonicamente, a esperança de Sião se abre para o reino messiânico e para a habitação de Deus com seu povo.",
    "A aplicação cristã deve evitar nacionalizações indevidas e seguir a trajetória bíblico-redentiva."
  ],
  "Entronização":[
    "O refrão teológico é simples e total: YHWH reina; criação e nações são chamadas a responder a esse fato.",
    "Juízo e alegria não são opostos quando o Juiz é justo.",
    "O sermão deve conservar a amplitude cósmica do texto e não reduzi-lo à experiência privada."
  ],
  "Histórico":[
    "A memória histórica é catequese pactual: recordar os atos de Deus expõe tanto sua fidelidade quanto a infidelidade humana.",
    "A repetição narrativa cria identidade coletiva e responsabilidade intergeracional.",
    "A pregação deve seguir a seleção teológica dos fatos feita pelo salmo, não tentar recontar toda a história bíblica."
  ],
  "Penitencial":[
    "Arrependimento bíblico une verdade sobre o pecado, apelo à misericórdia e desejo de renovação.",
    "A gramática dos pedidos mostra dependência: purificação e restauração são recebidas de Deus.",
    "A conclusão evangélica encontra em Cristo perdão real sem enfraquecer a seriedade da confissão."
  ],
  "Imprecatório":[
    "A imprecação põe a justiça nas mãos do Juiz e dá linguagem bíblica a vítimas reais de violência.",
    "Ela deve ser lida à luz do pacto, do juízo final e do mandamento de não exercer vingança privada.",
    "A pregação precisa distinguir sede de justiça de ressentimento pessoal e conduzir a congregação ao governo justo de Deus."
  ],
  "Misto / não indexado no Apêndice E":[
    "A classificação genérica é uma ferramenta, não uma camisa de força; a forma específica do poema tem prioridade.",
    "A teologia deve ser derivada do movimento real do texto e de sua situação no Saltério.",
    "Onde a evidência for insuficiente, a ferramenta registra a incerteza em vez de fabricar precisão."
  ]
};

