import * as categoryLogic from "../../repositories/component/categoriesLogic"

export const gets = async (req, res) => {
    return categoryLogic.gets(req, res)
}

export const get = async (req, res) => {
    return categoryLogic.get(req.params.categoryId, res)
}

export const create = async (req, res) => {
    return categoryLogic.create(req.body, res)
}

export const update = async (req, res) => {
    return categoryLogic.update(req.body, req.params.categoryId, res)
}

export const deleted = async (req, res) => {
    return categoryLogic.deleted(req.params.categoryId, res)
}