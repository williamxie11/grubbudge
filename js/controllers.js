var grubControllers = angular.module('grubControllers', []);

grubControllers.controller('MealPlanController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  }; 

}]);

grubControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);


grubControllers.controller('ListController', ['$scope', '$http', 'HomeFactory' , function($scope, $http,  HomeFactory) {
    console.log('INSIDE LIST CONTROLLER');
    $scope.queryData = HomeFactory.get();
    //console.log($scope.queryData);
    var myBudget = 30;
    var myMealType = 0;
    var category = 0;

    var imageURL;
    var rating;
    var ratingURL;

    HomeFactory.getMealList(myBudget, myMealType, category).success(function(data){
          //console.log(data);
          $scope.data = data.data;
          console.log($scope.data[0].address);
          //HomeFactory.set($scope.data);
          //console.log(HomeFactory.getQueryVal());
        })
}]);

grubControllers.controller('HomeController', ['$scope' , '$window', 'HomeFactory',function($scope, $window, HomeFactory) {

    /***** BUDGE SEARCH *****/
    $scope.budgeSearch = function () {
        console.log('Someone made a budgy search query');
        var myBudget = $scope.asad;
        var myMealType = $scope.MealType;
        var category = $scope.category;
        //myBudget = $('#budget').val();
        console.log('my price is ' + myBudget);
        console.log(myMealType);
        console.log('my category is' + category);


        HomeFactory.getMealList(myBudget, myMealType, category).success(function(data){
          //console.log(data);
          $scope.data = data;
          //console.log($scope.data);
          HomeFactory.set($scope.data);
          //console.log(HomeFactory.getQueryVal());
        })

        
          // $scope.Shared = Shared;
          // $scope.Shared.arr = $scope.data;
    };

  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";


  };

}]);


