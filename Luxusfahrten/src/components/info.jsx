
import './info.css';

// Importación de dos subcomponentes: LeftCard y RightCard, que se mostrarán en esta página.
import LeftCard from './cardInfo1';
import RightCard from './cardInfo2';

// Definición del componente principal 'details'.
function details() {
  return (
    <div className="porsche-detail">
      
      <h1>Porsche 992 911 gt3</h1> {
      <div className="card-container"> {/* Contenedor que agrupa las tarjetas */}
        <LeftCard /> 
        <RightCard /> 
      </div>
}
    </div>
  );
}


export default details;
