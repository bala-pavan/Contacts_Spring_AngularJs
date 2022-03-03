var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $window) {
  $window.location.href = './login/login.html';
});