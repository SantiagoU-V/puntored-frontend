import axiosInstance from "./axiosInstance";

export const findSuppliers = async (pointOfSale: string) => {
  const resp = await axiosInstance.post("/recharge/find-suppliers", {
    pointOfSale
  });
  return resp.data; // aquí viene {state, message, data: {suppliers}}
};
