const bcrypt = require("bcrypt-as-promised");

import { User } from "../entity/User";

export class UserController {
  public static async findAll(req, res, next) {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  }

  public static async findById(req, res, next) {
    try {
      const users = await User.findOneById(req.params.id);
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  }

  public static async findByEmail(req, res, next) {
    const text = req.body.text;

    try {
      const users = await User.findByEmail(text);
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  }

  public static async register(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const hash = await bcrypt.hash(password, 10);

    const payload = {
      email,
      password: hash
    };

    console.log(payload);

    try {
      const user = await User.create(payload);
      await user.save();
      res.send({
        message: "[i] NEW USER REGISTERED",
        user
      });
    } catch (error) {
      res.send(error);
    }
  }

  public static async login(req, res, next) {
    const payload = {
      email: req.body.email,
      password: req.body.password
    };

    try {
      const user = await User.findOneByEmail(payload.email);
      const validatedPassword = await bcrypt.compare(
        payload.password,
        user.password
      );
      delete user.password;
      res.send({
        message: "[i] USER LOGGED IN",
        user,
        validatedPassword
      });
    } catch (error) {
      res.send(error);
    }
  }

  public static async destroyAll(req, res, next) {
    try {
      await User.clear();
      res.send({
        message: "[i] ALL USERS DELETED"
      });
    } catch (error) {
      res.send(error);
    }
  }

  public static async destroyById(req, res, next) {
    const id = req.params.id;

    try {
      await User.removeById(id);
      res.send({
        message: `[i] USER WITH ID ${id} DELETED`
      });
    } catch (error) {
      res.send(error);
    }
  }

  public static async destroyByEmail(req, res, next) {
    const email = req.body.email;

    try {
      const id = await User.findByEmail(email);
      await User.remove(id);
      res.send({
        message: "[i] USER IS DELETED",
        email
      });
    } catch (error) {
      res.send(error);
    }
  }

  public static async updateById(req, res, next) {
    const id = req.params.id;
    const email = req.body.email;

    try {
      await User.updateById(id, { email });
      res.send({
        message: `[i] USER WITH ID ${id} IS UPDATED`
      });
    } catch (error) {
      res.send(error);
    }
  }
}
