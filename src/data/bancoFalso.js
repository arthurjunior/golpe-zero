/**
 * bancoFalso.js — ROTEIRO da Fase 2 (ligação de banco falso).
 *
 * Aqui fica apenas o CONTEÚDO da ligação fictícia: o que o falso atendente
 * fala, as opções de resposta do usuário e as orientações do assistente.
 * O visual da tela está em src/components/SimulacaoLigacao.jsx.
 *
 * Nenhum dado bancário real é usado neste arquivo. Tudo é inventado e serve
 * apenas para ensinar.
 *
 * Cada ETAPA tem:
 * - falas   : o que o falso atendente fala.
 * - pergunta: a chamada para o usuário decidir.
 * - opcoes  : as respostas possíveis (mesma estrutura usada na Fase 1).
 */

/** Dados fictícios do banco e do atendente mostrados na tela da ligação. */
export const BANCO = {
  nome: 'Banco Nova Segurança',
  setor: 'Central de Atendimento',
  atendente: 'Carlos Andrade',
  cargo: 'Equipe de Segurança',
  aviso: 'Esta é uma ligação fictícia. Ninguém está realmente ligando.',
  // Número fictício exibido na tela da chamada (não é um telefone real).
  telefone: '(11) 4002-8922',
};

/** Primeira orientação do assistente, antes de a ligação ser atendida. */
export const ORIENTACAO_INICIAL = {
  tipo: 'dica',
  titulo: 'Uma ligação está chegando',
  texto:
    'Você vai receber uma ligação inventada de alguém que se diz funcionário de um banco. Nada aqui é real e nenhum dado seu será usado.',
  dica: 'Ouça com calma, toque em uma opção para responder e, quando quiser, toque em Encerrar ligação.',
  avancar: false, // apenas fecha a orientação; a ligação só começa ao tocar em Atender.
  final: false,
};

/** Orientação mostrada quando o usuário encerra a ligação antes do final. */
export const ORIENTACAO_ENCERRAR = {
  tipo: 'seguro',
  titulo: 'Você encerrou a ligação',
  texto:
    'Desligar uma ligação em que alguém pede seus dados é uma atitude segura. Você pode procurar o banco você mesmo, pelo número que está no seu cartão.',
  dica: 'Encerrar a ligação não causa nenhum problema. O banco de verdade nunca trata assuntos de segurança por telefone.',
  avancar: false,
  final: true, // a Fase 2 termina aqui quando o usuário desliga a ligação.
};

/** Orientação mostrada quando o usuário RECUSA a ligação (nem atende). */
export const ORIENTACAO_RECUSAR = {
  tipo: 'seguro',
  titulo: 'Ótima atitude: você recusou uma ligação suspeita',
  texto:
    'Quando o número não é conhecido e a ligação parece ser de um banco, o mais seguro é não atender. Assim você não conversa com o golpista e nem se sente pressionado.',
  dica: 'Se precisar falar com o banco, ligue você mesmo para o número que está no seu cartão ou use o aplicativo oficial.',
  avancar: false,
  final: true, // a Fase 2 termina aqui quando o usuário recusa a ligação.
};

