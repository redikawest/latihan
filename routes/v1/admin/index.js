import express from "express";
import { verifyToken } from "../../../middleware/auth/authentication";
import component from "./component"
import patient from "./patients"

const routes = express.Router()

routes.use("/component", verifyToken, component)
routes.use("/patient", patient)

export default routes