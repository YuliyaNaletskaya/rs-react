import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import NotFound from './pages/NotFoundPage';
import { Header } from './components/Header';
import AboutPage from './pages/AboutPage';

export function App() {
  const location = useLocation();
  const isNotFoundPage = location.pathname === '/404';
  return (
    <div>
      {!isNotFoundPage && <Header />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}

export default App;
