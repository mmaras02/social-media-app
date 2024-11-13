const express= require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const verifyToken = require('../middleware/verifyToken');


router.get('/:conversationId', conversationController.getMessages);


module.exports = router;