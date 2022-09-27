import jwt from "jsonwebtoken"
import { errorResponse } from "../../helpers/response";

export const generateToken = async (payload) => {

    const token = await jwt.sign(payload, 'shhhhh');

    return token
}

export const verifyToken = async (req, res, next) => {
    if (!req.header("Authorization")) {
        return errorResponse(res, 401, 'No Token Provide!');
    }

    try {
        const token = req.header("Authorization").split(" ")[1];
        const decoded = jwt.verify(token, privateKey);
        req.user = decoded;
        next();
      } catch (ex) {
        return errorResponse(res, 403, "Invalid Token!")
      }
}