angular.module('app.resources.appointment', []).
factory('appointmentResources', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/PatientProfiles/:id/Doctors', { id: '@_id' }, {
               // TODO: add methods
               
            });
        }
    }]);
