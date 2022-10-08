import { logger } from "../../config/logger"
import Categories from "../../database/models/component/categories"
import { ERR_CATEGORY_EXIST, ERR_CATEGORY_NOT_FOUND } from "../../helpers/Constant/errorConstant"
import { SUCCESS, SUCCESS_CATEGORY_DELETE, SUCCESS_CATEGORY_UPDATE, SUCCESS_CATEGORY_CREATE } from "../../helpers/Constant/successConstant"
import { createData, getDataWhere, getPagingData, pagination, updateData } from "../../helpers/query"
import { errorResponse, successResponse } from "../../helpers/response"
import { parseStringifyData } from "../../utils/parse"
import * as parser from "../../parsers/component/categoryParser"
import * as request from "./request/componentRequest"

export const gets = async (req, res) => {
    const { page, size, search } = req.query;
    const { limit, offset } = await pagination(page, size);
    
    const data = await Categories.prototype.filter(limit, offset, search)
    const result = await getPagingData(data, page, limit)
    return successResponse(res, SUCCESS, result)
}

export const get = async (categoryId, res) => {
    const category = await getDataWhere(Categories, 'id', categoryId)
    if (!category) {
        return errorResponse(res, 404, ERR_CATEGORY_NOT_FOUND)
    }

    return successResponse(res, null, parser.basic(category))

}

export const create = async (body, user, res) => {
    try {
        
        const category = await getDataWhere(Categories, 'name', body.name)
        if (category) {
            return errorResponse(res, 409, ERR_CATEGORY_EXIST)
        }

        const create = await createData(Categories, parseStringifyData(request.create(body, user)))

        return successResponse(res, SUCCESS_CATEGORY_CREATE, parser.basic(create))

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const update = async (body, categoryId, res) => {
    try {
        
        const category = await getDataWhere(Categories, 'id', categoryId)
        if (!category) {
            return errorResponse(res, 404, ERR_CATEGORY_NOT_FOUND)
        }

        const update = await updateData(category, parseStringifyData(request.create(body)))

        return successResponse(res, SUCCESS_CATEGORY_UPDATE, parser.basic(update))

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const deleted = async (categoryId, res) => {
    try {
        
        const category = await getDataWhere(Categories, 'id', categoryId)
        if (!category) {
            return errorResponse(res, 404, ERR_CATEGORY_NOT_FOUND)
        }

        await category.destroy()

        return successResponse(res, SUCCESS_CATEGORY_DELETE)
        

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}