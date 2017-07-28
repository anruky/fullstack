'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;

        $scope.dishes = menuFactory.getDishes();


        $scope.select = function (setTab) {
            $scope.tab = setTab;

            if (setTab === 2) {
                $scope.filtText = "appetizer";
            } else if (setTab === 3) {
                $scope.filtText = "mains";
            } else if (setTab === 4) {
                $scope.filtText = "dessert";
            } else {
                $scope.filtText = "";
            }
        };

        $scope.isSelected = function (checkTab) {
            return ($scope.tab === checkTab);
        };

        $scope.toggleDetails = function () {
            $scope.showDetails = !$scope.showDetails;
        };
        }])

    .controller('ContactController', ['$scope', function ($scope) {

        $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
        };

        var channels = [{
            value: "tel",
            label: "Tel."
        }, {
            value: "Email",
            label: "Email"
        }];

        $scope.channels = channels;
        $scope.invalidChannelSelection = false;

        }])

    .controller('FeedbackController', ['$scope', function ($scope) {

        $scope.sendFeedback = function () {

            console.log($scope.feedback);

            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            } else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {
                    mychannel: "",
                    firstName: "",
                    lastName: "",
                    agree: false,
                    email: ""
                };
                $scope.feedback.mychannel = "";
                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
        };
        }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

        
        var ind= 0;
        
        if ($stateParams.id != null) {ind = parseInt($stateParams.id, 10)};
        
        var dish = menuFactory.getDish(ind);

        $scope.dish = dish;

        }])

   .controller('PromotionController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        var promotion = menuFactory.getPromotion(0);

        $scope.promotion = promotion;

        }])

    .controller('DishCommentController', ['$scope', function ($scope) {

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };

        $scope.submitComment = function () {

            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);

            $scope.dish.comments.push($scope.mycomment);

            $scope.commentForm.$setPristine();

            $scope.mycomment = {
                rating: 5,
                comment: "",
                author: "",
                date: ""
            };
        }
        }])

    // implement the AboutIndexController and AboutController here

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.leaders = corporateFactory.getLeaders();

        }])

    .controller('IndexController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

        $scope.leader = corporateFactory.getLeader(3);

        }])

;
