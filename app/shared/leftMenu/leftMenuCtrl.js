angular.module('app.shared.leftMenu', []).
controller('leftMenuCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', '$routeParams', 'patientProfileResources',
        function($scope, accountResource, accountService, $location, $routeParams, patientProfileResources) {

            $scope.absUrl = $location.absUrl();
            console.log($scope.absUrl);
            console.log($routeParams.patientId);
            $scope.patient = accountService.authorize('Patient', null)
            $scope.doctor = accountService.authorize('Doctor', null)
            $scope.admin = accountService.authorize('Administrator', null)
            $scope.refreshProfile = function() {
                patientProfileResources().getPatientProfile({id: $routeParams.patientId}).$promise.then(function(response) {
                    console.log(response);
                    response.BirthDate = moment(response.BirthDate).toDate().toLocaleDateString();
                    $scope.profile = response;
                    if($scope.patient)
                        $scope.avatar = ($scope.profile.Gender == "Moški")? "assets/images/profiles/patient-male.png":"assets/images/profiles/patient-female.png";
                    console.log($scope.avatar);

                }, function(response) {
                    console.log(response);
                });
            };
            if ($scope.doctor)
                $scope.avatar = "assets/images/profiles/patient-male.png";
            else if ($scope.admin)
                $scope.avatar = "assets/images/profiles/admin.png";
            $scope.refreshProfile();

        }]);   