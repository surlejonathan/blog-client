import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const user = JSON.parse(localStorage.getItem("user")) || null;

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(user);

  const login = async (payload) => {
    console.log("URL", `${process.env.REACT_APP_CLIENT_BASE_URL}`);
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/login`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": process.env.REACT_APP_CLIENT_BASE_URL,
          "x-forwarded-proto": "https",
        },
        withCredentials: true,
      }
    );
    setCurrentUser(data);
  };

  const logout = async () => {
    await axios.post(`${process.env.REACT_APP_API_URL}/auth/logout`, {
      headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_CLIENT_BASE_URL,
      },
      withCredentials: true,
    });
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
