/// <reference path='../_all.ts' />
var iLiving;
(function (iLiving) {
    (function (directives) {
        'use strict';

        function stackedAreaGraph() {
            var margin = { top: 20, right: 30, bottom: 30, left: 50 };
            var color = d3.scale.category20();
            var labelWidth = 120;

            return {
                restrict: 'E',
                scope: { timeserie: '=', width: '=', height: '=' },
                link: function (scope, element, attrs) {
                    // set up initial svg object
                    var svg = d3.select(element[0]).append("svg").attr("width", scope.width).attr("height", scope.height).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
                    var parseDate = d3.time.format("%X").parse;
                    scope.$watch('timeserie', function (newTimeSerie, oldTimeSerie) {
                        var height = scope.height - margin.top - margin.bottom;
                        var width = scope.width - margin.left - margin.right;
                        var yMax = 0;
                        var layers;
                        svg.selectAll('*').remove();

                        if (!newTimeSerie)
                            return;

                        var domain = [];

                        for (var k in newTimeSerie.values) {
                            domain.push(k);
                        }

                        color.domain(domain);

                        //newTimeSerie.date.forEach( function(d){ d = parseDate(d);})
                        var date = [];
                        for (var i = 0; i < newTimeSerie.date.length; i++) {
                            date[i] = parseDate(newTimeSerie.date[i]);
                        }

                        var stack = d3.layout.stack().values(function (d) {
                            return d.values;
                        });

                        layers = stack(color.domain().map(function (name) {
                            return {
                                name: name,
                                values: newTimeSerie.values[name].map(function (d, i) {
                                    return { x: date[i], y: d };
                                })
                            };
                        }));

                        var area = d3.svg.area().x(function (d) {
                            return x(d.x);
                        }).y0(function (d) {
                            return y(d.y0);
                        }).y1(function (d) {
                            return y(d.y0 + d.y);
                        }).interpolate('cardinal');

                        var x = d3.time.scale().range([0, width - labelWidth]);
                        var y = d3.scale.linear().range([height, 0]);
                        x.domain(d3.extent(date));
                        y.domain([0, d3.max(layers[layers.length - 1].values.map(function (d) {
                                return (d.y + d.y0);
                            }))]);

                        var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%H:%M"));

                        var yAxis = d3.svg.axis().scale(y).orient("left");

                        // .tickFormat(formatPercent);
                        var layer = svg.selectAll(".layer").data(layers).enter().append("g").attr("class", "layer");

                        layer.append("path").attr("class", "area").attr("d", function (d) {
                            return area(d.values);
                        }).style("fill", function (d) {
                            return color(d.name);
                        });

                        var minY = y(0);

                        var label = layer.append("g").datum(function (d) {
                            return { name: d.name, value: d.values[d.values.length - 1] };
                        }).attr("transform", function (d, i) {
                            var yLabel = y(d.value.y0 + d.value.y / 2);
                            (yLabel < minY ? null : yLabel = minY);
                            minY = yLabel - 45;
                            return "translate(" + x(d.value.x) + "," + yLabel + ")";
                        }).attr("class", "label");

                        //.text(function(d) { return d.name; });
                        label.append("ellipse").attr("rx", "60").attr("ry", "20").attr("cx", "+70").attr("fill", function (d) {
                            return color(d.name);
                        });
                        label.append("text").attr("dx", function (d) {
                            return 70;
                        }).attr("dy", ".35em").attr("text-anchor", "middle").text(function (d) {
                            return d.name;
                        });
                        svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

                        svg.append("g").attr("class", "y axis").call(yAxis);
                    });
                }
            };
        }
        directives.stackedAreaGraph = stackedAreaGraph;
    })(iLiving.directives || (iLiving.directives = {}));
    var directives = iLiving.directives;
})(iLiving || (iLiving = {}));

iLiving.registerDirective('stackedAreaGraph', []);
