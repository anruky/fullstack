'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.message = "Loading ...";

        //        $scope.dishes = menuFactory.getDishes();
        //        

        $scope.showMenu = false;
        $scope.message = "Loading ...";
        menuFactory.getDishes().query(
            function (response) {
                $scope.dishes = response;
                $scope.showMenu = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            });

        //        
        //        $scope.dishes = {};
        //        menuFactory.getDishes()
        //            .then(
        //                function (response) {
        //                    $scope.dishes = response.data;
        //                    $scope.showMenu = true;
        //                },
        //                function (response) {
        //                    $scope.message = "Error: " + response.status + " " + response.statusText;
        //                }
        //
        //            );


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

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

        //        $scope.sendFeedback = function () {
        //
        //            console.log($scope.feedback);
        //
        //            if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
        //                $scope.invalidChannelSelection = true;
        //                console.log('incorrect');
        //            } else {
        //                $scope.invalidChannelSelection = false;
        //                $scope.feedback = {
        //                    mychannel: "",
        //                    firstName: "",
        //                    lastName: "",
        //                    agree: false,
        //                    email: ""
        //                };
        //                $scope.feedback.mychannel = "";
        //                $scope.feedbackForm.$setPristine();
        //                console.log($scope.feedback);
        //            }
        //        };


        $scope.sendFeedback = function () {


            console.log($scope.feedback);

            var fd = new feedbackFactory($scope.feedback);
            fd.$save();

            $scope.feedbackForm.$setPristine();
            $scope.feedback = {
                mychannel: "",
                firstName: "",
                lastName: "",
                agree: false,
                email: "",
                areaCode: "",
                number: "",
                comments:""
            };

        };




        }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {


        var ind = 0;

        if ($stateParams.id != null) {
            ind = parseInt($stateParams.id, 10)
        };

        $scope.showDish = false;
        $scope.message = "Loading ...";
        $scope.dish = menuFactory.getDishes().get({
                id: parseInt($stateParams.id, 10)
            })
            .$promise.then(
                function (response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

        //        menuFactory.getDish(parseInt($stateParams.id, 10))
        //            .then(
        //                function (response) {
        //                    $scope.dish = response.data;
        //                    $scope.showDish = true;
        //                },
        //                function (response) {
        //                    $scope.message = "Error: " + response.status + " " + response.statusText;
        //                }
        //            );

        }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

        $scope.mycomment = {
            rating: 5,
            comment: "",
            author: "",
            date: ""
        };

        //        $scope.submitComment = function () {
        //
        //            $scope.mycomment.date = new Date().toISOString();
        //            console.log($scope.mycomment);
        //
        //            $scope.dish.comments.push($scope.mycomment);
        //
        //            $scope.commentForm.$setPristine();
        //
        //            $scope.mycomment = {
        //                rating: 5,
        //                comment: "",
        //                author: "",
        //                date: ""
        //            };
        //        }

        $scope.submitComment = function () {
            $scope.mycomment.date = new Date().toISOString();
            console.log($scope.mycomment);
            $scope.dish.comments.push($scope.mycomment);

            menuFactory.getDishes().update({
                id: $scope.dish.id
            }, $scope.dish);
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

        corporateFactory.getLeaders().query(
            function (response) {
                $scope.leaders = response;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

        }])

    .controller('IndexController', ['$scope', 'corporateFactory', 'menuFactory', function ($scope, corporateFactory, menuFactory) {

        //        $scope.leader = corporateFactory.getLeader(3);
        //        $scope.promotion = menuFactory.getPromotion(0);
        //        $scope.dish = menuFactory.getDish(0);


        //        $scope.dish = {};
        $scope.message = "Loading ...";

        $scope.showDish = false;
        $scope.dish = menuFactory.getDishes().get({
                id: 0
            })
            .$promise.then(
                function (response) {
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

        $scope.showPromotion = false;
        $scope.promotion = menuFactory.getPromotions().get({
                id: 0
            })
            .$promise.then(
                function (response) {
                    $scope.promotion = response;
                    $scope.showPromotion = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );

        $scope.leader = corporateFactory.getLeaders().get({
                id: 1
            })
            .$promise.then(
                function (response) {
                    $scope.leader = response;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );




        }])

;
