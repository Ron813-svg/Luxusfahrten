import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Recuperacion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando correo de recuperación a:', email);
    // Si el correo es válido, navegar a la página de código
    if (email) {
      navigate('/RecuperacionCodigo/');
    }
  };

  const goToLogin = () => {
    navigate('/Login/');
  };

  // Verificar si el email tiene contenido
  const isEmailValid = email.trim() !== '';

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#333' }}>
      <div className="card shadow-sm" style={{ maxWidth: '400px', width: '90%', backgroundColor: '#5a5a5a', color: 'white' }}>
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <h1 className="h3" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '1px' }}>LUXUSFAHRTEN</h1>
          </div>
          
          <div className="text-center mb-4">
            <div className="d-inline-block bg-transparent p-2 rounded-circle border border-white mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
              </svg>
            </div>
            <h5 className="mb-1">¿Tienes problemas para iniciar sesión?</h5>
            <p className="small text-white-50">
              Ingresa tu correo electrónico y te enviaremos un enlace para acceder a tu cuenta.
            </p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input 
                type="email" 
                className="form-control bg-light text-dark"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-light w-100 mb-3"
              disabled={!isEmailValid}
              style={{
                opacity: isEmailValid ? 1 : 0.6,
                cursor: isEmailValid ? 'pointer' : 'not-allowed'
              }}
            >
              Enviar correo
            </button>
          </form>
          
          <div className="text-center mt-3">
            <a 
              className="text-white small text-decoration-none" 
              onClick={goToLogin}
              style={{ cursor: 'pointer' }}
            >
              Volver a iniciar sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recuperacion;