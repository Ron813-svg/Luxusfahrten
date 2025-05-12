import React from 'react';
import './OrderCard.css';
// Esta es la tabla de pedidos, donde se muestran los pedidos y sus detalles
// Esta tabla es parte de la administración de pedidos y se utiliza para mostrar información sobre los pedidos realizados
const OrderCard = () => {
  const pedidos = [
    { vehiculo: 'Huayra Roadster', total: '$3,400,000' },
    { vehiculo: 'Chiron', total: '$3,500,000' },
    { vehiculo: '296 GTS', total: '$458,000' },
    { vehiculo: 'Huracan', total: '$230,000' },
    { vehiculo: 'Clase S', total: '$180,000' },
    { vehiculo: '911 Gt3', total: '$160,000' },
    { vehiculo: 'Jesko Attack', total: '$3,500,000' }
  ];

  return (
    // Esta parte seria ya la tabla en la cual se muestran los pedidos // y se pueden agregar nuevos pedidos se puede decir que es el cuerpo donde se muestran los datos
    // En esta parte se muestran los datos de ejemplos, esto seria una representacion de como se veran los datos
    <div className="order-card-container">
      <div className="order-card-header">
        <input
          type="text"
          className="order-card-search"
          placeholder="Buscar pedido..."
        />
        <button className="order-card-add-button">Agregar</button>
      </div>

      <div className="order-card-table-wrapper">
        <table className="order-card-table">
          <thead>
            <tr>
              <th>Vehículo</th>
              <th>Cliente</th>
              <th>Pago</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido, index) => (
              <tr key={index}>
                <td><em>{pedido.vehiculo}</em></td>
                <td>Cliente</td>
                <td>Tarjeta</td>
                <td>24/10/2025</td>
                <td>{pedido.total}</td>
                <td>
                  <button className="order-card-update-button">Actualizar</button>
                  <button className="order-card-delete-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderCard;
