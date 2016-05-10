angular.module('app.components.changePassword', []).
controller('changePasswordCtrl',
    ['$scope', 'accountResource', 'accountService', '$location',
        function($scope, accountResource, accountService, $location) {
            var account = accountService.getAccount();

            if(accountService.authorize('Patient', null));
            else if(accountService.authorize('Doctor', null));
            else if(accountService.authorize('Administrator', null));
            else $location.path('/account');

            $scope.changePassword = function() {
                $scope.changingPassword = true;
                accountResource().changePassword({
                    "OldPassword": $scope.oldPassword,
                    "NewPassword": $scope.newPassword,
                    "ConfirmPassword": $scope.confirmNewPassword
                }).$promise.then(function(response) {
                    console.log(response);
                    $scope.changingPassword = false;
                    $.notify({message: 'Geslo je bilo spremenjeno.'}, {type: 'success'});
                    $scope.oldPassword = null;
                    $scope.newPassword = null;
                    $scope.confirmNewPassword = null;
                    $scope.changePass.$setPristine();
                    $scope.changePass.$setUntouched();
                }, function(response) {
                    console.log(response);
                    $scope.changingPassword = false;
                    $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                    $scope.oldPassword = null;
                    $scope.newPassword = null;
                    $scope.confirmNewPassword = null;
                    $scope.changePass.$setPristine();
                    $scope.changePass.$setUntouched();
                });
            };
        }]);