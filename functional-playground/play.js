/********Integers in JS are  Immutable ******************* */
let x = 5; // the state of x is 5 here 
let y = x; // the state of y is same as that of x

y = x * 2; // we are altering the state of y

console.log('x = ' + x); // x is intact, pretty simple
console.log('y = ' + y);

/********Strings in JS are  Immutable ******************* */

x = 'Hello'; // the state of x is Hello here
y = x; // the state of y is same as x

x = x +  ' World'; // altering the state of x

console.log('x = ' + x); 
console.log('y = ' + y); // y is intact

/********Objects in JS are  Mutable ******************* */

x = { foo : 'Hello' };
y = x; // the state of y should be same as x

x.foo +=  ' World'; // altering the state of x

console.log('x = ' + x.foo);
console.log('y = ' + y.foo); // y is also impacted
console.log( x == y);

/********Arrays in JS are  Mutable ******************* */

x = [ 'Red', 'Blue'];
y = x;

x.push('Green');

console.log('x = ' + x); // prints [ 'Red', 'Blue', 'Green' ]
console.log('y = ' + y); // prints [ 'Red', 'Blue', 'Green' ]

/********Forcing immutability on Objects ******************* */
x = { foo : 'Hello' };
y = x;

Object.freeze(x);

// y.foo +=  ' World'; -- uncomment this will throw error, both x and y are made read-only. 

console.log('x = ' + x.foo);
console.log('y = ' + y.foo);

