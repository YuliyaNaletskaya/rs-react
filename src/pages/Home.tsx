import { useState } from 'react';
import { Modal } from '../components/Modal';
import { UncontrolledForm } from '../components/UncontrolledForm';
import { RHForm } from '../components/PHForm';

export const Home = () => {
  const [modalType, setModalType] = useState<'uncontrolled' | 'rhf' | null>(
    null
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Главная страница</h1>
      <div className="flex gap-4">
        <button
          onClick={() => setModalType('uncontrolled')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Открыть Uncontrolled Form
        </button>
        <button
          onClick={() => setModalType('rhf')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Открыть RHF Form
        </button>
      </div>

      <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
        {modalType === 'uncontrolled' && <UncontrolledForm />}
        {modalType === 'rhf' && <RHForm />}
      </Modal>
    </div>
  );
};
