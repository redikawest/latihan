import Joi from "joi";
import { ERR_VALIDATION } from "../../helpers/Constant/errorConstant"
import { errorResponse } from "../../helpers/response";
import { pick } from "../../utils/pick";

// function validate (req, res, next) {
//     const errors = validationResult(req)
//     if (errors.isEmpty()) {
//         return next()
//     }
//     const extractedErrors = []
//     errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

//     return errorResponse(res, 400, ERR_VALIDATION, extractedErrors)
// }

// export default validate

const validate = (schema) => (req, res, next) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);

    if (error) {
        const extractedErrors = []
        const errorMessage = error.details.map((details) => details.message).join(', ');
        
        return errorResponse(res, 400, ERR_VALIDATION, errorMessage);
    }
    Object.assign(req, value);
    return next();
}

export default validate