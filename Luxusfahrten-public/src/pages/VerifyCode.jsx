import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useVerifyCode from "../hooks/useVerifyCode";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const VerifyCodePage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const verifyCode = useVerifyCode();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError("");
    const result = await verifyCode(data.code);
    if (result) {
      toast.success("¡Código verificado correctamente!");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      toast.error("El código es incorrecto o ha expirado.");
      setServerError("El código es incorrecto o ha expirado.");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#333" }}
    >
      <Toaster position="top-center" />
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
          <h4 className="text-center mb-3 fw-normal">Verificar Código</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="code" className="form-label small">
                Código de verificación
              </label>
              <input
                type="text"
                className="form-control"
                id="code"
                {...register("code", { required: "El código es obligatorio" })}
                placeholder="Ingresa el código recibido"
              />
              {errors.code && (
                <span className="text-danger small">{errors.code.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-light w-100 py-2 mb-2">
              Verificar
            </button>
            {serverError && (
              <div className="text-danger mt-3 text-center">{serverError}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;