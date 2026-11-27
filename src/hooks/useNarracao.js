/**
 * useNarracao.js — "hook" responsável por ler uma orientação em voz alta.
 *
 * O que é um hook? É uma função do React que começa com "use" e guarda
 * comportamento reutilizável. Aqui ele cuida de todo o áudio do assistente.
 *
 * O que este hook faz:
 * 1) Usa a API nativa do navegador SpeechSynthesis (voz do sistema) para ler
 *    o texto em português.
 * 2) Se existir um arquivo MP3 (propriedade "audioUrl"), toca o MP3 no lugar
 *    da voz sintetizada.
 * 3) Informa se o áudio está tocando (para trocar o rótulo dos botões).
 * 4) Interrompe o áudio quando o usuário pedir ou quando a orientação mudar.
 *
 * COMO TROCAR A VOZ POR UM MP3 GRAVADO PELA EQUIPE (futuro):
 * - Coloque o arquivo em public/audio/ (ex.: public/audio/orientacao-1.mp3).
 * - No roteiro (src/data/parenteFalso.js ou src/data/bancoFalso.js), acrescente
 *   audioUrl: '/audio/orientacao-1.mp3' dentro da orientação.
 * - Pronto: quando audioUrl existe, o MP3 é tocado em vez da voz do sistema.
 *
 * Importante: nenhum áudio começa sozinho. O usuário sempre precisa tocar em
 * um botão. Se o navegador não tiver voz, o texto continua funcionando normal.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Divide textos longos em frases curtas.
 * Motivo: alguns navegadores cortam a leitura quando o texto é muito grande.
 */
function dividirEmFrases(texto) {
  const frases = texto.match(/[^.!?]+[.!?]*/g) || [texto];
  return frases.map((frase) => frase.trim()).filter(Boolean);
}

export default function useNarracao({ texto = '', audioUrl }) {
  const [falando, setFalando] = useState(false);
  const audioRef = useRef(null);

  // O navegador oferece voz sintetizada? Se não, escondemos os botões de áudio.
  const suportado = typeof window !== 'undefined' && 'speechSynthesis' in window;
  const usarArquivo = Boolean(audioUrl);

  /** Interrompe qualquer áudio que esteja tocando. */
  const parar = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (suportado) {
      window.speechSynthesis.cancel();
    }
    setFalando(false);
  }, [suportado]);

  /** Começa a ler a orientação (ou a tocar o MP3, quando existir). */
  const falar = useCallback(() => {
    parar(); // garante que não fique voz sobreposta

    // 1) Existe MP3 gravado pela equipe? Toca o arquivo.
    if (usarArquivo) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.onended = () => setFalando(false);
      audio.onerror = () => setFalando(false);
      setFalando(true);
      audio.play().catch(() => setFalando(false));
      return;
    }

    // 2) Sem MP3: usa a voz do navegador.
    if (!suportado) return;

    const frases = dividirEmFrases(texto);
    frases.forEach((frase, indice) => {
      const fala = new SpeechSynthesisUtterance(frase);
      fala.lang = 'pt-BR'; // português do Brasil
      fala.rate = 0.95; // um pouco mais devagar, mais fácil de acompanhar
      fala.pitch = 1;

      // Só a última frase desliga o indicador de "falando".
      if (indice === frases.length - 1) {
        fala.onend = () => setFalando(false);
      }
      fala.onerror = () => setFalando(false);

      window.speechSynthesis.speak(fala);
    });

    setFalando(true);
  }, [parar, suportado, texto, usarArquivo, audioUrl]);

  /**
   * Repetir é igual a falar, mas existe com nome próprio para o botão
   * "Repetir áudio" ficar claro para quem lê o código.
   */
  const repetir = useCallback(() => {
    falar();
  }, [falar]);

  // Se a orientação mudar, o áudio antigo para de tocar.
  useEffect(() => {
    parar();
  }, [texto, parar]);

  // Ao sair da tela (ou trocar de página), interrompe o áudio.
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (suportado) {
        window.speechSynthesis.cancel();
      }
    };
  }, [suportado]);

  return {
    falar, // começar a leitura
    repetir, // ler novamente desde o início
    parar, // interromper
    falando, // true enquanto o áudio estiver tocando
    suportado, // false quando o navegador não tem voz sintetizada
  };
}
