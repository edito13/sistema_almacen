import loginSchema from "@/schemas/loginSchema";

export type LoginFormData = z.infer<typeof loginSchema>;
