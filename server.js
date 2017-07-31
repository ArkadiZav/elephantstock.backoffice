var express = require('express');
var bodyParser = require('body-parser');
var Jimp = require("jimp");
var imageRoutes = require('./routes/imageRoutes');

Jimp.read("./public/img/lenna.jpg", function (err, lenna) {
    if (err) throw err;
    lenna.crop(300, 200, 212, 312)
         .write("./public/img/lena-crop3.jpg"); // save
}).catch(function (err) {
    console.error(err);
});

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
