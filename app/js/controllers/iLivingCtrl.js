/// <reference path='../_all.ts' />
var iLiving;
(function (iLiving) {
    (function (controllers) {
        var iLivingCtrl = (function () {
            function iLivingCtrl($scope, $window) {
                this.scope = $scope;

                this.scope.height = $window.innerHeight - 140;
                this.scope.width = $window.innerWidth - 10;
            }
            return iLivingCtrl;
        })();
        controllers.iLivingCtrl = iLivingCtrl;
    })(iLiving.controllers || (iLiving.controllers = {}));
    var controllers = iLiving.controllers;
})(iLiving || (iLiving = {}));

iLiving.registerController('iLivingCtrl', ['$scope', '$window']);
