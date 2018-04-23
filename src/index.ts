import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import * as express from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as boolParser from "express-query-boolean";

import { RootRoutes } from "./routes/RootRoutes";
import { TodoRoutes } from "./routes/TodoRoutes";
import { UserRoutes } from "./routes/UserRoutes";

const OPTIONS = require("../ormconfig");

createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(morgan("combined"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(boolParser());

    // register all application routes
    app.use("/", RootRoutes);
    app.use("/todos", TodoRoutes);
    app.use("/users", UserRoutes);

    // run app
    app.listen(PORT, () => {
      console.log({
        message: `Impact Todo API is listening on :${PORT}`,
        datetime: new Date(),
        options: OPTIONS
      });
    });
  })
  .catch(error => console.log("Error: ", error));
