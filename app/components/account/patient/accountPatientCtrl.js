angular.module('app.components.account.patient', []).
controller('accountPatientCtrl',
['$scope', 'accountResource', 'accountService', 'patientService', '$location', 'patientProfileResources',
function($scope, accountResource, accountService, patientService, $location, patientProfileResources) {
    var account = accountService.getAccount();
    
    if(accountService.authorize('Patient', null));
    else $location.path('/account');
    
    $scope.deletingProfile = [];
    
    $scope.refreshProfiles = function() {
        patientProfileResources().getPatientProfiles({id: account.id}).$promise.then(function(response) {
            console.log(response);
            for(var i = 0; i < response.length; i++) {
                response[i].BirthDate = moment(response[i].BirthDate).toDate().toLocaleDateString();
            }
            $scope.profiles = response;
            if(response.length == 0) {
                $scope.profiles = [];
            }
        }, function(response) {
            console.log(response);
            $scope.profiles = [];
        });
    };
    
    $scope.refreshProfiles();
    
    $scope.open = function(index) {
        for(var i = 0; i < $scope.profiles.length; i++) {
            if(i == index) {
                $scope.profiles[i].opened = true;
                $scope.formData = $scope.profiles[i];
            } else {
                $scope.profiles[i].opened = false;
            }
        }
        $scope.createClicked = false;
        $scope.viewClicked = true;
    }
    
    $scope.close = function(index) {
        for(var i = 0; i < $scope.profiles.length; i++) {
            $scope.profiles[i].opened = false;
        }
        $scope.formData = {};
        $scope.createClicked = false;
        $scope.sameContactInfo = false;
        $scope.viewClicked = false;
    }
    
    $scope.create = function() {
        for(var i = 0; i < $scope.profiles.length; i++) {
            $scope.profiles[i].opened = false;
        }
        $scope.formData = {};
        $scope.sameContactInfo = false;
        $scope.viewClicked = false;
        $scope.createClicked = !$scope.createClicked;
    }
    
    $scope.delete = function(index) {
        $scope.deletingProfile[index] = true;
        patientProfileResources().deletePatientProfile({id: $scope.profiles[index].Id}).$promise.then(function(response) {
            console.log(response);
            $scope.deletingProfile[index] = false;
            $scope.refreshProfiles();
            $.notify({message: 'Profil je bil odstranjen.'}, {type: 'success'});
            accountService.subProfileCount();
            $scope.close();
        }, function(response) {
            console.log(response);
            $scope.deletingProfile[index] = false;
            $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
        });
    };
    
    $scope.dashboard = function(index) {
        console.log(index);
        if(!isNaN(index)) {
            patientService.setSelectedPatientProfile($scope.profiles[index]); 
            $location.path('dashboard/patient');   
        }
    }
    
    $scope.submitProfile = function() {
        if($scope.createClicked) {
            // CREATE
            $scope.submittingProfile = true;
            patientProfileResources().postPatientProfile({id: account.id}, $scope.formData).$promise.then(function(response) {
                console.log(response);
                $scope.submittingProfile = false;
                $scope.refreshProfiles();
                $.notify({message: 'Profil je bil dodan.'}, {type: 'success'});
                accountService.addProfileCount();
                $scope.close();
            }, function(response) {
                console.log(response);
                $scope.submittingProfile = false;
                $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                $scope.close();
            });
        } else {
            // SAVE
            $scope.submittingProfile = true;
            patientProfileResources().putPatientProfile({id: $scope.formData.Id}, $scope.formData).$promise.then(function(response) {
                console.log(response);
                $scope.submittingProfile = false;
                $scope.refreshProfiles();
                $.notify({message: 'Profil je bil posodobljen.'}, {type: 'success'});
                $scope.close();
            }, function(response) {
                console.log(response);
                $scope.submittingProfile = false;
                $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
                $scope.close();
            });
        }
    };
    
    $scope.changePassword = function() {
        $scope.changingPassword = true;
        accountResource().changePassword({
            "OldPassword": $scope.oldPassword,
            "NewPassword": $scope.newPassword,
            "ConfirmPassword": $scope.confirmNewPassword
        }).$promise.then(function(response) {
            console.log(response);
            $scope.changingPassword = false;
            $.notify({message: 'Geslo je bilo spremenjeno.'}, {type: 'success'});
            $scope.oldPassword = null;
            $scope.newPassword = null;
            $scope.confirmNewPassword = null;
        }, function(response) {
            console.log(response);
            $scope.changingPassword = false;
            $.notify({message: 'Nekaj je šlo narobe.'}, {type: 'danger'});
            $scope.oldPassword = null;
            $scope.newPassword = null;
            $scope.confirmNewPassword = null;
        });
    };
    
    $scope.$watch('sameContactInfo', function(newValue) {
        if(newValue) {
            $scope.formData.ContactFirstName = $scope.formData.FirstName;
            $scope.formData.ContactLastName = $scope.formData.LastName;
            $scope.formData.ContactAddress = $scope.formData.Address;
            $scope.formData.ContactPostNumber = $scope.formData.PostNumber;
            $scope.formData.ContactTelephone = $scope.formData.Telephone;
            $scope.formData.ContactFamilyRelationship = "Jaz";
        }
    });
    $scope.$watch('formData.FirstName', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.formData.ContactFirstName = $scope.formData.FirstName;
        }
    });
    $scope.$watch('formData.LastName', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.formData.ContactLastName = $scope.formData.LastName;
        }
    });
    $scope.$watch('formData.Address', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.formData.ContactAddress = $scope.formData.Address;
        }
    });
    $scope.$watch('formData.PostNumber', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.formData.ContactPostNumber = $scope.formData.PostNumber;
        }
    });
    $scope.$watch('formData.Telephone', function(newValue) {
        if($scope.sameContactInfo) {
            $scope.formData.ContactTelephone = $scope.formData.Telephone;
        }
    });
    
}]);