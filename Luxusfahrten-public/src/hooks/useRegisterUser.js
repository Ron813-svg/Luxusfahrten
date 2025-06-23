import { useCallback } from "react";

const useRegisterUser = () => {
  return useCallback(async (userData) => {
    try {
      const res = await fetch("http://localhost:4000/api/registerUsers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include", // Asegúrate de que las cookies se envíen con la solicitud
      });
      if (res.ok) {
        return true;
      } else {
        // Puedes mostrar un mensaje de error aquí si quieres
        return false;
      }
    } catch (error) {
      // Puedes mostrar un mensaje de error aquí si quieres
      return false;
    }
  }, []);
};

export default useRegisterUser;