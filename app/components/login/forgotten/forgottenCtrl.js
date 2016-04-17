angular.module('app.components.login.forgotten', []).
controller('forgottenCtrl', ['$scope', 'accountResource',
function($scope, accountResource) {
    $scope.submit = function() {
        $scope.submitting = true;
        accountResource().forgottenPassword({
            'Email': $scope.email,
        }).$promise.then(function(response) {
            console.log(response);
            $scope.submitting = false;
            $.notify({message: 'Preko e-pošte smo vam poslali povezavo preko katere lahko spremenite geslo.'}, {type: 'success'});
        }, function(response) {
            console.log(response);
            $scope.submitting = false;
            $.notify({message: 'Uporabniški račun s takim e-poštnim naslovom ne obstaja.'}, {type: 'danger'});
        });
    };
}]);