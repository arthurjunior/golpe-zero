/**
 * FakeBank.jsx — Fase 2: ligação fictícia de um "banco falso".
 *
 * Responsabilidade desta página (a LÓGICA da simulação):
 * - Controlar o estado da ligação: recebida, em andamento ou encerrada.
 * - Guardar o histórico do que foi falado durante a ligação.
 * - Contar o tempo de chamada.
 * - Tocar o áudio do suposto golpista AUTOMATICAMENTE ao atender.
 * - Liberar as opções de resposta SÓ quando o áudio da etapa terminar.
 * - Abrir o assistente educativo depois de cada decisão.
 * - Encerrar a fase e mandar o usuário para a tela de conclusão.
 *
 * Divisão de trabalho do código (importante para quem for alterar):
 * - Conteúdo/diálogos ....... src/data/bancoFalso.js (só textos e audioUrl)
 * - Aparência da ligação .... src/components/SimulacaoLigacao.jsx
 * - Som da ligação .......... src/hooks/useAudioLigacao.js
 * - Opções de resposta ...... src/components/Decisoes.jsx (painel fora do celular)
 * - Orientações do áudio .... src/components/Assistente.jsx
 * - Progresso ............... src/components/Progresso.jsx
 *
 * COMO FUNCIONA A REPRODUÇÃO AUTOMÁTICA (requisito prioritário):
 * O navegador só deixa um som começar sozinho quando ele é iniciado DENTRO do
 * clique do usuário. Por isso, a função "tocarEtapa" (que chama o áudio) é
 * executada na mesma hora em que o botão "Atender" é tocado. Se não existir o
 * arquivo MP3, a própria voz do navegador lê o texto — a simulação nunca trava.
 */

import { useEffect, useRef, useState } from 'react';

import Assistente from '../components/Assistente.jsx';
import Button from '../components/Button.jsx';
import Decisoes from '../components/Decisoes.jsx';
import Icone from '../components/Icone.jsx';
import Progresso from '../components/Progresso.jsx';
import SimulacaoLigacao from '../components/SimulacaoLigacao.jsx';
import {
  BANCO,
  ETAPAS,
  ORIENTACAO_ENCERRAR,
  ORIENTACAO_INICIAL,
  ORIENTACAO_RECUSAR,
} from '../data/bancoFalso.js';
import useAudioLigacao from '../hooks/useAudioLigacao.js';

import '../styles/simulacao.css';

