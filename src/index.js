import { UnsplashApi } from './js/unsplash-api';
import createCardsList from '../src/gallery-card.hbs';

const unsplashApi = new UnsplashApi();

const searhFormEl = document.querySelector('.search-form');
const input = document.querySelector('input[ name= searchQuery]');
const button = document.querySelector('button');
const photosListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const handleSearchFormSubmit = event => {
  event.preventDefault();

  const { value } = event.target.elements['searchQuery'];

    unsplashApi.query = value;
     unsplashApi.page = 1;

  unsplashApi
    .fetchPhotos()
    .then(data => (photosListEl.innerHTML = createCardsList(data.hits)));

  loadMoreBtnEl.classList.remove('is-hidden');
};

const handleLoadMoreBtnClick = event => {
    unsplashApi.increasePage(); // page + 1

  unsplashApi.fetchPhotos().then(data => {
    photosListEl.insertAdjacentHTML('beforeend', createCardsList(data.hits));
  });
    
        if (unsplashApi.page === data.totalHits) {
      loadMoreBtnEl.classList.add('is-hidden');
    }
};

searhFormEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
