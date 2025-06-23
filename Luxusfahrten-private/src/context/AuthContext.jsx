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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en la autenticación");
      }

      if (data.success && data.user) {
        // Actualizar estado con la información completa del usuario
        setUser(data.user);
        setAuthCokie(true); // Usamos true porque la cookie se maneja en el servidor
        
        // Guardar en localStorage como respaldo
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("authToken", "authenticated"); // Marcador de autenticación
        
        console.log("Login exitoso:", { user: data.user, userType: data.userType });
        
        return { success: true, message: data.message, user: data.user };
      } else {
        throw new Error(data.message || "Error en la respuesta del servidor");
      }
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: error.message };
    }
  };

  // Función para verificar autenticación en el servidor
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${SERVER_URL}/login/isLoggedIn`, {
        method: "GET",
        credentials: "include", // Enviar cookies
        headers: { "Content-Type": "application/json" }
      });

      const data = await response.json();

      if (response.ok && (data.loggedIn || data.isLoggedIn) && data.user) {
        // Usuario autenticado
        setUser(data.user);
        setAuthCokie(true);
        
        // Actualizar localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userType", data.userType);
        localStorage.setItem("authToken", "authenticated");
        
        console.log("Auth verificada:", { user: data.user, userType: data.userType });
      } else {
        // No autenticado o sesión expirada
        setUser(null);
        setAuthCokie(null);
        
        // Limpiar localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("userType");
        localStorage.removeItem("authToken");
        
        console.log("No autenticado o sesión expirada");
      }
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      // En caso de error, limpiar estado
      setUser(null);
      setAuthCokie(null);
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      localStorage.removeItem("authToken");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Llamar al endpoint de logout del servidor
      await fetch(`${SERVER_URL}/login/logout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Error al hacer logout en el servidor:", error);
    } finally {
      // Limpiar datos locales siempre
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("userType");
      localStorage.removeItem("redirectAfterLogin");
      setAuthCokie(null);
      setUser(null);
      console.log("Logout completado");
    }
  };

  // Función para obtener el token desde múltiples fuentes
  const getToken = () => {
    // Primero intentar desde localStorage
    const localToken = localStorage.getItem('authToken');
    if (localToken && localToken !== "undefined") return localToken;
    
    // Luego desde cookies del navegador
    const cookieToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))?.split('=')[1];
    
    return cookieToken;
  };

  // Función para obtener headers de autenticación
  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      // Las cookies se manejan automáticamente con credentials: 'include'
    };
  };

  // Utilidad para fetch autenticado
  const authenticatedFetch = async (url, options = {}) => {
    // Detectar si se está enviando FormData
    const isFormData = options.body instanceof FormData;

    const config = {
        ...options,
        credentials: 'include', // Siempre incluir cookies
        headers: {
            // Solo agregar Content-Type si NO es FormData
            ...(!isFormData && { 'Content-Type': 'application/json' }),
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

  // Convertimos isAuthenticated en un valor computado
  const isAuthenticated = !!(user && authCokie);

  // Verificar si el usuario tiene un rol específico
  const hasRole = (role) => {
    return user?.role === role;
  };

  // Verificar si el usuario tiene alguno de los roles permitidos
  const hasAnyRole = (roles) => {
    return roles.includes(user?.role);
  };

  useEffect(() => {
    const initializeAuth = async () => {
      // Verificar localStorage primero
      const token = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");
      
      console.log("Inicializando auth:", { 
        localStorageToken: token, 
        savedUser: savedUser ? "existe" : "no existe"
      });
      
      if (token && token !== "undefined" && savedUser && savedUser !== "undefined") {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setAuthCokie(true);
          console.log("Auth restaurada desde localStorage:", { user: parsedUser });
        } catch (error) {
          console.error("Error parsing saved user:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("authToken");
          localStorage.removeItem("userType");
        }
      }
      
      // Siempre verificar con el servidor para asegurar que la sesión es válida
      await checkAuthStatus();
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
        checkAuthStatus, // Exportar para uso manual si es necesario
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);