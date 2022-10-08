import express from "express";
import { verifyToken } from "../../../middleware/auth/authentication";
import component from "./component"
import patient from "./patients"
import auth from "./auth"

const routes = express.Router()

routes.use("/component", verifyToken, component)
routes.use("/patient", patient)
routes.use("/auth", auth)

export default routes