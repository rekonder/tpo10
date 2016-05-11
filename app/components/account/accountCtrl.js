angular.module('app.components.account', []).
controller('accountCtrl', ['$scope', 'accountResource', 'accountService', '$location',
function($scope, accountResource, accountService, $location) {
    if(     accountService.authorize('Patient',       '/account/patient'));
    else if(accountService.authorize('Doctor',        '/account/doctor'));
    else if(accountService.authorize('Nurse',         '/account/nurse'));
    else if(accountService.authorize('Administrator', '/account/administrator'));
    else $location.path('/login');
    return;
}]);