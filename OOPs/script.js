'use strict';
/*
const Person = function(firstName, birthYear){
    //Instance properties
 this.firstName = firstName;
 this.birthYear = birthYear;
 // never do this
//  this.calcAge = function(){
//     console.log(2023 - this.birthYear)
//  }
}
const intro = new Person('jangcub', 2001);
console.log(intro);
// 1. New {} is created
//2. function is called, this = {}
//3.{} linked to prototype
//4. function automatically return {}
const tashi = new Person('Tashi', 2007);
const kezang = new Person('Kezang', 2011);
console.log(tashi, kezang);
//check the instance
console.log(kezang instanceof Person);

Person.hey = function(){
    console.log('Hey There!');
    console.log(this);
};
Person.hey();
// prototype
console.log(Person.prototype);
Person.prototype.calcAge = function(){
    console.log(2023 - this.birthYear);
}

intro.calcAge();
kezang.calcAge();

console.log(kezang.__proto__);
console.log(kezang.__proto__ === Person.prototype);
console.log(Person.prototype.isPrototypeOf(tashi));
console.log(Person.prototype.isPrototypeOf(kezang));
console.log(Person.prototype.isPrototypeOf(Person));

//.prototypeOfLinkedObjects
Person.prototype.species = 'Homo Sapiens';
console.log(kezang);
console.log(kezang.species);

console.log(kezang.hasOwnProperty('firstName'));
console.log(kezang.hasOwnProperty('species'));

console.log(kezang.__proto__);
// Object.prototype (top of prototype chain)
console.log(kezang.__proto__.__proto__);
console.log(kezang.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor); 

// Array
const arr = [3, 6, 6, 5, 9, 5]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__=== Array.prototype);

console.log(arr.__proto__.__proto__);
//create method
Array.prototype.unique = function(){
    return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1');
console.log(h1);
console.dir(x => x + 1);

//challange
const Car = function(makes, speed){
    this.makes = makes;
    this.speed = speed;
}
Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.makes} is going at ${this.speed} km/h`);
};
Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.makes} is going at ${this.speed} km/h`); 
}
const bwm = new Car('bmw', 120);
const mercedes = new Car('mercedes', 95);
bwm.accelerate();
bwm.brake();
bwm.accelerate();
bwm.brake();
bwm.accelerate();
*/

// ES6 classes
//class expression
//const PersonCl = class {}

//class decleration
// class PersonCl {
//     constructor(fullname, birthYear) {
//         this.fullname = fullname;
//         this.birthYear = birthYear;
//     } 
//     // Instance method
// // Method will be added to .prototype
//     calcAge() {
//         console.log(2023 - this.birthYear);
//     }
//     greet() {
//             console.log(`Hey ${this.firstName}`)
//     }
//     get age(){
//         return 2022 - this.birthYear; 
//     }
// // set the property that is already exist
//     set fullname(name){
//         console.log(name);
//         if(name.includes(' ')) this._fullName = name;
//         else alert(`${name} is not full name`)
//     }

//     get fullname(){
//         return this._fullname;
//     }
//     // static method
//     static hey() {
//         console.log('HI laaaaaaaaaaa');
//         console.log(this);
//     }
// }
// const jangchub = new PersonCl('jangcub dorji', 2001);
// console.log(jangchub);
// jangchub.calcAge();
// jangchub.greet();
// console.log(jangchub.age); 
// const water = new PersonCl('Kezang Dorji',2011);
// console.log(water);

// PersonCl.hey();
//1. Classes are NOT hoisted
//2. Classes are first-class citizes
//3. Classes are excuted in strict mode

// Getter and Setter

const account = {
    owner: 'Dorji',
    movements: [200, 530, 120, 300],

    get latest() {
        return this.movements.slice(-1).pop();
    },

    set latest(mov) {
        this.movements.push(mov);
    },
};

console.log(account.movements);
account.latest = 50;
console.log(account.movements);
// callback 

