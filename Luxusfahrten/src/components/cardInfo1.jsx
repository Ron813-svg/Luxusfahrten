import img from '../assets/16655773891850.jpg'
function LeftCard() {
    return (
      <div className="left-card">
        <img
          src={img}
          alt="Porsche 992 GT3"
          className="car-photo"
        />
  
        <div className="divider" />
  
        <h2>Especificaciones</h2>
        <ul>
          <li><strong>Motor:</strong> 4.0L Bóxer 6 cilindros, atmosférico</li>
          <li><strong>Potencia:</strong> 502 hp a 8,400 rpm</li>
          <li><strong>Torque:</strong> 470 Nm a 6,100 rpm</li>
          <li><strong>Transmisión:</strong>
            <ul>
              <li>Manual de 6 velocidades</li>
              <li>PDK de 7 velocidades (opcional)</li>
            </ul>
          </li>
          <li><strong>Tracción:</strong> Trasera (RWD)</li>
          <li><strong>Frenos:</strong> Discos carbono-cerámicos opcionales</li>
        </ul>
      </div>
    );
  }
  
  export default LeftCard;
  