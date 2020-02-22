const mongoose = require('mongoose')

let postSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
    },
    quote: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }

})

//Collection name will be the word "Post" plural
module.exports = mongoose.model('Post', postSchema)
