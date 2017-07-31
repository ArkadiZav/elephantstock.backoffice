var express = require('express');
var router = express.Router();
var Jimp = require("jimp");

router.post('/', function(req, res, next) {
  Jimp.read("./public/img/lenna.jpg", function (err, lenna) {
      if (err) throw err;
      lenna.crop(req.body.x, req.body.y, req.body.width, req.body.height)
           .write("./public/img/lena-cropServer.jpg"); // save
  }).catch(function (err) {
      console.error(err);
  });
  res.send(req.body);
})

module.exports = router;
