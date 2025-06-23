import { useCallback } from "react";

const useVerifyCode = () => {
  return useCallback(async (code) => {
    try {
      const res = await fetch("http://localhost:4000/api/registerUsers/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include", // Importante para enviar la cookie con el token
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

export default useVerifyCode;