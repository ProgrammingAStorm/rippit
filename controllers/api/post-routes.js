const router = require('express').Router();
const { Post, User, Comment, Vote } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    if(!req.session.loggedIn) {
        return;
    }

    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
        forum_id: req.body.forum_id,
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/upvote', (req, res) => {
    if (req.session) {
        Post.upvote({...req.body, user_id: req.session.user_id }, {Vote, Comment, User})
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
});

router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            comment_text: req.body.comment_text
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//I made this route just in case we end up using it,
//But it will stay commented out until actually used.
/*router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});*/

module.exports = router;