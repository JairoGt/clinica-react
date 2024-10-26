// PacienteForm.js
import React, { useState } from 'react';

function PacienteForm({ onSubmit, paciente }) {
  const [formData, setFormData] = useState(paciente || {
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    genero: '',
    direccion: '',
    telefono: '',
    correo: '',
    historialMedico: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Campo ${name} cambiado a:`, value);
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      console.log('Nuevo estado del formulario:', newData);
      return newData;
    });
    setFormData({ ...formData, [e.target.name]: e.target.value });


  };

  const handleSubmit = (e) => {
    console.log('Datos del formulario antes de enviar:', formData);
    console.log('Fecha específicamente:', formData.fecha_nacimiento);
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-white">Nombre</label>
        <input
          type="text"
          name="nombre"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-90"
          required
        />
      </div>

      <div>
        <label htmlFor="apellido" className="block text-sm font-medium text-white">Apellido</label>
        <input
          type="text"
          name="apellido"
          id="apellido"
          value={formData.apellido}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-90"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white" htmlFor="fecha_nacimiento">
          Fecha de Nacimiento
        </label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-90"
          id="fecha_nacimiento"
          name="fecha_nacimiento"
          type="date"
          value={formData.fecha_nacimiento}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white" htmlFor="genero">
          Género
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-90"
          id="genero"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white" htmlFor="direccion">
          Dirección
        </label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-90"
          id="direccion"
          name="direccion"
          type="text"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white" htmlFor="telefono">
          Teléfono
        </label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-90"
          id="telefono"
          name="telefono"
          type="tel"
          value={formData.telefono}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white" htmlFor="correo">
          Correo Electrónico
        </label>
        <input
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-90"
          id="correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white" htmlFor="historialMedico">
          Historial Médico
        </label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white bg-opacity-90"
          id="historialMedico"
          name="historialMedico"
          value={formData.historialMedico}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>

      <div className="flex justify-end pt-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          type="submit"
        >
          {paciente ? 'Actualizar' : 'Agregar'} Paciente
        </button>
      </div>
    </form>
  );
}

export default PacienteForm;