import maindb from "../../config/sequelize";
import Users from "./user";

const Patients = maindb.define('patients',{
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: maindb.Sequelize.INTEGER
    },
    userId: {
        type: maindb.Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    name: {
        type: maindb.Sequelize.STRING,
        allowNull: false,
    },
    birthPlace: {
        type: maindb.Sequelize.STRING,
        allowNull: true
    },
    birthDate: {
        type: maindb.Sequelize.STRING,
        allowNull: true,
    },
    phone: {
        type: maindb.Sequelize.STRING,
        allowNull: true,
    },
    sex: {
        type: maindb.Sequelize.STRING,
        allowNull: true
    },
    salutation: {
        type: maindb.Sequelize.STRING,
        allowNull: false
    },
    isMarried: {
        type: maindb.Sequelize.BOOLEAN,
        allowNull: false
    },
    address: {
        type: maindb.Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: maindb.Sequelize.STRING,
        allowNull: false
    },
    identityType: {
        type: maindb.Sequelize.STRING,
        allowNull: true,
      },
    identityId: {
        type: maindb.Sequelize.STRING,
        allowNull: true,
      },
    religion: {
        type: maindb.Sequelize.STRING,
        allowNull: true
    },
}, {
    freezeTableName: true,
})

Users.hasOne(Patients)
Patients.belongsTo(Users)

export default Patients;
