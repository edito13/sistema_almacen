import axios from "@/services/axios";

interface Category {
  id: number;
  name: string;
}

const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    const { data } = await axios.get<Category[]>("/category");
    return data;
  },

  getCategory: async (id: number): Promise<Category> => {
    const { data } = await axios.get<Category>(`/category/${id}`);
    return data;
  },

  createCategory: async (categoryData: Omit<Category, 'id'>): Promise<Category> => {
    const { data } = await axios.post<Category>("/category", categoryData);
    return data;
  },

  editCategory: async (id: string, categoryData: Partial<Category>): Promise<Category> => {
    const { data } = await axios.put<Category>(`/category/${id}`, categoryData);
    return data;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await axios.delete(`/category/${id}`);
  },
};

export default categoryApi;