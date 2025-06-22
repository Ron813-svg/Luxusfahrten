import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Recuperacion = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`http://localhost:4000/api/passRecov/requestCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Importante para cookies
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Código de recuperación enviado a tu email');
        // Esperar 2 segundos antes de navegar
        setTimeout(() => {
          navigate('/RecuperacionCodigo/');
        }, 2000);
      } else {
        setError(data.message || 'Error al enviar código');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => {
    navigate('/Login/');
  };

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
              Ingresa tu correo electrónico y te enviaremos un código para acceder a tu cuenta.
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
                disabled={loading}
              />
            </div>

            {error && (
              <div className="alert alert-danger text-center py-2 small mb-3">
                {error}
              </div>
            )}

            {message && (
              <div className="alert alert-success text-center py-2 small mb-3">
                {message}
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn btn-light w-100 mb-3"
              disabled={!isEmailValid || loading}
              style={{
                opacity: (isEmailValid && !loading) ? 1 : 0.6,
                cursor: (isEmailValid && !loading) ? 'pointer' : 'not-allowed'
              }}
            >
              {loading ? 'Enviando...' : 'Enviar código'}
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