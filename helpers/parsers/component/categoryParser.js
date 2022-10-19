export const basic = (data) => {
    return {
        name: data.name,
        description: data.description || null,
        createdBy: data.createdBy
    }
}