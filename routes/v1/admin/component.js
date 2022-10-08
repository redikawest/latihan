import express from "express";
import * as conditionController from "../../../controllers/component/conditionController"
import * as categoryController from "../../../controllers/component/categoriesController"
import * as componentValidation from "../../../middleware/validation/component"
import validate from "../../../middleware/validation/validate";
import { verifyToken } from "../../../middleware/auth/authentication";

const routes = express.Router();

routes.get('/condition', conditionController.gets)
routes.get('/condition/:conditionId', conditionController.get)
routes.post('/condition', validate(componentValidation.create), conditionController.create)
routes.put('/condition/:conditionId', validate(componentValidation.update), conditionController.update)
routes.delete('/condition/:conditionId', conditionController.deleted)

routes.get('/category', categoryController.gets)
routes.get('/category/:categoryId', categoryController.get)
routes.post('/category', validate(componentValidation.create), categoryController.create)
routes.put('/category/:categoryId', validate(componentValidation.update), categoryController.update)
routes.delete('category/:categoryId', categoryController.deleted)

export default routes