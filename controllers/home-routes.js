const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Forum, Subscription, Comment, Vote } = require("../models");

router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'description',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id AND vote.user_id = user.id)'),
                'has_voted'
              ],
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
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});


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
});

router.get('/forums/:id', (req, res) => {
    Forum.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
        ],
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'description', 'user_id','forum_id',],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({message: 'Could not find a post with this ID. Please check the ID and try again.'})
            return
        }

        const post = dbPostData.get({plain: true})

        res.render('forum', {
            post
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.get('/forums', (req, res) => {
    Forum.findAll({
        attributes: ['title', 'id']
    })
    .then(dbPostData => {
        const forums = dbPostData.map(forum => forum.get({plain: true}))
        res.render('forums', {
            forums,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'description',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
            [
                sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id AND vote.user_id = user.id)'),
                'has_voted'
              ],
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


        data = parse(post.description)
        let three;

        if(typeof data === 'string') {
            three = false;
        } else {
            three = true;
        }

        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn,
            three
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
});

function parse(content) {
    try {
        const parsed = JSON.parse(content);

        return parsed;
    } catch (error) {
        return content;
    }
}

module.exports = router;