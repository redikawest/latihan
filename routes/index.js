import express from "express"
import { errorResponse } from "../helpers/response";
import v1 from "./v1/index"


const routes = express.Router();

const index = function (req, res, next) {
    return errorResponse(res, 404, "Resources not found")
};

routes.use('/v1', v1)

routes.all("/", index);
routes.all("*", index);

export default routes