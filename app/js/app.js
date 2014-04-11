/// <reference path='_all.ts' />
'use strict';
// Create and register modules
var modules = ['iLiving.controllers', 'iLiving.directives', 'iLiving.filters', 'iLiving.services'];
modules.forEach(function (module) {
    return angular.module(module, []);
});
modules.push('ngRoute');
angular.module('iLiving', modules);

angular.module('iLiving').config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/timed-usage', {
            templateUrl: 'partials/timed-usage.html',
            controller: 'iLiving.controllers.TimedUsageCtrl'
        });
        $routeProvider.when('/appliance-usage', {
            templateUrl: 'partials/appliance-usage.html',
            controller: 'iLiving.controllers.ApplianceUsageCtrl'
        });
        $routeProvider.otherwise({
            redirectTo: '/timed-usage'
        });
    }]);

var iLiving;
(function (iLiving) {
    /**
    * Register new controller.
    *
    * @param className
    * @param services
    */
    function registerController(className, services) {
        if (typeof services === "undefined") { services = []; }
        var controller = 'iLiving.controllers.' + className;
        services.push(iLiving.controllers[className]);
        angular.module('iLiving.controllers').controller(controller, services);
    }
    iLiving.registerController = registerController;

    /**
    * Register new filter.
    *
    * @param className
    * @param services
    */
    //    export function registerFilter (className: string, services = []) {
    //        var filter = className.toLowerCase();
    //        services.push(() => (new iLiving.filters[className]()).filter);
    //        angular.module('iLiving.filters').filter(filter, services);
    //    }
    /**
    * Register new directive.
    *
    * @param className
    * @param services
    */
    function registerDirective(directive, services) {
        if (typeof services === "undefined") { services = []; }
        services.push(iLiving.directives[directive]);
        angular.module('iLiving.directives').directive(directive, services);
    }
    iLiving.registerDirective = registerDirective;
})(iLiving || (iLiving = {}));
