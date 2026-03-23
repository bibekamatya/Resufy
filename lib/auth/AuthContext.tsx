"use client";

import { createContext, useContext } from "react";
import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext<{
  user: any;
  loading: boolean;
  signIn: () => void;
  signOut: () => void;
}>({ 
  user: null, 
  loading: true,
  signIn: () => {},
  signOut: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  const handleSignIn = () => {
    signIn('google');
  };
  
  const handleSignOut = () => {
    signOut();
  };

  return (
    <AuthContext.Provider value={{ 
      user: session?.user || null, 
      loading: status === 'loading',
      signIn: handleSignIn,
      signOut: handleSignOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </SessionProvider>
  );
};

export const useAuth = () => useContext(AuthContext);
