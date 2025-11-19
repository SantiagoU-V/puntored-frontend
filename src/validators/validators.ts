// Validaciones
export const isValidPhone = (phone: string) => {
  const onlyDigits = /^\d{10}$/.test(phone);
  return onlyDigits && phone.startsWith("3");
};

export const isValidAmount = (amount: number) => {
  return amount >= 1000 && amount <= 100000;
};
