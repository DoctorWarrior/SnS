angular.module('SnS.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = $localStorage.getObject('userinfo', '{}');


  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $localStorage.storeObject('userinfo', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
    
})



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
        })

.controller('CategoryController', ['$scope', 'favoriteFactory', 'videos', 'baseURL', '$ionicListDelegate', '$ionicPlatform', '$cordovaLocalNotification', '$cordovaToast', function($scope,favoriteFactory, videos, baseURL, $ionicListDelegate, $ionicPlatform, $cordovaLocalNotification, $cordovaToast){

    $scope.baseURL = baseURL;
            
    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
            
            
    $scope.videos = videos;
            
            
    $scope.select = function(setTab){
        $scope.tab = setTab;

        if (setTab === 2){
            $scope.filtText = "fiction";
        }
        else if (setTab === 3){
            $scope.filtText = "non_F";
        }
         else if (setTab === 4){
            $scope.filtText = "emerging_readers";
        }
        else{
            $scope.filtText = "";
        }
                
    };
            
    $scope.isSelected = function(checkTab){
        return ($scope.tab ===checkTab);
    };
            
    $scope.toggleDetails = function() {
    $scope.showDetails = !$scope.showDetails;
    };
    
    $scope.addFavorite = function (index) {
        console.log("index is " + index);
        favoriteFactory.addToFavorites(index);
    $ionicListDelegate.closeOptionButtons();
    
        
    $ionicPlatform.ready(function() {
        $cordovaLocalNotification.schedule({
          id: 1,
          title: "Added Favorite",
          text: $scope.videos[index].name
        }).then(function() {
            console.log('Added Favorite ' + $scope.videos[index].name);
          },
          function() {
            console.log('Failed to add Notification ');
          });

        $cordovaToast
          .show('Added Favorite ' + $scope.videos[index].name, 'long', 'center')
          .then(function(success) {
            // success
          }, function(error) {
            // error
          });
      });
    
    
    
    
    
    }
            
            

}])


.controller('ContactController', ['$scope', function($scope) {

    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
                        
}])


.controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {
            
    $scope.sendFeedback = function() {
                
        console.log($scope.feedback);

        if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
            $scope.invalidChannelSelection = true;
            console.log('incorrect');
        }
        else {
            $scope.invalidChannelSelection = false;

            var feedback = feedbackFactory.getFeedback().get();
            feedback.mychannel = $scope.feedback.mychannel;
            feedback.firstName = $scope.feedback.firstName;
            feedback.lastName = $scope.feedback.lastName;
            feedback.agree = $scope.feedback.agree;
            feedback.email = $scope.feedback.email;
            feedback.$save();



            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            $scope.feedback.mychannel="";
            $scope.feedbackForm.$setPristine();
            console.log($scope.feedback);
        }
    };
}])


.controller('VideoDetailController', ['$scope', '$stateParams', 'video', 'cateFactory', 'baseURL','$ionicPopover', 'favoriteFactory', '$ionicModal', function($scope, $stateParams, video, cateFactory, baseURL, $ionicPopover, favoriteFactory, $ionicModal) {
    
    $scope.baseURL = baseURL;
    $scope.video = {};
    $scope.showVideo = false;
    $scope.message = "Loading ...";
            
    $scope.video = video;
    
    //POPOVER
    $ionicPopover.fromTemplateUrl('templates/video-detail-popover.html', {
        scope:$scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    }

    $scope.closePopover = function ($event){
        $scope.popover.hide();
    }

    $scope.addFavorite = function() {
        console.log("index is " + $scope.video.id);

        favoriteFactory.addToFavorites($scope.video.id);
        $scope.closePopover();
    }
    
    //COMMENT MODAL
    
    
    
    
    $scope.mycomment = {rating:5, comment:"", author:"", date:""};

    $scope.submitComment = function () {
                
        $scope.mycomment.date = new Date().toISOString();
                console.log($scope.mycomment);
                
                $scope.video.comments.push($scope.mycomment);
        cateFactory.update({id:$scope.video.id},$scope.video);
                
                $scope.closeComment();
                
                $scope.mycomment = {rating:5, comment:"", author:"", date:""};
            }

            $ionicModal.fromTemplateUrl('templates/video-comment.html', {
              scope: $scope
            }).then(function(modal) {
              $scope.modal = modal;
            });

            
            $scope.closeComment = function() {
              console.log("closeComment() fired");
              $scope.modal.hide();
            };

            $scope.comment = function() {
              $scope.modal.show();
            };
    
    

}])



.controller('FavoritesController', ['$scope', 'videos', 'favorites', 'favoriteFactory', 'baseURL', '$ionicListDelegate', '$ionicPopup', '$ionicLoading', '$timeout', function ($scope, videos, favorites, favoriteFactory, baseURL, $ionicListDelegate, $ionicPopup, $ionicLoading, $timeout) {
    
    

    $scope.baseURL = baseURL;
    $scope.shouldShowDelete = false;
    
    $scope.favorites = favorites;

    $scope.videos = videos;
    
    console.log($scope.videos, $scope.favorites);
  
    $scope.toggleDelete = function () {
        $scope.shouldShowDelete = !$scope.shouldShowDelete;
        console.log($scope.shouldShowDelete);
    }

    $scope.deleteFavorite = function (index) {

        var confirmPopup = $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete this item?'
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('Ok to delete');
                favoriteFactory.deleteFromFavorites(index);
            } else {
                console.log('Canceled delete');
            }
        });

        $scope.shouldShowDelete = false;

    }
}])

.filter('favoriteFilter', function () {
    return function (videos, favorites) {
        var out = [];
        for (var i = 0; i < favorites.length; i++) {
            for (var j = 0; j < videos.length; j++) {
                if (videos[j].id === favorites[i].id)
                    out.push(videos[j]);
            }
        }
        return out;

    }
})



;
