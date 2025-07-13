import { FaSpinner } from 'react-icons/fa';

export const Spinner = () => (
  <div
    style={{
      position: 'absolute',
      top: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1rem',
      color: '#555',
    }}
  >
    <FaSpinner className="spinner" style={{ fontSize: '1.4rem' }} />
    <span>Louding...</span>
  </div>
);
