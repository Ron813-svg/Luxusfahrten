import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';

/*Este es el formulario de compra, donde se ingresan los datos del cliente para realizar la compra de un auto.
Se utiliza react-hook-form para manejar el formulario y sus validaciones.*/

function CompraForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isValid }, reset } = useForm({ mode: 'onChange' });
  const [formData, setFormData] = useState(null);

  const onSubmit = (data) => {
    // Guarda los datos en localStorage
    localStorage.setItem('datosCompra', JSON.stringify(data));
    toast.success("Formulario guardado localmente");
    reset();
    setFormData(data);
    console.log("Datos guardados localmente:", data);
    navigate('/CompraFinal/');
  };

  return (
    <div className="container mt-4">
      <Toaster position="top-center" />
      <h2 className="text-center mb-4">Formulario de Compra</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="border p-4 m-4 shadow rounded">
        <div className="mb-3">
          <label className="form-label">Elija el método de pago:</label>
          <select
            className="form-select"
            {...register("paymentMethod", { required: "El método de pago es obligatorio" })}
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
          />
          <label className="form-check-label">¿Desea contratar seguro del vehículo?</label>
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            {...register("termsAccepted", { required: "Debe aceptar los términos y condiciones" })}
          />
          <label className="form-check-label">Acepta los términos y condiciones</label>
          {errors.termsAccepted && <span className="text-warning small ms-2">{errors.termsAccepted.message}</span>}
        </div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={!isValid}
        >
          Guardar
        </button>
      </form>
      {formData && (
        <div className="mt-4">
          <h4>Datos guardados localmente:</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CompraForm;
