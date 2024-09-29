import React, { useState } from 'react';

function PacienteForm({ onSubmit, paciente, medicos }) {
  const [nombre, setNombre] = useState(paciente ? paciente.nombre : '');
  const [edad, setEdad] = useState(paciente ? paciente.edad : '');
  const [medicoAsignado, setMedicoAsignado] = useState(paciente ? paciente.medicoAsignado : '');
  const [diagnostico, setDiagnostico] = useState(paciente ? paciente.diagnostico : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nombre, edad: parseInt(edad, 10), medicoAsignado, diagnostico });
    setNombre('');
    setEdad('');
    setMedicoAsignado('');
    setDiagnostico('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="nombre">
          Nombre
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
          id="nombre"
          type="text"
          placeholder="Nombre del paciente"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="edad">
          Edad
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
          id="edad"
          type="number"
          placeholder="Edad del paciente"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="medicoAsignado">
          Médico Asignado
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
          id="medicoAsignado"
          value={medicoAsignado}
          onChange={(e) => setMedicoAsignado(e.target.value)}
          required
        >
          <option value="">Seleccione un médico</option>
          {medicos.map((medico) => (
            <option key={medico.id} value={medico.nombre}>
              {medico.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2" htmlFor="diagnostico">
          Diagnóstico
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-opacity-50"
          id="diagnostico"
          type="text"
          placeholder="Diagnóstico del paciente"
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          type="submit"
        >
          {paciente ? 'Actualizar' : 'Agregar'} Paciente
        </button>
      </div>
    </form>
  );
}

export default PacienteForm;