import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { useCompra } from '../hooks/useCompra';

/*Este es el formulario de compra, donde se ingresan los datos del cliente para realizar la compra de un auto.
Se utiliza react-hook-form para manejar el formulario y sus validaciones, y se usa un hook*/

function FormularioCompra() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: 'onChange' });
  const { realizarCompra, loading } = useCompra();

  const onSubmit = async (data) => {
    const res = await realizarCompra(data);
    if (res.ok) {
      // Guarda los datos en localStorage
      localStorage.setItem('datosCompra', JSON.stringify(data));
      // Si tienes datos del vehículo, guárdalos también
      // localStorage.setItem('datosVehiculo', JSON.stringify(vehiculoSeleccionado));
      toast.success("Formulario enviado correctamente");
      reset();
      navigate('/CompraFinal/');
    } else {
      toast.error(res.error?.message || "No se pudo realizar la compra");
    }
  };

  return (
    <div className="container mt-4">
      <Toaster position="top-center" />
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow rounded">
        <h2 className="text-center mb-4">Formulario de Compra</h2>
        <div className="mb-3">
          <label className="form-label">Ingrese su nombre:</label>
          <input
            type="text"
            className="form-control"
            {...register("fullName", { required: "El nombre es obligatorio" })}
            disabled={loading}
          />
          {errors.fullName && <span className="text-warning small">{errors.fullName.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Ingrese un documento que confirme su identidad:</label>
          <input
            type="text"
            className="form-control"
            {...register("documentId", { required: "El documento es obligatorio" })}
            disabled={loading}
          />
          {errors.documentId && <span className="text-warning small">{errors.documentId.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Ingrese su número de teléfono:</label>
          <input
            type="text"
            className="form-control"
            {...register("phone", { required: "El teléfono es obligatorio" })}
            disabled={loading}
          />
          {errors.phone && <span className="text-warning small">{errors.phone.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Ingrese su correo electrónico:</label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: { value: /^\S+@\S+$/i, message: "Correo inválido" }
            })}
            disabled={loading}
          />
          {errors.email && <span className="text-warning small">{errors.email.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Ingrese su dirección de residencia:</label>
          <input
            type="text"
            className="form-control"
            {...register("address", { required: "La dirección es obligatoria" })}
            disabled={loading}
          />
          {errors.address && <span className="text-warning small">{errors.address.message}</span>}
        </div>
        <div className="mb-3">
          <label className="form-label">Elija el método de pago:</label>
          <select
            className="form-select"
            {...register("paymentMethod", { required: "El método de pago es obligatorio" })}
            disabled={loading}
          >
            <option value="">Seleccione...</option>
            <option value="tarjeta">Tarjeta de crédito/débito</option>
            <option value="transferencia">Transferencia bancaria</option>
            <option value="efectivo">Pago en efectivo</option>
          </select>
          {errors.paymentMethod && <span className="text-warning small">{errors.paymentMethod.message}</span>}
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("insuranceSelected")}
            disabled={loading}
          />
          <label className="form-check-label">¿Desea contratar seguro del vehículo?</label>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("termsAccepted", { required: "Debe aceptar los términos y condiciones" })}
            disabled={loading}
          />
          <label className="form-check-label">Acepta los términos y condiciones</label>
          {errors.termsAccepted && <span className="text-warning small ms-2">{errors.termsAccepted.message}</span>}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isValid || loading}
        >
          {loading ? "Procesando..." : "Continuar"}
        </button>
      </form>
    </div>
  );
}

export default FormularioCompra;
