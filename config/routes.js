import auth from "../routes/auth"
import patient from "../routes/patients"


const baseUrl = '/api/v1';

export const routes = (app) => {
    app.use(baseUrl + '/auth', auth);
    app.use(baseUrl + '/patient', patient)
    app.use(baseUrl + '/component', {
        
    })
}