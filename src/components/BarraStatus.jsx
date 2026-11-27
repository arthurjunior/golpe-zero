/**
 * BarraStatus.jsx — barra de status do topo da moldura de smartphone.
 *
 * Mostra, como um celular real: o horário (à esquerda) e os ícones de sinal,
 * Wi-Fi e bateria (à direita).
 *
 * É apenas decorativa (não informa nada essencial), por isso fica escondida
 * dos leitores de tela com aria-hidden.
 *
 * Usada tanto na simulação de mensagens quanto na de ligação.
 */

import Icone from './Icone.jsx';
import useRelogio from '../hooks/useRelogio.js';

export default function BarraStatus() {
  const hora = useRelogio();

  return (
    <div className="barra-status" aria-hidden="true">
      <span className="barra-status__hora">{hora}</span>
      <span className="barra-status__icones">
        <Icone nome="sinal" tamanho={16} />
        <Icone nome="wifi" tamanho={16} />
        <Icone nome="bateria" tamanho={20} />
      </span>
    </div>
  );
}
