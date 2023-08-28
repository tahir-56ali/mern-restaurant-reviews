import { useEffect, useState } from "react";
import RestaurantDataService from "../services/RestaurantDataService";
import Card from "./UI/Card";
import { Link } from "react-router-dom";

const RestaurantsList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [searchCuisine, setSearchCuisine] = useState("");
  const [cuisines, setCuisines] = useState(["All Cuisines"]);

  useEffect(() => {
    retrieveRestaurants();
    retrieveCuisines();
  }, []);

  const retrieveRestaurants = async () => {
    try {
      const loadedRestaurants = await RestaurantDataService.getAll();
      setRestaurants(loadedRestaurants.data.restaurants);
    } catch (e) {
      console.log(e);
    }
  };

  const retrieveCuisines = async () => {
    try {
      const loadedCuisines = await RestaurantDataService.getCuisines();
      setCuisines(["All Cuisines"].concat(loadedCuisines.data));
    } catch (e) {
      console.log(e);
    }
  };

  const searchNameChangeHandler = (e) => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const searchZipChangeHandler = (e) => {
    const searchZip = e.target.value;
    setSearchZip(searchZip);
  };

  const searchCuisineChangeHandler = (e) => {
    const searchCuisine = e.target.value;
    setSearchCuisine(searchCuisine);
  };

  const refreshRestaurants = () => {
    retrieveRestaurants();
  };

  const find = async (query, by, page = 0) => {
    try {
      const response = await RestaurantDataService.find(query, by, page);
      setRestaurants(response.data.restaurants);
    } catch (e) {
      console.log(e);
    }
  };

  const searchNameHandler = () => {
    find(searchName, "name");
  };

  const searchZipHandler = () => {
    find(searchZip, "zipcode");
  };

  const searchCuisineHandler = () => {
    if (searchCuisine === "All Cuisines") {
      refreshRestaurants();
    } else {
      find(searchCuisine, "cuisine");
    }
  };

  return (
    <div>
      <div className="row pb-1">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Search by name"
            value={searchName}
            onChange={searchNameChangeHandler}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={searchNameHandler}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="zip"
            placeholder="Search by zip"
            value={searchZip}
            onChange={searchZipChangeHandler}
          />
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={searchZipHandler}
            >
              Search
            </button>
          </div>
        </div>
        <div className="input-group">
          <select
            className="form-control"
            id="cuisine"
            onChange={searchCuisineChangeHandler}
          >
            {cuisines.map((cuisine, idx) => (
              <option value={cuisine} key={idx}>
                {cuisine}
              </option>
            ))}
          </select>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={searchCuisineHandler}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {restaurants.map((restaurant) => {
          const address =
            restaurant.address.building +
            " " +
            restaurant.address.street +
            ", " +
            restaurant.address.zipcode;
          return (
            <div className="col-lg-4 pb-1">
              <Card>
                <h5 className="card-title">{restaurant.name}</h5>
                <p className="card-text">
                  <strong>Cuisine: </strong>
                  {restaurant.cuisine}
                  <br />
                  <strong>Address: </strong>
                  {address}
                </p>
                <div className="row">
                  <Link className="btn btn-primary col-lg-5 mx-1 mb-1">
                    View Reviews
                  </Link>
                  <a
                    type="button"
                    target="_blank"
                    rel="noreferrer"
                    href={"https://www.google.com/maps/place/" + address}
                    className="btn btn-primary col-lg-5 mx-1 mb-1"
                  >
                    View Map
                  </a>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RestaurantsList;
