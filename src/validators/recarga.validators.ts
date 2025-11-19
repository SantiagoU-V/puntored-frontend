// -------------------------------
// 🔍 VALIDACIONES DEL FORMULARIO
// -------------------------------
export const validateRecargaForm = (form: any): string | null => {

  // 🔐 Validación de clave transaccional
  if (!form.transactionalPassword.trim())
    return "Debes ingresar la clave transaccional.";

  if (!/^\d{6}$/.test(form.transactionalPassword))
    return "La clave transaccional debe tener 6 dígitos.";

  // 📱 Validación número de teléfono
  if (!/^\d+$/.test(form.number))
    return "El número solo puede contener dígitos.";

  if (form.number.length !== 10)
    return "El número debe tener exactamente 10 dígitos.";

  if (!form.number.startsWith("3"))
    return "El número debe iniciar en 3 (solo números móviles).";

  // 💰 Validación del monto
  const amount = Number(form.amount);

  if (isNaN(amount))
    return "El monto debe ser numérico.";

  if (amount < 1000)
    return "El valor mínimo de recarga es $1,000.";

  if (amount > 100000)
    return "El valor máximo de recarga es $100,000.";

  // 📦 Código del producto
  if (!form.productCode.trim())
    return "El código del producto es obligatorio.";

  return null;

  
};
export const buildRecargaPayload = (form: any) => ({ pointOfSale: Number(form.pointOfSale), terminal: form.terminal, transactionalPassword: form.transactionalPassword, number: form.number, amount: Number(form.amount), trace: generateTrace(), productCode: form.productCode, Ciudad: form.Ciudad, Latitud: form.Latitud, Longitud: form.Longitud, });
export const generateTrace = () => Math.random().toString(36).substring(2, 12);
