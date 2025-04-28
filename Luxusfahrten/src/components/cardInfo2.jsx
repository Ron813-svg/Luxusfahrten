import { Link, useNavigate } from 'react-router-dom';

function RightCard() {
  const navigate = useNavigate();

  const goToCompra = () => {
    navigate('/Compra/');
  };
    return (
      <div className="right-card">
        <div className="info-columns">
          <div>
            <h3>Historia</h3>
            <p>
              Nulla et porta ante. Sed quam felis, aliquam non laoreet ac, porttitor vel velit.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </p>
          </div>
          <div>
            <h3>Rendimiento</h3>
            <p>
              Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris pretium urna
              nec risus lacinia.
            </p>
          </div>
        </div>
  
        <hr />
  
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
  