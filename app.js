//----------SVG----------
//initialize SVG area
var svgWidth = 750;
var svgHeight = 500;

// define margins for the SVG
var chartMargin = {
    top:30,
    right: 30,
    bottom: 30,
    left: 60
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
 

// // set initial parameters
// var selectionX = 'poverty';
// var selectionY = 'householdIncome';

// // function to create x-scale
// function xAxis()

//----------PLOT----------
d3.csv("data.csv").then(function(data) {
    // console.log(data)

    //cast data as numbers
    data.forEach(function(journalData) {
        journalData.poverty = +journalData.poverty;
        journalData.age = +journalData.age;
        journalData.income = +journalData.income;
        journalData.healthcare = +journalData.healthcare;
        journalData.obesity = +journalData.obesity;
        journalData.smokes = +journalData.smokes;
    });

    //create x and y axes scale functions
    var xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d=> d.poverty)])
        .range([0, chartWidth]);
    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.income)])
        .range([chartHeight, 0]);            
    
    // var colors = d3.scaleLinear()
    //     .domain([0,d3.max(data, d => xScale(d.poverty))])
    //     .range(['green', 'red'])

    //create x and y axes
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    //add axes to the chart
    chartGroup.append('g')
        .attr('transform', `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    chartGroup.append('g')
        .call(leftAxis);

    //add circle
    var circles = chartGroup.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.poverty))
        .attr('cy', d => yScale(d.income))
        .attr('r', '7')
        // .attr('fill', colors)
        .attr('opacity', '.7');
});
