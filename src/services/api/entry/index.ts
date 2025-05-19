import axios from "@/services/axios";

const Api = {
  getEntries: async () => {
    const { data } = await axios.get<Entry[]>("/entry");
    return data;
  },
  getEntry: async (id: string) => {
    const { data } = await axios.get<Entry>("/entry", {
      params: { id },
    });
    return data;
  },
  createEntry: async (payload: payloadEntry) => {
    const { data } = await axios.post<Entry>("/entry", payload);
    return data;
  },
};

export default Api;
