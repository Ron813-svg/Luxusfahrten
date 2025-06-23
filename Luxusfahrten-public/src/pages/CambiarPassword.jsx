import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { usePasswordRecovery } from '../hooks/usePasswordRecovery';
import { Toaster, toast } from 'react-hot-toast';

const CambiarPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { resetPassword, loading, error } = usePasswordRecovery();

  const { register, handleSubmit, watch, formState: { isValid, errors } } = useForm({
    mode: 'onChange'
  });

  const password = watch('password');

  const onSubmit = async (data) => {
    const res = await resetPassword(data.password);
    if (res.ok) {
      toast.success("Contraseña cambiada correctamente");
      navigate('/Login/');
    } else {
      toast.error(res.error?.message || "No se pudo cambiar la contraseña");
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#333' }}>
      <div className="card shadow-sm" style={{ maxWidth: '320px', width: '90%', backgroundColor: '#5a5a5a', color: 'white' }}>
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <h1 className="h3" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '1px' }}>LUXUSFAHRTEN</h1>
          </div>
          <div className="text-center mb-3">
            <div className="d-inline-block bg-transparent p-2 rounded-circle border border-white mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"/>
              </svg>
            </div>
            <h5 className="mb-2">Cambiar contraseña</h5>
            <p className="small text-white-50 mb-3">
              La contraseña debe tener al menos 8 caracteres.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control border-secondary"
                  placeholder="Contraseña nueva"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: { value: 8, message: "Mínimo 8 caracteres" }
                  })}
                  disabled={loading}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              {errors.password && <span className="text-warning small">{errors.password.message}</span>}
            </div>
            <div className="mb-3">
              <div className="input-group">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control border-secondary"
                  placeholder="Repetir contraseña nueva"
                  {...register("confirmPassword", {
                    required: "Repite la contraseña",
                    validate: value => value === password || "Las contraseñas no coinciden"
                  })}
                  disabled={loading}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              {errors.confirmPassword && <span className="text-warning small">{errors.confirmPassword.message}</span>}
            </div>
            {error && <span className="text-danger small">{error}</span>}
            <button
              type="submit"
              className="btn btn-light w-100 mt-2"
              disabled={!isValid || loading}
            >
              {loading ? "Cambiando..." : "Confirmar"}
            </button>
          </form>
          <Toaster position="top-center" />
        </div>
      </div>
    </div>
  );
};

export default CambiarPassword;