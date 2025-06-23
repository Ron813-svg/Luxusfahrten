import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePasswordRecovery } from '../hooks/usePasswordRecovery';
import { Toaster, toast } from 'react-hot-toast';

const VerifyCode = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { register, handleSubmit, setValue, watch, formState: { isValid } } = useForm({
    mode: 'onChange',
    defaultValues: { code: ['', '', '', '', '', ''] }
  });
  const { verifyCode, loading, error } = usePasswordRecovery();
  const code = watch('code');

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
    // Enfocar automáticamente el primer campo al cargar
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Solo permitir dígitos
    setValue(`code.${index}`, value, { shouldValidate: true });
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onSubmit = async (data) => {
    const codeString = data.code.join('');
    const res = await verifyCode(codeString);
    if (res.ok) {
      toast.success("Código verificado");
      navigate('/CambiarPassword/');
    } else {
      toast.error(res.error?.message || "Código incorrecto");
    }
  };

  return (
    // Contenedor principal del formulario de verificación de código.
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
          
          <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register(`code.${index}`, { required: true, maxLength: 1, pattern: /^\d$/ })}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  disabled={loading}
                />
              ))}
            </div>
            {error && <span className="text-danger small">{error}</span>}
            <button 
              type="submit" 
              className="btn btn-light w-100"
              style={{ backgroundColor: '#e9ecef', color: '#333' }}
              disabled={!isValid || loading}
            >
              {loading ? "Verificando..." : "Confirmar"}
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default VerifyCode;