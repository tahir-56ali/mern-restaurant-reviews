import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const loginHandler = () => {
    const user = {
      name: username,
      id: userId,
    };
    authCtx.login(user);
    navigate("/restaurants");
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="userId">ID</label>
        <input
          type="text"
          className="form-control"
          id="userId"
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      <button className="btn btn-success mt-1" onClick={loginHandler}>
        Login
      </button>
    </div>
  );
};

export default Login;
