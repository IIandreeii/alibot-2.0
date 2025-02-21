import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  token: string | null;
  userID: string | null;
  login: (token: string, id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userID, setId] = useState<string | null>(null);

  const loadToken = () => {
    const storedToken = Cookies.get('authToken');
    const storedId = Cookies.get('authId');
    setToken(storedToken || null);
    setId(storedId || null);
  };

  useEffect(() => {
    loadToken();
    window.addEventListener('storage', loadToken);
    return () => {
      window.removeEventListener('storage', loadToken);
    };
  }, []);

  const login = (newToken: string, newId: string) => {
    console.log("ASDSADSADxASD", newToken, newId);
    
    Cookies.set('authToken', newToken, { expires: 1 });
    Cookies.set('authId', newId, { expires: 1 });
    
    setToken(newToken);
    setId(newId);
  };

  const logout = () => {
    Cookies.remove('authToken');
    Cookies.remove('authId');
    setToken(null);
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userID, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
