
// TEST - 2 display data

// import { createImageElement } from './markup-data-rendering.js';

// function displayImages(data) {
//   const imagesContainer = document.querySelector('#images-container');
//   if (!imagesContainer) {
//     return; // Stop if the container element is not found
//   }
//   imagesContainer.innerHTML = ''; // Clear the previous images displayed

//   data.hits.forEach(imageData => {
//     const imageElement = createImageElement(imageData);
//     imagesContainer.appendChild(imageElement);
//   });
// }

// export { displayImages };

// TEST - 3 aded notiflix library notifications

import { createImageElement } from './markup-data-rendering.js';
import { showNoResultsMessage, showAlert, showWrong } from './alert-messages.js';
// import { showAlert } from './alert-messages.js';
// import { showWrong } from './alert-messages.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

function displayImages(data) {
  const imagesContainer = document.querySelector('#images-container');
  if (!imagesContainer) {
    return; // Stop if the container element is not found
  }
  imagesContainer.innerHTML = ''; // Clear the previous images displayed
  if (data.hits.length === 0) {
    showNoResultsMessage();;
    return; // Stop if the API response returns an empty array
  }
  const lightbox = new SimpleLightbox('.image-container a');
  data.hits.forEach(imageData => {
    const imageElement = createImageElement(imageData);
    imagesContainer.appendChild(imageElement);
  });
  lightbox.refresh(); // Refresh the lightbox after adding new images to the container
}

const loadMoreButton = document.querySelector('.load-more');
loadMoreButton.addEventListener('click', async () => {
  currentPage += 1; // increment the page number
  try {
    const { hits } = await getImages(searchQuery, currentPage); // make the HTTP request
    renderImages(hits); // render the new images
  } catch (error) {
    console.log(error);
    showWrong();
  }
  // hide the button when the user has reached the end of the collection
  if (totalHits <= currentPage * imagesPerPage) {
    loadMoreButton.classList.add('disabled');
    showAlert();
  }
});

export { displayImages };
