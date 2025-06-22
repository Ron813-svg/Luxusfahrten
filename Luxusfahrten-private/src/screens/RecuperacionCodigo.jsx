import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredCode = code.join('');
    
    if (enteredCode.length !== 6) {
      setError('Por favor ingresa el código completo');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`http://localhost:4000/api/passRecov/verifyCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code: enteredCode }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/CambiarPassword/');
      } else {
        setError(data.message || 'Código inválido');
        // Limpiar campos en caso de error
        setCode(['', '', '', '', '', '']);
        inputRefs.current[0].focus();
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const isCodeComplete = code.every(digit => digit !== '');

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#333' }}>
      <div className="card shadow-sm" style={{ maxWidth: '320px', width: '90%', backgroundColor: '#5a5a5a', color: 'white' }}>
        <div className="card-body px-4 py-4">
          <div className="text-center mb-3">
            <h1 className="h3 mb-3" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '1px' }}>LUXUSFAHRTEN</h1>
          </div>
          
          <div className="text-center mb-3">
            <h5 className="mb-2">Verifique su código</h5>
            <p className="small text-white-50 mb-3">
              Ingrese el código de 6 dígitos enviado a su correo electrónico.
            </p>
          </div>

          {error && (
            <div className="alert alert-danger text-center py-2 small mb-3">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between mb-4 gap-1">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength="1"
                  className="form-control text-center p-0"
                  style={{ 
                    width: '36px', 
                    height: '36px', 
                    fontSize: '1rem',
                    backgroundColor: 'rgb(255, 255, 255)',
                    color: 'black',
                    border: '1px solid rgba(121, 121, 121, 0.3)'
                  }}
                  value={code[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                />
              ))}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-light w-100"
              style={{ backgroundColor: '#e9ecef', color: '#333' }}
              disabled={!isCodeComplete || loading}
            >
              {loading ? 'Verificando...' : 'Confirmar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;