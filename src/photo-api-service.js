const axios = require('axios').default;

export default class Photo {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchPhotos() {
    return axios
      .get(
        `https://pixabay.com/api/?key=28164685-e508b46b7d4362311384dafbb&q=${this.searchQuery}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`
      )
      .then(response => {
        this.page += 1;
        return response.data.hits;
      });
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
