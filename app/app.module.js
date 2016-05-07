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
    'app.shared.footer',
    
    // SERVICES
    'app.services.account',
    'app.services.patient',
    
    // RESOURCES
    'app.resources.helper',
    'app.resources.account',
    'app.resources.patientProfile',
    'app.resources.doctorProfile',
    'app.resources.nurseProfile',
    
    // LOGIN
    'app.components.login',
    'app.components.login.forgotten',
    'app.components.login.changeForgotten',
    
    // REGISTER
    'app.components.register',
    'app.components.register.activate',
    
    // ACCOUNT
    'app.components.account',
    'app.components.account.patient',
    'app.components.account.administrator',
    
    // DASHBOARD
    'app.components.dashboard.patient',
    'app.components.dashboard.administrator'

]);

app.run(['$rootScope', 'defaultErrorMessageResolver',
function($rootScope, defaultErrorMessageResolver) {
    $rootScope.appSettings = {
        brandName: 'TPO 10',
        baseUrl: 'http://localhost:64110'
        //baseUrl: 'http://tpo10-rest.azurewebsites.net'
    };
}]);

app.filter('toDate', function() {
    return function (date) {
        return moment(date).toDate();
    };
});