import Activations from "./activation";
import Patients from "./patient";
import Users from "./user";

Users.hasOne(Patients)
Users.hasOne(Activations)

Patients.belongsTo(Users)

Activations.belongsTo(Users)

export default {Users, Patients, Activations}