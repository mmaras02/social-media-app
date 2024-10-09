require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/UserModel');
const Post = require('./models/PostModel');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const userAuthRoutes = require('./routes/userAuthRoutes');

//express app
const app = express();

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

//routes
app.use('/', userAuthRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

//listen for requests
/*app.listen(process.env.PORT, () => {
    console.log('listening to port', process.env.PORT);
});*/
