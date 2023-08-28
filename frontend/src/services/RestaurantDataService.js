import http from "../http-common";

class RestaurantDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }
  getCuisines() {
    return http.get("cuisines");
  }
  find(query, by, page = 0) {
    return http.get(`?${by}=${query}&page=${page}`);
  }
}

const restaurantDataService = new RestaurantDataService();

export default restaurantDataService;
