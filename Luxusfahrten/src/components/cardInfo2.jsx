
import { useNavigate } from 'react-router-dom';

function RightCard() {
 
  const navigate = useNavigate();

  // Función que se ejecuta al hacer clic en el botón "Precio desde", redirigiendo a la ruta '/Compra/'.
  const goToCompra = () => {
    navigate('/Compra/');
  };

  return (
    <div className="right-card">
      {/* Sección con dos columnas de información (Historia y Rendimiento). */}
      <div className="info-columns">
        <div>
          <h3>Historia</h3>
          <p>
            Describe brevemente la historia del vehículo o marca en formato de texto simple.
          </p>
        </div>
        <div>
          <h3>Rendimiento</h3>
          <p>
            Presenta aspectos importantes del rendimiento del vehículo, como velocidad o eficiencia.
          </p>
        </div>
      </div>

      
      <hr />

      {/* Opciones personalizables, como colores y diseño del coche. */}
      <h3>Opciones</h3>
      <div className="options-row">
        <div className="option-group">
          <h4 className="blue-title">Diseño</h4> 
          <p>Color exterior (6)</p>
          <div className="colors">
            <span className="color-circle white" /> 
          </div>
        </div>
        <div className="option-group">
          <h4>Accesorios</h4> 
          <p>Color interior (2)</p>
          <div className="colors">
            <span className="color-circle black" />
            <span className="color-circle blue" /> 
          </div>
        </div>
      </div>

    
      <h2 className="price-label">Precio desde:</h2>
      <button className="price-button" onClick={goToCompra}>$180,000</button>
    </div>
  );
}


export default RightCard;
