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
    <div className="table-container">
      <div className="section-header">
        <h2 className="text-2xl font-bold text-white">Lista de Pacientes</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Fecha de Nacimiento</th>
              <th>Correo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(paciente => (
              <tr key={paciente.id}>
                <td>{paciente.id}</td>
                <td>{paciente.nombre}</td>
                <td>{paciente.apellido}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white/90">
  {paciente.fecha_nacimiento ? 
    new Date(paciente.fecha_nacimiento + 'T00:00:00').toLocaleDateString() 
    : 'No especificada'}
</td>
                <td>{paciente.correo}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(paciente)} 
                    className="table-button table-button-edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar
                  </button>
                  <button 
                    onClick={() => onDelete(paciente.id)} 
                    className="table-button table-button-delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setEditingPaciente(null);
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Editar Paciente</h2>
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