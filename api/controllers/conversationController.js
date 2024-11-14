const { default: mongoose } = require('mongoose');
const Message = require('../models/MessageModel');
const Conversation = require('../models/ConversationModel');

const getMessages = async(req, res) => {
    try{
        console.log("id it receives", req.params.conversationId);
        const conversation = await Conversation.findById(req.params.conversationId);
        const convo = conversation.data;
        console.log("convo",conversation.data);
        
        if(!conversation){
            return res.status(400).json({mssg:"convo not found"});
        }
        const messages = await Message.find({_id: conversation.messages});
        res.status(200).json(messages);
    } catch(error){
        res.status(400).json(error);
    }
}


module.exports = {
    getMessages,
}