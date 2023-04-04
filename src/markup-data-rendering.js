
// TEST - 2

// import { appendImagesToGallery } from './display-data.js';

function createImageElement(imageData) {
  const imageElement = document.createElement('img');
  imageElement.src = imageData.webformatURL;
  
  const imageLinkElement = document.createElement('a');
  imageLinkElement.href = imageData.pageURL;
  imageLinkElement.target = '_blank';
  imageLinkElement.appendChild(imageElement);
  
  const metadataElements = `
    <figcaption>
      <p>Likes: ${imageData.likes}</p>
      <p>Views: ${imageData.views}</p>
      <p>Comments: ${imageData.comments}</p>
      <p>Downloads: ${imageData.downloads}</p>
    </figcaption>
  `;
  
  const figureElement = document.createElement('figure');
  figureElement.appendChild(imageLinkElement);
  figureElement.innerHTML += metadataElements;
  
  return figureElement;
}

export { createImageElement };

