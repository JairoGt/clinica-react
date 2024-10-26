import React, { useState, useCallback } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Configuración global de axios para manejar errores de CORS
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  
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

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro que quieres cerrar sesion?',
        text: "Alerta",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cerrar',
        cancelButtonText: 'No, mantener'
      });

      if (result.isConfirmed) {
        await axios.post(`${API_URL}/usuarios/logout`, {}, {
          credentials: 'include'
        });
        
        logout();
        showAlert('Sesión cerrada exitosamente', 'success');
        navigate('/');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      showAlert('Error al cerrar sesión', 'error');
    }

  };

    //agregar paciente
  const addPaciente = async (pacienteData) => {
    try {

    
      const newPaciente = {
        nombre: pacienteData.nombre,
        apellido: pacienteData.apellido,
        genero: pacienteData.genero,
        fecha_nacimiento: pacienteData.fecha_nacimiento,
        direccion: pacienteData.direccion,
        telefono: pacienteData.telefono,
        correo: pacienteData.correo,
        historialMedico: pacienteData.historialMedico
      };
  
      const response = await axios.post(`${API_URL}/pacientes`, newPaciente);
      

      await refetchPacientes();
      showAlert('Paciente agregado exitosamente', 'success');
      return response.data;
    } catch (error) {
      showAlert(
        error.response?.data?.message || error.message || 'Error al agregar paciente', 
        'error'
      );
      throw error;
    }
  };

  //actualizar paciente
  const updatePaciente = async (id, updatedPaciente) => {
    try {
      const pacienteToUpdate = {
        id: id,
        nombre: updatedPaciente.nombre,
        apellido: updatedPaciente.apellido,
        genero: updatedPaciente.genero,
        Fecha_Nacimiento: updatedPaciente.fecha_nacimiento,
        direccion: updatedPaciente.direccion,
        telefono: updatedPaciente.telefono,
        correo: updatedPaciente.correo,
        historialMedico: updatedPaciente.historialMedico
      };
      
      await axios.put(`${API_URL}/pacientes/${id}`, pacienteToUpdate);
      await refetchPacientes();
      showAlert('Paciente modificado exitosamente', 'success');
    } catch (error) {
  
      showAlert(error.response?.data || 'Error al modificar paciente', 'error');
      throw error;
    }
  };

  //agregar cita
  const addCita = async (citaData) => {
    try {
      
      const newCita = {
        paciente: {
          id: citaData.paciente.id
        },
        fechaCita: citaData.fechaCita,
        motivo: citaData.motivo
      };
      
      const response = await axios.post(`${API_URL}/citas`, newCita);
      await refetchCitas();
      showAlert('Cita agregada exitosamente', 'success');
      return response.data;
    } catch (error) {
      console.error('Error al agregar cita:', error);
      showAlert(error.response?.data || 'Error al agregar cita', 'error');
      throw error;
    }
  };

  //actualizar cita
  const updateCita = async (id, updatedCita) => {
    try {
      const citaToUpdate = {
        id: id,
        paciente: {
          id: updatedCita.paciente.id
        },
        fechaCita: updatedCita.fechaCita,
        motivo: updatedCita.motivo
      };
      
      await axios.put(`${API_URL}/citas/${id}`, citaToUpdate);
      await refetchCitas();
      showAlert('Cita modificada exitosamente', 'success');
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      showAlert(error.response?.data || 'Error al modificar cita', 'error');
      throw error;
    }
  };

  //Eliminar paciente
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
      showAlert('Error al eliminar paciente. Verifica que no tenga cita o revisa el servidor.', 'error');
    }
  };

//Elminar Cita
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

  if (loadingPacientes || loadingCitas) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (errorPacientes || errorCitas) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-red-500 text-center">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="mt-2 text-xl font-semibold">Error en la aplicación</h2>
            <p className="mt-2 text-sm">{errorPacientes || errorCitas}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard Clínico</h1>
              <p className="text-gray-600">Gestión de pacientes y citas médicas</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsPacienteModalOpen(true)}
                className="dashboard-button button-add"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Nuevo Paciente
              </button>
  
              <button
                onClick={() => setIsCitaModalOpen(true)}
                className="dashboard-button button-cita"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Nueva Cita
              </button>
  
              <button
      onClick={handleLogout}
      className="dashboard-button button-logout"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
        />
      </svg>
      Cerrar Sesión
    </button>
            </div>
          </div>
        </div>
  
      {/* Contenido Principal - Solo los componentes de lista */}
      <div className="max-w-7xl mx-auto">
      <PacienteList
        pacientes={pacientes}
        onUpdate={updatePaciente}
        onDelete={deletePaciente}
      />

      <CitaList
        citas={citas}
        onUpdate={updateCita}
        onDelete={cancelCita}
        pacientes={pacientes}
      />
      </div>
    </div>
      {/* Modales */}
      <Modal 
        isOpen={isPacienteModalOpen} 
        onClose={() => setIsPacienteModalOpen(false)}
        title="Agregar Paciente"
      >
        <PacienteForm 
          onSubmit={(paciente) => {
            addPaciente(paciente);
            setIsPacienteModalOpen(false);
          }} 
        />
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