import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CardsInter = ({
    ingreso1 = "", ingreso2 = "", ingreso3 = "",
    gasto1 = "", gasto2 = "", gasto3 = "",
    saldototal = ""
}) => {
    return (
        <div className="container my-4">
            <div className="card shadow p-4">
                <div className="row g-3 align-items-center">
                    {/* Tarjeta de crédito */}
                    <div className="col-md-4">
                        <div className="p-3 text-white bg-primary rounded-3 position-relative" style={{ height: "160px" }}>
                            <div className="fs-5">**** **** **** *123</div>
                            <div className="position-absolute bottom-0 end-0 p-3 fw-bold fs-4">VISA</div>
                        </div>
                    </div>

                    {/* Transacciones */}
                    <div className="col-md-5">
                        <div className="bg-light p-3 rounded">
                            <h6 className="text-muted">ÚLTIMOS INGRESOS</h6>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold">${ingreso1}</span>
                                <span className="fw-bold">${ingreso2}</span>
                                <span className="fw-bold">${ingreso3}</span>
                            </div>
                            <hr />
                            <h6 className="text-muted">ÚLTIMOS GASTOS</h6>
                            <div className="d-flex justify-content-between">
                                <span className="fw-bold">${gasto1}</span>
                                <span className="fw-bold">${gasto2}</span>
                                <span className="fw-bold">${gasto3}</span>
                            </div>
                        </div>
                    </div>

                    {/* Saldo Total */}
                    <div className="col-md-3 text-center">
                        <h6 className="text-muted">SALDO</h6>
                        <div className="fs-4 fw-bold">${saldototal}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsInter;
