angular.module('app.components.dashboard.patient.appointment', []).
controller('appointmentPatientCtrl', 
['$scope', 'accountResource', 'accountService', '$location', '$routeParams',
function($scope, accountResource, accountService, $location, $routeParams) {
    // Naroči se na pregled
    $scope.test = "Dela";
    
}]);    