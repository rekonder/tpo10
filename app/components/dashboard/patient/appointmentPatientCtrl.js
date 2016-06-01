angular.module('app.components.dashboard.patient.appointment', []).
controller('appointmentPatientCtrl', 
['$scope', 'accountResource', 'accountService', '$location', '$routeParams', 'appointmentResources',
function($scope, accountResource, accountService, $location, $routeParams, appointmentResources) {
    // Naroči se na pregled
    $scope.test = "Dela";
    $scope.testResourceMethods = function() {
        var doctorId = "19b4da69-1028-e611-86c0-005056f83588";
        var patientId = $routeParams.patientId;
        var appointmentId = "22b4da69-1028-e611-86c0-005056f83588";
             
        // GET Appointments
        appointmentResources().getAvailableAppointmentsForGivenDoctor({id: doctorId}).$promise.then(function(response) {
            console.log(response);

        }, function(response) {
            console.log(response);
        });
        
        // GET Appointment
        appointmentResources().getAppointment({id: appointmentId}).$promise.then(function(response) {
            console.log(response);

        }, function(response) {
            console.log(response);
        });
               
        
        // PUT (update appointment) 
         var data = {
            StartDateTime: "2016-06-01T18:06:01.1811759+02:00",
            EndDateTime: "2016-06-01T18:07:02.1811759+02:00",
            IsAvailable: true,
            Notes: "Hahahahha",
            PatientProfileId: "50ef9318-658f-4fd0-b5a0-381b1ff668c3",
            DoctorProfileId: "19b4da69-1028-e611-86c0-005056f83588"
        };
        
        appointmentResources().putAppointment({id: appointmentId}, JSON.stringify(data)).$promise.then(function(response) {
            console.log(response);

        }, function(response) {
            console.log(response);
        });
        
         // DELETE Appointment 
        appointmentResources().deleteAppointment({id: appointmentId}).$promise.then(function(response) {
            console.log(response);

        }, function(response) {
            console.log(response);
        });
        
        
         // POST 
        var data = {
            StartDateTime: "2016-06-01T18:06:01.1811759+02:00",
            EndDateTime: "2016-06-01T18:07:02.1811759+02:00",
            IsAvailable: false,
            Notes: "Hojla",
            // PatientProfileId: "50ef9318-658f-4fd0-b5a0-381b1ff668c3",
            DoctorProfileId: "19b4da69-1028-e611-86c0-005056f83588"
        };
         
        // console.log(JSON.stringify(data));
        appointmentResources().postAppointment(JSON.stringify(data)).$promise.then(function(response) {
            console.log(response);

        }, function(response) {
            console.log(response);

        });
    }
    
    
    $scope.testResourceMethods();
    
}]);    