var app = angular.module('app', [
    'ngResource',
    'ngMessages',
    'ngRoute',
    // LIBS
    'jcs-autoValidate',
    'angular-ladda',
    'ngDialog',
    'ODataResources',
    
    'app.routes',
    'app.directives.validation',
    'app.directives.datetimepicker',
    'angularjs-dropdown-multiselect',
    'app.shared.navbar',
    'app.shared.footer',
    
    // SERVICES
    'app.services.account',
    
    // RESOURCES
    'app.resources.helper',
    'app.resources.account',
    'app.resources.patientProfile',
    'app.resources.doctorProfile',
    'app.resources.nurseProfile',
    'app.resources.doctorChooser',
    'app.resources.doctorPatientProfile',
    'app.resources.observation',
    'app.resources.observation.doctor',
    'app.resources.measurement',
    'app.resources.patient.measurement',
    'app.resources.appointment',
    

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
    'app.components.account.administrator.users',
    'app.components.account.doctor',
    'app.components.account.doctor.observation',
    'app.components.account.doctor.observation.overview',
    'app.components.account.doctor.patient',
    'app.components.dashboard.patient.appointment',
    'app.components.changePassword',
    
    // DASHBOARD
    'app.components.dashboard.patient',
    'app.components.dashboard.patient.measurements',
    'app.components.dashboard.doctorChooser',
    'app.shared.leftMenu',

    'angularUtils.directives.dirPagination'

]);

app.run(['$rootScope', 'defaultErrorMessageResolver',
function($rootScope, defaultErrorMessageResolver) {
    $rootScope.appSettings = {
        brandName: 'TPO 10',
        baseUrl: 'http://localhost:64110'
        // baseUrl: 'http://tpo10-rest.azurewebsites.net'
    };
}]);

app.filter('toDate', function() {
    return function (date) {
        return moment(date).toDate();
    };
});

app.filter('ceil', function() {
    return function (value) {
        return Math.ceil(value);
    };
});

app.filter('floor', function() {
    return function (value) {
        return Math.floor(value);
    };
});