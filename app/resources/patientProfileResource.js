angular.module('app.resources.patientProfile', []).
factory('patientProfileResources', ['$rootScope', '$resource', 'accountService',
function($rootScope, $resource, accountService) {
    var appSettings = $rootScope.appSettings;
    return function() {
        return $resource(appSettings.baseUrl + '/api/PatientProfiles/:id?_t='+new Date().getTime(), { id: '@_id' }, {
            getPatientProfiles: {
                method: 'GET',
                url: appSettings.baseUrl + '/api/PatientProfiles/Account/:id',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                isArray: true
            },
            getPatientProfile: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            },
            putPatientProfile: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            },
            postPatientProfile: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            },
            deletePatientProfile: {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        });
    }
}]);
