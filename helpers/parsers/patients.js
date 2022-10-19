import { getStatus } from "../helpers/Constant/statusConstant"


export const patientData = (user) => {
    return {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        status: getStatus(user.status),
    }
}