const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');

require('dotenv/config');

//Middleware
app.use(cors());
app.use(bodyParser.json());
//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

const barbersRoute = require('./routes/barbers');
app.use('/barbers', barbersRoute);

const randevularimRoute = require('./routes/randevularim');
app.use('/randevularim', randevularimRoute);

//Routes
app.get('/', (req, res) => {
    res.send('we are on home');
});
//Connnect to DB
mongoose.connect(process.env.DB_CONNECTION,() => {
    console.log('Connected to DB!');
});
//how to we start listening to server
app.listen(3000);