import express from "express";
import cors from "cors";
import restaurantRouter from "./api/restaurants.route.js";

const app = express();

app.use(cors());
app.use(express.json()); // our server can accept json in the body of a request

// register routes
app.use("/api/v1/restaurants", restaurantRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

export default app;
