import React from 'react';
import './BrandCard.css';

const BrandCard = () => {
  const marcas = [
    "Pagani", "Bugatti", "Ferrari", "Lamborguini",
    "Mercedes", "Porsche", "koenigsegg"
  ];
// Esta es la tabla de marcas, donde se muestran las marcas y sus detalles
// Esta tabla es parte de la administración de marcas y se utiliza para mostrar información sobre las marcas disponibles
// y permitir la adición, actualización y eliminación de marcas

  return (
      // Esta parte seria ya la tabla en la cual se muestran las marcas
    <div className="brand-card-container">
      <div className="brand-card-form">
        <div className="brand-card-input-group">
          <label className="brand-card-label">Nombre Marca</label>
          <input
            type="text"
            className="brand-card-input"
            placeholder="Ingrese el nombre de la marca"
          />
        </div>
        <button className="brand-card-add-button">Agregar</button>
      </div>

      <div className="brand-card-table-wrapper">
        <table className="brand-card-table">
          <thead>
            <tr>
              <th>Nombre Marca</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((marca, index) => (
              <tr key={index}>
                <td><em>{marca}</em></td>
                <td>
                  <button className="brand-card-update-button">Actualizar</button>
                  <button className="brand-card-delete-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BrandCard;
