import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const VerifyCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
    // Enfocar automáticamente el primer campo al cargar
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Solo permitir dígitos
    
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

  const goToNewPassword = () => {
    navigate('/CambiarPassword/');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredCode = code.join('');
    console.log('Código verificado:', enteredCode);
  };

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
              Ingrese el código que se le ha enviado a su correo electrónico.
            </p>
          </div>
          
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
                />
              ))}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-light w-100"
              style={{ backgroundColor: '#e9ecef', color: '#333' }}
              disabled={code.some(digit => !digit)}
              onClick={goToNewPassword}
            >
              Confirmar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;