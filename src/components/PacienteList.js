// PacienteList.js
import React, { useState } from 'react';
import PacienteForm from './PacienteForm';
import Modal from './Modal';

function PacienteList({ pacientes, onUpdate, onDelete }) {
  const [editingPaciente, setEditingPaciente] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (paciente) => {
    setEditingPaciente(paciente);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedPaciente) => {
    onUpdate(editingPaciente.id, updatedPaciente);
    setIsModalOpen(false);
    setEditingPaciente(null);
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-4 px-6 py-4">Lista de Pacientes</h2>
      <table className="min-w-full divide-y divide-gray-200 divide-opacity-25">
        <thead className="bg-white bg-opacity-20">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Apellido</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Fecha de Nacimiento</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Correo</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white bg-opacity-10 divide-y divide-gray-200 divide-opacity-25">
          {pacientes.map(paciente => (
            <tr key={paciente.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-white">{paciente.id}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-white">{paciente.nombre}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{paciente.apellido}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{paciente.fechaNacimiento}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{paciente.correo}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  onClick={() => handleEdit(paciente)} 
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mr-2 transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(paciente.id)} 
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Eliminar
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
          setEditingPaciente(null);
        }}
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 text-white">Editar Paciente</h2>
          {editingPaciente && (
            <PacienteForm
              paciente={editingPaciente}
              onSubmit={handleUpdate}
            />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default PacienteList;