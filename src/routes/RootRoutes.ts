import * as express from "express";

export const RootRoutes: express.Router = express
  .Router()
  .get("/", (req, res, next) => {
    res.send({ message: `Impact Todo API` });
  });
