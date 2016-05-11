angular.module('app.components.dashboard.doctorChooser', []).
controller('doctorChooserCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', '$route', '$routeParams',
        'doctorProfileResources', 'patientProfileResources', 'helperResources', 'doctorChooserResources',
        function($scope, accountResource, accountService, $location, $route, $routeParams,
                 doctorProfileResources, patientProfileResources, helperResources, doctorChooserResources) {

            // all doctors
            if(accountService.authorize('Patient', null));
            // else if(accountService.authorize('Doctor', null) && accountService.getCheckDoctorProfile() === true); //for later
            else $location.path('/account');
            doctorProfileResources().getDoctorProfiles().$promise.then(

                function(response) { // OK
                    $scope.doctors = response;
                    console.log($scope.doctors);
                    //console.log(selectedPatientProfile);

                    // get latest selected profile data and set selected option to right doctor
                    var selectedPatientProfileId = $routeParams.patientId;
                    console.log(selectedPatientProfileId);
                    $scope.fillData = function () {
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
                    };
                    $scope.fillData();
                    // data from form sent to backend
                    $scope.chooseDoctors = function () {
                        //console.log('test');
                        $scope.Id = selectedPatientProfileId;

                        var formData = {};
                        if($scope.personalDoctorSelectedOption)
                            formData.PersonalDoctor = $scope.personalDoctorSelectedOption.id;
                        if($scope.dentistDoctorSelectedOption)
                            formData.DentistDoctor = $scope.dentistDoctorSelectedOption.id;
                        //console.log(formData);

                        doctorChooserResources().putChosenDoctors({id: $scope.Id}, formData).$promise.then(function(response) {
                            console.log(response);
                            $.notify({message: 'Izbrani zdravniki so bili shranjeni.'}, {type: 'success'});
                            $location.path('dashboard/patient/'+selectedPatientProfileId);

                        }, function(response) {
                            console.log(response);
                            $scope.fillData();
                            $.notify({message: 'En od izbranih zdravnikov več ne sprejema pacientov'}, {type: 'danger'});
                        });

                        //$route.reload();
                        //$location.path('dashboard/patient/'+selectedPatientProfileId);

                    };
                },
                function(response) { // ERR
                    console.log(response);
                }
            );
        }]);
