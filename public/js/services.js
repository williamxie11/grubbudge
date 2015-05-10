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
       // var mealQuery = {
        //};

        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/api/llamas');
            }
        }
    })
    .factory('HomeFactory', function($http, $window) {
           baseUrl = 'http://104.236.235.68:4000/api';
 
           return {
           
            getMealList : function(price, mealType, category) {
                var myPrice = String(price);
                var myMealType = String(mealType);
                var myCategory = String(category);

                console.log('The QUERY is ' + baseUrl + '/restaurants?where={"price":{"$lte":"'+price+'"}}');
                return $http.get(baseUrl + '/restaurants?where={"price":{"$lte":' + price + '}}');//, "mealType":[' + myMealType + ']}');
            },

            postMeal : function(mealData) {
                console.log(mealData);
                return $http.post(baseUrl + '/mealplans', mealData);
            }
         }
    })
    .factory('Shared', function(){
        return {};
    })
    ; 
