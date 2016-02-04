angular.module('SnS.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

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

.controller('CategoryController', ['$scope', 'cateFactory', function($scope, cateFactory){
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.show = false;
            $scope.message = "Loading ...";
            
            cateFactory.getVideos().query(
                function(response) {
                    $scope.videos = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error:"+response.status + " " + response.statusText;
                }
            );
            
            
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
                    $scope.filtText = '';
                }
                
            };
            
            $scope.isSelected = function(checkTab){
                return ($scope.tab ===checkTab);
            };
            
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
            
            

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


.controller('VideoDetailController', ['$scope', '$stateParams', 'cateFactory', function($scope, $stateParams, cateFactory) {

            
            $scope.showVideo = false;
            $scope.message = "Loading ...";
            
            $scope.video = cateFactory.getVideos().get({ id: parseInt($stateParams.id, 10) })
            .$promise.then(
                            function (response) {
                                $scope.video = response;
                                $scope.showVideo = true;
                            },
                            function (response) {
                                $scope.message = "Error: " + response.status + " " + response.statusText;
                            }
            );

}])


        
.controller('VideoCommentController', ['$scope', 'cateFactory', function ($scope, cateFactory) {    

            $scope.comment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {

                $scope.comment.date = new Date().toISOString();
                console.log($scope.comment);

                $scope.video.comments.push($scope.comment);
                cateFactory.getVideos().update({ id: $scope.video.id }, $scope.video);

                $scope.commentForm.$setPristine();

                $scope.comment = { rating: 5, comment: "", author: "", date: "" };
            };
}])




;
