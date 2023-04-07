
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

// TEST - 3 

import {showPleaseInterRequest, showNoResultsMessage, showAlert, showWrong, showOops} from './js/alert-messages.js';
import { refs } from "./js/refs.js";
import { pixabayApi } from './js/pixabayAPI.js';
import { createObjectsMarkup } from './js/markup-data-rendering.js'
import { connectSimpleLightBox, scroll } from './js/display-data.js'
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import { connectSimpleLightBox } from './js/display-data.js'

refs.btnLoadMore.classList.add("is-hidden");

// console.log(refs.form);
// console.log(refs.btnLoadMore);
// console.log(refs.galleryContainer);

const exampleEl = new pixabayApi();

const onSubmit = async e => {
  e.preventDefault();
  const {
    elements: { searchQuery },
  } = e.currentTarget;
  const userQuery = searchQuery.value.trim().toLowerCase()
  if (!userQuery) {
    showPleaseInterRequest();
    return;
  }
  console.log(userQuery);
  exampleEl.query = userQuery;
  cleanMarkup();
  try {
    const getResponse = await exampleEl.getPhotos();
    const { total, totalHits, hits } = getResponse;
    console.log(hits);
    if (hits.length === 0) { showNoResultsMessage(); return; }
    console.log(getResponse);
    const objectsMarkup = createObjectsMarkup(hits);
    console.log(objectsMarkup);
    refs.galleryContainer.insertAdjacentHTML('beforeend', objectsMarkup);
    connectSimpleLightBox();
    exampleEl.quantityTotalPages(total);
    if (exampleEl.loadMore) { refs.btnLoadMore.classList.remove("is-hidden") }
  }
  catch (error) { showWrong(); }
};

function cleanMarkup() {
  refs.galleryContainer.innerHTML = '';
  exampleEl.restPage();
  refs.btnLoadMore.classList.add("is-hidden");
}

function handleLoadMoreClick() {
  exampleEl.currentPage();
  if (!exampleEl.loadMore) {
    refs.btnLoadMore.classList.add("is-hidden");
    showAlert();
  }
  exampleEl.getPhotos().then(({ hits }) => {
    const murkup = createObjectsMarkup(hits);
    refs.galleryContainer.insertAdjacentHTML("beforeend", murkup);
    console.log(exampleEl.page);
    console.log(hits.length);
    scroll();
  })
  .catch(error => {
    console.log(error.massage);
    // showOops();
    // cleanMarkup();
  });
}

refs.form.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener("click", handleLoadMoreClick);
