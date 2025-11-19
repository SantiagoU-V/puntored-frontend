import axiosInstance from "./axiosInstance";

export const buyRecharge = async (body: any) => {
  const resp = await axiosInstance.post("/recharge/buy", body);
  return resp.data;
};
