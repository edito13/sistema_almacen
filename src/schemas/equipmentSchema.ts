import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  type: z.string().min(1, "O tipo é obrigatório"),
  quantity: z.number(),
  min_quantity: z.number(),
  category_id: z.number(),
});

export default schema;
