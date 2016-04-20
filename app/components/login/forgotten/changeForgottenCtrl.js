angular.module('app.components.login.changeForgotten', []).
controller('changeForgottenCtrl', ['$scope', 'accountResource', '$location',
function($scope, accountResource, $location) {
    
    var userId = $location.search().userId;
    var code = $location.search().code;
    
    if(!userId || !code) {
        $location.search('userId', null);
        $location.search('code', null);
        $location.path('/login/forgotten', false);
        return;    
    }
    
    userId = decodeURIComponent(userId);
    code = decodeURIComponent(code);
    
    $scope.submit = function() {
        $scope.submitting = true;
        accountResource().changeForgottenPassword({
            'UserId': userId,
            'Code': code,
            'NewPassword': $scope.password,
            'ConfirmPassword': $scope.confirmPassword
        }).$promise.then(function(response) {
            console.log(response);
            $scope.submitting = false;
            $.notify({message: 'Vaše geslo je bilo spremenjeno, sedaj se lahko prijavite v sistem.'}, {type: 'success'});
            $location.path('/login', false);
        }, function(response) {
            $scope.submitting = false;
            console.log(response);
            $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
        });
    }
}]);