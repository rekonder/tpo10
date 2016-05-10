angular.module('app.components.dashboard.doctorChooser', []).
controller('doctorChooserCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', '$route', '$routeParams',
        'doctorProfileResources', 'patientProfileResources', 'helperResources', 'doctorChooserResources',
        function($scope, accountResource, accountService, $location, $route, $routeParams,
                 doctorProfileResources, patientProfileResources, helperResources, doctorChooserResources) {

            // all doctors
            doctorProfileResources().getDoctorProfiles().$promise.then(

                function(response) { // OK
                    $scope.doctors = response;
                    console.log($scope.doctors);
                    //console.log(selectedPatientProfile);

                    // get latest selected profile data and set selected option to right doctor
                    var selectedPatientProfileId = $routeParams.patientId;
                    console.log(selectedPatientProfileId);

                    doctorChooserResources().getChosenDoctors({id: selectedPatientProfileId}).$promise.then(
                        function(response) { // OK
                            console.log(response);
                            $scope.selectedPatientProfileFromBackend = response;

                            var personalDoc = $scope.selectedPatientProfileFromBackend.PersonalDoctor;
                            //console.log(personalDoc);

                            var dentistDoc = $scope.selectedPatientProfileFromBackend.DentistDoctor;
                            //console.log(dentistDoc);

                            $scope.personalDoctors = [];
                            $scope.dentistDoctors = [];

                            $scope.personalDoctorOptions = [];
                            $scope.dentistDoctorOptions = [];

                            angular.forEach($scope.doctors, function (item) {
                                if(angular.equals(item.DocOrDentist, 0)){
                                    $scope.personalDoctors.push(item);
                                    var isReadOnly = true;
                                    if((item.PatientNumber - item.CurrentPatientNumber) <= 0) {
                                        isReadOnly = false;
                                    }


                                    $scope.personalDoctorOptions.push({
                                        name: '[' + item.DoctorKey + '] ' + item.FirstName + " " + item.LastName + ', prosta mesta: ' + (item.PatientNumber - item.CurrentPatientNumber),
                                        id: item.Id,
                                        isReadOnly: isReadOnly
                                    });

                                    if(personalDoc != null && angular.equals(item.Id, personalDoc.Id)){
                                        $scope.personalDoctorSelectedOption = $scope.personalDoctorOptions[$scope.personalDoctorOptions.length-1];
                                    }


                                }
                                else{
                                    $scope.dentistDoctors.push(item);
                                    $scope.dentistDoctorOptions.push({
                                        name: '[' + item.DoctorKey + '] ' + item.FirstName + " " + item.LastName + ', prosta mesta: ' + (item.PatientNumber - item.CurrentPatientNumber),
                                        id: item.Id
                                    });

                                    if(dentistDoc != null && angular.equals(item.Id, dentistDoc.Id)){
                                        $scope.dentistDoctorSelectedOption = $scope.dentistDoctorOptions[$scope.dentistDoctorOptions.length-1];
                                    }

                                }
                            });
                            // console.log($scope.personalDoctors);
                            // console.log($scope.dentistDoctors);

                            $scope.add_extra_field = function(){
                                $scope.ui_fields.push({
                                    name: "",
                                    type: "",
                                    isreadonly: false
                                });
                            }


                        },
                        function(response) { // ERR
                            console.log(response);
                        }
                    );

                    var refreshProfile = function() {
                        patientProfileResources().getPatientProfile({id: $routeParams.patientId}).$promise.then(function(response) {
                            console.log(response);
                            response.BirthDate = moment(response.BirthDate).toDate().toLocaleDateString();
                            $scope.profile = response;
                            $location.path('dashboard/patient/'+selectedPatientProfileId);
                            //$route.reload();
                        }, function(response) {
                            console.log(response);
                        });
                    };

                    // data from form sent to backend
                    $scope.chooseDoctors = function () {
                        //console.log('test');
                        $scope.Id = selectedPatientProfileId;

                        var formData = {
                            'Id': selectedPatientProfileId,
                            'PersonalDoctor': $scope.personalDoctorSelectedOption.id,
                            'DentistDoctor': $scope.dentistDoctorSelectedOption.id
                        };
                        //console.log(formData);

                        doctorChooserResources().putChosenDoctors({id: formData.Id}, formData).$promise.then(function(response) {
                            console.log(response);
                            $.notify({message: 'Izbrani zdravniki so bili shranjeni.'}, {type: 'success'});

                        }, function(response) {
                            console.log(response);
                            $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                        });

                        //$route.reload();
                        refreshProfile();
                        //$location.path('dashboard/patient/'+selectedPatientProfileId);

                    };
                },
                function(response) { // ERR
                    console.log(response);
                }
            );
        }]);
