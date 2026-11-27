/**
 * parenteFalso.js — ROTEIRO da Fase 1 (mensagem de parente falso).
 *
 * Este arquivo guarda apenas o CONTEÚDO da simulação (textos das mensagens,
 * opções de resposta e orientações do assistente). Nenhum código de tela fica
 * aqui: assim, dá para mudar o diálogo sem mexer no visual.
 *
 * Como ler a estrutura:
 * - CONTATO ............... dados do falso parente mostrados no cabeçalho do chat.
 * - ORIENTACAO_INICIAL .... primeira explicação do assistente educativo.
 * - ETAPAS ................ lista de momentos da conversa, em ordem.
 *
 * Cada ETAPA tem:
 * - mensagens: o que o golpista escreve.
 * - pergunta : a chamada para o usuário decidir.
 * - opcoes   : as respostas possíveis. Cada opção tem:
 *    - rotulo            : texto do botão que o usuário toca.
 *    - mensagemEnviada   : texto que aparece como mensagem enviada pelo usuário.
 *    - reacao            : resposta que o golpista dá em seguida.
 *    - tipo              : 'seguro' | 'risco' | 'atencao' (usado pelo assistente).
 *    - orientacao        : explicação educativa mostrada depois da escolha.
 *
 * Importante: todas as opções levam a próxima etapa. O objetivo é ensinar,
 * nunca punir ou travar o usuário.
 */

/** Dados do contato fictício exibidos no topo da conversa. */
export const CONTATO = {
  nome: 'Sandra (número novo)',
  iniciais: 'S',
  descricao: 'Número não salvo na sua agenda',
  // Número fictício mostrado no cabeçalho (não é um telefone real).
  telefone: '+55 11 91234-5678',
  // Texto de "disponibilidade", como nos aplicativos de mensagens.
  disponibilidade: 'online',
};

/** Primeira orientação do assistente, antes de a conversa começar. */
export const ORIENTACAO_INICIAL = {
  tipo: 'dica',
  titulo: 'Vamos praticar com calma',
  texto:
    'Nesta etapa você recebe mensagens de alguém dizendo ser da sua família. Nada aqui é real: é uma conversa inventada, só para você treinar.',
  dica: 'Leia as mensagens com atenção e toque na resposta que parecer mais segura para você.',
  avancar: true, // ao clicar em Continuar, a conversa começa.
  final: false, // ainda não é o fim da fase.
};

/** Texto educativo usado quando o usuário escreve com as próprias palavras. */
export const ORIENTACAO_TEXTO_LIVRE = {
  tipo: 'dica',
  titulo: 'Muito bem por escrever com suas palavras!',
  texto:
    'Escrever a sua própria resposta é ótimo para treinar. Para continuar a atividade, toque em uma das opções de resposta abaixo.',
  dica: 'Em caso de dúvida, o mais seguro é não enviar dinheiro e confirmar a história com a pessoa por outro caminho.',
  avancar: false, // não avança: o usuário volta a escolher nesta mesma etapa.
  final: false,
};

