angular.module('app.services.account', []).
service('accountService', ['$location', function($location) {
    this.setAccount = function(id, email, role, token, lastLogin, lastLoginIp, profileCount) {
        var account = {
            'id': id,
            'email': email,
            'role': role,
            'token': 'Bearer ' + token,
            'lastLogin': lastLogin,
            'lastLoginIp': lastLoginIp,
            'profileCount': profileCount    
        };
        localStorage.setItem('tpo10_account', JSON.stringify(account));
    };
    this.getAccount = function() {
        return JSON.parse(localStorage.getItem('tpo10_account'));
    };
    this.getToken = function() {
        var account = this.getAccount();
        if(!account) return '';
        return account.token;
    };
    this.removeAccount = function() {
        localStorage.removeItem('tpo10_account');
    };
    this.authorize = function(role, success) {
        var account = this.getAccount();
        if(!account) {
            return false;
        }
        if(role === account.role) {
            if(success) $location.path(success, false);
            return true;
        }
        return false;
    };
    this.addProfileCount = function() {
        var account = this.getAccount();
        account.profileCount++;
        localStorage.setItem('tpo10_account', JSON.stringify(account));
    };
    this.subProfileCount = function() {
        var account = this.getAccount();
        account.profileCount--;
        localStorage.setItem('tpo10_account', JSON.stringify(account));
    };
}]);