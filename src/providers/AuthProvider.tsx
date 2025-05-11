import { useEffect, useState } from "react";

import AuthContext from "@/contexts/AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<null | User>(null);
  const [token, setToken] = useState<null | string>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const signIn = (data: loginResponse) => {
    const { user, token } = data;
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
    localStorage.setItem("token", token);
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, signIn, signOut, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
