import * as conditionLogic from "../../repositories/component/conditionsLogic";

export const gets = async (req, res) => {
    return conditionLogic.gets(req, res)
}

export const get = async (req, res) => {
    return conditionLogic.get(req.params.conditionId, res)
}

export const create = async (req, res) => {
    return conditionLogic.create(req.body, req.user, res)
}

export const update = async (req, res) => {
    return conditionLogic.update(req.body, req.params.conditionId, res)
}

export const deleted = async (req, res) => {
    return conditionLogic.deleted(req.params.conditionId, res)
}