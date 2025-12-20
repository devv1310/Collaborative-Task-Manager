import { api } from "./axios";




export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data: any) => {
  const res = await api.post("/auth/login", data);
  localStorage.setItem("token", res.data.token); // 🔥 REQUIRED
  return res.data;
};

export const getMe = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (err) {
    return null; // 🔥 VERY IMPORTANT
  }
};


