import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';

const TAX_RATE = 0.16; 

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [auto, setAuto] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/vehicles/${id}`)
      .then(res => {
        if (res.ok) return res.json();
        return fetch(`http://localhost:4000/api/restoredVehicles/${id}`)
          .then(res2 => (res2.ok ? res2.json() : null));
      })
      .then(data => setAuto(data))
      .catch(() => setAuto(null));
  }, [id]);

  const goToInfo = () => {
    navigate('/CompraForm/');
  };

  if (!auto) return <div className="container mt-4">Cargando información...</div>;

  // Calcula el precio total con impuestos
  const basePrice = Number(auto.price) || 0;
  const tax = basePrice * TAX_RATE;
  const totalPrice = basePrice + tax;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card border-light mb-4">
            <div className="card-header bg-white border-bottom-0">
              <h3 className="mb-0">{auto.specs?.marca} {auto.specs?.modelo}</h3>
            </div>
            <img 
              src={auto.image}
              alt={`${auto.specs?.marca} ${auto.specs?.modelo}`}
              className="img-fluid"
            />
            <div className="card-body pt-3">
              <div className="mt-4">
                <h5 className="text-center mb-3">Versión</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">• Motor: {auto.specs?.motor}</li>
                  <li className="mb-2">• Potencia: {auto.specs?.potencia}</li>
                  <li className="mb-2">• Torque: {auto.specs?.torque}</li>
                  <li className="mb-2">• Transmisión: {auto.specs?.transmision}</li>
                  <li className="mb-2">• Tracción: {auto.specs?.traccion}</li>
                  <li className="mb-2">• Frenos: {auto.specs?.frenos}</li>
                  <li className="mb-2">• Aceleración: {auto.specs?.aceleracion}</li>
                  <li className="mb-2">• Velocidad Máxima: {auto.specs?.velocidadMaxima}</li>
                  <li className="mb-2">• Rendimiento: {auto.specs?.rendimiento}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card border-light">
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <p className="text-muted mb-0">Precio del vehículo:</p>
                <p className="fw-medium mb-0">${basePrice ? basePrice.toLocaleString() : 'Consultar'}</p>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <p className="text-muted mb-0">Impuestos de venta ({TAX_RATE * 100}%):</p>
                <p className="fw-medium mb-0">${basePrice ? tax.toLocaleString(undefined, {minimumFractionDigits: 2}) : 'Consultar'}</p>
              </div>

              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <p className="text-muted mb-0">Precio total al pagar:</p>
                <p className="fw-bold fs-5 mb-0">
                  {basePrice ? `$${totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2})}` : 'Consultar'}
                </p>
              </div>
              
              <button className="btn btn-primary w-100" onClick={goToInfo}>Llenar Formulario</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;