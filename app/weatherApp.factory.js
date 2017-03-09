(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('weatherAppFactory', weatherAppFactory);

    weatherAppFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function weatherAppFactory($http, $q) {
        var service = {
            getCityWeather: getCityWeather
        };
        return service;

        ////////////////

        function getCityWeather(cityName) {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather',
                params: {
                    appid: '89c3da19dd8e11b4ebbf597b958867fc',
                    q: cityName,
                    units: 'imperial'
                }
            }).then(function(response) {
                if (typeof response.data === 'object') {
                    defer.resolve(response);
                } else {
                    defer.reject('no data found :(')
                }

                // error code
            }, function(error) {
                console.log(error);
                defer.reject(error);

            });

            return defer.promise;

        }
    }
})();
