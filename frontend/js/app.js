var grubApp = angular.module('grubApp', ['ngRoute', 'grubServices', 'ngLoadScript', '720kb.datepicker']);

grubApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/mealplan', {
    templateUrl: '/partials/mealplan.html',
    controller: 'MealPlanController'
  }).
  when('/home', {
    templateUrl: '/partials/home.html',
    controller: 'HomeController'
  }).
  when('/list', {
    templateUrl: '/partials/list.html',
    controller: 'ListController'
  })
}]);

grubApp.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };
}]);

grubApp.controller('MealPlanController',['$scope', '$rootScope','$http', 'HomeFactory',
  function($scope, $rootScope, $http, HomeFactory){
    // Add meal to mealPlan
    console.log('inside the meal plan');
    console.log($rootScope.user);
  }]);

grubApp.controller('ListController',['$scope', '$rootScope','$http', 'HomeFactory' , function($scope, $rootScope,$http,  HomeFactory) {
    /***** SET USER ID *******/
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
     console.log(data);
     if(!data.error) {
       $scope.profile = true;
       $scope.user = data.user;
       //$rootScope.user = $scope.user;
       $rootScope.userID = $rootScope.user._id;

       /**** GO TO MEAL PLAN ****/
       $scope.selectRestaurant = function() {
             var restaurantID = this.restaurant._id;
             $rootScope.currRestaurant = restaurantID;

             HomeFactory.getUserInfo($rootScope.userID).success(function(userData){
                 console.log(userData);
                 var user = userData.data;

                 // no existing mealPlans
                 if(user.mealPlans.length == 0){

                   if($rootScope.queryMealType == "lunch"){
                      var firstMealPlan = {
                       name: "firstMealPlan",
                       lunchID: String($rootScope.currRestaurant),
                       planDate: $rootScope.queryDate,
                       assignedUser: $rootScope.userID
                      }
                  }
                  else if($rootScope.queryMealType == "breakfast"){
                     var firstMealPlan = {
                     name: "firstMealPlan",
                     breakfastID: String($rootScope.currRestaurant),
                     planDate: $rootScope.queryDate,
                     assignedUser: $rootScope.userID
                    }
                  }
                  else if($rootScope.queryMealType == "dinner"){
                     var firstMealPlan = {
                     name: "firstMealPlan",
                     dinnerID: String($rootScope.currRestaurant),
                     planDate: $rootScope.queryDate,
                     assignedUser: $rootScope.userID
                    }
                  }
                  else {
                     var firstMealPlan = {
                     name: "firstMealPlan",
                     lateID: String($rootScope.currRestaurant),
                     planDate: $rootScope.queryDate,
                     assignedUser: $rootScope.userID
                    }
                  }

                    //create a new mealPlan
                    HomeFactory.createMealPlan(firstMealPlan).success(function(data){
                       console.log(data.message);
                       $rootScope.mealPlanID = data.data._id;

                       // updated user
                       var updateObj = {
                         mealPlans: $rootScope.mealPlanID
                       }

                       // add it to User
                       HomeFactory.updateUser($rootScope.userID, updateObj)
                         .success(function(data){
                           console.log('user successfully updated');
                           //window.location.assign('http://localhost:4000/#/mealplan');
                         }
                       );

                    }).error(function(err){console.log('Error creating a new meal plan');})
                 }
                 // meal plans exist for that user
                 else
                 {
                   if($rootScope.queryMealType == "lunch"){
                      var firstMealPlan = {
                       lunchID: String($rootScope.currRestaurant)
                      }
                  }
                  else if($rootScope.queryMealType == "breakfast"){
                     var firstMealPlan = {
                     breakfastID: String($rootScope.currRestaurant)
                    }
                  }
                  else if($rootScope.queryMealType == "dinner"){
                     var firstMealPlan = {
                     dinnerID: String($rootScope.currRestaurant)
                    }
                  }
                  else {
                     var firstMealPlan = {
                     lateID: String($rootScope.currRestaurant)
                    }
                  }

                   // user should specify the meal plan
                   $rootScope.mealPlanID = user.mealPlans[0];
                   console.log($rootScope.user);

                   // update the specified meal plan
                   HomeFactory.updateMealPlan($rootScope.mealPlanID, firstMealPlan).success(function(data){
                     console.log('successfully updatad users mealplan');
                     //window.location.assign('http://localhost:4000/#/mealplan');
                   }).error(function(err){console.log('error: meal plan could not get updated')})

                 }
             })

             //window.location.assign('http://localhost:3000/#/mealplan');
       }

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
     }
   });
}]);

/***** HOME CONTROLLER *******/
grubApp.controller('HomeController', ['$scope' , '$rootScope', '$http', '$window', 'HomeFactory',function($scope, $rootScope, $http, $window, HomeFactory) {
    /***** SET USER ID *******/
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
     console.log(data);
     if(!data.error) {
       $scope.profile = true;
       $scope.user = data.user;
       $rootScope.user = $scope.user;
     }
    });

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
        }
    };
}]);
