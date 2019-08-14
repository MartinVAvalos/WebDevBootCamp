///Node Exercise

//Using the command line, create a file "echo.js"

//Inside the file, write a function named echo that takes 2 arguments: a string and a number
//It should print out the string, n number of times
function echo(str, num) {
    for (let i = 0; i < num; i++) {
        console.log(str);
    }
}

echo("Echo!!!", 10); //should print Echo!!! 10 times
echo("Food", 3); //should print Food 3 times