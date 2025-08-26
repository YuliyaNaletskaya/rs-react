import { FaSpinner } from 'react-icons/fa';

export const Spinner = () => (
  <div
    style={{
      position: 'absolute',
      top: '10rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1rem',
      color: '#ffff95',
    }}
  >
    <FaSpinner className="spinner" style={{ fontSize: '1.4rem' }} />
    <span>Loading...</span>
  </div>
);
