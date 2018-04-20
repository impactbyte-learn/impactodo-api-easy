const jwt = require("jsonwebtoken");

export class JWTHelper {
  public static async signToken(payload) {
    try {
      const secret = process.env.SECRET || "supersecretsecret";
      const token = jwt.sign(payload, secret);
      return token;
    } catch (error) {
      return error;
    }
  }
}
