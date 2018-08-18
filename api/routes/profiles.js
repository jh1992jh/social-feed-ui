const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const validateProfileInput = require('../../validation/profile');

router.get('/test', (req, res) => {
    res.json({msg: 'Profile router works'})
})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({user: req.user.id})
        .populate('user', ['username', 'profileImage'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }

            res.json(profile);
        })
        .catch(err => console.log(err))
})

router.get('/all', (req, res) => {
    const errors = {};

    Profile.find()
        .populate('user', ['username', 'profileImage'])
        .then(profiles => {
            if(!profiles) {
                errors.noprofile = 'There are no profiles'
                return res.status(404).json(errors)
            }

            res.json(profiles)
        })
        .catch(err => res.status(404).json({noprofiles: 'There are no profiles'}))
})

router.get('/handle/:handle', (req, res) => {
    const errors = {};
    Profile.findOne({handle: req.params.handle})
        .populate('user', ['username', 'profileImage'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors)
            }

            res.json(profile);
        })
        .catch(err => console.log(err));
})

//get profile by user id
router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['username', 'profileImage'])
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'There is no profile for this user';
                return res.status(404).json(errors);
            }

            res.json(profile)
        })
        .catch(err => res.status(404).json({noprofile: 'There is no profile for this user'}))
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.description) profileFields.description = req.body.description;
    if(req.body.profileImage) profileFields.profileImage = req.body.profileImage;

    Profile.findOne({user: req.user.id}).then(profile => {
        if(profile) {
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true}
            ).then(profile => res.json(profile))
        } else {

            Profile.findOne({ handle: profileFields.handle}).then(profile => {
                if(profile) {
                    errors.handle = 'That handle already exists'
                    return res.status(400).json(errors)
                }

                new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
    })
    .catch(err => console.log(err));
})


router.post('/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}
    if (req.body.profileImage) profileFields.profileImage = req.body.profileImage;
    if (req.body.description) profileFields.description = req.body.description;
    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true  }
    ).then(result => res.json(result))
      .catch(err => console.log(err))
  })
module.exports = router;

