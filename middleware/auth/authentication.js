import jwt from "jsonwebtoken"

export const generateToken = async (payload) => {
    console.log(payload)
    const token = await jwt.sign(payload, 'shhhhh');

    return token
}