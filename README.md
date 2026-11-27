# Golpe Zero — Simulador Educacional de Golpes Digitais

Aplicativo web educativo e gamificado que ensina **pessoas idosas** a reconhecer
golpes digitais comuns, como a mensagem de um "parente falso" pedindo dinheiro e
a ligação de um suposto funcionário do banco.

O usuário passa por situações **fictícias**, sem risco, sem cadastro e sem informar
nenhum dado pessoal.

---

## 1. Descrição do projeto

O aplicativo é um site estático (roda 100% no navegador, sem backend) dividido em
quatro telas:

| Endereço | Tela | Situação |
| --- | --- | --- |
| `/` | Tela inicial | Apresentação do projeto e convite para começar |
| `/simulacao/parente` | Fase 1 | Mensagem de um parente falso pedindo dinheiro |
| `/simulacao/banco` | Fase 2 | Ligação de um banco falso pedindo dados |
| `/conclusao` | Encerramento | Resumo do que se aprendeu e opção de refazer |

As duas simulações estão **completas**. Cada fase tem início, desenvolvimento e
conclusão, com um assistente educativo que explica cada decisão em texto e em áudio.

---

## 2. Tecnologias utilizadas

- **[React](https://react.dev/)** — construção das telas com componentes.
- **[Vite](https://vitejs.dev/)** — servidor de desenvolvimento e build.
- **JavaScript (JSX)** — sem TypeScript.
- **CSS puro** — sem frameworks visuais (nenhum Bootstrap, Tailwind etc.).
- **[React Router](https://reactrouter.com/)** — navegação entre as telas.
- **SpeechSynthesis** — API nativa do navegador usada para ler as orientações em
  voz alta (sem serviços externos de voz).
- **Reprodução de MP3** — durante a ligação, o áudio do golpista pode ser um
  arquivo `.mp3` (em `public/audio/`) ou, na falta dele, a própria voz do
  navegador. A troca de saída de áudio (viva-voz) usa `setSinkId` quando o
  navegador oferece esse recurso.

Nenhuma outra biblioteca é usada: sem APIs externas, sem banco de dados, sem
autenticação.

---

## 3. Requisitos para executar o aplicativo

- **Node.js** versão 18 ou superior (recomendado 20+).
  Confira com: `node -v`
- **npm** (já vem com o Node.js).
  Confira com: `npm -v`

---

## 4. Como instalar as dependências

Na pasta raiz do projeto, execute:

```bash
npm install
```

Esse comando baixa o React, o React Router e o Vite para a pasta `node_modules`.
É necessário executá-lo apenas **uma vez** (ou sempre que o `package.json` mudar).

---

## 5. Como iniciar o servidor de desenvolvimento

```bash
npm run dev
```

O navegador abrirá automaticamente em **http://localhost:5173**.

Qualquer alteração salva em um arquivo aparece no navegador na hora
(atualização automática, sem precisar recarregar a página).

Outros comandos disponíveis:

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera a versão final otimizada na pasta `dist/` |
| `npm run preview` | Testa localmente a versão gerada pelo `build` |

---

## 6. Fluxo da atividade

```text
Tela inicial (/)
   │  botão "Começar simulação"
   ▼
FASE 1 — Parente falso (/simulacao/parente)
   │  3 situações com escolhas + assistente educativo em texto e áudio
   │  ao final: mensagem de incentivo
   ▼
FASE 2 — Banco falso (/simulacao/banco)
   │  4 situações com escolhas + assistente educativo em texto e áudio
   │  ao final: mensagem de incentivo
   ▼
Tela de conclusão (/conclusao)
       "Refazer a atividade" volta para a Fase 1 (recomeça do zero)
```

O usuário nunca é punido: **todas as escolhas avançam a história** e geram uma
explicação educativa. O objetivo é ensinar, não reprovar.

---

## 7. Estrutura de pastas

```text
golpe-zero/
├── index.html              # Página HTML base; o React é desenhado dentro de <div id="root">
├── package.json            # Dependências e comandos do projeto
├── vite.config.js          # Configuração do Vite (porta 5173, plugin do React)
├── README.md               # Este arquivo
├── public/
│   └── audio/              # Arquivos MP3 das falas (veja a seção 11)
└── src/
    ├── main.jsx            # Ponto de entrada: liga o React ao HTML e ativa o React Router
    ├── App.jsx             # Define as ROTAS (qual página aparece em cada endereço)
    ├── data/               # SOMENTE CONTEÚDO (textos, diálogos e orientações)
    │   ├── parenteFalso.js # Roteiro da Fase 1 (mensagens do golpista + opções)
    │   └── bancoFalso.js   # Roteiro da Fase 2 (falas + opções + audioUrl)
    ├── hooks/              # Comportamento reutilizável
    │   ├── useNarracao.js     # Áudio do assistente (SpeechSynthesis ou MP3)
    │   ├── useAudioLigacao.js # Áudio da ligação (autoplay, silenciar, viva-voz)
    │   └── useRelogio.js      # Horário "HH:MM" da barra de status do celular
    ├── components/         # Peças reutilizáveis em várias telas
    │   ├── Button.jsx      # Botão padrão (grande e acessível)
    │   ├── Icone.jsx       # Ícones em SVG (sem imagens externas)
    │   ├── Assistente.jsx  # Assistente educativo em texto e áudio
    │   ├── Progresso.jsx   # Indicador de fase, progresso e situações concluídas
    │   ├── BarraStatus.jsx # Barra de status do celular (hora, sinal, Wi-Fi, bateria)
    │   ├── Decisoes.jsx    # Painel com a pergunta e as opções (FORA do celular)
    │   ├── SimulacaoMensagens.jsx # App de mensagens dentro de um celular (Fase 1)
    │   ├── SimulacaoLigacao.jsx   # Tela de chamada de celular (Fase 2)
    │   └── TelaConclusao.jsx      # Tela de encerramento
    ├── pages/              # Uma tela por arquivo
    │   ├── Home.jsx        # Tela inicial
    │   ├── FakeRelative.jsx# Fase 1 — LÓGICA da simulação de mensagens
    │   └── FakeBank.jsx    # Fase 2 — LÓGICA da simulação de ligação
    └── styles/
        ├── global.css      # Reinicialização, variáveis de cor e estilos do botão
        ├── home.css        # Estilos da tela inicial
        ├── simulacao.css   # Estilos comuns (moldura do celular, progresso, incentivo...)
        ├── mensagens.css   # Estilos do app de mensagens (Fase 1)
        ├── ligacao.css     # Estilos da tela de chamada (Fase 2)
        └── assistente.css  # Estilos do assistente educativo
```

### Regra de ouro da organização

O projeto está dividido em **três camadas**, para que cada um mexa só no que precisa:

| Camada | Onde fica | Responsabilidade |
| --- | --- | --- |
| **Conteúdo** | `src/data/` | Textos, diálogos, opções e orientações. **Sem código de tela.** |
| **Apresentação** | `src/components/` | Como as coisas aparecem (chat, ligação, assistente, progresso). |
| **Lógica** | `src/pages/` | Quando cada coisa acontece (qual etapa, quantas concluídas, quando encerrar). |

Assim, **mudar um diálogo não mexe no visual**, e **mudar o visual não mexe no diálogo**.

---

## 8. Como funcionam as simulações

Cada fase funciona como um "roteiro em etapas". As etapas ficam em `src/data/` e a
página apenas percorre a lista, uma a uma.

**Fase 1 — `src/data/parenteFalso.js`** (3 etapas)
Cada etapa tem as mensagens recebidas, uma pergunta e as opções de resposta.
Ao tocar em uma opção, a escolha do usuário e a reação do golpista entram na
conversa, e o assistente educativo abre explicando o que aquela escolha significa.

**Fase 2 — `src/data/bancoFalso.js`** (4 etapas)
Mesma ideia, mas em formato de ligação: o falso atendente fala, e o usuário decide
como responder. As situações são: movimentação suspeita, pedido de dados pessoais,
pedido de senha/código e convite para uma suposta "conta segura".

### Interface imersiva (moldura de celular)

Para deixar a experiência mais parecida com a de um celular de verdade:

- A conversa da Fase 1 acontece **dentro da tela de um smartphone**: moldura do
  aparelho, barra de status (horário, bateria, sinal e Wi-Fi), cabeçalho do contato
  com foto e disponibilidade, papel de parede e balões brancos (recebidas) e verdes
  (enviadas), com horário e visto de enviada/lida.
- A Fase 2 mostra a **tela de chamada de um celular**: primeiro a chamada chegando
  (botões grandes de **Atender** e **Recusar**) e, depois de atender, a chamada em
  andamento (nome do atendente, número, **cronômetro**, indicador de áudio, legendas
  e os botões **Silenciar**, **Viva-voz** e **Encerrar**).
- As **opções de decisão e as orientações ficam FORA do celular**, em um painel ao
  lado (em telas grandes) ou logo abaixo (em telas pequenas). Assim a conversa não é
  interrompida e nada exige rolagem horizontal no celular.
- Nenhuma marca, logotipo ou identidade oficial de aplicativo é usada: o visual é
  apenas inspirado em aplicativos de mensagens e na tela de chamada de um celular.

Cada opção guarda:

```js
{
  id: 'fazer-pix',                 // identificador único da opção
  rotulo: 'Fazer o PIX agora',     // texto do botão que o usuário toca
  mensagemEnviada: 'Já vou fazer o PIX.', // o que aparece como enviado pelo usuário
  reacao: 'Isso! Manda rápido...', // resposta que o golpista dá em seguida
  tipo: 'risco',                   // 'seguro' | 'risco' | 'atencao'
  orientacao: {
    titulo: 'Pedido de dinheiro por número novo é sinal de alerta',
    texto: 'O golpista avisa que trocou de número justamente para...',
    dica: 'Nunca envie dinheiro para um número novo sem confirmar.',
  },
}
```

O campo `tipo` define como o **assistente** se apresenta:

| `tipo` | Rótulo mostrado | Ícone |
| --- | --- | --- |
| `seguro` | "Boa escolha!" | visto |
| `risco` | "Atenção: esta escolha é arriscada" | triângulo |
| `atencao` | "Fique atento" | exclamação |

> A informação **nunca depende só da cor**: o rótulo aparece escrito e com ícone.

---

## 9. Como modificar os diálogos

1. Abra o arquivo de dados da fase que quer mudar:
   - Fase 1 → `src/data/parenteFalso.js`
   - Fase 2 → `src/data/bancoFalso.js`
2. Edite os textos:
   - `CONTATO` / `BANCO` — nome fictício, avatar/atendente e avisos do cabeçalho.
   - `ORIENTACAO_INICIAL` — primeira explicação do assistente.
   - `ETAPAS` — as mensagens (ou falas) e as opções de cada situação.
3. Salve. O navegador atualiza sozinho (`npm run dev` já está rodando).

Você não precisa mexer em nenhum componente: a tela lê os textos automaticamente.

> ⚠️ **Cuidado:** nunca peça dados bancários reais, senhas, códigos ou informações
> pessoais do usuário. Todo o conteúdo deve ser fictício.

---

## 10. Como adicionar novas decisões (opções)

Dentro de qualquer etapa, o campo `opcoes` é uma lista. Para criar uma nova opção,
copie uma existente e ajuste os textos:

```js
{
  id: 'ligar-para-filha',                 // use um id novo e único
  rotulo: 'Ligar para a filha pelo número salvo',
  mensagemEnviada: 'Vou te ligar agora, filha.',
  reacao: 'Não pode, estou sem sinal aqui!',
  tipo: 'seguro',
  orientacao: {
    titulo: 'Ótima ideia!',
    texto: 'Ligar pelo número que você já conhece confirma quem está falando.',
    dica: 'Confirme sempre por um contato que você mesmo escolheu.',
  },
},
```

Regras importantes:

- **Use um `id` que ainda não exista** na mesma fase (é o que o React usa na lista).
- Toda opção precisa ter `rotulo`, `mensagemEnviada`, `tipo` e `orientacao`.
- `reacao` é opcional.
- Não é preciso criar "caminhos sem volta": todas as opções continuam para a próxima
  etapa, mantendo a ideia de ensinar sem punir.

Para **adicionar uma nova situação inteira**, copie um objeto de `ETAPAS` e cole no
fim da lista. O indicador de progresso (`3 de 3`, `4 de 4`) se ajusta sozinho, pois
ele conta os itens de `ETAPAS`.

---

## 11. Como adicionar e substituir os áudios

Todos os áudios ficam na pasta **`public/audio/`** (já criada no projeto). É de lá que
o navegador busca os arquivos MP3 — nenhum código precisa ser alterado para trocá-los.

### Nomes dos arquivos da ligação (Fase 2)

Cada etapa da ligação aponta para um arquivo por meio do campo `audioUrl`:

| Etapa (Fase 2) | Arquivo esperado |
| --- | --- |
| 1 — movimentação suspeita | `public/audio/banco-etapa-1.mp3` |
| 2 — pedido de dados pessoais | `public/audio/banco-etapa-2.mp3` |
| 3 — pedido de senha/código | `public/audio/banco-etapa-3.mp3` |
| 4 — "conta segura" | `public/audio/banco-etapa-4.mp3` |

### Adicionar um áudio

1. Grave ou escolha o arquivo MP3.
2. Copie-o para `public/audio/` com o nome certo (ex.: `banco-etapa-1.mp3`).
3. Pronto: ao atender a ligação, esse MP3 já toca automaticamente.

### Substituir um áudio existente

Basta **colocar o novo MP3 com o mesmo nome**, sobrepondo o antigo. Nenhuma linha de
código precisa mudar.

### Quando o arquivo não existe

Se o MP3 não estiver na pasta, a simulação **não quebra**: o texto daquela etapa é
lido pela voz do próprio navegador (SpeechSynthesis). Assim, o projeto funciona mesmo
antes de a equipe gravar as vozes.

> **Dica:** grave em português do Brasil, fale um pouco mais devagar e mantenha cada
> arquivo leve (poucos segundos) para carregar rápido em celulares.

### Áudios do assistente educativo

As orientações do assistente (botões "Ouvir"/"Repetir") também podem usar MP3. Nesse
caso, acrescente `audioUrl` dentro de `orientacao`, no arquivo de dados
([useNarracao.js](src/hooks/useNarracao.js) cuida disso):

```js
orientacao: {
  titulo: 'Pedido de dinheiro por número novo é sinal de alerta',
  texto: '...',
  dica: '...',
  audioUrl: '/audio/orientacao-parente-1.mp3', // pronto: toca o MP3
},
```

Sem `audioUrl`, o assistente continua usando a voz do navegador. O áudio do assistente
**nunca começa sozinho**: só depois de tocar em "Ouvir orientação".

---

## 12. Como configurar novas falas

Cada fala é apenas um texto nos arquivos de `src/data/` — não há código envolvido.

**Fase 2 — `src/data/bancoFalso.js`:** cada etapa tem a lista `falas`:

```js
{
  id: 'movimentacao',
  audioUrl: '/audio/banco-etapa-1.mp3', // opcional
  falas: [
    'Boa tarde! Eu falo do setor de segurança...',
    'Identificamos uma compra suspeita de R$ 2.400...',
  ],
  pergunta: 'Como você responde?',
  opcoes: [ /* ... */ ],
}
```

- **Editar** uma fala: mude o texto dentro de `falas`.
- **Acrescentar** uma fala: adicione uma nova linha na lista `falas`.
- **Remover** uma fala: apague a linha.
- Todas as falas da etapa são lidas em sequência. Se você usar um MP3, o arquivo
  deve conter **todas as falas daquela etapa** (é o que o usuário vai ouvir).

**Fase 1 — `src/data/parenteFalso.js`:** use a lista `mensagens` da etapa, seguindo a
mesma ideia (as mensagens recebidas aparecem como balões brancos no celular).

---

## 13. Como funciona a reprodução automática

A regra número um dos navegadores é: **um som só começa sozinho se for iniciado
dentro de um clique do usuário**. Para respeitar isso:

1. Quando o usuário toca em **Atender**, a própria função do clique (em
   [FakeBank.jsx](src/pages/FakeBank.jsx)) chama o áudio **na mesma hora**, antes de
   qualquer espera. Assim o som começa sem depender de "autoplay" livre.
2. Ao mesmo tempo, a tela muda para **chamada em andamento** e o **cronômetro** começa.
3. Enquanto o áudio toca, aparece um **indicador visual** (barras animadas) e as
   **opções de resposta ficam escondidas**: o usuário só decide depois de ouvir.
4. Quando o áudio termina, as **opções daquela etapa são liberadas**.

Se o MP3 não puder ser reproduzido (não existe, falhou ao carregar ou o navegador
bloqueou), o sistema:

- tenta automaticamente a **voz do navegador**; e
- se ainda assim não for possível, mostra uma **mensagem simples** com o botão
  **"Tentar novamente"**, sem travar a simulação.

Outros comportamentos importantes:

- **Encerrar a ligação** interrompe o áudio imediatamente.
- **Silenciar** controla o som do atendente (no MP3, deixa o áudio mudo; na voz do
  navegador, encerra a fala — o texto continua visível nas legendas).
- **Viva-voz** alterna a saída de áudio quando o navegador oferece esse recurso
  (`setSinkId`); quando não oferece, o botão aparece desativado.
- **Nunca tocam dois áudios ao mesmo tempo**: começar um novo sempre interrompe o
  anterior.

O código fica em [useAudioLigacao.js](src/hooks/useAudioLigacao.js).

---

## 14. Como adicionar novas etapas à ligação

1. Abra `src/data/bancoFalso.js`.
2. Copie um objeto de `ETAPAS` e cole no fim da lista. Ajuste:
   - `id` — use um nome novo e único.
   - `audioUrl` — o MP3 da nova etapa (ou remova para usar a voz do navegador).
   - `falas` — o que o falso atendente fala.
   - `pergunta` e `opcoes` — as decisões do usuário.
3. (Opcional) Grave o MP3 com o nome escolhido e coloque em `public/audio/`.

Não é preciso mexer em nenhum componente: a página percorre a lista sozinha e o
indicador de progresso ("x de y") se ajusta automaticamente.

---

## 15. Gamificação

A progressão é simples e **não pune** o usuário:

- `Progresso.jsx` mostra a **fase atual** ("Fase 1 de 2"), o **título da fase**, a
  **contagem de situações concluídas** ("2 de 3 situações concluídas") e uma **barra**.
- Ao terminar cada fase, aparece um **cartão de incentivo** com uma mensagem positiva
  e o botão para seguir adiante.
- Não existem vidas, perdas, pontuação negativa nem "game over".

---

## 16. Acessibilidade e responsividade

O projeto segue os mesmos cuidados da tela inicial:

- **Botões grandes** (altura mínima de 60px) e com bastante espaço entre eles.
- **Fonte base de 18px**, sem serifa, com bom contraste.
- **Navegação por teclado** com foco sempre visível.
- **Leitores de tela**: uso de `role="log"`, `aria-live`, `role="progressbar"`,
  `role="timer"` e textos escondidos (classe `.sr-apenas`) que descrevem quem falou.
- **Nada depende só da cor**: cada estado tem rótulo escrito + ícone.
- **Responsivo**: funciona em celular, tablet e computador (ajustes em 560px e 900px).
- **Movimento reduzido**: quem ativa essa opção no sistema não vê as animações.

---

## 17. Como testar o aplicativo

1. Rode `npm install` (uma vez) e depois `npm run dev`.
2. Abra **http://localhost:5173** e siga esta lista:

**Tela inicial**
- [ ] O botão "Começar simulação" abre a Fase 1.

**Fase 1 — Parente falso (dentro da moldura de celular)**
- [ ] A conversa aparece DENTRO de um celular, com barra de status (hora, sinal,
      Wi-Fi, bateria), cabeçalho do contato e papel de parede.
- [ ] As mensagens recebidas são brancas e as enviadas são verdes, com horário e
      visto de enviada/lida.
- [ ] As opções de resposta aparecem no painel ao lado (desktop) ou abaixo (celular),
      e NÃO dentro da tela do celular.
- [ ] No celular real não há rolagem horizontal.
- [ ] "Ouvir orientação" lê o texto em voz alta; "Parar áudio" interrompe.
- [ ] A conversa acontece em 3 situações; cada opção muda o rumo da conversa.
- [ ] Cada escolha abre o assistente com uma explicação diferente.
- [ ] O progresso ("x de 3") aumenta a cada escolha.
- [ ] É possível escrever uma resposta no campo de texto e enviar.
- [ ] No fim, aparece a mensagem de incentivo e o botão para a Fase 2.

**Fase 2 — Banco falso (tela de chamada realista)**
- [ ] Antes de atender: fundo escuro, nome e número fictícios, ícone do banco e os
      botões grandes **Atender** e **Recusar**.
- [ ] "Recusar" mostra a orientação sobre não atender ligações suspeitas.
- [ ] Ao tocar em **Atender**: a tela muda na hora para **chamada em andamento**, o
      **cronômetro** começa e o **áudio do golpista toca sozinho**.
- [ ] Enquanto o áudio toca, o indicador animado aparece e as **opções ficam ocultas**.
- [ ] Quando o áudio termina, as **opções da etapa são liberadas**.
- [ ] **Silenciar** controla o som do atendente; **Viva-voz** alterna a saída (ou fica
      desativado quando o navegador não suporta).
- [ ] **Encerrar** interrompe o áudio na hora e mostra a orientação de desligamento.
- [ ] A ligação tem 4 situações, cada uma com explicação educativa.
- [ ] No fim, aparece o botão "Ver o resultado da atividade".

**Conclusão e reinício**
- [ ] A tela de conclusão lista os aprendizados.
- [ ] "Refazer a atividade" volta para a Fase 1 do zero.
- [ ] "Voltar para o início" retorna para `/`.

**Geral**
- [ ] Testado em celular, tablet e computador (a moldura fica centralizada e com
      proporções realistas no computador).
- [ ] Nenhum erro aparece no console do navegador (tecla F12 → aba "Console").
- [ ] A interface continua legível ao diminuir a janela (teste o modo celular do
      navegador).

Para conferir a versão final antes de entregar, rode:

```bash
npm run build
```

Se terminar sem erros, o projeto está compilando corretamente.

---

## 18. Orientações para os integrantes da equipe

### Divisão de responsabilidades sugerida

| Integrante | Onde mexer |
| --- | --- |
| Tela inicial | `src/pages/Home.jsx` + `src/styles/home.css` |
| Fase 1 (parente) | `src/pages/FakeRelative.jsx` + `src/data/parenteFalso.js` + `SimulacaoMensagens.jsx`/`mensagens.css` |
| Fase 2 (banco) | `src/pages/FakeBank.jsx` + `src/data/bancoFalso.js` + `SimulacaoLigacao.jsx`/`ligacao.css` + `useAudioLigacao.js` |
| Assistente / áudio | `src/components/Assistente.jsx` + `src/hooks/useNarracao.js` + `assistente.css` |
| Moldura do celular | `src/styles/simulacao.css` (`.smartphone`) + `BarraStatus.jsx` + `useRelogio.js` |
| Painel de decisões | `src/components/Decisoes.jsx` (opções fora do celular) |
| Áudios das falas | `public/audio/` + campo `audioUrl` em `src/data/bancoFalso.js` |

### Boas práticas

1. **Não altere `src/pages/Home.jsx`** sem necessidade: a tela inicial é independente.
2. Prefira **editar os arquivos de `src/data/`** para mudar textos, em vez de mexer
   nos componentes.
3. Mantenha o **`export default`** de cada componente.
4. Se criar um componente novo, coloque em `src/components/` e o CSS em `src/styles/`.
5. Escreva **comentários em português** explicando o que cada parte faz.

### Cuidados com o público idoso

- Textos **curtos** e em linguagem simples, sem termos técnicos.
- Fonte **grande** e sem serifa; botões **grandes** e bem espaçados.
- **Poucos elementos** na tela e um caminho claro de ação.
- Evite elementos pequenos ou que dependam só de cor.
- Nunca peça dados reais: tudo é fictício.

### Antes de enviar o seu trabalho

Execute `npm run build`. Se ele terminar sem erros, o seu código está compilando
corretamente para todas as pessoas da equipe.
