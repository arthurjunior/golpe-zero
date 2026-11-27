/**
 * Icone.jsx — ícones simples desenhados em SVG, sem imagens externas.
 *
 * Por que ter este componente?
 * - Evita repetir o mesmo desenho em várias telas.
 * - Garante o mesmo traço e o mesmo tamanho em todo o aplicativo.
 *
 * Como usar: <Icone nome="seguro" tamanho={22} />
 *
 * Observação de acessibilidade: os ícones são decorativos (aria-hidden), pois
 * sempre aparecem acompanhados de um texto explicativo. Nada no aplicativo
 * depende apenas do ícone nem apenas da cor para passar a informação.
 */

// Cada item guarda o desenho (traços) de um ícone.
const DESENHOS = {
  // Visto dentro de um círculo — usado para atitudes seguras.
  seguro: (
    <>
      <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1" />
      <path d="M22 4.5l-10 10-3-3" />
    </>
  ),

  // Triângulo de atenção — usado para explicar riscos.
  risco: (
    <>
      <path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4.5" />
      <path d="M12 17h.01" />
    </>
  ),

  // Círculo com exclamação — usado para observações.
  atencao: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 7.8v4.8" />
      <path d="M12 16.2h.01" />
    </>
  ),

  // Alto-falante — botão "Ouvir orientação".
  alto: (
    <>
      <path d="M11 4.8L6.4 8.6H2.8v6.8h3.6L11 19.2z" />
      <path d="M19 5a10 10 0 0 1 0 14" />
      <path d="M15.4 8.6a5 5 0 0 1 0 7" />
    </>
  ),

  // Símbolo de parar — botão "Parar áudio".
  parar: (
    <>
      <circle cx="12" cy="12" r="9.2" />
      <rect x="9" y="9" width="6" height="6" rx="1.2" />
    </>
  ),

  // Seta circular — botão "Repetir áudio".
  repetir: (
    <>
      <path d="M20 12a8 8 0 1 1-2.4-5.7" />
      <path d="M20 4.4V10h-5.6" />
    </>
  ),

  // Seta para a direita — botão "Continuar".
  continuar: (
    <>
      <path d="M4.5 12h14" />
      <path d="M12.5 6l6 6-6 6" />
    </>
  ),

  // Telefone — atender a ligação.
  telefone: (
    <path d="M21.5 16.6v2.8a2 2 0 0 1-2.2 2A19.2 19.2 0 0 1 2.6 4.7 2 2 0 0 1 4.6 2.5h2.8a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.4 10a15.5 15.5 0 0 0 5.6 5.6l1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
  ),

  // Telefone cortado — encerrar a ligação.
  desligar: (
    <>
      <path d="M21.5 16.6v2.8a2 2 0 0 1-2.2 2A19.2 19.2 0 0 1 2.6 4.7 2 2 0 0 1 4.6 2.5h2.8a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8.4 10a15.5 15.5 0 0 0 5.6 5.6l1-1.1a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" />
      <path d="M3.5 20.5L20.5 3.5" />
    </>
  ),

  // Prédio com colunas — usado como "logo" do banco fictício.
  banco: (
    <>
      <path d="M3 21.4h18" />
      <path d="M5.6 21.4V10.8" />
      <path d="M9.9 21.4V10.8" />
      <path d="M14.1 21.4V10.8" />
      <path d="M18.4 21.4V10.8" />
      <path d="M12 2.6l8.4 5.2H3.6z" />
    </>
  ),

  // Silhueta de pessoa — avatar genérico.
  pessoa: (
    <>
      <path d="M20 21v-1.8a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4V21" />
      <circle cx="12" cy="7.5" r="3.8" />
    </>
  ),

  // Estrela — usada nas mensagens de incentivo.
  estrela: (
    <path d="M12 2.8l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5-4.7-4.6 6.5-.9z" />
  ),

  // Balão de conversa — usado nas listas de aprendizados.
  conversa: (
    <path d="M20.5 12a8.4 8.4 0 0 1-9 8.4 9.4 9.4 0 0 1-2.5-.5L3.5 21.4l1.3-4.6A8.4 8.4 0 0 1 11.5 3.6h.5a8.4 8.4 0 0 1 8.5 8.4z" />
  ),

  // Escudo — reforça a ideia de segurança.
  escudo: (
    <>
      <path d="M12 21.5s7.5-3.8 7.5-9.6V5.4L12 2.5 4.5 5.4v6.5c0 5.8 7.5 9.6 7.5 9.6z" />
      <path d="M9.2 11.9l2.2 2.2 3.8-3.9" />
    </>
  ),

  /* ---- Ícones usados na moldura de smartphone (simulações) ------------- */

  // Seta para a esquerda — botão "voltar" do app de mensagens.
  voltar: <path d="M15 4.5L7.5 12 15 19.5" />,

  // Três pontos verticais — menu do app de mensagens (decorativo).
  mais: (
    <>
      <circle cx="12" cy="5" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="12" cy="19" r="1.6" />
    </>
  ),

  // Barras crescentes — sinal de celular na barra de status.
  sinal: (
    <>
      <path d="M5 19v-3" />
      <path d="M9.5 19v-6" />
      <path d="M14 19v-9" />
      <path d="M18.5 19v-12" />
    </>
  ),

  // Arcos — rede Wi-Fi na barra de status.
  wifi: (
    <>
      <path d="M2.5 9a15 15 0 0 1 19 0" />
      <path d="M6 12.5a10 10 0 0 1 12 0" />
      <path d="M9.5 16a5 5 0 0 1 5 0" />
      <circle cx="12" cy="19" r="1" />
    </>
  ),

  // Pilha — bateria na barra de status.
  bateria: (
    <>
      <rect x="2.5" y="7" width="17" height="10" rx="2.5" />
      <path d="M22 10.5v3" />
      <rect x="5" y="9.5" width="10" height="5" rx="1" fill="currentColor" stroke="none" />
    </>
  ),

  // Avião de papel — botão de enviar mensagem.
  enviar: (
    <>
      <path d="M4.5 12.2L19.7 4.7a.6.6 0 0 1 .8.8l-7.5 15.2a.6.6 0 0 1-1.1-.1l-1.8-6.2-6.2-1.8a.6.6 0 0 1-.1-1.1z" />
      <path d="M10.6 13.4L20.1 4.9" />
    </>
  ),

  // Um visto — mensagem enviada.
  enviado: <path d="M5 12.5l4.4 4.4L19 6.5" />,

  // Dois vistos — mensagem lida.
  lido: (
    <>
      <path d="M1.5 12.5l4 4L14 7.5" />
      <path d="M8.8 12.5l4 4L22.5 7" />
    </>
  ),

  // Microfone — botão "silenciar" da ligação.
  microfone: (
    <>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11.5a6.5 6.5 0 0 0 13 0" />
      <path d="M12 18v3.5" />
    </>
  ),
};

export default function Icone({ nome, tamanho = 22, className = '' }) {
  const desenho = DESENHOS[nome];

  // Se o nome não existir, não desenha nada (evita erro na tela).
  if (!desenho) return null;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width={tamanho}
      height={tamanho}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {desenho}
    </svg>
  );
}
