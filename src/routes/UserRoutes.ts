import * as express from "express";
import { UserController } from "../controller/UserController";

export const UserRoutes: express.Router = express
  .Router()
  .get("/", UserController.findAll)
  // .get("/:id", UserController.findById)
  // .get("/", UserController.findByText)
  // .post("/", UserController.create)
  .put("/:id", UserController.updateById)
  .delete("/", UserController.destroyAll)
  .delete("/:id", UserController.destroyById);