/** As 3 situações da Fase 1, na ordem em que aparecem. */
export const ETAPAS = [
  {
    id: 'etapa-1',
    mensagens: [
      'Oi mãe! Troquei de celular, este é o meu número novo. Salva aí, tá?',
      'Estou com um problema e preciso da sua ajuda agora. Você pode me fazer um PIX de R$ 1.200? Eu te devolvo amanhã, prometo.',
    ],
    pergunta: 'Como você responde?',
    opcoes: [
      {
        id: 'fazer-pix',
        rotulo: 'Fazer o PIX agora',
        mensagemEnviada: 'Já vou fazer o PIX. Me manda a chave, filha.',
        reacao: 'Isso! Manda rápido, por favor. É urgente e eu não posso falar no telefone agora.',
        tipo: 'risco',
        orientacao: {
          titulo: 'Pedido de dinheiro por número novo é sinal de alerta',
          texto:
            'O golpista avisa que trocou de número justamente para você não desconfiar. A pressa e a urgência servem para impedir que você pense e que converse com outras pessoas.',
          dica: 'Nunca envie dinheiro para um número novo sem confirmar por outro caminho.',
        },
      },
      {
        id: 'confirmar-identidade',
        rotulo: 'Perguntar algo que só a Sandra saberia',
        mensagemEnviada: 'Filha, antes de qualquer coisa: me diga o nome do seu primeiro cachorro.',
        reacao:
          'Ah, mãe, agora não dá tempo para isso! Estou sem bateria e preciso do dinheiro hoje. Você não confia em mim?',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Boa! Você pediu uma confirmação de identidade',
          texto:
            'Pedir uma informação pessoal é uma atitude segura. Repare que o golpista fugiu da pergunta e tentou fazer você se sentir culpada. Isso é um sinal claro de golpe.',
          dica: 'Desconfie quando a pessoa não responde à sua pergunta e ainda apressa você.',
        },
      },
      {
        id: 'ligar-numero-antigo',
        rotulo: 'Ligar para o número antigo da Sandra',
        mensagemEnviada: 'Vou ligar para o seu número antigo para confirmar, filha.',
        reacao: 'Não, não liga! Aquele número não é mais meu. Você precisa fazer o PIX agora, é sério!',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Excelente! Confirmar por outro caminho é a atitude mais segura',
          texto:
            'Ligar para o número antigo da Sandra, ou falar com outro familiar, é a melhor forma de descobrir se é mesmo ela. Se a pessoa inventar desculpas para você não ligar, o pedido é falso.',
          dica: 'Confirme sempre pelo número antigo ou pessoalmente. Nunca pelo número que chegou na mensagem.',
        },
      },
    ],
  },

  {
    id: 'etapa-2',
    mensagens: [
      'Mãe, você é a única que pode me ajudar agora. Estou no hospital com o meu filho e não consigo falar no telefone.',
      'Se você não fizer o PIX agora, eu vou perder a vaga. Por favor, não conta para o meu irmão, ele vai brigar comigo.',
    ],
    pergunta: 'O que você faz?',
    opcoes: [
      {
        id: 'pix-urgente',
        rotulo: 'Fazer o PIX para resolver logo',
        mensagemEnviada: 'Está bem, filha. Vou fazer o PIX agora mesmo.',
        reacao: 'Isso mesmo! A chave é o meu telefone. Obrigado, mãe!',
        tipo: 'risco',
        orientacao: {
          titulo: 'A urgência é a ferramenta favorita do golpista',
          texto:
            'Quando alguém apressa você e pede segredo, é sinal de golpe. Ninguém da família precisa que você resolva algo tão importante em poucos minutos.',
          dica: 'Pressa, medo e segredo são os três avisos de um golpe.',
        },
      },
      {
        id: 'pedir-audio',
        rotulo: 'Pedir uma ligação de vídeo ou um áudio',
        mensagemEnviada: 'Filha, me manda um áudio ou me liga por vídeo. Eu quero ouvir a sua voz.',
        reacao: 'Não posso, estou sem internet aqui. Confia em mim, mãe!',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Muito bem! Ouvir ou ver a pessoa ajuda bastante',
          texto:
            'Golpistas costumam dizer que não podem falar por voz. Hoje também existem vozes imitadas por computador, então o mais seguro continua sendo confirmar pelo número antigo.',
          dica: 'Se não for possível falar por voz, confirme o pedido com outro familiar antes de enviar dinheiro.',
        },
      },
      {
        id: 'contar-familia',
        rotulo: 'Contar para outro familiar antes de decidir',
        mensagemEnviada: 'Vou falar com o seu irmão primeiro e já te retorno.',
        reacao: 'Não! Não fala com ele não. Depois eu explico, mas agora eu preciso do dinheiro.',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Ótima atitude! Conversar com outra pessoa ajuda a enxergar o golpe',
          texto:
            'Contar o que está acontecendo para alguém de confiança é uma das formas mais eficazes de se proteger. O golpista não quer que você fale com ninguém, porque outra pessoa pode descobrir a farsa.',
          dica: 'Antes de enviar qualquer dinheiro, converse com alguém de confiança.',
        },
      },
    ],
  },

  {
    id: 'etapa-3',
    mensagens: [
      'Mãe, por favor, faz o PIX agora. Manda para a chave do meu telefone.',
      'E, se alguém perguntar, diz que o dinheiro era para pagar uma conta minha, tá? Não quero que ninguém saiba.',
    ],
    pergunta: 'Qual é a sua decisão final nesta conversa?',
    opcoes: [
      {
        id: 'transferir-em-segredo',
        rotulo: 'Fazer a transferência e não contar para ninguém',
        mensagemEnviada: 'Está bem, filha. Não vou contar para ninguém e já faço o PIX.',
        reacao: 'Isso! Depois eu te devolvo. Obrigado, mãe!',
        tipo: 'risco',
        orientacao: {
          titulo: 'Atenção: pedir segredo é um sinal forte de golpe',
          texto:
            'O pedido de segredo serve para impedir que alguém descubra a armação. Em um golpe, o dinheiro enviado quase nunca é devolvido.',
          dica: 'Nunca mantenha em segredo um pedido de dinheiro: conte para alguém da família.',
        },
      },
      {
        id: 'nao-enviar',
        rotulo: 'Não enviar nada e bloquear o número',
        mensagemEnviada: 'Não vou enviar dinheiro. Vou falar com a verdadeira Sandra antes.',
        reacao: 'Mãe, você está errada! Assim você vai perder a minha confiança...',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Parabéns! Você agiu de forma segura',
          texto:
            'Não enviar dinheiro e encerrar a conversa é a atitude correta. Se a mensagem fosse realmente da sua filha, ela entenderia a sua cautela.',
          dica: 'Bloqueie e denuncie o número. Se você já enviou dinheiro, avise o banco e registre um boletim de ocorrência.',
        },
      },
      {
        id: 'avisar-banco-familia',
        rotulo: 'Avisar o banco e conversar com a família',
        mensagemEnviada: 'Vou avisar o banco e falar com a família agora mesmo.',
        reacao: 'Não precisa disso! Mãe, por favor, não faça isso...',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Muito bem! Buscar ajuda é sinal de sabedoria',
          texto:
            'Avisar o banco e conversar com a família protege você e também outras pessoas que podem receber a mesma mensagem.',
          dica: 'Registre o ocorrido e avise parentes e amigos para ficarem atentos ao mesmo golpe.',
        },
      },
    ],
  },
];
