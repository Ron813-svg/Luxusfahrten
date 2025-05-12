
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TermsAndConditions = () => {
  // Textos de términos y condiciones en formato largo para ser mostrados dinámicamente.
  const termsText = `
    "Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore
    et dolore magna aliqua. Ut enim ad
    minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat.
    Duis aute irure dolor in
    reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla
    pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa
    qui officia deserunt mollit anim id
    est laborum."
  `;

  const conditionsText = `
    "Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex
    ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum
    dolore eu fugiat nulla pariatur. Excepteur sint
    occaecat cupidatat non proident, sunt in culpa
    qui officia deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur
    adipiscing elit, sed do eiusmod tempor
    incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud
    exercitation ullamco laboris nisi ut aliquip ex
    ea commodo consequat."
  `;

  return (
    <div className="container mt-5 p-5"> {/* Contenedor principal con estilos de margen y relleno */}
      <div className="row"> {/* Divide en dos columnas usando Bootstrap */}
        
        {/* Columna para la tarjeta de Términos */}
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card shadow-lg"> 
            <div className="card-body">
              <h5 className="card-title text-center">Términos</h5> 
              <p className="card-text">{termsText}</p> 
            </div>
          </div>
        </div>
        
        {/* Columna para la tarjeta de Condiciones */}
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              <h5 className="card-title text-center">Condiciones</h5>
              <p className="card-text">{conditionsText}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TermsAndConditions;
