angular.module('app.resources.observation.doctor', []).
factory('observationDoctorResource', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/Observation/:id', { id: '@_id' }, {
                getPatientObservations: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/PatientProfile/:id',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                 getAllergies: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/Allergies',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                 getDiseases: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/Diseases',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                 getDiets: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/Diets',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                 getMedications: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Observation/Medications',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
                getObservation: {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    }
                },
                postObservation: {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    }
                }
            });
        }
    }]);