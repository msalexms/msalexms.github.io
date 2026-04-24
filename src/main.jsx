/**
 * main.jsx
 *
 * Punto de entrada de la aplicación.
 * Renderiza el componente App en el DOM.
 * Inicializa el tema oscuro antes del primer render.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Tema oscuro siempre activo
 document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);