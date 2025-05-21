import exitSchema from "@/schemas/exitSchema";
import loginSchema from "@/schemas/loginSchema";
import entrySchema from "@/schemas/entrySchema";
import categorySchema from "@/schemas/categorySchema";
import registerSchema from "@/schemas/registerSchema";
import equipmentSchema from "@/schemas/equipmentSchema";

export type ExitFormData = z.infer<typeof exitSchema>;
export type EntryFormData = z.infer<typeof entrySchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type EquipmentFormData = z.infer<typeof equipmentSchema>;
