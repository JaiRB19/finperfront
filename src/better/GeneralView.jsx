import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const GeneralCardView = () => {
    return (
        <div className="container-fluid px-3 py-4">
            {/* FILA SUPERIOR */}
            <div className="row g-3 mb-3">
                <div className="col-lg-6 col-xl-4">
                    <div className="card p-3 shadow-sm border-0 rounded-4" style={{backgroundColor: "#FFFFFF"}}>
                        <h5 className="text-dark fw-semibold">Saldo Disponible</h5>
                        <p className="text-muted small">1/01/25 - 31/01/25</p>
                        <h3 className="fw-bold text-center">0 MXN</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-xl-4">
                    <div className="card p-3 shadow-sm border-0 rounded-4" style={{backgroundColor: "#FFFFFF"}}>
                        <h5 className="text-dark fw-semibold">Gastos</h5>
                        <p className="text-muted small">1/01/25 - 31/01/25</p>
                        <h3 className="fw-bold text-danger text-center">0 MXN</h3>
                    </div>
                </div>
                <div className="col-lg-3 col-xl-4">
                    <div className="card p-3 shadow-sm border-0 rounded-4" style={{backgroundColor: "#FFFFFF"}}>
                        <h5 className="text-dark fw-semibold">Ingresos</h5>
                        <p className="text-muted small">1/01/25 - 31/01/25</p>
                        <h3 className="fw-bold text-success text-center">0 MXN</h3>
                    </div>
                </div>
            </div>
            {/* FILA INFERIOR */}
            <div className="row g-3">
                {/* Últimos Movimientos */}
                <div className="col-lg-8">
                    <div className="card p-3 shadow-sm border-0 rounded-4 h-100" style={{backgroundColor: "#FFFFFF"}}>
                        <h5 className="text-dark fw-semibold">Últimos Movimientos</h5>
                        <div className="overflow-auto px-2 py-1" style={{ maxHeight: "220px"}}>
                            <p className="p-3 bg-light rounded-4 mb-2 shadow-sm" style={{ height: "70px"}}>Gasto 1 - <span className="text-danger fw-bold">0 MXN</span></p>
                            <p className="p-3 bg-light rounded-4 mb-2 shadow-sm" style={{ height: "70px"}}>Ingreso 1 - <span className="text-success fw-bold">0 MXN</span></p>
                            <p className="p-3 bg-light rounded-4 mb-2 shadow-sm" style={{ height: "70px"}}>Gasto 2 - <span className="text-danger fw-bold">0 MXN</span></p>
                            <p className="p-3 bg-light rounded-4 mb-2 shadow-sm" style={{ height: "70px"}}>Ingreso 2 - <span className="text-success fw-bold">0 MXN</span></p>
                        </div>
                    </div>
                </div>
                {/* Visualización */}
                <div className="col-lg-4">
                    <div className="card p-3 shadow-sm border-0 rounded-4 h-100" style={{backgroundColor: "#FFFFFF"}}>
                        <h5 className="text-dark fw-semibold">Visualización</h5>
                        <p className="text-muted small">1/01/25 - 31/01/25</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralCardView;
