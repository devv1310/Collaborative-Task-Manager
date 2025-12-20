import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

interface User {
  id: string;
  name: string;
  email: string;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const me = await getMe();
      setUser(me);
      setLoading(false); // 🔥 NEVER MISS THIS
    };
    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
