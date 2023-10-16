import { useContext, useState } from "react";
import AuthContext from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import config from "../config";
import axios from "axios";

const Register = () => {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const registerHandler = (e) => {
    e.preventDefault();

    axios({
      url: `${config.API_URL}/auth/register`,
      method: "POST",
      data: { username, password, email },
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.error) {
            setError(res.data.error);
          } else {
            const user = {
              name: res.data.username,
              id: res.data._id,
            };
            authCtx.login(user);
            navigate("/restaurants");
          }
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setError(response.data.message || response.data);
      });
  };

  return (
    <form onSubmit={registerHandler} method="POST">
      <div>
        {error}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-success mt-1" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default Register;
