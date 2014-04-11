/// <reference path='../_all.ts' />
var iLiving;
(function (iLiving) {
    (function (controllers) {
        var NavCtrl = (function () {
            function NavCtrl($scope, $location) {
                this.scope = $scope;
                this.scope.navClass = function (page) {
                    var currentRoute = $location.path().substring(1) || 'timed-usage';
                    return page === currentRoute ? 'active' : '';
                };
            }
            return NavCtrl;
        })();
        controllers.NavCtrl = NavCtrl;
    })(iLiving.controllers || (iLiving.controllers = {}));
    var controllers = iLiving.controllers;
})(iLiving || (iLiving = {}));

iLiving.registerController('NavCtrl', ['$scope', '$location']);