export default function FakeBank() {
  // status: 'chamando' (tocando) | 'emChamada' | 'encerrada'
  const [status, setStatus] = useState('chamando');
  const [segundos, setSegundos] = useState(0);
  const [indice, setIndice] = useState(-1);
  const [historico, setHistorico] = useState([]);
  const [concluidas, setConcluidas] = useState(0);
  const [faseConcluida, setFaseConcluida] = useState(false);
  const [assistente, setAssistente] = useState(ORIENTACAO_INICIAL);

  // audioTocando ....... controla o indicador visual "está tocando" na tela.
  // opcoesLiberadas .... falso enquanto o áudio da etapa não terminar.
  // erroAudio .......... verdadeiro quando nenhum áudio pôde ser reproduzido.
  const [audioTocando, setAudioTocando] = useState(false);
  const [opcoesLiberadas, setOpcoesLiberadas] = useState(false);
  const [erroAudio, setErroAudio] = useState(false);

  const contador = useRef(0);

  // Hook responsável pelo som: tocar, parar, silenciar e viva-voz.
  const {
    tocar,
    parar,
    mudo,
    alternarMudo,
    vivaVoz,
    alternarVivaVoz,
    podeVivaVoz,
  } = useAudioLigacao();

  /**
   * Cronômetro da ligação.
   * O relógio só roda enquanto a chamada está em andamento e é desligado
   * automaticamente ao sair da tela (função de limpeza do useEffect).
   */
  useEffect(() => {
    if (status !== 'emChamada') return undefined;

    const intervalo = setInterval(() => {
      setSegundos((valor) => valor + 1);
    }, 1000);

    return () => clearInterval(intervalo);
  }, [status]);

  /** Cria uma fala nova com identificador único. */
  function criarFala(de, texto) {
    contador.current += 1;
    return { id: `fala-${contador.current}`, de, texto };
  }

  /**
   * Toca o áudio de uma etapa e controla a liberação das opções.
   * - Chame esta função SEMPRE dentro de um clique (Atender/Continuar) para
   *   respeitar a política de reprodução automática dos navegadores.
   * - "aoFim" libera as opções de resposta daquela etapa.
   * - "aoErro" mostra a mensagem de "tentar novamente" sem travar a simulação.
   */
  function tocarEtapa(etapa) {
    if (!etapa) return;

    // Junta as falas da etapa em um único texto (usado pela voz do navegador
    // quando não existe o arquivo MP3).
    const texto = etapa.falas.join(' ');

    setErroAudio(false);
    setOpcoesLiberadas(false);
    setAudioTocando(true);

    tocar({
      audioUrl: etapa.audioUrl,
      texto,
      aoFim: () => {
        setAudioTocando(false);
        setOpcoesLiberadas(true); // áudio terminou: libera as opções da etapa
      },
      aoErro: () => {
        setAudioTocando(false);
        setErroAudio(true);
      },
    });
  }

  /**
   * Botão "Atender ligação".
   * Tudo acontece no mesmo clique: muda a tela para chamada em andamento,
   * mostra a primeira fala e INICIA O ÁUDIO do suposto golpista.
   */
  function atender() {
    const primeira = ETAPAS[0];
    if (!primeira) return;

    setStatus('emChamada');
    setIndice(0);
    setHistorico(primeira.falas.map((texto) => criarFala('atendente', texto)));
    setSegundos(0);

    tocarEtapa(primeira); // autoplay: iniciado dentro do clique do usuário
  }

  /**
   * Botão "Recusar".
   * Não atende a ligação e mostra a orientação educativa correspondente.
   */
  function recusar() {
    parar();
    setAudioTocando(false);
    setOpcoesLiberadas(false);
    setStatus('encerrada');
    setAssistente({ ...ORIENTACAO_RECUSAR });
  }

  /** Mostra as falas da próxima etapa e toca o áudio dela. */
  function avancarEtapa() {
    const proximoIndice = indice + 1;
    const proxima = ETAPAS[proximoIndice];
    if (!proxima) return;

    setIndice(proximoIndice);
    const novas = proxima.falas.map((texto) => criarFala('atendente', texto));
    setHistorico((atual) => [...atual, ...novas]);

    tocarEtapa(proxima); // toca o áudio da nova etapa (ainda dentro do clique)
  }

  /** Chamado quando o usuário toca em uma opção de decisão. */
  function escolher(opcao) {
    parar(); // garante que nenhum áudio continue tocando
    setAudioTocando(false);
    setOpcoesLiberadas(false);

    const novas = [criarFala('usuario', opcao.mensagemEnviada)];
    if (opcao.reacao) {
      novas.push(criarFala('atendente', opcao.reacao));
    }
    setHistorico((atual) => [...atual, ...novas]);

    setConcluidas((total) => total + 1);

    const temProxima = indice + 1 < ETAPAS.length;
    setAssistente({
      ...opcao.orientacao,
      tipo: opcao.tipo,
      avancar: temProxima,
      final: !temProxima,
    });
  }

  /** Botão "Encerrar ligação": encerra quando o usuário quiser. */
  function encerrar() {
    parar(); // interrompe o áudio imediatamente
    setAudioTocando(false);
    setOpcoesLiberadas(false);
    setStatus('encerrada');
    setAssistente({ ...ORIENTACAO_ENCERRAR });
  }

  /** Botão "Tentar novamente": toca de novo o áudio da etapa atual. */
  function tentarNovamente() {
    const etapa = indice >= 0 ? ETAPAS[indice] : ETAPAS[0];
    tocarEtapa(etapa);
  }

  /** Botão "Continuar" do assistente educativo. */
  function continuar() {
    const orientacaoAtual = assistente;
    setAssistente(null);
    if (!orientacaoAtual) return;

    if (orientacaoAtual.final) {
      // A ligação termina aqui (fim natural da fase ou desligamento do usuário).
      parar();
      setAudioTocando(false);
      setStatus('encerrada');
      setFaseConcluida(true);
      return;
    }
    if (orientacaoAtual.avancar) {
      avancarEtapa();
    }
  }

  const etapaAtual = indice >= 0 ? ETAPAS[indice] : null;

  // As opções só aparecem quando a fase não terminou, o assistente está
  // fechado, a chamada está em andamento e o áudio da etapa já terminou.
  const mostrarDecisoes =
    !faseConcluida && !assistente && status === 'emChamada' && opcoesLiberadas && Boolean(etapaAtual);

  return (
    <main className="pagina-simulacao">
      <div className="pagina-simulacao__conteudo">
        <Progresso
          faseAtual={2}
          tituloFase="Fase 2 — Ligação de um banco falso"
          concluidas={concluidas}
          total={ETAPAS.length}
        />

        {/* Celular (chamada) + painel auxiliar (opções e orientações). */}
        <div className="simulacao-layout">
          <div className="simulacao-layout__aparelho">
            <SimulacaoLigacao
              banco={BANCO}
              status={status}
              segundos={segundos}
              historico={historico}
              audioTocando={audioTocando}
              mudo={mudo}
              vivaVoz={vivaVoz}
              podeVivaVoz={podeVivaVoz}
              onAtender={atender}
              onRecusar={recusar}
              onEncerrar={encerrar}
              onAlternarMudo={alternarMudo}
              onAlternarVivaVoz={alternarVivaVoz}
            />
          </div>

          <div className="simulacao-layout__painel">
            {/* Assistente educativo com orientação em texto e em áudio. */}
            {assistente && (
              <Assistente
                orientacao={assistente}
                onContinuar={continuar}
                rotuloContinuar={assistente.final ? 'Ver o resultado da atividade' : 'Continuar'}
              />
            )}

            {/* Áudio indisponível: mensagem simples e opção de tentar de novo. */}
            {!assistente && !faseConcluida && erroAudio && (
              <div className="aviso-audio" role="alert">
                <p className="aviso-audio__texto">
                  Não foi possível reproduzir o áudio da ligação neste navegador.
                </p>
                <Button variant="secundario" onClick={tentarNovamente}>
                  <Icone nome="repetir" />
                  Tentar novamente
                </Button>
              </div>
            )}

            {/* Antes de atender: instrução simples para o usuário. */}
            {!assistente && !faseConcluida && !erroAudio && status === 'chamando' && (
              <p className="painel-nota">
                Uma ligação está tocando. Use os botões no celular para <strong>Atender</strong> ou{' '}
                <strong>Recusar</strong>.
              </p>
            )}

            {/* Durante a fala do golpista: nenhuma opção é mostrada ainda. */}
            {!assistente && !faseConcluida && !erroAudio && mostrarDecisoes === false &&
              status === 'emChamada' && (
                <p className="painel-nota">
                  {audioTocando
                    ? 'Ouça o atendente com atenção. As opções de resposta aparecem quando ele terminar de falar.'
                    : 'Aguarde um instante...'}
                </p>
              )}

            {/* Opções de resposta ficam FORA da tela do celular. */}
            {mostrarDecisoes && (
              <Decisoes
                pergunta={etapaAtual.pergunta}
                opcoes={etapaAtual.opcoes}
                onEscolher={escolher}
                idPergunta="ligacao-pergunta"
              />
            )}

            {/* Mensagem de incentivo no fim da Fase 2. */}
            {faseConcluida && (
              <section className="incentivo" aria-label="Fase 2 concluída">
                <p className="incentivo__selo">
                  <Icone nome="estrela" tamanho={20} />
                  Fase 2 concluída
                </p>
                <h2 className="incentivo__titulo">Parabéns! Você terminou a segunda situação.</h2>
                <p className="incentivo__texto">
                  Você passou por {concluidas} de {ETAPAS.length} situações desta ligação. Agora
                  você já sabe reconhecer os pedidos de dados, de senha e de transferência que os
                  golpistas fazem por telefone.
                </p>
                <Button to="/conclusao" bloco>
                  <Icone nome="continuar" tamanho={20} />
                  Ver o resultado da atividade
                </Button>
              </section>
            )}
          </div>
        </div>

        <p className="pagina-simulacao__saida">
          <Button to="/" variant="secundario">
            Sair da simulação
          </Button>
        </p>
      </div>
    </main>
  );
}
