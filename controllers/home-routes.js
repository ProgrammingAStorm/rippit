const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Forum, Subscription, Comment, Vote } = require("../models");

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'comment_text',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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

// get login
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get('/', (req, res) => {
    console.log(req.session)
})

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id'],
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
        if (!dbPostData) {
            res.status(404).json({message: 'Could not find a post with this ID. Please check the ID and try again.'})
            return
        }

        const post = dbPostData.get({plain: true})

        res.render('single-post', {post})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})


module.exports = router;
