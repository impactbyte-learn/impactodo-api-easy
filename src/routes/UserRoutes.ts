import * as express from "express";
import { UserController } from "../controller/UserController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const UserRoutes: express.Router = express
  .Router()
  .get("/", UserController.findAll)
  .get("/", UserController.findByEmail)
  .get("/:id", UserController.findById)
  .post("/register", UserController.register)
  .post("/login", UserController.login)
  .put("/:id", AuthMiddleware.checkToken, UserController.updateById)
  .delete("/", AuthMiddleware.checkToken, UserController.destroyAll)
  .delete("/:id", AuthMiddleware.checkToken, UserController.destroyById);
