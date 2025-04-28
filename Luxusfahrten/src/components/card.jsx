import './card.css';
import Img from '../assets/16655773891850.jpg'

function CarCard() {
    return (
      <div className="car-card">
        <div className="car-header">
            
          <h2>Porsche 911 gt3</h2>
        </div>
        <img 
          src={Img}
          alt="Porsche 911 GT3" 
          className="car-image"
        />
        <div className="car-features">
          <ul>
            <li>⚙️ Motor: 6 cilindros, 4.0 litros, atmosférico de alto régimen</li>
            <li>⚡ Potencia: 375 kW/510 PS</li>
            <li>🚀 Aceleración: de 0 a 100 km/h: 3,4 s con PDK, 3,9 s con manual</li>
            <li>🛞 Velocidad máxima: 318 km/h con PDK, 320 km/h con manual</li>
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
