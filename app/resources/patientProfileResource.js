angular.module('app.resources.patientProfile', []).
factory('patientProfileResources', ['$rootScope', '$resource', 'accountService',
function($rootScope, $resource, accountService) {
    var appSettings = $rootScope.appSettings;
    return function() {
        return $resource(appSettings.baseUrl + '/api/PatientProfiles/:id', { id: '@_id' }, {
            getPatientProfiles: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                isArray: true
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
