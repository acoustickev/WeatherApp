(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('WeatherAppsController', WeatherAppsController);

    WeatherAppsController.$inject = ['weatherAppFactory', 'toastr'];

    /* @ngInject */
    function WeatherAppsController(weatherAppFactory, toastr) {
        var vm = this;
        vm.title = 'WeatherAppsController';
        vm

        vm.cityData;
        vm.searchHistory = [];
        vm.cityname;
        vm.date;



        function addToHistory() {

            vm.cityname = vm.cityName;
            vm.date = new Date();
            var status = false;

            for (var i = 0; i < vm.searchHistory.length; i++) {
                if (vm.searchHistory[i].city === vm.cityname) {
                    status = true;
                } //if status
            } //for loop
            if (status == false) {
                vm.searchHistory.push({
                    city: vm.cityname,
                    date: vm.date,
                    temp: vm.cityData.main.temp
                }); //if status
            } //if  false
        } //function weather app factory

        vm.getWeather = function(cityName) {

                weatherAppFactory.getCityWeather(cityName).then(
                        function(response) {

                            vm.cityData = response.data;
                            vm.cityWeather = {
                                name: vm.cityData.name,
                                lat: vm.cityData.coord.lat,
                                lon: vm.cityData.coord.lon,
                                temp: vm.cityData.main.temp,
                                pressure: vm.cityData.main.pressure,
                                tempMin: vm.cityData.main.temp_min,
                                tempMax: vm.cityData.main.temp_max
                            }
                            toastr.success('We have weather!!');

                            addToHistory();



                        }, //response function
                        function(error) {
                            if (error.data) {
                                toastr.error('There was a problem:' + error);
                            } else {
                                toastr.info('no data found :(');
                            }

                        } //function error
                    ) //weather app factory
            } //getweather
    }
})(); //'use strict'
