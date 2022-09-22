import { UNKNOWN } from "./errorConstant";

export const ADMIN_ID = 1
export const PATIENT_ID = 2
export const DOCTOR_ID = 3
export const NURSE_ID = 4

const ADMIN = "admin";
const PATIENT = "patient"
const DOCTOR = "doctor"
const NURSE = "nurse"

export const getRole = (id) => {
    switch (id) {
        case ADMIN_ID:
            return {
                id: id,
                name: ADMIN
            }
        case PATIENT_ID:
            return {
                id: id,
                name: PATIENT
            }
        case DOCTOR_ID:
            return {
                id: id,
                name: DOCTOR
            }
        case NURSE_ID:
            return {
                id: id,
                name: NURSE
            }
        default: UNKNOWN
    }
}