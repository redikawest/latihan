import express from "express"


const routes = express.Router();
const adminUrl = '/administrator';
const userUrl = '/api';

import admin from "./admin"
import user from "./user"

routes.use(adminUrl,  admin)
routes.use(userUrl, user)

export default routes