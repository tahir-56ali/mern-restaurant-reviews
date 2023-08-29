import http from "../http-common";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }
  get(id) {
    return http.get(`/id/${id}`);
  }
  getCuisines() {
    return http.get("cuisines");
  }
  find(query, by, page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }
  createReview(data) {
    return http.post("/review", data);
  }
  updateReview(data) {
    return http.put("/review", data);
  }
  deleteReview(reviewId, userId) {
    return http.delete("/review", {
      data: { review_id: reviewId, user_id: userId },
    });
  }
}

const restaurantDataService = new RestaurantDataService();

export default restaurantDataService;
