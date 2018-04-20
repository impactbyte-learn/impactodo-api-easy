import * as express from "express";
import { UserController } from "../controller/UserController";

export const UserRoutes: express.Router = express
  .Router()
  .get("/", UserController.findAll)
  .get("/", UserController.findByEmail)
  .get("/:id", UserController.findById)
  .post("/register", UserController.register)
  .post("/login", UserController.login)
  .put("/:id", UserController.updateById)
  .delete("/", UserController.destroyAll)
  .delete("/:id", UserController.destroyById);
