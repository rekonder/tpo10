angular.module('app.components.account.doctor.observation', []).
controller('createObservationCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', 'doctorProfileResources', 'helperResources', '$route',
        function($scope, accountResource, accountService, $location, doctorProfileResources, helperResources, $route) {
             $scope.selectedAllergies = [];
             $scope.selectedDiseases = [];
             $scope.selectedDiets = [];
             $scope.selectedMedications = []; 
             
            //  $scope.allergyOptions = [ {id: 1, name: "David"}, {id: 2, name: "Jhon"}, {id: 3, label: "Danny"}];
            //  $scope.dietOptions = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];
            //  $scope.medicationOptions = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];
            //  $scope.diseaseOptions = [ {id: 1, label: "David"}, {id: 2, label: "Jhon"}, {id: 3, label: "Danny"}];

             $scope.allergyOptions = [ {name: "ZdraviloZdraviloZdraviloZdravilo A", id: 1 },{name: "Zdravilo B", id: 2 },{name: "Zdravilo B", id: 3 } ];
             $scope.dietOptions = [ {name: "Zdravilo A", id: 1 },{name: "Zdravilo B", id: 2 },{name: "Zdravilo B", id: 3 } ]
             $scope.medicationOptions = [ {name: "Zdravilo A", id: 1 },{name: "Zdravilo B", id: 2 },{name: "Zdravilo B", id: 3 } ]
             $scope.diseaseOptions = [ {name: "Zdravilo A", id: 1 },{name: "Zdravilo B", id: 2 },{name: "Zdravilo B", id: 3 } ]
             
             
             $scope.multiselectSettings = { 
                smartButtonMaxItems: 3,
                enableSearch: true,
                displayProp: 'name',
                idProp: 'id'
             };
        }]);