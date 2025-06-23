import { useState } from "react";
import { toast } from "react-hot-toast";

export function useCompraFinal() {
  const [loading, setLoading] = useState(false);

  const realizarCompraFinal = async (formData) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw data;
      toast.success("Compra realizada correctamente");
      // Puedes limpiar localStorage aquí si lo deseas
      return { ok: true, data };
    } catch (error) {
      toast.error(error?.message || "No se pudo realizar la compra");
      return { ok: false, error };
    } finally {
      setLoading(false);
    }
  };

  return { realizarCompraFinal, loading };
}