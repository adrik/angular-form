'use strict';

var app = angular.module('app', [
  'ngRoute',
  'appControllers',
  'appDirectives',
  'ui.bootstrap'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/authentication-info', {
        templateUrl: 'partials/authentication-info.html',
        controller: 'AuthenticationInfoController'
      }).
      when('/personal-info', {
        templateUrl: 'partials/personal-info.html',
        controller: 'PersonalInfoController'
      }).
	  when('/confirmation', {
        templateUrl: 'partials/confirmation.html',
        controller: 'ConfirmationController'
      }).
      otherwise({
        redirectTo: '/authentication-info'
      });
  }]);
