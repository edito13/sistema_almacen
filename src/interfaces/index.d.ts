interface payloadLogin {
  email: string;
  password: string;
}

interface payloadRegister {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface loginResponse {
  user: User;
  token: string;
  message: string;
  error?: boolean;
}
