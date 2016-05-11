angular.module('app.shared.leftMenu', []).
controller('leftMenuCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', '$routeParams', 'patientProfileResources', 'doctorProfileResources',
        function($scope, accountResource, accountService, $location, $routeParams, patientProfileResources, doctorProfileResources) {
            $scope.account = accountService.getAccount();
            $scope.absUrl = $location.absUrl();
            console.log($scope.absUrl);
            console.log($routeParams.patientId);
            $scope.patient = accountService.authorize('Patient', null);
            $scope.doctor = accountService.authorize('Doctor', null);
            $scope.admin = accountService.authorize('Administrator', null);
            $scope.patientLogged = false;
            $scope.profile = {};
            if ($scope.patient){
                $scope.refreshProfilePatient = function () {
                    if ($routeParams.patientId) {

                        patientProfileResources().getPatientProfile({id: $routeParams.patientId}).$promise.then(function (response) {
                            console.log(response);
                            response.BirthDate = moment(response.BirthDate).toDate().toLocaleDateString();
                            $scope.profile = response;
                            $scope.avatar = ($scope.profile.Gender == "Moški") ? "assets/images/profiles/patient-male.png" : "assets/images/profiles/patient-female.png";
                            console.log($scope.avatar);

                        }, function (response) {
                            $scope.patient = false;
                            $scope.patientLogged = true;
                            $scope.avatar = "assets/images/profiles/patient-male.png";
                            console.log(response);
                        });
                    }
                    else{
                        $scope.patient = false;
                        $scope.patientLogged = true;
                        $scope.avatar = "assets/images/profiles/patient-male.png";
                    }
                };
                $scope.refreshProfilePatient();
            }
            else if ($scope.doctor) {
                $scope.refreshProfilesDoctor = function() {
                    doctorProfileResources().getDoctorProfile({id: $scope.account.id}).$promise.then(function(response) {
                        $scope.avatar = "assets/images/profiles/doctor.png";
                        $scope.profile = response
                    }, function(response) {
                        console.log(response);
                    });
                };

                $scope.refreshProfilesDoctor();
            }
            else if ($scope.admin) {
                $scope.avatar = "assets/images/profiles/admin.png";
            }

        }]);   