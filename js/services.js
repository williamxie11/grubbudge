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
           var savedData = {}
           function set(data){
              savedData = data;
           }
           function get(){
                return savedData;
           }
           return {
            set : set,
            get : get,
           
           getMealList : function(price, mealType, category) {
                var myPrice = String(price);
                var myMealType = String(mealType);
                var myCategory = String(category);

                console.log(baseUrl + '/restaurants?where={"price":"'+price+'"}');
                return $http.get(baseUrl + '/restaurants?where={"price":"'+price+'"}');
            }
            // },
            //   getQueryVal : function() {
            //     return mealQuery;
            //   },
            //   setQueryVal : function(data) {
            //     mealQuery = data;
            //   }
        }
    })
    .factory('Shared', function(){
        return {};
    })
    ; 
