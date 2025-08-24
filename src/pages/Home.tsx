import { useState } from 'react';
import { Modal } from '../components/Modal';
import { UncontrolledForm } from '../components/UncontrolledForm';
import { RHForm } from '../components/PHForm';
import { useSelector } from 'react-redux';
import type { RootState } from '../lib/store';

export const Home = () => {
  const [modalType, setModalType] = useState<'uncontrolled' | 'rhf' | null>(
    null
  );
  const { uncontrolledData, rhfData } = useSelector(
    (state: RootState) => state.form
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Главная страница</h1>
      <div className="flex gap-4">
        <button
          onClick={() => setModalType('uncontrolled')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Uncontrolled Form
        </button>
        <button
          onClick={() => setModalType('rhf')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          RHF Form
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {uncontrolledData && (
          <div className="border p-4 rounded shadow">
            <h3 className="font-semibold text-blue-600">
              Uncontrolled Form Data
            </h3>
            <p>
              <strong>Name:</strong> {uncontrolledData.name}
            </p>
            <p>
              <strong>Email:</strong> {uncontrolledData.email}
            </p>
          </div>
        )}
        {rhfData && (
          <div className="border p-4 rounded shadow">
            <h3 className="font-semibold text-green-600">RHF Form Data</h3>
            <p>
              <strong>Name:</strong> {rhfData.name}
            </p>
            <p>
              <strong>Email:</strong> {rhfData.email}
            </p>
          </div>
        )}
      </div>

      <Modal isOpen={modalType !== null} onClose={() => setModalType(null)}>
        {modalType === 'uncontrolled' && <UncontrolledForm />}
        {modalType === 'rhf' && <RHForm />}
      </Modal>
    </div>
  );
};
