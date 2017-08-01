var express = require('express');
var bodyParser = require('body-parser');
var Jimp = require("jimp");
var imageRoutes = require('./routes/imageRoutes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use('/imageProps', imageRoutes);

app.all('[^.]+', function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT || '8000', function(){
  console.log("8000. Elephantstock")
});
