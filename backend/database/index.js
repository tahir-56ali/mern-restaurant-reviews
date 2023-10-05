import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.RESTREVIEWS_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (err) => {
  console.error(`error → ${err.message}`);
});
db.once("open", () => {
  console.log("Database Connected");
});

export default mongoose.connection;
