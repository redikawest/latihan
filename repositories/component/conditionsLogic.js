import { logger } from "../../config/logger"
import Conditions from "../../database/models/component/conditions"
import { ERR_CONDITIONS_EXIST, ERR_CONDITIONS_NOT_FOUND } from "../../helpers/Constant/errorConstant"
import { SUCCESS, SUCCESS_CONDITION_CREATE, SUCCESS_CONDITION_DELETE, SUCCESS_CONDITION_UPDATE } from "../../helpers/Constant/successConstant"
import { createData, getDataWhere, getPagingData, pagination, updateData } from "../../helpers/query"
import { errorResponse, successResponse } from "../../helpers/response"
import * as conditionRequest from "./request/componentRequest"
import * as parser from "../../helpers/parsers/component/componentParser"
import { parseStringifyData } from "../../utils/parse"

export const gets = async (req, res) => {
    const { page, size, search } = req.query;
    const { limit, offset } = await pagination(page, size);
    
    const data = await Conditions.prototype.filter(limit, offset, search)
    const result = await getPagingData(data, offset, limit)
    
    return successResponse(res, SUCCESS, result)
}

export const get = async (conditionId, res) => {
    const condition = await getDataWhere(Conditions, 'id', conditionId)
    if (!condition) {
        return errorResponse(res, 400, ERR_CONDITIONS_NOT_FOUND)
    }

    return successResponse(res, null, parser.basic(condition))
}

export const create = async (body, user, res) => {
    try {

        const condition = await getDataWhere(Conditions, 'name', body.name)
        if (condition) {
            return errorResponse(res, 400, ERR_CONDITIONS_EXIST)
        }
        
        const create = await createData(Conditions, parseStringifyData(conditionRequest.create(body, user)))

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

        const update = await updateData(condition, parseStringifyData(body))

        return successResponse(res, SUCCESS_CONDITION_UPDATE, parser.basic(update))

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

        await condition.destroy()

        return successResponse(res, SUCCESS_CONDITION_DELETE)
        
    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}