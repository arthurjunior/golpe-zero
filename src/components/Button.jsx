/**
 * Button.jsx — botão reutilizável de todo o aplicativo.
 *
 * Responsabilidade:
 * - Padronizar a aparência dos botões (tamanho grande, boa área de toque,
 *   contraste adequado e foco visível para quem usa o teclado).
 * - Evitar repetir CSS e código de navegação em cada tela.
 *
 * Dois modos de uso:
 *
 * 1) Botão que executa uma ação:
 *    <Button onClick={() => alert('Oi')}>Enviar</Button>
 *
 * 2) Botão que navega para outra tela (usa o React Router):
 *    <Button to="/simulacao/parente">Começar simulação</Button>
 *
 *    Quando a propriedade "to" é informada, o componente renderiza um <Link>.
 *    Isso mantém a navegação do React Router, que troca de tela sem recarregar
 *    a página inteira.
 *
 * Outras propriedades úteis:
 * - variant: 'principal' (azul, padrão) | 'secundario' (fundo branco com borda)
 *            | 'perigo' (vermelho, usado em "Encerrar ligação").
 * - bloco  : quando true, o botão ocupa toda a largura disponível.
 * - type   : permite <Button type="submit"> dentro de um formulário.
 *
 * Os estilos deste botão estão em src/styles/global.css (classes ".btn").
 */

import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  onClick,
  variant = 'principal',
  bloco = false,
  ...rest
}) {
  // Monta a lista de classes do CSS conforme as propriedades recebidas.
  const classes = ['btn', variant !== 'principal' && `btn--${variant}`, bloco && 'btn--bloco']
    .filter(Boolean)
    .join(' ');

  // Modo 2: navegação entre telas (React Router).
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  // Modo 1: ação comum (clique).
  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
