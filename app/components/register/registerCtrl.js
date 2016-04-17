angular.module('app.components.register', []).
controller('registerCtrl', ['$scope', 'accountResource', '$location',
function($scope, accountResource, $location) {
    
    $scope.userId = $location.search().userId
    if($scope.userId) {
        $scope.userId = decodeURIComponent($scope.userId);
    }
    
    $scope.register = function() {
        $scope.registering = true;
        accountResource().register({
            'Email': $scope.email,
            'Password': $scope.password,
            'ConfirmPassword': $scope.confirmPassword
        }).$promise.then(function(response) {
            console.log(response);
            $scope.registering = false;
            $.notify({message: 'Preko e-pošte smo vam poslali povezavo za aktivacijo vašega računa.'}, {type: 'success'});
            $location.search('userId', response.UserId);
        }, function(response) {
            console.log(response);
            $scope.registering = false;
            try {
                var error = response.data.ModelState[''][1];
                $.notify({message: 'Ta e-poštni račun je že zaseden.'}, {type: 'danger'});
            } catch(e) {
                $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
            }
        });
    };
    
    $scope.skip = function() {
        $location.search('userId', null);
        $location.path('/login');
    };
}]);