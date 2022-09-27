import { logger } from "../../config/logger"
import Categories from "../../database/models/component/categories"
import { ERR_CATEGORY_CREATE, ERR_CATEGORY_DELETE, ERR_CATEGORY_EXIST, ERR_CATEGORY_NOT_FOUND, ERR_CATEGORY_UPDATE } from "../../helpers/Constant/errorConstant"
import { SUCCESS_CATEGORY_DELETE, SUCCESS_CATEGORY_UPDATE, SUCCESS_CREATE_CATEGORY } from "../../helpers/Constant/successConstant"
import { errorResponse, successResponse } from "../../helpers/response"

export const gets = async () => {

}

export const get = async () => {

}

export const create = async (req, res) => {
    try {
        
        const category = await Categories.findOne({where: req.name})
        if (category) {
            return errorResponse(res, 401, ERR_CATEGORY_EXIST)
        }

        const create = await Categories.create(req)
        if(!create) {
            return errorResponse(res, 500, ERR_CATEGORY_CREATE)
        }

        return successResponse(res, SUCCESS_CREATE_CATEGORY, create)

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const update = async (req, res) => {
    try {
        
        const category = await Categories.findOne({where: req.name})
        if (category) {
            return errorResponse(res, 401, ERR_CATEGORY_EXIST)
        }

        const create = await Categories.update(req)
        if(!create) {
            return errorResponse(res, 500, ERR_CATEGORY_UPDATE)
        }

        return successResponse(res, SUCCESS_CATEGORY_UPDATE, create)

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}

export const deleted = async (req, res) => {
    try {
        
        const category = await Categories.findByPk(req.params.id)
        if (!category) {
            return errorResponse(res, 401, ERR_CATEGORY_NOT_FOUND)
        }

        const deleted = await Categories.destroy({where: {id: req.params.id}})
        if (!deleted) {
            return errorResponse(res, 500, ERR_CATEGORY_DELETE)
        }

        return successResponse(res, SUCCESS_CATEGORY_DELETE, deleted)
        

    } catch (error) {
        logger.log({level: 'info', message: error})
        return errorResponse(res, 500, error.message);
    }
}