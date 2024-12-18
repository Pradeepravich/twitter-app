import React, { createContext, ReactNode, useEffect, useState } from "react";
import { PATHS } from "../utils";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  dob: string;
};

interface AuthContextValue {
  userData: User | null;
  setUserData: React.Dispatch<React.SetStateAction<User | null>>;
  logout: (navigate: (path: string) => void) => boolean
}
export const AuthContext = createContext<AuthContextValue>(
  {} as AuthContextValue
);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [userData, setUserData] = useState<User | null>(()=>{
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      return JSON.parse(storedUserData);
    }
    return null;
  });

  const logout = (navigate:(path:string)=>void) => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        localStorage.removeItem("userData");
        navigate(PATHS.frontpage);
        return true;
      }
      return false;
  };

  useEffect(() => {
    // Update localStorage whenever userData changes
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
