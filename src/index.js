import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import getArrayCountries from './templates/getCountries.js';
import getDrawContry from './templates/getDrawContry';

import API from './api/api-server';

const DEBOUNCE_DELAY = 300;

const inputValue = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');

inputValue.addEventListener('input', debounce(addSearchValue, DEBOUNCE_DELAY));

function drawCountry(data) {
  return data
    .map(item => {
      //   countriesArray(item);
      return getDrawContry(item);
    })
    .join('');
}

function getCountries(data) {
  return data
    .map(item => {
      return getArrayCountries(item);
    })
    .join('');
}

function bigArray() {
  Notify.success('Too many matches found. Please enter a more specific name.');
}
function addArrayName(data) {
  if (data.length > 10) {
    return bigArray();
  } else if (data.length > 1 && data.length <= 10) {
    return getCountries(data);
  } else if (data.length === 1) {
    return drawCountry(data);
  }
}

function removeinnerHTML() {
  countryInfo.innerHTML = '';
}
function errorCatch() {
  Notify.failure('Oops, there is no country with that name');
  removeinnerHTML();
}

function addSearchValue(e) {
  const value = e.target.value;

  value
    ? API.fetchCountries(value)?.then(renderCountries).catch(errorCatch)
    : removeinnerHTML();
}

function renderCountries(countries) {
  const mapcup = addArrayName(countries);
  if (mapcup) {
    countryInfo.innerHTML = mapcup;
    return;
  }
  removeinnerHTML();
}
