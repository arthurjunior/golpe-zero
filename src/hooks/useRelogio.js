/**
 * useRelogio.js — devolve o horário atual no formato "HH:MM".
 *
 * Para que serve:
 * - Alimentar a barra de status da moldura de smartphone (igual a um celular
 *   de verdade, que mostra as horas no topo).
 *
 * Como funciona:
 * - Começa com o horário atual e se atualiza sozinho a cada 20 segundos,
 *   usando setInterval. O intervalo é limpo quando o componente sai da tela
 *   (evita trabalho desnecessário).
 */

import { useEffect, useState } from 'react';

// Formata a hora atual como "09:41" (padrão brasileiro, 2 dígitos cada).
function horaAtual() {
  return new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function useRelogio() {
  const [hora, setHora] = useState(horaAtual);

  useEffect(() => {
    const id = setInterval(() => setHora(horaAtual()), 20000);
    return () => clearInterval(id);
  }, []);

  return hora;
}
