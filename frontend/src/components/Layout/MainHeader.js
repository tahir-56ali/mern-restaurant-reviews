import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <nav class="navbar navbar-expand navbar-dark bg-dark mb-1">
      <Link class="navbar-brand" to="/restaurants">
        Restaurant Reviews
      </Link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <Link class="nav-link" to="/restaurants">
              Restaurants
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainHeader;
