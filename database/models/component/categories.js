import { Op } from "sequelize";
import maindb from "../../../config/sequelize";

const Categories = maindb.define('categories',{
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
}, { freezeTableName: true, paranoid: true })


/**
 * 
 * Function
 * 
 */

Categories.prototype.filter = async function(limit, offset, search) {
    let result = await Categories.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {
            [Op.or]: {
                name: { [Op.like]: `%${search}%` },
                description: { [Op.like]: `%${search}%` }
            }
        }
    })

    return result
}

export default Categories;