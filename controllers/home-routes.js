const router = require('express').Router()
const sequelize = require('../config/connection')
const {Post, User, Comment} = require('../models')

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'content', 'post_id', 'user_id'],
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}))
        res.render('homepage', {posts})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})



module.exports = router