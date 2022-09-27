import maindb from "../../../config/sequelize";

const Categories = maindb.define('categories',{
    id: {
        allowNull: false,
        primaryKey: true,
        type: maindb.Sequelize.INTEGER,
        autoIncrement: true
    },
}, {
    freezeTableName: true,
    paranoid: true
})

export default Categories;