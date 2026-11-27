/**
 * Home.jsx — TELA INICIAL do aplicativo ("Golpe Zero").
 *
 * Responsabilidade:
 * - Apresentar o projeto e explicar, em poucas palavras, o que o usuário vai fazer.
 * - Convidar o usuário a começar por meio de um único botão bem grande.
 * - Manter a tela extremamente simples: sem formulários, sem login, sem menus.
 *
 * Público-alvo: pessoas idosas. Por isso usamos textos curtos, fonte grande,
 * bastante espaço entre os elementos e um só caminho de ação ("Começar simulação").
 *
 * Sobre a navegação:
 * - O botão principal aponta para "/simulacao/parente" (primeira simulação).
 * - Essa navegação é feita pelo <Button to="...">, que usa o React Router.
 * - A tela inicial NÃO depende das telas de simulação: cada equipe pode
 *   implementar a sua página sem alterar este arquivo.
 *
 * Estilos exclusivos desta tela: src/styles/home.css
 */

import Button from '../components/Button.jsx';
import '../styles/home.css';

// Ícone de escudo (segurança). Desenhado direto no código para não usar imagens externas.
function IconeEscudo() {
  return (
    <svg
      className="icone-escudo"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M12 2l8 3.5v6c0 4.6-3.4 8.9-8 10.5C7.4 20.4 4 16.1 4 11.5v-6L12 2z"
      />
      <path
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 11.8l2.4 2.4 4.6-4.7"
      />
    </svg>
  );
}

// Ícone de visto (marca de confirmação), usado no selo de "aplicativo seguro".
function IconeVisto() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12.5l4.5 4.5L19 7"
      />
    </svg>
  );
}

// As duas situações fictícias que o usuário vai encontrar.
// Se uma nova simulação for criada no futuro, basta acrescentar um item nesta lista.
const situacoes = [
  {
    numero: 1,
    titulo: 'Mensagem de um parente',
    descricao: 'Alguém finge ser da sua família e pede dinheiro pelo celular.',
  },
  {
    numero: 2,
    titulo: 'Ligação de um banco',
    descricao: 'Alguém se passa por funcionário do banco e pede seus dados.',
  },
];

export default function Home() {
  return (
    <main className="home">
      {/* Cabeçalho: nome do projeto. */}
      <header className="home__marca">
        <span className="home__marca-icone" aria-hidden="true">
          <IconeEscudo />
        </span>
        <span className="home__marca-nome">Golpe Zero</span>
      </header>

      {/* Cartão principal com a explicação e o botão de início. */}
      <section className="home__cartao" aria-labelledby="titulo-boas-vindas">
        {/* Indicação visual de que o conteúdo é educativo e sem riscos. */}
        <p className="home__selo">
          <IconeVisto />
          Aplicativo educativo e seguro
        </p>

        <h1 className="home__titulo" id="titulo-boas-vindas">
          Aprenda a identificar golpes digitais
        </h1>

        <p className="home__descricao">
          Você vai praticar situações fictícias, no seu ritmo e com calma. Nada do que acontece
          aqui é real, e você não precisa informar nenhum dado pessoal.
        </p>

        {/* Botão principal — único caminho de ação da tela.
            Ao clicar, o React Router abre a primeira simulação. */}
        <Button to="/simulacao/parente">Começar simulação</Button>

        {/* Explicação curta do que vem depois. */}
        <div className="home__situacoes">
          <p className="home__situacoes-titulo">Você vai passar por 2 situações fictícias:</p>
          <ul className="home__lista">
            {situacoes.map((situacao) => (
              <li className="home__item" key={situacao.numero}>
                <span className="home__item-numero" aria-hidden="true">
                  {situacao.numero}
                </span>
                <span className="home__item-texto">
                  <strong className="home__item-titulo">{situacao.titulo}</strong>
                  <span className="home__item-descricao">{situacao.descricao}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="home__rodape">
        Treinamento educativo. Nenhum dado real é solicitado e nenhum valor é cobrado.
      </footer>
    </main>
  );
}
