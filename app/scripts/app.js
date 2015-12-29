'use strict';

angular.module('SnSApp', ['ngRoute'])

.config(function($routeProvider){
    $routeProvider
        //route for the contactus page
        .when('/contactus', {
            templateUrl : 'contactus.html',
            controller : 'contactController'
        })
    
        //route for the category page
        .when('/category', {
            templateUrl: 'category.html',
            controller: 'CategoryController'
        })
    
        //route for the video detials page
        .when('/category/:id', {
            templateUrl : 'videodetail.html',
            controller: 'VideoDetailController'
        })
    
   
    
        .otherwise('/category')
    
})

;