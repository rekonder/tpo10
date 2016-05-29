angular.module('app.components.account.doctor.observation.overview', []).
controller('observationOverviewCtrl', 
    ['accountService', '$scope', '$location', 'doctorProfileResources', 'observationDoctorResource', '$route', 'ngDialog',
    function(accountService, $scope, $location, doctorProfileResources, observationDoctorResource, $route, ngDialog) {
         var account = accountService.getAccount();
         console.log(account);
         $scope.doctorProfile = {};
         $scope.observations = {};
         $scope.selectedObservation = {};
             
         $scope.getDoctorProfile = function() {
                 doctorProfileResources().getDoctorProfile({id: account.id}).$promise.then(function(response) {
                    // console.log(response);
                    $scope.doctorProfile = response;
                    $scope.getDoctorObservations();  // when receive response (you have Id for )
                                 
                 }, function(response) {
                    console.log(response);
                 });
        };
                 
         $scope.getDoctorObservations = function() {
            observationDoctorResource().getDoctorObservations({id: $scope.doctorProfile.Id}).$promise.then(function(response) {
                console.log(response);
                $scope.observations.Data = response;
                                        
            }, function(response) {
                console.log(response);
            }); 
         };
          
          
         $scope.observations.isExpanded = false;
         $scope.observations.limit = 5;
         $scope.toggleObservationList = function() {
            $scope.observations.isExpanded = !$scope.observations.isExpanded;
            console.log($scope.observations.isExpanded);
            
            // If limit is undefined, the input will be returned unchanged.
            // http://stackoverflow.com/questions/31071361/angularjs-set-limitto-to-unlimited-in-ng-repeat
            $scope.observations.limit = ($scope.observations.isExpanded)? undefined : 5;  
            // console.log($scope.observations.limit);          
            
         };
            
         $scope.getDoctorProfile();
         
         $scope.showMeasurementDetails = function (observation) {
             $scope.selectedObservation = observation; 
            //  console.log(observation);
            ngDialog.open({ 
                template: 'app/shared/ngDialogTemplates/observationTemplate.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
            });
         }
        
    }]);
       