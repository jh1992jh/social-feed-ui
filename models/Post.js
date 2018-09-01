const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    profile: { 
        type: Schema.Types.ObjectId,
    },
    text: {
        type: String,
        //required: true
    },
    postImage: {
        type: String,
        //required: true
    },
    filter: {
        type: String,
        default: 'none'
    },
    category: {
        type: String, 
        default: 'all'
    },
    handle: {
        type: String
    },
    profileImage: {
        type: String
    },
    likes: [
        {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }
    ],
    comments: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                required: true
        
            },
            handle: {
                type: String
            },
            profileImage: {
                type: String
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('posts', PostSchema);