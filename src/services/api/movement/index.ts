import axios from "@/services/axios";

const Api = {
  getMovements: async () => {
    const { data } = await axios.get<Movement[]>("/movement");
    return data;
  },
};

export default Api;
