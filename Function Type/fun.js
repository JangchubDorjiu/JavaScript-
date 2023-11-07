'use strict';
const bookings = [];
const creatBooking = function(flightNum, 
    numPassanger= 1, 
    price = 199 * numPassanger
    ){
    const booking = {
        flightNum,
        numPassanger,
        price,
    }
    console.log(booking);
    bookings.push(booking);
}
creatBooking('LH3A');
creatBooking('A3R4', 3, 1500);
creatBooking('Er3O', undefined, 100);


const flight = 'LH234';
const jangchub = {
    name: 'Jangchub Dorji',
    passport: 24739479284,
};

const checkIn = function(flightNum, passanger) {
    flightNum = 'LH999';
    passanger.name = 'Mr.' + passanger.name;

    if(passanger.passport === 24739479284 ){
        alert('Check In');
    } else {
        alert('Wrong Passport');
    }

}

//checkIn(flight, jangchub);
//console.log(flight);
//console.log(jangchub);
// Is the same as doing...
//const flightNum = fligh;
//const passanger = jangchub;

const newPassport = function() {
    personalbar.passport = Math.trunc(Math.random() * 100000000);

};
newPassport(jangchub);
checkIn(flight, jangchub)

const oneWord = function(str) {
    return str.replace(/ /g, '').toLowerCase();
}

const upperfirstWord = function(str){
   const [first, ...others] =  str.split(' ');
   return [first.toUpperCase(), ...others].join(' ');
}
// higher order function
const transform = function(str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);
    console.log(`Transformed by: ${fn.name}`);

}
transform('JavaScript is the best!', upperfirstWord);
transform('Javascript is the best', oneWord);

// use all the time
const high5 = function(){
    console.log('👋YES');
};
document.body.addEventListener('click', high5);
//document.boby.addEventListener('click', high5);
['jangchub', 'tashi', 'Sonam'].forEach(high5);

// returning function
const greet = function(greeting){
    return function(name){
        console.log(`${greeting} ${name}`);
    };
};
const greetingHey = greet('hey')
greetingHey('jangchub');
greetingHey('Tashi');
greet('hey')('jangchub');
// challange using arrow function

const greetart = greeting => name => console.log(`${greeting} ${name}`);
greetart('HI')('Pema');

// Reviewing this key word
const lufthansa = {
    airline: 'Druk Air',
    iataCode: 'AR',
    bookings: [],
    // book: function()
    book(flightNum, name){
        console.log(
            `${name} booked a seat on ${this.airline} flight ${this.iataCode}
            ${flightNum}`
        );
        //this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
        
        //this.booking.push({ flight: `${this.iataCode}${flightNum}
        //`, name});
    },
}
lufthansa.book(235, 'Jangchub Dorji');
lufthansa.book(236, 'Tashi Dorji');

const eurowing = {
    airline: 'Tashi AIr',
    iataCode: 'EW',
    booking: []
};
const book = lufthansa.book;
// Does NOT work
// book(23, 'Sarah Williams');
//call method
book.call(eurowing, 245, 'Sonam');
console.log(eurowing);
book.call(lufthansa, 237, 'Karma');
console.log(lufthansa);

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: []
}
book.call(swiss, 367, 'Tshewang');
console.log(swiss);
// Apply method
const flightData = [450, 'Sonam Tshering'];
book.apply(swiss, flightData);
console.log(swiss);

book.call(swiss, ...flightData);

// Bind method
const bookWS = book.bind(eurowing);
const bookLH = book.bind(lufthansa);
const bookKLX = book.bind(swiss);
bookWS(23, 'Sonam Phuntsho');

const bookEW23 = book.bind(eurowing, 40);
bookEW23('Lhamo');
bookEW23('Karsal');
// with event listener

lufthansa.planes = 300;
lufthansa.buyPlane = function (){
    console.log(this);
    this.planes++;
}
// lufthansa.buyPlane();
document
    .querySelector('.buy')
    .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const  addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;
console.log(addVAT(100));
console.log(addVAT(23));
// other method
const addTaxRate = function(rate){
    return function(values) {
        return values + values * rate
    };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));
// challange
/*
const poll = {
    question: 'What is your favourite propramming language?',
    option: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generate [0, 0, 0, 0]. More in the next section
    ans: new Array(4).fill(0),
    registerNewAnswer(){
        //get answer
        const lan =
        //Number(prompt(
           // `${this.question}\n${this.option.join('\n')}
        //\n(Write option number)`
       // ));
        Number(
            prompt(
              `${this.question}\n${this.options.join('\n')}\n(Write option number)`
            )
          );
        console.log(lan);
    
    },
}; */
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    ans: new Array(4).fill(0),
    registerNewAnswer() {
        const lan = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`));
        console.log(lan);
        // resgister
        typeof lan === 'number' && lan > this.ans.length &&
        this.ans[ans]++;
        this.displayResults();
        this.displayResults('string');
    },
    displayResults(type = 'array') {
        if (type === ('array')){
            console.log(this.ans);
        } else if (type === 'string') {
            // poll result are 13, 2, 4, 1
            console.log(`poll result are ${this.ans.join(',')}`);
        }
    },
};
 //poll.registerNewAnswer();
document.querySelector('.poll')
.addEventListener('click', poll.registerNewAnswer.
bind(poll));

poll.displayResults.call({ans: [5, 2, 3]}, 'string');
poll.displayResults.call({ans: [1, 5, 3, 6, 2]}, 'string');

// immediately invoke function experssion
const runOnce = function() {
    console.log('This will never run again');
};
runOnce();
//IIFE
(function(){
    console.log('This will never run again');
    const isPrivate = 46;
})
();
//console.log(isPrivate);
(() => console.log('This will also never again'))
();

{
    const isPrivate = 48;
    var notPrivate = 39;
}
//console.log(isPrivate);
console.log(notPrivate);

// Closure
let f;
const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2);
    };
};

const h = function(){
    const b = 777;
    f = function(){
        console.log(b * 2);
    };
};

g();
f();
console.dir(f);
// re-assign the f function
h();
f();
console.dir(f);
// Example 2
const boardPassangers = function (n, wait) {
    const perGroup = n / 3;
    setTimeout(function(){
        console.log(`we are now boarding all ${n} passangers`);
        console.log(`there are 3 groups, each with ${perGroup} passangers`);
    }, wait * 1000);
    console.log(`will start boarding in ${wait} seconds`);
};
const perGroup = 1000;
boardPassangers(180, 3);
// challange
 (function() {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    document.querySelector('body').addEventListener('click',
    function(){
        header.style.color = 'blue';
    });
 })
 ();