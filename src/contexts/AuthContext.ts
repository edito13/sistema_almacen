import { createContext } from "react";

interface AuthContextI {
  user: null | User;
  token: null | string;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (data: loginResponse) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextI>({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  signIn: () => {},
  signOut: () => {},
});

export default AuthContext;
