const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer');

const Story = require('../../models/Story');
const Profile = require('../../models/Profile');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
}) 

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
    
}

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
},
fileFilter: fileFilter
});

router.get('/test', (req, res) => {
    res.json({msg: 'Stories route works'})
})

router.post('/', upload.single('storyImage'), passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile) {
            const newStory = new Story({
                user: req.user.id,
                handle: profile.handle,
                profileImage: profile.profileImage,
                text: req.body.text,
                color: req.body.color,
                storyImage: req.file.path,
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

router.get('/following/stories/:user_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({user: req.user.id}).then(profile => {
        const followers = profile.following.map(follower => follower.user.toString())
        Story.find({user: followers})
        .then(stories => res.json(stories))
    })
    .catch(err => console.log(err));
})

module.exports = router;