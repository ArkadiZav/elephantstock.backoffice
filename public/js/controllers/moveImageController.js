app.controller('moveImageController', function($scope, imageFactory) {
  var width = 512;
  var height = 512;
  console.log(width, height);

  var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
    // offsetX: -width*0.1,
    // offsetY: -height*0.1
  });
  var layer = new Konva.Layer();
  stage.add(layer);
  var firstImg = new Konva.Image({
    width: width,
    height: height
  });
  var secondImg = new Konva.Image({
    width: width * 0.2,
    height: height * 0.2
  });
  var firstGroup = new Konva.Group({
    x: 0,
    y: 0,
    draggable: true,
    dragBoundFunc: function(pos) {
      var newX = pos.x;
      var newY = pos.y;
      if (pos.y < 0) {
        newY = 0;
      }
      if (pos.y > height - firstImg.attrs.height) {
        newY = height - firstImg.attrs.height;
      }
      if (pos.x < 0) {
        newX = 0;
      }
      if (pos.x > width - firstImg.attrs.width) {
        newX = width - firstImg.attrs.width;
      }
      return {
          x: newX,
          y: newY
      };
  }
  });
  var secondGroup = new Konva.Group({
    x: 0,
    y: 400,
    opacity: 0.5,
    draggable: true,
    dragBoundFunc: function(pos) {
      var newX = pos.x;
      var newY = pos.y;
      if (pos.y < 0) {
        newY = 0;
      }
      if (pos.y > height - secondImg.attrs.height) {
        newY = height - secondImg.attrs.height;
      }
      if (pos.x < 0) {
        newX = 0;
      }
      if (pos.x > width - secondImg.attrs.width) {
        newX = width - secondImg.attrs.width;
      }
      return {
          x: newX,
          y: newY
      };
  }
  });

  secondGroup.on('click', function() {
       console.log(stage.getPointerPosition());
       console.log(this.getX(),this.getY());
  });

  layer.add(firstGroup);
  firstGroup.add(firstImg);
  var imageObj1 = new Image();
  imageObj1.onload = function() {
    firstImg.image(imageObj1);
    layer.draw();
  };
  imageObj1.src = '../../img/lenna.jpg';
  console.log(firstImg);

  layer.add(secondGroup);
  secondGroup.add(secondImg);
  var imageObj2 = new Image();
  imageObj2.onload = function() {
    secondImg.image(imageObj2);
    layer.draw();
  };
  imageObj2.src = 'https://avatars0.githubusercontent.com/u/887802?v=4&s=400';

  $scope.crop = function() {
    console.log("clicked!");
    console.log(secondGroup.getX(), secondGroup.getY());
    imageFactory.addCropData({width: secondImg.attrs.width, height: secondImg.attrs.height, x: secondGroup.getX(), y: secondGroup.getY()}).then(function() {
      console.log("successfully cropped an image");
    });
  }
});
