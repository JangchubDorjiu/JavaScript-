// Data
const account1 = {
    owner: 'Jangchub Dorji',
    movements: [200, 450, -400, 300, -650, -130, 70, 1300],
    interesRate: 1.2, // %
    pin:1111,
    movementsDates: [
        '2023-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-01-28T09:15:04.904Z',
        '2020-04-01T10:17:24.185Z',
        '2020-05-08T14:11:59.604Z',
        '2020-05-26T17:01:17.194Z',
        '2020-07-28T23:36:17.929Z',
        '2020-08-20T10:51:36.790Z',
      ],
      currency: 'EUR',
      locale: 'pt-PT', // de-DE
};
const account2 = {
    owner: 'Tashi Dorji',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interesRate: 1.5, // %
    pin:2222,
    movementsDates: [
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-01-25T14:18:46.235Z',
        '2020-02-05T16:33:06.386Z',
        '2020-04-10T14:43:26.374Z',
        '2020-06-25T18:49:59.371Z',
        '2023-09-20T12:01:20.894Z',
      ],
      currency: 'USD',
      locale: 'en-US',
};

const account3 = {
    owner: 'Kezang Dorji',
    movements: [200, -200, -340, -300, -20, 50, 400, -460],
    interesRate: 0.7, // %
    pin:3333,

};

const account4 = {
    owner: 'Leki Wangmo',
    movements: [430, 1000, 700, 50, 90],
    interesRate: 1, // %
    pin:4444,
};
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//function
//morgan.codes-theme
const formaMovement = function(date, locale){
const calcDayPassed = (date1 , date2) =>
   Math.round(Math.abs(date1 - date2) / (1000 * 60 * 60 * 24)); 
const daysPassed = calcDayPassed(new Date(), date);
if(daysPassed === 0) return 'Today';
if(daysPassed === 1) return 'Yesterday';
if(daysPassed <= 7) return `${daysPassed} days ago`;
else {

    return new Intl.DateTimeFormat(locale).format(date);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();
    //  return`${day}/${month}/${year}`;
}
};
const formtCur = function(values, locale, currency){
    return new Intl.NumberFormat(locale,
        {
            style: 'currency',
            currency: currency,
        }).format(values);
}
const displayMovements = function(acc, sort = false) {
    containerMovements.innerHTML = '';
    // textContent

    const movs = sort ? acc.movements.slice().sort((a, b) =>
    a - b) : acc.movements;
    movs.forEach(function(mov, i){
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const date = new Date(acc.movementsDates[i]);
        const DisplayDate = formaMovement(date, acc.locale);
        const formatedMov = formtCur(mov, acc.locale, acc.currency);
        const html = `
        <div class="movements__row">
          <div class="movements__type 
          movements__type--${type}">
          ${i + 1 }${type}€</div>
          <div class="movements__date">${DisplayDate}</div>
          <div class="movements__value">${formatedMov}</div>
        </div>
        `;
        containerMovements.insertAdjacentHTML('afterbegin', html)
    });
};

const calcDisplayBalance = function(acc){
    acc.balance = acc.movements.reduce((acc, mov) => 
    acc + mov, 0);
    labelBalance.textContent = formtCur(acc.balance, 
        acc.locale, acc.currency);
};

