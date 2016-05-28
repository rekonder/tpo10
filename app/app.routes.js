var routes = angular.module('app.routes', []);

routes.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        // LOGIN
        when('/login', {
           templateUrl: 'app/components/login/loginView.html',
           controller: 'loginCtrl'
        }).
        when('/login/forgotten', {
           templateUrl: 'app/components/login/forgotten/forgottenView.html',
           controller: 'forgottenCtrl'
        }).
        when('/login/changeForgotten', {
           templateUrl: 'app/components/login/forgotten/changeForgottenView.html',
           controller: 'changeForgottenCtrl'
        }).
        // REGISTER
        when('/register', {
           templateUrl: 'app/components/register/registerView.html',
           controller: 'registerCtrl'
        }).
        when('/register/activate', {
           templateUrl: 'app/components/register/activate/activateView.html',
           controller: 'activateCtrl'
        }).
        // CHANGE PASSWORD
        when('/changePassword', {
            templateUrl: 'app/components/changePassword/changePasswordView.html',
            controller: 'changePasswordCtrl'
        }).
        // ACCOUNT
        when('/account', {
           templateUrl: 'app/components/account/accountView.html',
           controller: 'accountCtrl'
        }).
        when('/account/patient', {
           templateUrl: 'app/components/account/patient/accountPatientView.html',
           controller: 'accountPatientCtrl'
        }).
        when('/account/administrator', {
            templateUrl: 'app/components/account/administrator/createDoctorNurseView.html',
            controller: 'createDoctorNurseCtrl'
        }).
        when('/dashboard/patient/:patientId', {
           templateUrl: 'app/components/dashboard/patient/dashboardPatientView.html',
           controller: 'dashboardPatientCtrl'
        }).

        when('/dashboard/patient/:patientId/doctors', {
            templateUrl: 'app/components/dashboard/doctorChooser/doctorChooser.html',
            controller: 'doctorChooserCtrl'
        }).
        when('/dashboard/patient/:patientId/edit', {
           templateUrl: 'app/components/dashboard/patient/dashboardPatientViewEdit.html',
           controller: 'dashboardPatientCtrl' 
        }).
        when('/account/doctor', {
            templateUrl: 'app/components/account/doctor/doctorProfileView.html',
            controller: 'createDoctorCtrl'
        }).
        when('/account/doctor/observation', {
            templateUrl: 'app/components/account/doctor/observation/createObservationView.html',
            controller: 'createObservationCtrl'
        }).
        when('/dashboard/patient/:patientId/insertMeasurements', {
            templateUrl: 'app/components/dashboard/patient/insertPatientProfileMeasurement.html',
            controller: 'insertPatientProfileMeasurementCtrl'
        }).
        when('/account/doctor/patients', {
            templateUrl: 'app/components/account/doctor/patients/allPatientsView.html',
            controller: 'doctorPatientCtrl'
        }).
        otherwise({
           redirectTo: '/account'
        });
}]);