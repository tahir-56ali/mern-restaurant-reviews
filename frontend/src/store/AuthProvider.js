import { useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    setUser(null);
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
