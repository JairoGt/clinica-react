import React, { useState, useCallback } from 'react';
import axios from 'axios';
import PacienteForm from './PacienteForm';
import PacienteList from './PacienteList';
import CitaForm from './CitaForm';
import Modal from './Modal';
import Swal from 'sweetalert2';
import CitaList from './CitaList';
import useCache from './useCache';

function Dashboard() {
  const [isPacienteModalOpen, setIsPacienteModalOpen] = useState(false);
  const [isCitaModalOpen, setIsCitaModalOpen] = useState(false);
  const API_URL = 'http://localhost:8080'; 

  const fetchPacientes = useCallback(() => axios.get(`${API_URL}/pacientes`).then(res => res.data), [API_URL]);
  const fetchCitas = useCallback(() => axios.get(`${API_URL}/citas`).then(res => res.data), [API_URL]);

  const { data: pacientes, loading: loadingPacientes, error: errorPacientes, refetch: refetchPacientes } = useCache('pacientes', fetchPacientes);
  const { data: citas, loading: loadingCitas, error: errorCitas, refetch: refetchCitas } = useCache('citas', fetchCitas);


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

  const addPaciente = async (pacienteData) => {
    try {
      const newId = pacientes.length > 0 
        ? (Math.max(...pacientes.map(p => parseInt(p.id))) + 1).toString()
        : "1";
      const newPaciente = { ...pacienteData, id: newId };
      await axios.post(`${API_URL}/pacientes`, newPaciente);
      refetchPacientes();
      showAlert('Paciente agregado exitosamente', 'success');
    } catch (error) {
      console.error('Error al agregar paciente:', error);
      showAlert('Error al agregar paciente', 'error');
    }
  };

  const updatePaciente = async (id, updatedPaciente) => {
    try {
      // Asegurarse de que el ID se mantenga como string
      const pacienteToUpdate = {
        ...updatedPaciente,
        id: id.toString()
      };
      await axios.put(`${API_URL}/pacientes/${id}`, pacienteToUpdate);
      await refetchPacientes();
      showAlert('Paciente modificado exitosamente', 'success');
    } catch (error) {
      console.error('Error al actualizar paciente:', error);
      showAlert('Error al modificar paciente. Verifica la conexión con el servidor.', 'error');
    }
  };
  


  const deletePaciente = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/pacientes/${id}`);
        refetchPacientes();
        showAlert('Paciente eliminado exitosamente', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar paciente:', error);
      showAlert('Error al eliminar paciente. Verifica la conexión con el servidor.', 'error');
    }
  };

  const addCita = async (citaData) => {
    try {
      const newId = citas.length > 0 
        ? (Math.max(...citas.map(c => parseInt(c.id))) + 1).toString()
        : "1";
      const newCita = { 
        ...citaData,
        id: newId,
        paciente: {
          ...citaData.paciente,
          id: citaData.paciente.id.toString()
        }
      };
      await axios.post(`${API_URL}/citas`, newCita);
      refetchCitas();
      showAlert('Cita agregada exitosamente', 'success');
    } catch (error) {
      console.error('Error al agregar cita:', error);
      showAlert('Error al agregar cita', 'error');
    }
  };

  const updateCita = async (id, updatedCita) => {
    try {
      const citaToUpdate = {
        ...updatedCita,
        id: id.toString(),
        paciente: {
          ...updatedCita.paciente,
          id: updatedCita.paciente.id.toString()
        }
      };
      await axios.put(`${API_URL}/citas/${id}`, citaToUpdate);
      refetchCitas();
      showAlert('Cita modificada exitosamente', 'success');
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      showAlert('Error al modificar cita. Verifica la conexión con el servidor.', 'error');
    }
  };

  const cancelCita = async (id) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro de cancelar esta cita?',
        text: "No podrás revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, mantener'
      });

      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/citas/${id}`);
        refetchCitas();
        showAlert('Cita cancelada exitosamente', 'success');
      }
    } catch (error) {
      console.error('Error al cancelar cita:', error);
      showAlert('Error al cancelar cita. Verifica la conexión con el servidor.', 'error');
    }
  };

  if (loadingPacientes || loadingCitas) return <div>Loading...</div>;
  if (errorPacientes || errorCitas) return <div>Error: {errorPacientes || errorCitas}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard de la Clínica</h1>
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setIsPacienteModalOpen(true)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Paciente
        </button>
        <button
          onClick={() => setIsCitaModalOpen(true)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Cita
        </button>
      </div>

      <PacienteList
        pacientes={pacientes}
        onUpdate={updatePaciente}
        onDelete={deletePaciente}
      />
<CitaList
  citas={citas}
  onUpdate={updateCita}
  onDelete={cancelCita}
  pacientes={pacientes} // Añade esta prop
/>

      <Modal 
        isOpen={isPacienteModalOpen} 
        onClose={() => setIsPacienteModalOpen(false)}
        title="Agregar Paciente"
      >
        <PacienteForm onSubmit={(paciente) => {
          addPaciente(paciente);
          setIsPacienteModalOpen(false);
        }} />
      </Modal>

      <Modal 
        isOpen={isCitaModalOpen} 
        onClose={() => setIsCitaModalOpen(false)}
        title="Agregar Cita"
      >
        <CitaForm 
          onSubmit={(cita) => {
            addCita(cita);
            setIsCitaModalOpen(false);
          }} 
          pacientes={pacientes} 
          refetchPacientes={refetchPacientes}
        />
      </Modal>
    </div>
  );
}

export default Dashboard;