import React, { useState, useEffect } from "react";
import { buyRecharge } from "../api/recharge.service.buy";
import { saveRecharge } from "../utils/storage";

import {
  validateRecargaForm,
  buildRecargaPayload,
} from "../validators/recarga.validators";

// -----------------------------
// 🔵 TYPES
// -----------------------------
type RecargaFormType = {
  pointOfSale: string;
  terminal: string;
  transactionalPassword: string;
  number: string;
  amount: string;
  productCode: string;
  Ciudad: string;
  Latitud: string;
  Longitud: string;
};

type SupplierType = {
  supplierCode: string;
  supplierDescription: string;
  supplierLogo: string;
} | null;


// -----------------------------
// 🔵 Utilidades
// -----------------------------

const formatNumber = (n: string | number) =>
  new Intl.NumberFormat("es-CO").format(Number(n));
const mensajesNegocio: Record<string, string> = {
  HE11: "Transacción rechazada: revisa la clave transaccional o intenta de nuevo.",
};

const formatPhone = (p: string) =>
  p.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");


// -----------------------------
// 🔵 COMPONENTE
// -----------------------------
const RecargaForm = () => {
  const [supplier, setSupplier] = useState<SupplierType>(null);

  const [form, setForm] = useState<RecargaFormType>({
    pointOfSale: "271826",
    terminal: "383149",
    transactionalPassword: "",
    number: "",
    amount: "1000",
    productCode: "",
    Ciudad: "110001",
    Latitud: "225;36,34.96",
    Longitud: "225;36,34.96",
  });

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // -----------------------------
  // 🔵 Sincronizar proveedor
  // -----------------------------
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("selectedSupplier") || "null");
    setSupplier(saved);

    if (saved) {
      setForm((prev) => ({ ...prev, productCode: saved.supplierCode }));
    }
  }, []);


  // -----------------------------
  // 🔵 Cambios en inputs
  // -----------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };


  // -----------------------------
  // 🔵 Submit con validadores nuevos
  // -----------------------------
  const handleSubmit = async () => {
    setError("");
    setResult(null);

    // VALIDAR
    const errMsg = validateRecargaForm(form);
    if (errMsg) return setError(errMsg);

    try {
      setLoading(true);

      // PAYLOAD NUEVO con generateTrace
      const payload = buildRecargaPayload(form);

      const resp = await buyRecharge(payload);

      setResult(resp);

      saveRecharge({
        date: new Date().toISOString(),
        number: form.number,
        amount: Number(form.amount),
        productCode: form.productCode,
        supplierName: supplier?.supplierDescription,
        supplierLogo: supplier?.supplierLogo,
        trace: payload.trace,
        response: resp,
      });

    } // --- Mensajes de negocio ---
 catch (err: any) {
  // Extraer el código de la respuesta
  const codigo = err?.response?.data?.code;
  const mensajeBack = err?.response?.data?.data?.message;
  const mensajeGeneral = err?.response?.data?.message;

  // Si el código existe en nuestros mensajes → usamos ese
  if (codigo && mensajesNegocio[codigo]) {
    setError(mensajesNegocio[codigo]);
  }
  // Si backend envió un mensaje "data.message" → lo usamos
  else if (mensajeBack) {
    setError(mensajeBack);
  }
  // Si backend envió un mensaje general
  else if (mensajeGeneral) {
    setError(mensajeGeneral);
  }
  // Último recurso
  else {
    setError("No se pudo procesar la recarga. Revisa los datos y intenta nuevamente.");
  }
} finally {
  setLoading(false);
}

  };


  // -----------------------------
  // 🔵 Campos visibles
  // -----------------------------
  const fields = [
    { name: "pointOfSale", label: "Punto de venta" },
    { name: "terminal", label: "Terminal" },
    {
      name: "transactionalPassword",
      label: "Contraseña transaccional",
      type: "password",
    },
    { name: "number", label: "Número a recargar" },
    { name: "amount", label: "Valor de recarga", type: "number" },
  ];


  // -----------------------------
  // 🔵 UI
  // -----------------------------
  return (
    <div className="p-6 text-black">
      <h2 className="text-2xl font-bold mb-6">Realizar Recarga</h2>

      {/* PROVEEDOR */}
      {supplier && (
        <div className="mb-4 flex items-center gap-4 p-4 border rounded-lg bg-gray-50 shadow-sm max-w-sm">
          <img
            src={supplier.supplierLogo}
            width={60}
            height={60}
            alt="logo"
            className="rounded"
          />
          <div className="flex flex-col">
            <p className="font-bold text-gray-800 leading-tight">
              {supplier.supplierDescription}
            </p>
            <p className="text-gray-600 text-sm leading-tight">
              Código: {supplier.supplierCode}
            </p>
          </div>
        </div>
      )}

      <div className="w-full max-w-xl bg-white p-6 shadow-md rounded flex flex-col gap-5">

        {/* Campos */}
        {fields.map((f) => (
          <div key={f.name} className="flex items-center justify-between gap-4">
            <label className="w-48 font-semibold text-gray-700">
              {f.label}
            </label>

            <input
              name={f.name}
              type={f.type || "text"}
              value={(form as any)[f.name]}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
        ))}

        {/* Product Code (deshabilitado) */}
        <div className="flex items-center justify-between gap-4">
          <label className="w-48 font-semibold text-gray-700">
            Código del producto
          </label>

          <input
            name="productCode"
            value={form.productCode}
            disabled
            className="p-2 border rounded w-full bg-gray-100 text-gray-600"
          />
        </div>

        {/* Ciudad */}
        <div className="flex items-center justify-between gap-4">
          <label className="w-48 font-semibold text-gray-700">Ciudad</label>
          <select
            name="Ciudad"
            value={form.Ciudad}
            onChange={handleChange}
            className="p-2 border rounded bg-white w-full"
          >
            <option value="110001">Bogotá</option>
          </select>
        </div>

        {/* Campos ocultos */}
        <input type="hidden" name="Latitud" value={form.Latitud} />
        <input type="hidden" name="Longitud" value={form.Longitud} />

        {/* Error */}
        {error && (
          <div className="p-3 bg-red-100 text-red-800 border border-red-300 rounded">
           <strong>Error:</strong> {error}
          </div>
        )}

        {/* Éxito */}
        {result?.state === true && (
          <div className="p-3 bg-green-100 text-green-800 border border-green-300 rounded">
            ✅ <strong>Recarga exitosa:</strong> {formatPhone(form.number)} —{" "}
            <strong>${formatNumber(form.amount)}</strong>
          </div>
        )}

        {/* Botón */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            bg-purple-600 text-white py-3 rounded-lg font-bold 
            hover:bg-purple-700 transition flex items-center justify-center
          "
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Procesando...
            </div>
          ) : (
            "Realizar Recarga"
          )}
        </button>
      </div>

      {/* Ticket sin JSON */}
      {result?.state === true && result?.data?.ticket && (
        <div className="w-full flex justify-left">
          <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg shadow max-w-xl w-full">
            <h3 className="text-lg font-bold text-green-700 mb-2 text-center">
              ✅ Recarga Exitosa
            </h3>

            <p className="text-gray-800 font-semibold mb-2 text-center">
              {result.data.ticket.title}
            </p>

            <pre className="whitespace-pre-wrap text-gray-700 text-sm bg-white p-3 rounded border">
              {result.data.ticket.footer}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecargaForm;
