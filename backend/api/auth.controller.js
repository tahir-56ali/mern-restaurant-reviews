import User from "../models/User.js";

export default class AuthController {
  static async checkAlreadyRegistered(req, res, next) {
    const { username } = req.body;
    const registered = await User.find({ username });
    console.log("registered", registered);
    if (registered[0] && registered[0]._id) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
      return;
    }
    next();
  }

  static async registerUser(req, res, next) {
    try {
      const { username, email, password } = req.body;
      console.log(username, email, password);
      const user = new User({ username, email });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
      });
      return res.send(req.user);
    } catch (e) {
      res.json({ error: e.message });
    }
  }
}
