const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Forum extends Model {
    static subscribe(body, models) {
        return models.Subscription.create({
            user_id: body.user_id,
            forum_id: body.forum_id
        })
        .then(() => {
            return Forum.findOne({
                where: {
                    id: body.forum_id
                }
            })
        });
    }
}

Forum.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'forum'
    }
)

module.exports = Forum;