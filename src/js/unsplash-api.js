'use strict';
import axios from 'axios';
import Notiflix from 'notiflix';

export class UnsplashApi {
  #BASE_URL = 'https://pixabay.com';
  #API_KEY = '28586147-3ab4251b0e4522a1aabc38539';
  constructor() {
    this.page = 1;
    this.query = null;
    axios.defaults.baseURL = this.#BASE_URL;
  }

  fetchPhotos() {
    axios.defaults.params = {
      key: this.#API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: 1,
      per_page: 40,
    };

    return axios
      .get(`/api/`)
      .then(response => response.data)
      .catch(err => 
        Notiflix.Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        ));
  }

  increasePage() {
    this.page += 1;
  }

  setQuery(query) {
    this.query = query;
  }
}
