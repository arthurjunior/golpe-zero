/**
 * Progresso.jsx — indicador de progresso (gamificação).
 *
 * Responsabilidade:
 * - Mostrar em que fase da atividade o usuário está.
 * - Mostrar quantas situações já foram concluídas naquela fase.
 * - Mostrar uma barra de progresso visual.
 *
 * O componente não guarda estado nem sabe qual é a simulação: ele apenas
 * recebe os números por propriedades e desenha. Isso permite reutilizá-lo nas
 * duas fases (e em qualquer fase nova).
 *
 * Acessibilidade: a barra usa role="progressbar" com os valores em texto, e
 * também existe a contagem escrita. A informação não depende só da cor.
 *
 * Estilos: src/styles/simulacao.css (classes que começam com ".progresso").
 */

export default function Progresso({ faseAtual, totalFases = 2, tituloFase, concluidas, total }) {
  const percentual = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return (
    <section className="progresso" aria-label="Progresso da atividade">
      <div className="progresso__linha">
        <p className="progresso__fase">
          Fase {faseAtual} de {totalFases}
        </p>
        <p className="progresso__contagem">
          {concluidas} de {total} situações concluídas
        </p>
      </div>

      <h2 className="progresso__titulo">{tituloFase}</h2>

      <div
        className="progresso__barra"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={concluidas}
        aria-valuetext={`${concluidas} de ${total} situações concluídas`}
      >
        <span className="progresso__preenchimento" style={{ width: `${percentual}%` }} />
      </div>
    </section>
  );
}
