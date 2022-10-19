import { Op } from "sequelize";
import maindb from "../../../config/sequelize";
import * as componentParser from "../../../helpers/parsers/component/componentParser"

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
    paranoid: true
})

/**
 * 
 * Function
 * 
 */

 Conditions.prototype.filter = async function(limit, offset, search) {
    let result = await Conditions.findAndCountAll({
        limit: limit,
        offset: offset,
        where: {
            [Op.or]: {
                name: { [Op.like]: `%${search}%` },
                description: { [Op.like]: `%${search}%` }
            }
        }, raw: true
    })

    result.rows = componentParser.gets(result.rows)
    return result
}

export default Conditions;