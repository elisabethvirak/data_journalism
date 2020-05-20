// @TODO: YOUR CODE HERE!
d3.csv("data.csv").then(data =>{
    console.log(data)
     
    // create variables
    var abbr = data.map(data => data.abbr);
    console.log('abbr', abbr);
});
