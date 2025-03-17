import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OpcionesCardView = () => {
  return (
    <div className="container-fluid">
      <div className="row g-4 justify-content-center">
        {/* Columna Izquierda - Opciones */}
        <div className="col-lg-6 col-xl-4 d-flex justify-content-start">
          <div
            className="card w-100 text-center shadow"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "25px",
              height: "480px",
              padding: "32px",
              border: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h5 className="text-dark fw-semibold mb-4" style={{ fontSize: "1.3rem" }}>
              Opciones
            </h5>
            <div className="text-start">
              <div className="mb-4">
                <label className="text-secondary fw-medium mb-2 d-block">Cambiar Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #E0E0E0",
                    padding: "10px 14px",
                    fontSize: "0.95rem",
                  }}
                />
              </div>

              <div className="mb-4">
                <label className="text-secondary fw-medium mb-2 d-block">Moneda</label>
                <select
                  className="form-select"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #E0E0E0",
                    padding: "10px 14px",
                    fontSize: "0.95rem",
                  }}
                >
                  <option>MXN</option>
                  <option>PEJECOINS</option>
                </select>
              </div>

              <div className="mb-4">
                <p className="text-secondary fw-medium mb-1">Exportar Archivo</p>
                <button
                  className="btn btn-sm rounded-pill px-4"
                  style={{
                    backgroundColor: "#D9632A",
                    color: "#fff",
                    border: "none",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#F78839")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#D9632A")}
                >
                  Exportar
                </button>
              </div>

              <div>
                <p className="text-danger fw-medium mb-1">Eliminar Tarjeta</p>
                <button
                  className="btn btn-sm rounded-pill px-4"
                  style={{
                    backgroundColor: "#fff",
                    color: "#D9632A",
                    border: "1px solid #D9632A",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#F78839";
                    e.target.style.color = "#fff";
                    e.target.style.borderColor = "#F78839";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#fff";
                    e.target.style.color = "#D9632A";
                    e.target.style.borderColor = "#D9632A";
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha - Operaciones */}
        <div className="col-lg-6 col-xl-4 d-flex justify-content-end">
          <div
            className="card w-100 text-center shadow"
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: "25px",
              height: "480px",
              padding: "32px",
              border: "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
            }}
          >
            <h5 className="text-dark fw-semibold mb-4" style={{ fontSize: "1.3rem" }}>
              Operaciones
            </h5>
            <div className="text-start">
              <div className="mb-4 d-flex justify-content-between align-items-center">
                <span className="text-secondary fw-medium">Simulador Virtual</span>
                <button
                  className="btn btn-sm rounded-pill px-4"
                  style={{
                    backgroundColor: "#D9632A",
                    color: "#fff",
                    border: "none",
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#F78839")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#D9632A")}
                >
                  Entrar
                </button>
              </div>
              <p className="text-muted fst-italic">Muy Pronto...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpcionesCardView;
