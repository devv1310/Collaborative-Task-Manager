import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<{
  user: User | null;
  setUser: (u: User | null) => void;
}>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);