// function one (call_two){
//     console.log('Come here!');
//  call_two();
// }
// function two (){
//     console.log('i am coming')
// }
// one(two);

// let order = (calling) => {
//    console.log('I am Jangchub ');
//    calling();
// };

// let production = () => {
// console.log('I am kezang')
// };
// order(production);

let stocks = {
    Fruits: ['apple', 'mango', 'Orange', 'watermalone'],
    liquid: ['water', 'ice'],
    holder: ['cone', 'cup']
};

let orders = (furit_name, call_production) => {
   setTimeout(() => {
    console.log(`${stocks.Fruits[furit_name]} is selected`);
    call_production();
   }, 3000);
   //call_production();
};

let productions = () => {
    setTimeout(() => {
    console.log('Production has started');

    setTimeout(() => {
            console.log('The fruit has been chopped');
        setTimeout(()=> {
            console.log(`${stocks.liquid[0]} and ${stocks.liquid[1]} was added`);
        }, 1000)
    }, 2000)
    }, 0)
};
orders(2, productions);

// Object.create
const PersonPoto = {
    calcAge() {
        console.log(2023 - this.birthYear);
    },

    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonPoto);
console.log(steven);
steven.name = 'steven';
steven.birthYear = 2001;
steven.calcAge();

const bolo = Object.create(PersonPoto);
bolo.init('sonam', 2015);
bolo.calcAge();

//challange
class CarCl  {
        constructor(makes, speed){
    this.makes = makes;
    this.speed = speed;
}
accelerate() { 
    this.speed += 10;
    console.log(`${this.makes} is going at ${this.speed} km/h`);
};
brake(){
    this.speed -= 5;
    console.log(`${this.makes} is going at ${this.speed} km/h`); 
}

get speedUs(){
    return this.speed / 1.6;
}
set speedUs(speed) {
    this.speed = speed * 1.6
}
};
const ford = new CarCl('fard', 120);
ford.accelerate();
ford.brake();
ford.speedUs = 50
console.log(ford);

const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
};
 Person.prototype.calcAge = function(){
    console.log(2023 - this.birthYear);
 }
 const Student = function(firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);
    this.course = course;
 };
// Linking prototypes
 Student.prototype = Object.create(Person.prototype);
 Student.prototype.intro = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
 }

 const jang = new Student('jangchub', 2001, 'computer science');
 jang.intro();
 jang.calcAge();

 console.log(jang.__proto__);
 console.log(jang.__proto__.__proto__);

 console.log(jang instanceof Student);
 console.log(jang instanceof Person);
 console.log(jang instanceof Object);

 Student.prototype.constructor = Student;
 console.dir(Student.prototype.constructor);

 //challange
const Cars = function(make, speed){
    this.make = make;
    this.speed = speed;
};

Cars.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

