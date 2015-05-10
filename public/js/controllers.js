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

grubControllers.controller('MealPlanController',['$scope', '$rootScope','$http', 'HomeFactory' , function($scope, $rootScope,$http,  HomeFactory){
    
}

grubControllers.controller('ListController',['$scope', '$rootScope','$http', 'HomeFactory' , function($scope, $rootScope,$http,  HomeFactory) {

    var myBudget = $rootScope.queryBudget;
    var myMealType = $rootScope.queryMealType;
    var category = $rootScope.queryCategory;
    var date = $rootScope.queryDate;
    $rootScope.limit = 10;
    //$rootScope.len = 0;

    console.log('price is '+myBudget+ ' mealType is '+myMealType+' category is '+category+' date is '+date);

    HomeFactory.getMealList(myBudget, myMealType, category, $rootScope.skip).success(function(data){
      $scope.data = data.data;
      console.log($scope.data.length);
    })
    .error(function(data){
      console.log('got an error');
    })

    $scope.listSearch = function(){
        var myBudget = $scope.asad;
        $rootScope.queryMealType = $scope.MealType;
        $rootScope.queryCategory = $scope.category;
        $rootScope.queryDate = $scope.date;

        // initial value of skip
        $rootScope.skip = 0;

        // check MealType
        if (!myBudget || !$rootScope.queryMealType || !$rootScope.queryDate)
          alert('Please enter valid inputs for BUDGET, MEALTYPE and DATE');
        else {
          // set price level
          if (myBudget <= 10)
            myBudget = 1;
          else if (myBudget <= 20)
            myBudget = 2;
          else if (myBudget <= 30)
            myBudget = 3;
          else
            myBudget = 4;

        $rootScope.queryBudget = myBudget;

        HomeFactory.getMealList($rootScope.queryBudget, $rootScope.queryMealType, $rootScope.queryCategory, $rootScope.skip).success(function(data){
          $scope.data = data.data;
          console.log($scope.data.length);
          })
          .error(function(data){
            console.log('got an error');
          })
        }
    }

    $scope.selectRestaurant = function() {
          var restaurantID = this.restaurant._id;
          $rootScope.currRestaurant = restaurantID;

          console.log(restaurantID);
    }

    $scope.prev = function() {
        $rootScope.skip -= $rootScope.limit;

        if($rootScope.skip < 0)
          $rootScope.skip = 0;

        var lim;
        HomeFactory.getMealList($rootScope.queryBudget, $rootScope.queryMealType, $rootScope.queryCategory, $rootScope.skip, lim)
              .success(function(data){
                $scope.data = data.data;
                console.log($scope.data.length);
              })
              .error(function(data){
                console.log('got an error');
              })   
    }

    $scope.next = function() {
      console.log('inside next');
      var newLength = $rootScope.skip + $rootScope.limit;
      console.log('newLength is ' + newLength);

      HomeFactory.getMealList($rootScope.queryBudget, $rootScope.queryMealType, $rootScope.queryCategory, 0, 20).success(function(temp){
          $rootScope.len = temp.data.length;
          console.log($rootScope.len);

          console.log('len is ' + $rootScope.len);
          if($rootScope.skip + $rootScope.limit < $rootScope.len){
            $rootScope.skip += $rootScope.limit;
            //console.log('length is '+ $rootScope.len);
            //console.log(' new val of skip is ' + $rootScope.skip);
          }

          var lim;
          HomeFactory.getMealList($rootScope.queryBudget, $rootScope.queryMealType, $rootScope.queryCategory, $rootScope.skip, lim)
              .success(function(data){
                $scope.data = data.data;
                console.log($scope.data.length);
              })
              .error(function(data){
                console.log('got an error');
              })
        })
    }
}]);

grubControllers.controller('HomeController', ['$scope' , '$rootScope', '$window', 'HomeFactory',function($scope, $rootScope, $window, HomeFactory) {
    /***** SET USER ID *******/
    $rootScope.userID = '554fd3584de62f8e08738104';

    /***** BUDGE SEARCH *****/
    $scope.budgeSearch = function () {
        var myBudget = $scope.asad;
        $rootScope.queryMealType = $scope.MealType;
        $rootScope.queryCategory = $scope.category;
        $rootScope.queryDate = $scope.date;

        // initial value of skip
        $rootScope.skip = 0;

        // check MealType
        if (!myBudget || !$rootScope.queryMealType || !$rootScope.queryDate)
          alert('Please enter valid inputs for BUDGET, MEALTYPE and DATE');
        else {
          // set price level
          if (myBudget <= 10)
            myBudget = 1;
          else if (myBudget <= 20)
            myBudget = 2;
          else if (myBudget <= 30)
            myBudget = 3;
          else
            myBudget = 4;

        $rootScope.queryBudget = myBudget;

        window.location.assign('http://localhost:3000/#/list');
        }
    };

  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";


  };

}]);


