import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const form = useRef();
  const mapEmbedUrl = `https://www.google.com/maps/embed/v1/place?q=Av.+Paseo+del+Prestige+%23789,+Distrito+Exclusivo,+San+Salvador,+El+Salvador&key=YOUR_API_KEY`; // Reemplaza YOUR_API_KEY

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      'service_ulvcb1e',      // ervice ID de EmailJS
      'template_9i6m3vi',     // Template ID de EmailJS
      form.current,
      'hH6C2Hmdst79HJkJm'       // Mi Public Key de EmailJS
    )
    .then(() => {
      alert('Mensaje enviado correctamente');
      form.current.reset();
    }, () => {
      alert('Error al enviar el mensaje');
    });
  };

  return (
    // Contenedor principal para la sección de contacto
    // Utiliza Bootstrap para el diseño responsivo y estilos

    <div className="container py-5">
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Información de Contacto</h2>
              <p className="card-text">
                <i className="bi bi-geo-alt-fill me-2"></i>
                <strong>Dirección:</strong> Av. Paseo del Prestige #789, Distrito Exclusivo, San Salvador, El Salvador.
              </p>
              <p className="card-text">
                <i className="bi bi-telephone-fill me-2"></i>
                <strong>Teléfono:</strong> +503 2250-7890 (WhatsApp disponible).
              </p>
              <p className="card-text">
                <i className="bi bi-envelope-fill me-2"></i>
                <strong>Correo Electrónico:</strong> <a href="mailto:ventas@luxufahrten.com">ventas@luxufahrten.com</a>
              </p>
              <p className="card-text">
                <i className="bi bi-clock-fill me-2"></i>
                <strong>Horario de Atención:</strong> Lunes a Viernes: 9:00 AM - 7:00 PM | Sábados: 10:00 AM - 5:00 PM | Domingo: Cerrado.
              </p>
              {/* Mapa de Google Maps integrado */}
              
              <div className="mt-3 map-responsive">
                <iframe
                  src={mapEmbedUrl}
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa de la ubicación"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        {/* Formulario de contacto */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Formulario para contactarnos</h2>
              <form ref={form} onSubmit={sendEmail}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Ingrese su nombre:</label>
                  <input type="text" className="form-control" id="nombre" name="user_name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Ingrese su email:</label>
                  <input type="email" className="form-control" id="email" name="user_email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">Describa su Problema o Pregunta:</label>
                  <textarea className="form-control" id="mensaje" name="message" rows="4" required />
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;