import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    setRole(null);
    setProfile({
      companyName: '',
      phone: '',
      fullName: '',
    });
  };

  const [profile, setProfile] = useState({
    companyName: '',
    phone: '',
    fullName: '',
  });

  const updateProfile = (data) => {
    setProfile(data);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        role,
        setRole,
        profile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
