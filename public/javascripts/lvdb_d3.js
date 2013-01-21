/**
 * Created with JetBrains WebStorm.
 * User: kun
 * Date: 1/21/13
 * Time: 10:10 AM
 * To change this template use File | Settings | File Templates.
 */
var lvdb_d3 = (function() {

    function epoch_to_mon_day(epoch)
    {
        var epoch_ms=epoch*1000;
        var date=new Date(epoch_ms);
        var format = d3.format("02d");
// var format = d3.time.format("%Y-%m-%d");
        var mon_day=format(date.getUTCMonth()) + "/" + date.getUTCDate();
        return mon_day;
    }

    return {
        time_chart : function(data,div_id)
            {
                var total_width=800;
                var total_height=400;
                var margin = {top: 20, right: 100, bottom: 100, left: 100},
                    width = total_width - margin.left - margin.right,
                    height = total_height - margin.top - margin.bottom;

                var formatPercent = d3.format(".0%");

                var x = d3.scale.ordinal()
                    .rangeRoundBands([0, width], .1);

                var y = d3.scale.linear()
                    .range([height, 0]);

                var xAxis = d3.svg.axis()
                    .scale(x).ticks(4)
                    .orient("bottom");

                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                var yAxis2 = d3.svg.axis()
                    .scale(y)
                    .orient("right");

//                var svg = d3.select("body").append("svg")
//    var svg = d3.select("d3_svg")
                var svg=d3.select(div_id).append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                console.log("got data");
                x.domain(data.map(function(d) { return epoch_to_mon_day(d.ts); }));
                y.domain([0, d3.max(data, function(d) { return d.count; })]);

                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + height + ")")
                    .call(xAxis)
                    .selectAll("text")
                    .attr("transform", function(d) { return "translate(-15, 15) rotate(-70)"; });

                svg.append("g")
                    .attr("class", "y1 axis")
                    .call(yAxis)
                    .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .text("Hits");

                svg.selectAll(".bar")
                    .data(data)
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("x", function(d) { return x(epoch_to_mon_day(d.ts)); })
                    .attr("width", x.rangeBand()/2)
                    .attr("y", function(d) { return y(d.count); })
                    .attr("height", function(d) { return height - y(d.count); })
                    .append("svg:title")
                    .text(function(d) { return "[Hits:"+d.count+"]"; });

//////////////////////////////////////

            y.domain([0, d3.max(data, function(d) { return d.bytes; })]);

            svg.selectAll(".bar2")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar2")
                .attr("x", function(d) { return x(epoch_to_mon_day(d.ts)); })
                .attr("width", x.rangeBand()/2)
                .attr("y", function(d) { return y(d.bytes); })
                .attr("height", function(d) { return height - y(d.bytes); })
                .attr("transform", function(d) { return "translate("+x.rangeBand()/2+", 0)"; })
                .append("svg:title")
                .text(function(d) { return "[Bytes:"+d.bytes+"]"; });

            svg.append("g")
                .attr("class", "y2 axis")
                .call(yAxis2)
                .attr("transform", "translate("+ width +",0)")
                .append("text")
                .attr("transform", "translate(-20,0)rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .style("text-anchor", "end")
                .text("Bytes");

        },
        method_2 : function()
            {
                // do stuff here
            }
    };
})();