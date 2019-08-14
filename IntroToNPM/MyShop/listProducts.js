var faker = require('faker');


function randomProduct() {
    var productName = faker.commerce.productName();
    var price = faker.commerce.price();
    console.log(productName + "  -  $" + price);
}

console.log("=======================");
console.log("  WELCOME TO MY SHOP  ");
console.log("=======================");
for (let i = 0; i < 10; i++) {
    randomProduct();
}