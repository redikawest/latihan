import users from "../database/models/user"
import { ERR_PATIENT_NOT_FOUND, ERR_PATIENT_NULL } from "../helpers/Constant/errorConstant"
import { PATIENT } from "../helpers/Constant/roleConstant"
import { errorResponse, successResponse } from "../helpers/response"
import { patientData } from "../parsers/patients"

export const getPatients = async (req, res) => {
    try {
        const patients = await users.findAll({where: {role: PATIENT}})
        if (patients.length < 1) {
            return errorResponse(res, 400, ERR_PATIENT_NULL)
        }

        return successResponse(res, 'oke', patients)

    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}

export const getPatient = async (req, res) => {
    const patient = await users.findOne({
        where: {id: req.params.id},
        include: 'patient'
    })
    if(!patient) {
        return errorResponse(res, 400, ERR_PATIENT_NOT_FOUND)
    }

    return successResponse(res, 'oke', patientData(patient))
}

export const updatePatient = async () => {

}

export const deletePatient = async () => {

}