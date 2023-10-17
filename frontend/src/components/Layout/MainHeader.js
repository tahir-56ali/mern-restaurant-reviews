import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import axios from "axios";
import config from "../../config";

const MainHeader = () => {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${config.API_URL}/auth/current_user`,
          { withCredentials: true }
        );
        if (response.data.user) {
          authCtx.login(response.data.user);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-1">
      <Link className="navbar-brand" to="/restaurants">
        Restaurant Reviews
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/restaurants">
              Restaurants
            </Link>
          </li>
          {authCtx.user ? (
            <li className="nav-item">
              <Link className="nav-link" onClick={authCtx.logout}>
                Logout {authCtx.user.name}
              </Link>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default MainHeader;
