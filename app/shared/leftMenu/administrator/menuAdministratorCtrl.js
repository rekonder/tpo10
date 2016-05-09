angular.module('app.shared.leftMenu.administrator', []).
controller('dashboardAdministrator', ['$scope', '$location', 'accountService',
    function($scope, $location, accountService) {
        $scope.$watch(function() { return accountService.getAccount(); }, function(newValue) {
            $scope.account = newValue;
        }, true);
    }]);