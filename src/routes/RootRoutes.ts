import * as express from "express";

import { AuthMiddleware } from "../middleware/AuthMiddleware";

export const RootRoutes: express.Router = express
  .Router()
  .get("/", (req, res, next) => {
    res.send({ message: `Impact Todo API` });
  })
  .get("/protected", AuthMiddleware.checkToken, (req, res, next) => {
    res.send({
      message: `YOU HAVE ACCESS TO PROTECTED ROUTE`,
      token: req.token,
      decoded: req.decoded
    });
  });
