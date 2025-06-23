// Importamos React y los hooks necesarios.
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useRegisterUser from "../hooks/useRegisterUser";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const registerUser = useRegisterUser();

  // Función que maneja el envío del formulario.
  const onSubmit = async (data) => {
    const success = await registerUser(data);
    if (success) {
      toast.success("Registro exitoso. Revisa tu correo para el código.");
      setTimeout(() => navigate("/verificar-codigo"), 1500);
    } else {
      toast.error("Error al registrar. Intenta de nuevo.");
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
          maxWidth: "500px",
          width: "85%",
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

          <h4 className="text-center mb-3 fw-normal">Registrarse</h4>

          {/* Inicio del formulario */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <label htmlFor="email" className="form-label small">
                Ingrese su correo
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...register("email", {
                  required: "El correo es obligatorio",
                })}
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-danger small">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="password" className="form-label small">
                Ingrese su contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                {...register("password", {
                  required: "La contraseña es obligatoria",
                })}
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-danger small">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="confirmPassword" className="form-label small">
                Confirmar contraseña
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
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <span className="text-danger small">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="mb-2">
              <label htmlFor="name" className="form-label small">
                Ingrese su nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...register("name", { required: "El nombre es obligatorio" })}
                placeholder="Nombre completo"
              />
              {errors.name && (
                <span className="text-danger small">{errors.name.message}</span>
              )}
            </div>

            <div className="row mb-2">
              <div className="col-md-6 mb-2 mb-md-0">
                <label htmlFor="telephone" className="form-label small">
                  Número de teléfono
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="telephone"
                  {...register("telephone", {
                    required: "El teléfono es obligatorio",
                  })}
                  placeholder="Teléfono"
                />
                {errors.telephone && (
                  <span className="text-danger small">
                    {errors.telephone.message}
                  </span>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="birthday" className="form-label small">
                  Fecha de nacimiento
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="birthday"
                  {...register("birthday", {
                    required: "La fecha es obligatoria",
                  })}
                  placeholder="YYYY-MM-DD"
                />
                {errors.birthday && (
                  <span className="text-danger small">
                    {errors.birthday.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label small">
                Ingrese su dirección
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                {...register("address", {
                  required: "La dirección es obligatoria",
                })}
                placeholder="Your location"
              />
              {errors.address && (
                <span className="text-danger small">
                  {errors.address.message}
                </span>
              )}
            </div>

            <button type="submit" className="btn btn-light w-100 py-2 mb-2">
              Registrarse
            </button>
          </form>

          <div className="text-center mt-2 small">
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
