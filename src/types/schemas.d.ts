import loginSchema from "@/schemas/loginSchema";
import registerSchema from "@/schemas/registerSchema";

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
