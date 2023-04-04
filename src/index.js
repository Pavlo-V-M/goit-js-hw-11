
// FILE request-response data:

// TEST - 0

// Next lines make API request to search using Pixabay:

// const API_KEY = '35028800-20b44384747278ffeb1b55203';
// const query = 'sunset';
// const per_page = 10;

// const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=${per_page}`;

// fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data.hits);
//   })
//   .catch(error => {
//     console.error(error);
//   });

// TEST - 1 the same + apply a document.querySelector
// & addEventListener to the search form in the HTML code

// const form = document.querySelector('#search-form');

// form.addEventListener('submit', event => {
//   event.preventDefault(); // Prevents the default form submission behavior

//   const searchInput = document.querySelector('input[name="searchQuery"]');
//   const query = searchInput.value;

//   searchImages(query); // Calls the function to send the API request with the search query
// });

// function searchImages(query) {
//   const API_KEY = '35028800-20b44384747278ffeb1b55203';
//   const perPage = 10;

//   const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=${perPage}`;

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data.hits);
//       // Process the API response data as needed
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

// TEST 2 the same +

// import { displayImages } from './display-data.js';

// const form = document.querySelector('#search-form');

// form.addEventListener('submit', event => {
//   event.preventDefault(); // Prevents the default form submission behavior

//   const searchInput = document.querySelector('input[name="searchQuery"]');
//   const query = searchInput.value;

//   searchImages(query); // Calls the function to send the API request with the search query
// });

// function searchImages(query) {
//   const API_KEY = '35028800-20b44384747278ffeb1b55203';
//   const perPage = 10;

//   const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=${perPage}`;

//   fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       console.log(data.hits);
//       // Process the API response data as needed
//       displayImages(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

// export { searchImages };

// TEST - 3 replace the fetch function with the Axios library:

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';
import { createImageElement } from './markup-data-rendering.js';
import { showNoResultsMessage } from './alert-messages.js';

const lightbox = new SimpleLightbox('.image-container a', {});

const API_KEY = '35028800-20b44384747278ffeb1b55203';
const imagesPerPage = 40;

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('input[name="searchQuery"]');
const loadMoreButton = document.querySelector('.load-more');

form.addEventListener('submit', handleSubmit);

loadMoreButton.addEventListener('click', handleLoadMoreClick);

function handleSubmit(event) {
  event.preventDefault();
  const query = searchInput.value;
  searchImages(query, 1);
}

async function searchImages(query, page) {
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&per_page=${imagesPerPage}&page=${page}`;
  try {
    const response = await axios.get(url);
    const data = response.data;
    console.log(data.hits);
    if (page === 1) {
      displayImages(data);
      loadMoreButton.classList.remove('disabled');
      loadMoreButton.classList.add('visible');
    } else {
      appendImages(data);
    }
    if (data.hits.length === 0) {
      showNoResultsMessage();
    } else if (data.totalHits <= page * imagesPerPage) {
      loadMoreButton.classList.add('disabled');
      showAlert();
    }
  } catch (error) {
    console.error(error);
    showWrong();
  }
}

function handleLoadMoreClick() {
  const query = searchInput.value;
  const page = Math.ceil(document.querySelectorAll('.images-container').length / imagesPerPage) + 1;
  searchImages(query, page);
}

function displayImages(data) {
  const imagesContainer = document.querySelector('#images-container');
  imagesContainer.innerHTML = '';
  data.hits.forEach(imageData => {
    const imageElement = createImageElement(imageData);
    imagesContainer.appendChild(imageElement);
  });
  lightbox.refresh();
}

function appendImages(data) {
  const imagesContainer = document.querySelector('#images-container');
  data.hits.forEach(imageData => {
    const imageElement = createImageElement(imageData);
    imagesContainer.appendChild(imageElement);
  });
  lightbox.refresh();
}

function setLoadMoreButtonState(totalHits, currentPage) {
  if (totalHits <= currentPage * imagesPerPage) {
    loadMoreButton.classList.add('disabled');
  } else {
    loadMoreButton.classList.remove('disabled');
  }
}








