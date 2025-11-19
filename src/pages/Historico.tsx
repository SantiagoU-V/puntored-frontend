import React, { useEffect, useState } from "react";
import { getRecharges } from "../utils/storage";
const selectedSupplier = JSON.parse(localStorage.getItem("selectedSupplier") || "null");
const Historico = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getRecharges());
  }, []);

  if (!items.length) {
    return (
      <p className="p-5 text-center text-gray-500 text-lg">No hay recargas guardadas.</p>
    );
  }
console.log(items[0]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Histórico de Recargas</h2>

      <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left font-semibold">Fecha y hora</th>
            <th className="p-3 text-left font-semibold">Número</th>
            <th className="p-3 text-left font-semibold">Monto</th>
            <th className="p-3 text-left font-semibold">Producto</th>
            <th className="p-3 text-left font-semibold">Trace</th>
            <th className="p-3 text-left font-semibold">Estado</th>
          </tr>
        </thead>

        <tbody>
          {items.map((r: any, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 text-gray-700">{new Date(r.date).toLocaleString()}</td>


              <td className="p-3 text-gray-700">{r.number}</td>
              <td className="p-3 text-gray-700 font-semibold">${r.amount}</td>
              <td className="p-3 text-gray-700">{r.productCode}</td>
              <td className="p-3 text-gray-700">{r.trace}</td>

              <td
                className={`p-3 font-bold ${r.response?.state ? "text-green-600" : "text-red-600"}`}
              >
                {r.response?.state ? "Éxito" : "Error"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Historico;
