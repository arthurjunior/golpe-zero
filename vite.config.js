// vite.config.js — configuração do servidor de desenvolvimento e do build.
// Este arquivo já está pronto: normalmente a equipe NÃO precisa alterá-lo.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Plugin que permite usar JSX e o "Fast Refresh" (atualização automática ao salvar).
  plugins: [react()],

  server: {
    port: 5173, // endereço local: http://localhost:5173
    open: true, // abre o navegador automaticamente ao iniciar
  },
});
