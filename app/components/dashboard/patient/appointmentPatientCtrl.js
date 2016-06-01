angular.module('app.components.dashboard.patient.appointment', []).
controller('appointmentPatientCtrl', 
['$scope', '$compile', '$timeout', 'accountResource', 'accountService', '$location', '$routeParams','uiCalendarConfig', 'doctorProfileResources', 'patientProfileResources',
function($scope, $compile, $timeout, accountResource, accountService, $location, $routeParams, uiCalendarConfig, doctorProfileResources, patientProfileResources) {
    // Naroči se na pregled
    $scope.profile = {}
    $scope.selectedDoctor = {} 
       
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */
    $scope.events = [
        {title: 'All Day Event',start: new Date(y, m, 1)},
        {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
        {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
        {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
        {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: '#/account'}
    ];
    /* Change View */
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        $compile(element)($scope);
    };
    /* config object */
    $scope.uiConfig = {
        calendar:{
            height: 450,
            editable: false,
            header:{
                left: 'title',
                center: '',
                right: 'today prev,next'
            },
            eventRender: $scope.eventRender
        }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events];


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
    
    $scope.refreshProfile = function() {
        patientProfileResources().getPatientProfile({id: $routeParams.patientId}).$promise.then(function(response) {
            console.log(response);
            $scope.profile = response;
            $scope.getDoctorProfiles();
            
        }, function(response) {
            console.log(response);
        });
    }
    
    $scope.getDoctorProfiles = function() {
        doctorProfileResources().getDoctorProfiles().$promise.then(function(response) {
            console.log(response);
            $scope.doctorOptions = response;
            
            var selectedIndex = getPatientPersonalDoctor($scope.doctorOptions, $scope.profile.PersonalDoctor);
            // console.log(selectedIndex);
            $scope.selectedDoctor = $scope.doctorOptions[selectedIndex]; 
 

        }, function(response) {
            console.log(response);

        });
    }
    
    $scope.refreshProfile();
    // $scope.testResourceMethods();
    
}]);    

function getPatientPersonalDoctor(doctorOptions, personalDoctor) {
    for(var i = 0; i < doctorOptions.length; i++) 
    {
        if(doctorOptions[i].DoctorKey == personalDoctor.DoctorKey) {
            return i;
        }
    }
    return -1;
}