import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useLoginUser from '../hooks/useLoginUser';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const loginUser = useLoginUser();

  const onSubmit = async (data) => {
    const success = await loginUser(data);
    if (success) {
      toast.success("Inicio de sesión exitoso");
      setTimeout(() => navigate('/'), 1200);
    } else {
      toast.error("Correo o contraseña incorrectos");
    }
  };

  const goToRegister = () => {
    navigate('/Register/');
  };

  const goToRecuperacion = () => {
    navigate('/Recuperacion/');
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <Toaster position="top-center" />
      <div className="card shadow-sm" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#5a5a5a', color: 'white' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h1 className="display-6" style={{ fontFamily: '"Playfair Display", serif', letterSpacing: '2px' }}>LUXUSFAHRTEN</h1>
          </div>
          
          <h4 className="text-center mb-4 fw-normal">Log in</h4>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">Ingrese su correo</label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email", { required: "El correo es obligatorio" })}
                placeholder="Email"
              />
              {errors.email && <span className="text-danger small">{errors.email.message}</span>}
            </div>
            
            <div className="mb-2">
              <label htmlFor="password" className="form-label small">Ingrese su contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", { required: "La contraseña es obligatoria" })}
                placeholder="Password"
              />
              {errors.password && <span className="text-danger small">{errors.password.message}</span>}
            </div>
            
            <div className="d-flex justify-content-end mb-3">
              <span className="text-white text-decoration-none small" style={{ cursor: "pointer" }} onClick={goToRecuperacion}>Olvidaste contraseña?</span>
            </div>
            
            <button type="submit" className="btn btn-light w-100 mb-3">Iniciar sesión</button>
          </form>
          
          <div className="text-center mt-3 small">
            <span>No tienes cuenta? </span>
            <span className="text-white text-decoration-none" style={{ cursor: "pointer" }} onClick={goToRegister}>Registrate</span>
          </div>
          <button
            className="btn btn-outline-light w-100 mt-3"
            onClick={() => navigate('/')}
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;