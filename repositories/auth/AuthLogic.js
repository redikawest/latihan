import { logger } from "../../config/logger";
import maindb from "../../config/sequelize";
import Activations from "../../database/models/activation";
import Patients from "../../database/models/patient";
import patients from "../../database/models/patient";
import Users from "../../database/models/user";
import { addSeconds, bcryptPassword, generateRandomInt } from "../../helpers";
import { comparePassword } from "../../helpers/bcrypt";
import { EMAIL_ALREADY_EXISTS, EMAIL_NOT_FOUND, ERR_ACCOUNT_BANNED, ERR_ACCOUNT_PENDING, ERR_AUTH_PASSWORD_NOT_MATCH, ERR_CREATE_ACTIVATION, ERR_CREATE_USER, ERR_PASSWORD_NOT_SAME, ERR_SAVE_PATIENT_INFORMATION } from "../../helpers/Constant/errorConstant";
import { PATIENT_ID } from "../../helpers/Constant/roleConstant";
import { BANNED_ID, PENDING_ID } from "../../helpers/Constant/statusConstant";
import { SUCCESS_LOGIN } from "../../helpers/Constant/successConstant";
import { createData, getDataWhere } from "../../helpers/query";
import { errorResponse, successResponse } from "../../helpers/response";
import { generateToken } from "../../middleware/auth/authentication";
import { userCreate } from "../../helpers/parsers/user";
import { parseStringifyData } from "../../utils/parse";
import * as request from "./request/authRequest"


export const loginLogic = async (body, res) => {
    try {

        const user = await getDataWhere(Users, 'email', body.email)
        if (!user) {
            return errorResponse(res, 403, EMAIL_NOT_FOUND)
        }

        if (user.status === PENDING_ID) {
            return errorResponse(res, 400, ERR_ACCOUNT_PENDING)
        }

        if (user.status === BANNED_ID) {
            return errorResponse(res, 403, ERR_ACCOUNT_BANNED)
        }

        const passwordCheck = await comparePassword(body.password, user.password)
        if (!passwordCheck) {
            return errorResponse(res, 403, ERR_AUTH_PASSWORD_NOT_MATCH)
        }

        const data = {
            email: user.email,
            role: user.role,
            status: user.status
        }
        const token = await generateToken(data);

        return successResponse(res, SUCCESS_LOGIN, token)
        

    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}

export const registerLogic = async (userBody, res) => {

    let transaction

    try {

        // await maindb.transaction(async (t) => {
            transaction = await maindb.transaction()
            // const userData = await getDataWhere(Users, 'email', userBody.email)
            // if(userData) {
            //     return errorResponse(res, 409, EMAIL_ALREADY_EXISTS);
            // }

            if (userBody.password !== userBody.confirmPassword) {
                return errorResponse(res, 403, ERR_PASSWORD_NOT_SAME)
            }
    
            const newUser = await createData(Users, parseStringifyData(await request.saveUser(userBody)), transaction);
            if (!newUser) {
                return errorResponse(res, ERR_CREATE_USER);
            }

            // const activation = await createActivation(t, newUser);
            const activation = await createData(Activations, parseStringifyData(request.saveActivation(userBody, newUser)), transaction)
            if (!activation) {
                return errorResponse(res, ERR_CREATE_ACTIVATION);
            }

            // const patient = await createPatient(userBody, t, newUser)
            const patient = await createData(Patients, parseStringifyData(request.savePatient(userBody, newUser)), transaction)
            if (!patient) {
                return errorResponse(res, ERR_SAVE_PATIENT_INFORMATION)
            }

            await transaction.commit()

            // TODO kirim email berisi token buat verifikasi account

            return successResponse(res, "User created successfully!", userCreate(newUser, patient));
        // })

    } catch (error) {
        logger.log({level: 'info', message: error})
        if(transaction) { await transaction.rollback() }
        return errorResponse(res, 500, error.message);
    }
}

export const verifyTokenLogic = async (userBody, res) => {
    try {
        
        const user = users.findOne({where: {email: userBody.email}})
        if (!user) {
            return errorResponse(res, 400, EMAIL_NOT_FOUND)
        }

        

    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}

export const requestTokenLogic = async (userBody, res) => {
    try {
        
    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}

export const forgotPasswordLogic = async (userBody, res) => {
    try {
        
        const user = await users.findOne({where: {email: userBody.email}})
        if (!user) {
            return errorResponse(res, 400, EMAIL_NOT_FOUND)
        }

        // TODO generate new password

        // TODO save new password to db

        // TODO kirim password ke email

    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}

const createUser = async (body, t) => {
    return Users.create({
        email: body.email,
        password: await bcryptPassword(body.password),
        role: PATIENT_ID,
        status: PENDING_ID,
    }, {transaction: t})
}

const createActivation = async (t, user) => {
    return Activations.create({
        userId: user.id,
        token: generateRandomInt(6),
        expireTime: addSeconds(180),
    }, {transaction: t})
}

const createPatient = async (body, t, user) => {
    
    let patient = patients.create({
        userId: user.id,
        name: body.name,
        birthPlace: body.birthPlace,
        birthDate: body.birthDate,
        phone: body.phone,
        sex: body.sex,
        salutation: body.salutation,
        isMarried: body.isMarried,
        address: body.address,
        city: body.city,
        identityType: body.identityType,
        identityId: body.identityId,
        religion: body.religion
    }, {transaction: t})
    

    return patient
}