const { default: mongoose } = require('mongoose');
const Message = require('../models/MessageModel');
const Conversation = require('../models/ConversationModel');

/*const getMessages = async(req, res) => {
    try{
        console.log("id it receives", req.params._id);
        const conversation = await Conversation.find({_id:req.params._id});
        const convo = conversation.data;
        console.log("convo",conversation.data);
        
        if(!conversation){
            return res.status(400).json({mssg:"convo not found"});
        }
        const messages = await Message.find({_id: conversation.messages});
        res.status(200).json(conversation.messages);
    } catch(error){
        res.status(400).json(error);
    }
}*/

const sendMessage = async(req, res) => {
    const {senderId, receiverId, message} = req.body;

    try{
        const newMessage = await Message.create({senderId, receiverId, message});

        let conversation = await Conversation.findOne({participants: { $all: [senderId, receiverId] }});

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId, receiverId],
                messages:[newMessage._id]
            });
        }
        else{
            conversation.messages.push(newMessage._id);
            conversation.save();
        }
        res.status(200).json({ success: true, message: newMessage, conversation });

    } catch (error){
        res.status(400).json({mssg:"message not sent!"});
    }
    //create a Conversation
    //find in database if there is a chat with same participiants
    //put message there
    //if the conversation is already existing push the message
}

const getConversation = async (req, res) => {
    try{
        
        const conversation = await Conversation.find({participants: { $in: [req.params.userId] }});
        console.log("conversation", conversation)
        res.status(200).json( conversation );
    } catch (error){
        res.status(400).json(error);
    }

}

module.exports = {
    //getMessages,
    sendMessage,
    getConversation
}