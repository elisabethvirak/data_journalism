//----------SVG----------
//initialize SVG area
var svgWidth = 1000;
var svgHeight = 700;

// define margins for the SVG
var chartMargin = {
    top:30,
    right: 30,
    bottom: 30,
    left: 30
};

// define area for chart
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// add SVG to the webpage
var svg = d3.select('#scatter')
    .append('svg')
    .attr('height', svgHeight)
    .attr('width', svgWidth);

// add chart area to the SVG
var chartGroup = svg.append('g')
    .attr('transform', `translate(${chartMargin.left}, ${chartMargin.top})`);
 

// set initial parameters
var selectionX = 'poverty';
var selectionY = 'householdIncome';

// function to create x-scale
function xAxis()

//----------DATA----------
d3.csv("data.csv").then(data =>{
    console.log(data)

    // create variables
    var abbr = data.map(data => data.abbr);
    var poverty = data.map(data => +data.poverty);
    var age = data.map(data => +data.age);
    var householdIncome = data.map(data => +data.income);
    var healthcare = data.map(data => +data.healthcare);
    var obesity = data.map(data => +data.obesity);
    var smokes = data.map(data => +data.smokes);

    //create x and y axes
    var xScalePov = d3.scaleLinear()
        .domain([0, d3.max(poverty)])
        .range([0, chartWidth]);
    var yScalePov = d3.scaleLinear()
        .domain([])            
    
    var colors = d3.scaleLinear()
        .domain([0,d3.max(data)])
        .range(['green', 'red'])
});
