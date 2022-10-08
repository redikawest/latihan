export const create = (body, user) => {
    body.createdBy = user.email

    return body
}