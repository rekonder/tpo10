angular.module('app.components.account.doctor.observation', []).
controller('createObservationCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', 'doctorProfileResources', 'doctorPatientProfileResources', 'observationDoctorResource', 'measurementResources', 'helperResources', '$route',
        function($scope, accountResource, accountService, $location, doctorProfileResources, doctorPatientProfileResources,  observationDoctorResource, measurementResources, helperResources, $route) {
            var account = accountService.getAccount();
            $scope.doctorProfile = {};
            
             $scope.selectedAllergies = [];
             $scope.selectedDiseases = [];
             $scope.selectedDiets = [];
             $scope.selectedMedications = []; 
             $scope.selectedMeasurements = [];
             
             $scope.doctorPatientsOptions = [];
             $scope.allergyOptions = [];
             $scope.dietOptions = [];
             $scope.medicationOptions = [];
             $scope.diseaseOptions = [];
             $scope.measurementOptions = [];
             
             $scope.measurementTimes = [];
             $scope.measurementNotes = [];
             $scope.measurementValues = [];
             $scope.measurementPartIds = [];
             
            // http://dotansimha.github.io/angularjs-dropdown-multiselect/#/
             $scope.multiselectSettingsDiets = { 
                scrollableHeight: '320',
                scrollable: true,
                enableSearch: true,
                idProp: 'DietKey',
                externalIdProp: 'DietKey',
                displayProp: 'DietName'
             };
             $scope.multiselectSettingsAllergies = { 
                  scrollableHeight: '320',
                scrollable: true,
                enableSearch: true,
                idProp: 'AllergyKey',
                externalIdProp: 'AllergyKey',
                displayProp: 'AllergyName'
             };
             $scope.multiselectSettingsMedications = { 
                scrollableHeight: '320',
                scrollable: true,
                enableSearch: true,
                idProp: 'MedicationKey',
                externalIdProp: 'MedicationKey',
                displayProp: 'MedicationName'
             };
             $scope.multiselectSettingsDiseases = {
                scrollableHeight: '320',
                scrollable: true, 
                enableSearch: true,
                idProp: 'DiseaseKey',
                externalIdProp: 'DiseaseKey',
                displayProp: 'DiseaseName'
             };
             
             $scope.getDoctorProfile = function() {
                 doctorProfileResources().getDoctorProfile({id: account.id}).$promise.then(function(response) {
                    // console.log(response);
                    $scope.doctorProfile = response
                 }, function(response) {
                    console.log(response);
                 });
             };

             $scope.allDoctorPatients = function () {
                doctorPatientProfileResources().getAllPatientProfileByDoctor({id: account.id}).$promise.then(function(response) {
                    // console.log(response);
                    
                    $scope.doctorPatientsOptions = response;
                    $scope.selectedPatient = response[0];   
                    if(response.length == 0) {
                        $scope.doctorPatientsOptions = [];
                    }
                }, function(response) {
                    console.log(response);
                    $scope.doctorPatientsOptions = [];
                });
              }
              
              $scope.allPatientObservations = function() {
                observationDoctorResource().getPatientObservations({id: '8f39400f-cc1e-e611-86c0-005056f83588'}).$promise.then(function(response) {
                    // console.log(response);
                
                }, function(response) {
                    console.log(response);
                    
                });
               };
               
              $scope.allDiets = function() {
                observationDoctorResource().getDiets().$promise.then(function(response) {
                    // console.log(response);
                    $scope.dietOptions = response;
                
                }, function(response) {
                    console.log(response);
                    
                });
               };
               
              $scope.allMedications = function() {
                observationDoctorResource().getMedications().$promise.then(function(response) {
                    // console.log(response);
                    $scope.medicationOptions = response;
                
                }, function(response) {
                    console.log(response);
                    
                });
               };
               
               
              $scope.allDiseases = function() {
                observationDoctorResource().getDiseases().$promise.then(function(response) {
                    // console.log(response);
                    $scope.diseaseOptions = response;
                
                }, function(response) {
                    console.log(response);
                    
                });
               };
               
               $scope.allAllergies = function() {
                observationDoctorResource().getAllergies().$promise.then(function(response) {
                    // console.log(response);
                    $scope.allergyOptions = response;
                
                }, function(response) {
                    console.log(response);
                    
                });
               };
               
                              
               $scope.allMeasurements = function() {
                measurementResources().getMeasurements().$promise.then(function(response) {
                    console.log(response);
                    $scope.measurementOptions = response;
                    $scope.selectedMeasurement = $scope.measurementOptions[0];  
                                            
                }, function(response) {
                    console.log(response);
                    
                    
                });
               };
               
               $scope.addNewMeasurement = function() {
                    // console.log($scope.selectedMeasurement);
                    // console.log($scope.selectedMeasurements);
                    
                    if(contains($scope.selectedMeasurements, $scope.selectedMeasurement)) {
                        console.log("Izbrana meritev že obstaja!");
                    } else {
                        $scope.selectedMeasurements.push($scope.selectedMeasurement);
                    }
                    
                    // console.log($scope.measurementTimes);
                    // console.log($scope.measurementNotes);
                    // console.log($scope.measurementValues);
                    // console.log($scope.measurementPartIds);
                    
                    console.log($scope.selectedMeasurements);
               }
               
               
               $scope.getDoctorProfile();
               $scope.allDiets();
               $scope.allMeasurements();
               $scope.allMedications();
               $scope.allDiseases();
               $scope.allAllergies();
               $scope.allDoctorPatients();
               $scope.allPatientObservations();
               $scope.allMeasurements();
               
               
               $scope.submitObservation = function() {
                   var observationMeasurementData = convertToObservationMeasurementsFormat($scope.measurementTimes, $scope.measurementNotes, $scope.measurementValues, $scope.measurementPartIds);
                   console.log(observationMeasurementData);
                    var observationBodyRequest = {
                        ObservationTime : $scope.observationTime,
                        PatientProfileId : $scope.selectedPatient.Id,
                        DoctorProfileId : $scope.doctorProfile.Id,
                        Notes : $scope.observationNotes,
                        Allergies : $scope.selectedAllergies,
                        Diseases :  $scope.selectedDiseases,
                        Diets :  $scope.selectedDiets,
                        Medications : $scope.selectedMedications,
                        ObservationMeasurements: observationMeasurementData
                    };
                    
                    console.log(JSON.stringify(observationBodyRequest));  
                      
                    // Insert observation into db.  
                    observationDoctorResource().postObservation(JSON.stringify(observationBodyRequest)).$promise.then(function(response) {
                        console.log(response);
                        $.notify({message: 'Uspešno dodan pregled'}, {type: 'success'});
                        $location.path('/account/doctor/observation/overview');
                        
                    }, function(response) {
                        console.log(response);
                    });
                    
               }
               

        }]);
        
        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }
        
        function convertToObservationMeasurementsFormat(measurementTimes, measurementNotes, measurementValues, measurementPartIds) {
            if(measurementTimes.length != measurementNotes.length || measurementTimes.length != measurementValues.length || measurementTimes.length != measurementPartIds.length)
                return "Fault! Tables measurementTimes, measurementNotes, measurementValues must have equal dimensitions!"; 
            
            var response = [];
            for(var i = 0; i < measurementTimes.length; i++) {
                var observationMeasurement = {
                    Value: measurementValues[i],
                    MeasurementTime: measurementTimes[i],
                    Note: measurementNotes[i],
                    MeasurementPartId: measurementPartIds[i]   
                };
                response.push(observationMeasurement);
            }   
            return response;   
        }