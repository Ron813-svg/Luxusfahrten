import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import useLoginUser from '../hooks/useLoginUser';

function CompraForm() {
  const navigate = useNavigate();
  const { userInfo, isLoggedIn, loading: authLoading } = useLoginUser();
  const { register, handleSubmit, formState: { errors, isValid }, reset, watch, setValue, trigger } = useForm({ 
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      documentId: '',
      phone: '',
      email: '',
      address: '',
      paymentMethod: '',
      insuranceSelected: false,
      termsAccepted: false
    }
  });
  const [formData, setFormData] = useState(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);

  // Observar todos los valores del formulario
  const watchedValues = watch();
  const termsAccepted = watch('termsAccepted');

  // Debug: Mostrar el estado del formulario
  useEffect(() => {
    console.log('🔍 Estado del formulario:', {
      isValid,
      errors,
      values: watchedValues
    });
  }, [isValid, errors, watchedValues]);

  // Efecto para llenar automáticamente los datos del usuario
  useEffect(() => {
    if (isLoggedIn && userInfo && !userDataLoaded) {
      console.log('Datos del usuario logueado:', userInfo);
      
      // Llenar automáticamente los campos con los datos del usuario
      const fullName = `${userInfo.name || ''} ${userInfo.lastName || ''}`.trim();
      
      setValue('fullName', fullName);
      setValue('documentId', userInfo.document || '');
      setValue('phone', userInfo.telephone || userInfo.phone || '');
      setValue('email', userInfo.email || '');
      setValue('address', userInfo.address || '');
      
      setUserDataLoaded(true);
      
      // Después de setear los valores, re-validar el formulario
      setTimeout(() => {
        trigger();
      }, 100);
      
      if (fullName) {
        toast.success('Se han cargado automáticamente sus datos de perfil');
      }
    }
  }, [isLoggedIn, userInfo, setValue, userDataLoaded, trigger]);

  // Efecto para verificar autenticación
  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      toast.error('Debe iniciar sesión para acceder al formulario de compra');
      navigate('/login');
    }
  }, [isLoggedIn, authLoading, navigate]);

  // Función para validar manualmente todos los campos
  const validateAllFields = () => {
    const requiredFields = ['fullName', 'documentId', 'phone', 'email', 'address', 'paymentMethod', 'termsAccepted'];
    const values = watchedValues;
    
    for (const field of requiredFields) {
      if (!values[field] || values[field] === '') {
        console.error(`❌ Campo requerido vacío: ${field}`, values[field]);
        return false;
      }
    }
    
    if (!values.termsAccepted) {
      console.error('❌ Términos y condiciones no aceptados');
      return false;
    }
    
    return true;
  };

  const onSubmit = (data) => {
    console.log('📝 Datos del formulario en submit:', data);
    
    // Validación adicional manual
    if (!validateAllFields()) {
      toast.error("Por favor complete todos los campos obligatorios");
      return;
    }

    // Validar que se hayan aceptado los términos
    if (!data.termsAccepted) {
      toast.error("Debe aceptar los términos y condiciones para continuar");
      return;
    }

    // Agregar el ID del usuario logueado a los datos
    const dataWithUserId = {
      ...data,
      userId: userInfo?._id,
      clienteId: userInfo?._id
    };

    // Guardar los datos en localStorage
    localStorage.setItem('datosCompra', JSON.stringify(dataWithUserId));
    localStorage.setItem('clienteId', userInfo?._id);
    
    toast.success("Formulario guardado correctamente");
    
    setFormData(dataWithUserId);
    console.log("Datos guardados localmente:", dataWithUserId);
    
    // Navegar a la página de resumen
    setTimeout(() => {
      navigate('/CompraFinal/');
    }, 1000);
  };

  // Función para forzar el envío del formulario si todo está completo
  const handleForceSubmit = () => {
    const values = watchedValues;
    console.log('🔄 Forzando envío con valores:', values);
    
    if (validateAllFields()) {
      onSubmit(values);
    } else {
      toast.error("Complete todos los campos obligatorios antes de continuar");
      // Forzar re-validación
      trigger();
    }
  };

  // Mostrar loading mientras se verifica la autenticación
  if (authLoading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Verificando autenticación...</span>
          </div>
          <p className="mt-3">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // No mostrar el formulario si no está logueado
  if (!isLoggedIn) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <h4>Acceso restringido</h4>
          <p>Debe iniciar sesión para acceder al formulario de compra.</p>
          <button 
            className="btn btn-primary" 
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  // Verificar si todos los campos obligatorios están llenos manualmente
  const allFieldsValid = validateAllFields();

  return (
    <div className="container mt-4">
      <Toaster position="top-center" />
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Formulario de Compra</h2>
            {userInfo && (
              <div className="text-end">
                <small className="text-muted">Logueado como:</small>
                <br />
                <strong>{userInfo.name} {userInfo.lastName}</strong>
                <br />
                <small className="text-primary">{userInfo.email}</small>
              </div>
            )}
          </div>

          {/* Debug Info - Remover en producción */}
          <div className="alert alert-info mb-3">
            <small>
              <strong>Debug:</strong> isValid: {isValid.toString()}, 
              allFieldsValid: {allFieldsValid.toString()}, 
              termsAccepted: {termsAccepted.toString()}
            </small>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="border p-4 shadow rounded bg-light">
            
            {/* Información Personal */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-primary mb-0">Información Personal</h4>
              {userDataLoaded && (
                <span className="badge bg-success">
                  <i className="bi bi-check-circle me-1"></i>
                  Auto-completado
                </span>
              )}
            </div>
            
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Nombre Completo *</label>
                <input
                  type="text"
                  className={`form-control ${errors.fullName ? 'is-invalid' : userDataLoaded ? 'is-valid' : ''}`}
                  {...register("fullName", { 
                    required: "El nombre completo es obligatorio",
                    minLength: { value: 2, message: "El nombre debe tener al menos 2 caracteres" }
                  })}
                  placeholder="Ej: Juan Pérez García"
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
                {userDataLoaded && !errors.fullName && (
                  <div className="valid-feedback">Cargado desde su perfil</div>
                )}
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Número de Documento *</label>
                <input
                  type="text"
                  className={`form-control ${errors.documentId ? 'is-invalid' : userDataLoaded ? 'is-valid' : ''}`}
                  {...register("documentId", { 
                    required: "El número de documento es obligatorio",
                    pattern: { 
                      value: /^[0-9-]+$/, 
                      message: "Solo se permiten números y guiones" 
                    }
                  })}
                  placeholder="Ej: 12345678-9"
                />
                {errors.documentId && <div className="invalid-feedback">{errors.documentId.message}</div>}
                {userDataLoaded && !errors.documentId && (
                  <div className="valid-feedback">Cargado desde su perfil</div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Teléfono *</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? 'is-invalid' : userDataLoaded ? 'is-valid' : ''}`}
                  {...register("phone", { 
                    required: "El teléfono es obligatorio",
                    pattern: { 
                      value: /^[0-9+\-\s()]+$/, 
                      message: "Formato de teléfono no válido" 
                    }
                  })}
                  placeholder="Ej: +503 7000-0000"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                {userDataLoaded && !errors.phone && (
                  <div className="valid-feedback">Cargado desde su perfil</div>
                )}
              </div>
              
              <div className="col-md-6">
                <label className="form-label">Correo Electrónico *</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : userDataLoaded ? 'is-valid' : ''}`}
                  {...register("email", { 
                    required: "El correo electrónico es obligatorio",
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
                      message: "Formato de correo electrónico no válido" 
                    }
                  })}
                  placeholder="Ej: juan@correo.com"
                  readOnly={userDataLoaded}
                />
                {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                {userDataLoaded && !errors.email && (
                  <div className="valid-feedback">Cargado desde su perfil</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Dirección de Entrega *</label>
              <textarea
                className={`form-control ${errors.address ? 'is-invalid' : userDataLoaded && watch('address') ? 'is-valid' : ''}`}
                rows="3"
                {...register("address", { 
                  required: "La dirección es obligatoria",
                  minLength: { value: 10, message: "La dirección debe ser más específica" }
                })}
                placeholder="Ingrese su dirección completa incluyendo colonia, ciudad y referencias"
              />
              {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
              {userDataLoaded && watch('address') && !errors.address && (
                <div className="valid-feedback">Cargado desde su perfil</div>
              )}
            </div>

            <hr />

            {/* Información de Pago */}
            <h4 className="mb-3 text-primary">Información de Pago</h4>
            
            <div className="mb-3">
              <label className="form-label">Método de Pago *</label>
              <select
                className={`form-select ${errors.paymentMethod ? 'is-invalid' : ''}`}
                {...register("paymentMethod", { required: "El método de pago es obligatorio" })}
              >
                <option value="">Seleccione un método de pago...</option>
                <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                <option value="transferencia">Transferencia Bancaria</option>
                <option value="efectivo">Pago en Efectivo</option>
              </select>
              {errors.paymentMethod && <div className="invalid-feedback">{errors.paymentMethod.message}</div>}
            </div>

            <hr />

            {/* Opciones Adicionales */}
            <h4 className="mb-3 text-primary">Opciones Adicionales</h4>
            
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="insuranceSelected"
                  {...register("insuranceSelected")}
                />
                <label className="form-check-label" htmlFor="insuranceSelected">
                  <strong>¿Desea contratar seguro del vehículo?</strong>
                  <small className="text-muted d-block">
                    Proteja su inversión con nuestro seguro completo (opcional)
                  </small>
                </label>
              </div>
            </div>

            <hr />

            {/* Términos y Condiciones */}
            <h4 className="mb-3 text-primary">Términos y Condiciones</h4>
            
            <div className="mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className={`form-check-input ${errors.termsAccepted ? 'is-invalid' : ''}`}
                  id="termsAccepted"
                  {...register("termsAccepted", { required: "Debe aceptar los términos y condiciones" })}
                />
                <label className="form-check-label" htmlFor="termsAccepted">
                  <strong>Acepto los términos y condiciones *</strong>
                  <a href="/TerminosCondiciones" target="_blank" className="ms-2 text-primary">
                    (Leer términos y condiciones)
                  </a>
                </label>
                {errors.termsAccepted && (
                  <div className="invalid-feedback d-block">{errors.termsAccepted.message}</div>
                )}
              </div>
            </div>

            {termsAccepted && (
              <div className="alert alert-success" role="alert">
                <strong>¡Perfecto!</strong> Ha aceptado los términos y condiciones. Puede proceder con la compra.
              </div>
            )}

            <div className="d-grid gap-2">
              {/* Botón principal del formulario */}
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={!allFieldsValid}
              >
                {!allFieldsValid ? 'Complete todos los campos obligatorios' : 'Continuar con el Resumen'}
              </button>
              
              {/* Botón alternativo para forzar envío */}
              {!isValid && allFieldsValid && (
                <button
                  type="button"
                  className="btn btn-success btn-lg"
                  onClick={handleForceSubmit}
                >
                  Forzar Envío (Todos los campos están completos)
                </button>
              )}
            </div>

            <small className="text-muted d-block mt-2 text-center">
              Los campos marcados con * son obligatorios
            </small>
          </form>

          {formData && (
            <div className="mt-4 p-3 bg-light border rounded">
              <h5>✅ Datos guardados correctamente</h5>
              <small className="text-muted">
                Puede proceder al resumen de compra o modificar la información si es necesario.
              </small>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompraForm;