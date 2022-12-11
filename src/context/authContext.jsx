import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const user = JSON.parse(localStorage.getItem("user")) || null;

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const login = async (payload) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      payload
    );
    setCurrentUser(data);
  };

  const logout = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`);
    setCurrentUser(null);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
