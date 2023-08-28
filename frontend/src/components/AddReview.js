import { useLocation } from "react-router-dom";

const AddReview = () => {
  let review = "";
  let title = "Create";
  const location = useLocation();

  const user_id = "1234";
  const currentReview = location.state ? location.state.currentReview : null;
  if (currentReview && currentReview.user_id === user_id) {
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
