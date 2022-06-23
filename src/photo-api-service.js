const axios = require('axios').default;
import Notiflix from 'notiflix';

export default class Photo {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  async fetchPhotos() {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=28164685-e508b46b7d4362311384dafbb&q=${this.searchQuery}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`
      );
      const hits = await response.data.hits;
      this.page += 1;
      return hits;
    } catch {
      Notiflix.Notify.failure('Sorry, we have API error. Please try again.');
    }
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
  resetPage() {
    this.page = 1;
  }
}
