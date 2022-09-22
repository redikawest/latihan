import { Model, Sequelize } from "sequelize";
import maindb from "../../config/sequelize";
import patients from "./patient";

const {DataTypes} = Sequelize;

const users = maindb.define('users',{
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
    scopes: {

    },
    freezeTableName: true,
});

users.associate = () => {
    users.hasOne(patients, {foreignKey: 'userId', as:'patient'})
}

export default users;