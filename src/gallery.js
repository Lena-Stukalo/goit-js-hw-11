import Notiflix from 'notiflix';
const axios = require('axios');

const BASE_URL =
  'https://pixabay.com/api/?key=28164685-e508b46b7d4362311384dafbb&q=';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  onFetch(searchQuery);
}

function onFetch(searchQuery) {
  return fetch(`${BASE_URL}${searchQuery}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
function onMarkUp() {}
