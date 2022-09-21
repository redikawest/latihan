import maindb from "../../config/sequelize";

const activations = maindb.define('user_activations',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: maindb.Sequelize.INTEGER,
        autoIncrement: true
    },
    userId: {
        type: maindb.Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    },
    token: {
        type: maindb.Sequelize.STRING,
        allowNull: false,
    },
    expireTime: {
        type: maindb.Sequelize.DATE,
        allowNull: false
    },
    attempts: {
        type: maindb.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    freezeTableName: true,
})

export default activations;