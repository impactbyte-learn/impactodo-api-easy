import * as express from "express";
import { TodoController } from "../controller/TodoController";

export const TodoRoutes: express.Router = express
  .Router()
  .get("/", TodoController.findAll)
  .get("/:id", TodoController.findById)
  .get("/", TodoController.findByText)
  .post("/", TodoController.create)
  .put("/:id", TodoController.updateById)
  .delete("/", TodoController.destroyAll)
  .delete("/:id", TodoController.destroyById);
