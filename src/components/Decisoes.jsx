/**
 * Decisoes.jsx — painel com a pergunta e as opções de resposta.
 *
 * Fica FORA da tela do celular (no painel auxiliar), ao lado ou abaixo da
 * moldura. Assim, a conversa continua parecendo um app de verdade, e as
 * orientações educativas ficam em um espaço separado e bem visível.
 *
 * Recebe:
 * - pergunta : texto da pergunta da etapa atual (ex.: "O que você faz?").
 * - opcoes   : lista de opções { id, rotulo, ... }.
 * - onEscolher: função chamada quando o usuário toca em uma opção.
 */

import Icone from './Icone.jsx';

export default function Decisoes({ pergunta, opcoes, onEscolher, idPergunta = 'decisoes-pergunta' }) {
  // Sem opções (ou etapa concluída), não desenha nada.
  if (!opcoes || opcoes.length === 0) return null;

  return (
    <section className="decisoes" aria-labelledby={idPergunta}>
      <h2 className="decisoes__titulo">Como você responde?</h2>
      <p className="decisoes__pergunta" id={idPergunta}>
        {pergunta}
      </p>

      <ul className="opcoes">
        {opcoes.map((opcao) => (
          <li key={opcao.id}>
            <button type="button" className="opcao" onClick={() => onEscolher(opcao)}>
              <span className="opcao__icone" aria-hidden="true">
                <Icone nome="conversa" tamanho={22} />
              </span>
              <span className="opcao__texto">{opcao.rotulo}</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
