const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    profileImage: {
        type: String
    },
    followers: [
       { 
           user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        handle: {
            type: String
        },
        profileImage: {
            type: String
        }
    }
    ],
    following: [
        { 
            user: {
             type: Schema.Types.ObjectId,
             ref: 'users'
         },
         handle: {
             type: String
         },
         profileImage: {
             type: String
         }
     }
     ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema);