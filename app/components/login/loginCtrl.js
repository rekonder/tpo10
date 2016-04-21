angular.module('app.components.login', []).
controller('loginCtrl', ['$scope', 'accountResource', '$httpParamSerializer', 'accountService', '$location',
function($scope, accountResource, $httpParamSerializer, accountService, $location) {
    $scope.submit = function() {
        $scope.submitting = true;
        accountResource().login($httpParamSerializer({
            'grant_type': 'password',
            'username': $scope.email,
            'password': $scope.password
        })).$promise.then(function(response) {
            console.log(response);
            $scope.submitting = false;
            accountService.setAccount(
                response.userId,
                response.email,
                response.role,
                response.access_token,
                response.lastLogin,
                response.lastLoginIp,
                response.profileCount
            );
            $location.path('/account', false);
        }, function(response) {
            console.log(response);
            $scope.submitting = false;
            if(response.data.error === 'invalid_grant') {
                $.notify({message: response.data.error_description}, {type: 'danger'});
            } else {
                $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
            }
        });
    };
}]);