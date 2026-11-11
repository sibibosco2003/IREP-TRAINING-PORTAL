'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '@/types';
import { SAMPLE_USERS } from './mock-data';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  loginWithOtp: (phone: string, otp: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  language: 'en' | 'ta';
  setLanguage: (lang: 'en' | 'ta') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(SAMPLE_USERS.student);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const router = useRouter();

  // Load persisted demo role or user from localStorage on mount
  useEffect(() => {
    try {
      const savedRole = localStorage.getItem('irep_demo_role') as UserRole;
      if (savedRole && SAMPLE_USERS[savedRole]) {
        setUser(SAMPLE_USERS[savedRole]);
      }
    } catch {
      // LocalStorage not available or SSR
    }
  }, []);

  const login = async (email: string, selectedRole: UserRole = 'student'): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Find matching mock user or assign chosen role
      const matchedUser = SAMPLE_USERS[selectedRole] || {
        ...SAMPLE_USERS.student,
        email,
        role: selectedRole,
      };

      setUser(matchedUser);
      localStorage.setItem('irep_demo_role', selectedRole);
      setIsLoading(false);

      // Redirect to role-specific dashboard
      router.push(`/${selectedRole}`);
      return true;
    } catch {
      setIsLoading(false);
      return false;
    }
  };

  const loginWithOtp = async (phone: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate OTP verification (demo OTP: any 6 digit or 123456)
    await new Promise((res) => setTimeout(res, 500));
    const parentUser = { ...SAMPLE_USERS.parent, phone };
    setUser(parentUser);
    localStorage.setItem('irep_demo_role', 'parent');
    setIsLoading(false);
    router.push('/parent');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('irep_demo_role');
    router.push('/login');
  };

  const switchRole = (newRole: UserRole) => {
    if (SAMPLE_USERS[newRole]) {
      setUser(SAMPLE_USERS[newRole]);
      localStorage.setItem('irep_demo_role', newRole);
      router.push(`/${newRole}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || 'student',
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithOtp,
        logout,
        switchRole,
        language,
        setLanguage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

