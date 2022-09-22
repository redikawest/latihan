import { logger } from "../../config/logger";
import maindb from "../../config/sequelize";
import activations from "../../database/models/activation";
import patients from "../../database/models/patient";
import users from "../../database/models/user";
import { addSeconds, bcryptPassword, generateRandomInt } from "../../helpers";
import { comparePassword } from "../../helpers/bcrypt";
import { EMAIL_ALREADY_EXISTS, EMAIL_NOT_FOUND, ERR_ACCOUNT_BANNED, ERR_ACCOUNT_PENDING, ERR_AUTH_PASSWORD_NOT_MATCH, ERR_CREATE_ACTIVATION, ERR_CREATE_USER, ERR_PASSWORD_NOT_SAME, ERR_SAVE_PATIENT_INFORMATION } from "../../helpers/Constant/errorConstant";
import { PATIENT_ID } from "../../helpers/Constant/roleConstant";
import { BANNED, BANNED_ID, PENDING, PENDING_ID } from "../../helpers/Constant/statusConstant";
import { errorResponse, successResponse } from "../../helpers/response";
import { generateToken } from "../../middleware/auth/authentication";
import { userCreate } from "../../parsers/user";


export const loginLogic = async (userBody, res) => {
    try {

        const user = await users.findOne({where: {email: userBody.email}, raw: true})
        if (!user) {
            return errorResponse(res, 400, EMAIL_NOT_FOUND)
        }

        if (user.status === PENDING_ID) {
            return errorResponse(res, 400, ERR_ACCOUNT_PENDING)
        }

        if (user.status === BANNED_ID) {
            return errorResponse(res, 400, ERR_ACCOUNT_BANNED)
        }

        const passwordCheck = await comparePassword(userBody.password, user.password)
        if (!passwordCheck) {
            return errorResponse(res, 400, ERR_AUTH_PASSWORD_NOT_MATCH)
        }

        // TODO generate token jwt
        const token = await generateToken(user);

        return successResponse(res, "Login Success", token)
        

    } catch (error) {
        return errorResponse(res, 500, error.message)
    }
}

export const registerLogic = async (userBody, res) => {
    try {

        await maindb.transaction(async (t) => {

            const userData = await  users.findOne({where: {email: userBody.email}});
            if(userData) {
                return errorResponse(res, 400, EMAIL_ALREADY_EXISTS);
            }

            if (userBody.password !== userBody.confirmPassword) {
                return errorResponse(res, 400, ERR_PASSWORD_NOT_SAME)
            }
    
            const newUser = await createUser(userBody, t);
            if (!newUser) {
                return errorResponse(res, ERR_CREATE_USER);
            }

            const activation = await createActivation(t, newUser);
            if (!activation) {
                return errorResponse(res, ERR_CREATE_ACTIVATION);
            }

            const patient = await createPatient(userBody, t, newUser)
            if (!patient) {
                return errorResponse(res, ERR_SAVE_PATIENT_INFORMATION)
            }

            // TODO kirim email berisi token buat verifikasi account

            return successResponse(res, "User created successfully!", userCreate(newUser, patient));
        })

    } catch (error) {
        logger.log({level: 'info', message: error})
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
    return users.create({
        email: body.email,
        password: await bcryptPassword(body.password),
        role: PATIENT_ID,
        status: PENDING_ID,
    }, {transaction: t})
}

const createActivation = async (t, user) => {
    return activations.create({
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