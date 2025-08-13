import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { MyErrorBoundary } from './components/MyErrorBoundary.tsx';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MyErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MyErrorBoundary>
  </StrictMode>
);
