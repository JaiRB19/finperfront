import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Presupuesto({ amount, category, transactions = [] }) {
  const budget = parseFloat(amount);

  // Filtrar solo los gastos cuya categoría (category.name) coincide
  const gastosDeEstaCategoria = transactions.filter(
    tx =>
      tx.type === "Gasto" &&
      tx.category &&
      tx.category.name === category
  );

  // Sumar los montos de esos gastos
  const spent = gastosDeEstaCategoria.reduce(
    (acc, tx) => acc + parseFloat(tx.amount),
    0
  );

  // Calcular restante (no menor que cero)
  const remaining = Math.max(budget - spent, 0);

  const data = [
    { name: "Presupuesto", value: budget,    color: "#28a745" },
    { name: "Gastos",       value: spent,     color: "#dc3545" },
    { name: "Restante",     value: remaining, color: "#f39c12" }
  ];

  return (
    <div className="col-12 mb-3">
      <div className="row align-items-center">
        {/* Gráfico de barras */}
        <div className="col-md-6 d-flex justify-content-center">
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value">
                  {data.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Información numérica */}
        <div className="col-md-6">
          <div className="bg-white p-4 rounded-4 shadow-sm text-center border">
            <p className="text-muted fw-medium mb-1">
              Categoría: <span className="fw-semibold">{category}</span>
            </p>
            <p className="text-muted fw-medium mb-1">
              Restante:{" "}
              <span className="fw-semibold text-dark">
                {remaining.toLocaleString()} MXN
              </span>
            </p>
            <hr className="my-2" />
            <p className="text-muted fw-medium mb-1">
              Presupuesto:{" "}
              <span className="text-success fw-semibold">
                {budget.toLocaleString()} MXN
              </span>
            </p>
            <p className="text-muted fw-medium">
              Gastos:{" "}
              <span className="text-danger fw-semibold">
                {spent.toLocaleString()} MXN
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
