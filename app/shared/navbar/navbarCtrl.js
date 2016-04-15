angular.module('app.shared.navbar', []).
controller('navbarCtrl', ['$scope', '$location',
function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);