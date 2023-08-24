import express from "express";

const router = express.Router();

router.route("/").get((req, res) => {
  res.json("hello world");
});

export default router;
