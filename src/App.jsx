/**
 * App.jsx — componente raiz do aplicativo.
 *
 * Responsabilidade:
 * - Definir as rotas (endereços) do aplicativo.
 * - Indicar QUAL página deve aparecer em cada endereço.
 *
 * Como funciona a navegação:
 * - Cada <Route> liga um endereço (path) a uma página (element).
 * - O <Routes> mostra apenas uma rota por vez, de acordo com o endereço atual
 *   na barra do navegador — sem recarregar a página.
 *
 * Fluxo do aplicativo:
 * "/" (tela inicial) -> "/simulacao/parente" (Fase 1) ->
 * "/simulacao/banco" (Fase 2) -> "/conclusao" (encerramento).
 *
 * Onde fica cada parte:
 * - Tela inicial ......... src/pages/Home.jsx
 * - Fase 1 (parente) ..... src/pages/FakeRelative.jsx  (+ src/data/parenteFalso.js)
 * - Fase 2 (banco) ....... src/pages/FakeBank.jsx      (+ src/data/bancoFalso.js)
 * - Encerramento ......... src/components/TelaConclusao.jsx
 *
 * A tela inicial é independente: as simulações podem ser alteradas sem
 * precisar mexer em Home.jsx.
 */

import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home.jsx';
import FakeRelative from './pages/FakeRelative.jsx';
import FakeBank from './pages/FakeBank.jsx';
import TelaConclusao from './components/TelaConclusao.jsx';

export default function App() {
  return (
    <Routes>
      {/* Endereço "/" — Tela inicial (página de abertura do aplicativo). */}
      <Route path="/" element={<Home />} />

      {/* Endereço "/simulacao/parente" — Fase 1: mensagem de parente falso.
          Roteiro em src/data/parenteFalso.js. */}
      <Route path="/simulacao/parente" element={<FakeRelative />} />

      {/* Endereço "/simulacao/banco" — Fase 2: ligação de banco falso.
          Roteiro em src/data/bancoFalso.js. */}
      <Route path="/simulacao/banco" element={<FakeBank />} />

      {/* Endereço "/conclusao" — tela de encerramento da atividade. */}
      <Route path="/conclusao" element={<TelaConclusao />} />

      {/* Endereço desconhecido: volta automaticamente para a tela inicial. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
