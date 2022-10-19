export const userCreate = (user, patient) => {
    return {
        id: user.id,
        name: patient.name,
        email: user.email,
        password: user.password,
        role: user.role,
        status: user.status,
    }
}