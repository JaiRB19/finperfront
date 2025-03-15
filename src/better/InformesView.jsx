import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Presupuesto from "./PresupuestosComplement";

const InformesCardView = () => {
    const [showForm, setShowForm] = useState(false);
    const [customCategory, setCustomCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [components, setComponents] = useState([]);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleCustomCategoryChange = (e) => {
        setCustomCategory(e.target.value);
    };

    const handleSave = () => {
        const categoryToSave = selectedCategory === 'Otro' ? customCategory : selectedCategory;
        setComponents([...components, <Presupuesto key={components.length} />]);
        console.log("Presupuesto guardado con categoría: ", categoryToSave);
        setShowForm(false);
    };

    return (
        <div className="container-fluid px-3 py-4">
            {/* FILA SUPERIOR */}
            <div className="row g-3 mb-3">
                <div className="col-md-8">
                    <div className="card p-3 h-100 border-0 shadow-sm rounded-4" style={{ backgroundColor: "#FFFFFF" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="text-dark fw-semibold m-0">Estadísticas Mensuales</h5>
                            <button className="btn p-0">
                                <i className="bi bi-chevron-right text-dark"></i>
                            </button>
                        </div>
                        <div className="mt-2">
                            <div className="d-flex">
                                <span className="fw-semibold">Enero</span>
                                <div className="ms-auto d-flex gap-4 text-secondary fw-semibold">
                                    <span>Gastos</span>
                                    <span>Ingresos</span>
                                    <span>Saldo</span>
                                </div>
                            </div>
                            <div className="d-flex">
                                <span className="fw-bold">$0</span>
                                <div className="ms-auto d-flex gap-5">
                                    <span className="fw-bold text-danger">$0</span>
                                    <span className="fw-bold text-success">$0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <button className="btn py-2 fw-bold rounded-4 btn-universal-color" style={{ width: "40%"}}>Descargar</button>
                </div>
            </div>

            {/* FILA INFERIOR */}
            <div className="row">
                <div className="col-12">
                    <div className="card p-3 h-100 border-0 shadow-sm rounded-4" style={{ backgroundColor: "#FFFFFF" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h5 className="text-dark fw-semibold">Presupuesto Mensual</h5>
                            <button className="btn btn-universal-color rounded-circle" onClick={() => setShowForm(true)}>+</button>
                        </div>
                        <div className="mt-3 custom-scrollbar"
                            style={{
                                maxHeight: "1000px",
                                overflowY: "auto",
                                overflowX: "hidden"
                            }}>
                            <div className="row">
                                {components.map((comp, index) => (
                                    <div key={index} className="col-12">
                                        {comp}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL DE BOOTSTRAP */}
            {showForm && (
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
                                    <input type="number" className="form-control rounded-3" placeholder="Ingrese el presupuesto" />
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
                                    {selectedCategory === 'Otro' && (
                                        <div className="mt-2">
                                            <label className="form-label fw-medium">Nueva categoría:</label>
                                            <input type="text" className="form-control rounded-3" value={customCategory} onChange={handleCustomCategoryChange} placeholder="Ingrese una categoría personalizada" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer border-0">
                                <button className="btn btn-secondary rounded-3" onClick={() => setShowForm(false)}>Cerrar</button>
                                <button className="btn btn-universal-color rounded-3" onClick={handleSave}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Fondo oscuro cuando el modal está abierto */}
            {showForm && <div className="modal-backdrop fade show"></div>}
        </div>
    );
};

export default InformesCardView;