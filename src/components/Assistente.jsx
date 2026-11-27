/**
 * Assistente.jsx — assistente educativo das duas simulações.
 *
 * Responsabilidade:
 * - Mostrar a orientação educativa depois de cada decisão do usuário.
 * - Explicar por que a escolha foi segura ou arriscada.
 * - Oferecer a leitura em voz alta (Ouvir / Repetir / Parar).
 * - Liberar a continuação da atividade pelo botão "Continuar".
 *
 * Este é um componente reutilizável: as duas fases usam exatamente o mesmo
 * componente e apenas passam uma "orientacao" diferente.
 *
 * Propriedades:
 * - orientacao     : { tipo, titulo, texto, dica, audioUrl } vinda de src/data.
 * - onContinuar     : função chamada ao tocar em "Continuar".
 * - rotuloContinuar : texto do botão de continuar (pode mudar em cada fase).
 *
 * Acessibilidade:
 * - O texto fica sempre visível, mesmo com o áudio tocando.
 * - O tipo da orientação aparece como TEXTO ("Boa escolha!", "Atenção...") e
 *   como ícone: a informação nunca depende só da cor.
 * - A região do texto usa aria-live, para leitores de tela anunciarem o que mudou.
 * - Nenhum áudio começa sozinho: só depois do toque do usuário.
 *
 * Estilos: src/styles/assistente.css
 */

import { useMemo } from 'react';
import Button from './Button.jsx';
import Icone from './Icone.jsx';
import useNarracao from '../hooks/useNarracao.js';

import '../styles/assistente.css';

// Aparência e rótulo de cada tipo de orientação.
const APARENCIA = {
  seguro: { rotulo: 'Boa escolha!', icone: 'seguro' },
  risco: { rotulo: 'Atenção: esta escolha é arriscada', icone: 'risco' },
  atencao: { rotulo: 'Fique atento', icone: 'atencao' },
  dica: { rotulo: 'Assistente educativo', icone: 'atencao' },
};

export default function Assistente({ orientacao, onContinuar, rotuloContinuar = 'Continuar' }) {
  const tipo = orientacao.tipo || 'dica';
  const aparencia = APARENCIA[tipo] || APARENCIA.dica;

  // Texto que será lido em voz alta: juntamos a orientação e a dica.
  const textoFalado = useMemo(() => {
    const partes = [orientacao.titulo, orientacao.texto];
    if (orientacao.dica) partes.push(`Dica: ${orientacao.dica}`);
    return partes.filter(Boolean).join('. ');
  }, [orientacao.titulo, orientacao.texto, orientacao.dica]);

  const { falar, repetir, parar, falando, suportado } = useNarracao({
    texto: textoFalado,
    audioUrl: orientacao.audioUrl,
  });

  return (
    <aside className={`assistente assistente--${tipo}`} aria-label="Assistente educativo">
      {/* Rótulo do tipo: texto + ícone (nunca só a cor). */}
      <p className="assistente__rotulo">
        <Icone nome={aparencia.icone} tamanho={20} />
        {aparencia.rotulo}
      </p>

      <h2 className="assistente__titulo">{orientacao.titulo}</h2>

      {/* aria-live: leitores de tela anunciam o texto novo automaticamente. */}
      <p className="assistente__texto" role="status" aria-live="polite">
        {orientacao.texto}
      </p>

      {orientacao.dica && (
        <p className="assistente__dica">
          <strong>Dica:</strong> {orientacao.dica}
        </p>
      )}

      <div className="assistente__acoes">
        {suportado ? (
          <>
            {/* Um só botão alterna entre ouvir e parar. */}
            <Button
              variant="secundario"
              onClick={falando ? parar : falar}
              aria-pressed={falando}
            >
              <Icone nome={falando ? 'parar' : 'alto'} />
              {falando ? 'Parar áudio' : 'Ouvir orientação'}
            </Button>

            <Button variant="secundario" onClick={repetir}>
              <Icone nome="repetir" />
              Repetir áudio
            </Button>
          </>
        ) : (
          // Sem suporte a voz: avisamos e o texto continua funcionando normalmente.
          <p className="assistente__aviso">
            Neste navegador o áudio não está disponível. Leia a orientação acima com calma.
          </p>
        )}

        {onContinuar && (
          <Button onClick={onContinuar} bloco>
            <Icone nome="continuar" />
            {rotuloContinuar}
          </Button>
        )}
      </div>
    </aside>
  );
}
