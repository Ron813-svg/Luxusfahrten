// Función para redimensionar imagen manteniendo la calidad
export const resizeImage = (file, maxWidth = 300, maxHeight = 300, quality = 0.8) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      // Calcular nuevas dimensiones manteniendo aspect ratio
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

      // Configurar canvas
      canvas.width = width;
      canvas.height = height;

      // Dibujar imagen redimensionada
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir a base64
      const resizedBase64 = canvas.toDataURL('image/jpeg', quality);
      resolve(resizedBase64);
    };

    img.src = URL.createObjectURL(file);
  });
};

// Función para validar archivos de imagen
export const validateImageFile = (file) => {
  const errors = [];

  // Verificar que sea una imagen
  if (!file.type.startsWith('image/')) {
    errors.push('El archivo debe ser una imagen');
  }

  // Verificar tamaño (máximo 5MB)
  if (file.size > 5 * 1024 * 1024) {
    errors.push('La imagen no puede superar los 5MB');
  }

  // Verificar formatos permitidos
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    errors.push('Formato no permitido. Use JPG, PNG, GIF o WebP');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};