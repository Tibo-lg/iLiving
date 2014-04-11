/// <reference path='../_all.ts' />
var iLiving;
(function (iLiving) {
    (function (controllers) {
        var ApplianceUsageCtrl = (function () {
            function ApplianceUsageCtrl($scope, $filter) {
                var _this = this;
                this.curRange = 0;
                this.curResolution = "1h";
                this.scope = $scope;

                this.scope.height = $scope.$parent.height;
                this.scope.width = $scope.$parent.width;

                this.totalOneHour = [
                    { 'name': "Fridge", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven", 'consumption': 2.4, 'cost': 5.60 },
                    { 'name': "Fridge2", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump2", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven2", 'consumption': 2.4, 'cost': 5.60 },
                    { 'name': "Fridge3", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump3", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven3", 'consumption': 2.4, 'cost': 5.60 },
                    { 'name': "Fridge4", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump4", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven4", 'consumption': 2.4, 'cost': 5.60 }
                ];

                this.totalOneDay = [
                    { 'name': "Fridge", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven", 'consumption': 2.4, 'cost': 5.60 },
                    { 'name': "Fridge2", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump2", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven2", 'consumption': 5.4, 'cost': 5.60 },
                    { 'name': "Fridge3", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump3", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven3", 'consumption': 1.4, 'cost': 5.60 },
                    { 'name': "Fridge4", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump4", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven4", 'consumption': 5.4, 'cost': 5.60 }
                ];

                this.totalThreeDays = [
                    { 'name': "Fridge", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven", 'consumption': 2.0, 'cost': 5.60 },
                    { 'name': "Fridge2", 'consumption': 4.2, 'cost': 8.56 },
                    { 'name': "Heat Pump2", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven2", 'consumption': 2.4, 'cost': 5.60 },
                    { 'name': "Fridge3", 'consumption': 7.2, 'cost': 8.56 },
                    { 'name': "Heat Pump3", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven3", 'consumption': 2.4, 'cost': 5.60 },
                    { 'name': "Fridge4", 'consumption': 2.2, 'cost': 8.56 },
                    { 'name': "Heat Pump4", 'consumption': 7.2, 'cost': 11.46 },
                    { 'name': "Oven4", 'consumption': 2.4, 'cost': 5.60 }
                ];
                this.totalOneHour = $filter('orderBy')(this.totalOneHour, '-consumption');
                this.totalOneDay = $filter('orderBy')(this.totalOneDay, '-consumption');
                this.totalThreeDays = $filter('orderBy')(this.totalThreeDays, '-consumption');
                this.appliancePerPage = Math.floor((this.scope.width - 150) / 150);

                this.nbRange = Math.ceil(this.totalOneHour.length / this.appliancePerPage);

                this.scope.previousRange = function () {
                    _this.previousRange();
                };
                this.scope.nextRange = function () {
                    _this.nextRange();
                };

                this.curTotalConsumption = this.totalOneHour;

                this.scope.resolutionClass = function (resolution) {
                    return _this.resolutionClass(resolution);
                };
                this.scope.setResolution = function (resolution) {
                    return _this.setResolution(resolution);
                };

                this.setCurRange();
            }
            ApplianceUsageCtrl.prototype.previousRange = function () {
                if (this.curRange > 0) {
                    this.curRange--;
                    this.setCurRange();
                }
            };
            ApplianceUsageCtrl.prototype.nextRange = function () {
                if (this.curRange < this.nbRange - 1) {
                    this.curRange++;
                    this.setCurRange();
                }
            };

            ApplianceUsageCtrl.prototype.setCurRange = function () {
                var start = (this.curRange * (this.appliancePerPage)), end = ((this.curRange + 1) * this.appliancePerPage);
                this.scope.devicesconsumption = this.curTotalConsumption.slice(start, end);
            };

            ApplianceUsageCtrl.prototype.resolutionClass = function (resolution) {
                return resolution === this.curResolution ? 'active' : '';
            };

            ApplianceUsageCtrl.prototype.setResolution = function (resolution) {
                if (resolution === "1h") {
                    this.curTotalConsumption = this.totalOneHour;
                } else if (resolution == "1d") {
                    this.curTotalConsumption = this.totalOneDay;
                } else if (resolution == "3d") {
                    this.curTotalConsumption = this.totalThreeDays;
                } else {
                    return;
                }
                this.curResolution = resolution;
                this.setCurRange();
            };
            return ApplianceUsageCtrl;
        })();
        controllers.ApplianceUsageCtrl = ApplianceUsageCtrl;
    })(iLiving.controllers || (iLiving.controllers = {}));
    var controllers = iLiving.controllers;
})(iLiving || (iLiving = {}));

iLiving.registerController('ApplianceUsageCtrl', ['$scope', '$filter']);
