import { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const AddReview = () => {
  const authCtx = useContext(AuthContext);
  let review = "";
  let title = "Create";
  const location = useLocation();

  const currentReview = location.state ? location.state.currentReview : null;
  if (currentReview && currentReview.user_id === authCtx.user.id) {
    title = "Edit";
    review = currentReview.text;
  }
  return (
    <div>
      <div className="form-group">
        <label htmlFor="text">{title}</label>
        <input type="text" className="form-control" id="text" value={review} />
      </div>
      <button className="btn btn-success mt-1">Submit</button>
    </div>
  );
};

export default AddReview;
