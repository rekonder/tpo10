angular.module('app.services.account', []).
service('accountService', [function() {
    this.setAccount = function(id, email, role, token, lastLogin, lastLoginIp) {
        var account = {
            'id': id,
            'email': email,
            'role': role,
            'token': 'Bearer ' + token,
            'lastLogin': lastLogin,
            'lastLoginIp': lastLoginIp    
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
}]);