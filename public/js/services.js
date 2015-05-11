// js/services/todos.js
angular.module('grubServices', [])
        .factory('CommonData', function(){
        var data = "";
        return{
            getData : function(){
                return data;
            },
            setData : function(newData){
                data = newData;
            }
        }
    })
    .factory('Llamas', function($http, $window) {
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/llamas');
            }
        }
    })
    .factory('HomeFactory', function($http, $window) {
           baseUrl = 'http://localhost:4000/api';

           return {

            getMealList : function(price, mealType, category, pageSkip, limit, sort, order, check) {
                var myPrice = String(price);
                var myMealType = String(mealType);
                var myCategory = String(category);
                var skip = pageSkip;
                var q;
                
                if(!sort)
                    sort = "name";
                if (!order)
                    order = 1;

                // ,"categories":"sushi%20bars"
                var q1 = baseUrl + '/restaurants?sort={"' +sort+ '":' +order+  '}&limit=10&skip=' + skip + '&where={"price":{"$lte":' + price + '},"mealType":"' + myMealType + '","categories":"' + myCategory + '"}';
                var q2 = baseUrl + '/restaurants?sort={"' +sort+ '":' +order+ '}&limit=10&skip=' + skip + '&where={"price":{"$lte":' + price + '},"mealType":"' + myMealType + '"}';
                var temp1 = baseUrl + '/restaurants?sort={"' +sort+ '":' +order+ '}&where={"price":{"$lte":' + price + '},"mealType":"' + myMealType + '","categories":"' + myCategory + '"}&count=true';
                var temp2 = baseUrl + '/restaurants?sort={"' +sort+ '":' +order+ '}&where={"price":{"$lte":' + price + '},"mealType":"' + myMealType + '"}&count=true';

                    if(!myCategory)
                        q = q2;
                    else
                        q = q1;

                if(check)
                     if(!myCategory)
                        q = temp2;
                    else
                        q = temp1;

                console.log('The QUERY here is ' + q);
                return $http.get(q);
            },

            getRestaurants : function(query) {
                return $http.get(query);
            },

            createMealPlan : function(mealData) {
                console.log(mealData);
                return $http.post(baseUrl + '/mealplans', mealData);
            },

            updateMealPlan : function(ID, update) {
                return $http.put(baseUrl + '/mealplans/' + ID, update);
            },

            getUserInfo : function(ID) {
                return $http.get(baseUrl + '/users/' + ID);
            },

            updateUser : function(ID, update) {
                return $http.put(baseUrl + '/users/' + ID, update);
            },

            getRestaurantInfo : function(ID) {
                return $http.get(baseUrl + '/restaurants/' + ID);
            },

            getMealPlan : function(ID) {
                return $http.get(baseUrl + '/mealplans/' + ID);
            }
         }
    })
    .factory('Shared', function(){
        return {};
    })
    ;
