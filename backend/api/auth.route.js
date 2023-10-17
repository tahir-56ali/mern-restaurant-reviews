import express from "express";
const router = express.Router();

import passport from "../passport/index.js";
import AuthCtrl from "./auth.controller.js";
import UserCtrl from "./user.controller.js";

router.get("/current_user", UserCtrl.getCurrentUser);
router.post(
  "/register",
  AuthCtrl.checkAlreadyRegistered,
  AuthCtrl.registerUser
);
router.post("/login", passport.authenticate("local"), UserCtrl.login);
router.post("/logout", UserCtrl.logout);

export default router;
