import { addSeconds, generateRandomInt } from "../../../helpers"
import { bcryptPassword } from "../../../helpers/bcrypt"
import { PATIENT_ID } from "../../../helpers/Constant/roleConstant"
import { PENDING_ID } from "../../../helpers/Constant/statusConstant"

export const saveUser = async (body) => {

    body.password = await bcryptPassword(body.password)
    body.role = PATIENT_ID
    body.status = PENDING_ID

    return body
}

export const saveActivation = (body, user) => {

    body.userId = user.id
    body.token = generateRandomInt(6)
    body.expireTime = addSeconds(100)

    return body
}

export const savePatient = (body, user) => {
    body.userId = user.id
    
    return body
}