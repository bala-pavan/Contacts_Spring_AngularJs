var app = angular.module('contacts', []);
app.controller('myCtrl', function ($scope, $window, $http) {

   contacts = [];

   $scope.login1 = function () {
      $window.location.href = '../login/login.html';
   }

   $scope.getContacts = function () {
      let addContactUrl = 'http://localhost:8080/contact/getContacts';
      $http.get(addContactUrl).then(function (data) {
         if (data.status != 200) {
            alert("Some thing went wrong");
         }
         else if (data.status === 200) {
            if (typeof data.data != 'String') {
               $scope.contacts = data.data;
            }
            else {
               alert("Some thing went wrong");
            }
         }
      });
   }

   $scope.saveContact = function () {
      let addContactUrl = 'http://localhost:8080/contact/add';
      let data = {
         "name": $scope.name,
         "moblieNumber": $scope.number,
         "email": $scope.mail,
      };
      config = 'application/json';

      $http.post(addContactUrl, data, config).then(function (res) {
         if (res.data.toString() === 'true') {
            alert("Contact added");
            $scope.getContacts();
         }
      });
   }
   $scope.clearContact = function (){
      $scope.name = '';
      $scope.number = '';
      $scope.mail = '';
   }

   function init() {
      if (localStorage.getItem("login") === undefined || localStorage.getItem("login") === '' || localStorage.getItem("login") === null) {
         alert("please Login and come back");
         $scope.login1();
      }else{
         $scope.getContacts();
      }
   }
   $scope.logout = function () {
      localStorage.removeItem("login");
      $scope.login1();
   }
   init();
});