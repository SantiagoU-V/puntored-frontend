import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findSuppliers } from "../api/recharge.service";

const Proveedores = () => {
  const [pointOfSale, setPointOfSale] = useState("");
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Estado para mostrar el proveedor seleccionado actual
  const [selectedSupplier, setSelectedSupplier] = useState<any | null>(null);

  // --- Cargar datos persistidos ---
  useEffect(() => {

    // Punto de venta buscado anteriormente
    const savedPOS = localStorage.getItem("pointOfSale");
    if (savedPOS) setPointOfSale(savedPOS);

    // Lista de proveedores
    const savedSuppliers = localStorage.getItem("suppliers");
    if (savedSuppliers) setSuppliers(JSON.parse(savedSuppliers));

    // Proveedor seleccionado
    const savedSelected = localStorage.getItem("selectedSupplier");
    if (savedSelected) setSelectedSupplier(JSON.parse(savedSelected));

  }, []);

  const handleFindSuppliers = async () => {
    setError("");

    if (!pointOfSale.trim()) {
      setError("Debes ingresar un punto de venta.");
      return;
    }

    try {
      setLoading(true);
      const resp = await findSuppliers(pointOfSale);

      if (!resp.state) {
        setError(resp.message || "No se pudieron obtener proveedores.");
        return;
      }

      const suppliersList = resp.data?.suppliers || [];

      if (suppliersList.length === 0) {
        setError("No hay proveedores disponibles para este punto de venta.");
        return;
      }

      setSuppliers(suppliersList);

      // --- Guardar en localStorage ---
      localStorage.setItem("suppliers", JSON.stringify(suppliersList));
      localStorage.setItem("pointOfSale", pointOfSale);

    } catch (err) {
      console.error(err);
      setError("Error consultando proveedores.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSupplier = (supplier: any) => {
    localStorage.setItem("selectedSupplier", JSON.stringify(supplier));
    setSelectedSupplier(supplier);
    navigate("/recargas");
  };

  return (
    <div className="p-8 bg-white text-black">

      <h2 className="text-3xl font-bold mb-6">Consultar Proveedores</h2>

      {/* Mostrar el punto de venta actual */}
      {pointOfSale && (
        <div className="mb-5 p-3 bg-purple-100 border border-purple-300 rounded-lg">
          <p className="font-semibold text-purple-800">
            Punto de venta introducido: <span className="font-bold">{pointOfSale}</span>
          </p>
        </div>
      )}

      {/* Mostrar proveedor seleccionado */}
      {selectedSupplier && (
        <div className="mb-6 p-4 bg-purple-50 border border-purple-300 rounded-lg shadow-sm flex items-center gap-4">
          <img src={selectedSupplier.supplierLogo} alt="" width={50} />
          <div>
            <p className="font-bold text-purple-800">
              Proveedor seleccionado: {selectedSupplier.supplierDescription}
            </p>
            <p className="text-gray-600">Código: {selectedSupplier.supplierCode}</p>
          </div>
        </div>
      )}

      {/* Input de punto de venta */}
      <input
        type="text"
        placeholder="Ingresa el ID del punto de venta"
        value={pointOfSale}
        onChange={(e) => setPointOfSale(e.target.value)}
        className="
          p-3 border border-gray-300 rounded w-80
          focus:outline-none focus:ring-2 focus:ring-purple-600
        "
      />

      {/* Botón buscar */}
      <button
        onClick={handleFindSuppliers}
        className="
          ml-3 px-5 py-3 bg-purple-600 hover:bg-purple-700 
          text-white rounded font-semibold transition
        "
      >
        {loading ? "Consultando..." : "Buscar proveedores"}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}

      {/* Lista de proveedores */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4">Proveedores disponibles:</h3>

        <div className="flex flex-col gap-3">

          {suppliers.map((sup, i) => (
            <div
              key={i}
              className="
                bg-white border border-gray-300 rounded-lg shadow-sm
                p-4 flex items-center justify-between
              "
            >
              <div className="flex items-center gap-3">
                <img src={sup.supplierLogo} width={50} height={50} alt="" />

                <div>
                  <p className="font-bold">{sup.supplierDescription}</p>
                  <p className="text-gray-600">Código: {sup.supplierCode}</p>
                </div>
              </div>

              <button
                onClick={() => handleSelectSupplier(sup)}
                className="
                  px-4 py-2 bg-purple-600 text-white 
                  font-semibold rounded-lg hover:bg-purple-700 transition
                "
              >
                Seleccionar
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Proveedores;
