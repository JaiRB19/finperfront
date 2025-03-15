import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Presupuesto = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="col-12 mb-3">
            <div className="row align-items-center">
                {/* Sección de Gráfico */}
                <div className="col-md-6 d-flex justify-content-center">
                    <p className="fw-semibold text-dark">📊 Gráfico de Barras</p>
                </div>

                {/* Sección de Información */}
                <div className="col-md-6">
                    <div className="bg-white p-4 rounded-4 shadow-sm text-center border">
                        <p className="text-muted fw-medium mb-1">
                            Restante: <span className="fw-semibold">0 MXN</span>
                        </p>
                        <hr className="my-2" />
                        <p className="text-muted fw-medium mb-1">
                            Presupuesto: <span className="text-success fw-semibold">0 MXN</span>
                        </p>
                        <p className="text-muted fw-medium">
                            Gastos: <span className="text-danger fw-semibold">0 MXN</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Presupuesto;
