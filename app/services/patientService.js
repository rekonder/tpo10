angular.module('app.services.patient', []).
service('patientService', ['$location', function($location) {
    
    this.setSelectedPatientProfile = function(patientProfile) {
        localStorage.setItem('tpo10_selectedPatientProfile', JSON.stringify(patientProfile));
    };
    
    this.getSelectedPatientProfile = function() {
        return JSON.parse(localStorage.getItem('tpo10_selectedPatientProfile'));
    };
    
    this.removeSelectedPatientProfile = function() {
        localStorage.removeItem('tpo10_selectedPatientProfile');
        $location.path('/dashboard/patient');
    };
    
}]);