const calcDisplaySummary = function(acc){
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = formtCur(incomes, acc.locale,
        acc.currency)

    const outdrew = acc.movements
        .filter(mov => mov < 0 )
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = formtCur(Math.abs(outdrew), acc.locale, acc.currency);

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interesRate) / 100)
        .filter((int, i, arr) => {
            console.log(arr);
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = formtCur(interest, 
        acc.locale, acc.currency);
}

const createUsername = function(accs){
    accs.forEach(function(acc){
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
    });
};
createUsername(accounts);
const updateUI = function(acc){
    // Display movements
displayMovements(acc);
//Display balance
calcDisplayBalance(acc);
// Display Summary
calcDisplaySummary(acc);
};

const startLogoutTimer = function(){
  const tick =  function(){
        const min = String(Math.trunc(time / 60)).padStart(
            2, 0);
        const sec = String(Math.trunc(time % 60)).padStart(
            2, 0);
         // In each call, print the remaining time to UI
         labelTimer.textContent = `${min}: ${sec}`;
         //decrease 1s
         //When 0 seconds, stops timer and logout user
         if(time === 0){
            clearInterval(timer);
            labelWelcome.textContent = 'Log in to get started'
            containerApp.style.opacity = 0;
         }
         time--
        };
    // set time to 5 minutes
    let time = 120;
    tick();
    //call the time every second
    const timer = setInterval(tick, 1000);
    return timer;
};
// event handler
let currentAccount, timer;
//Fake always Logged in
// currentAccount = account1
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//Experimenting API


btnLogin.addEventListener('click', function(e){
    // Prevent from default submitting
    e.preventDefault();
currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
console.log(currentAccount);

if(currentAccount?.pin === +inputLoginPin.value);
// Display UI and Message
labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
containerApp.style.opacity = 100;
// create current date and time
const nows = new Date();
const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    weekday: 'long',
};
// const locals = navigator.language;
// console.log(locals);
labelDate.textContent = new Intl.DateTimeFormat
(currentAccount.locale, options).format(nows);
// const nows = new Date();
// const date = nows.getDate();
// const month = `${nows.getMonth() + 1}`.padStart(2, 0);
// const year = nows.getFullYear();
// const hours = `${nows.getHours()}`.padStart(2, 0);
// const min = `${nows.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${date}/${month}/${year}, ${hours}:${min}`;

// clear input field
inputLoginUsername.value = inputLoginPin.value = '';
// or
// inputLoginUsername.value = '';
// inputLoginPin.value = '';
inputLoginPin.blur();
// call the tiimeinterval
// Timer
if (timer) clearInterval(timer);
timer = startLogoutTimer();
// Update UI
updateUI(currentAccount);
});

