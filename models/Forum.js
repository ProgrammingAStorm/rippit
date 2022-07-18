const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Post = require('./Post');

class Forum extends Model {
    static subscribe(body, models) {
        return models.Subscription.create({
            user_id: body.user_id,
            forum_id: body.forum_id
        })
        .then(() => {
            return Forum.findOne({
                where: {
                    id: body.id
                },
                attributes: ['title', 'id'],
                include: {
                    where: {
                        forum_id: body.id
                    },
                    model: Post,
                    attributes: [
                    'id',
                    'title',
                    'description',
                    'forum_id',
                    'post_id'
                    [
                      sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
                      'vote_count'
                    ]]
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
        },
        description: {
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