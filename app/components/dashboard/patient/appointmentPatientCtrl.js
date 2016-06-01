angular.module('app.components.dashboard.patient.appointment', []).
controller('appointmentPatientCtrl', 
['$scope', '$compile', '$timeout', 'accountResource', 'accountService', '$location', '$routeParams','uiCalendarConfig', 'appointmentResources', 'ngDialog',
function($scope, $compile, $timeout, accountResource, accountService, $location, $routeParams, uiCalendarConfig, appointmentResources, ngDialog) {
    /* Change View */
    $scope.events = [];
    $scope.changeView = function(view,calendar) {
        uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
    };
    /* Render Tooltip */
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
            'tooltip-append-to-body': true});
        $compile(element)($scope);
    };


    $scope.globalEvent = [];
    $scope.eventClicked = function (event, element, view) {
        $scope.reserved = false;
        $scope.myReserved = false;
        if(event.IsAvailable)
            $scope.reserved = true;
        else if(event.pacient != null && event.pacient.Id == $routeParams.patientId)
            $scope.myReserved = true;
        $scope.globalEvent = event;
        console.log($scope.globalEvent);

        ngDialog.open({
            template: 'app/shared/ngDialogTemplates/appointmentReservation.html',
            className: 'ngdialog-theme-default',
            scope: $scope
        });
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
            lang:'sl',
            allDaySlot: false,
            slotDuration:'00:15:00',
            snapDuration: '00:30.00',
            eventRender: $scope.eventRender,
            eventClick: $scope.eventClicked
        }
    };
    /* event sources array*/
    $scope.eventSources = [$scope.events];

    $scope.saveAppointment = function () {
       // console.log($scope.globalEvent.start._i);
        var data = {
            StartDateTime: $scope.globalEvent.start._i,
            EndDateTime: $scope.globalEvent.end._i,
            IsAvailable: false,
            Notes: "Hojla",
            PatientProfileId: $routeParams.patientId,
            DoctorProfileId: "c3e71736-7327-e611-beb3-6817292e1d3b",
            delete:false
        };
        // console.log(JSON.stringify(data));
        appointmentResources().putAppointment({id: $scope.globalEvent.my_id}, JSON.stringify(data)).$promise.then(function(response) {
            $scope.testResourceMethods();

        }, function(response) {
            console.log(response);

        });
        ngDialog.close();
    };

    $scope.deleteAppointment = function () {
        console.log("Delete");
        var data = {
            StartDateTime: $scope.globalEvent.start._i,
            EndDateTime: $scope.globalEvent.end._i,
            IsAvailable: true,
            Notes: "Hojla",
            DoctorProfileId: "c3e71736-7327-e611-beb3-6817292e1d3b",
            delete:true
        };
        // console.log(JSON.stringify(data));
        appointmentResources().putAppointment({id: $scope.globalEvent.my_id}, JSON.stringify(data)).$promise.then(function(response) {
            $scope.testResourceMethods();

        }, function(response) {
            console.log(response);

        });
        ngDialog.close();
    };

    $scope.testResourceMethods = function() {
        var doctorId = "c3e71736-7327-e611-beb3-6817292e1d3b";
        var patientId = $routeParams.patientId;
        // GET Appointments
        appointmentResources().getAvailableAppointmentsForGivenDoctor({id: doctorId}).$promise.then(function(response) {
            $scope.events.length = 0;
            console.log(response);
            angular.forEach(response, function(item){
                if(item.IsAvailable){
                    var color = 'blue';
                }
                else
                    var color = 'gray';
                $scope.events.push({ color: color, title: item.Notes, start:item.StartDateTime, end:item.EndDateTime,allDay: false, my_id:item.Id, isFinished:item.IsAvailable,
                                    pacient: item.PatientProfile})
            });
        }, function(response) {
            console.log(response);
        });
        
       /* // GET Appointment
        appointmentResources().getAppointment({id: appointmentId}).$promise.then(function(response) {
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

        });*/
    };
    $scope.testResourceMethods();
    
}]);    