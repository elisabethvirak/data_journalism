// @TODO: YOUR CODE HERE!
function init() {
    d3.csv("data.csv").then(data =>{
        console.log(data)
    });
};

init();