'use strict';

var opadataService = angular.module('opadataServiceModule', []);

opadataService.service('opadataService', function ($http, $q) {
    var apiUrl = '../api/values';
   
  
    var deferred = $q.defer();
    this.getData = function (data1) {
        $http({
            method: 'POST',
            url: apiUrl, data: data1
        })
            .then(function (response) {
                deferred.resolve(response);
            })
            .catch(function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };
    this.saveData = function (excelData) {

        console.log(excelData);
        $http({
            method: 'POST',
            url: apiUrl,
            data: JSON.stringify(excelData)

        })
            .then(function (response) {
                deferred.resolve(response);

            })
            .catch(function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };
    this.updateData = function (excelData) {
        $http({
            method: 'PUT',
            url: apiUrl,
            data: JSON.stringify(excelData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                deferred.resolve(response);

            })
            .catch(function (response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };
});