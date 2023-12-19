const { Game, User } = require("../models/");

class Controller {

  static async ehehe(req, res, next) {
    try {
      const message2 = "ehehehehehhehehe";
      res.status(200).json({ message: message2 });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, password, email } = req.body
      const createdUser = await User.create({ username, password, email });
      res.status(200).json({ 
        "username": createdUser.username,
        "email": createdUser.email
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
