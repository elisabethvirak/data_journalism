//----------SVG----------
//initialize SVG area
var svgWidth = 750;
var svgHeight = 500;

// define margins for the SVG
var chartMargin = {
    top:30,
    right: 30,
    bottom: 60,
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
        .domain([0, d3.max(data, d => d.healthcare)])
        .range([chartHeight, 0]);            
    
    var colors = d3.scaleLinear()
        .domain([0, d3.max(data)])
        .range(['#FFB832', '#C61C6F'])

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
        .attr('cy', d => yScale(d.healthcare))
        .attr('r', '12')
        .attr('fill', 'red')
        .attr('opacity', '.8');
    //add state abbreviations to circles
    var stateText = chartGroup.append('g')
        .selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'stateText')
        .attr('x', d => xScale(d.poverty))
        .attr('y', d => yScale(d.healthcare))
        .attr('dy', '.40em')
        .text(d => d.abbr);

    //add axes labels
    //y axis label
    chartGroup.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 0 - chartMargin.left + 20)
        .attr('x', 0 - (chartHeight / 2))
        .attr('dy', '1em')
        .attr('class', 'aText')
        .text('Lacks Healthcare (%)')
    //x axis label
    chartGroup.append('text')
        .attr('transform', `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 20})`)
        .attr('class', 'aText')
        .text('In Poverty (%)')
});
