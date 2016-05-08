angular.module('app.components.dashboard.doctorChooser', []).
controller('doctorChooserCtrl',
    ['$scope', 'accountResource', 'accountService', 'patientService', '$location',
        'doctorProfileResources', 'patientProfileResources', 'helperResources', 'doctorChooserResources',
        function($scope, accountResource, accountService, patientService, $location,
                 doctorProfileResources, patientProfileResources, helperResources, doctorChooserResources) {

            // all doctors
            $scope.doctors = doctorProfileResources().getDoctorProfiles();
            console.log($scope.doctors);

            // selected profile
            var selectedPatientProfile = patientService.getSelectedPatientProfile();
            console.log(selectedPatientProfile);

            var selectedPatientProfileId = selectedPatientProfile.Id;
            doctorChooserResources().getChosenDoctors({id: selectedPatientProfileId}).$promise.then(
                function(response) { // OK
                    console.log(response);
                    $scope.selectedPatientProfileFromBackend = response;
                },
                function(response) { // ERR
                    console.log(response);
                }
            );

            // daza from form sent to backend
            $scope.chooseDoctor = function () {
                console.log($scope.formData.PersonalDoctor);
                console.log($scope.formData.DentistDoctor);
            }

        }]);






