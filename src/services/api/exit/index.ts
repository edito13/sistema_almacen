import axios from "@/services/axios";

const Api = {
  getExits: async () => {
    const { data } = await axios.get<Exit[]>("/exit");
    return data;
  },
  getExit: async (id: number) => {
    const { data } = await axios.get<Exit>("/exit", {
      params: { id },
    });
    return data;
  },
  createExit: async (payload: payloadExit) => {
    const { data } = await axios.post<Exit>("/exit", payload);
    return data;
  },
};

export default Api;
