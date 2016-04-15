angular.module('app.components.register', []).
controller('registerCtrl', ['$scope', 'accountResource',
function($scope, accountResource) {
    $scope.submitting = false;
    $scope.submit = function() {
        $scope.submitting = true;
        accountResource.register({
            'Email': $scope.email,
            'Password': $scope.password,
            'ConfirmPassword': $scope.confirmPassword
        }).$promise.then(function(response) {
            console.log(response);
            $scope.submitting = false;
            $.notify({message: 'Preko e-pošte smo vam poslali povezavo za aktivacijo vašega računa.'}, {type: 'success'});
        }, function(response) {
            console.log(response);
            $scope.submitting = false;
            try {
                var error = response.data.ModelState[''][1];
                $.notify({message: 'Ta e-poštni račun je že zaseden.'}, {type: 'danger'});
            } catch(e) {
                $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
            }
            // for (var key in response.data.ModelState) {
            //     for (var i = 0; i < response.data.ModelState[key].length; i++) {
            //         $.notify({message: response.data.ModelState[key][i]}, {type: 'danger'});
            //     }
            // }
        });
    };
}]);