/** As 4 situações da Fase 2, na ordem em que acontecem durante a ligação. */
export const ETAPAS = [
  {
    id: 'movimentacao',
    // Arquivo de áudio desta etapa. Se o arquivo não existir, o texto é lido
    // pela voz do navegador. Basta criar os MP3 em public/audio/ para usá-los.
    audioUrl: '/audio/banco-etapa-1.mp3',
    falas: [
      'Boa tarde! Eu falo do setor de segurança do Banco Nova Segurança. Meu nome é Carlos Andrade.',
      'Identificamos uma compra suspeita de R$ 2.400 no seu cartão. Para cancelarmos, preciso que você siga algumas etapas comigo.',
    ],
    pergunta: 'Como você responde?',
    opcoes: [
      {
        id: 'seguir-instrucoes',
        rotulo: 'Seguir as instruções do atendente',
        mensagemEnviada: 'Está bom, me diga o que eu preciso fazer.',
        reacao: 'Perfeito! Primeiro você precisa confirmar alguns dados...',
        tipo: 'risco',
        orientacao: {
          titulo: 'Cuidado: o banco não pede para você seguir instruções por telefone',
          texto:
            'Golpistas avisam sobre uma compra suspeita que não existe, só para assustar. O objetivo é fazer você obedecer sem pensar.',
          dica: 'Nunca siga instruções de pagamento ou de cadastro recebidas por telefone.',
        },
      },
      {
        id: 'ligar-cartao',
        rotulo: 'Desligar e ligar para o número do cartão',
        mensagemEnviada: 'Prefiro desligar e ligar para o número que está no meu cartão.',
        reacao: 'Não precisa desligar! Você pode resolver agora comigo, é rápido.',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Excelente! Ligar você mesmo para o banco é a atitude correta',
          texto:
            'O número que está no seu cartão é confiável. Assim você fala com o banco de verdade, e não com quem telefonou para você.',
          dica: 'Sempre desligue e ligue você mesmo para o número do cartão, do aplicativo ou da agência.',
        },
      },
      {
        id: 'pedir-protocolo',
        rotulo: 'Pedir o nome completo e o protocolo do atendimento',
        mensagemEnviada: 'Por favor, me informe o seu nome completo e o número do protocolo.',
        reacao: 'Claro, o protocolo é o 4471... mas você precisa confirmar seus dados primeiro.',
        tipo: 'atencao',
        orientacao: {
          titulo: 'Fique atento: golpista também inventa protocolo',
          texto:
            'Nomes e números de protocolo podem ser inventados e não provam que a ligação é verdadeira. A sua dúvida continua sendo o melhor aviso.',
          dica: 'Confirme sempre por um canal que você mesmo escolheu, como o aplicativo oficial do banco.',
        },
      },
    ],
  },

  {
    id: 'dados-pessoais',
    audioUrl: '/audio/banco-etapa-2.mp3',
    falas: [
      'Para cancelar a compra, preciso confirmar seus dados no sistema.',
      'Você pode me informar o seu CPF e a sua data de nascimento?',
    ],
    pergunta: 'Como você responde?',
    opcoes: [
      {
        id: 'informar-dados',
        rotulo: 'Informar os dados que ele pediu',
        mensagemEnviada: 'Pode confirmar, eu informo os meus dados para você.',
        reacao: 'Ótimo. Agora só falta um dado para finalizarmos o cancelamento.',
        tipo: 'risco',
        orientacao: {
          titulo: 'Cuidado: quem liga não precisa dos seus dados',
          texto:
            'O banco já tem os seus dados. Quando alguém pede para você confirmá-los por telefone, pode estar juntando informações para aplicar golpes.',
          dica: 'Nunca informe CPF, senha ou dados bancários por telefone.',
        },
      },
      {
        id: 'nao-informar',
        rotulo: 'Dizer que só trata disso no aplicativo ou na agência',
        mensagemEnviada: 'Não informo dados por telefone. Vou até a agência ou uso o aplicativo.',
        reacao: 'Você está complicando. Se não confirmar agora, a compra será cobrada.',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Parabéns! Você protegeu os seus dados',
          texto:
            'O banco de verdade não precisa que você confirme dados por telefone. Você pode usar o aplicativo ou ir pessoalmente, com toda a calma.',
          dica: 'Quando tiver dúvida, procure o seu banco por um canal oficial.',
        },
      },
      {
        id: 'procurar-ajuda',
        rotulo: 'Pedir um tempo para falar com alguém da família',
        mensagemEnviada: 'Vou pedir ajuda para alguém da minha família antes de continuar.',
        reacao: 'Não é necessário envolver outras pessoas. É rapidinho, você vai ver.',
        tipo: 'atencao',
        orientacao: {
          titulo: 'Muito bom pedir ajuda — e note como ele não quer que você converse com outros',
          texto:
            'Golpistas não querem que você fale com outras pessoas, porque alguém pode reconhecer a armação. Pedir ajuda nunca é exagero.',
          dica: 'Vale sempre a pena conversar com alguém de confiança antes de continuar.',
        },
      },
    ],
  },

  {
    id: 'senha-codigo',
    audioUrl: '/audio/banco-etapa-3.mp3',
    falas: [
      'Vou enviar um código para o seu celular agora.',
      'Me passe esse código e também a sua senha de 4 dígitos, para eu cancelar a compra. É só para a sua segurança.',
    ],
    pergunta: 'Como você responde?',
    opcoes: [
      {
        id: 'informar-senha',
        rotulo: 'Informar o código e a senha',
        mensagemEnviada: 'Recebi o código. Vou informar para você.',
        reacao: 'Perfeito! Estamos quase terminando o cancelamento.',
        tipo: 'risco',
        orientacao: {
          titulo: 'Nunca informe senha ou código para ninguém',
          texto:
            'A senha e o código são as chaves da sua conta. O golpista usa justamente o código enviado por mensagem para autorizar as operações dele.',
          dica: 'Nenhum banco pede senha ou código por telefone, nem por mensagem.',
        },
      },
      {
        id: 'recusar-senha',
        rotulo: 'Dizer que não existe senha por telefone e desligar',
        mensagemEnviada: 'Não informo senha nem código pelo telefone. Vou desligar.',
        reacao: 'Se você desligar, a compra será cobrada hoje mesmo!',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Excelente atitude! Você pode verificar tudo com calma depois',
          texto:
            'O banco nunca pede senha ou código de segurança. Se a compra tivesse acontecido de verdade, você poderia conferir tudo pelo aplicativo, sem pressa.',
          dica: 'Desligue, confira o aplicativo oficial do banco e, se preferir, vá até a agência.',
        },
      },
      {
        id: 'ir-agencia',
        rotulo: 'Falar que vai resolver na agência pessoalmente',
        mensagemEnviada: 'Prefiro ir pessoalmente até a minha agência resolver isso.',
        reacao: 'Você vai perder tempo. Resolver agora é muito mais fácil!',
        tipo: 'atencao',
        orientacao: {
          titulo: 'Ótima escolha: o atendimento presencial ou oficial é seguro',
          texto:
            'Ir à agência ou usar o aplicativo oficial evita o contato com golpistas. O tempo que você "perde" é o tempo que protege o seu dinheiro.',
          dica: 'A pressa é sempre um sinal de alerta.',
        },
      },
    ],
  },

  {
    id: 'conta-segura',
    audioUrl: '/audio/banco-etapa-4.mp3',
    falas: [
      'Como você não passou os dados, vou precisar de outra forma de ajuda.',
      'Faça uma transferência do seu saldo para uma conta segura do banco. Depois devolvemos tudo para você, sem nenhum custo.',
    ],
    pergunta: 'Qual é a sua decisão final?',
    opcoes: [
      {
        id: 'transferir-conta-segura',
        rotulo: 'Fazer a transferência para a conta indicada',
        mensagemEnviada: 'Está bom, vou fazer a transferência para essa conta segura.',
        reacao: 'Isso! Assim o seu dinheiro fica protegido. Depois me envie o comprovante.',
        tipo: 'risco',
        orientacao: {
          titulo: 'Não existe "conta segura"',
          texto:
            'Nenhum banco pede para você transferir o seu dinheiro para outra conta. O dinheiro transferido vai direto para o golpista e quase nunca é devolvido.',
          dica: 'Nunca transfira dinheiro por pedido de alguém que ligou para você.',
        },
      },
      {
        id: 'recusar-transferencia',
        rotulo: 'Recusar, desligar e ligar pelo número do cartão',
        mensagemEnviada: 'Não vou transferir nada. Vou desligar e ligar para o banco pelo número do meu cartão.',
        reacao: 'Você está errado, vou registrar isso. Boa tarde!',
        tipo: 'seguro',
        orientacao: {
          titulo: 'Parabéns! Você identificou o golpe',
          texto:
            'Você fez exatamente o que protege o seu dinheiro: não transferiu, encerrou a ligação e procurou o banco pelos canais oficiais.',
          dica: 'Confira o extrato pelo aplicativo oficial e avise a sua família sobre a ligação.',
        },
      },
      {
        id: 'pedir-por-escrito',
        rotulo: 'Pedir as informações por escrito para decidir com calma',
        mensagemEnviada: 'Se for verdade, envie essas informações por escrito para eu analisar com calma.',
        reacao: 'Você precisa decidir agora, é uma questão de segurança!',
        tipo: 'atencao',
        orientacao: {
          titulo: 'Muito bom ganhar tempo',
          texto:
            'Quem tem pressa para você resolver é justamente quem está aplicando o golpe. Pedir tempo para pensar é uma atitude segura.',
          dica: 'Se houver dúvida, encerre a ligação e converse com alguém de confiança.',
        },
      },
    ],
  },
];
