/**
 * TelaConclusao.jsx — tela de encerramento da atividade.
 *
 * Responsabilidade:
 * - Comemorar a conclusão das duas fases.
 * - Reunir, em uma lista curta, o que o usuário aprendeu.
 * - Permitir refazer a atividade do começo ou voltar para a tela inicial.
 *
 * Esta tela é usada diretamente pela rota "/conclusao" (veja src/App.jsx).
 * Como ela não guarda nenhum estado, "refazer a atividade" é simplesmente
 * navegar para a primeira simulação: a página recomeça do zero.
 *
 * Estilos: src/styles/simulacao.css (classes que começam com ".conclusao").
 */

import Button from './Button.jsx';
import Icone from './Icone.jsx';

// Resumo dos aprendizados, em linguagem simples.
const APRENDIZADOS = [
  'Desconfie de mensagem de número novo pedindo dinheiro: confirme pelo número antigo.',
  'Banco nenhum pede senha, código ou dados pessoais por telefone ou mensagem.',
  'Pressa e pedido de segredo são os principais avisos de um golpe.',
  'Nunca transfira dinheiro por pedido de alguém que ligou para você.',
  'Em caso de dúvida, desligue e procure o banco você mesmo pelo número do cartão.',
  'Conversar com alguém de confiança antes de decidir protege você.',
];

export default function TelaConclusao() {
  return (
    <main className="conclusao">
      <section className="conclusao__cartao">
        <p className="conclusao__selo">
          <Icone nome="estrela" tamanho={20} />
          Atividade concluída
        </p>

        <h1 className="conclusao__titulo">Muito bem! Você concluiu as duas situações.</h1>

        <p className="conclusao__texto">
          Você praticou uma mensagem de parente falso e uma ligação de banco falso. Todas as
          decisões que você tomou fazem parte do treinamento — e agora você conhece as atitudes
          que protegem o seu dinheiro.
        </p>

        <h2 className="conclusao__subtitulo">O que você aprendeu</h2>

        <ul className="conclusao__lista">
          {APRENDIZADOS.map((aprendizado) => (
            <li className="conclusao__item" key={aprendizado}>
              <span className="conclusao__item-icone" aria-hidden="true">
                <Icone nome="seguro" tamanho={18} />
              </span>
              <span>{aprendizado}</span>
            </li>
          ))}
        </ul>

        <div className="conclusao__acoes">
          <Button to="/simulacao/parente" bloco>
            <Icone nome="repetir" tamanho={20} />
            Refazer a atividade
          </Button>
          <Button to="/" variant="secundario" bloco>
            Voltar para o início
          </Button>
        </div>

        <p className="conclusao__rodape">
          Se um dia receber uma ligação ou mensagem parecida de verdade: não envie dinheiro,
          desligue e converse com alguém de confiança.
        </p>
      </section>
    </main>
  );
}
