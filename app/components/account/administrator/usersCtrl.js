angular.module('app.components.account.administrator.users', []).
controller('usersCtrl',
['$scope', '$rootScope', '$odataresource', '$odata', '$httpParamSerializer', 'helperResources',
function($scope, $rootScope, $odataresource, $odata, $httpParamSerializer, helperResources) {
    var appSettings = $rootScope.appSettings;
    var UsersODataResource = $odataresource(appSettings.baseUrl + '/odata/ApplicationUsers/:userId', {userId:'@id'});
           
    var query = function() {
        $scope.users = null;
        $scope.url = null;
        if($scope.createdOnInLastXDays != '/') {
            var minDate = moment().subtract('day', $scope.createdOnInLastXDays).hours(0).minutes(0).seconds(0).toDate();
            console.log('DATE', new Date(minDate).toJSON());
            $scope.users = UsersODataResource.odata().
                expand('Roles').
                filter(
                    'CreatedOn',
                    '>=',
                    new $odata.Value(minDate, 'DateTime')
                ).
                skip($scope.skip).
                take($scope.take).
                withInlineCount().
                orderBy($scope.orderby ? $scope.orderby : 'Email', $scope.orderdesc ? 'desc' : 'asc').
                query();
        } else {
            $scope.users = UsersODataResource.odata().
                expand('Roles').
                skip($scope.skip).
                take($scope.take).
                withInlineCount().
                orderBy($scope.orderby ? $scope.orderby : 'Email', $scope.orderdesc ? 'desc' : 'asc').
                query();
        }
    };
    
    $scope.createdOnInLastXDays = '/';
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
    $scope.$watch('createdOnInLastXDays', function(newValue) {
        $scope.skip = 0;
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
        window.print();
    };
    
    query();
    console.log($scope.users);
}]);