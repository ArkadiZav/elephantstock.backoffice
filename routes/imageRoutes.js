var express = require('express');
var router = express.Router();
var Jimp = require("jimp");
var guid = require('../utils/guid');

router.post('/', function(req, res, next) {
  var filename = guid.imgName();
  Jimp.read("./public/img/lenna.jpg", function (err, lenna) {
      if (err) throw err;
      lenna.crop(req.body.x, req.body.y, req.body.width, req.body.height)
           .write("./public/img/" + filename + ".jpg")
  })
  .catch(function (err) {
      console.error(err);
  });
  res.send(filename);
})

module.exports = router;
