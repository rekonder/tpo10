angular.module('app.components.account.doctor.patient', []).
controller('doctorPatientCtrl',
    ['$scope', 'accountResource', 'accountService', '$location', 'patientProfileResources','doctorPatientProfileResources',
        function($scope, accountResource, accountService, $location, patientProfileResources, doctorPatientProfileResources) {
            var account = accountService.getAccount();

            if(accountService.authorize('Doctor', null) && accountService.getCheckDoctorProfile() === true);
            else $location.path('/account');

            $scope.currentPage = 0;
            $scope.refreshProfiles = function() {
                
                doctorPatientProfileResources().getAllPatientProfileByDoctor({id: account.id}).$promise.then(function(response) {
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
            $scope.dashboard = function(index) {
                doctorPatientProfileResources().getAllPatientProfileByDoctor({id: account.id}).$promise.then(function(response) {
                    console.log(response);
                    for(var i = 0; i < response.length; i++) {
                        response[i].BirthDate = moment(response[i].BirthDate).toDate().toLocaleDateString();
                    }
                    $scope.profiles = response;
                    if(response.length == 0) {
                        $scope.profiles = [];
                    }
                     if( $scope.checkForValue(index)) {
                        $location.path('dashboard/patient/' + index);
                     }
                     else
                         $.notify({message: 'Pacient vas več nima za izbranega'}, {type: 'danger'});
                }, function(response) {
                    console.log(response);
                    $scope.profiles = [];
                });
            };

            $scope.checkForValue = function(value) {
                var result = false;
                angular.forEach($scope.profiles, function(item){
                    if(item.Id == value){
                        result =  true;
                    }
                });
                return result;
            };

            $scope.prevPage = function () {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.nextPage = function () {
                if ($scope.currentPage < $scope.pagedItems.length - 1) {
                    $scope.currentPage++;
                }
            };

            $scope.setPage = function () {
                $scope.currentPage = this.n;
            };

        }]);