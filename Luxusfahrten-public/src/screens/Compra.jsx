import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  // Este componente muestra los detalles de un producto específico (en este caso, un auto).
  const navigate = useNavigate();

  const goToInfo = () => {
    // Esta función se llama cuando el usuario hace clic en el botón "Llenar Formulario".
    // Redirige al usuario a la página del formulario de compra.
    navigate('/CompraForm/');
  };

  return (
    // Contenedor principal del detalle del producto.
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card border-light mb-4">
            <div className="card-header bg-white border-bottom-0">
              <h3 className="mb-0">Porsche 992 911 gt3</h3>
            </div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Porsche_992_GT3_1X7A0323.jpg" 
              alt="Porsche 992 911 GT3" 
              className="img-fluid"
            />
           
            <div className="card-body pt-3">
              <div className="mb-3">
                <p className="mb-1 fw-medium">Color elegido:</p>
                <div className="d-flex align-items-center">
                  <div className="bg-light rounded-circle p-1" style={{ width: '32px', height: '32px' }}>
                    <div className="bg-white rounded-circle w-100 h-100"></div>
                  </div>
                </div>
              </div>
              
              
              <div className="mb-3">
                <p className="mb-1 fw-medium">Color del interior elegido:</p>
                <div className="bg-dark rounded-circle" style={{ width: '24px', height: '24px' }}></div>
              </div>
              
              <div className="mb-3">
                <p className="mb-1 fw-medium">Rines:</p>
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: '40px', height: '40px' }}>
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#777" strokeWidth="2" />
                      <g transform="translate(50, 50)">
                        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
                          <line 
                            key={i}
                            x1="0" 
                            y1="0" 
                            x2={25 * Math.cos(angle * Math.PI / 180)} 
                            y2={25 * Math.sin(angle * Math.PI / 180)} 
                            stroke="#777" 
                            strokeWidth="3" 
                          />
                        ))}
                      </g>
                    </svg>
                  </div>
                  <div className="bg-dark rounded-circle" style={{ width: '24px', height: '24px' }}></div>
                </div>
              </div>

              
              <div className="mt-4">
                <h5 className="text-center mb-3">Versión</h5>
                <ul className="list-unstyled">
                  <li className="mb-2">• Motor: 4.0L Bóxer 6 cilindros, atmosférico</li>
                  <li className="mb-2">• Potencia: 502 hp @ 8,400 rpm</li>
                  <li className="mb-2">• Torque: 470 Nm @ 6,100 rpm</li>
                  <li className="mb-2">• Transmisión: Manual de 6 velocidades</li>
                  <li className="mb-2">• Tracción: Trasera (RWD)</li>
                  <li className="mb-2">• Frenos: Discos carbono-cerámicos</li>
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
                <p className="fw-medium mb-0">$185,630</p>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <p className="text-muted mb-0">Fecha estimada de entrega:</p>
                <p className="fw-medium mb-0">13 de abril de 2025</p>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <p className="text-muted mb-0">Cargos por modificaciones extras:</p>
                <p className="fw-medium mb-0">$5,630</p>
              </div>
              
              <div className="d-flex justify-content-between mb-3">
                <p className="text-muted mb-0">Cargos por destino y gestión:</p>
                <p className="fw-medium mb-0">$1,783</p>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-4">
                <p className="text-muted mb-0">Precio total al pagar:</p>
                <p className="fw-bold fs-5 mb-0">$187,413</p>
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