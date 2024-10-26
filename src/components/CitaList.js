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
    onUpdate(editingCita.id, updatedData);
    setIsModalOpen(false);
    setEditingCita(null);
  };

  return (
    <div className="table-container">
      <div className="section-header">
        <h2 className="text-2xl font-bold text-white">Citas Programadas</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID Cita</th>
              <th>Paciente</th>
              <th>Fecha</th>
              <th>Motivo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {citas.map(cita => (
              <tr key={cita.id}>
                <td>{cita.id || 'N/A'}</td>
                <td>
                  {cita.paciente && (cita.paciente.nombre || cita.paciente.apellido) 
                    ? `${cita.paciente.nombre || ''} ${cita.paciente.apellido || ''}`.trim()
                    : 'Paciente no especificado'}
                </td>
                <td>
                  {cita.fechaCita ? new Date(cita.fechaCita).toLocaleString() : 'Fecha no especificada'}
                </td>
                <td>{cita.motivo || 'Motivo no especificado'}</td>
                <td>
                  <button 
                    onClick={() => handleEdit(cita)}
                    className="table-button table-button-edit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Editar
                  </button>
                  <button 
                    onClick={() => onDelete(cita.id)}
                    className="table-button table-button-delete"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Cancelar
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
          setEditingCita(null);
        }}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Editar Cita</h2>
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