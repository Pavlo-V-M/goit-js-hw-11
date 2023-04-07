
import axios from 'axios';

const API_KEY = '35028800-20b44384747278ffeb1b55203';
const GET_URL = 'https://pixabay.com/api/';

export class pixabayApi {
  imagesPerPage = 40;
  page = 1;
  totalPages = 0;
  query = "";

  options = {
    params: {
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
    }
  }
  async getPhotos() { 
    const url = `${GET_URL}?key=${API_KEY}&q=${this.query}&per_page=${this.imagesPerPage}&page=${this.page}`;
    const {data} = await axios.get(url, this.options)
    return data;
  }
  set query(new_query) {
    this.query = new_query
  }
  get query() {
    return this.query
  }
  // Increment the current page number
  currentPage() {
    this.page += 1;
  }
  restPage() {
    this.page = 1;
  }
  
  quantityTotalPages(total) {
    // кількість отриманих по факту картинок / кількість елементів на сторінці
    this.totalPages = Math.ceil(total / this.imagesPerPage);
  }
  get loadMore() {
    console.log(this.page, this.totalPages)
    return this.page < this.totalPages;
  }
  get totalPages() {
    return this.totalPages;
  }
  get page() { 
    return this.page;
  }
}