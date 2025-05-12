
import './card2.css';
import Img from '../assets/OIP.jpg';
import { useNavigate } from 'react-router-dom';

function NissanCard() {
  // Hook para navegación programática entre páginas.
  const navigate = useNavigate();

  // Función que redirige al usuario a la página de información del vehículo.
  const goToInfo = () => {
    navigate('/Informacion/');
  };

  return (
    <div className="nissan-card">
 
      <div className="nissan-header">
        <h2>Nissan Skyline R34</h2>
      </div>

      {/* Imagen del vehículo */}
      <img 
        src={Img} 
        alt="Nissan Skyline R34" 
        className="nissan-image"
      />

      {/* Lista de características principales */}
      <div className="nissan-features">
        <ul>
          <li>⚙️ Motor: RB26DETT 2.6L DOHC Twin-Turbo L6 (6 cilindros en línea)</li>
          <li>⚡ Potencia: 276 hp (oficialmente) / Puede superar los 330 hp reales</li>
          <li>🚀 Aceleración (0-100 km/h): 4.9 segundos</li>
          <li>🛞 Velocidad Máxima: 250 km/h (limitada electrónicamente)</li>
        </ul>
      </div>

     
      <button className="nissan-more-info-button" onClick={goToInfo}>Mas Información</button>

      <div className="nissan-legal-notice">
        Legal Information
      </div>
    </div>
  );
}

export default NissanCard;
