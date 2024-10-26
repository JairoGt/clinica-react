import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';

const API_URL = 'http://localhost:8080';

function Login({ onLogin }) {
  const { login } = useAuth();
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [correo, setCorreo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const showAlert = (title, icon) => {
    Swal.fire({
      title,
      icon,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombreUsuario,
          contrasena
        }),
        credentials: 'include'
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || 'Error en el inicio de sesión');
      }

      if (data === "Login exitoso") {
        showAlert('¡Bienvenido!', 'success');
        login(); 
        navigate('/dashboard');
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (err) {
      showAlert(err.message || 'Error en el inicio de sesión', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombreUsuario,
          contrasena,
          correo,
          rol: 'USER'
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Error en el registro');
      }

      setShowRegister(false);
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Por favor inicia sesión con tus credenciales',
        confirmButtonColor: '#3B82F6'
      });
      
      // Limpiar los campos después del registro exitoso
      setNombreUsuario('');
      setContrasena('');
      setCorreo('');
      
    } catch (err) {
      showAlert(err.message || 'Error durante el registro', 'error');
    } finally {
      setIsLoading(false);
    }
  };



  const handleForgotPassword = () => {
    Swal.fire({
      title: 'Recuperar contraseña',
      text: 'Se enviará un enlace de recuperación a tu correo electrónico.',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3B82F6'
    });
  };

  return (
    <div className="login-container">
      <div className="login-form fade-in">
        <h1 className="login-title">Centro Médico</h1>
        
        <h2 className="text-xl font-medium text-gray-700 mb-6">
          {showRegister ? 'Crear Cuenta' : '¡Bienvenido de vuelta!'}
        </h2>

        <form onSubmit={showRegister ? handleRegister : handleSubmit}>
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
              placeholder="Ingresa tu usuario"
            />
          </div>

          {showRegister && (
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                placeholder="ejemplo@correo.com"
              />
            </div>
          )}

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          {!showRegister && (
            <div className="remember-container">
              <label className="flex items-center">
                <input type="checkbox" />
                <span>Recordar sesión</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="forgot-password"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          <div className="button-container">
            <button
              type="submit"
              disabled={isLoading}
              className="login-button"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Procesando...
                </span>
              ) : (
                showRegister ? 'Crear cuenta' : 'Iniciar sesión'
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowRegister(!showRegister);
                setNombreUsuario('');
                setContrasena('');
                setCorreo('');
              }}
              className="secondary-button"
            >
              {showRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Créala aquí'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;