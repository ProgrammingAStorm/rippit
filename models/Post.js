const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');

class Post extends Model {
    static upvote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            'id',
            'title',
            'description'
            [
              sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
              'vote_count'
            ]
          ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id'],
              include: {
                model: User, 
                attributes: ['username']
              }
            }
          ]
        });
      }
    )
  }
}

Post.init(
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
        description:
        {
          type: DataTypes.STRING,
          allowNull: false 
        },
        user_id: {
            type: DataTypes.INTEGER,
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
        modelName: 'post'
    }
);

module.exports = Post;