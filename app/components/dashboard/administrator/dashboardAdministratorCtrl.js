angular.module('app.components.dashboard.administrator', []).
controller('dashboardAdministrator', ['$scope', '$location', 'accountService',
    function($scope, $location, accountService) {
        console.log("Hello");
        $scope.$watch(function() { return accountService.getAccount(); }, function(newValue) {
            console.log("Hello");
            $scope.account = newValue;
        }, true);
    }]);