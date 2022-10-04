import { logger } from "../../config/logger"
import Categories from "../../database/models/component/categories"
import { ERR_CATEGORY_CREATE, ERR_CATEGORY_DELETE, ERR_CATEGORY_EXIST, ERR_CATEGORY_NOT_FOUND, ERR_CATEGORY_UPDATE } from "../../helpers/Constant/errorConstant"
import { SUCCESS_CATEGORY_DELETE, SUCCESS_CATEGORY_UPDATE, SUCCESS_CREATE_CATEGORY } from "../../helpers/Constant/successConstant"
import { createData, getDataWhere, getPagingData, pagination, updateData } from "../../helpers/query"
import { errorResponse, successResponse } from "../../helpers/response"
import { parseStringifyData } from "../../utils/parse"
import * as parser from "../../parsers/component/categoryParser"
import * as request from "./request/categoryRequest"
import { Op } from "sequelize"

export const gets = async (req, res) => {
    const { page, size, search } = req.query;
    const { limit, offset } = await pagination(page, size);
    const test = await Categories.filter()
    return res.send(test)
    
    const data = await Categories.findAndCountAll({
        limit: limit, offset: offset, 
        where: {
            [Op.or]: {
                name: { [Op.like]: `%${search}%` },
                description: { [Op.like]: `%${search}%` }
            }
        }
    })
    const result = await getPagingData(data, page, limit)
    return successResponse(res, 'oke', result)
}

export const get = async (categoryId, res) => {
    const category = await getDataWhere(Categories, 'id', categoryId)
    if (!category) {
        return errorResponse(res, 404, ERR_CATEGORY_NOT_FOUND)
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

        const update = await updateData(category, parseStringifyData(request.create(body)))
        if(!update) {
            return errorResponse(res, 500, ERR_CATEGORY_UPDATE)
        }

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