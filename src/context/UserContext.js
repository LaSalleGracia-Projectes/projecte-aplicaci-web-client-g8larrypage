'use client'

import { createContext, useState, useEffect } from 'react';
import supabase from "@/helpers/supabaseClient";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsLoggedIn(true);
        const { data: user, error } = await supabase
          .from('Usuario')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
        if (user) {
          setUserRole(user.role);
          setUser(data.session.user);
        }
      }
    };
    checkSession();
  }, []);

  return (
    <UserContext.Provider value={{ user, userRole, isLoggedIn, setUser, setUserRole, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};