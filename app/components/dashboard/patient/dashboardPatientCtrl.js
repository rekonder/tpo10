angular.module('app.components.dashboard.patient', []).
controller('dashboardPatientCtrl', 
['$scope', 'accountResource', 'accountService', '$location', '$routeParams', 'patientProfileResources','observationResource',
function($scope, accountResource, accountService, $location, $routeParams, patientProfileResources, observationResource) {

    if(accountService.authorize('Patient', null));
    else if(accountService.authorize('Doctor', null) && accountService.getCheckDoctorProfile() === true); //for later
    else $location.path('/account');
    $scope.absUrl = $location.absUrl();
    console.log($scope.absUrl);
    console.log($routeParams.patientId);
    $scope.alergy = [];
    $scope.oldObservations = [];
    $scope.diseases = [];
    $scope.diets = [];
    $scope.medications = [];
    $scope.measurements = [];
    
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
    $scope.getAlergy = function() {
        observationResource(). getAlergy({patientId: $routeParams.patientId, number:5}).$promise.then(function(response) {
            $scope.alergy = response;

        }, function(response) {
            $scope.alergy = [];
        });
    };
    $scope.getOldObservations = function() {
        observationResource().getOldObservations({patientId: $routeParams.patientId, number:5}).$promise.then(function(response) {
            $scope.oldObservations = response;

        }, function(response) {
            $scope.oldObservations = [];
        });
    };
    $scope.getDiseases = function() {
        observationResource().getDiseases({patientId: $routeParams.patientId, number:5}).$promise.then(function(response) {
            $scope.diseases = response;

        }, function(response) {
            $scope.diseases = [];
        });
    };
    $scope.getDiets = function() {
        observationResource().getDiets({patientId: $routeParams.patientId, number:5}).$promise.then(function(response) {
            $scope.diets = response;
            console.log($scope.diets);

        }, function(response) {
            $scope.diets = [];
        });
    };
    $scope.getMedications = function() {
        observationResource().getMedications({patientId: $routeParams.patientId, number:5}).$promise.then(function(response) {

            $scope.medications = response;
        }, function(response) {
            $scope.medications = [];
        });
    };

    $scope.getMeasurements = function() {
        observationResource().getMeasurements({patientId: $routeParams.patientId, number:5}).$promise.then(function(response) {
            console.log("1  " ,   response);
            $scope.measurements = response;
        }, function(response) {
            $scope.measurements = [];
        });
    };
    $scope.refreshProfile();
    $scope.getAlergy();
    $scope.getOldObservations();
    $scope.getDiseases();
    $scope.getDiets();
    $scope.getMedications();
    $scope.getMeasurements();
    
    
    
    
    
    

}]);    