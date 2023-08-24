import mongodb from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

dotenv.config();

const port = process.env.port || 8000;

const MongoClient = mongodb.MongoClient;

MongoClient.connect(process.env.RESTREVIEWS_DB_URI, {
  maxPoolSize: 50,
  wtimeout: 2500,
  useNewUrlParser: true,
})
  .then((client) => {
    // initial reference to the restaurants and reviews collection in the database
    RestaurantsDAO.injectDB(client);
    ReviewsDAO.injectDB(client);

    app.listen(port, () => {
      console.log(`Listening at port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.stack);
    process.exit(1);
  });
