/**
 * Created by Sandeep on 01/06/14. Modified by Carlo Donati on 5/9/2016
 */

angular.module('movieApp.services',[]).factory('Movie',function($resource){ 
  return $resource('http://127.0.0.1:8000/movies/:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
}).service('popupService',function($window){
    this.showPopup=function(message){

        return $window.confirm(message);
    }
});