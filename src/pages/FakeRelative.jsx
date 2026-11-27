/**
 * FakeRelative.jsx — Fase 1: conversa fictícia com um "parente falso".
 *
 * Responsabilidade desta página (a LÓGICA da simulação):
 * - Controlar em que momento da conversa o usuário está.
 * - Guardar o histórico de mensagens exibido na tela.
 * - Decidir quando o assistente educativo aparece.
 * - Contar as situações concluídas (progresso) e encerrar a fase.
 *
 * Divisão de trabalho do código (importante para quem for alterar):
 * - Conteúdo/diálogos ....... src/data/parenteFalso.js  (só textos)
 * - Aparência do chat ....... src/components/SimulacaoMensagens.jsx
 * - Opções de resposta ...... src/components/Decisoes.jsx (painel fora do celular)
 * - Orientações do áudio .... src/components/Assistente.jsx
 * - Progresso ............... src/components/Progresso.jsx
 *
 * IMPORTANTE (imersão): a conversa acontece DENTRO da moldura de celular.
 * Para isso, a página usa o layout ".simulacao-layout", que coloca o aparelho
 * de um lado e o painel auxiliar (opções/assistente) do outro. Em telas
 * pequenas, o painel fica logo abaixo do aparelho, sem rolagem horizontal.
 *
 * Ou seja: para mudar o que o golpista escreve, mexa apenas no arquivo de
 * dados. Para mudar a aparência, mexa apenas no componente. Esta página só
 * liga uma coisa na outra — a lógica das decisões educativas não muda.
 */

import { useRef, useState } from 'react';

import Assistente from '../components/Assistente.jsx';
import Button from '../components/Button.jsx';
import Decisoes from '../components/Decisoes.jsx';
import Icone from '../components/Icone.jsx';
import Progresso from '../components/Progresso.jsx';
import SimulacaoMensagens from '../components/SimulacaoMensagens.jsx';
import {
  CONTATO,
  ETAPAS,
  ORIENTACAO_INICIAL,
  ORIENTACAO_TEXTO_LIVRE,
} from '../data/parenteFalso.js';

import '../styles/simulacao.css';

