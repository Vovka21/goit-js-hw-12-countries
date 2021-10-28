import '@pnotify/core/dist/BrightTheme.css';

import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

const _ = require('lodash');

// var debounce = require('debounce');
// import { debounce } from 'debounce';

import countryCardTpl from './country-card.hbs';

const cardContainer = document.querySelector('.js-card-container');
const input = document.querySelector('.input');

function fetchCountry(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function delAlert() {
  const pnotify = document.querySelector('.pnotify');
  pnotify.style.opacity = 0;
}

let ul = document.createElement('ul');
cardContainer.append(ul);

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

    // function onFilterChange(evt) {
    // const filter = evt.target.value.toLowerCase();
    //   const filteredItems = country.filter(t => t.name.toLowerCase().includes(filter));
    //   const listItemsMarkup = createListItemsMarkup(filteredItems);
    //   ul.innerHTML = listItemsMarkup;
    // }
  }
}

input.addEventListener('input', _.debounce(onSearch, 500));

function onSearch(e) {
  let searchQuery = input.value;

  if (searchQuery.length === 0) {
    cardContainer.innerHTML = '';
  } else {
    fetchCountry(searchQuery)
      .then(addCountry)
      .catch(error => console.log('error'));
  }
}
