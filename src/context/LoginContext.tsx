'use client'
import { createContext, useContext, useState, ReactNode } from "react";

interface LoginContextType {
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  hasReviewed: boolean;
  setHasReviewed: (hasReviewed: boolean) => void;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [hasReviewed, setHasReviewed] = useState<boolean>(true);

  return (
    <LoginContext.Provider value={{ isLoginOpen, setIsLoginOpen, hasReviewed, setHasReviewed }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
};

