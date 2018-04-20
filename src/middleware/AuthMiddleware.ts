import { JWTHelper } from "../helper/JWTHelper";

export class AuthMiddleware {
  public static async checkToken(req, res, next) {
    const authorization = req.headers.authorization;
    req.token = authorization && authorization.split(" ")[1];

    if (req.token) {
      try {
        req.decoded = await JWTHelper.verifyToken(req.token);
        next();
      } catch (error) {
        res.send(error);
      }
    } else {
      res.send({
        message:
          "[i] TOKEN IS NOT FOUND: Please put JWT into headers Authorization"
      });
    }
  }
}
