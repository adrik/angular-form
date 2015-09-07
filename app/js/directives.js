'use strict';

var appDirectives = angular.module('appDirectives', []);
 
appDirectives.directive("valEqualTo", function() {
  return {
    require: "ngModel",
    scope: {
      otherModelValue: "=valEqualTo"
    },
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.equalto = function(modelValue) {
        return modelValue == scope.otherModelValue;
      };
 
      scope.$watch("otherModelValue", function() {
        ngModel.$validate();
      });
    }
  };
});

appDirectives.directive("valMaxDateToday", function() {
  return {
    require: "ngModel",
    link: function(scope, element, attributes, ngModel) {
      ngModel.$validators.maxdatetoday = function(modelValue) {
        return !modelValue || moment(modelValue).valueOf() <= moment().valueOf();
      };
    }
  };
});