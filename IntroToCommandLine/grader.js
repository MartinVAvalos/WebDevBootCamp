// Node Exercise 2
// Average Grade

// Create new file, "grader.js"

//In the file define a new function named "average"
//It should take a single parameter: an array of test scores (all numbers)
//It should return the average test score in the array, rounded to the nearest whole number

function average(arr) {
    let average=0;
    for (let i = 0; i < arr.length; i++) {
        average += arr[i];   
    }
    average /= arr.length;
    console.log(Math.round(average));
}

var scores = [90, 98, 89, 100, 100, 86, 94];
average(scores); // it should return 94;

var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
average(scores2); // schould return 68