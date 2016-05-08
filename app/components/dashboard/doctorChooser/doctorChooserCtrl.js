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
            //console.log(selectedPatientProfile);

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
            $scope.chooseDoctors = function () {
                console.log('test');
                $scope.formData.Id = selectedPatientProfileId;

                console.log($scope.formData);

                if($scope.formData) {
                    doctorChooserResources().putChosenDoctors({id: $scope.formData.Id}, $scope.formData).$promise.then(function(response) {
                        console.log(response)
                        $.notify({message: 'Izbrani zdravniki so bili shranjeni.'}, {type: 'success'});
                    }, function(response) {
                        console.log(response);
                        $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                    });
                }


            };

        }]);






