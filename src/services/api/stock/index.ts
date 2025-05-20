import axios from "@/services/axios";

const Api = {
  getStock: async () => {
    const { data } = await axios.get("/stock");
    return data;
  },
};

export default Api;
