'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
// import { useQuery } from '@tanstack/react-query';
// import toast from 'react-hot-toast';

// 1. Define the User type
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

// 2. Define context value type
interface AuthContextType {
  user: User | null;
  login: (email?: string, firstName?: string, lastName?: string, id?: string) => void;
  logout: () => void;
}

// 3. Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Local AuthProvider for usage in components
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (
    email?: string,
    firstName?: string,
    lastName?: string,
    id?: string
  ) => {
    if (!email || !firstName || !lastName || !id) {
      // Optionally, you can throw an error or handle this case as needed
      return;
    }
    const newUser: User = { id, firstName, lastName, email };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. AuthApiProvider for authentication check
// export const AuthApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       const parsedUser: User = JSON.parse(storedUser);
//       setUser(parsedUser);  // Set user directly from localStorage
//     }
//   }, []);

//   const { isLoading } = useQuery({
//     queryKey: ['auth', 'me'],
//     queryFn: async () => {
//       const token =
//         typeof window !== 'undefined' ? localStorage.getItem('token') : null;
//       if (!token) throw new Error('No token');
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL || ''}/auth/me`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (!res.ok) {
//         throw new Error('Invalid session');
//       }
//       return res.json();
//     },
//     enabled: !user,  // Only trigger the API call if `user` is not set
//     // retry: false,
//     onSuccess: (data) => {
//       const newUser: User = {
//         id: data.id,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//       };
//       setUser(newUser);
//       console.log(newUser,'new user');
//       localStorage.setItem('user', JSON.stringify(newUser));
//     },
//     onError: () => {
//       setUser(null);
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//       toast.error('Session expired. Please log in again.');
//       router.push('/login');
//     },
//     refetchOnWindowFocus: false,
//   });

//   if (isLoading && !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Checking authentication...
//       </div>
//     );
//   }
//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login: (email, firstName, lastName, id) => {
//           const newUser: User = { id, firstName, lastName, email };
//           setUser(newUser);
//           localStorage.setItem('user', JSON.stringify(newUser));
//         },
//         logout: () => {
//           setUser(null);
//           localStorage.removeItem('user');
//           localStorage.removeItem('token');
//           router.push('/login');
//         },
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// 6. Custom hook for context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
