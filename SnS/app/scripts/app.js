'use strict';

angular.module('SnSApp', [
    'ui.router',
    "ngSanitize",
    "com.2fdevs.videogular"
])

.controller('MediaPlayerController',
        function ($sce) {
            this.config = {
                preload: "none",
                sources: [
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                ],
                tracks: [
                    {
                        src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
                        kind: "subtitles",
                        srclang: "en",
                        label: "English",
                        default: ""
                    }
                ],
                theme: {
                    url: "http://www.videogular.com/styles/themes/default/latest/videogular.css"
                }
            };
        }
)


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
                    templateUrl : 'views/home.html',
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
                    templateUrl: 'views/aboutus.html',
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
        
        //route for the submit page
        .state('app.submit', {
            url:'submit',
            views: {
                'content@': {
                    templateUrl :
'views/submit.html',
                    controller :
'SubmitController'
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