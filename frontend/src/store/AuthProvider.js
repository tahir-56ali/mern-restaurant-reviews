import { useState } from "react";
import AuthContext from "./AuthContext";
import config from "../config";
import axios from "axios";

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    axios
      .post(`${config.API_URL}/auth/logout`, null, {
        withCredentials: true,
      })
      .then((response) => {
        setUser(null);
      })
      .catch((error) => {
        // handle error
      });
  };

  const contextValue = {
    user: user,
    login: loginUser,
    logout: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
