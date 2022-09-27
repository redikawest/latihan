import * as categoryLogic from "../../repositories/component/categoriesLogic"

export const gets = async (req, res) => {

}

export const get = async (req, res) => {
    
}

export const create = async (req, res) => {
    return categoryLogic.create(req, res)
}

export const update = async (req, res) => {
    return categoryLogic.update(req, res)
}

export const deleted = async (req, res) => {
    return categoryLogic.deleted(req, res)
}