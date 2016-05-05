angular.module('app.resources.helper', []).
factory('helperResources', ['$rootScope', '$resource', 'accountService',
function($rootScope, $resource, accountService) {
    var appSettings = $rootScope.appSettings;
    return function() {
        return $resource(appSettings.baseUrl + '/api/Helper', null, {
            getPosts: {
                method: 'GET',
                url: appSettings.baseUrl + '/api/Helper/Post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                params: {
                    q: '@_q'
                },
                isArray: true
            },
            getHealthCareProviders: {
                method: 'GET',
                url: appSettings.baseUrl + '/api/Helper/HealthCareProvider',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                isArray: true
            }
        });
    }
}]);
