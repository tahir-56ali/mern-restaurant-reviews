import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();

    axios({
      url: "http://localhost:5000/api/v1/auth/login",
      method: "POST",
      data: { username, password },
    })
      .then((res) => {
        //window.localStorage.setItem("isAuthenticated", true);
        console.log(res);
        if (res.status === 200) {
          const user = {
            name: res.data.username,
            id: res.data._id,
          };
          authCtx.login(user);
          navigate("/restaurants");
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setError(response.data.message || response.data);
      });
  };

  return (
    <form
      action="http://localhost:5000/api/v1/auth/login"
      onSubmit={loginHandler}
      method="POST"
      noValidate
      className="validated-form"
    >
      <div>
        {error}
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-success mt-1" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
