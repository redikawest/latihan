export const getDataWhere = async (model, source, value) => {
    
    const condition = {};

    condition[source] = value;
    let option = {
        where: condition
    }
    
    return await model.findOne(option)
}

export const createData = async (model, body) => {
    let result = await model.create(body)

    return result
}

export const updateData = async (model, body) => {
    let result = await model.update(body)

    return result
}

export const deleteData = async (model, body) => {
    let result = await model.destroy()

    return result
}