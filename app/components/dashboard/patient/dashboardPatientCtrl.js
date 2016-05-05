angular.module('app.components.dashboard.patient', []).
controller('dashboardPatientCtrl', 
['$scope', 'accountResource', 'accountService', 'patientService', '$location', 'patientProfileResources',
function($scope, accountResource, accountService, patientService, $location, patientProfileResources) {
    $scope.selectedPatientProfile = patientService.getSelectedPatientProfile();
    console.log($scope.selectedPatientProfile);

}]);    