import Notiflix from 'notiflix';
import Photo from './photo-api-service';
const axios = require('axios').default;

const BASE_URL =
  'https://pixabay.com/api/?key=28164685-e508b46b7d4362311384dafbb&q=';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};
const photos = new Photo();

refs.form.addEventListener('submit', onSubmitForm);
refs.loadMore.addEventListener('click', onLoadMoreButton);

function onSubmitForm(event) {
  event.preventDefault();
  refs.loadMore.classList.add('visually-hidden');
  refs.gallery.innerHTML = '';
  photos.query = event.target.elements.searchQuery.value;
  photos.resetPage();
  console;
  photos
    .fetchPhotos()
    .then(hits => {
      if (hits.length === 0) {
        throw new Error();
      }
      onMarkUp(hits);
      refs.loadMore.classList.remove('visually-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
function onLoadMoreButton() {
  photos
    .fetchPhotos()
    .then(hits => {
      if (hits.length === 0) {
        throw new Error();
      }
      onMarkUp(hits);
    })
    .catch(() => {
      Notiflix.Notify.failure(
        "Were sorry, but you've reached the end of search results."
      );
    });
}

function onMarkUp(hits) {
  const markUP = hits
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markUP);
}
