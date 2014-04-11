/// <reference path='_all.ts' />

'use strict'

// Create and register modules
var modules = ['iLiving.controllers','iLiving.directives', 'iLiving.filters', 'iLiving.services'];
modules.forEach((module) => angular.module(module, []));
modules.push('ngRoute');
angular.module('iLiving', modules);

angular.module('iLiving').config(['$routeProvider',
    function($routeProvider){
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


module iLiving{
    export module controllers {}
    export module directives {}
    export module filters {}
    export module services {}

    export interface iLivingScope{
      height: number;
      width: number;
    }

    export interface TimeSerie{
      date: Array<string>;
      values: Values;
    }

    export interface Values{
      [name: string]: Array<number>;
    }

    export interface DeviceConsumption{
      name: string;
      consumption: number;
      cost: number;
    }
    /**
     * Register new controller.
     *
     * @param className
     * @param services
     */
    export function registerController (className: string, services = []) {
        var controller = 'iLiving.controllers.' + className;
        services.push(iLiving.controllers[className]);
        angular.module('iLiving.controllers').controller(controller, services);
    }

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
    export function registerDirective (directive :string, services = []) {
        services.push(iLiving.directives[directive]);
        angular.module('iLiving.directives').directive(directive, services);
    }

    /**
     * Register new service.
     *
     * @param className
     * @param services
     */
//    export function registerService (className: string, services = []) {
//        var service = className[0].toLowerCase() + className.slice(1);
//        services.push(() => new iLiving.services[className]());
//        angular.module('iLiving.services').factory(service, services);
//    }
}
