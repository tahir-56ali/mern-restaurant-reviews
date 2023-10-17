export default class UserController {
  static getCurrentUser(req, res) {
    console.log("current user: ", req.user);
    if (req.user) {
      res.json({ user: req.user });
    } else {
      res.json({ user: null });
    }
  }

  static login(req, res) {
    console.log("comes here 2");
    return res.send(req.user);
  }

  static logout(req, res) {
    if (req.user) {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ message: "Logout failed" });
        }
        res.status(200).json({ message: "Successfully logged out" });
      });
    } else {
      res.send({ msg: "no user to log out" });
    }
  }
}
