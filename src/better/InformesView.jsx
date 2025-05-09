import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../components/axios";
import Presupuesto from "./PresupuestosComplement";

const InformesCardView = () => {
  const [showForm, setShowForm] = useState(false);
  const [customCategory, setCustomCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ expense: 0, income: 0, balance: 0 });

  // 1) Carga estadísticas mensuales
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const { data } = await api.get("/api/dashboard/summary", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSummary(data.data);
      } catch (err) {
        console.error("Error cargando estadísticas:", err);
      }
    })();
  }, []);

  // 2) Carga presupuestos del mes actual
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const { data } = await api.get("/api/budgets", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBudgets(data.data);
      } catch (err) {
        console.error("Error cargando presupuestos:", err);
      }
    })();
  }, []);

  // 3) Carga todas las transacciones del usuario
  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("auth_token");
        const { data } = await api.get("/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(data.data);
      } catch (err) {
        console.error("Error cargando transacciones:", err);
      }
    })();
  }, []);

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleCustomCategoryChange = (e) => setCustomCategory(e.target.value);
  const handleAmountChange = (e) => setBudgetAmount(e.target.value);

  // Guardar nuevo presupuesto
  const handleSave = async () => {
    const categoryToSave = selectedCategory === "Otro" ? customCategory : selectedCategory;
    if (!budgetAmount || !categoryToSave) {
      return alert("Debe indicar monto y categoría.");
    }
    try {
      const token = localStorage.getItem("auth_token");
      const { data } = await api.post(
        "/api/budgets",
        { amount: parseFloat(budgetAmount), category: categoryToSave },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBudgets((prev) => [...prev, data.data]);
      setBudgetAmount("");
      setSelectedCategory("");
      setCustomCategory("");
      setShowForm(false);
    } catch (err) {
      console.error("Error guardando presupuesto:", err);
      alert("No se pudo guardar el presupuesto.");
    }
  };

  // Para la barra de progreso de arriba
  const total = Math.abs(summary.expense) + summary.income;
  const expensePct = total > 0 ? (Math.abs(summary.expense) / total) * 100 : 0;
  const incomePct = total > 0 ? (summary.income / total) * 100 : 100;

  return (
    <div className="container-fluid px-3 py-4">
      {/* FILA SUPERIOR */}
      <div className="row g-3 mb-3">
        <div className="col-md-8">
          <div className="card p-4 border-0 shadow-sm rounded-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-dark fw-semibold m-0">Estadísticas Mensuales</h5>
              <button className="btn p-0" aria-label="Ver más">
                <i className="bi bi-chevron-right text-dark"></i>
              </button>
            </div>
            <div className="mb-2">
              <div className="d-flex align-items-center">
                <div className="me-auto">
                  <p className="fw-semibold text-muted mb-1">Mes Actual</p>
                  <p className="fw-500 fs-6 mb-0" style={{ color: "#ff9800", fontSize: "18px" }}>
                    "Controlar las finanzas transforma el caos en claridad."
                  </p>
                </div>
                <div className="d-flex gap-4">
                  <div className="text-center">
                    <p className="text-secondary fw-semibold small mb-1">Gastos</p>
                    <p className="fw-bold text-danger mb-0">
                      -{Math.abs(summary.expense).toLocaleString()} MXN
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-secondary fw-semibold small mb-1">Ingresos</p>
                    <p className="fw-bold text-success mb-0">+{summary.income.toLocaleString()} MXN</p>
                  </div>
                  <div className="text-center">
                    <p className="text-secondary fw-semibold small mb-1">Saldo</p>
                    <p className="fw-bold text-dark mb-0">{Math.max(summary.balance, 0).toLocaleString()} MXN{/*{summary.balance.toLocaleString()} MXN*/}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="progress mt-3" style={{ height: "6px" }}>
              <div className="progress-bar bg-danger" style={{ width: `${expensePct}%` }} />
              <div className="progress-bar bg-success" style={{ width: `${incomePct}%` }} />
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <button className="btn py-2 fw-bold rounded-4 btn-universal-color" style={{ width: "40%" }}>
            Descargar
          </button>
        </div>
      </div>

      {/* FILA INFERIOR */}
      <div className="row">
        <div className="col-12">
          <div className="card p-3 h-100 border-0 shadow-sm rounded-4 bg-white">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="text-dark fw-semibold">Presupuesto Mensual</h5>
              <button className="btn btn-universal-color rounded-circle" onClick={() => setShowForm(true)}>
                +
              </button>
            </div>
            <div className="mt-3 custom-scrollbar" style={{ maxHeight: "1000px", overflowY: "auto", overflowX: "hidden" }}>
              <div className="row">
                {budgets.map((b) => (
                  <div key={b.id} className="col-12">
                    <Presupuesto amount={b.amount} category={b.category} transactions={transactions} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DE BOOTSTRAP */}
      {showForm && (
        <>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content border-0 rounded-4 shadow">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-semibold">Nuevo Presupuesto</h5>
                  <button type="button" className="btn-close" onClick={() => setShowForm(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Presupuesto:</label>
                    <input
                      type="number"
                      className="form-control rounded-3"
                      placeholder="Ingrese el presupuesto"
                      value={budgetAmount}
                      onChange={handleAmountChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Categoría:</label>
                    <select className="form-select rounded-3" value={selectedCategory} onChange={handleCategoryChange}>
                      <option value="">Seleccione una categoría</option>
                      <option value="Alimentación">Alimentación</option>
                      <option value="Transporte">Transporte</option>
                      <option value="Entretenimiento">Entretenimiento</option>
                      <option value="Salud">Salud</option>
                      <option value="Otro">Otra</option>
                    </select>
                    {selectedCategory === "Otro" && (
                      <div className="mt-2">
                        <label className="form-label fw-medium">Nueva categoría:</label>
                        <input
                          type="text"
                          className="form-control rounded-3"
                          value={customCategory}
                          onChange={handleCustomCategoryChange}
                          placeholder="Ingrese una categoría personalizada"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button className="btn btn-secondary rounded-3" onClick={() => setShowForm(false)}>
                    Cerrar
                  </button>
                  <button className="btn btn-universal-color rounded-3" onClick={handleSave}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default InformesCardView;
