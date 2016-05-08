angular.module('app.components.dashboard.patient', []).
controller('dashboardPatientCtrl', 
['$scope', 'accountResource', 'accountService', '$location', '$routeParams', 'patientProfileResources',
function($scope, accountResource, accountService, $location, $routeParams, patientProfileResources) {
    
    $scope.absUrl = $location.absUrl();
    console.log($scope.absUrl);
    console.log($routeParams.patientId);
    
    $scope.refreshProfile = function() {
        patientProfileResources().getPatientProfile({patientId: $routeParams.patientId}).$promise.then(function(response) {
            console.log(response);
            response.BirthDate = moment(response.BirthDate).toDate().toLocaleDateString();
            $scope.profile = response;
            
        }, function(response) {
            console.log(response);
        });
    };
    
    $scope.refreshProfile();

}]);    