import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { userLoggedin } from "./functions";
import { createDefaultPreference } from "../database/database";


interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [ok,setOK]=useState(false);

  useEffect(() => {
    // Check if the user is not logged in
    if (!userLoggedin()) {
      // Redirect to the login page
      router.push('/auth/login');
    }else{
      setOK(true);
      createDefaultPreference();
    }
  }, [router]);

  return ok && children;
};

export default AuthProvider;
