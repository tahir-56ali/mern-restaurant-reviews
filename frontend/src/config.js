const dev = {
  API_URL: "http://localhost:5000/api/v1",
};

const prod = {
  API_URL: "https://restaurant-reviews-mern.cyclic.app/api/v1",
};

const config = process.env.REACT_APP_NODE_ENV === "development" ? dev : prod;

export default config;
