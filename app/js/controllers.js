'use strict';

var appControllers = angular.module('appControllers', []);

appControllers.controller('MainController', ['$scope', '$location', '$rootScope',
  function($scope, $location, $rootScope) {
	$scope.steps = {
	  'authentication-info': {
		  title: 'Шаг 1. Авторизация',
		  next: 'personal-info',
		  isValid: false,
		  isEnabled: function() { return true; }
	  },
	  'personal-info': {
		  title: 'Шаг 2. Персональные данные',
		  next: 'confirmation',
		  isValid: false,
		  isEnabled: function() { 
		    return $scope.steps['authentication-info'].isValid; 
		  }
	  },
	  'confirmation': {
		  title: 'Шаг 3. Отправка данных',
		  isEnabled: function() { 
		    return $scope.steps['authentication-info'].isValid && $scope.steps['personal-info'].isValid;
          }
	  }
	};
	
	$rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl) {
	  var step = absNewUrl.substring(absNewUrl.lastIndexOf('/') + 1);
	  
	  if (absNewUrl.indexOf('#/') < 0 || !$scope.steps.hasOwnProperty(step)) return;
	  
	  if (!$scope.steps[step].isEnabled()) {
	    $location.path('authentication-info');
	  }
    });
	  
    $scope.getMenuClass = function(step) {
	  var classes = [];
	  if (!$scope.steps[step].isEnabled()) classes.push('disabled');
	  if (step === getCurrentStep()) classes.push('active');
	  return classes.join(' ');
	};
	
	$scope.nextStep = function() {
	  $location.path($scope.steps[getCurrentStep()].next);
	};
	
	$scope.setCurrentStepValid = function(isValid) {
	  $scope.steps[getCurrentStep()].isValid = isValid;
	};
	
	function getCurrentStep() {
	  return $location.path().substring(1);
	}
  }]);

appControllers.controller('AuthenticationInfoController', ['$scope',
  function($scope) {
    $scope.$watch('authenticationInfoForm.$valid', function(isValid) {
      $scope.$parent.setCurrentStepValid(isValid);
    });
  }]);

appControllers.controller('PersonalInfoController', ['$scope',
  function($scope) {
    $scope.datepicker = {
	  opened: false,
	  max: new Date(),
	  open: function() {
	    this.opened = true;
      }
	};
	
	$scope.$watch('personalInfoForm.$valid', function(isValid) {
      $scope.$parent.setCurrentStepValid(isValid);
    });
  }]);
  
appControllers.controller('ConfirmationController', ['$scope', '$window',
  function($scope, $win) {
    $scope.finish = function() {
	  $win.alert('Спасибо! Это всё.');
	};
  }]);
