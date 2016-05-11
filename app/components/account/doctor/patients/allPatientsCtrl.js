angular.module('app.components.account.doctor.patient', []).
controller('doctorPatientCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', 'patientProfileResources','doctorPatientProfileResources',
        function($scope, accountResource, accountService, $location, patientProfileResources, doctorPatientProfileResources) {
            var account = accountService.getAccount();

            if(accountService.authorize('Doctor', null) && accountService.getCheckDoctorProfile() === true);
            else $location.path('/account');


            $scope.refreshProfiles = function() {
                
                doctorPatientProfileResources().getAllPatientProfileByDoctor({id: account.id}).$promise.then(function(response) {
                    console.log(response);
                    for(var i = 0; i < response.length; i++) {
                        response[i].BirthDate = moment(response[i].BirthDate).toDate().toLocaleDateString();
                    }
                    $scope.profiles = response;
                    if(response.length == 0) {
                        $scope.profiles = [];
                    }
                }, function(response) {
                    console.log(response);
                    $scope.profiles = [];
                });
            };

            $scope.refreshProfiles();

        }]);