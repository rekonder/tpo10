angular.module('app.components.register.activate', []).
controller('activateCtrl', ['$scope', 'accountResource', '$location',
function($scope, accountResource, $location) {
    
    var userId = $location.search().userId;
    var code = $location.search().code;
    
    if(!userId || !code) {
        $location.search('userId', null);
        $location.search('code', null);
        $location.path('/', false);
        return;    
    }
    
    userId = decodeURIComponent(userId);
    code = decodeURIComponent(code);
    
    accountResource().activate({
        'UserId': userId,
        'Code': code
    }).$promise.then(function(response) {
        console.log(response);
        $.notify({message: 'Vaš račun je bil uspešno aktiviran, sedaj se lahko prijavite v sistem.'}, {type: 'success'});
    }, function(response) {
        console.log(response);
        for (var key in response.data.ModelState) {
            for (var i = 0; i < response.data.ModelState[key].length; i++) {
                $.notify({message: response.data.ModelState[key][i]}, {type: 'danger'});
            }
        }
    });
    
    $location.path('/', false);
}]);