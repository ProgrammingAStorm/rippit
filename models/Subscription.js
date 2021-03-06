const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subscription extends Model {

}

Subscription.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        forum_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'forum',
                key: 'id'
            }
        }
    },    
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'subscription'
    }
);

module.exports = Subscription;