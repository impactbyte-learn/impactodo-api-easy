const env = process.env.NODE_ENV;

const options =
  env === "development"
    ? {
        type: "mongodb",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: "localhost",
        database: "impactodo",
        synchronize: true,
        logging: true,
        entities: ["src/entity/*.ts"]
      }
    : {
        type: "mongodb",
        host: process.env.DB_HOST || "text.mlab.com",
        port: process.env.DB_PORT || 27017,
        database: "impactodo",
        username: process.env.DB_USERNAME || "admin",
        password: process.env.DB_PASSWORD || "adminpassword",
        synchronize: true,
        logging: ["query", "error"],
        entities: ["build/entity/*.js"]
      };

module.exports = options;
