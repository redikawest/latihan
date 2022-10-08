import maindb from "../../config/sequelize";
import Users from "./user";

const Admins = maindb.define('admins',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: maindb.Sequelize.INTEGER,
        autoIncrement: true
    },
    userId: {
        allowNull: false,
        type: maindb.Sequelize.STRING
    },
    name: {
        allowNull: false,
        type: maindb.Sequelize.STRING,
    },
    phone: {
        allowNull: false,
        type: maindb.Sequelize.STRING
    },
    address: {
        allowNull: false,
        type: maindb.Sequelize.STRING
    },
    sex: {
        allowNull: false,
        type: maindb.Sequelize.INTEGER
    },
    createdBy: {
        allowNull: false,
        type: maindb.Sequelize.STRING,
    }
}, { freezeTableName: true, paranoid: true })

/**
 * 
 * Relation
 * 
 */

 Users.hasOne(Admins)
 Admins.belongsTo(Users)

export default Admins;