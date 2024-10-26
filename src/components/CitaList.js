import React, { useState } from 'react';
import Modal from './Modal';
import CitaForm from './CitaForm';

function CitaList({ citas, onUpdate, onDelete, pacientes }) {
  const [editingCita, setEditingCita] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (cita) => {
    setEditingCita(cita);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedData) => {
    const updatedCita = {
      ...updatedData,
      id: editingCita.id
    };
    onUpdate(editingCita.id, updatedCita);
    setIsModalOpen(false);
    setEditingCita(null);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden mt-8">
      <h2 className="text-2xl font-bold text-white mb-4 px-6 py-4">Citas Programadas</h2>
      <table className="min-w-full divide-y divide-gray-200 divide-opacity-25">
        <thead className="bg-white bg-opacity-20">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID Cita</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Paciente</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Motivo</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white bg-opacity-10 divide-y divide-gray-200 divide-opacity-25">
          {citas.map(cita => (
            <tr key={cita.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-white">{cita.id || 'N/A'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-white">
                  {cita.paciente && (cita.paciente.nombre || cita.paciente.apellido) 
                    ? `${cita.paciente.nombre || ''} ${cita.paciente.apellido || ''}`.trim()
                    : 'Paciente no especificado'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">
                  {cita.fechaCita ? new Date(cita.fechaCita).toLocaleString() : 'Fecha no especificada'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{cita.motivo || 'Motivo no especificado'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  onClick={() => handleEdit(cita)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 transition duration-300"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(cita.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                >
                  Cancelar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingCita(null);
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Editar Cita</h2>
          {editingCita && (
            <CitaForm
              onSubmit={handleUpdate}
              pacientes={pacientes}
              initialCita={editingCita}
              isEditing={true}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default CitaList;