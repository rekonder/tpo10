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

    $scope.$watch('q', function(newValue) {

        switch($scope.q) {
            case 'doktor': $scope.q1 = 'Doctor'; break;
            case 'dokto': $scope.q1 = 'Docto'; break;
            case 'dokt': $scope.q1 = 'Doct'; break;
            case 'dok': $scope.q1 = 'Doc'; break;

            case 'sestra': $scope.q1 = 'Nurse'; break;
            case 'sestr': $scope.q1 = 'Nurs'; break;
            case 'sest': $scope.q1 = 'Nur'; break;
            case 'ses': $scope.q1 = 'Nu'; break;
            case 'se': $scope.q1 = 'Nu'; break;

            case 'pacient': $scope.q1 = 'Patient'; break;
            case 'pacien': $scope.q1 = 'Patien'; break;
            case 'pacie': $scope.q1 = 'Patie'; break;
            case 'paci': $scope.q1 = 'Pati'; break;
            case 'pac': $scope.q1 = 'Pat'; break;

            default: $scope.q1 = $scope.q;
        }
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