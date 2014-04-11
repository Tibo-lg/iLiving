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

    public constructor( $scope :ApplianceUsageScope, $filter: ng.IFilterService ){
      this.scope = $scope;

      this.scope.height = $scope.$parent.height;
      this.scope.width  = $scope.$parent.width;

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
      { 'name': "Oven4", 'consumption': 2.4, 'cost': 5.60 },
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
      { 'name': "Oven4", 'consumption': 5.4, 'cost': 5.60 },
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
      { 'name': "Oven4", 'consumption': 2.4, 'cost': 5.60 },
	];
      this.totalOneHour = $filter('orderBy')(this.totalOneHour, '-consumption');
      this.totalOneDay = $filter('orderBy')(this.totalOneDay, '-consumption');
      this.totalThreeDays = $filter('orderBy')(this.totalThreeDays, '-consumption');
      this.appliancePerPage = Math.floor((this.scope.width - 150) / 150);

      this.nbRange = Math.ceil(this.totalOneHour.length/this.appliancePerPage); 

      this.scope.previousRange = ()=>{this.previousRange()};
      this.scope.nextRange = ()=>{this.nextRange()};

      this.curTotalConsumption = this.totalOneHour;

      this.scope.resolutionClass = (resolution)=>{return this.resolutionClass(resolution);};
      this.scope.setResolution = (resolution)=>{ return this.setResolution(resolution);};

      this.setCurRange();
      
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

iLiving.registerController('ApplianceUsageCtrl', ['$scope', '$filter']);
