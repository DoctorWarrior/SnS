'use strict';

angular.module('SnSApp')

        .controller('CategoryController', ['$scope', 'cateFactory', function($scope, cateFactory){
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            
            $scope.videos= cateFactory.getVideos();
            
            
            $scope.select = function(setTab)            {
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

        .controller('FeedbackController', ['$scope', function($scope) {
                        $scope.sendFeedback = function() {
                                console.log($scope.feedback);
                                if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])




    .controller('VideoDetailController', ['$scope', '$routeParams', 'cateFactory', function($scope, $routeParams, cateFactory) {

            
            var video= cateFactory.getVideo(parseInt($routeParams.id,10));
            $scope.video = video;


        }])




    .controller('VideoCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            
            $scope.submitComment = function () {
                console.log($scope.comment);

                //Step 2: This is how you record the date
                $scope.comment.date = new Date().toISOString();
                
                // Step 3: Push your comment into the video's comment array
                $scope.video.comments.push($scope.comment);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.comment = {author: "", rating: 5, comment: "", date: new Date().toISOString()};
                console.log($scope.comment);
            };
        }])


;