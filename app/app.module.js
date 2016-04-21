var app = angular.module('app', [
    'ngResource',
    'ngMessages',
    'ngRoute',
    // LIBS
    'jcs-autoValidate',
    'angular-ladda',
    
    'app.routes',
    'app.directives.validation',
    'app.directives.datetimepicker',
    'app.shared.navbar',
    
    // SERVICES
    'app.services.account',
    
    // RESOURCES
    'app.resources.helper',
    'app.resources.account',
    'app.resources.patientProfile',
    
    // LOGIN
    'app.components.login',
    'app.components.login.forgotten',
    'app.components.login.changeForgotten',
    
    // REGISTER
    'app.components.register',
    'app.components.register.activate',
    
    // ACCOUNT
    'app.components.account',
    'app.components.account.patient'
]);

app.run(['$rootScope', 'defaultErrorMessageResolver',
function($rootScope, defaultErrorMessageResolver) {
    $rootScope.appSettings = {
        brandName: 'TPO 10',
        // baseUrl: 'http://localhost:64110'
        baseUrl: 'http://tpo10-rest.azurewebsites.net'
    };
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['email'] = 'Napačen e-poštni naslov.';
        errorMessages['password'] = 'Geslo mora vsebovati vsaj 8 zankov od tega vsaj eno številko.';
        errorMessages['confirmPassword'] = 'Gesli se ne ujemata.';
    });
    
}]);

app.filter('toDate', function() {
    return function (date) {
        return moment(date).toDate();
    };
});