import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserSession } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const saved = api.getCurrentUser();
    if (saved) {
      setUser(saved);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const result = await api.login(username, password);
    if (result.success && result.user) {
      setUser(result.user);
      setIsLoginModalOpen(false);
      setIsAdminOpen(true);
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const logout = () => {
    api.logout();
    setUser(null);
    setIsAdminOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isAdminOpen,
        setIsAdminOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
