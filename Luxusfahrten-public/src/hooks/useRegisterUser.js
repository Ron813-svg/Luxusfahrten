import { useCallback } from "react";

const useRegisterUser = () => {
  return useCallback(async (userData) => {
    try {
      console.log("🔄 Enviando datos de registro:", userData);
      
      // CORRECCIÓN: URL correcta con /user al final
      const res = await fetch("http://localhost:4000/api/registerUsers/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      });
      
      console.log("📡 Respuesta del servidor:", res.status);
      
      if (res.ok) {
        const result = await res.json();
        console.log("✅ Registro exitoso:", result);
        return { 
          success: true, 
          data: result,
          message: result.message || "Usuario registrado correctamente"
        };
      } else {
        const errorData = await res.json();
        console.error("❌ Error del servidor:", errorData);
        
        let errorMessage = "Error en el registro";
        
        // Manejar diferentes tipos de errores
        switch (res.status) {
          case 400:
            if (errorData.message === "Email already exists") {
              errorMessage = "Este correo ya está registrado";
            } else {
              errorMessage = errorData.message || "Datos inválidos";
            }
            break;
          case 500:
            errorMessage = "Error interno del servidor";
            break;
          default:
            errorMessage = errorData.message || "Error desconocido";
        }
        
        return { 
          success: false, 
          error: errorMessage,
          status: res.status
        };
      }
    } catch (error) {
      console.error("❌ Error de conexión:", error);
      
      let errorMessage = "Error de conexión con el servidor";
      
      // Verificar si es un error de red
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage = "No se puede conectar al servidor. Verifica que esté ejecutándose en puerto 4000.";
      }
      
      return { 
        success: false, 
        error: errorMessage,
        networkError: true
      };
    }
  }, []);
};

export default useRegisterUser;