'use strict';

angular.module('SnSApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
        // route for the home page
        .state('app', {
            url:'/',
            views: {
                'header': {
                    templateUrl : 'views/header.html',
                },
                'content': {
                    template : '<h1>To be Completed</h1>',
                    controller  : 'IndexController'
                },
                'footer': {
                    templateUrl : 'views/footer.html',
                    }
                }
        })
        
        // route for the aboutus page
        .state('app.aboutus', {
            url:'aboutus',
            views: {
                'content@': {
                    template: '<h1>To be Completed</h1>',
                    controller  : 'AboutController'
                }
            }
        })
        
        //route for the contactus page 
        .state('app.contactus', {
            url:'contactus',
            views: {
                'content@': {
                    templateUrl : 'views/contactus.html',
                    controller  : 'ContactController'
                }
            }
        })
    
        //route for the category page
        .state('app.category', {
            url: 'category',
            views: {
                'content@': {
                    templateUrl : 'views/category.html',
                    controller  : 'CategoryController'
                }
            }
        })
        
        //route for the video detials page
        .state('app.videodetails', {
            url: 'category/:id',
            views: {
                'content@': {
                    templateUrl : 'views/videodetail.html',
                    controller  : 'VideoDetailController'
                }
            }
        });
    
        $urlRouterProvider.otherwise('/');
    
})


;