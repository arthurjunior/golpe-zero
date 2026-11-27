/**
 * SimulacaoLigacao.jsx — tela de chamada dentro de uma moldura de celular.
 *
 * Responsabilidade (somente APRESENTAÇÃO):
 * - Mostrar a chamada recebida (fundo escuro, nome do banco, número, foto/ícone
 *   e os botões Atender e Recusar).
 * - Mostrar a chamada em andamento (nome do atendente, número, cronômetro,
 *   indicador de chamada ativa e os botões Silenciar, Viva-voz e Encerrar).
 * - Mostrar as falas do atendente (legendas) conforme são ditas.
 *
 * As OPÇÕES DE RESPOSTA e as orientações do assistente ficam no painel
 * auxiliar, fora da tela do celular (ver Decisoes.jsx e Assistente.jsx).
 *
 * Quem decide a hora de tocar o áudio e de liberar as opções é a página
 * src/pages/FakeBank.jsx, junto do roteiro de src/data/bancoFalso.js.
 *
 * Propriedades:
 * - banco            : { nome, atendente, telefone, aviso }
 * - status           : 'chamando' | 'emChamada' | 'encerrada'
 * - segundos         : duração da chamada em segundos (cronômetro)
 * - historico        : [{ id, de: 'atendente' | 'usuario', texto }]
 * - audioTocando     : true enquanto o áudio do atendente toca
 * - mudo             : true quando o áudio do atendente está silenciado
 * - vivaVoz          : true quando o viva-voz está ligado
 * - podeVivaVoz      : true quando o navegador permite trocar a saída de áudio
 * - onAtender        : tocar em "Atender"
 * - onRecusar        : tocar em "Recusar"
 * - onEncerrar       : tocar em "Encerrar"
 * - onAlternarMudo   : ligar/desligar o som do atendente
 * - onAlternarVivaVoz: ligar/desligar o viva-voz
 *
 * Estilos: src/styles/ligacao.css
 */

import { useEffect, useRef } from 'react';
import BarraStatus from './BarraStatus.jsx';
import Icone from './Icone.jsx';

import '../styles/ligacao.css';

/** Transforma segundos em texto "mm:ss" (ex.: 125 -> "02:05"). */
function formatarTempo(segundos) {
  const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
  const resto = String(segundos % 60).padStart(2, '0');
  return `${minutos}:${resto}`;
}

/** Pequeno "equalizador" que mostra, visualmente, que o áudio está tocando. */
function OndaDeAudio({ ativa }) {
  return (
    <span className={`onda ${ativa ? 'onda--ativa' : ''}`} aria-hidden="true">
      <span />
      <span />
      <span />
      <span />
      <span />
    </span>
  );
}

export default function SimulacaoLigacao({
  banco,
  status,
  segundos,
  historico,
  audioTocando,
  mudo,
  vivaVoz,
  podeVivaVoz,
  onAtender,
  onRecusar,
  onEncerrar,
  onAlternarMudo,
  onAlternarVivaVoz,
}) {
  const listaRef = useRef(null);

  // Rola as legendas até a última fala sempre que algo novo é dito.
  useEffect(() => {
    const lista = listaRef.current;
    if (lista) {
      lista.scrollTop = lista.scrollHeight;
    }
  }, [historico]);

  const recebida = status === 'chamando';
  const emChamada = status === 'emChamada';
  const encerrada = status === 'encerrada';

  return (
    <section className="smartphone" aria-label="Simulação de ligação telefônica">
      <div className="smartphone__tela smartphone__tela--escura">
        <span className="smartphone__notch" aria-hidden="true" />
        <BarraStatus />

        {recebida ? (
          /* ---------- Chamada chegando (antes de atender) ---------- */
          <div className="chamada chamada--recebida">
            <p className="chamada__estado">Chamada recebida</p>

            <span className="chamada__foto" aria-hidden="true">
              <Icone nome="banco" tamanho={46} />
            </span>

            <h2 className="chamada__nome">{banco.nome}</h2>
            <p className="chamada__numero">{banco.telefone}</p>
            <p className="chamada__aviso">{banco.aviso}</p>

            <div className="chamada__botoes">
              <button
                type="button"
                className="botao-circulo botao-circulo--recusar"
                onClick={onRecusar}
              >
                <span className="botao-circulo__icone">
                  <Icone nome="desligar" tamanho={30} />
                </span>
                <span className="botao-circulo__rotulo">Recusar</span>
              </button>

              <button
                type="button"
                className="botao-circulo botao-circulo--atender"
                onClick={onAtender}
              >
                <span className="botao-circulo__icone">
                  <Icone nome="telefone" tamanho={30} />
                </span>
                <span className="botao-circulo__rotulo">Atender</span>
              </button>
            </div>
          </div>
        ) : (
          /* ---------- Chamada em andamento (ou encerrada) ---------- */
          <div className={`chamada ${encerrada ? 'chamada--encerrada' : 'chamada--ativa'}`}>
            <p className="chamada__estado">
              {encerrada ? 'Ligação encerrada' : 'Chamada em andamento'}
            </p>

            <h2 className="chamada__nome">{banco.atendente}</h2>
            <p className="chamada__numero">{banco.telefone}</p>

            {/* Cronômetro + indicador visual de áudio tocando. */}
            <p
              className="chamada__tempo"
              role="timer"
              aria-label={`Tempo de ligação: ${formatarTempo(segundos)}`}
            >
              {formatarTempo(segundos)}
            </p>

            {emChamada && (
              <p className="chamada__audio" aria-live="polite">
                <OndaDeAudio ativa={audioTocando} />
                <span>
                  {audioTocando
                    ? mudo
                      ? 'Áudio silenciado'
                      : 'Ouvindo o atendente...'
                    : 'Aguardando você responder'}
                </span>
              </p>
            )}

            {/* Legendas: as falas do atendente e do usuário, como num celular. */}
            <div
              className="chamada__legendas"
              ref={listaRef}
              role="log"
              aria-live="polite"
              aria-label="Falas da ligação"
            >
              {historico.map((fala) => (
                <p key={fala.id} className={`chamada__fala chamada__fala--${fala.de}`}>
                  <span className="sr-apenas">
                    {fala.de === 'atendente' ? `Atendente ${banco.atendente} disse: ` : 'Você disse: '}
                  </span>
                  {fala.texto}
                </p>
              ))}
            </div>

            {emChamada && (
              <div className="chamada__controles">
                <button
                  type="button"
                  className={`controle ${mudo ? 'controle--ativo' : ''}`}
                  aria-pressed={mudo}
                  onClick={onAlternarMudo}
                >
                  <span className="controle__icone">
                    <Icone nome="microfone" tamanho={24} />
                  </span>
                  <span className="controle__rotulo">{mudo ? 'Com som' : 'Silenciar'}</span>
                </button>

                <button
                  type="button"
                  className={`controle ${vivaVoz ? 'controle--ativo' : ''}`}
                  aria-pressed={vivaVoz}
                  onClick={onAlternarVivaVoz}
                  disabled={!podeVivaVoz}
                >
                  <span className="controle__icone">
                    <Icone nome="alto" tamanho={24} />
                  </span>
                  <span className="controle__rotulo">Viva-voz</span>
                </button>

                <button
                  type="button"
                  className="controle controle--encerrar"
                  onClick={onEncerrar}
                >
                  <span className="controle__icone">
                    <Icone nome="desligar" tamanho={24} />
                  </span>
                  <span className="controle__rotulo">Encerrar</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="smartphone__nota">Ligação fictícia para treinamento</p>
    </section>
  );
}
