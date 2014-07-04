/// <reference path='../_all.ts' />
var iLiving;
(function (iLiving) {
    (function (controllers) {
        var ApplianceUsageCtrl = (function () {
            function ApplianceUsageCtrl($scope, $filter, dataFactory) {
                var _this = this;
                this.curRange = 0;
                this.curResolution = "1h";
                this.scope = $scope;
                this.filter = $filter;

                this.scope.height = $scope.$parent.height;
                this.scope.width = $scope.$parent.width;
                this.scope.previousRange = function () {
                    _this.previousRange();
                };
                this.scope.nextRange = function () {
                    _this.nextRange();
                };
                this.scope.resolutionClass = function (resolution) {
                    return _this.resolutionClass(resolution);
                };
                this.scope.setResolution = function (resolution) {
                    return _this.setResolution(resolution);
                };

                dataFactory.getAppUse("onehour").success(function (result) {
                    _this.initOneHour(result);
                });
                dataFactory.getAppUse("oneday").success(function (result) {
                    _this.initOneDay(result);
                });
                dataFactory.getAppUse().success(function (result) {
                    _this.initThreeDay(result);
                });
            }
            ApplianceUsageCtrl.prototype.initOneHour = function (result) {
                this.totalOneHour = result;

                //console.debug(this.totalOneHour);
                this.totalOneHour = this.filter('orderBy')(this.totalOneHour, '-consumption');
                this.appliancePerPage = Math.floor((this.scope.width - 150) / 150);

                this.nbRange = Math.ceil(this.totalOneHour.length / this.appliancePerPage);

                this.curTotalConsumption = this.totalOneHour;

                this.setCurRange();
            };

            ApplianceUsageCtrl.prototype.initOneDay = function (result) {
                this.totalOneDay = result;
                this.totalOneDay = this.filter('orderBy')(this.totalOneDay, '-consumption');
            };

            ApplianceUsageCtrl.prototype.initThreeDay = function (result) {
                this.totalThreeDays = result;
                this.totalThreeDays = this.filter('orderBy')(this.totalThreeDays, '-consumption');
            };

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
            ApplianceUsageCtrl.$inject = ['$scope', '$filter', 'dataFactory'];
            return ApplianceUsageCtrl;
        })();
        controllers.ApplianceUsageCtrl = ApplianceUsageCtrl;
    })(iLiving.controllers || (iLiving.controllers = {}));
    var controllers = iLiving.controllers;
})(iLiving || (iLiving = {}));

iLiving.registerController('ApplianceUsageCtrl', ['$scope', '$filter', 'dataFactory']);
