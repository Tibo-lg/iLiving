/// <reference path='../_all.ts' />
var iLiving;
(function (iLiving) {
    (function (controllers) {
        var TimedUsageCtrl = (function () {
            function TimedUsageCtrl($scope) {
                var _this = this;
                this.scope = $scope;

                this.oneHour = {
                    'date': ["10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00"],
                    'values': {
                        'Kitchen': [10, 23, 9, 45, 5, 9, 4, 13, 6, 0],
                        'Living Room': [13, 18, 6, 45, 6, 9, 2, 21, 2, 11],
                        'Bedroom 1': [8, 26, 9, 10, 5, 12, 4, 13, 6, 0],
                        'Bedroom 2': [8, 26, 9, 10, 5, 12, 4, 13, 6, 0],
                        'Bedroom 3': [8, 26, 9, 10, 5, 12, 4, 13, 6, 50]
                    }
                };

                this.oneDay = {
                    'date': ["10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00"],
                    'values': {
                        'Kitchen': [10, 23, 9, 45, 5, 9, 4, 13, 6, 0],
                        'Living Room': [13, 21, 6, 45, 10, 9, 2, 21, 2, 11],
                        'Bedroom 1': [8, 26, 9, 10, 3, 12, 2, 13, 6, 0],
                        'Bedroom 2': [8, 26, 7, 13, 5, 16, 4, 13, 4, 0],
                        'Bedroom 3': [8, 26, 9, 10, 5, 12, 4, 13, 6, 50]
                    }
                };

                this.threeDay = {
                    'date': ["10:00:00", "11:00:00", "12:00:00", "13:00:00", "14:00:00", "15:00:00", "16:00:00", "17:00:00", "18:00:00", "19:00:00"],
                    'values': {
                        'Kitchen': [10, 23, 9, 45, 5, 9, 4, 13, 6, 0],
                        'Living Room': [13, 21, 6, 45, 10, 9, 2, 21, 2, 11],
                        'Bedroom 1': [8, 26, 9, 10, 3, 12, 6, 13, 6, 0],
                        'Bedroom 2': [8, 3, 7, 7, 5, 16, 4, 13, 4, 0],
                        'Bedroom 3': [8, 26, 9, 10, 5, 12, 4, 28, 6, 50]
                    }
                };
                this.scope.height = $scope.$parent.height;
                this.scope.width = $scope.$parent.width;
                this.scope.resolutionClass = function (resolution) {
                    return _this.resolutionClass(resolution);
                };
                this.scope.setResolution = function (resolution) {
                    return _this.setResolution(resolution);
                };
                this.scope.timeserie = this.oneHour;
                this.curResolution = "1h";
            }
            TimedUsageCtrl.prototype.resolutionClass = function (resolution) {
                return resolution === this.curResolution ? 'active' : '';
            };

            TimedUsageCtrl.prototype.setResolution = function (resolution) {
                if (resolution === "1h") {
                    this.scope.timeserie = this.oneHour;
                } else if (resolution == "1d") {
                    this.scope.timeserie = this.oneDay;
                } else if (resolution == "3d") {
                    this.scope.timeserie = this.threeDay;
                } else {
                    return;
                }
                this.curResolution = resolution;
            };
            return TimedUsageCtrl;
        })();
        controllers.TimedUsageCtrl = TimedUsageCtrl;
    })(iLiving.controllers || (iLiving.controllers = {}));
    var controllers = iLiving.controllers;
})(iLiving || (iLiving = {}));

iLiving.registerController('TimedUsageCtrl', ['$scope']);
