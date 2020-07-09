function ff(){ 
    return "31" + 9
};
const arr = [223, 2, 34, 4, 9, 98, 905, 503];

function multiply(a, b) {
    return a * b;
}

const multi = arr.reduce(multiply, 1);
console.log('Quantity:', multi);
