
function currency(amount){
return new Intl.NumberFormat('en-IN').format(amount);
}
/* console.log( price);
price=price-1;
console.log(price); 
// Output: ₹1,50,000.00 */

module.exports.india=currency