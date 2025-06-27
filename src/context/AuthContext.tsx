'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string, id: string) => void;
  logout: () => void;
}

// context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//  provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // On initial load, try to retrieve user from localStorage (or a cookie)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, name: string, id: string) => {
    const newUser = { id, name, email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser)); // Persist user data
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear user data
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// New AuthApiProvider for checking auth flow
export const AuthApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Check auth status on mount
  const { isLoading } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) throw new Error('No token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) {
        throw new Error('Invalid session');
      }
      return res.json();
    },
    retry: false,
    onSuccess: (data) => {
      // Assuming API returns { id, name, email }
      setUser({ id: data.id, name: data.name, email: data.email });
      localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, email: data.email }));
    },
    onError: () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      toast.error('Session expired. Please log in again.');
      router.push('/login');
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login: (email, name, id) => { const newUser = { id, name, email }; setUser(newUser); localStorage.setItem('user', JSON.stringify(newUser)); }, logout: () => { setUser(null); localStorage.removeItem('user'); localStorage.removeItem('token'); router.push('/login'); } }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};