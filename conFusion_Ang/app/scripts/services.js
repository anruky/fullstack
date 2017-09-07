'use strict';

angular.module('confusionApp')

    .constant("baseURL", "http://localhost:3000/")
    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        this.getDishes = function () {
            return $resource(baseURL + "dishes/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

        //        this.getDishes = function () {
        //
        //            return $http.get(baseURL + "dishes");
        //
        //
        //        };
        //
        //
        //        this.getDish = function (index) {
        //
        //            return $http.get(baseURL + "dishes/" + index);
        //        };

        // implement a function named getPromotion
        // that returns a selected promotion.

        this.getPromotions = function () {
            return $resource(baseURL + "promotions/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };


    }])

    .service('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


        this.getLeaders = function () {
            return $resource(baseURL + "leadership/:id", null, {
                'update': {
                    method: 'PUT'
                }
            });
        };

    }])

 .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

               return $resource(baseURL + "feedback");

     
    }])
;
