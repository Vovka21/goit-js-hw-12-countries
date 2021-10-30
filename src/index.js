import '@pnotify/core/dist/BrightTheme.css';

import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

const _ = require('lodash');

import countryCardTpl from './country-card.hbs';

const cardContainer = document.querySelector('.js-card-container');
const input = document.querySelector('.input');

// function fetchCountry(name) {
//   return fetch(`https://restcountries.com/v2/name/${name}`).then(response => {
//     return response.json();
//   });
// }

function fetchCountry(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error('Error fetching data');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function delAlert() {
  const pnotify = document.querySelector('.pnotify');
  pnotify.style.opacity = 0;
}

const ul = document.querySelector('.list-item');

function addCountry(country) {
  const markup = countryCardTpl(country);

  if (country.length === 1) {
    delAlert();
    cardContainer.innerHTML = '';
    ul.innerHTML = '';

    cardContainer.innerHTML = markup;
  }

  if (country.length > 10) {
    cardContainer.innerHTML = '';

    defaultModules.set(PNotifyMobile, {});

    alert({
      text: 'Слишком много хочешь!',
    });
  }

  if (country.length > 1 && country.length < 10) {
    cardContainer.innerHTML = '';
    delAlert();

    cardContainer.append(ul);

    const listItemsMarkup = createListItemsMarkup(country);
    ul.innerHTML = listItemsMarkup;

    function createListItemsMarkup(items) {
      return items.map(item => `<li>${item.name}</li>`).join('');
    }
  }
}

input.addEventListener('input', _.debounce(onSearch, 500));

function onSearch(e) {
  let searchQuery = input.value;

  if (searchQuery.length === 0) {
    cardContainer.innerHTML = '';
    delAlert();
  } else {
    fetchCountry(searchQuery)
      .then(addCountry)
      .catch(error => console.log('error'));
  }
}
