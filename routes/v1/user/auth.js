import express from "express";
import validate from "../../../middleware/validation/validate";
import * as authValidation from "../../../middleware/validation/authValidation"
import * as authController from "../../../controllers/authController"



const routes = express.Router();

routes.post("/login", validate(authValidation.login), authController.login);
routes.post("/register", validate(authValidation.register), authController.register)
routes.post("/verify-token", validate(authValidation.verifyToken), authController.verifyToken)
routes.post("/forgot-password", validate(authValidation.forgotPassword), authController.forgotPassword)
routes.put("/request-token", validate(authValidation.requestToken), authController.requestToken)

export default routes;