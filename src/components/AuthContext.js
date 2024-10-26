// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('isAuthenticated');
        if (token) {
          const response = await fetch('http://localhost:8080/usuarios/check-auth', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            // Si no está autenticado, limpia el localStorage
            localStorage.removeItem('isAuthenticated');
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const response = await fetch('http://localhost:8080/usuarios/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      if (response.ok) {
        localStorage.removeItem('isAuthenticated');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);