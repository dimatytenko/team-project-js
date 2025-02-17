import ApiServices from './ApiServices.js';
import cardTemplate from '../templates/film-card.hbs';
import loader from './loader.js';
import CardsLoader from './FilmCardsLoader.js';

const refs = {
  filmsList: document.querySelector('.js-films'),
  errorMsg: document.querySelector('#error'),
  votesSpan: document.getElementsByClassName('films__votes'),
  paginationBox: document.getElementById('tui-pagination'),
};

export default class RenderMarkup {
  constructor() {
    this.apiServices = new ApiServices();
    this.delay = 2000;
    this.CardsLoader = new CardsLoader();
  }

  renderMarkup = (results, { showVotes }) => {
    loader.show();

    if (results.length === 0) {
      refs.errorMsg.classList.remove('visually-hidden');
      setTimeout(() => {
        refs.errorMsg.classList.add('visually-hidden');
      }, this.delay);
      return loader.close();
    }
    refs.filmsList.innerHTML = cardTemplate(this.apiServices.transformData(results));

    if (showVotes) {
      for (const elem of refs.votesSpan) {
        elem.classList.remove('is-hidden');
      }
    } else {
      for (const elem of refs.votesSpan) {
        elem.classList.add('is-hidden');
      }
    }

    loader.close();
    this.CardsLoader.loading();
  };

  renderPopularFilms = async () => {
    loader.show();
    const dataPopular = await this.apiServices.fetchPopularFilms();
    refs.filmsList.innerHTML = cardTemplate(this.apiServices.transformData(dataPopular.results));
    // Hide votes in popular films list
    for (const elem of refs.votesSpan) {
      elem.classList.add('is-hidden');
    }
    

    loader.close();
    this.CardsLoader.loading();
  };
}
