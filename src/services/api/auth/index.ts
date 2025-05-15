import axios from "@/services/axios";

const Api = {
  login: async (payload: payloadLogin) => {
    const { data } = await axios.post<AuthResponse>("/auth/login", payload);
    return data;
  },
  register: async (payload: payloadRegister) => {
    const { data } = await axios.post<AuthResponse>("/auth/register", payload);
    return data;
  },
};

export default Api;
