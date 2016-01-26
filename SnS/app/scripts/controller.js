'use strict';

angular.module('SnSApp')


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