import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function FormularioCompra() {
  // Estado para manejar los datos del formulario de compra.
  // Se inicializa con valores vacíos y booleanos para los checkboxes.
  const [formData, setFormData] = useState({
    nombre: '',
    documento: '',
    telefono: '',
    correo: '',
    direccion: '',
    metodoPago: '',
    seguro: false,
    aceptaTerminos: false,
  });


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const navigate = useNavigate();
  const goToCompraFinal = () => {
    navigate('/CompraFinal/');
  };


  return (
    // Contenedor principal del formulario de compra.
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="border p-4 shadow rounded">
        <h2 className="text-center mb-4">Formulario de Compra</h2>
        <div className="mb-3">
          <label className="form-label">Ingrese su nombre:</label>
          <input type="text" name="nombre" className="form-control" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingrese un documento que confirme su identidad:</label>
          <input type="text" name="documento" className="form-control" value={formData.documento} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingrese su número de teléfono:</label>
          <input type="text" name="telefono" className="form-control" value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingrese su correo electrónico:</label>
          <input type="email" name="correo" className="form-control" value={formData.correo} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Ingrese su dirección de residencia:</label>
          <input type="text" name="direccion" className="form-control" value={formData.direccion} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Elija el método de pago:</label>
          <select name="metodoPago" className="form-select" value={formData.metodoPago} onChange={handleChange}>
            <option value="">Seleccione...</option>
            <option value="tarjeta">Tarjeta de crédito/débito</option>
            <option value="transferencia">Transferencia bancaria</option>
            <option value="efectivo">Pago en efectivo</option>
          </select>
        </div>

        {/* Checkbox para contratar seguro del vehículo */}
        <div className="mb-3 form-check">
          <input type="checkbox" name="seguro" className="form-check-input" checked={formData.seguro} onChange={handleChange} />
          <label className="form-check-label">¿Desea contratar seguro del vehículo?</label>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" name="aceptaTerminos" className="form-check-input" checked={formData.aceptaTerminos} onChange={handleChange} />
          <label className="form-check-label">Acepta los términos y condiciones</label>
        </div>
        <button type="submit" className="btn btn-primary w-100" onClick={goToCompraFinal}>Continuar</button>
      </form>
    </div>
  );
}

export default FormularioCompra;
