/**
 * SimulacaoMensagens.jsx — tela de mensagens dentro de uma moldura de celular.
 *
 * Responsabilidade (somente APRESENTAÇÃO):
 * - Desenhar a moldura do smartphone (barra de status, cabeçalho do contato,
 *   área da conversa com papel de parede e campo de digitação).
 * - Mostrar as mensagens recebidas (brancas) e enviadas (verdes), com horário
 *   e indicador de enviada/lida.
 * - Avisar a página quando o usuário escrever e enviar um texto.
 *
 * As OPÇÕES DE RESPOSTA e as orientações do assistente NÃO ficam aqui: elas
 * aparecem no painel auxiliar, fora da tela do celular (ver Decisoes.jsx e
 * Assistente.jsx). Assim a conversa continua parecendo um app de verdade.
 *
 * Quem controla a história é a página src/pages/FakeRelative.jsx, usando o
 * roteiro de src/data/parenteFalso.js.
 *
 * Propriedades:
 * - contato      : { nome, iniciais, telefone, disponibilidade }
 * - mensagens    : [{ id, de: 'sistema'|'contato'|'usuario', texto, hora, status }]
 * - onEnviarTexto: função chamada ao enviar um texto escrito pelo usuário
 *
 * Estilos: src/styles/mensagens.css
 */

import { useEffect, useRef, useState } from 'react';
import BarraStatus from './BarraStatus.jsx';
import Icone from './Icone.jsx';

import '../styles/mensagens.css';

export default function SimulacaoMensagens({ contato, mensagens, onEnviarTexto }) {
  const [texto, setTexto] = useState('');
  const listaRef = useRef(null);

  // Rola a conversa até a última mensagem sempre que uma mensagem nova chega.
  useEffect(() => {
    const lista = listaRef.current;
    if (lista) {
      lista.scrollTop = lista.scrollHeight;
    }
  }, [mensagens]);

  /** Envio do texto digitado pelo usuário. */
  function enviarTexto(evento) {
    evento.preventDefault();
    const limpo = texto.trim();
    if (!limpo) return; // ignora envio vazio

    onEnviarTexto(limpo);
    setTexto('');
  }

  return (
    <section className="smartphone" aria-label={`Conversa fictícia com ${contato.nome}`}>
      <div className="smartphone__tela">
        {/* "Notch" do aparelho (apenas decorativo). */}
        <span className="smartphone__notch" aria-hidden="true" />

        {/* Barra de status: horário, sinal, Wi-Fi e bateria. */}
        <BarraStatus />

        {/* Cabeçalho do contato, no estilo dos apps de mensagens. */}
        <header className="chat__topo">
          <span className="chat__icone-topo" aria-hidden="true">
            <Icone nome="voltar" tamanho={22} />
          </span>
          <span className="chat__avatar" aria-hidden="true">
            {contato.iniciais}
          </span>
          <span className="chat__identidade">
            <strong className="chat__nome">{contato.nome}</strong>
            <span className="chat__status">{contato.disponibilidade}</span>
          </span>
          <span className="chat__icone-topo" aria-hidden="true">
            <Icone nome="mais" tamanho={20} />
          </span>
        </header>

        {/* Área da conversa (papel de parede + balões).
            role="log" avisa o leitor de tela sobre mensagens novas. */}
        <div
          className="chat__conversa"
          ref={listaRef}
          role="log"
          aria-live="polite"
          aria-label="Mensagens da conversa"
        >
          {/* Horário e número fictício, como um aviso do próprio aplicativo. */}
          <p className="chat__aviso-central">
            Número fictício {contato.telefone}
          </p>

          {mensagens.map((mensagem) => (
            <p key={mensagem.id} className={`chat__mensagem chat__mensagem--${mensagem.de}`}>
              {/* Quem escreveu, em texto, para leitores de tela. */}
              <span className="sr-apenas">
                {mensagem.de === 'contato'
                  ? `Mensagem recebida de ${contato.nome}: `
                  : mensagem.de === 'usuario'
                    ? 'Você escreveu: '
                    : 'Aviso: '}
              </span>

              <span className="chat__texto">{mensagem.texto}</span>

              {/* Rodapé do balão: horário e (nas enviadas) enviada/lida. */}
              <span className="chat__meta">
                {mensagem.hora && <span className="chat__hora">{mensagem.hora}</span>}
                {mensagem.de === 'usuario' && (
                  <>
                    <span
                      className={`chat__recibo chat__recibo--${mensagem.status || 'enviado'}`}
                      aria-hidden="true"
                    >
                      <Icone nome={mensagem.status === 'lido' ? 'lido' : 'enviado'} tamanho={15} />
                    </span>
                    <span className="sr-apenas">
                      {mensagem.status === 'lido' ? 'Mensagem lida' : 'Mensagem enviada'}
                    </span>
                  </>
                )}
              </span>
            </p>
          ))}
        </div>

        {/* Campo de digitação e botão de enviar (ícone). */}
        <form className="chat__resposta" onSubmit={enviarTexto}>
          <label className="sr-apenas" htmlFor="chat-resposta">
            Escreva a sua resposta
          </label>
          <input
            id="chat-resposta"
            className="chat__campo"
            type="text"
            value={texto}
            onChange={(evento) => setTexto(evento.target.value)}
            placeholder="Mensagem"
            autoComplete="off"
          />
          <button type="submit" className="chat__enviar" aria-label="Enviar mensagem">
            <Icone nome="enviar" tamanho={22} />
          </button>
        </form>
      </div>

      {/* Aviso visível (fora da tela) de que a conversa é inventada. */}
      <p className="smartphone__nota">Conversa fictícia para treinamento</p>
    </section>
  );
}
