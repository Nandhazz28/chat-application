import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getMe } from "../../services/auth.services";
import { getToken, clearAuth } from "../../shared/utils/token";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const data = await getMe();
        const userData = data?.data?.user || data?.data || null;
        setUser(userData);
      } catch {
        clearAuth();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = useCallback((userData) => setUser(userData), []);

  const logout = useCallback(() => {
    clearAuth();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
};