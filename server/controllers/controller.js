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
          name: "InvalidInput",
        };
      }
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email }, { password }],
        },
      });
      if (!user) {
        throw {
          name: "BadInput",
        };
      }

      const isPasswordsValid = comparePwDecrypted(password, user.password);
      if (!isPasswordsValid) {
        throw {
          name: "BadInput",
        };
      }
      let access_token = signToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const createdUser = await User.create({ username, password, email });
      res.status(200).json({
        username: createdUser.username,
        email: createdUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserProfile(req, res, next) {
    try {
      const { id } = req.user;
      if (!id) {
        throw {
          name: "BadInput",
        };
      }
      const profile = await User.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!profile) {
        throw {
          name: "notFound",
        };
      }

      res.status(200).json(profile);
    } catch (error) {
      next(error);
    }
  }

  static async leaderBoard(req, res, next) {
    try {
      let leaderBoard = await User.leaderBoard();

      res.status(200).json(leaderBoard);
    } catch (error) {
      next(error);
    }
  }

  static async resultGame(req, res, next) {
    try {
      const { id } = req.user;
      const { room } = req.body;
      const { score } = req.body;

      //TAMBAH KE DB
      const addedScore = await Game.create({
        UserId: id,
        roomName: room,
        score: score,
      });

      let findUser = await User.findByPk(id);
      if (!findUser) throw { name: "notFound" };

      if (findUser.highestScore < score) {
        await findUser.update({ highestScore: score });
      }

      res.status(200).json({
        addedScore,
        message: `User ${findUser.username}'s highest score is now ${findUser.highestScore}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
