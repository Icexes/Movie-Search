import Swiper from '../../node_modules/swiper/js/swiper'
import '../css/style.css';
import '../css/style.scss';
import createHeader from './Header/header';
import createMainContent from './MainContent/mainContent'

 
    // const key = 'bfcf5d6';
    const key2 = 'e4642a3b'
    let currentPage = 1;
    let previousStateCurrentPage = currentPage;
    let request = 'home';
    let prevRequest = request;
    const getMovieTitle = (page, keyValue, requestData) => {
    const url = `https://www.omdbapi.com/?s=${requestData}&type=movie&page=${page}&apikey=${keyValue}`;

    return fetch(url)
    .then(res => res.json());
}

const getRate = (imdbID, keyValue) => {
    const url = `https://www.omdbapi.com/?i=${imdbID}&apikey=${keyValue}`;

    return fetch(url)
    .then(res => res.json())
    .then(data => data.imdbRating);
    
}
const getTranslateWord = (word) => {
    const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200322T155651Z.de98a60e6a99185e.089aea4237b51c6db082c966f27a7895cd1e8b44&text=${word}&lang=ru-en`;

    return fetch(url)
    .then(res => res.json())
    .then(data => data.text[0]);
}


createHeader();
createMainContent();
const swiper = new Swiper ('.swiper-container', {
    // Optional parameters
    // slidesPerView: 4,
    centerInsufficientSlides: true,
   
  //  spaceBetween: 20,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        700: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1100: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1350 : {
            slidesPerView: 4,
            spaceBetween: 20,
        }
    },
    
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  })

  class NotFoundDataError extends Error{
      constructor (message, fromPromise) {
          super(message);
          this.name = fromPromise; 
      }

  }


  const createMovieCard = (title, year, imgSrc, rate, id) => {

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    const card = document.createElement('a');
    card.classList.add('card-film');
    card.href = `https://www.imdb.com/title/${id}/videogallery/`;
    const poster = document.createElement('img');
    poster.classList.add('card-film__poster');
    poster.src = imgSrc === 'N/A' ? 'img/not-found.jpg' : imgSrc;
    const filmName = document.createElement('p');
    filmName.classList.add('card-film__name');
    filmName.textContent = title;
    const filmInfo = document.createElement('div');
    filmInfo.classList.add('card-film__info');
    const filmYear = document.createElement('span');
    filmYear.classList.add('card-film__year');
    filmYear.textContent = year;
    const filmRate = document.createElement('span');
    filmRate.classList.add('card-film__rate');
    filmRate.textContent = rate;
    filmInfo.append(filmYear, filmRate);
    card.append(poster, filmName, filmInfo);
    slide.append(card);
    // swiper.appendSlide(slide);
    return slide;
}

  const getMovies = () => {
    const spinner = document.querySelector('.spinner');
    spinner.classList.add('spinner--show');
    getTranslateWord(request)
    .then(translate => {
        console.log(translate);
      return  getMovieTitle(currentPage, key2, translate)})
        .then(data => {
            if (data.Response === 'True') {
                console.log('yes wse zaebis');
           const searchResult = data.Search;

        //    const totalResults = data.totalResult;
        //    console.log(totalResults);
           return searchResult;
        }
        throw new NotFoundDataError(data.Error,'getMovieTitle');
        })
        .then(filmInfo => {

            // filmInfo.forEach(film => {
            //     getRate(film.imdbID,key2)
            //     .then(rate =>{         
            //     const cards = [];     
            //     cards.push(createMovieCard(film.Title, film.Year, film.Poster, rate, film.imdbID))
            //     return cards;
            const rates = filmInfo.map(film => getRate(film.imdbID, key2));
            return Promise.all(rates).then(ratesArr => {
                return  {ratesArr,filmInfo};
            });
            })
            .then (cardsData => {
                const cards = [];
                cardsData.filmInfo.forEach((film, index) => cards.push(createMovieCard(film.Title, film.Year, film.Poster, cardsData.ratesArr[index], film.imdbID)))
                // if (prevRequest !== request){
                //     swiper.removeAllSlides();
                //     swiper.update();
                // }
                if (currentPage === 1 && cardsData.filmInfo.length !== 0) {swiper.removeAllSlides(); swiper.update()}
                   swiper.appendSlide(cards);
                   swiper.update();
                    
                  
            }).catch((err) => { 
           currentPage = previousStateCurrentPage;
           const logWindow = document.querySelector('.log-window');
           if (err instanceof NotFoundDataError) logWindow.textContent = `${err.message.slice(0,-1)} for '${request}'`;
           
           
           request = prevRequest;
           
        })
        .finally(() => {
            spinner.classList.remove('spinner--show');
        })

}

getMovies();
swiper.on('reachEnd', () => {
     if (document.querySelector(".swiper-slide") === null) return;
    currentPage += 1;
     getMovies();
    
});

const textInput = document.querySelector('.search-form__input-row');
const searchFormSubmitBtn = document.querySelector('.search-form__submit');
searchFormSubmitBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (textInput.value === '') return;
    previousStateCurrentPage = currentPage;
    currentPage = 1;
    prevRequest = request;
    request = textInput.value;
    getMovies();
});

const clearInputBtn = document.querySelector('.search-form__clear-input');
clearInputBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    textInput.value = '';

})
