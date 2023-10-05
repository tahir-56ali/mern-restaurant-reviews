import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json()); // our server can accept json in the body of a request

export default app;
