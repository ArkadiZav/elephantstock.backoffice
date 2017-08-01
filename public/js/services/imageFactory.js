app.factory('imageFactory', function($http) {
  var addCropData = function(cropParams) {
    return $http.post('/imageProps', cropParams).then(function(result) {
      console.log(result);
      return result.data;
    }, function(error) {
      throw error;
    })
  } // addOnGoing

  return {
    addCropData: addCropData
  }
});
