var app = angular.module('signup', []);
app.controller('myCtrl', function ($scope, $window, $http) {

   // $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
   


   //   $window.location.href = './login/login.html';

   $scope.login1 = function () {
      $window.location.href = '../login/login.html';
   };

   $scope.submitSignUp = function () {

      let signupUrl = 'http://localhost:8080/user/signup';
      let data = {
         "email":$scope.mail,
         "password":$scope.password,
         "moblieNumber":$scope.number
      };
      config='application/json';
      $http.post(signupUrl, data, config).then(function(res){
         if(res.data.toString() === 'true'){
            alert("you have signed up succesufully");
            $scope.login1();
         }
      });
   };

   function init() {

   }

   init();
});