interface payloadLogin {
  email: string;
  password: string;
}

interface payloadRegister {
  name: string;
  email: string;
  password: string;
}

interface payloadEquipment {
  name: string;
  type: string;
  quantity: number;
  category_id: number;
}

interface payloadExit {
  concept: string;
  quantity: number;
  responsible: string;
  equipment_id: number;
}
interface payloadEntry {
  details: string;
  concept: string;
  supplier: string;
  quantity: number;
  entry_date: string;
  responsible: string;
  equipment_id: number;
  minimum_quantity: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Category {
  id: number;
  name: string;
}

interface AuthResponse {
  user: User;
  token: string;
  message: string;
  error?: boolean;
}

interface Entry {
  id: number;
  equipment_id: number;
  quantity: number;
  supplier: string;
  details: string;
  min_quantity: number | null;
  concept: string;
  entry_date: string; // formato: "YYYY-MM-DD"
  responsible: string;
  created_at: string;
  updated_at: string;
  equipment: Equipment;
}

interface Exit {
  id: number;
  equipment_id: number;
  quantity: number;
  destination: string;
  details: string;
  concept: string;
  exit_date: string; // formato: "YYYY-MM-DD"
  responsible: string;
  created_at: string;
  updated_at: string;
  equipment: Equipment;
}

interface Equipment {
  id: number;
  name: string;
  type: string;
  quantity: number;
  category_id: number;
  created_at: string;
  updated_at: string;
  entries?: Entry[];
  exits?: Exit[];
}

interface Movement {
  id: number;
  concept: string;
  details: string;
  quantity: number;
  updated_at: string;
  created_at: string;
  responsible: string;
  equipment_id: number;
  movement_date: string;
  type: "entry" | "exit";
  equipment: Equipment;
}

interface Option {
  value: string | number;
  label: string;
}
