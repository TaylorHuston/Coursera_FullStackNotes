'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

  $scope.tab = 1;
  $scope.filtText = '';
  $scope.showDetails = false;
  $scope.message = "Loading ...";
  $scope.showMenu = false;

  //  $scope.dishes = {};
  //
  //  menuFactory.getDishes()
  //    .then(
  //      function (response) {
  //        $scope.dishes = response.data;
  //        $scope.showMenu = true;
  //      },
  //      function (response) {
  //        $scope.message = "Error: " + response.status + " " + response.statusText;
  //      }
  //    );

  //Using $resource instead
  $scope.dishes = menuFactory.getDishes().query(
    function (response) {
      $scope.dishes = response;
      $scope.showMenu = true;
    },
    function (response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );


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

  $scope.sendFeedback = function () {

    console.log($scope.feedback);

    if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
      $scope.invalidChannelSelection = true;
      console.log('incorrect');
    } else {
      feedbackFactory.updateFeedback().save($scope.feedback);
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


  $scope.message = "Loading ...";
  $scope.showDish = false;

  //  $scope.dish = {};
  //  menuFactory.getDish(parseInt($stateParams.id, 10))
  //    .then(
  //      function (response) {
  //        $scope.dish = response.data;
  //        $scope.showDish = true;
  //      },
  //      function (response) {
  //        $scope.message = "Error: " + response.status + " " + response.statusText;
  //      }
  //    );

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
      })
}])

.controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

  $scope.mycomment = {
    rating: 5,
    comment: "",
    author: "",
    date: ""
  };

  $scope.submitComment = function () {

    $scope.newComment.date = new Date().toISOString();
    console.log($scope.newComment);

    $scope.dish.comments.push($scope.newComment);
    menuFactory.getDishes().update({
      id: $scope.dish.id
    }, $scope.dish);

    $scope.commentForm.$setPristine();

    $scope.newComment = {
      rating: 5,
      comment: "",
      author: "",
      date: ""
    };
  }
}])

// implement the IndexController and About Controller here
.controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {
  $scope.message = "Loading ...";
  $scope.showDish = false;

  //  $scope.featured = {};
  //  menuFactory.getDish(0)
  //    .then(
  //      function (response) {
  //        $scope.featured = response.data;
  //        $scope.showDish = true;
  //      },
  //      function (response) {
  //        $scope.message = "Error: " + response.status + " " + response.statusText;
  //      }
  //    );

  $scope.featured = menuFactory.getDishes().get({
      id: 0
    },
    function (response) {
      $scope.showDish = true;
      $scope.featured = response;
    },
    function (response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    }
  );


  $scope.showPromo = false;
  $scope.promo = menuFactory.getPromotion().get({
      id: 0
    },
    function (response) {
      $scope.showPromo = true;
      $scope.promo = response;
    },
    function (response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    });

  $scope.showChef = false;
  $scope.chef = corporateFactory.getLeaders().get({
      id: 3
    },
    function (response) {
      $scope.showChef = true;
      $scope.chef = response;
    },
    function (response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    });

}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

  $scope.message = "Loading ...";
  $scope.showLeaders = false;
  $scope.leaders = corporateFactory.getLeaders().query(
    function (response) {
      $scope.showLeaders = true;
      $scope.leaders = response;
    },
    function (response) {
      $scope.message = "Error: " + response.status + " " + response.statusText;
    });

}])

;
