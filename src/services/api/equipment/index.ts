import axios from "@/services/axios";

const Api = {
  getEquipments: async () => {
    const { data } = await axios.get<Equipment[]>("/equipment");
    return data;
  },
  getEquipment: async (id: string) => {
    const { data } = await axios.get<Equipment>("/equipment", {
      params: { id },
    });
    return data;
  },
  createEquipment: async (payload: payloadEquipment) => {
    const { data } = await axios.post<Equipment>("/equipment", payload);
    return data;
  },
  editEquipment: async (id: number) => {
    const { data } = await axios.put<Equipment>("/equipment", {
      params: { id },
    });
    return data;
  },
  deleteEquipment: async (id: number) => {
    const { data } = await axios.delete<Equipment>("/equipment", {
      params: { id },
    });
    return data;
  },
};

export default Api;