btnTransfer.addEventListener('click', function(e){
    (e).preventDefault()
    const amount = +inputTransferAmount.value;
    const receiverAcc = accounts.find(
        acc => acc.username === inputTransferTo.value
    );
    inputTransferAmount.value = inputTransferTo.value = '';

    if(amount > 0 && 
       receiverAcc &&
       currentAccount.balance >= amount &&
       receiverAcc?.username !== currentAccount.username) {
        // Doing the transfar 
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        //Tarnsform date and time
        currentAccount.movementsDates.push(new Date().toISOString());
        receiverAcc.movementsDates.push(new Date().toISOString());
        // Update UI
        updateUI(currentAccount);
        //Reset timer
        clearInterval(timer);
        timer = startLogoutTimer();
       }
    
});
btnLoan.addEventListener('click', function(e){
    e.preventDefault();
    const amount = Math.floor(inputLoanAmount.value);
    if(amount > 0 && currentAccount.movements.some(mov =>
        mov >= amount * 0.1)){

    setTimeout(function(){
            currentAccount.movements.push(amount);

        // add date and time 
            currentAccount.movementsDates.push(new Date().toISOString());
        // update UI
        updateUI(currentAccount);
        clearInterval(timer);
        timer = startLogoutTimer();
    }, 2500);
        }
    inputLoanAmount.value = '';
});
btnClose.addEventListener('click', function(e){
    e.preventDefault();
    if(
        inputCloseUsername.value === currentAccount
        .username && 
        inputClosePin.value === currentAccount.pin );

        const index = accounts.findIndex(acc =>
            acc.username === currentAccount.username);
            console.log(index);
            // delete account
        accounts.splice(index, 1);
        // Hide UI
        containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function(e){
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

console.log(0.1 + 0.2 === 0.3) // false
console.log('23');
console.log(23);

// converting to number
console.log(Number('23'));
console.log(+'23');
// Parsing
// it is golbal variables
//syntax parseInt('string', radix)
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e32', 10));
console.log(Number.parseFloat('2.5'));
console.log(Number.parseInt('2.5'));

// traditional way
// console.log(parseInt('23', 10));
//Check if value is NaN
console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20'))
console.log(Number.isNaN(23 / 0));

//Checking value is a number
console.log(Number.isFinite(23));
console.log(Number.isFinite('23'));
console.log(Number.isFinite(+'20x'));
console.log(Number.isFinite(23 / 0));

console.log(Number.isInteger(23));
console.log(Number.isInteger('23'));
console.log(Number.isInteger(23 / 0)); 

//Math Operation
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(25 ** (1 / 3));
console.log(8 ** 2);

console.log(Math.max(23, 45, 60 , 4));
console.log(Math.min(23, 45, 60 , 4));
console.log(Math.max(5, 30, '23', 7,));
console.log(Math.max(5, 30, '23px', 7,));

console.log(Math.PI * Number.parseFloat('10px')* 2);
console.log(Math.trunc(Math.random() * 6 + 1));

const randomInt = (min, max) => 
        Math.floor(Math.random() * (max - min) + 1 ) + min;
console.log(randomInt(10, 20));

console.log(Math.round(23.4));
console.log(Math.round(23.7));

console.log(Math.ceil(76.4));
console.log(Math.ceil(76.7));

console.log(Math.floor(23.3));
console.log(Math.floor('23.9'));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3));
console.log(Math.floor(23.3));

//Floating Points
//Rounding decimals

console.log((2.5).toFixed(0));
console.log((2.3).toFixed(3));
console.log(+(2.3458).toFixed(2));
let a = 10;
a--;
a++;
console.log(a);

labelBalance.addEventListener('click', function() {
[...document.querySelectorAll('.movements__row')].
    forEach(function(row , i){
        // 0, 2, 4, 6
        if(i % 2 === 0) row.style.backgroundColor = 'green';
        if(i % 3 === 0) row.style.backgroundColor = 'blue';
    });
});

//BigInt
console.log(Number.MAX_SAFE_INTEGER);

console.log(32476578970756432235e6789065443);
console.log(BigInt(243456874455));
console.log(2537375383935628229n); // This will not produce an error and will log the BigInt value

const huge = 23837345346287919692n;
const num = 20;
console.log(huge * BigInt(num));

console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);

console.log(huge + ' is really big ');
console.log(huge);

const now = new Date();
console.log(now);

//const future = new Date(2023, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(new Date(1700385780000));

// console.log(Date.now());
// future.setFullYear(2024)
// console.log(future);

const future = new Date(2023, 10, 19, 15, 23);
console.log(+future);

const calcDayPassed = (date1 , date2) =>
    Math.abs(date1 - date2) / (1000 * 60 * 60 * 24);
const days = calcDayPassed( new Date(2023, 10, 19), new Date(2023, 10, 30));
console.log(days);

// Number formating
const numb = 35648366.4578;
// optional available are unit, currency and celsius
const options = {
    style: 'unit',
    unit: 'mile-per-hour',
    currency: 'EUR',
};
console.log('US:', new Intl.NumberFormat('en-us', options).format(numb));
console.log('Bhutan:', new Intl.NumberFormat('BT', options).format(numb));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(numb))
console.log(
    navigator.language, new Intl.NumberFormat(navigator.language, options).format(numb)
);

// setTimeout
const ingredients = ['Cheese'];
const pizzaTimer = setTimeout((ing1, ing2
) => console.log(`Here is your pizza with ${ing1} and ${ing2}`), 3000, 
...ingredients);
console.log('Waiting....');
if(ingredients.includes('Egg')) clearTimeout(pizzaTimer);

// setInterval
setInterval(function(){
    const now = new Date();
    console.log(now)
}, 1000)


