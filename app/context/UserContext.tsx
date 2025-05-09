'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { LoginCredentials } from '../lib/types';

interface LoginContextType {
  loginData: LoginCredentials;
  setLoginData: (data: LoginCredentials) => void;
}

// Create a default value for the context
const defaultLoginData: LoginCredentials = {
  name: '',
  password: '',
  tenant: '',
  branch: '',
  vendor: ''
};

const LoginContext = createContext<LoginContextType>({
  loginData: defaultLoginData,
  setLoginData: () => {}
});

export function LoginProvider({ children }: { children: ReactNode }) {
  const [loginData, setLoginData] = useState<LoginCredentials>(defaultLoginData);

  useEffect(() => {
    const stored = localStorage.getItem('loginData');
    if (stored) {
      const parsedData = JSON.parse(stored);
      setLoginData(parsedData);
    }
  }, []); // Empty dependency array = run once on mount

  // Save to localStorage whenever loginData changes
  useEffect(() => {
    if (loginData !== defaultLoginData) {
      localStorage.setItem('loginData', JSON.stringify(loginData));
      setLoginData(loginData);
    }
  }, [loginData]);

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginData() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLoginData must be used within a LoginProvider');
  }
  return context;
}