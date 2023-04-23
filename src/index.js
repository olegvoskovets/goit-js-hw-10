import './css/styles.css';
import debounce from 'lodash.debounce';

import countriesArray from './templates/countri-card.hbs';

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

function addArrayName(data) {
  return data
    .map(item => {
      //   countriesArray(item);
      return `
      <div class="card">
          <div class="header">
         
          <svg class="icon"   width="30" height="30">
              <use href=${item.flags.svg}></use>
          </svg>
          <h2 class="countri">${item.name.official}</h2>
          </div>
          <div class="info">
              <p class="capital">Capital:<span>${item.capital}</span></p>
              <p class="population">Population:<span>${
                item.population
              }</span></p>
              <p class="languages">Languages:
              ${languages(item.languages)}         
              </p>
          </div>
      </div>
        `;
    })
    .join('');
}

function errorName() {
  console.log('ERROR');
}

function fetchCountries(name) {
  if (name) {
    fetch(url + name)
      .then(res => {
        return res.json();
      })
      .then(countries => {
        const mapcup = addArrayName(countries);
        countryInfo.innerHTML = mapcup;
      })
      .catch(error => {
        console.log(error);
      });
  }
}

function addSearchValue(e) {
  const value = e.target.value;
  fetchCountries(value);
}
