import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import RestaurantDataService from "../services/RestaurantDataService";
import Card from "./UI/Card";
import AuthContext from "../store/AuthContext";

const Restaurant = () => {
  const authCtx = useContext(AuthContext);
  const initialState = {
    id: null,
    name: "",
    address: {},
    cuisine: "",
    reviews: [],
  };
  const [restaurant, setRestaurant] = useState(initialState);
  const params = useParams();

  useEffect(() => {
    retrieveRestaurant(params.id);
  }, [params.id]);

  const retrieveRestaurant = async (id) => {
    const loadedRestaurant = await RestaurantDataService.get(id);
    setRestaurant(loadedRestaurant.data);
  };

  const deleteReviewHandler = async (reviewId, index) => {
    try {
      await RestaurantDataService.deleteReview(reviewId, authCtx.user.id);
      setRestaurant((prevReview) => {
        prevReview.reviews.splice(index, 1);
        return {
          ...prevReview,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h5>{restaurant.name}</h5>
      <p>
        <strong>Cuisine: </strong>
        {restaurant.cuisine}
        <br />
        <strong>Address: </strong>
        {restaurant.address.building +
          " " +
          restaurant.address.street +
          ", " +
          restaurant.address.zipcode}
      </p>
      <Link to={`/restaurants/${params.id}/review`} className="btn btn-primary">
        Add Review
      </Link>
      <h4>Reviews</h4>
      <div className="row">
        {restaurant.reviews.length === 0 && <p>No reviews yet.</p>}
        {restaurant.reviews.map((review, idx) => {
          return (
            <div className="col-lg-4">
              <Card>
                <p className="card-text">
                  {review.text}
                  <br />
                  <strong>User: </strong>
                  {review.name}
                  <br />
                  <strong>Date: </strong>
                  {review.date}
                </p>
                {authCtx.user && authCtx.user.id === review.user_id && (
                  <div className="row">
                    <Link
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                      onClick={() => deleteReviewHandler(review._id, idx)}
                    >
                      Delete
                    </Link>
                    <Link
                      className="btn btn-primary col-lg-5 mx-1 mb-1"
                      to={`/restaurants/${review.restaurant_id}/review`}
                      state={{ currentReview: review }}
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Restaurant;
