export default class UserController {
  static getCurrentUser(req, res) {
    res.set("Cache-Control", "no-store");
    if (req.user) {
      const currentUser = {
        id: req.user._id,
        name: req.user.username,
      };
      res.json({ user: currentUser });
    } else {
      res.json({ user: null });
    }
  }

  static login(req, res) {
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
