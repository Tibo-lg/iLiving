/// <reference path='../_all.ts' />
var iLiving;
(function (iLiving) {
    (function (directives) {
        'use strict';

        function barGraph() {
            var margin = { top: 20, right: 30, bottom: 30, left: 50 };
            var color = d3.scale.category20();

            return {
                restrict: 'E',
                scope: { devicesconsumption: '=', width: '=', height: '=' },
                link: function (scope, element, attrs) {
                    // set up initial svg object
                    var svg = d3.select(element[0]).append("svg").attr("width", scope.width).attr("height", scope.height).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    scope.$watch('devicesconsumption', function (newDevicesConsumption, oldDevicesConsumption) {
                        var height = scope.height - margin.top - margin.bottom;
                        var width = scope.width - margin.left - margin.right;
                        svg.selectAll('*').remove();

                        if (!newDevicesConsumption)
                            return;

                        var domain = [];

                        newDevicesConsumption.forEach(function (d) {
                            domain.push(d.name);
                        });

                        color.domain(domain);

                        //newDevicesConsumption.date.forEach( function(d){ d = parseDate(d);})
                        var padding = (1 - newDevicesConsumption.length / 10 > 0.3 ? 1 - newDevicesConsumption.length / 10 : 0.3);
                        var x = d3.scale.ordinal().rangeRoundBands([0, width], padding);
                        var y = d3.scale.linear().range([height - 10, 0]);

                        var xAxis = d3.svg.axis().scale(x).orient("bottom");

                        var yAxis = d3.svg.axis().scale(y).orient("left");

                        // .tickFormat(formatPercent);
                        x.domain(newDevicesConsumption.map(function (d) {
                            return d.name;
                        }));
                        y.domain([0, d3.max(newDevicesConsumption, function (d) {
                                return d.consumption;
                            })]);

                        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

                        svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text("kWh");

                        var bar = svg.selectAll(".bar").data(newDevicesConsumption).enter().append("g");
                        bar.append("rect").attr("class", "bar").attr("x", function (d) {
                            return x(d.name);
                        }).attr("width", x.rangeBand()).attr("y", function (d) {
                            return y(d.consumption);
                        }).attr("height", function (d) {
                            return height - y(d.consumption);
                        }).attr("fill", function (d) {
                            return color(d.name);
                        });
                        bar.append("text").attr("x", function (d) {
                            return x(d.name) + (x.rangeBand() / 2);
                        }).attr("y", function (d) {
                            return y(d.consumption) - 5;
                        }).attr("text-anchor", "middle").text(function (d) {
                            return d.cost + "kr.";
                        });
                    });
                }
            };
        }
        directives.barGraph = barGraph;
    })(iLiving.directives || (iLiving.directives = {}));
    var directives = iLiving.directives;
})(iLiving || (iLiving = {}));

iLiving.registerDirective('barGraph', []);
