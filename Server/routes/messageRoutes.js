const express= require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const verifyToken = require('../middleware/verifyToken');

console.log("Message routes loaded"); 
//router.use(verifyToken);
router.get('/:userId', messageController.getConversation);

//router.get('/:conversationId', messageController.getMessages);
//router.get('/:userId', messageController.getConversation);
router.post('/send', messageController.sendMessage);


module.exports = router;