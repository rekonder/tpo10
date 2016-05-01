angular.module('app.components.account.administrator', []).
controller('createDoctorNurseCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', 'doctorProfileResources', 'nurseProfileResources',
        function($scope, accountResource, accountService, $location, doctorProfileResources, nurseProfileResources) {
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
                    if($scope.oldRole == 'Doctor') {
                        $scope.sloRole = 'zdravnika';
                        $scope.zdravnik = true;
                    }
                    else {
                        $scope.sloRole = 'medicinske sestre';
                        $scope.zdravnik = false;
                    }
                    $scope.staffId = response.UserId;

                    //reset
                    $scope.email = null;
                    $scope.password = null;
                    $scope.confirmPassword = null;
                    $scope.registerDoctorNurseForm.$setPristine();
                    $scope.registerDoctorNurseForm.$setUntouched();
                    $scope.doctorKey = null;
                    $scope.firstName = null;
                    $scope.lastName = null;
                    $scope.telephone = null;
                    $scope.patientNumber = null;
                    $scope.healthCareProviderNumber = null;
                    $scope.profileDoctorNurseForm.$setPristine();
                    $scope.profileDoctorNurseForm.$setUntouched();
                    $scope.role = 'Doctor';
                    $scope.created = true;
                    $scope.createProfile = false;
                }, function(response) {
                    $scope.registering = false;
                    try {
                        var error = response.data.ModelState[''][1];
                        $.notify({message: 'Ta e-poštni račun je že zaseden.'}, {type: 'danger'});
                    } catch(e) {
                        $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                    }
                });
            };

            $scope.createStaffProfile = function() {
                $scope.submittingProfile = true;
                if($scope.zdravnik) {
                    var profile = {
                        'DoctorKey': $scope.doctorKey,
                        'FirstName': $scope.firstName,
                        'LastName': $scope.lastName,
                        'Telephone': $scope.telephone,
                        'PatientNumber': $scope.patientNumber,
                        'HealthCareProviderNumber': $scope.healthCareProviderNumber
                    };
                    console.log(profile);
                    doctorProfileResources().postDoctorProfile({id: $scope.staffId}, profile).$promise.then(function (response) {
                        $scope.submittingProfile = false;
                        $scope.doctorKey = null;
                        $scope.firstName = null;
                        $scope.lastName = null;
                        $scope.telephone = null;
                        $scope.patientNumber = null;
                        $scope.healthCareProviderNumber = null;
                        $scope.profileDoctorNurseForm.$setPristine();
                        $scope.profileDoctorNurseForm.$setUntouched();
                        $scope.createProfile = false;
                        $scope.created = false;

                        $.notify({message: 'Uspešno ste kreirali profil zdravnika ' + $scope.oldEmail}, {type: 'success'});
                    }, function (response) {
                        $scope.submittingProfile = false;
                        if(response.statusText == "Not Found")
                            $.notify({message: 'Ta ustanova s to številko ne obstaja.'}, {type: 'danger'});
                        else if (response.data.Message == "Doctor or nurse with that key already exsists")
                            $.notify({message: 'Ta številka zdravnika ali medicinske sestre že obstaja.'}, {type: 'danger'});
                        else
                            $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                    });
                }
                else{
                    var profile = {
                        'NurseKey': $scope.doctorKey,
                        'FirstName': $scope.firstName,
                        'LastName': $scope.lastName,
                        'Telephone': $scope.telephone,
                        'HealthCareProviderNumber': $scope.healthCareProviderNumber
                    };
                    console.log(profile);
                    nurseProfileResources().postNurseProfile({id: $scope.staffId}, profile).$promise.then(function (response) {
                        $scope.submittingProfile = false;
                        $scope.doctorKey = null;
                        $scope.firstName = null;
                        $scope.lastName = null;
                        $scope.telephone = null;
                        $scope.healthCareProviderNumber = null;
                        $scope.profileDoctorNurseForm.$setPristine();
                        $scope.profileDoctorNurseForm.$setUntouched();
                        $scope.createProfile = false;
                        $scope.created = false;

                        $.notify({message: 'Uspešno ste kreirali profil medicinske sestre ' + $scope.oldEmail}, {type: 'success'});
                    }, function (response) {
                        $scope.submittingProfile = false;

                        if(response.statusText == "Not Found")
                            $.notify({message: 'Ta ustanova s to številko ne obstaja.'}, {type: 'danger'});
                        else if (response.data.Message == "Doctor or nurse with that key already exsists")
                            $.notify({message: 'Ta številka zdravnika ali medicinske sestre že obstaja.'}, {type: 'danger'});
                        else
                            $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                    });
                }
            };

        }]);