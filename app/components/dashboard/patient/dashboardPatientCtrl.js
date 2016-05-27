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
    $scope.getAlergy = function(number) {
        observationResource(). getAlergy({patientId: $routeParams.patientId, number:number}).$promise.then(function(response) {
            $scope.alergy = response;
            if(number != -1)
                $scope.alergy.opened = false;
            else
                $scope.alergy.opened = true;

        }, function(response) {
            $scope.alergy = [];
            if(number != -1)
                $scope.alergy.opened = false;
            else
                $scope.alergy.opened = true;
        });
    };
    $scope.getOldObservations = function(number) {
        observationResource().getOldObservations({patientId: $routeParams.patientId, number:number}).$promise.then(function(response) {
            $scope.oldObservations = response;
            if(number != -1)
                $scope.oldObservations.opened = false;
            else
                $scope.oldObservations.opened = true;

        }, function(response) {
            $scope.oldObservations = [];
            if(number != -1)
                $scope.oldObservations.opened = false;
            else
                $scope.oldObservations.opened = true;
        });
    };
    $scope.getDiseases = function(number) {
        observationResource().getDiseases({patientId: $routeParams.patientId, number:number}).$promise.then(function(response) {
            $scope.diseases = response;
            if(number != -1)
                $scope.diseases.opened = false;
            else
                $scope.diseases.opened = true;

        }, function(response) {
            $scope.diseases = [];
            if(number != -1)
                $scope.diseases.opened = false;
            else
                $scope.diseases.opened = true;
        });
    };
    $scope.getDiets = function(number) {
        observationResource().getDiets({patientId: $routeParams.patientId, number:number}).$promise.then(function(response) {
            $scope.diets = response;
            console.log($scope.diets);
            if(number != -1)
                $scope.diets.opened = false;
            else
                $scope.diets.opened = true;

        }, function(response) {
            $scope.diets = [];
            if(number != -1)
                $scope.diets.opened = false;
            else
                $scope.diets.opened = true;
        });
    };
    $scope.getMedications = function(number) {
        observationResource().getMedications({patientId: $routeParams.patientId, number:number}).$promise.then(function(response) {

            $scope.medications = response;
            if(number != -1)
                $scope.medications.opened = false;
            else
                $scope.medications.opened = true;
        }, function(response) {
            $scope.medications = [];
            if(number != -1)
                $scope.medications.opened = false;
            else
                $scope.medications.opened = true;
        });
    };

    $scope.getMeasurements = function(number) {
        observationResource().getMeasurements({patientId: $routeParams.patientId, number:number}).$promise.then(function(response) {
            console.log("1  " ,   response);
            $scope.measurements = response;
            if(number != -1)
                $scope.measurements.opened = false;
            else
                $scope.measurements.opened = true;
        }, function(response) {
            $scope.measurements = [];
            if(number != -1)
                $scope.measurements.opened = false;
            else
                $scope.measurements.opened = true;
        });
    };
    $scope.refreshProfile();
    $scope.getAlergy(5);
    $scope.getOldObservations(5);
    $scope.getDiseases(5);
    $scope.getDiets(5);
    $scope.getMedications(5);
    $scope.getMeasurements(5);

    $scope.openOldObservations = function () {
        $scope.getOldObservations(-1);
    }
    $scope.closeOldObservations = function () {
        $scope.getOldObservations(5);
    }
    
    $scope.openAlergy = function () {
        $scope.getAlergy(-1);
    }
    $scope.closeAlergy = function () {
        $scope.getAlergy(5);
    }

    $scope.openDiseases = function () {
        $scope.getDiseases(-1);
    }
    $scope.closeDiseases = function () {
        $scope.getDiseases(5);
    }

    $scope.openDiets = function () {
        $scope.getDiets(-1);
    }
    $scope.closeDiets = function () {
        $scope.getDiets(5);
    }

    $scope.openMedications = function () {
        $scope.getMedications(-1);
    }
    $scope.closeMedications = function () {
        $scope.getMedications(5);
    }

    $scope.openMeasurements = function () {
        $scope.getMeasurements(-1);
    }
    $scope.closeMeasurements = function () {
        $scope.getMeasurements(5);
    }
}]);    