// Importamos React y los hooks necesarios.
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useRegisterUser from "../hooks/useRegisterUser";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const registerUser = useRegisterUser();

  // Función que maneja el envío del formulario.
  const onSubmit = async (data) => {
    setLoading(true);
    console.log("📝 Datos del formulario:", data);

    try {
      // Transformar datos para que coincidan con el backend
      const userData = {
        name: data.name,
        lastName: data.lastName,
        birthday: data.birthday,
        email: data.email,
        password: data.password,
        telephone: data.telephone,
        dui: data.dui,
        address: data.address, // ✅ Agregamos el campo address
        isVerified: false // Por defecto false hasta verificar email
      };

      console.log("🚀 Datos enviados al backend:", userData);

      const result = await registerUser(userData);
      
      if (result.success) {
        toast.success("Registro exitoso. Revisa tu correo para el código.");
        setTimeout(() => navigate("/verificar-codigo"), 1500);
      } else {
        toast.error(result.error || "Error al registrar. Intenta de nuevo.");
      }
    } catch (error) {
      console.error("❌ Error en el registro:", error);
      toast.error("Error inesperado. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#333" }}
    >
      <Toaster position="top-center" />
      {/* Contenedor principal para centrar el formulario */}
      <div
        className="card shadow-sm"
        style={{
          maxWidth: "600px",
          width: "90%",
          backgroundColor: "#5a5a5a",
          color: "white",
        }}
      >
        <div className="card-body p-4">
          {/* Título del formulario */}
          <div className="text-center mb-3">
            <h1
              className="h3"
              style={{
                fontFamily: '"Playfair Display", serif',
                letterSpacing: "1px",
              }}
            >
              LUXUSFAHRTEN
            </h1>
          </div>

          <h4 className="text-center mb-4 fw-normal">Registrarse</h4>

          {/* Inicio del formulario */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Fila 1: Nombre y Apellido */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="name" className="form-label small">
                  Nombre *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...register("name", { 
                    required: "El nombre es obligatorio",
                    minLength: {
                      value: 2,
                      message: "Mínimo 2 caracteres"
                    }
                  })}
                  placeholder="Juan"
                  disabled={loading}
                />
                {errors.name && (
                  <span className="text-danger small">{errors.name.message}</span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label small">
                  Apellido *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  {...register("lastName", { 
                    required: "El apellido es obligatorio",
                    minLength: {
                      value: 2,
                      message: "Mínimo 2 caracteres"
                    }
                  })}
                  placeholder="Pérez"
                  disabled={loading}
                />
                {errors.lastName && (
                  <span className="text-danger small">{errors.lastName.message}</span>
                )}
              </div>
            </div>

            {/* Fila 2: Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label small">
                Correo electrónico *
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Correo inválido"
                  }
                })}
                placeholder="juan.perez@email.com"
                disabled={loading}
              />
              {errors.email && (
                <span className="text-danger small">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Fila 3: Contraseñas */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="password" className="form-label small">
                  Contraseña *
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "Mínimo 6 caracteres"
                    }
                  })}
                  placeholder="••••••••"
                  disabled={loading}
                />
                {errors.password && (
                  <span className="text-danger small">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label small">
                  Confirmar contraseña *
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirma tu contraseña",
                    validate: (value) =>
                      value === watch("password") ||
                      "Las contraseñas no coinciden",
                  })}
                  placeholder="••••••••"
                  disabled={loading}
                />
                {errors.confirmPassword && (
                  <span className="text-danger small">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            {/* Fila 4: Teléfono y DUI */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="telephone" className="form-label small">
                  Número de teléfono *
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="telephone"
                  {...register("telephone", {
                    required: "El teléfono es obligatorio",
                    pattern: {
                      value: /^[0-9]{8,}$/,
                      message: "Mínimo 8 dígitos"
                    }
                  })}
                  placeholder="7812-3456"
                  disabled={loading}
                />
                {errors.telephone && (
                  <span className="text-danger small">
                    {errors.telephone.message}
                  </span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="dui" className="form-label small">
                  DUI *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="dui"
                  {...register("dui", {
                    required: "El DUI es obligatorio",
                    pattern: {
                      value: /^\d{8}-\d$/,
                      message: "Formato: 12345678-9"
                    }
                  })}
                  placeholder="12345678-9"
                  disabled={loading}
                />
                {errors.dui && (
                  <span className="text-danger small">
                    {errors.dui.message}
                  </span>
                )}
              </div>
            </div>

            {/* Fila 5: Fecha de nacimiento */}
            <div className="mb-3">
              <label htmlFor="birthday" className="form-label small">
                Fecha de nacimiento *
              </label>
              <input
                type="date"
                className="form-control"
                id="birthday"
                {...register("birthday", {
                  required: "La fecha de nacimiento es obligatoria",
                  validate: (value) => {
                    const today = new Date();
                    const birthDate = new Date(value);
                    const age = today.getFullYear() - birthDate.getFullYear();
                    return age >= 18 || "Debes ser mayor de 18 años";
                  }
                })}
                disabled={loading}
              />
              {errors.birthday && (
                <span className="text-danger small">
                  {errors.birthday.message}
                </span>
              )}
            </div>

            {/* ✅ NUEVO: Campo de dirección */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label small">
                Dirección *
              </label>
              <textarea
                className="form-control"
                id="address"
                rows="2"
                {...register("address", {
                  required: "La dirección es obligatoria",
                  minLength: {
                    value: 10,
                    message: "Mínimo 10 caracteres"
                  }
                })}
                placeholder="Calle Principal #123, Colonia Centro, San Salvador"
                disabled={loading}
              />
              {errors.address && (
                <span className="text-danger small">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Nota informativa */}
            <div className="alert alert-info py-2 mb-3" style={{ fontSize: '0.85rem' }}>
              <strong>📧 Verificación:</strong> Después del registro, recibirás un código de verificación en tu correo electrónico.
            </div>

            <button 
              type="submit" 
              className="btn btn-light w-100 py-2 mb-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registrando...
                </>
              ) : (
                "Registrarse"
              )}
            </button>
          </form>

          <div className="text-center mt-3 small">
            <span>¿Ya tienes una cuenta? </span>
            <Link className="text-white text-decoration-none" to="/Login/">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;