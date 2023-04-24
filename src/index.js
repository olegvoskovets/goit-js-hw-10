import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const url = `https://restcountries.com/v3.1/name/`;

const inputValue = document.querySelector('#search-box');

const countryInfo = document.querySelector('.country-info');
inputValue.addEventListener('input', debounce(addSearchValue, DEBOUNCE_DELAY));

function languages(len) {
  let result = ``;
  for (var key in len) {
    result += `<span>${len[key]} </span>`;
  }
  return result;
}

function drawСountry(data) {
  return data
    .map(item => {
      //   countriesArray(item);
      return `
      <div class="card">
          <div class="header">
         <img src=${item.flags.svg} alt=${
        item.flags.alt
      } width="76"  height="40"/>
          
          <h2 class="countri">${item.name.official}</h2>
          </div>
          <div class="info">
              <h3 class="capital">Capital:<span class="info-span">${
                item.capital
              }</span></h3>
              <h3 class="population">Population:<span class="info-span">${
                item.population
              }</span></h3>
              <h3 class="languages">Languages:
              <span class="info-span"> ${languages(item.languages)} </span>
                     
              </h3>
              
          </div>
      </div>
        `;
    })
    .join('');
}

function arreyCountry(data) {
  return data
    .map(item => {
      return `
      <div class="card">
          <div class="header">
                <img src=${item.flags.svg} alt=${item.flags.alt} width="76"  height='40'/>
                 <h2 class="countri-array">${item.name.official}  </h2>
          </div>
          
      </div>
        `;
    })
    .join('');
}
function errorValue() {
  Notify.failure('Oops, there is no country with that name');
}

function bigArray() {
  Notify.success('Too many matches found. Please enter a more specific name.');
}
function addArrayName(data) {
  if (data.length > 10) {
    return bigArray();
  } else if (data.length > 1 && data.length <= 10) {
    return arreyCountry(data);
  } else if (data.length === 1) {
    return drawСountry(data);
  }
  return errorValue();
}
function errorCatch() {
  console.log('errorCatch');
}

function fetchCountries(name) {
  if (name) {
    fetch(url + name)
      .then(res => {
        return res.json();
      })
      .then(countries => {
        const mapcup = addArrayName(countries);
        if (mapcup) {
          countryInfo.innerHTML = mapcup;
          return;
        }
        countryInfo.innerHTML = '';
      })
      .catch(errorCatch());
  }
}

function addSearchValue(e) {
  const value = e.target.value;
  fetchCountries(value);
}
