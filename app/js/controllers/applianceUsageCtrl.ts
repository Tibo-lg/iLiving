/// <reference path='../_all.ts' />


module iLiving.controllers{


  export interface ApplianceUsageScope{
    devicesconsumption: Array<DeviceConsumption>;
    height: number;
    width: number;
    previousRange: Function;
    nextRange: Function;
    resolutionClass: Function;
    setResolution: Function;
    $parent: iLivingScope;
  }

  export class ApplianceUsageCtrl{

    private scope: ApplianceUsageScope;

    private appliancePerPage: number;
    private curRange: number = 0;
    private curResolution: string = "1h";
    private nbRange: number;

    private totalOneHour: Array<DeviceConsumption>;
    private totalOneDay: Array<DeviceConsumption>;
    private totalThreeDays: Array<DeviceConsumption>;

    private curTotalConsumption: Array<DeviceConsumption>;

    private filter: ng.IFilterService;

    static $inject = ['$scope', '$filter', 'dataFactory'];

    public constructor( $scope :ApplianceUsageScope, $filter: ng.IFilterService, dataFactory ){
      this.scope = $scope;
      this.filter = $filter;

      this.scope.height = $scope.$parent.height;
      this.scope.width  = $scope.$parent.width;
      this.scope.previousRange = ()=>{this.previousRange()};
      this.scope.nextRange = ()=>{this.nextRange()};
      this.scope.resolutionClass = (resolution)=>{return this.resolutionClass(resolution);};
      this.scope.setResolution = (resolution)=>{ return this.setResolution(resolution);};

      dataFactory.getAppUse("onehour").success(
	  (result) => {this.initOneHour(result);}
	  );
      dataFactory.getAppUse("oneday").success(
	  (result) => {this.initOneDay(result);}
	  );
      dataFactory.getAppUse().success(
	  (result) => {this.initThreeDay(result);}
	  );
      
    }

    private initOneHour(result){
      this.totalOneHour = result; 

      //console.debug(this.totalOneHour);
      this.totalOneHour = this.filter('orderBy')(this.totalOneHour, '-consumption'); 
      this.appliancePerPage = Math.floor((this.scope.width - 150) / 150);

      this.nbRange = Math.ceil(this.totalOneHour.length/this.appliancePerPage); 

      this.curTotalConsumption = this.totalOneHour;

      this.setCurRange();
    }

    private initOneDay(result){
      this.totalOneDay = result;
      this.totalOneDay = this.filter('orderBy')(this.totalOneDay, '-consumption'); 
    }

    private initThreeDay(result){
      this.totalThreeDays = result;
      this.totalThreeDays = this.filter('orderBy')(this.totalThreeDays, '-consumption'); 
    }

    public previousRange(){
      if( this.curRange > 0 ){
	this.curRange--;
	this.setCurRange();
      }
    }
    public nextRange(){
      if(this.curRange < this.nbRange-1){
	this.curRange++;
	this.setCurRange();
      }
    }

    private setCurRange(){
      var start = (this.curRange * (this.appliancePerPage)),
	  end = ((this.curRange+1) * this.appliancePerPage); 
      this.scope.devicesconsumption = this.curTotalConsumption.slice( start, end );
    }

    public resolutionClass(resolution: string)
    {
      return resolution === this.curResolution ? 'active' : '';
    }

    public setResolution(resolution: string)
    {
      if( resolution === "1h"){
	this.curTotalConsumption = this.totalOneHour;
      }
      else if( resolution == "1d" ){
	this.curTotalConsumption= this.totalOneDay;
      }
      else if( resolution == "3d" ){
	this.curTotalConsumption = this.totalThreeDays;
      }
      else{
	return;
      }
      this.curResolution = resolution;
      this.setCurRange();
    }
  }

}

iLiving.registerController('ApplianceUsageCtrl', ['$scope', '$filter', 'dataFactory']);
