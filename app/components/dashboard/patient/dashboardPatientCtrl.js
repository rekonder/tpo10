angular.module('app.components.dashboard.patient', []).
controller('dashboardPatientCtrl', 
['$scope', 'accountResource', 'accountService', '$location', '$routeParams', 'patientProfileResources',
function($scope, accountResource, accountService, $location, $routeParams, patientProfileResources) {

    if(accountService.authorize('Patient', null));
    else if(accountService.authorize('Doctor', null) && accountService.getCheckDoctorProfile() === true); //for later
    else $location.path('/account');
    $scope.absUrl = $location.absUrl();
    console.log($scope.absUrl);
    console.log($routeParams.patientId);
    
    $scope.refreshProfile = function() {
        patientProfileResources().getPatientProfile({id: $routeParams.patientId}).$promise.then(function(response) {
            console.log(response);
            response.BirthDate = moment(response.BirthDate).toDate().toLocaleDateString();
            $scope.profile = response;
            $scope.avatar = ($scope.profile.Gender == "Moški")? "assets/images/profiles/patient-male.png":"assets/images/profiles/patient-female.png"; 
            console.log($scope.avatar);
            
        }, function(response) {
            console.log(response);
        });
    };
    
    $scope.refreshProfile(); 
    
}]);    