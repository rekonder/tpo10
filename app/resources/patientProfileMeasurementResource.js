angular.module('app.resources.patient.measurement', []).
factory('patientProfileMeasurementResource', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/PatientProfileMeasurement/:id', { id: '@_id', patientId: '@_patientId' }, {
                postMeasurement: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    }
                },
                getMeasurements: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/PatientProfileMeasurement/PatientProfile/:patientId',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
               },
               getMeasurement: {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    }
               },
                
            });
        }
    }]);
