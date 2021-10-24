import countryCardTpl from './country-card.hbs';

const cardContainer = document.querySelector('.js-card-container');
const input = document.querySelector('.input');

function fetchCountry(name) {
  return fetch(`https://restcountries.com/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function xz(country) {
  const markup = countryCardTpl(country);

  console.log(markup);

  cardContainer.innerHTML = markup;
}

input.addEventListener('input', onSearch);

function onSearch(e) {
  e.preventDefault();

  const searchQuery = input.value;

  fetchCountry(searchQuery)
    .then(xz)
    .catch(error => console.log('error'));
}
