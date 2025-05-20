import { z } from "zod";

const schema = z.object({
  equipment_id: z.coerce.number(),
  quantity: z.coerce.number(),
  concept: z.string().min(1, "O conceito é obrigatório"),
  exit_date: z.string(),
  responsible: z.string().min(1, "O responsável é obrigatório"),
});

export default schema;
