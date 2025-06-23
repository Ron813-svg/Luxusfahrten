import img from '../assets/16655773891850.jpg';

function LeftCard({ specs, image }) {
  if (!specs) return <div className="left-card">Cargando especificaciones...</div>;

  return (
    <div className="left-card">
      {/* Imagen del vehículo */}
      <img
        src={image || img}
        alt={`${specs.marca} ${specs.modelo}`}
        className="car-photo"
      />

      {/* Línea divisoria para separar contenido visualmente. */}
      <div className="divider" />

      {/* Especificaciones técnicas del vehículo en formato de lista. */}
      <h2>Especificaciones</h2>
      <ul>
        <li><strong>Marca:</strong> {specs.marca}</li>
        <li><strong>Modelo:</strong> {specs.modelo}</li>
        <li><strong>Motor:</strong> {specs.motor}</li>
        <li><strong>Potencia:</strong> {specs.potencia}</li>
        <li><strong>Torque:</strong> {specs.torque}</li>
        <li><strong>Transmisión:</strong> {specs.transmision}</li>
        <li><strong>Tracción:</strong> {specs.traccion}</li>
        <li><strong>Frenos:</strong> {specs.frenos}</li>
        <li><strong>Aceleración:</strong> {specs.aceleracion}</li>
        <li><strong>Velocidad Máxima:</strong> {specs.velocidadMaxima}</li>
        <li><strong>Rendimiento:</strong> {specs.rendimiento}</li>
      </ul>
    </div>
  );
}

export default LeftCard;
