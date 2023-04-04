
// created in connection with display-data.js TEST - 3
// for added notiflix library notifications 
 
import Notiflix from 'notiflix';

function showNoResultsMessage() {
  Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
}

function showAlert() {
  Notiflix.Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
}

function showWrong() {
  Notiflix.Notify.failure('Something went wrong. Please try again later.');
}

export { showNoResultsMessage };
export { showAlert };
export { showWrong };

// export default {
//   showNoResultsMessage,
//   showAlert,
//   showWrong
// };