/** Horário atual no formato "HH:MM", usado no rodapé dos balões de mensagem. */
function horaAgora() {
  return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function FakeRelative() {
  // indice = -1 significa "a conversa ainda não começou".
  // A conversa só começa depois que o usuário fecha a orientação inicial.
  const [indice, setIndice] = useState(-1);
  const [concluidas, setConcluidas] = useState(0);
  const [faseConcluida, setFaseConcluida] = useState(false);
  const [assistente, setAssistente] = useState(ORIENTACAO_INICIAL);
  const [mensagens, setMensagens] = useState(() => [
    {
      id: 'aviso-inicial',
      de: 'sistema',
      texto: 'Conversa fictícia para você praticar. Nada aqui é real.',
      hora: horaAgora(),
    },
  ]);

  // Contador simples para criar identificadores únicos para cada mensagem.
  const contador = useRef(0);

  /**
   * Cria uma mensagem nova com identificador único.
   * - hora  : horário exibido no balão (como nos aplicativos de mensagens).
   * - status: 'enviado' ou 'lido' (usado só nas mensagens do próprio usuário).
   */
  function criarMensagem(de, texto, status) {
    contador.current += 1;
    return { id: `msg-${contador.current}`, de, texto, hora: horaAgora(), status };
  }

  const etapaAtual = indice >= 0 ? ETAPAS[indice] : null;

  /** Mostra as mensagens da próxima etapa da conversa. */
  function avancarEtapa() {
    const proximoIndice = indice + 1;
    const proxima = ETAPAS[proximoIndice];
    if (!proxima) return;

    setIndice(proximoIndice);
    const novas = proxima.mensagens.map((texto) => criarMensagem('contato', texto));
    setMensagens((atual) => [...atual, ...novas]);
  }

  /** Chamado quando o usuário toca em uma das opções de resposta. */
  function escolher(opcao) {
    // 1) A escolha do usuário e a reação do golpista entram na conversa.
    //    Como o golpista responde em seguida, a mensagem já aparece como "lida".
    const novas = [criarMensagem('usuario', opcao.mensagemEnviada, 'lido')];
    if (opcao.reacao) {
      novas.push(criarMensagem('contato', opcao.reacao));
    }
    setMensagens((atual) => [...atual, ...novas]);

    // 2) Contabiliza a situação concluída (progresso).
    setConcluidas((total) => total + 1);

    // 3) Abre o assistente educativo explicando a escolha.
    //    "final" indica que era a última situação da fase.
    const temProxima = indice + 1 < ETAPAS.length;
    setAssistente({
      ...opcao.orientacao,
      tipo: opcao.tipo,
      avancar: temProxima,
      final: !temProxima,
    });
  }

  /** Chamado quando o usuário envia um texto escrito por ele mesmo. */
  function enviarTexto(texto) {
    // Mensagem escrita à mão: ainda não houve resposta, então fica "enviada".
    const mensagem = criarMensagem('usuario', texto, 'enviado');
    setMensagens((atual) => [...atual, mensagem]);

    // Aqui NÃO avançamos a história: o assistente apenas incentiva e devolve
    // as opções, para o usuário escolher como continuar.
    setAssistente({ ...ORIENTACAO_TEXTO_LIVRE });
  }

  /** Botão "Continuar" do assistente educativo. */
  function continuar() {
    const orientacaoAtual = assistente;
    setAssistente(null);
    if (!orientacaoAtual) return;

    if (orientacaoAtual.final) {
      setFaseConcluida(true); // mensagem de incentivo no fim da fase
      return;
    }
    if (orientacaoAtual.avancar) {
      avancarEtapa();
    }
  }

  // As opções só aparecem quando o assistente está fechado, a fase não terminou
  // e existe uma etapa em andamento.
  const mostrarDecisoes = !assistente && !faseConcluida && Boolean(etapaAtual);

  return (
    <main className="pagina-simulacao">
      <div className="pagina-simulacao__conteudo">
        {/* Indicador de fase, progresso e situações concluídas. */}
        <Progresso
          faseAtual={1}
          tituloFase="Fase 1 — Mensagem de um parente falso"
          concluidas={concluidas}
          total={ETAPAS.length}
        />

        {/* Celular (conversa) + painel auxiliar (opções e orientações). */}
        <div className="simulacao-layout">
          <div className="simulacao-layout__aparelho">
            <SimulacaoMensagens
              contato={CONTATO}
              mensagens={mensagens}
              onEnviarTexto={enviarTexto}
            />
          </div>

          <div className="simulacao-layout__painel">
            {/* Assistente educativo com orientação em texto e em áudio. */}
            {assistente && (
              <Assistente
                orientacao={assistente}
                onContinuar={continuar}
                rotuloContinuar={assistente.final ? 'Ir para a segunda simulação' : 'Continuar'}
              />
            )}

            {/* Opções de resposta ficam FORA da tela do celular. */}
            {mostrarDecisoes && (
              <Decisoes
                pergunta={etapaAtual.pergunta}
                opcoes={etapaAtual.opcoes}
                onEscolher={escolher}
                idPergunta="mensagens-pergunta"
              />
            )}

            {/* Mensagem de incentivo no fim da Fase 1. */}
            {faseConcluida && (
              <section className="incentivo" aria-label="Fase 1 concluída">
                <p className="incentivo__selo">
                  <Icone nome="estrela" tamanho={20} />
                  Fase 1 concluída
                </p>
                <h2 className="incentivo__titulo">Muito bem! Você terminou a primeira situação.</h2>
                <p className="incentivo__texto">
                  Você passou por {concluidas} de {ETAPAS.length} situações desta conversa e viu
                  como confirmar a identidade de alguém antes de enviar dinheiro. Agora vamos
                  praticar uma ligação de banco falso.
                </p>
                <Button to="/simulacao/banco" bloco>
                  <Icone nome="continuar" tamanho={20} />
                  Ir para a segunda simulação
                </Button>
                <Button to="/" variant="secundario" bloco>
                  Voltar para o início
                </Button>
              </section>
            )}
          </div>
        </div>

        {/* Saída discreta, caso o usuário queira parar no meio. */}
        <p className="pagina-simulacao__saida">
          <Button to="/" variant="secundario">
            Sair da simulação
          </Button>
        </p>
      </div>
    </main>
  );
}
