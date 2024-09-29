import React, { useState, useEffect } from 'react';
import PacienteForm from './PacienteForm';
import PacienteList from './PacienteList';
import Swal from 'sweetalert2';

function Dashboard() {
  const [pacientes, setPacientes] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [medicos, setMedicos] = useState([]);



  useEffect(() => {
    fetchPacientes();
    fetchMedicos();
  }, []);

  const fetchPacientes = async () => {
    try {
      // Simulación de datos
      setPacientes([
        { id: 1, nombre: 'Juan Pérez', edad: 35, medicoAsignado: 'Dr. García', diagnostico: 'Gripe' },
        { id: 2, nombre: 'María García', edad: 28, medicoAsignado: 'Dra. López', diagnostico: 'Migraña' },
      ]);
    } catch (error) {
      console.error('Error al obtener pacientes:', error);
    }
  };

  const fetchMedicos = async () => {
    try {
      // Simulación de datos de médicos
      setMedicos([
        { id: 1, nombre: 'Dr. García' },
        { id: 2, nombre: 'Dra. López' },
        { id: 3, nombre: 'Dr. Martínez' },
        { id: 4, nombre: 'Dra. Rodríguez' },
      ]);
    } catch (error) {
      console.error('Error al obtener médicos:', error);
    }
  };

  const showAlert = (title, icon) => {
    Swal.fire({
      title: title,
      icon: icon,
      timer: 2000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    });
  };

  const addPaciente = async (paciente) => {
    try {
      setPacientes([...pacientes, { ...paciente, id: Date.now() }]);
      setIsFormVisible(false);
      showAlert('Paciente agregado exitosamente', 'success');
    } catch (error) {
      console.error('Error al agregar paciente:', error);
      showAlert('Error al agregar paciente', 'error');
    }
  };

  const updatePaciente = async (id, updatedPaciente) => {
    try {
      setPacientes(pacientes.map(p => p.id === id ? { ...updatedPaciente, id } : p));
      showAlert('Paciente modificado exitosamente', 'success');
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      showAlert('Error al modificar paciente', 'error');
    }
  };

  const deletePaciente = async (id) => {
    try {
      Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          setPacientes(pacientes.filter(p => p.id !== id));
          showAlert('Paciente eliminado exitosamente', 'success');
        }
      });
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
      showAlert('Error al eliminar paciente', 'error');
    }
  };

  return (
    <div className="container">
      <div className="dashboard-container">
        <h1 className="text-3xl font-bold mb-8 text-white">Dashboard de la Clínica</h1>
        <button
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="agregar mb-4"
        >
          {isFormVisible ? 'Cerrar Formulario' : 'Agregar Paciente'}
        </button>
        {isFormVisible && (
          <div className="mt-8">
            <PacienteForm onSubmit={addPaciente} medicos={medicos} />
          </div>
        )}
        <PacienteList
          pacientes={pacientes}
          onUpdate={updatePaciente}
          onDelete={deletePaciente}
          medicos={medicos}
        />
      </div>
    </div>
  );
}

export default Dashboard;