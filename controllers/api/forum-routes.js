const router = require('express').Router();
const { Forum, User, Subscription } = require('../../models');

router.get('/', (req, res) => {
    Forum.findAll()
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Forum.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No forum found with this id' });
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
    Forum.create({
        title: req.body.title
    })
    .then(dbForumData => res.json(dbForumData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/subscribe', (req, res) => {
    Forum.subscribe(
        { forum_id: req.body.forum_id, user_id: req.body.user_id },
        { User, Subscription }
    )
    .then(updatedSubscriptionData => res.json(updatedSubscriptionData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.put('/:id', (req, res) => {
    Forum.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbForumData => {
        if (!dbForumData[0]) {
            res.status(404).json({ message: 'No forum found with this id' });
            return;
        }
        res.json(dbForumData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//I made this route just in case we end up using it,
//But it will stay commented out until actually used.
/*router.delete('/:id', (req, res) => {
    Forum.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbForumData => {
        if (!dbForumData) {
            res.status(404).json({ message: 'No forum found with this id' });
            return;
        }
        res.json(dbForumData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});*/

module.exports = router;