const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    color: {
        type: String,
        default: 'black'
    },
    storyImage: {
        type: String,
    },
    /*storyBackground: {
        type: String
    },*/
    storyDuration: {
        type: String,
        default: "seconds4"
    },
    storyLocation: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Story = mongoose.model('story', StorySchema)