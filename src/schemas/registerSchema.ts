import { z } from "zod";

const schema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z
      .string()
      .min(1, "Email é obrigatório")
      .email("Formato de email inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
    confirmPassword: z
      .string()
      .min(1, "Confirmação de senha é obrigatória")
      .min(6, "A senha deve ter no mínimo 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"],
  });

export default schema;
