'use strict';

export class UnsplashApi {
  #BASE_URL = 'https://pixabay.com';
  #API_KEY = '28586147-3ab4251b0e4522a1aabc38539';
  constructor() {
    this.page = 1;
    this.query = null;
  }

  fetchPhotos() {
    const search = new URLSearchParams({
      key: this.#API_KEY,
      q: this.query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: 1,
      per_page: 40,
    });

    return fetch(`${this.#BASE_URL}/api/?${search}`).then(response => {
      if (!response.ok) {
        throw 'Error';
      }

      return response.json();
    });
  }

  increasePage() {
    this.page += 1;
  }

  setQuery(query) {
    this.query = query;
  }
}
