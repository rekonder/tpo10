angular.module('app.components.dashboard.patient.measurements', []).
controller('insertPatientProfileMeasurementCtrl', 
 ['$scope', 'accountResource', 'measurementResources', '$route', '$routeParams', 'patientProfileMeasurementResource', 
        function($scope, accountResource, measurementResources, $route, $routeParams, patientProfileMeasurementResource) {
                
             $scope.selectedMeasurements = [];
             $scope.measurementOptions = [];
             
             $scope.measurementTimes = [];
             $scope.measurementNotes = [];
             $scope.measurementValues = [];
             $scope.measurementPartIds = [];
             
                            
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
                    
                    console.log($scope.selectedMeasurements);
               }
               
              
               $scope.allMeasurements();
               
               $scope.submitMeasurements= function() {
                   var measurementsData = convertToPatientProfileMeasurementsFormat($scope.measurementTimes, $scope.measurementNotes, $scope.measurementValues, $scope.measurementPartIds, $routeParams.patientId);
                   console.log(measurementsData);
                    

                    // Insert measurements into db.                      
                    measurementsData.forEach(function(measurement) {
                        // console.log(JSON.stringify(element));
                        patientProfileMeasurementResource().postMeasurement(JSON.stringify(measurement)).$promise.then(function(response) {
                            console.log(response);
                            $.notify({message: 'Uspešno dodana meritev'}, {type: 'success'});
                            $route.reload();
                            
                        }, function(response) {
                            console.log(response);
                        });
                        
                        
                    }, this);
                    
                                            
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
        
        function convertToPatientProfileMeasurementsFormat(measurementTimes, measurementNotes, measurementValues, measurementPartIds, patientId) {
            if(measurementTimes.length != measurementNotes.length || measurementTimes.length != measurementValues.length || measurementTimes.length != measurementPartIds.length)
                return "Fault! Tables measurementTimes, measurementNotes, measurementValues must have equal dimensitions!"; 
            
            var response = [];
            for(var i = 0; i < measurementTimes.length; i++) {
                var observationMeasurement = {
                    Value: measurementValues[i],
                    MeasurementTime: measurementTimes[i],
                    Note: measurementNotes[i],
                    MeasurementPartId: measurementPartIds[i],
                    PatientProfileId: patientId   
                };
                response.push(observationMeasurement);
            }   
            return response;   
        }