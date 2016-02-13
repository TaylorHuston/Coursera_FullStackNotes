'use strict';

angular.module('confusionApp')
  .constant("baseURL", "http://localhost:3000/")
  .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    this.getDishes = function () {

      //      return $http.get(baseURL + "dishes");
      return $resource(baseURL + "dishes/:id", null, {
        "update": {
          method: "PUT"
        }
      });

    };

    //    this.getDish = function (index) {
    //
    //      return $http.get(baseURL + "dishes/" + index);
    //    };

    // implement a function named getPromotion
    // that returns a selected promotion.

    this.getPromotion = function () {

      return $resource(baseURL + "promotions/:id");

    };

  }])

.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

  var corpfac = {};

  corpfac.getLeaders = function () {
    return $resource(baseURL + "leadership/:id");
  }

  return corpfac;

  }])

.factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

  var feedfac = {};

  feedfac.updateFeedback = function () {
    return $resource(baseURL + "feedback/:id");
  }

  return feedfac;
}]);
