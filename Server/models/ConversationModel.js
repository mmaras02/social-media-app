const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema ({
    participants:[ {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    },],
    messages:[{
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
    },],
}, {timestamps: true});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;