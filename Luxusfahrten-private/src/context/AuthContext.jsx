import React, { createContext, useContext, useState, useEffect } from "react";
const SERVER_URL = "http://localhost:4000/api";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authCokie, setAuthCokie] = useState(null);
  const [usersExist, setUsersExist] = useState(null);
  const [loading, setLoading] = useState(true);

  const Login = async (email, password) => {
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // IMPORTANTE: para recibir cookies del servidor
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      
      // Guardar en localStorage como respaldo
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        setAuthCokie(data.token);
      }
      
      localStorage.setItem("user", JSON.stringify({ email }));
      setUser({ email });

      console.log("Login exitoso:", { token: data.token, user: { email } });

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: error.message };
    }
  };

  // Hook alternativo para login, si lo necesitas aparte
  const useLogin = async (email, password) => {
    try {
      const response = await fetch(`${SERVER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la autenticación");
      }

      const data = await response.json();
      setUser({ email });
      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      // Llamar al endpoint de logout del servidor
      await fetch(`${SERVER_URL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders()
      });
    } catch (error) {
      console.error("Error al hacer logout en el servidor:", error);
    } finally {
      // Limpiar datos locales siempre
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      setAuthCokie(null);
      setUser(null);
      console.log("Logout completado");
    }
  };

  // Función para obtener el token desde múltiples fuentes
  const getToken = () => {
    // Primero intentar desde el estado
    if (authCokie) return authCokie;
    
    // Luego desde localStorage
    const localToken = localStorage.getItem('authToken');
    if (localToken) return localToken;
    
    // Finalmente desde cookies del navegador
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))?.split('=')[1];
    
    return cookieToken;
  };

  // Función para obtener headers de autenticación
  const getAuthHeaders = () => {
    const token = getToken();

    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  // Utilidad para fetch autenticado
  const authenticatedFetch = async (url, options = {}) => {
    const token = getToken();

    // Detectar si se está enviando FormData
    const isFormData = options.body instanceof FormData;

    const config = {
        ...options,
        credentials: 'include',
        headers: {
            // Solo agregar Content-Type si NO es FormData
            ...(!isFormData && { 'Content-Type': 'application/json' }),
            // Siempre agregar Authorization si hay token
            ...(token && { 'Authorization': `Bearer ${token}` }),
            // Mantener headers adicionales
            ...options.headers
        }
    };

    try {
        const response = await fetch(url, config);
        
        // Si el token expiró o es inválido, hacer logout automático
        if (response.status === 401) {
            console.log("Token expirado o inválido, haciendo logout automático...");
            logout();
            throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
        }

        return response;
    } catch (error) {
        throw error;
    }
  };

  // Convertimos isAuthenticated en un valor computado, no una función
  const isAuthenticated = !!(user && authCokie);

  // Verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user?.userType === role;
  };

  // Verificar si el usuario tiene alguno de los roles permitidos
  const hasAnyRole = (roles) => {
    return roles.includes(user?.userType);
  };

  useEffect(() => {
    const initializeAuth = () => {
      // Verificar localStorage
      const token = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");
      
      // Verificar cookies del navegador
      const cookieToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('authToken='))?.split('=')[1];
      
      console.log("Inicializando auth:", { 
        localStorageToken: token, 
        cookieToken, 
        savedUser 
      });
      
      const finalToken = token || cookieToken;
      
      if (finalToken && savedUser && savedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setAuthCokie(finalToken);
          
          // Si el token viene de cookies pero no está en localStorage, guardarlo
          if (cookieToken && !token) {
            localStorage.setItem("authToken", cookieToken);
          }
          
          console.log("Auth restaurada:", { token: finalToken, user: parsedUser });
        } catch (error) {
          console.error("Error parsing saved user:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authCokie,
        Login,
        logout,
        authenticatedFetch,
        isAuthenticated,
        loading,
        setUser,
        setAuthCokie,
        getAuthHeaders,
        getToken,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);