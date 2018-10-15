const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const passport = require('passport');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

const multer = require('multer')

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

router.post('/', upload.single('profileImage'), passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body)

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.description) profileFields.description = req.body.description;
    if(req.file.path) profileFields.profileImage = req.file.path;

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


router.post('/edit', upload.single('profileImage'), passport.authenticate('jwt', { session: false }), (req, res) => {
    const profileFields = {}
    if (req.file.path) profileFields.profileImage = req.file.path;
    if (req.body.description) profileFields.description = req.body.description;
    Profile.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true  }
    ).then(result => res.json(result))
      .catch(err => console.log(err))
  })

router.post('/follow/:profile_id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id}).then(authProfile => {
        Profile.findById(req.params.profile_id).then(profile => {
            if(profile.followers.filter(follow => follow.user.toString() === req.user.id).length > 0) {
                res.status(400).json({userhasalreadyfollowed: 'User has already followed this profile'})
            }

            authProfile.following.unshift(
                {
                    user: profile.user,
                    handle: profile.handle,
                    profileImage: profile.profileImage
                }
            )

            authProfile.save()

            profile.followers.unshift(
                { user: req.user.id,
                handle: authProfile.handle,
                profileImage: authProfile.profileImage
                }
        );
            profile.save().then(profile => res.json({followed: 'followed the user'}))

        })
    })
    .catch(err => console.log(err))
})

router.post('/unfollow/:profile_id', passport.authenticate('jwt', { session: false}), (req, res) => {
    Profile.findOne({ user: req.user.id }).then(authProfile => {
        Profile.findById(req.params.profile_id).then(profile => {
            if(   profile.followers.filter(follow => follow.user.toString() === req.user.id)
            .length === 0) {
                return res.status(400).json({notfollowed: 'User has not followed this profile yet'})
            }
            console.log(profile + 'first')
            Profile.findOne({user: profile.user._id}).then(profile => {
               // console.log(profile.user + 'second')

                const removeIndexProfile = profile.followers.map(item => item.user.toString()).indexOf(req.user.id)
                    console.log(profile.user);
                 // authProfile.following.filter(followed => profile.user.toString() !== followed.user.toString())
                 const authProfileUsers = authProfile.following.map(user => user)
                 // console.log(authProfileUsers);
                const userIds = authProfileUsers.map(followed => followed.user.toString());
               // console.log(userIds);
               // console.log(profile.user.toString());
                const userIdIndex = userIds.indexOf(profile.user.toString());
                authProfile.following.splice(userIdIndex, 1);
                authProfile.save();
                 profile.followers.splice(removeIndexProfile, 1)
                 profile.save();
            })
       
            /* const removeIndexProfile = profile.followers.map(item => item.user.toString()).indexOf(req.user.id)

          /*  const removeIndexAuthProfile = authProfile.following.map(item => item.user.toString()).indexOf(profile.user)

    
            authProfile.following.filter(profile => profile !== profile.user)
            //authProfile.following.splice(removeIndexAuthProfile, 1);
            authProfile.save()
            .then(authProfile => res.json({unfollowed: 'Unfollowed this profile'}))
            profile.followers.splice(removeIndexProfile, 1)
            
            profile.save() */
      

        })
    })
    .catch(err => console.log(err));
})

module.exports = router;

