angular.module('app.resources.nurseProfile', []).
factory('nurseProfileResources', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/NurseProfile/:id', { id: '@_id' }, {
                postNurseProfile: {
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
