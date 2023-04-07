
// TEST - 3
 
import Notiflix from 'notiflix';

function showPleaseInterRequest() { 
  Notiflix.Notify.failure('Please, enter your request.');
}

function showNoResultsMessage() {
  Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
}

function showAlert() {
  Notiflix.Notify.failure('We\'re sorry, but you\'ve reached the end of search results.');
}

function showWrong() {
  Notiflix.Notify.failure('Something went wrong. Please try again later.');
}

function showOops() {
  Notiflix.Notify.failure('Oops something is wrong.');
}



export { showPleaseInterRequest };
export { showNoResultsMessage };
export { showAlert };
export { showWrong };
export { showOops };
