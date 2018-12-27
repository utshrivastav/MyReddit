var express = require('express');
var bodyParser = require('body-parser');
const mongoose =  require('mongoose');
const postRoutes = require('./routes/posts');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use('/images',express.static(path.join('backend/images')));

mongoose.connect('mongodb+srv://youtee:DwSQHikW3UoeUAaL@cluster0-owdcz.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('DB connected');
  })
  .catch(() => {
    console.log('Error connecting to database');
  });


app.use(function(req, res, next){
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use('/posts', postRoutes);

module.exports = app;
