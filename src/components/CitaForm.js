import React, { useState, useEffect } from 'react';

function CitaForm({ onSubmit, pacientes, initialCita, isEditing = false }) {
  const [formData, setFormData] = useState({
    paciente: { id: '' },
    fechaCita: '',
    motivo: ''
  });
  
  const [localPacientes, setLocalPacientes] = useState(pacientes);

  useEffect(() => {
    setLocalPacientes(pacientes);
  }, [pacientes]);

  useEffect(() => {
    if (initialCita && isEditing) {
      setFormData({
        paciente: initialCita.paciente,
        fechaCita: initialCita.fechaCita,
        motivo: initialCita.motivo
      });
    }
  }, [initialCita, isEditing]);

  const handleChange = (e) => {
    if (e.target.name === 'pacienteId' && !isEditing) {
      const pacienteId = e.target.value;
      
      if (!pacienteId) {
        setFormData({
          ...formData,
          paciente: { id: '' }
        });
        return;
      }

      const pacienteSeleccionado = localPacientes.find(p => p.id === pacienteId);

      if (pacienteSeleccionado) {
        setFormData({ 
          ...formData, 
          paciente: { 
            id: pacienteSeleccionado.id,
            nombre: pacienteSeleccionado.nombre,
            apellido: pacienteSeleccionado.apellido
          } 
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      paciente: {
        ...formData.paciente,
        id: formData.paciente.id.toString()
      }
    };
    onSubmit(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="pacienteId">
          Paciente
        </label>
        {isEditing ? (
          <div className="text-white text-sm p-2 bg-gray-700 rounded">
            {formData.paciente.nombre} {formData.paciente.apellido}
          </div>
        ) : (
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
            id="pacienteId"
            name="pacienteId"
            value={formData.paciente.id}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un paciente</option>
            {localPacientes && localPacientes.map(paciente => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nombre} {paciente.apellido}
              </option>
            ))}
          </select>
        )}
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

      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isEditing ? 'Actualizar Cita' : 'Agendar Cita'}
      </button>
    </form>
  );
}

export default CitaForm;