Cars.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make}is going at ${this.speed} km/h`);
};

const EV = function(make, speed, charge){
    Cars.call(this, make, speed);
    this.charge = charge;
}
//link the prototype
EV.prototype = Object.create(Cars.prototype);
EV.prototype.chargeBattery = function (chargeTO){
    this.charge = chargeTO;
}

EV.prototype.accelerate = function() {
    this.speed += 20;
    this.charge--;
    console.log(`
    ${this.make} is going at ${this.speed} km/h, with  charge of ${this.charge}`);
}
const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
tesla.brake();
tesla.accelerate();
console.log(tesla);

class PersonCl {
    constructor(fullname, birthYear){
        this.fullname = fullname;
        this.birthYear = birthYear;
    }
    // Instance methods
    calcAge(){
        console.log(2023 - this.birthYear);
    }
    greet(){
        console.log(`${thi.fullname}`);
    }
    get age(){
        return 2023 - this.birthYear;
    }
    set fullname(name) {
        if(name.includes(' ')) this._fullname = name;
        else alert(`${name} is not full name!`)
    }
    get fullname(){
        return this._fullname;
    }
    //static method
    static hey(){
        console.log('Hey there!');
    }
}
// extend is used to link prototype
class StudentCl extends PersonCl {
    constructor(fullname, birthYear, course){
        // always needs to happen first!
        super(fullname, birthYear);
        this.course = course;
    }
    intro(){
        console.log(`My name is ${this.fullname} and I study ${this.course}`);
    }
    calcAge(){
        console.log(`I am ${2023 - this.birthYear} years old`);
    }
}
const tshewang = new StudentCl('Jangchub Dorji', 2005, 'Computer Science');
tshewang.intro();
tshewang.calcAge();

// inheritance between 'Classes': Object.create
const PersonPro = {
    calcAge() {
        console.log(2023 - this.birthYear);
    },
    init(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const bro = Object.create(PersonPro);
//creating object
const studentProto = Object.create(PersonPro);
studentProto.init = function(firstName, birthYear, course){
    PersonPro.init.call(this, firstName, birthYear);
    this.course = course
};
studentProto.intro = function(){
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}
 const jay = Object.create(studentProto);
jay.init('Jay', 2010, 'computer science');
jay.intro();
jay.calcAge();

//Practices
// Four differeny types of filed and method
//1.Private field
//2.Public field
//3.Private method
//4.Public method
//(there is also static version)
class Account {
    // Public field (instances)
    local = navigator.language;
    //2) Private field(instances)
    #movements = [];
    #pin;
    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
         //protected property
        this.#pin = pin;
        // this._movements = [];
        // this.local = navigator.language;
        console.log(`Thanks for opening an account, ${owner}`);
    }
    //public method
    //public interface
    getMovements(){
        return this.#movements;
    }
    deposit(val){
        this.#movements.push(val);
        return this;
    }

    withdraw(val){
        this.deposit(-val);
        return this;
    }
    _approveLoan(val){
        return true;
    }
    requestLoan(val){
        //if(this.#approveLoan(val)){ }
        if(this._approveLoan(val)){
            this.deposit(val);
            console.log(`Loan approved`);
            return this;
        }
    }
    // private method
    // #approveloan(val)
    _approveLoan(val){
        return true;
    }
    static hepler(){
        console.log('Help Me!');
    }
}
const acct1 = new Account('jangchub', 'EUR', 1111);
//acct1.movements.push(350);
//acct1.movements.push(-120);
acct1.deposit(300);
acct1.withdraw(140);
acct1.requestLoan(100);
//acct1.approveLoan(100);
console.log(acct1);
//console.log(acct1.#pin);
//console.log(acct1._movements); (not allowed)
console.log(acct1.getMovements());
Account.hepler();

//Chaining
acct1.deposit(300).deposit(500).withdraw(400).requestLoan(40000);
console.log(acct1.getMovements());
// Challange 
class Carsclass {
    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    }

    accelerate(){
        this.speed += 10;
        console.log(`S{this.make} is going at ${this.speed} km/h`);
    }

    brake(){
        this.speed -= 5;
        console.log(`S{this.make} is going at ${this.speed} km/h`);
        return this;
    }

    get speedUS(){
        return this.speed / 1.6;
    }

    set speedUS(speed){
        this.speed = speed * 1.6;
    }
}

class EVCLS extends Carsclass{
    #charge;
    constructor(make, speed, charge) {
        super(make, speed);
        this.#charge = charge;
    }

    chargeBattery(chargeTO){
        this.#charge = chargeTO;
        return this;
    }

    accelerate() {
        this.speed += 20;
        this.#charge--;
        console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}`);
        return this;
    }
}
 const sangay = new EVCLS('Sangay', 120, 23);
 console.log(sangay);
// console.log(sangay.#charge);
sangay
.accelerate()
.accelerate()
.accelerate()
.brake()
.chargeBattery(50)
.accelerate();

console.log(sangay.speedUS);

const person = {
     name: "jd",
     age: 80,
};
const keys = Object.keys(person);
console.log(keys);