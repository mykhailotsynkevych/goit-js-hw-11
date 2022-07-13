import { PixabayApi } from './js/pixabay-api';
import createCardsList from '../src/gallery-card.hbs';
import Notiflix from 'notiflix';

const pixabayApi = new PixabayApi();

const searhFormEl = document.querySelector('.search-form');
const input = document.querySelector('input[ name= searchQuery]');
const button = document.querySelector('button');
const photosListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

// const handleSearchFormSubmit = event => {
//   event.preventDefault();

//   const { value } = event.target.elements['searchQuery'];

//   if (value === '') {
//         photosListEl.innerHTML = '';
//     loadMoreBtnEl.classList.add('is-hidden');
//     return;
//   }

//     unsplashApi.query = value;
//      unsplashApi.page = 1;

//   unsplashApi
//     .fetchPhotos()
//     .then(data => (photosListEl.innerHTML = createCardsList(data.hits)));

//   loadMoreBtnEl.classList.remove('is-hidden');
// };

const handleSearchFormSubmit = async event => {
  event.preventDefault();

  const { value } = event.target.elements['searchQuery'];

  if (value === '') {
    photosListEl.innerHTML = '';
    loadMoreBtnEl.classList.add('is-hidden');
    return;
  }

  pixabayApi.query = value;
  pixabayApi.page = 1;

  try {
    const data = await pixabayApi.fetchPhotos();
    photosListEl.innerHTML = createCardsList(data.hits);
    loadMoreBtnEl.classList.remove('is-hidden');

    if (data.hits.length === 0) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "Sorry, there are no images matching your search query. Please try again."
      )
    }
  } catch (error) {
    // document.body.innerHTML = error.message;
    console.log(error);
  }
};

// const handleLoadMoreBtnClick = event => {
//   unsplashApi.page += 1;

//   unsplashApi.fetchPhotos().then(data => {
//     photosListEl.insertAdjacentHTML('beforeend', createCardsList(data.hits));
//   });
    
//         if (unsplashApi.page === data.totalHits) {
//       loadMoreBtnEl.classList.add('is-hidden');
//     }
// };

const handleLoadMoreBtnClick = async event => {
  pixabayApi.page += 1;

  try {
    const data = await pixabayApi.fetchPhotos();
    photosListEl.insertAdjacentHTML('beforeend', createCardsList(data.hits));
    if (data.totalHits === 500) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        )
    }
  } catch (error) {
    console.log(error);
  }
};

searhFormEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
