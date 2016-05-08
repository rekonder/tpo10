angular.module('app.resources.doctorProfile', []).
factory('doctorProfileResources', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/DoctorProfile/:id', { id: '@_id' }, {
                getDoctorProfiles: {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    isArray: true
                },

                postDoctorProfile: {
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
