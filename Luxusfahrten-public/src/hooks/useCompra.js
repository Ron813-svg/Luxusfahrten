import { useState } from "react";

export function useCompra() {
  const [loading, setLoading] = useState(false);

  const realizarCompra = async (formData) => {
    setLoading(true);
    try {
      console.log("Datos enviados:", formData);
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw data;
      return { ok: true, data };
    } catch (error) {
      return { ok: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { realizarCompra, loading };
}