var app = angular.module('login', []);
app.controller('myCtrl', function ($scope, $window, $http) {

  //   $window.location.href = './login/login.html';
  

  $scope.condition = false;
  $scope.forgetpass = function () {
    $scope.condition = false;
  }
  $scope.login1 = function () {
    $scope.condition = true;
  }
  $scope.submitLogin = function () {
    let loginUrl = 'http://localhost:8080/user/login';
    let data = {
      "email": $scope.mail,
      "password": $scope.password
    };
    config = 'application/json';
    $http.post(loginUrl, data, config).then(function (res) {
      if (res.data.toString() === 'true') {
        alert("you have Logged in");
        localStorage.setItem("login", "true");
        $window.location.href = '../contacts/contacts.html';
      }
    });
  }

  $scope.fSubmitLogin = function () {
    if ($scope.fpassword != $scope.rfpassword) {
      alert("check you password");
    }


    let forgetUrl = 'http://localhost:8080/admin/edit';
    let data = {
      "email": $scope.fmail,
      "password": $scope.fpassword,
      "change":"password"
    };
    config = 'application/json';

    $http.post(forgetUrl, data, config).then(function (res) {
      if (res.data.toString() === 'true') {
        alert("you have changed password");
        $scope.condition = true;
      }
    });
  }
  function init() {
    $scope.condition = true;
  }
  $scope.createAccount = function () {
    $window.location.href = '../signup/signup.html';
  }

  init();

});