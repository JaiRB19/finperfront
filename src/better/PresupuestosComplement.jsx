import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const Presupuesto = () => {
    const [showForm, setShowForm] = useState(false);

    // Datos para el gráfico de barras
    const data = [
        { name: "Presupuesto", value: 5000, color: "#28a745" },
        { name: "Gastos", value: 3200, color: "#dc3545" },
        { name: "Restante", value: 1800, color: "#f39c12" },
    ];

    return (
        <div className="col-12 mb-3">
            <div className="row align-items-center">
                {/* Sección de Gráfico */}
                <div className="col-md-6 d-flex justify-content-center">
                    <div style={{ width: "100%", height: 200 }}>
                        <ResponsiveContainer>
                            <BarChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#D9632A">
                                    {data.map((entry, index) => (
                                        <Bar key={`bar-${index}`} dataKey="value" fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Sección de Información */}
                <div className="col-md-6">
                    <div className="bg-white p-4 rounded-4 shadow-sm text-center border">
                        <p className="text-muted fw-medium mb-1">
                            Restante: <span className="fw-semibold text-dark">1,800 MXN</span>
                        </p>
                        <hr className="my-2" />
                        <p className="text-muted fw-medium mb-1">
                            Presupuesto: <span className="text-success fw-semibold">5,000 MXN</span>
                        </p>
                        <p className="text-muted fw-medium">
                            Gastos: <span className="text-danger fw-semibold">3,200 MXN</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Presupuesto;
