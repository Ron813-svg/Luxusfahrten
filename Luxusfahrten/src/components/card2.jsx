import './card2.css';
import Img from '../assets/OIP.jpg'

function CarCard() {
    return (
      <div className="car-card">
        <div className="car-header">
            
          <h2>Nissan Skyline R34</h2>
        </div>
        <img 
          src={Img}
          alt="Nissan Skyline R34" 
          className="car-image"
        />
        <div className="car-features">
          <ul>
            <li>⚙️ Motor: RB26DETT 2.6L DOHC Twin-Turbo L6 (6 cilindros en línea)</li>
            <li>⚡ Potencia: 276 hp (oficialmente) / Puede superar los 330 hp reales</li>
            <li>🚀Aceleración (0-100 km/h): 4.9 segundos</li>
            <li>🛞 Velocidad Máxima: 250 km/h (limitada electrónicamente)</li>
          </ul>
        </div>
        <div className="key-features">
          Standard key features
        </div>
        <button className="info-button">Mas Información</button>
        <div className="legal-info">
          Legal Information
        </div>
      </div>
    );
  }

export default CarCard;
