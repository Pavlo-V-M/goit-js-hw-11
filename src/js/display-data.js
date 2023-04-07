
// TEST - 2 display data

// import { createImageElement } from './markup-data-rendering.js';

// function displayImages(data) {
//   const imagesContainer = document.querySelector('#gallery-container');
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

// TEST - 3

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function connectSimpleLightBox() {
  const simpleLightBox = new SimpleLightbox('.photo-card .link', {
    captionsData: 'alt',
    captionDelay: 300,
  });
  simpleLightBox.refresh();
}

export function scroll() {
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}