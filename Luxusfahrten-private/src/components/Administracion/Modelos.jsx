import React, { useState } from 'react';
import './Models.css';
//Esta es la tabla de modelos, donde se muestran los modelos y sus detalles
//Aqui se separan cada uno de los modelos de los autos con su respectiva marca
//Esta tabla es parte de la administración de modelos y se utiliza para mostrar información sobre los modelos disponibles
const Models = () => {
  const [models, setModels] = useState([
    { brand: 'Pagani', model: 'Huayra Roadster' },
    { brand: 'Bugatti', model: 'Chiron' },
    { brand: 'Ferrari', model: '296 GTS' },
    { brand: 'Lamborguini', model: 'Huracan' },
    { brand: 'Mercedes', model: 'Clase S' },
    { brand: 'Porshe', model: '911 Gt3' },
    { brand: 'Koenigsegg', model: 'Jesko Attack' },
  ]);

  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');

  const addModel = () => {
    if (newBrand && newModel) {
      setModels([...models, { brand: newBrand, model: newModel }]);
      setNewBrand('');
      setNewModel('');
    }
  };

  return (
    // Esta parte seria ya la tabla en la cual se muestran los modelos
    <div className="models-container">
      <div className="form">
        <select
          className="input-select"
          value={newBrand}
          onChange={(e) => setNewBrand(e.target.value)}
          
        >
          <option value="">Seleccione la marca</option>
          <option value="Pagani">Pagani</option>
          <option value="Bugatti">Bugatti</option>
          <option value="Ferrari">Ferrari</option>
          <option value="Lamborguini">Lamborguini</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Porshe">Porshe</option>
          <option value="Koenigsegg">Koenigsegg</option>
        </select>

        <input
          type="text"
          placeholder="Ingrese el nombre del modelo"
          className="input-text"
          value={newModel}
          onChange={(e) => setNewModel(e.target.value)}
        />

        <button onClick={addModel} className="btn-add">
          Agregar
        </button>
      </div>

      <table className="models-table">
        <thead>
          <tr>
            <th>Nombre de la Marca</th>
            <th>Nombre del modelo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {models.map((item, index) => (
            <tr key={index}>
              <td>{item.brand}</td>
              <td className="italic">{item.model}</td>
              <td>
                <button className="btn-edit">Actualizar</button>
                <button className="btn-delete">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Models;
