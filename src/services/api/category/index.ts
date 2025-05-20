import axios from "@/services/axios";

const Api = {
  getCategories: async () => {
    const { data } = await axios.get<Category[]>("/category");
    return data;
  },
  getCategory: async (id: number) => {
    const { data } = await axios.get<Category>("/category", {
      params: { id },
    });
    return data;
  },
  editCategory: async (id: string) => {
    const { data } = await axios.put<Category>("/category", {
      params: { id },
    });
    return data;
  },
  deleteCategory: async (id: string) => {
    const { data } = await axios.delete("/category", {
      params: { id },
    });
    return data;
  },
};

export default Api;
