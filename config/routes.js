import { auth } from "../routes/auth";


const baseUrl = '/api/v1';

export const routes = (app) => {
    app.use(baseUrl + '/auth', auth);
}