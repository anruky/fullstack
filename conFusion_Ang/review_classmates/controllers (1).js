'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.message = "Loading ... ";

            $scope.dishes = menuFactory.getDishes().query(
              function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }  
            );
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
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

        .controller('FeedbackController', ['$scope','feedbackFactory', function($scope,feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    
                    // connect with server
                    console.log($scope.feedback);
                    var send = new feedbackFactory($scope.feedback);
                    console.log(send);
                    send.$save();
                    
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope','$stateParams','menuFactory', function($scope,$stateParams,menuFactory) {

            
            $scope.showDish = false;
            $scope.message = "Loading ... ";

            $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)}).$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                         );
        }])

        .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.comment = {yourname:"",numberofstarts:5,yourcomments:"",date:""};


            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
                $scope.comment.date = new Date();
               
                //00000 "The date property of your JavaScript object holding the comment" = new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                $scope.commentpush ={rating:"",comment:"",author:"",date:""};
                $scope.commentpush.rating = $scope.comment.numberofstarts;
                $scope.commentpush.comment = $scope.comment.yourcomments;
                $scope.commentpush.author = $scope.comment.yourname;
                $scope.commentpush.date = $scope.comment.date;

                $scope.dish.comments.push($scope.commentpush);
                
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                
                console.log($scope.commentpush);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                
                //Step 5: reset your JavaScript object that holds your comment
                $scope.comment = {yourname:"",numberofstarts:5,yourcomments:"",date:""};
            };

            // $scope.select = function(num){
            //   $scope.comment.numberofstarts = num;
            // };

            // $scope.isSelected = function(select){
            //   return ($scope.comment.numberofstarts === select);
            // };
        }])

        .controller('IndexController',['$scope','menuFactory',function($scope,menuFactory){
            
            
            $scope.showDish = false;
            $scope.message="Loading ...";

            $scope.dish = menuFactory.getDishes().get({id:0}).$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
                        );
            
            $scope.showPromotion = false;
            $scope.promotion = menuFactory.getPromotion().get({id:0}).$promise.then(
                function(response){
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function(response){
                    $scope.message = "Error: "+response.status + " " + response.statusText; 
                }
            );
        
        }])

        .controller('AboutController',['$scope','corporateFactory',function($scope,corporateFactory){
            
            $scope.message="Loading ...";
            
            $scope.showLeaderships=false;
            $scope.leaderships = corporateFactory.getLeaders().query(
                function(response) {
                    $scope.leaderships = response;
                    $scope.showLeaderships = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                }  
            );
            
            $scope.showChef=false;
            $scope.chef = corporateFactory.getLeaders().get({id:3}).$promise.then(
                function(response){
                    $scope.chef = response;
                    console.log($scope.chef);
                    $scope.showChef = true;
                },
                function(response){
                    $scope.message = "Error: "+response.status + " " + response.statusText; 
                }
            );
        }])
;
