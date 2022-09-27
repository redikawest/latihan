import Patients from "../database/models/patient"
import Users from "../database/models/user"
import { ERR_PATIENT_NOT_FOUND, ERR_PATIENT_NULL } from "../helpers/Constant/errorConstant"
import { PATIENT_ID } from "../helpers/Constant/roleConstant"
import { errorResponse, successResponse } from "../helpers/response"

export const getPatients = async (req, res) => {
    try {
        const patients = await Users.findAll({where: {role: PATIENT_ID}})
        if (patients.length < 1) {
            return errorResponse(res, 400, ERR_PATIENT_NULL)
        }

        return successResponse(res, 'oke', patients)

    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}

export const getPatient = async (req, res) => {

    const patient = await Users.findOne({
        where: {id: req.params.id},
        include: [{
            model: Patients
        }]
    })
    if(!patient) { return errorResponse(res, 400, ERR_PATIENT_NOT_FOUND)}
    
    return successResponse(res, 'oke', patient)
}

export const updatePatient = async () => {

}

export const deletePatient = async () => {

}