export const saveRecharge = (recharge: any) => {
  const current = JSON.parse(localStorage.getItem("recharges") || "[]");
  current.push(recharge);
  localStorage.setItem("recharges", JSON.stringify(current));
};

export const getRecharges = () => {
  return JSON.parse(localStorage.getItem("recharges") || "[]");
};
