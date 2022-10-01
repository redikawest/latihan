import { logger } from "../../config/logger"
import Categories from "../../database/models/component/categories"
import { ERR_CATEGORY_CREATE, ERR_CATEGORY_DELETE, ERR_CATEGORY_EXIST, ERR_CATEGORY_NOT_FOUND, ERR_CATEGORY_UPDATE } from "../../helpers/Constant/errorConstant"
import { SUCCESS_CATEGORY_DELETE, SUCCESS_CATEGORY_UPDATE, SUCCESS_CREATE_CATEGORY } from "../../helpers/Constant/successConstant"
import { createData, getDataWhere, updateData } from "../../helpers/query"
import { errorResponse, successResponse } from "../../helpers/response"
import { parseStringifyData } from "../../utils/parse"
import * as parser from "../../parsers/component/categoryParser"
import * as request from "./request/categoryRequest"

export const gets = async () => {

}

export const get = async (categoryId, res) => {
    const category = await getDataWhere(Categories, 'id', categoryId)
    if (!category) {
        return errorResponse(res, 400, ERR_CATEGORY_NOT_FOUND)
    }

    return successResponse(res, null, parser.basic(category))

}

export const create = async (body, res) => {
    try {
        
        const category = await getDataWhere(Categories, 'name', body.name)
        if (category) {
            return errorResponse(res, 401, ERR_CATEGORY_EXIST)
        }

        const create = await createData(Categories, parseStringifyData(request.create(body)))
        if(!create) {
            return errorResponse(res, 500, ERR_CATEGORY_CREATE)
        }

        return successResponse(res, SUCCESS_CREATE_CATEGORY, parser.basic(create))

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const update = async (body, categoryId, res) => {
    try {
        
        const category = await getDataWhere(Categories, 'id', categoryId)
        if (!category) {
            return errorResponse(res, 401, ERR_CATEGORY_NOT_FOUND)
        }

        const create = await updateData(Categories, parseStringifyData(request.create(body)))
        if(!create) {
            return errorResponse(res, 500, ERR_CATEGORY_UPDATE)
        }

        return successResponse(res, SUCCESS_CATEGORY_UPDATE, parser.basic(create))

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const deleted = async (categoryId, res) => {
    try {
        
        const category = await getDataWhere(Categories, 'id', categoryId)
        if (!category) {
            return errorResponse(res, 401, ERR_CATEGORY_NOT_FOUND)
        }

        const deleted = await category.destroy()
        if (!deleted) {
            return errorResponse(res, 500, ERR_CATEGORY_DELETE)
        }

        return successResponse(res, SUCCESS_CATEGORY_DELETE, parser.basic(category))
        

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}