import express from "express";
import * as patientController from "../../../controllers/patientController"

const routes = express.Router();

routes.get('', patientController.getPatients)
routes.get('/:id', patientController.getPatient)
routes.put('/:id', patientController.updatePatient)
routes.delete('/:id', patientController.deletePatient)

export default routes