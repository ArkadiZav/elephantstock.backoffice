app.controller('moveImageController', function($scope, imageFactory) {
  var width = 512;
  var height = 512;

    function update(activeAnchor) {
        var group = activeAnchor.getParent();
        var topLeft = group.get('.topLeft')[0];
        var topRight = group.get('.topRight')[0];
        var bottomRight = group.get('.bottomRight')[0];
        var bottomLeft = group.get('.bottomLeft')[0];
        var image = group.get('Image')[0];
        var anchorX = activeAnchor.getX();
        var anchorY = activeAnchor.getY();
        // update anchor positions
        switch (activeAnchor.getName()) {
            case 'topLeft':
                topRight.setY(anchorY);
                bottomLeft.setX(anchorX);
                break;
            case 'topRight':
                topLeft.setY(anchorY);
                bottomRight.setX(anchorX);
                break;
            case 'bottomRight':
                bottomLeft.setY(anchorY);
                topRight.setX(anchorX);
                break;
            case 'bottomLeft':
                bottomRight.setY(anchorY);
                topLeft.setX(anchorX);
                break;
        }
        image.position(topLeft.position());
        var width = topRight.getX() - topLeft.getX();
        // var height = bottomLeft.getY() - topLeft.getY();
        var height = (width * image.height()) / image.width();
        if(width && height) {
            image.width(width);
            image.height(height);
        }
    }

    function addAnchor(group, x, y, name) {
        var stage = group.getStage();
        var layer = group.getLayer();
        var anchor = new Konva.Circle({
            x: x,
            y: y,
            stroke: '#666',
            fill: '#ddd',
            strokeWidth: 2,
            radius: 4,
            name: name,
            draggable: true,
            dragOnTop: false
        });
        anchor.on('dragmove', function() {
            update(this);
            layer.draw();
        });
        anchor.on('mousedown touchstart', function() {
            group.setDraggable(false);
            this.moveToTop();
        });
        anchor.on('dragend', function() {
            group.setDraggable(true);
            layer.draw();
        });
        // add hover styling
        anchor.on('mouseover', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'pointer';
            this.setStrokeWidth(4);
            layer.draw();
        });
        anchor.on('mouseout', function() {
            var layer = this.getLayer();
            document.body.style.cursor = 'default';
            this.setStrokeWidth(2);
            layer.draw();
        });
        group.add(anchor);
    }


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
    width: 256,
    height: 256
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
  // console.log(firstImg);

  layer.add(secondGroup);
  secondGroup.add(secondImg);
  addAnchor(secondGroup, 0, 0, 'topLeft');
  addAnchor(secondGroup, 256, 0, 'topRight');
  addAnchor(secondGroup, 256, 256, 'bottomRight');
  addAnchor(secondGroup, 0, 256, 'bottomLeft');
  var imageObj2 = new Image();
  imageObj2.onload = function() {
    secondImg.image(imageObj2);
    layer.draw();
  };
  imageObj2.src = 'https://avatars0.githubusercontent.com/u/887802?v=4&s=400';
  // imageObj2.src = '../../img/crop5.png';

  // $scope.croppedImgSrc = "./img/lena-cropServer.jpg?" + new Date().getTime();

  $scope.isCropPerformed = false;
  $scope.crop = function() {
    console.log(secondGroup.getX(), secondGroup.getY());
    imageFactory.addCropData({width: secondImg.attrs.width, height: secondImg.attrs.height, x: secondGroup.getX(), y: secondGroup.getY()}).then(function(filename) {
      console.log("successfully cropped an image");
      $scope.isCropPerformed = true;
      var img = document.createElement("img");
      img.src = "./img/" + filename + ".jpg";
      //optionally set a css class on the image
      var class_name = "cropped";
      img.setAttribute("class", class_name);
      document.getElementById("cropped_images_div").appendChild(img);
    });
  }

  $scope.readURL = function(input) {
    console.log("hey!");
     if (input.files && input.files[0]) {
         var reader = new FileReader();

         reader.onload = function (e) {
            //  angular.element('#blah')
            //      .attr('src', e.target.result);
             imageObj1.src = e.target.result;
             console.log(e.target.result);
         };
         reader.readAsDataURL(input.files[0]);
     }
   }

});
