import "reflect-metadata";
import { createConnection } from "typeorm";

// connection settings are in the "ormconfig.json" file
createConnection()
  .then(async connection => {
    // EXPRESS CODE HERE
  })
  .catch(error => console.log("Error: ", error));
