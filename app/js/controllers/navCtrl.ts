/// <reference path='../_all.ts' />


module iLiving.controllers{
  export interface navScope{
    navClass : Function;
  }

  export class NavCtrl{

    private scope : navScope;

    constructor($scope :navScope, $location){
      this.scope = $scope;
      this.scope.navClass = function (page) {
	var currentRoute = $location.path().substring(1) || 'timed-usage';
	return page === currentRoute ? 'active' : '';
      };
    }
  }
}

iLiving.registerController('NavCtrl', ['$scope', '$location']);
