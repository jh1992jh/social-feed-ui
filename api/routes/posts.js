const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

const validatePostInput = require('../../validation/post');

router.get('/test', (req, res) => {
    res.json({posts: 'The posts route works'});
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors)
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
        const profileImage = profile.profileImage;

        const newPost = new Post({
            text: req.body.text,
            postImage: req.body.postImage,
            username: req.body.username,
            profileImage: profileImage,
            user: req.user.id
        });
    
        newPost.save().then(post => res.json(post));
    })
})

router.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    Post.find()
    .sort({ date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.json(err));
})

router.get('/owned/:user_id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({user: req.params.user_id}).then(user => {
        Post.find({user: req.params.user_id})
            .then(posts => res.json(posts))
    })
    .catch(err => res.status(404).json(err));
})

router.get('/following/posts/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({user: req.user.id }).then(profile => {
        const followers = profile.following.map(follower => follower.user.toString())
        Post.find({user: followers})
        .then(posts => res.json(posts));
    })
    .catch(err => console.log(err))
})

router.get('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ Error: 'No post found with that Id'}))
})

router.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(user => {
        Post.findById(req.params.id).then(post => {
            if(post.user.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not authorized'})
            }

            post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({postnotfound: 'No Post Found'}))
    })
})

router.post('/like/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(user => {
        Post.findById(req.params.id).then(post => {
            if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({alreadyliked: 'User already liked this post'})
            }

            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
        })
    })
    .catch(err => res.status(404).json({postnotfound: 'No post found with that Id'}));
})

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(user => {
        Post.findById(req.params.id).then(post => {
            if(   post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0) {
                return res.status(400).json({notliked: 'User has not liked this post yet'})
            }

            const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)

            post.likes.splice(removeIndex, 1)

            post.save().then(post => res.json(post))
        })
    })
    .catch(err => res.status(400).json({postnotfound: 'No post found with that id'}));
});

router.post('/comment/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {

        Post.findById(req.params.id).then(post => {
            const newComment = {
                text: req.body.text,
                username: req.body.username,
                profileImage: profile.profileImage,
                user: req.user.id
            }
    
            post.comments.unshift(newComment);
    
            post.save().then(post => res.json(post))
    })
    })
    .catch(err => res.status(404).json({nopostfound: 'No post found with that Id'}));
})

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id).then(post => {
        if (
            post.comments.filter(
                comment => comment._id.toString() === req.params.comment_id
            ).length === 0
        ) {
            return res.status(404).json({ commentnotfound: 'That comment does not exist'});
        }

        const removeIndex = post.comments.map(item => item._id.toString()).indexOf(req.params.comment_id);

        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
    })
    .catch(err => res.status(404).json({commentnotfound: 'Comment with that Id doesn\'t exist'}))
})

module.exports = router;