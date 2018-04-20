import { getMongoManager, getMongoRepository } from "typeorm";

const ObjectID = require("bson-objectid");

import { Todo } from "../entity/Todo";

export class TodoController {
  public static async findAll(req, res, next) {
    try {
      const todos = await Todo.find();
      res.send(todos);
    } catch (error) {
      res.send(error);
    }
  }

  public static async findById(req, res, next) {
    try {
      const todos = await Todo.findOneById(req.params.id);
      res.send(todos);
    } catch (error) {
      res.send(error);
    }
  }

  public static async findByText(req, res, next) {
    try {
      const todos = await Todo.findByText(req.query.text);
      res.send(todos);
    } catch (error) {
      res.send(error);
    }
  }

  public static async findByBookmark(req, res, next) {
    const bookmark = req.query.bookmark;

    try {
      const todos = await Todo.findByBookmark(bookmark);
      res.send(todos);
    } catch (error) {
      res.send(error);
    }
  }

  public static async create(req, res, next) {
    const payload = {
      text: req.body.text
    };

    try {
      const todo = await Todo.create(payload);
      await todo.save();
      res.send({ message: "[i] NEW TODO CREATED", todo });
    } catch (error) {
      res.send(error);
    }
  }

  public static async destroyAll(req, res, next) {
    try {
      await Todo.clear();
      res.send({ message: "[i] ALL TODOS DELETED" });
    } catch (error) {
      res.send(error);
    }
  }

  public static async destroyById(req, res, next) {
    const id: string = req.params.id;

    try {
      const deleted = await Todo.findOneById(id);
      deleted.remove();
      res.send({ message: "[i] TODO IS DELETED", id });
    } catch (error) {
      res.send(error);
    }
  }

  public static async destroyByText(req, res, next) {
    const text: string = req.query.text;

    try {
      const id = await Todo.findByText(text);
      await Todo.remove(id);
      res.send({ message: "[i] ALL TODOS DELETED" });
    } catch (error) {
      res.send(error);
    }
  }

  public static async updateById(req, res, next) {
    const mongo = getMongoRepository(Todo);
    const id = req.params.id;

    let payload = {};
    if (req.body.text) payload.text = req.body.text;
    if (req.body.bookmark) payload.bookmark = req.body.bookmark;

    try {
      const result = await mongo.findOneAndUpdate(
        { _id: ObjectID(id) },
        { $set: payload },
        { upsert: true }
      );
      res.send({
        message: `[i] TODO IS UPDATED`,
        payload
      });
    } catch (error) {
      res.send(error);
    }
  }
}
