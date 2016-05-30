angular.module('app.resources.observation', []).
factory('observationResource', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api', { patientId: '@_patientId', number: 'number', id: '@_id' }, {
                getAlergy: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/GetAlergies/:patientId/:number',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                getOldObservations: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/OldObservations/:patientId/:number',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                getOldObservation: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/:id',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    }
                },
                getDiseases: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/GetDiases/:patientId/:number',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                getDiets: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/GetDiets/:patientId/:number',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                getMedications: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/GetMedications/:patientId/:number',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                getMeasurements: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/GetMeasurements/:patientId/:number',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                }
            });
        }
    }]);