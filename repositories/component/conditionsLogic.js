import { logger } from "../../config/logger"
import Conditions from "../../database/models/component/conditions"
import { ERR_CONDITIONS_EXIST, ERR_CONDITIONS_NOT_FOUND, ERR_CONDITION_CREATE, ERR_CONDITION_DELETE, ERR_CONDITION_UPDATE } from "../../helpers/Constant/errorConstant"
import { SUCCESS_CONDITION_CREATE, SUCCESS_CONDITION_DELETE, SUCCESS_CONDITION_UPDATE } from "../../helpers/Constant/successConstant"
import { createData, getDataWhere, updateData } from "../../helpers/query"
import { errorResponse, successResponse } from "../../helpers/response"
import * as conditionRequest from "./request/componentRequest"
import * as parser from "../../parsers/component/conditionParser"
import { parseStringifyData } from "../../utils/parse"

export const gets = async () => {

}

export const get = async (conditionId, res) => {
    const condition = await getDataWhere(Conditions, 'id', conditionId)
    if (!condition) {
        return errorResponse(res, 400, ERR_CONDITIONS_NOT_FOUND)
    }

    return successResponse(res, null, parser.basic(condition))
}

export const create = async (body, res) => {
    try {

        const condition = await getDataWhere(Conditions, 'name', body.name)
        if (condition) {
            return errorResponse(res, 400, ERR_CONDITIONS_EXIST)
        }
        
        const create = await createData(Conditions, parseStringifyData(conditionRequest.create(body)))
        if (!create) {
            return errorResponse(res, 500, ERR_CONDITION_CREATE)
        }

        return successResponse(res, SUCCESS_CONDITION_CREATE, parser.basic(create))

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const update = async (body, conditionId, res) => {
    try {
        
        const condition = await getDataWhere(Conditions, 'id', conditionId)
        if (!condition) {
            return errorResponse(res, 400, ERR_CONDITIONS_NOT_FOUND)
        }

        const update = await updateData(condition, parseStringifyData(conditionRequest.create(body)))
        if (!update) {
            return errorResponse(res, 400, ERR_CONDITION_UPDATE)
        }

        return successResponse(res, SUCCESS_CONDITION_UPDATE, parser.basic(condition))

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const deleted = async (conditionId, res) => {
    try {

        const condition = await getDataWhere(Conditions, 'id', conditionId)
        if (!condition) {
            return errorResponse(res, 400, ERR_CONDITIONS_NOT_FOUND)
        }
        const deleted = await condition.destroy()
        if (!deleted) {
            return errorResponse(res, 400, ERR_CONDITION_DELETE)
        }

        return successResponse(res, SUCCESS_CONDITION_DELETE, parser.basic(deleted))
        
    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}