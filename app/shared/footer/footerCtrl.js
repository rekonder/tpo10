angular.module('app.shared.footer', []).
controller('footerCtrl', ['$scope', '$location', 'accountService', 'accountResource',
function($scope, $location, accountService, accountResource) {
    $scope.$watch(function() { return accountService.getAccount(); }, function(newValue) {
        $scope.account = newValue;
    }, true);
}]);