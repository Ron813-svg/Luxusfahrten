import { useCallback, useState, useEffect } from "react";

const useLoginUser = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Función para verificar si el usuario está logueado y obtener su información
  const checkAuthStatus = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:4000/api/login/isLoggedIn", {
        credentials: "include",
      });
      
      if (res.ok) {
        const data = await res.json();
        
        // Adaptarse a tu estructura de respuesta
        if (data.loggedIn || data.isLoggedIn) {
          setUserInfo(data.user);
          setIsLoggedIn(true);
          
          // Guardar información del usuario en localStorage para acceso rápido
          localStorage.setItem('userId', data.user._id);
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          localStorage.setItem('userType', data.userType);
        } else {
          setUserInfo(null);
          setIsLoggedIn(false);
          localStorage.removeItem('userId');
          localStorage.removeItem('userInfo');
          localStorage.removeItem('userType');
        }
      } else {
        setUserInfo(null);
        setIsLoggedIn(false);
        localStorage.removeItem('userId');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userType');
      }
    } catch (error) {
      console.error('Error verificando estado de autenticación:', error);
      setUserInfo(null);
      setIsLoggedIn(false);
      localStorage.removeItem('userId');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userType');
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para hacer login
  const login = useCallback(async (loginData) => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setUserInfo(data.user);
        setIsLoggedIn(true);
        
        // Guardar información del usuario en localStorage
        localStorage.setItem('userId', data.user._id);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        localStorage.setItem('userType', data.userType);
        
        return { success: true, user: data.user, userType: data.userType };
      } else {
        return { success: false, error: data.message || 'Error en el login' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: 'Error de conexión' };
    }
  }, []);

  // Función para hacer logout
  const logout = useCallback(async () => {
    try {
      await fetch("http://localhost:4000/api/login/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUserInfo(null);
      setIsLoggedIn(false);
      localStorage.removeItem('userId');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('userType');
    }
  }, []);

  // Verificar estado al cargar el hook
  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  // Función de compatibilidad con tu uso actual (para que no rompas el código existente)
  const loginCompatibility = useCallback(async (loginData) => {
    const result = await login(loginData);
    return result.success; // Devuelve solo true/false como tu código actual espera
  }, [login]);

  return {
    // Nuevas funciones mejoradas
    login,
    logout,
    checkAuthStatus,
    userInfo,
    isLoggedIn,
    loading,
    userId: userInfo?._id,
    userType: userInfo?.role,
    
    // Para compatibilidad con tu código existente
    ...loginCompatibility
  };
};

// Exportar tanto la función principal como la versión de compatibilidad
export default useLoginUser;

// También exportar la función de compatibilidad directamente
export const useLoginUserCompatible = () => {
  const loginUser = useLoginUser();
  return loginUser;
};