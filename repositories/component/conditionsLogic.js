import Conditions from "../../database/models/component/conditions"
import { ERR_CONDITIONS_EXIST, ERR_CONDITION_CREATE } from "../../helpers/Constant/errorConstant"
import { SUCCESS_CONDITION_CREATE } from "../../helpers/Constant/successConstant"
import { errorResponse, successResponse } from "../../helpers/response"

export const gets = async () => {

}

export const get = async () => {

}

export const create = async (req, res) => {
    try {

        const condition = await Conditions.findOne({where: {name: req.name}})
        if (condition) {
            return errorResponse(res, 400, ERR_CONDITIONS_EXIST)
        }

        const create = await Conditions.create(req.all)
        if (!create) {
            return errorResponse(res, 500, ERR_CONDITION_CREATE)
        }

        return successResponse(res, SUCCESS_CONDITION_CREATE, create)

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const update = async () => {
    try {
        
    } catch (error) {
        
    }
}

export const deleted = async () => {
    try {
        
    } catch (error) {
        
    }
}