import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Datos para la gráfica de barras
  const ventasData = [
    { name: 'Categoría 1', valor: 75, resto: 25, color: '#FF6B6B' },
    { name: 'Categoría 2', valor: 65, resto: 35, color: '#FFEB3B' },
    { name: 'Categoría 3', valor: 85, resto: 15, color: '#5D6BF8' },
    { name: 'Categoría 4', valor: 95, resto: 5, color: '#F06BF8' },
    { name: 'Categoría 5', valor: 55, resto: 45, color: '#6BF878' },
  ];

  // Datos para la gráfica de líneas
  const ordenesData = [
    { name: 'Ene', valor: 400 },
    { name: 'Feb', valor: 1200 },
    { name: 'Mar', valor: 400 },
    { name: 'Abr', valor: 700 },
    { name: 'May', valor: 400 },
    { name: 'Jun', valor: 500 },
    { name: 'Jul', valor: 400 },
    { name: 'Ago', valor: 1100 },
    { name: 'Sep', valor: 400 },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#9E9E9E' }}>
      <div className="container p-4" style={{ backgroundColor: '#555', borderRadius: '10px', maxWidth: '1000px' }}>
        <h1 className="text-center text-white mb-4">Bienvenido a Luxusfahrten</h1>
        
        <div className="row g-3">
          {/* Panel izquierdo con KPIs */}
          <div className="col-md-4">
            {/* KPI 1 */}
            <div className="card mb-3">
              <div className="card-body text-center py-4">
                <h2 className="display-5 fw-bold">19.41 mil</h2>
                <p className="text-muted small">Suma de monto</p>
              </div>
            </div>
            
            {/* KPI 2 */}
            <div className="card mb-3">
              <div className="card-body text-center py-4">
                <h2 className="display-5 fw-bold">2023-01-01</h2>
                <p className="text-muted small">Primera fecha: última_revision_tecnica</p>
              </div>
            </div>
            
            {/* KPI 3 */}
            <div className="card">
              <div className="card-body text-center py-4">
                <h2 className="display-5 fw-bold">967</h2>
                <p className="text-muted small">Suma de longitud_km</p>
              </div>
            </div>
          </div>
          
          {/* Panel derecho con gráficos */}
          <div className="col-md-8">
            {/* Gráfico de barras */}
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title text-center">Ventas</h5>
                <div style={{ height: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={ventasData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" hide />
                      <Tooltip />
                      {ventasData.map((entry, index) => (
                        <Bar 
                          key={`bar-${index}`}
                          dataKey="valor" 
                          stackId="a" 
                          fill="#F5A9A9" 
                          background={{ fill: '#B5B3FF' }}
                          radius={0} 
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                  
                  {/* Indicadores de colores a la izquierda */}
                  <div className="d-flex flex-column position-absolute" style={{ top: '50%', transform: 'translateY(-50%)', left: '20px' }}>
                    {ventasData.map((entry, index) => (
                      <div key={`indicator-${index}`} className="mb-3" style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: entry.color }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Gráfico de líneas */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-center">Órdenes</h5>
                <div style={{ height: '200px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={ordenesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <YAxis hide />
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="valor" 
                        stroke="#F06BF8" 
                        strokeWidth={2} 
                        dot={{ fill: '#F06BF8', r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;