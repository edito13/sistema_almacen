import exitSchema from "@/schemas/exitSchema";
import loginSchema from "@/schemas/loginSchema";
import entrySchema from "@/schemas/entrySchema";
import registerSchema from "@/schemas/registerSchema";

export type ExitFormData = z.infer<typeof exitSchema>;
export type EntryFormData = z.infer<typeof entrySchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
