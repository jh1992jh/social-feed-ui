const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport')

const Story = require('../../models/Story');
const Profile = require('../../models/Profile');

router.get('/test', (req, res) => {
    res.json({msg: 'Stories route works'})
})

router.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile) {
            const newStory = new Story({
                user: req.user.id,
                handle: profile.handle,
                profileImage: profile.profileImage,
                text: req.body.text,
                color: req.body.color,
                storyImage: req.body.storyImage,
                storyBackground: req.body.storyBackground,
                storyDuration: req.body.storyDuration,
                storyLocation: req.body.storyLocation
            })

            newStory.save().then(story => res.json(story));
        } else {
            return res.status(404).json({noprofilefound: 'That profile doesn\'t exist'});
        }
    })
    .catch(err => res.status(404).json({noprofilefound: 'That profile doesn\'t exist'}))
})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Story.find()
    .sort({ date: -1})
    .then(stories => res.json(stories))
    .catch(err => res.status(404).json({nostoriesfound: 'There are no stories'}))
})

router.get('/:story_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Story.findById(req.params.story_id)
    .then(story => {
        if(!story) {
            return res.status(404).json({nostoryfound: 'That story doesn\'t exist'})
        }

        res.json(story)
    })
    .catch(err => res.status(404).json({nostoryfound: 'That story doesn\'t exist'}))
})

module.exports = router;