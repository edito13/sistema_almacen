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
  updateEntry: async (payload: payloadEntry, id: number) => {
    const { data } = await axios.put<ErrorResponse>(`/entry/${id}`, payload);
    return data;
  },
  deleteEntry: async (id: number) => {
    const { data } = await axios.delete<ErrorResponse>(`/entry/${id}`);
    return data;
  },
};

export default Api;
