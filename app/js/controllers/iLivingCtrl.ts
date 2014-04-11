/// <reference path='../_all.ts' />


module iLiving.controllers{

  export class iLivingCtrl{

    private scope: iLivingScope;

    public constructor( $scope :iLivingScope, $window :Window ){
      this.scope = $scope;

      this.scope.height = $window.innerHeight-140;
      this.scope.width  = $window.innerWidth-10;
    }
  }
}

iLiving.registerController('iLivingCtrl', ['$scope', '$window']);
