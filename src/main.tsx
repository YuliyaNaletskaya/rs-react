import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { MyErrorBoundary } from './components/MyErrorBoundary.tsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <MyErrorBoundary>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyErrorBoundary>
    </Provider>
  </StrictMode>
);
