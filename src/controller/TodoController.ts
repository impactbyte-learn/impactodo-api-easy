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

  public static async create(req, res, next) {
    const payload = {
      text: req.body.text,
      created_at: new Date(),
      bookmark: false
    };

    try {
      const todo = await Todo.create(payload);
      await todo.save();
      res.send({
        message: "[i] NEW TODO CREATED",
        todo
      });
    } catch (error) {
      res.send(error);
    }
  }

  public static async destroyAll(req, res, next) {
    try {
      await Todo.clear();
      res.send({
        message: "[i] ALL TODOS DELETED"
      });
    } catch (error) {
      res.send(error);
    }
  }

  public static async destroyById(req, res, next) {
    const id = req.params.id;

    try {
      await Todo.removeById(id);
      console.log(`[i] TODO WITH ID ${id} DELETED`);
    } catch (error) {
      console.log("[i] ERROR", error);
    }
  }

  public static async destroyByText(text: string) {
    try {
      const id = await Todo.findByText(text);
      await Todo.remove(id);
      console.log("[i] ALL TODOS DELETED");
    } catch (error) {
      console.log("[i] ERROR", error);
    }
  }

  public static async updateById(req, res, next) {
    const id = req.params.id;
    const newText = req.body.text;

    try {
      await Todo.updateById(id, { text: newText });
      console.log(`[i] TODO WITH ID ${id} IS UPDATED`);
    } catch (error) {
      console.log("[i] ERROR", error);
    }
  }
}
