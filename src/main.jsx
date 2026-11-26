/**
 * main.jsx
 *
 * Punto de entrada de la aplicación.
 * Renderiza el componente App en el DOM.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { installHidden } from './hidden';

// Mensajes para quien abre la consola (F12)
installHidden();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
