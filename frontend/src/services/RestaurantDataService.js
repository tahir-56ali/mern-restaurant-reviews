import http from "../http-common";

class RestaurantDataService {
  baseURL = "/restaurants";
  getAll(page = 0) {
    return http.get(`${this.baseURL}?page=${page}`);
  }
  get(id) {
    return http.get(`${this.baseURL}/id/${id}`);
  }
  getCuisines() {
    return http.get(`${this.baseURL}/cuisines`);
  }
  find(query, by, page = 0) {
    return http.get(`${this.baseURL}?${by}=${query}&page=${page}`);
  }
  createReview(data) {
    return http.post(`${this.baseURL}/review`, data);
  }
  updateReview(data) {
    return http.put(`${this.baseURL}/review`, data);
  }
  deleteReview(reviewId, userId) {
    return http.delete(`${this.baseURL}/review`, {
      data: { review_id: reviewId, user_id: userId },
    });
  }
}

const restaurantDataService = new RestaurantDataService();

export default restaurantDataService;
