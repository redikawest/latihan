import express from "express";
import * as authController from "../../../controllers/authController"

const routes = express.Router();

routes.post('/login', authController.login)

export default routes