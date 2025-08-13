import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    void navigate('/404', { replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-8xl text-blue-800 font-bold">404</h1>
      <p className="text-4xl text-blue-800">Page not Found</p>
    </div>
  );
}

export default NotFound;
