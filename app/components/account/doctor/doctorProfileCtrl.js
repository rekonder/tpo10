angular.module('app.components.account.doctor', []).
controller('createDoctorCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', 'doctorProfileResources', 'helperResources', '$route',
        function($scope, accountResource, accountService, $location, doctorProfileResources, helperResources, $route) {
            var account = accountService.getAccount();

            if(accountService.authorize('Doctor', null));
            else $location.path('/account');

            $scope.roleDoc = 0;
            $scope.refreshProfiles = function() {
                doctorProfileResources().getDoctorProfile({id: account.id}).$promise.then(function(response) {
                    console.log(response);
                    $scope.profile = response;
                    $scope.formData = angular.copy(response);
                    $scope.doctorOrDentist();
                    if(response.length == 0) {
                        $scope.profile= [];
                        $scope.formData = [];
                    }
                    accountService.setCheckDoctorProfile(true);
                }, function(response) {
                    console.log(response);
                    accountService.setCheckDoctorProfile(false);
                    $scope.profile= [];
                    $scope.formData = [];
                });
            };

            $scope.refreshProfiles();

            helperResources().getHealthCareProviders().$promise.then(function(response) {
                $scope.healthCareProvidersProfile = response;
            },function(response) {
                $scope.healthCareProvidersProfile = [];
            });

            $scope.createStaffProfile = function() {
                $scope.submittingProfile = true;
                var profile = {
                    'DoctorKey': $scope.doctorKey,
                    'FirstName': $scope.firstName,
                    'LastName': $scope.lastName,
                    'Telephone': $scope.telephone,
                    'PatientNumber': $scope.patientNumber,
                    'DocOrDentist': $scope.roleDoc,
                    'HealthCareProviderNumber': $scope.healthCareProviderNumber.Key,
                    'Email': $scope.email
                };
                doctorProfileResources().postDoctorProfile({id: account.id}, profile).$promise.then(function (response) {
                    $scope.refreshProfiles();
                    $scope.submittingProfile = false;
                    $.notify({message: 'Uspešno ste kreirali profil zdravnika ' + $scope.email}, {type: 'success'});
                    accountService.setCheckDoctorProfile(true);
                    accountService.setEmail( $scope.email);
                }, function (response) {
                    $scope.submittingProfile = false;
                    if(response.statusText == "Not Found")
                        $.notify({message: 'Ta ustanova s to številko ne obstaja.'}, {type: 'danger'});
                    else if (response.data.Message == "doctor or nurse with that key already exsists")
                        $.notify({message: 'Ta številka zdravnika ali medicinske sestre že obstaja.'}, {type: 'danger'});
                    else
                        $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                });
            };

            $scope.doctorOrDentist = function () {
                console.log($scope.formData.DocOrDentist);
                if($scope.formData.DocOrDentist == 0)
                    $scope.roleDocName = "Zdravnik";
                else
                    $scope.roleDocName = "Zobozdravnik";
            }
            $scope.open = function () {
                $scope.clicked = true;
                var choosen_value = $scope.formData.HealthCareProvider;
                angular.forEach($scope.healthCareProvidersProfile, function(item){
                    if(angular.equals(choosen_value, item)){
                        $scope.healthCareProviderNumber = item;
                    }
                });
                //$scope.healthCareProviderNumber = $scope.formData.HealthCareProvider;
                $scope.roleDocUpdate = $scope.formData.DocOrDentist;
            }

            $scope.changeProfile = function () {

                $scope.submittingProfile = true;
                $scope.profile.DocOrDentist = $scope.roleDocUpdate;
                $scope.profile.HealthCareProvider.Key = $scope.healthCareProviderNumber.Key;
                $scope.profile.HealthCareProvider.Name = $scope.healthCareProviderNumber.Name;
                $scope.profile.HealthCareProviderNumber = $scope.healthCareProviderNumber.Key;
                doctorProfileResources().putDoctorProfile({id: account.id}, $scope.profile).$promise.then(function(response) {
                    console.log(response);
                    $scope.submittingProfile = false;
                    $.notify({message: 'Profil je bil posodobljen.'}, {type: 'success'});
                    $scope.formData = angular.copy($scope.profile);
                    $scope.doctorOrDentist();
                    $scope.clicked = false;
                    accountService.setEmail($scope.profile.Email);
                }, function(response) {
                    console.log(response);
                    $scope.submittingProfile = false;
                    $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                });
            }
        }]);