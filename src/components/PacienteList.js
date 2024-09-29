import React, { useState } from 'react';
import PacienteForm from './PacienteForm';

function PacienteList({ pacientes, onUpdate, onDelete, medicos }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 divide-opacity-25">
        <thead className="bg-white bg-opacity-20">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Nombre</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Edad</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Médico Asignado</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Diagnóstico</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 divide-opacity-25">
          {pacientes.map(paciente => (
            <tr key={paciente.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-white">{paciente.nombre}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{paciente.edad}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{paciente.medicoAsignado}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-white">{paciente.diagnostico}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button 
                  onClick={() => setEditingId(paciente.id)} 
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
      {editingId && (
        <div className="mt-8 p-6 bg-white bg-opacity-10 rounded-lg">
          <h3 className="text-xl font-medium leading-6 text-white mb-4">Editar Paciente</h3>
          <PacienteForm
            paciente={pacientes.find(p => p.id === editingId)}
            onSubmit={(updatedPaciente) => {
              onUpdate(editingId, updatedPaciente);
              setEditingId(null);
            }}
            medicos={medicos}
          />
        </div>
      )}
    </div>
  );
}

export default PacienteList;