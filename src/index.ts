import "reflect-metadata";
import { createConnection } from "typeorm";

import * as express from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";

import { RootRoutes } from "./routes/RootRoutes";
import { TodoRoutes } from "./routes/TodoRoutes";
import { UserRoutes } from "./routes/UserRoutes";

// connection settings are in the "ormconfig.json" file
createConnection()
  .then(async connection => {
    // create express app
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(cors());
    app.use(morgan("combined"));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // register all application routes
    app.use("/", RootRoutes);
    app.use("/todos", TodoRoutes);
    app.use("/users", UserRoutes);

    // run app
    app.listen(PORT, () => {
      console.log(`Impact Todo API is listening on :${PORT}`);
    });
  })
  .catch(error => console.log("Error: ", error));
