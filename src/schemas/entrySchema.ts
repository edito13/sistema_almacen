import { z } from "zod";

const schema = z.object({
  equipment_id: z.number(),
  quantity: z.number(),
  supplier: z.string().min(1, "O fornecedor é obrigatório"),
  details: z.string().optional(),
  concept: z.string().min(1, "O conceito é obrigatório"),
  entry_date: z.string(),
  responsible: z.string().min(1, "O responsável é obrigatório"),
});

export default schema;
