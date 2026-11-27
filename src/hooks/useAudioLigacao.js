/**
 * useAudioLigacao.js — cuida do áudio do golpista durante a ligação.
 *
 * Problema que ele resolve:
 * - O áudio precisa começar SOZINHO quando o usuário toca em "Atender".
 *   Os navegadores só permitem isso quando o som é iniciado DENTRO do próprio
 *   clique. Por isso o método "tocar" é chamado direto no manipulador do botão.
 * - Se não existir arquivo MP3 (public/audio/), o texto é lido pela voz do
 *   próprio navegador (SpeechSynthesis). Assim a simulação funciona mesmo sem
 *   os arquivos gravados.
 *
 * O que ele entrega (retorno do hook):
 * - tocar({ audioUrl, texto, aoFim, aoErro }): reproduz o áudio.
 *     - aoFim: chamado quando a fala termina (libera as opções da etapa).
 *     - aoErro: chamado quando NENHUM áudio pôde ser reproduzido.
 * - parar(): interrompe imediatamente (usado ao encerrar a ligação).
 * - mudo / alternarMudo(): liga e desliga o som do atendente.
 * - vivaVoz / alternarVivaVoz(): alterna a saída de áudio quando o navegador
 *   permite; caso contrário fica só como indicação visual.
 *
 * Regra importante: nunca deixamos dois áudios tocarem ao mesmo tempo —
 * "tocar" sempre interrompe o que estiver rodando antes de começar.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export default function useAudioLigacao() {
  const audioRef = useRef(null); // elemento <audio> do arquivo MP3 (se houver)
  const utterRef = useRef(null); // fala da voz do navegador (se usada)
  const aoFimRef = useRef(null); // função a chamar quando a fala terminar
  const aoErroRef = useRef(null); // função a chamar quando falhar
  const fallbackRef = useRef(false); // evita cair duas vezes no fallback
  const mudoRef = useRef(false); // guarda o "mudo" sem depender do estado do React

  const [mudo, setMudo] = useState(false);
  const [vivaVoz, setVivaVoz] = useState(false);

  // O navegador tem voz sintetizada? Existe troca de saída de áudio (viva-voz)?
  const suportadoVoz = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const podeVivaVoz =
    typeof window !== 'undefined' &&
    typeof HTMLMediaElement !== 'undefined' &&
    'setSinkId' in HTMLMediaElement.prototype;

  // Interrompe tudo (MP3 e voz do navegador).
  const parar = useCallback(() => {
    aoFimRef.current = null;
    aoErroRef.current = null;
    fallbackRef.current = true;

    if (audioRef.current) {
      const audio = audioRef.current;
      audio.onended = null;
      audio.onerror = null;
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (erro) {
        /* alguns navegadores reclamam ao pausar antes de carregar: pode ignorar */
      }
      audioRef.current = null;
    }

    if (suportadoVoz) window.speechSynthesis.cancel();
    utterRef.current = null;
  }, [suportadoVoz]);

  // Lê o texto com a voz do navegador (fallback quando não há MP3).
  const falarComVoz = useCallback(
    (texto) => {
      if (!suportadoVoz) {
        // Sem MP3 e sem voz: avisa a página para mostrar "tentar novamente".
        aoErroRef.current?.();
        return;
      }

      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = 'pt-BR';
      fala.rate = 0.95; // um pouco mais devagar, pensando no público idoso
      fala.volume = mudoRef.current ? 0 : 1;
      fala.onend = () => aoFimRef.current?.();
      fala.onerror = () => aoErroRef.current?.();

      utterRef.current = fala;
      window.speechSynthesis.cancel(); // garante que nada mais esteja falando
      window.speechSynthesis.speak(fala);
    },
    [suportadoVoz],
  );

  // Reproduz o áudio de uma etapa da ligação.
  const tocar = useCallback(
    ({ audioUrl, texto, aoFim, aoErro }) => {
      parar(); // nunca sobrepõe áudios
      aoFimRef.current = aoFim || null;
      aoErroRef.current = aoErro || null;
      fallbackRef.current = false;

      // Sem arquivo MP3: usa a voz do navegador.
      if (!audioUrl) {
        falarComVoz(texto);
        return;
      }

      // Com arquivo MP3: tenta tocar; se o arquivo não existir/falhar,
      // cai automaticamente para a voz do navegador.
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.muted = mudoRef.current;
      audio.onended = () => aoFimRef.current?.();
      audio.onerror = () => {
        if (fallbackRef.current) return;
        fallbackRef.current = true;
        falarComVoz(texto);
      };

      const promessa = audio.play();
      if (promessa && typeof promessa.catch === 'function') {
        promessa.catch(() => {
          if (fallbackRef.current) return;
          fallbackRef.current = true;
          falarComVoz(texto);
        });
      }
    },
    [parar, falarComVoz],
  );

  // Silenciar / reativar o som do atendente.
  const alternarMudo = useCallback(() => {
    setMudo((atual) => {
      const novo = !atual;
      mudoRef.current = novo;

      if (audioRef.current) audioRef.current.muted = novo;

      // Na voz do navegador não dá para "abaixar o volume" no meio da fala.
      // Então, ao silenciar, encerramos a fala e liberamos as opções
      // (o texto continua visível na tela, então nada se perde).
      if (novo && utterRef.current && suportadoVoz) {
        window.speechSynthesis.cancel();
        utterRef.current = null;
        aoFimRef.current?.();
      }

      return novo;
    });
  }, [suportadoVoz]);

  // Alternar viva-voz (troca de saída de áudio) quando suportado.
  const alternarVivaVoz = useCallback(() => {
    setVivaVoz((atual) => {
      const novo = !atual;
      if (audioRef.current && podeVivaVoz) {
        try {
          // '' = saída padrão do aparelho (alto-falante).
          audioRef.current.setSinkId('').catch(() => {});
        } catch (erro) {
          /* navegador bloqueou a troca de saída: segue só como indicação visual */
        }
      }
      return novo;
    });
  }, [podeVivaVoz]);

  // Ao sair da tela, interrompe qualquer áudio pendente.
  useEffect(() => () => parar(), [parar]);

  return { tocar, parar, mudo, alternarMudo, vivaVoz, alternarVivaVoz, podeVivaVoz, suportadoVoz };
}
