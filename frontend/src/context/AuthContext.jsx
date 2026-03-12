import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
