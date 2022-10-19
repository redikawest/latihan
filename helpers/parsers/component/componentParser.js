export const basic = (data) => {
    return {
        name: data.name,
        description: data.description || null,
        createdBy: data.createdBy
    }
}

export const gets = (datas) => {
    return datas.map(data => {
        return {
            id: data.id,
            name: data.name,
            description: data.description || null,
            createdBy: data.createdBy
        }
    });
}