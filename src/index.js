import { PixabayApi } from './js/pixabay-api';
import createCardsList from '../src/gallery-card.hbs';
import Notiflix from 'notiflix';

const pixabayApi = new PixabayApi();

const searhFormEl = document.querySelector('.search-form');
const photosListEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.js-load-more');

const handleSearchFormSubmit = async event => {
  event.preventDefault();

  const value = event.target.elements['searchQuery'].value.trim();

  if (value === '') {
    photosListEl.innerHTML = '';
    loadMoreBtnEl.classList.add('is-hidden');
    Notiflix.Notify.failure('Please enter a value!');
    return;
  }

  pixabayApi.query = value;
  pixabayApi.page = 1;

  try {
    const data = await pixabayApi.fetchPhotos();
    const totalHits = data.totalHits;
    const images = data.hits;
    photosListEl.innerHTML = createCardsList(images);
    loadMoreBtnEl.classList.remove('is-hidden');
    pixabayApi.calcTotalPages(totalHits);

    if (images.length === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      loadMoreBtnEl.classList.add('is-hidden');
    } else {
      photosListEl.innerHTML = createCardsList(images);
      // console.log(pixabayApi);

      loadMoreBtnEl.classList.remove('is-hidden');
    }
  } catch (error) {
    // document.body.innerHTML = error.message;
    console.log(error);
  }
};

const handleLoadMoreBtnClick = async event => {
  pixabayApi.page += 1;

  try {
    const data = await pixabayApi.fetchPhotos();
    photosListEl.insertAdjacentHTML('beforeend', createCardsList(data.hits));
    if (pixabayApi.page === pixabayApi.totalPages) {
      loadMoreBtnEl.classList.add('is-hidden');
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    console.log(error);
  }
};

searhFormEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', handleLoadMoreBtnClick);
