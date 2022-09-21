export const successResponse = (res, message, data) => {
    return res.status(200).send({ 
        success: true,
        message,
        data,
    });
}

export const errorResponse = ( res, status, errorMessage, error = {}) => {
    return res.status(status).send({
        success: false,
        errorMessage,
        error,
    })
}