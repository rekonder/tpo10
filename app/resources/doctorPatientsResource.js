angular.module('app.resources.doctorPatientProfile', []).
factory('doctorPatientProfileResources', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/PatientProfiles/:id/patients', { id: '@_id' }, {
                getAllPatientProfileByDoctor: {
                    method: 'GET',
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
