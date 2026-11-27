/**
 * main.jsx — ponto de entrada do aplicativo.
 *
 * Responsabilidade:
 * - Carregar o CSS global (vale para todas as telas).
 * - Ligar o React ao HTML (dentro da <div id="root"> do arquivo index.html).
 * - Envolver o aplicativo com o <BrowserRouter>, que é quem habilita a
 *   navegação entre telas pelo React Router.
 *
 * Observação: normalmente este arquivo NÃO precisa ser alterado pela equipe.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter: permite usar endereços como /simulacao/parente no navegador. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
