import React, { useState, useEffect } from 'react';

function CitaForm({ onSubmit, pacientes }) {
  const [formData, setFormData] = useState({
    paciente: { id: '' },
    fechaCita: '',
    motivo: ''
  });

  const [localPacientes, setLocalPacientes] = useState(pacientes);

  useEffect(() => {
    setLocalPacientes(pacientes);
  }, [pacientes]);

  const handleChange = (e) => {
    if (e.target.name === 'pacienteId') {
      const pacienteId = parseInt(e.target.value, 10);
      console.log('ID del paciente seleccionado:', pacienteId);
      console.log('Lista de pacientes:', localPacientes);
      
      const pacienteSeleccionado = localPacientes.find(p => p.id === pacienteId);
      console.log('Paciente seleccionado:', pacienteSeleccionado);

      if (pacienteSeleccionado) {
        setFormData({ 
          ...formData, 
          paciente: { 
            id: pacienteSeleccionado.id,
            nombre: pacienteSeleccionado.nombre,
            apellido: pacienteSeleccionado.apellido
          } 
        });
      } else {
        console.error('No se encontró un paciente con el ID:', pacienteId);
        setFormData({
          ...formData,
          paciente: { id: '' }
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="pacienteId">
          Paciente
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
          id="pacienteId"
          name="pacienteId"
          value={formData.paciente.id}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un paciente</option>
          {pacientes.map(paciente => (
            <option key={paciente.id} value={paciente.id}>
              {paciente.nombre} {paciente.apellido}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="fechaCita">
          Fecha de la Cita
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
          id="fechaCita"
          type="datetime-local"
          name="fechaCita"
          value={formData.fechaCita}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="motivo">
          Motivo
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
          id="motivo"
          name="motivo"
          value={formData.motivo}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Agendar Cita
      </button>
    </form>
  );
}

export default CitaForm;