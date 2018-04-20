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

  public static async verifyToken(token) {
    try {
      return await jwt.verify(token, "supersecretsecret");
    } catch (error) {
      return error;
    }
  }
}
