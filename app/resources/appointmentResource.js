angular.module('app.resources.appointment', []).
factory('appointmentResources', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/Appointment/:id', { id: '@_id' }, {
               // TODO: add methods
                getAvailableAppointmentsForGivenDoctor: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Appointment/DoctorProfile/:id',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    isArray: true
                },
                getAppointment: {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                },
                postAppointment: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                },
                deleteAppointment: {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                },
                putAppointment: {
                    method: 'PUT',
                    url: appSettings.baseUrl + '/api/Appointment/:id',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                },
                putAppointmentSubscription: {
                    method: 'PUT',
                    url: appSettings.baseUrl + '/api/Appointment/Subscription/:id',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                },
               
            });
        }
    }]);
