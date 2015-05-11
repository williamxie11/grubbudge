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
  /*.
  otherwise({
    redirectTo: '/home'
  })
  */
}]);

grubApp.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };
}]);

grubApp.controller('MealPlanController',['$scope', '$rootScope','$http', 'HomeFactory',
  function($scope, $rootScope, $http, HomeFactory){
    $rootScope.queryMealType;
    $scope.restaurantList = [];
    
      HomeFactory.getMealPlan($rootScope.user.mealPlans[0]).success(function(data){
          $scope.yourMP = data.data;
          $scope.planName = $scope.yourMP.name;
          var planDate = new Date($scope.yourMP.planDate);
          $scope.dateString = planDate.toDateString();
          $scope.restaurantList = [];
          $scope.typeLength = [false, false, false, false];

            if($scope.yourMP.breakfastID){
              HomeFactory.getRestaurantInfo($scope.yourMP.breakfastID).success(function(data){
                  data.data.typeTitle = "Breakfast";
                  $scope.restaurantList.push(data.data);
                  console.log(data.data);
                  $scope.typeLength[0]= false;
              })
              .error(function(err)
                {
                  console.log('error getting rest info');
                })
            }
            else {
              $scope.typeLength[0] = true;
            }
            if($scope.yourMP.lunchID){
              HomeFactory.getRestaurantInfo($scope.yourMP.lunchID).success(function(data){
                  data.data.typeTitle = "Lunch";
                  $scope.restaurantList.push(data.data);
                  console.log(data.data);
                  $scope.typeLength[1] = false;
              })
              .error(function(err)
                {
                  console.log('error getting rest info');
                })
            }
            else {
                $scope.typeLength[1] = true;
              }

            if($scope.yourMP.dinnerID){
              HomeFactory.getRestaurantInfo($scope.yourMP.dinnerID).success(function(data){
                  data.data.typeTitle = "Dinner";               
                  $scope.restaurantList.push(data.data);
                  console.log(data.data);
                  $scope.typeLength[2] = false;
              })
              .error(function(err)
                {
                  console.log('error getting rest info');
                })
            }
            else {
              $scope.typeLength[2] = true;
            }
            if($scope.yourMP.lateID){
              HomeFactory.getRestaurantInfo($scope.yourMP.lateID).success(function(data){
                  data.data.typeTitle = "Late Night";
                  $scope.restaurantList.push(data.data);
                  console.log(data.data);
                  $scope.typeLength[3] = false;
              })
              .error(function(err)
                {
                  console.log('error getting rest info');
                })
            }
            else {
              $scope.typeLength[3] = true;
            }

            $scope.deleteRestaurant = function(restaurant){
              console.log(this.restaurant.name);
            };
      })

    HomeFactory.getRestaurantInfo($rootScope.currRestaurant).success(function(data){
      $scope.res = data.data;
      console.log($scope.res);
    });
  }

  }]);

grubApp.controller('ListController',['$scope', '$rootScope','$http', 'HomeFactory' , function($scope, $rootScope,$http,  HomeFactory) {
    /***** SET USER ID *******/
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
     console.log(data);
     if(!data.error) {
       $scope.profile = true;
       $scope.user = data.user;
       $rootScope.userID = $scope.user._id;

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
                           window.location.assign('http://104.236.235.68:4000/#/mealplan');
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

                   // update the specified meal plan
                   HomeFactory.updateMealPlan($rootScope.mealPlanID, firstMealPlan).success(function(data){
                     console.log('successfully updatad users mealplan');
                     window.location.assign('http://104.236.235.68:4000/#/mealplan');
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

       HomeFactory.getMealList(myBudget, myMealType, category, $rootScope.skip, $rootScope.limit, $rootScope.sortBy, $rootScope.orderBy, false).success(function(data){
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
           var sort = $scope.sortBy;
           if($scope.orderBy == "asc")
              var order = 1;
           else
              var order = -1;

            if(!$scope.sortBy){
              sort = "name";
            }
           var baseUrl = 'localhost:4000/api';

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
            if (!$rootScope.queryCategory){
              baseUrl += '/restaurants?limit=10&skip=' + $rootScope.skip + 
                          '&where={"price":{"$lte":' + $rootScope.queryBudget + '},"mealType":"' 
                          + $rootScope.queryMealType + '","categories":"' + $rootScope.queryCategory + '"}&sort={"';
            }
            else {
              baseUrl += '/restaurants?limit=10&skip=' + $rootScope.skip + 
                          '&where={"price":{"$lte":' + $rootScope.queryBudget + '},"mealType":"' 
                          + $rootScope.queryMealType + '"}&sort={"';
            }
 
              baseUrl += String(sort) + '":' + String(order) + '}';

          $rootScope.orderBy = order;
          $rootScope.sortBy = sort;
          // console.log("MY QUERY IS " + baseUrl);
           HomeFactory.getRestaurants(baseUrl).success(function(data){
             $scope.data = data.data;
             //console.log($scope.data.length);
           })
            .error(function(data){
               console.log('got an error');
             })
           }
       }



       $scope.prev = function() {
           if($rootScope.skip - $rootScope.limit < 0)
              $rootScope.skip = 0;
            else
              $rootScope.skip -= $rootScope.limit;

           //var lim;
           HomeFactory.getMealList($rootScope.queryBudget, $rootScope.queryMealType, $rootScope.queryCategory, $rootScope.skip, 10, $rootScope.sortBy, $rootScope.orderBy, false)
                 .success(function(data){
                   $scope.data = data.data;
                   //console.log($scope.data.length);
                 })
                 .error(function(data){
                   console.log('got an error');
                 })
       }



       $scope.next = function() {
         console.log('inside next');
         var newLength = $rootScope.skip + $rootScope.limit;
         console.log('newLength is ' + newLength);

         //var lim;
         HomeFactory.getMealList($rootScope.queryBudget, $rootScope.queryMealType, $rootScope.queryCategory, 0, $rootScope.limit, $rootScope.sortBy, $rootScope.orderBy, true).success(function(temp){
             $rootScope.len = temp.data;

             console.log('len is ' + $rootScope.len);
             if($rootScope.skip + $rootScope.limit < $rootScope.len){
               $rootScope.skip += $rootScope.limit;
             }

             HomeFactory.getMealList($rootScope.queryBudget, $rootScope.queryMealType, $rootScope.queryCategory, $rootScope.skip, $rootScope.limit, $rootScope.sortBy, $rootScope.orderBy, false)
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

grubApp.controller('HomeController', ['$scope' , '$rootScope', '$http', '$window', 'HomeFactory',function($scope, $rootScope, $http, $window, HomeFactory) {
    /***** SET USER ID *******/
    $scope.profile = false;
    $http.get('/profile').success(function(data) {
     console.log(data);
     if(!data.error) {
       $scope.profile = true;
       $scope.user = data.user;
       $rootScope.user = $scope.user;
       $rootScope.userID = $scope.user._id;
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
