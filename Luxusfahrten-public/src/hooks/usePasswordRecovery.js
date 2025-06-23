import { useState } from "react";

const API = "http://localhost:4000/api/passRecov";

export function usePasswordRecovery() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Solicitar código de recuperación
  const requestCode = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/requestCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return { ok: true, data };
    } catch (err) {
      setError(err.message || "Error solicitando código");
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // 2. Verificar código
  const verifyCode = async (code) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/verifyCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return { ok: true, data };
    } catch (err) {
      setError(err.message || "Error verificando código");
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  // 3. Cambiar contraseña
  const resetPassword = async (password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/resetPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return { ok: true, data };
    } catch (err) {
      setError(err.message || "Error cambiando contraseña");
      return { ok: false, error: err };
    } finally {
      setLoading(false);
    }
  };

  return {
    requestCode,
    verifyCode,
    resetPassword,
    loading,
    error,
  };
}