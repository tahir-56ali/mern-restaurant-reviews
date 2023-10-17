import express from "express";
import mongodb from "mongodb";
import dotenv from "dotenv";
import app from "./server.js";
import dbConnection from "./database/index.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import RestaurantsDAO from "./dao/restaurantsDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";
import User from "./models/User.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import restaurantRouter from "./api/restaurants.route.js";
import authRouter from "./api/auth.route.js";

/****  Setup-start: Serving frontend app from frontend/build *****/
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/build")));
/****  Setup-end: Serving frontend app from frontend/build *****/

dotenv.config();

const port = process.env.port || 8000;
const dbUrl = process.env.RESTREVIEWS_DB_URI;

const secret = process.env.SECRET || "sY-%4E+mAAGYW#9";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const isProduction = process.env.NODE_ENV === "production";

const sessionConfig = {
  store,
  name: "restaurants",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: isProduction,
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// register routes
app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/auth", authRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file. handle all pages including 404
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

//app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

const MongoClient = mongodb.MongoClient;

MongoClient.connect(dbUrl, {
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
