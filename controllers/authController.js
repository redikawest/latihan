import * as authLogin from "../repositories/auth/AuthLogic"

export const login = async (req, res) => {
    return authLogin.loginLogic(req.body, res)
}

export const register = async (req, res) => {
    return authLogin.registerLogic(req.body, res)
}

export const verifyToken = async (req, res) => {
    return authLogin.verifyTokenLogic(req.body, res)
}

export const forgotPassword = async (req, res) => {
    return authLogin.forgotPasswordLogic(res.body, res)
}

export const requestToken = async (req, res) => {
    return authLogin.requestTokenLogic(req.body, res)
}