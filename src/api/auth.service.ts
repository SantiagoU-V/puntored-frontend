import axiosInstance from "./axiosInstance";
// Servicio de Authentication
type AuthBody = {
  username: string;
  password: string;
  commerce: number;
};

export const authLogin = async (body: AuthBody) => {
  const resp = await axiosInstance.post("/auth", body);
  return resp.data; // estructura según la documentación: data.token, type, expiration
};
