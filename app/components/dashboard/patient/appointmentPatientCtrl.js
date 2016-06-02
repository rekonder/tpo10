angular.module('app.components.dashboard.patient.appointment', []).
controller('appointmentPatientCtrl',
['$scope', '$compile', '$timeout', 'accountResource', 'accountService', '$location', '$routeParams','uiCalendarConfig', 'appointmentResources',
    'ngDialog','doctorProfileResources', 'patientProfileResources',
function($scope, $compile, $timeout, accountResource, accountService, $location, $routeParams, uiCalendarConfig, appointmentResources,
         ngDialog , doctorProfileResources, patientProfileResources) {
             
    // Za zdravnika
    var account = accountService.getAccount();
    $scope.doctorProfile = {};
    
    // Naroči se na pregled
    $scope.profile = {};
    $scope.selectedDoctor = {} ;
    $scope.isDoctor = accountService.authorize('Doctor', null);
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

    $scope.eventsF = function (start, end, timezone, callback) {
        var doctorId = $scope.selectedDoctor.Id;
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
        callback($scope.events);
    };
    $scope.globalEvent = [];
    $scope.eventClicked = function (event, element, view) {
        $scope.reserved = false;
        $scope.myReserved = false;
        console.log(event)
       if(!event.IsAvailable && event.pacient != null && event.pacient.Id == $routeParams.patientId)
            $scope.myReserved = true;
        else if(!event.IsAvailable)
           $scope.reserved = true;
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
    $scope.eventSources = [$scope.events,$scope.eventsF];
    
    $scope.saveAppointment = function () {
       var doctorId = $scope.selectedDoctor.Id;
       var subsId = $routeParams.patientId;
       if($scope.isDoctor) {
           subsId = $scope.doctorProfile.Id;
           console.log("Raa:", subsId);
       }
       // console.log("DoctorId: " + doctorId);
       // console.log($scope.globalEvent.start._i);
     
        var data2 = {
            PatientProfileId: $routeParams.patientId,
            DoctorProfileId: doctorId,
            Subscribe: true,
            SubscriberId: subsId
        }
        // console.log(JSON.stringify(data2));
        appointmentResources().putAppointmentSubscription({id: $scope.globalEvent.my_id}, JSON.stringify(data2)).$promise.then(function(response) {
            console.log(response);
            $scope.getAppointmentsForSelectedDoctor();
            $.notify({message: 'Uspešno ste rezervirali termin pregleda.'}, {type: 'success'});

        }, function(response) {
            $.notify({message: response.data}, {type: 'danger'});
            console.log(response);

        });
        ngDialog.close();
    };

    $scope.deleteAppointment = function () {
        var doctorId = $scope.selectedDoctor.Id;
        var subsId = $routeParams.patientId;
        if($scope.isDoctor) {
            subsId = $scope.doctorProfile.Id;
            console.log("Raa:", subsId);
        }
        // console.log("Unsubscribe");
        var data2 = {
            PatientProfileId: $routeParams.patientId,
            DoctorProfileId: doctorId,
            Subscribe: false,
            SubscriberId: subsId
        }
        
        // console.log(JSON.stringify(data2));
        appointmentResources().putAppointmentSubscription({id: $scope.globalEvent.my_id}, JSON.stringify(data2)).$promise.then(function(response) {
            $scope.getAppointmentsForSelectedDoctor();
            $.notify({message: 'Uspešno ste preklicali rezervacijo termina.'}, {type: 'success'});

        }, function(response) {
            $.notify({message: response.data}, {type: 'danger'});
            console.log(response);

        });
        ngDialog.close();
    };

    $scope.getAppointmentsForSelectedDoctor = function() {
        if(typeof $scope.selectedDoctor === 'undefined') 
        {
            return;
        }
        console.log($scope.selectedDoctor);
        var doctorId = $scope.selectedDoctor.Id;
        console.log(doctorId);
        var patientId = $routeParams.patientId;
        // GET Appointments
        appointmentResources().getAvailableAppointmentsForGivenDoctor({id: doctorId}).$promise.then(function(response) {
            $scope.events.length = 0;
            console.log(response);
            angular.forEach(response, function(item){
                if(item.IsAvailable){
                    var color = 'blue';
                    var title = "Nezaseden";
                }
                else {
                    var color = 'gray';
                    if(item.PatientProfile.Id == $routeParams.patientId){
                        var title = "Jaz";
                    }
                    else
                        var title = "Zasedeno";
                }
                $scope.events.push({ color: color, title: title, start:item.StartDateTime, end:item.EndDateTime,allDay: false, my_id:item.Id, IsAvailable:item.IsAvailable,
                                    pacient: item.PatientProfile})
            });
        }, function(response) {
            console.log(response);
        });
      
    };

    
    $scope.refreshProfile = function() {
        patientProfileResources().getPatientProfile({id: $routeParams.patientId}).$promise.then(function(response) {
            console.log(response);
            $scope.profile = response;
            $scope.getDoctorProfiles();
            
        }, function(response) {
            console.log(response);
        });
        
        if($scope.isDoctor) {
            doctorProfileResources().getDoctorProfile({id: account.id}).$promise.then(function(response) {
                console.log("daada:" ,response);
                $scope.doctorProfile = response;
                
            }, function(response) {
                console.log(response);
            });
        }
    };
    
    $scope.getDoctorProfiles = function() {
        doctorProfileResources().getDoctorProfiles().$promise.then(function(response) {
            console.log(response);
            $scope.doctorOptions = response;
            
            var selectedIndex = getPatientPersonalDoctor($scope.doctorOptions, $scope.profile.PersonalDoctor);
            // console.log(selectedIndex);
            $scope.selectedDoctor = $scope.doctorOptions[selectedIndex];
            $scope.getAppointmentsForSelectedDoctor();
 

        }, function(response) {
            console.log(response);

        });
    };
    
    $scope.$watch('selectedDoctor', function(newValue) {
        if(newValue) {
            $scope.getAppointmentsForSelectedDoctor();
        }
    });
    $scope.refreshProfile();
    
}]);    

function getPatientPersonalDoctor(doctorOptions, personalDoctor) {
    if(personalDoctor == null) 
    {
        return -1;  
    }
    
    for(var i = 0; i < doctorOptions.length; i++) 
    {
        if(doctorOptions[i].DoctorKey == personalDoctor.DoctorKey) {
            return i;
        }
    }
    return -1;
}