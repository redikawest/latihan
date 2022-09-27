import maindb from "../../../config/sequelize";

const Conditions = maindb.define('conditions',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: maindb.Sequelize.INTEGER,
        autoIncrement: true
    },
}, {
    freezeTableName: true,
})

export default Conditions;