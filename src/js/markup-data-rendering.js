
// TEST - 3 cleaning the previous in TEST 3:

export function createObjectsMarkup(objectsData) {
  return objectsData.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads
    }) => {
      return `<div class="photo-card">
      <a class="link" href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
              <b>Likes: ${likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${views}</b>
        </p>
        <p class="info-item">
              <b>Comments: ${comments}</b>
        </p>
        <p class="info-item">
              <b>Downloads: ${downloads}</b>
        </p>
      </div>
      </a>
    </div>`;
    }
  ).join("")
}
