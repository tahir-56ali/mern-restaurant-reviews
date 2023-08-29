import { useContext, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthContext from "../store/AuthContext";
import RestaurantDataService from "../services/RestaurantDataService";

const AddReview = () => {
  const authCtx = useContext(AuthContext);
  let initialValue = "";
  let title = "Create";
  const location = useLocation();
  const params = useParams();

  const currentReview = location.state ? location.state.currentReview : null;
  if (currentReview && currentReview.user_id === authCtx.user.id) {
    title = "Edit";
    initialValue = currentReview.text;
  }

  const [review, setReview] = useState(initialValue);
  const [submitted, setSubmitted] = useState(false);

  const submitHandler = async () => {
    const data = {
      text: review,
      user_id: authCtx.user.id,
      name: authCtx.user.name,
      restaurant_id: params.id,
    };

    if (title === "Edit") {
      data.review_id = currentReview._id;
      await RestaurantDataService.updateReview(data)
        .then((response) => {
          console.log(response.data);
          setSubmitted(true);
        })
        .catch((e) => console.log(e));
    } else {
      await RestaurantDataService.createReview(data)
        .then((response) => {
          console.log(response.data);
          setSubmitted(true);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <Link className="btn btn-primary" to={`/restaurants/${params.id}`}>
            Back to Restaurant
          </Link>
        </div>
      ) : (
        <div className="submit-form">
          {authCtx.user ? (
            <div className="form-group">
              <label htmlFor="text">{title}</label>
              <input
                type="text"
                className="form-control"
                id="text"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <button className="btn btn-success mt-1" onClick={submitHandler}>
                Submit
              </button>
            </div>
          ) : (
            <p>Please Login.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AddReview;
