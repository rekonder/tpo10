var routes = angular.module('app.routes', []);

routes.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/login', {
           templateUrl: 'app/components/login/loginView.html',
           controller: 'loginCtrl' 
        }).
        when('/login/forgotten', {
           templateUrl: 'app/components/login/forgotten/forgottenView.html',
           controller: 'forgottenCtrl' 
        }).
        when('/register', {
           templateUrl: 'app/components/register/registerView.html',
           controller: 'registerCtrl' 
        }).
        otherwise({
           redirectTo: '/login' 
        });
}]);