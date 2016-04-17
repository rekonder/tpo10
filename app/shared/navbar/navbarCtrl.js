angular.module('app.shared.navbar', []).
controller('navbarCtrl', ['$scope', '$location', 'accountService', 'accountResource',
function($scope, $location, accountService, accountResource) {
    $scope.$watch(function() { return accountService.getAccount(); }, function(newValue) {
        $scope.account = newValue;
    }, true);
    
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    
    $scope.logout = function() {
        accountResource().logout().$promise.then(function(response) {
            console.log(response);
        }, function(response) {
            console.log(response);
        });
        accountService.removeAccount();
    };
    
    $scope.navbarToggle = function() {
        $('#navbar').collapse('toggle');
    }
}]);