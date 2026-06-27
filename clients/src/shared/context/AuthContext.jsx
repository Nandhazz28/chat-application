import { createContext, useContext, useEffect, useState } from "react";
import { getMe } from "../../services/auth.services";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const data = await getMe();
        const userData = data?.data?.user || data?.data || null;
        setUser(userData);
      } catch {
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login  = (userData) => setUser(userData);
  const logout = ()         => { localStorage.removeItem("token"); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);