import maindb from "../../../config/sequelize";

const Conditions = maindb.define('conditions',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: maindb.Sequelize.INTEGER,
        autoIncrement: true
    },
    name: {
        allowNull: false,
        type: maindb.Sequelize.STRING,
    },
    description: {
        allowNull: true,
        type: maindb.Sequelize.TEXT,
    },
    createdBy: {
        allowNull: false,
        type: maindb.Sequelize.STRING,
    }
}, {
    freezeTableName: true,
})

export default Conditions;