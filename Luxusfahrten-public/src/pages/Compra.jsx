import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';

const TAX_RATE = 0.16; 

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [auto, setAuto] = useState(null);
  const [isRestaurado, setIsRestaurado] = useState(false);

  useEffect(() => {
    // Primero intentar obtener de vehículos normales
    fetch(`http://localhost:4000/api/vehicles/${id}`)
      .then(res => {
        if (res.ok) {
          setIsRestaurado(false);
          return res.json();
        }
        // Si no se encuentra, buscar en vehículos restaurados
        return fetch(`http://localhost:4000/api/restoredVehicles/${id}`)
          .then(res2 => {
            if (res2.ok) {
              setIsRestaurado(true);
              return res2.json();
            }
            return null;
          });
      })
      .then(data => {
        if (data) {
          setAuto(data);
          // Guardar los datos del vehículo en localStorage según el tipo
          if (isRestaurado) {
            localStorage.setItem('datosVehiculo2', JSON.stringify(data));
          } else {
            localStorage.setItem('datosVehiculo', JSON.stringify(data));
          }
          // Guardar el ID del vehículo para usarlo en la compra
          localStorage.setItem('vehiculoId', data._id);
        }
      })
      .catch(error => {
        console.error('Error al cargar vehículo:', error);
        setAuto(null);
      });
  }, [id, isRestaurado]);

  const goToInfo = () => {
    if (!auto) {
      alert('Error: No se pudo cargar la información del vehículo');
      return;
    }

    // Calcula el precio total con impuestos
    const basePrice = Number(auto.price) || 0;
    const tax = basePrice * TAX_RATE;
    const totalPrice = basePrice + tax;

    // Guarda el precio final con impuestos
    localStorage.setItem('precioFinal', totalPrice.toString());
    
    // Asegurar que el ID del vehículo esté guardado
    localStorage.setItem('vehiculoId', auto._id);
    
    console.log('Datos guardados:', {
      vehiculoId: auto._id,
      precioFinal: totalPrice,
      tipo: isRestaurado ? 'restaurado' : 'normal'
    });

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
              <h3 className="mb-0">
                {auto.specs?.marca || auto.brand?.name} {auto.specs?.modelo || auto.model?.name}
                {isRestaurado && <span className="badge bg-warning ms-2">Restaurado</span>}
              </h3>
            </div>
            <img 
              src={auto.image}
              alt={`${auto.specs?.marca || auto.brand?.name} ${auto.specs?.modelo || auto.model?.name}`}
              className="img-fluid"
            />
            <div className="card-body pt-3">
              <div className="mt-4">
                <h5 className="text-center mb-3">Especificaciones</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">• Motor: {auto.specs?.motor || 'No especificado'}</li>
                  <li className="mb-2">• Potencia: {auto.specs?.potencia || 'No especificado'}</li>
                  <li className="mb-2">• Torque: {auto.specs?.torque || 'No especificado'}</li>
                  <li className="mb-2">• Transmisión: {auto.specs?.transmision || 'No especificado'}</li>
                  <li className="mb-2">• Tracción: {auto.specs?.traccion || 'No especificado'}</li>
                  <li className="mb-2">• Frenos: {auto.specs?.frenos || 'No especificado'}</li>
                  <li className="mb-2">• Aceleración: {auto.specs?.aceleracion || 'No especificado'}</li>
                  <li className="mb-2">• Velocidad Máxima: {auto.specs?.velocidadMaxima || 'No especificado'}</li>
                  <li className="mb-2">• Rendimiento: {auto.specs?.rendimiento || 'No especificado'}</li>
                  {auto.year && <li className="mb-2">• Año: {auto.year}</li>}
                  {auto.color && <li className="mb-2">• Color: {auto.color}</li>}
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
              
              <button 
                className="btn btn-primary w-100" 
                onClick={goToInfo}
                disabled={!auto || basePrice <= 0}
              >
                Llenar Formulario
              </button>
              
              {(!auto || basePrice <= 0) && (
                <small className="text-muted d-block mt-2 text-center">
                  No se puede proceder sin información del vehículo
                </small>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;