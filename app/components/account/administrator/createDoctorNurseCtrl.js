angular.module('app.components.account.administrator', []).
controller('createDoctorNurseCtrl',
    ['$scope', 'accountResource', 'accountService', '$location',
        function($scope, accountResource, accountService, $location) {
            var account = accountService.getAccount();

            if(accountService.authorize('Administrator', null));
            else $location.path('/account');
            $scope.role = 'Doctor';
            
            $scope.registerDoctorNurse = function() {
                $scope.registering = true;
                accountResource().createAccount({
                    'Email': $scope.email,
                    'Password': $scope.password,
                    'ConfirmPassword': $scope.confirmPassword,
                    'Role': $scope.role
                }).$promise.then(function(response) {
                    console.log(response);
                    $scope.registering = false;
                    var message = 'Uspešno ste ustvarili račun za ';
                    if($scope.role == 'Doctor')
                        message += 'zdravnika ';
                    else
                        message += 'medicinsko sestro ';
                    $.notify({message: message +  $scope.email + ' .'}, {type: 'success'});
                    $scope.oldEmail = $scope.email;
                    $scope.oldRole = $scope.role;
                    if($scope.oldRole == 'Doctor')
                        $scope.sloRole = 'zdravnika';
                    else 
                        $scope.sloRole = 'medicinske sestre';
                    $scope.email = null;
                    $scope.password = null;
                    $scope.confirmPassword = null;
                    $scope.registerDoctorNurseForm.$setPristine();
                    $scope.role = 'Doctor';
                    $scope.created = true;
                    $scope.createProfile = false;
                    //response.UserId;
                }, function(response) {
                    console.log(response);
                    $scope.registering = false;
                    try {
                        var error = response.data.ModelState[''][1];
                        $.notify({message: 'Ta e-poštni račun je že zaseden.'}, {type: 'danger'});
                    } catch(e) {
                        $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                    }
                });
            };

        }]);