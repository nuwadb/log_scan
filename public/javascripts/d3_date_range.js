var margin = {top: 20, right: 100, bottom: 100, left: 100},
width = 1200 - margin.left - margin.right,
height = 600 - margin.top - margin.bottom;

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

var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var epoch_to_mon_day=function(epoch){
var epoch_ms=epoch*1000;
var date=new Date(epoch_ms);
var format = d3.format("02d");
// var format = d3.time.format("%Y-%m-%d");
var mon_day=format(date.getUTCMonth()) + "/" + date.getUTCDate();
return mon_day;
};

 

d3.json("/lvdb/httpd/time_state?pId=25", function(data) {
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


});