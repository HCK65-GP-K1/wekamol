const { comparePwDecrypted } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { Game, User } = require("../models/");
const { Op } = require("sequelize");

class Controller {
  static async ehehe(req, res, next) {
    try {
      const message2 = "ehehehehehhehehe";
      res.status(200).json({ message: message2 });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw {
          name: "InvalidInput"
        }
      }
      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { password }
          ]
        }
      })
      if (!user) {
        throw {
          name: "BadInput"
        }
      }

      const isPasswordsValid = comparePwDecrypted(password, user.password)
      if (!isPasswordsValid) {
        throw {
          name: "BadInput"
        }

      }
      let access_token = signToken({ id: user.id })

      res.status(200).json({ access_token })
    } catch (error) {
      next(error);
    }
  }
}


module.exports = Controller;
