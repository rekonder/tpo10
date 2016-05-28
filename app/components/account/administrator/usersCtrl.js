angular.module('app.components.account.administrator.users', []).
controller('usersCtrl',
['$scope', '$rootScope', '$odataresource', '$odata', '$httpParamSerializer',
function($scope, $rootScope, $odataresource, $odata, $httpParamSerializer) {
    var appSettings = $rootScope.appSettings;
    var UsersODataResource = $odataresource(appSettings.baseUrl + '/odata/ApplicationUsers/:userId', {userId:'@id'});
    
    var query = function() {
        $scope.users = null;
        $scope.url = null;
        $scope.users = UsersODataResource.odata().
            skip($scope.skip).
            take($scope.take).
            withInlineCount().
            orderBy($scope.orderby ? $scope.orderby : 'Email', $scope.orderdesc ? 'desc' : 'asc').
            query();
        // while($scope.users == null);
    };
    
    $scope.skip = 0;
    $scope.take = 5;
    $scope.nextPage = function() {
        $scope.skip += $scope.take;
        query();
    };
    $scope.prevPage = function() {
        $scope.skip -= $scope.take;
        query();
    };
    $scope.$watch('take', function(newValue) {
        $scope.skip = 0;
        $scope.take = Number(newValue);
        query();
    }, true);
    
    $scope.orderby = null;
    $scope.orderdesc = false;
    $scope.orderBy = function(property) {
        if($scope.orderby == property) {
            $scope.orderdesc = !$scope.orderdesc;
        }
        $scope.orderby = property;
        query();
    };
    
    $scope.print = function() {
        // TODO
    };
    
    query();
    console.log($scope.users);
}]);