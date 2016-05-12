angular.module('app.components.register', []).
controller('registerCtrl', ['$scope', 'accountResource', 'helperResources', 'patientProfileResources', '$location',
function($scope, accountResource, helperResources, patientProfileResources, $location) {
    
    // $scope.gender = "Ženski"
    
    helperResources().getPosts().$promise.then(function(response) {
        $scope.posts = response;
    }, function(response) {
        console.error(response);
    });
     
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
            $scope.userId = response.UserId;
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
    
    $scope.createProfile = function() {
        $scope.creatingProfile = true;
        var profile = {
            'HealthInsuranceNumber': $scope.healthInsuranceNumber,
            'FirstName': $scope.firstName,
            'LastName': $scope.lastName,
            'Address': $scope.address,
            'PostNumber': $scope.post,
            'Telephone': $scope.telephone,
            'Gender': $scope.gender,
            'BirthDate': $scope.birthDate,
            'ContactFirstName': $scope.contactFirstName,
            'ContactLastName': $scope.contactLastName,
            'ContactAddress': $scope.contactAddress,
            'ContactPostNumber': $scope.contactPost,
            'ContactTelephone': $scope.contactTelephone,
            'ContactFamilyRelationship': $scope.contactFamilyRelationship
        };
        patientProfileResources().postPatientProfile({id: $scope.userId}, profile).$promise.then(function(response) {
            console.log(response);
            $scope.creatingProfile = false;
            $.notify({message: 'Uspešno ste kreirali uporabniški profil, ne pozabite aktivirati uporabniškega računa.'}, {type: 'success'});
            $location.path('/', false);
        }, function(response) {
            console.log(response);
            $scope.creatingProfile = false;
            $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
        });
    };
    
    $scope.skip = function() {
        $location.path('/', false);
    };
    
    $scope.$watch('sameContactInfo', function(newValue) {
        if(newValue) {
            $scope.contactFirstName = $scope.firstName;
            $scope.contactLastName = $scope.lastName;
            $scope.contactAddress = $scope.address;
            $scope.contactPost = $scope.post;
            $scope.contactTelephone = $scope.telephone;
            $scope.contactFamilyRelationship = "Jaz";
        }
    });
    $scope.$watch('firstName', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.contactFirstName = $scope.firstName;
        }
    });
    $scope.$watch('lastName', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.contactLastName = $scope.lastName;
        }
    });
    $scope.$watch('address', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.contactAddress = $scope.address;
        }
    });
    $scope.$watch('post', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.contactPost = $scope.post;
        }
    });
    $scope.$watch('telephone', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.contactTelephone = $scope.telephone;
        }
    });
}]);