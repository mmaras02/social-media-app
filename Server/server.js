require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const Post = require('./models/PostModel');
const Message = require('./models/MessageModel');
const Conversation = require('./models/ConversationModel');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');
const messageRoutes = require('./routes/messageRoutes');
const conversationRoutes = require('./routes/conversationRoutes');
const cors = require('cors');

//express app
const app = express();

//vercel proba
app.use(cors(
  {
    origin:["https://social-media-app-nu-dun.vercel.app/"],
    methods:["POST", "GET", "PATCH", "DELETE"],
    credentials:true

  }
));

//middleware
app.use(express.json()); //request has data
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

//connect to database
mongoose.connect(process.env.DBURL)
  .then(result => {
    app.listen(process.env.PORT, () => {
        console.log('Listening on port', process.env.PORT);
    })})
  .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'});
})

app.use('/api/messages', messageRoutes);
app.use('/api/conversation',conversationRoutes);
//routes
app.use('/', userAuthRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

