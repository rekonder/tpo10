angular.module('app.resources.measurement', []).
factory('measurementResources', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/Measurement/:id', { id: '@_id' }, {
                getMeasurements: {
                    method: 'GET',
                    url: appSettings.baseUrl + '/api/Measurement',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': accountService.getToken()
                    },
                    isArray: true
                },
            });
        }
    }]);
