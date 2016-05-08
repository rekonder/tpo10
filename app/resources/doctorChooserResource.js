angular.module('app.resources.doctorChooser', []).
factory('doctorChooserResources', ['$rootScope', '$resource', 'accountService',
    function($rootScope, $resource, accountService) {
        var appSettings = $rootScope.appSettings;
        return function() {
            return $resource(appSettings.baseUrl + '/api/PatientProfiles/:id/Doctors', { id: '@_id' }, {
                getChosenDoctors: {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }//,
                    //isArray: true
                },
                putChosenDoctors: {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            });
        }
    }]);
