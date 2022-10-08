import { Model, Sequelize } from "sequelize";
import maindb from "../../config/sequelize";
import Patients from "./patient";

const {DataTypes} = Sequelize;

const Users = maindb.define('users',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: maindb.Sequelize.STRING,
        allowNull: true
    },
},{
    freezeTableName: true,
    paranoid: true
});


export default Users;