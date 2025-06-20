import React from 'react';

// Utilidades para manejo de imágenes
const resizeImage = (file, maxWidth = 300, maxHeight = 300, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const resizedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(resizedBase64);
    };

    img.src = URL.createObjectURL(file);
  });
};

const RegisterEmpleado = ({ 
  formData, 
  setFormData, 
  handleSubmit, 
  cleanData, 
  setActiveTab, 
  loading 
}) => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Función para manejar la subida de imágenes
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es demasiado grande. Máximo 5MB');
      return;
    }

    try {
      // Mostrar loading
      setFormData(prev => ({ ...prev, imageLoading: true }));
      
      // Redimensionar imagen para optimizar
      const resizedImage = await resizeImage(file, 300, 300, 0.8);
      
      setFormData(prev => ({
        ...prev,
        image: resizedImage,
        imageLoading: false
      }));
    } catch (error) {
      console.error('Error al procesar la imagen:', error);
      alert('Error al procesar la imagen');
      setFormData(prev => ({ ...prev, imageLoading: false }));
    }
  };

  // Función para remover imagen
  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: ""
    }));
    // Limpiar el input file
    const fileInput = document.getElementById('imageFile');
    if (fileInput) fileInput.value = '';
  };

  const handleCancel = () => {
    cleanData();
    setActiveTab("list");
  };

  const tiposEmpleado = [
    "Vendedor",
    "Gerente", 
    "Mecánico",
    "Contador",
    "Recepcionista",
    "Supervisor"
  ];

  return (
    <div
      className="shadow-lg"
      style={{
        background: "#5a5a5a",
        border: "none",
        borderRadius: "1.5rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        color: "#fff",
        padding: "2rem",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1
          className="fw-bold"
          style={{
            color: "#00fff7",
            letterSpacing: "2px",
          }}
        >
          {formData.id ? "Editar Empleado" : "Registrar Empleado"}
        </h1>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={handleCancel}
          style={{ borderRadius: "20px" }}
        >
          ← Volver
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Nombre completo */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#00fff7' }}>
              Nombre Completo *
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #00fff7',
                color: 'white',
                borderRadius: '10px'
              }}
              placeholder="Ingresa el nombre completo"
            />
          </div>

          {/* Email */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#00fff7' }}>
              Email *
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #00fff7',
                color: 'white',
                borderRadius: '10px'
              }}
              placeholder="correo@ejemplo.com"
            />
          </div>

          {/* Teléfono */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#00fff7' }}>
              Teléfono *
            </label>
            <input
              type="tel"
              name="telephone"
              className="form-control"
              value={formData.telephone}
              onChange={handleInputChange}
              required
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #00fff7',
                color: 'white',
                borderRadius: '10px'
              }}
              placeholder="7890-1234"
            />
          </div>

          {/* Tipo de empleado */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#00fff7' }}>
              Puesto
            </label>
            <select
              name="employeeType"
              className="form-select"
              value={formData.employeeType}
              onChange={handleInputChange}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #00fff7',
                color: 'white',
                borderRadius: '10px'
              }}
            >
              {tiposEmpleado.map(tipo => (
                <option key={tipo} value={tipo} style={{ backgroundColor: '#5a5a5a', color: 'white' }}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Fecha de nacimiento */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#00fff7' }}>
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              name="birthday"
              className="form-control"
              value={formData.birthday}
              onChange={handleInputChange}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #00fff7',
                color: 'white',
                borderRadius: '10px'
              }}
            />
          </div>

          {/* Fecha de ingreso */}
          <div className="col-md-6 mb-3">
            <label className="form-label" style={{ color: '#00fff7' }}>
              Fecha de Ingreso
            </label>
            <input
              type="date"
              name="actualDate"
              className="form-control"
              value={formData.actualDate}
              onChange={handleInputChange}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #00fff7',
                color: 'white',
                borderRadius: '10px'
              }}
            />
          </div>

          {/* Dirección */}
          <div className="col-12 mb-3">
            <label className="form-label" style={{ color: '#00fff7' }}>
              Dirección
            </label>
            <textarea
              name="address"
              className="form-control"
              rows="2"
              value={formData.address}
              onChange={handleInputChange}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid #00fff7',
                color: 'white',
                borderRadius: '10px'
              }}
              placeholder="Dirección completa del empleado"
            />
          </div>

          {/* Sección de imagen */}
          <div className="col-12 mb-4">
            <label className="form-label" style={{ color: '#00fff7' }}>
              Foto del Empleado
            </label>
            
            {/* Preview de la imagen */}
            <div className="text-center mb-3">
              <div 
                className="d-inline-block position-relative"
                style={{
                  width: '150px',
                  height: '150px',
                  border: '2px dashed #00fff7',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(0, 255, 247, 0.1)'
                }}
              >
                {formData.image ? (
                  <>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="btn btn-danger btn-sm position-absolute"
                      style={{
                        top: '5px',
                        right: '5px',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        padding: '0',
                        fontSize: '12px',
                        zIndex: 10
                      }}
                      title="Remover imagen"
                    >
                      ×
                    </button>
                  </>
                ) : formData.imageLoading ? (
                  <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <div className="spinner-border text-info mb-2" role="status">
                      <span className="visually-hidden">Procesando...</span>
                    </div>
                    <small style={{ color: '#00fff7' }}>Procesando imagen...</small>
                  </div>
                ) : (
                  <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <svg
                      width="40"
                      height="40"
                      fill="#00fff7"
                      viewBox="0 0 24 24"
                      className="mb-2"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <small style={{ color: '#00fff7' }}>Click para agregar foto</small>
                  </div>
                )}
              </div>
            </div>

            {/* Input para subir archivo */}
            <div className="mb-3">
              <div className="d-flex align-items-center gap-3">
                <label 
                  htmlFor="imageFile" 
                  className="btn btn-outline-info"
                  style={{
                    borderColor: '#00fff7',
                    color: '#00fff7',
                    borderRadius: '20px',
                    cursor: 'pointer'
                  }}
                >
                  📁 Seleccionar desde computadora
                </label>
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
                {formData.image && (
                  <button
                    type="button"
                    onClick={removeImage}
                    className="btn btn-outline-danger btn-sm"
                    style={{ borderRadius: '20px' }}
                  >
                    🗑️ Quitar imagen
                  </button>
                )}
              </div>
              <small className="text-muted d-block mt-2">
                📋 Formatos: JPG, PNG, GIF, WebP • Máximo: 5MB • Se optimizará automáticamente
              </small>
            </div>

            {/* Opción alternativa con URL */}
            <div className="mt-3">
              <label className="form-label" style={{ color: '#888' }}>
                O ingresa una URL de imagen:
              </label>
              <input
                type="url"
                name="image"
                className="form-control"
                value={formData.image && !formData.image.startsWith('data:') ? formData.image : ''}
                onChange={handleInputChange}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid #666',
                  color: 'white',
                  borderRadius: '10px'
                }}
                placeholder="https://ejemplo.com/foto.jpg"
              />
            </div>
          </div>

          {/* Contraseña solo para nuevos empleados */}
          {!formData.id && (
            <div className="col-12 mb-3">
              <label className="form-label" style={{ color: '#00fff7' }}>
                Contraseña *
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleInputChange}
                required={!formData.id}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid #00fff7',
                  color: 'white',
                  borderRadius: '10px'
                }}
                placeholder="Contraseña para el empleado"
              />
            </div>
          )}
        </div>

        {/* Botones */}
        <div className="d-flex justify-content-end gap-3 mt-4">
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleCancel}
            disabled={loading}
            style={{ borderRadius: "20px", padding: "10px 25px" }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="btn fw-bold"
            disabled={loading}
            style={{
              backgroundColor: '#00fff7',
              color: '#000',
              borderRadius: '20px',
              padding: '10px 25px',
              border: 'none'
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                {formData.id ? "Actualizando..." : "Guardando..."}
              </>
            ) : (
              formData.id ? "Actualizar Empleado" : "Registrar Empleado"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterEmpleado;