'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${data.population.toLocaleString()}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
                <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
            </div>
        </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
     countriesContainer.style.opacity = 1;
};

const renderError = function (msg){
    countriesContainer.insertAdjacentText('beforeend',
    msg);
     countriesContainer.style.opacity = 1;
}


///////////////////////////////////////

// const renderCountry = function(data, className = '') {
//     const html = `
//         <article class="country ${className}">
//             <img class="country__img" src="${data.flags.png}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name.common}</h3>
//                 <h4 class="country__region">${data.region}</h4> <!-- Fixed the class attribute here -->
//                 <p class="country__row"><span>👫</span>${data.population.toLocaleString()}</p>
//                 <p class="country__row"><span>🗣️</span>${data.languages[Object.keys(data.languages)[0]]}</p>
//                 <p class="country__row"><span>💰</span>${data.currencies[Object.keys(data.currencies)[0]].name}</p>
//             </div>
//         </article>
//     `;
//     countriesContainer.insertAdjacentHTML('beforeend', html);
//     countriesContainer.style.opacity = 1;
// };

// const getCountryData = function (country){
//     fetch(`https://restcountries.com/v3.1/name/${country}`) // Fixed the template string here
//     .then(Response => Response.json())
//     .then(data => renderCountry(data[0]));
//     const neighbor = data[0].borders[0];

//     if(!neighbor) return;
//     //country 2
//     return fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
//             .then(Response => Response.json())
//             .then(data => renderCountry(data, 'neighbor'))
    
// };
// getCountryData('bhutan');
// const getCountryData = function (country) {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => {
//             console.log(response)

//             if(!response.ok)
//                 throw new Error(`Country not found (${response.status})`)
//            return response.json()})
//         .then(data => {
//             renderCountry(data[0]);

//             const neighbor = data[0].borders[0];
//             if (!neighbor) return;

//             fetch(`https://restcountries.com/v3.1/alpha/${neighbor}`)
//                 .then(response => {
//                     if(!response.ok)
//                     throw new Error(`Country not found (${response.status})`)
                   
//                     return response.json()})
//                 .then(neighborData => renderCountry(neighborData, 'neighbor'))
//                 .catch (err => console.error(`${err} TTT`));
//                 renderError(`something went wrong TT ${err.message}.Try again`);
//             })
//                 .finally(() => {
//                     countriesContainer.style.opacity = 1;       
//          });
// };
const getJSON = function (url, errorMsg = 'Something went wrong'){
    return fetch(url).then(response =>{
        if(!response.ok) throw new Error(`${errorMsg}
        (${response.status})`);

        return response.json();
    })
}
const getCountryData = function (country) {
    //country 1
    getJSON(`https://restcountries.com/v3.1/name/${country}`,
     'Country not found')
        .then(data => {
            renderCountry(data[0]);
            const neighbor = data[0].borders[0];
            if (!neighbor) throw new Error('No neighbour found!');
            //country 2
            return getJSON(`https://restcountries.com/v3.1/alpha/${neighbor}
            `, 'Country no found')
                
                .then(data => renderCountry(data, 'neighbor'))
                .catch (err => console.error(`${err} TTT`));
            })
                .finally(() => {
                    countriesContainer.style.opacity = 1;       
         });
};

btn.addEventListener('click', function(){
    getCountryData('Bhutan');
});

//challange
const whereAmI = function (lat,lng){
    fetch(`https://geocode.xyz/${lat},${lng}?json=1 ~ json`)
    .then(res => {
        if(!res.ok) throw new Error(`Problem with geocoding
        ${res.status}`);
        return res.json()})
    .then(data =>{
        console.log(data);
        console.log(`You are in ${data.city}, ${data.country}`);

        return fetch(`https://restcountries.com/v3.1/name/${data.country}`)
    })
    .then(response => {
        if(!res.ok)
            throw new Error(`Country not found (${res.status})`);
            return res.json();
    })
        .then(data => renderCountry(data[0]))
        .catch(err => console.error(`${err.message} TT`));
};
whereAmI(52.508, 13.381);

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res =>
    console.log(res))
console.log("test end");



// const getCountryAndNeighbour = function(country) {
//     // AJAX call country 1
//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();
//     request.addEventListener('load', function() {
//         if (request.status === 200) {
//             const [data] = JSON.parse(this.responseText);
//             console.log(data);
            
//             // Render country 1
//             renderCountry(data);
            
//             // Get neighbor country 2
//             const neighbour = data.borders;
            
//             if (neighbour) {
//                 // AJAX call country 2
//                 const request2 = new XMLHttpRequest();
//                 request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//                 request2.send();

//                 request2.addEventListener('load', function(){
//                     if (request2.status === 200) {
//                         const data2 = JSON.parse(this.responseText);
//                         console.log(data2);
//                         // Handle the response for country 2 here
//                     } else {
//                         console.error('Error:', request2.status);
//                     }
//                 });
//             }
//         } else {
//             console.error('Error:', request.status);
//         }
//     });
// };

const lotterPromise = new Promise(function (resolve, reject){
    console.log("Lottery")
    setTimeout(function(){
        if (Math.random() >= 0.5){
            resolve('You win Money');
        } else {
            reject( new Error('You lost your money'));
        }

    }, 2000)
});

lotterPromise.then(res => console.log(res)).catch(err => console.log(err));

navigator.geolocation.getCurrentPosition(
    position => console.log(position),
    err => console.error(err));


const getposition = function(){
    return new Promise(function (resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);

    });
};
getposition().then(pos => console.log(pos));