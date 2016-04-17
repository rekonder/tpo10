angular.module('app.resources.account', []).
factory('accountResource', ['$rootScope', '$resource', 'accountService',
function($rootScope, $resource, accountService) {
    var appSettings = $rootScope.appSettings;
    return function() {
        return $resource(appSettings.baseUrl + '/api/Account', null, {
            login: {
                method: 'POST',
                url: appSettings.baseUrl + '/Token',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            },
            logout: {
                method: 'POST',
                url: appSettings.baseUrl + '/api/Account/Logout',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': accountService.getToken()
                }
            },
            changePassword: {
                method: 'POST',
                url: appSettings.baseUrl + '/api/Account/ChangePassword',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': accountService.getToken()
                }
            },
            forgottenPassword: {
                method: 'POST',
                url: appSettings.baseUrl + '/api/Account/ForgottenPassword',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            },
            changeForgottenPassword: {
                method: 'POST',
                url: appSettings.baseUrl + '/api/Account/ChangeForgottenPassword',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            },
            register: {
                method: 'POST',
                url: appSettings.baseUrl + '/api/Account/Register',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            },
            createAccount: {
                method: 'POST',
                url: appSettings.baseUrl + '/api/Account/CreateAccount',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': accountService.getToken()
                }
            },
            activate: {
                method: 'POST',
                url: appSettings.baseUrl + '/api/Account/Activate',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        });
    }
}]);
